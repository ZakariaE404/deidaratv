import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { slugify } from '@/lib/utils'

// Guardrail check: API-Football headers
const API_URL = process.env.NEXT_PUBLIC_API_FOOTBALL_URL || 'https://v3.football.api-sports.io'
const API_KEY = process.env.API_FOOTBALL_KEY

/**
 * Maps API-Football status code to our DB status ('NS', 'LIVE', 'FT')
 */
function mapStatus(apiStatus: string): 'NS' | 'LIVE' | 'FT' {
  switch (apiStatus) {
    case 'FT':
    case 'AET':
    case 'PEN':
    case 'AWD':
    case 'WO':
      return 'FT'
    case 'NS':
    case 'TBD':
    case 'PST':
    case 'CANC':
    case 'ABD':
      return 'NS'
    default:
      // 1H, HT, 2H, ET, BT, P, INT, LIVE, etc. are LIVE
      return 'LIVE'
  }
}

/**
 * GET /api/sync
 * 
 * Query Parameters:
 * - mode: 'daily' (full fetch for a date) or 'live' (only poll active matches)
 * - date: 'YYYY-MM-DD' (defaults to today in UTC)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('mode') || 'live'
    
    // Default to today in UTC (formatted YYYY-MM-DD)
    const todayStr = new Date().toISOString().split('T')[0]
    const dateStr = searchParams.get('date') || todayStr

    if (!API_KEY || API_KEY === 'your-api-football-key-here') {
      return NextResponse.json({ error: 'API_FOOTBALL_KEY is not configured' }, { status: 400 })
    }

    const supabase = createAdminClient()

    if (mode === 'daily') {
      // ----------------------------------------------------
      // MODE: DAILY BULK FETCH (Hits /fixtures?date=YYYY-MM-DD)
      // ----------------------------------------------------
      const res = await fetch(`${API_URL}/fixtures?date=${dateStr}`, {
        headers: {
          'x-apisports-key': API_KEY,
          'x-rapidapi-key': API_KEY,
        },
        next: { revalidate: 0 }, // Bypass Next.js cache
      })

      if (!res.ok) {
        throw new Error(`API-Football responded with status ${res.status}`)
      }

      const data = await res.json()
      if (data.errors && Object.keys(data.errors).length > 0) {
        return NextResponse.json({ error: 'API Error', details: data.errors }, { status: 500 })
      }

      const apiFixtures = data.response || []
      const syncedMatches = []

      for (const item of apiFixtures) {
        const fixtureId = item.fixture.id
        const teamA = item.teams.home.name
        const teamB = item.teams.away.name
        const teamALogo = item.teams.home.logo
        const teamBLogo = item.teams.away.logo
        const scoreA = item.goals.home ?? 0
        const scoreB = item.goals.away ?? 0
        const apiStatus = item.fixture.status.short
        const dbStatus = mapStatus(apiStatus)
        const startTime = item.fixture.date // ISO String
        const leagueName = item.league.name
        const roundName = item.league.round

        // Generate a unique slug: e.g. "portugal-vs-uzbekistan-12345" or similar to avoid conflicts
        // Incorporating the fixture ID ensures absolute uniqueness
        const baseSlug = `${slugify(teamA)}-vs-${slugify(teamB)}`
        const finalSlug = `${baseSlug}-${fixtureId}`

        // Check if there is an existing match that is marked as manual.
        // If so, we respect the manual override and do NOT overwrite it.
        const { data: existingMatch } = await supabase
          .from('matches')
          .select('is_manual')
          .eq('api_football_id', fixtureId)
          .single()

        if (existingMatch?.is_manual) {
          continue; // Smart disconnect: skip manual matches
        }

        const matchPayload = {
          api_football_id: fixtureId,
          slug: finalSlug,
          team_a: teamA,
          team_b: teamB,
          team_a_logo: teamALogo,
          team_b_logo: teamBLogo,
          score_a: scoreA,
          score_b: scoreB,
          status: dbStatus,
          start_time: startTime,
          league: `${leagueName} - ${roundName}`,
          updated_at: new Date().toISOString(),
        }

        const { data: upsertedData, error: upsertError } = await supabase
          .from('matches')
          .upsert(matchPayload, { onConflict: 'api_football_id' })
          .select()

        if (upsertError) {
          console.error(`Upsert error for fixture ${fixtureId}:`, upsertError)
        } else if (upsertedData && upsertedData.length > 0) {
          syncedMatches.push(upsertedData[0])
        }
      }

      return NextResponse.json({
        message: `Daily sync completed for date ${dateStr}`,
        processed: apiFixtures.length,
        syncedCount: syncedMatches.length,
      })

    } else {
      // ----------------------------------------------------
      // MODE: LIVE POLLING WINDOW (Selective checking)
      // ----------------------------------------------------
      
      // Get all matches in the database that:
      // 1. Are not finished (status != 'FT')
      // 2. Are not manually managed (is_manual = false)
      // 3. Are active (start_time <= now + 15 minutes AND start_time >= now - 4 hours)
      // Note: Live matches usually last ~2 hours, we pool from start_time up to 4 hours to be safe.
      const now = new Date()
      const fifteenMinsFromNow = new Date(now.getTime() + 15 * 60 * 1000).toISOString()
      const fourHoursAgo = new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString()

      const { data: activeMatches, error: dbError } = await supabase
        .from('matches')
        .select('api_football_id, id, team_a, team_b')
        .eq('is_manual', false)
        .neq('status', 'FT')
        .lte('start_time', fifteenMinsFromNow)
        .gte('start_time', fourHoursAgo)

      if (dbError) {
        throw dbError
      }

      if (!activeMatches || activeMatches.length === 0) {
        return NextResponse.json({
          message: 'No active matches in the polling window. API call skipped.',
          activeMatchesCount: 0
        })
      }

      // Batching: Group active match IDs separated by hyphens (e.g. 123-456-789)
      const apiIds = activeMatches
        .map(m => m.api_football_id)
        .filter((id): id is number => id !== null)

      if (apiIds.length === 0) {
        return NextResponse.json({
          message: 'Active matches exist but none have api_football_id. Skipping API poll.',
          activeMatchesCount: activeMatches.length
        })
      }

      // Hit API-Football fixtures endpoint with ids
      const idsParam = apiIds.join('-')
      const res = await fetch(`${API_URL}/fixtures?ids=${idsParam}`, {
        headers: {
          'x-apisports-key': API_KEY,
          'x-rapidapi-key': API_KEY,
        },
        next: { revalidate: 0 },
      })

      if (!res.ok) {
        throw new Error(`API-Football live responded with status ${res.status}`)
      }

      const data = await res.json()
      const apiFixtures = data.response || []
      const updatedMatches = []

      for (const item of apiFixtures) {
        const fixtureId = item.fixture.id
        const scoreA = item.goals.home ?? 0
        const scoreB = item.goals.away ?? 0
        const apiStatus = item.fixture.status.short
        const dbStatus = mapStatus(apiStatus)

        const { data: updatedMatch, error: updateError } = await supabase
          .from('matches')
          .update({
            score_a: scoreA,
            score_b: scoreB,
            status: dbStatus,
            updated_at: new Date().toISOString(),
          })
          .eq('api_football_id', fixtureId)
          .select()

        if (updateError) {
          console.error(`Update error for fixture ${fixtureId}:`, updateError)
        } else if (updatedMatch && updatedMatch.length > 0) {
          updatedMatches.push(updatedMatch[0])
        }
      }

      return NextResponse.json({
        message: 'Live poll sync completed successfully',
        checkedIdsCount: apiIds.length,
        updatedCount: updatedMatches.length,
        updatedMatches: updatedMatches.map(m => `${m.team_a} ${m.score_a}-${m.score_b} ${m.team_b} (${m.status})`)
      })
    }

  } catch (error: any) {
    console.error('Error syncing matches:', error)
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}
