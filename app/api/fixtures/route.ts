import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

const API_URL = process.env.NEXT_PUBLIC_API_FOOTBALL_URL || 'https://v3.football.api-sports.io'
const API_KEY = process.env.API_FOOTBALL_KEY

export async function GET(request: NextRequest) {
  try {
    // 1. Verify user authentication
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Read query parameters
    const { searchParams } = new URL(request.url)
    const todayStr = new Date().toISOString().split('T')[0]
    const dateStr = searchParams.get('date') || todayStr

    // 3. Verify API Key is configured
    if (!API_KEY || API_KEY === 'your-api-football-key-here') {
      return NextResponse.json({ error: 'API_FOOTBALL_KEY is not configured' }, { status: 400 })
    }

    // 4. Fetch fixtures from API-Football
    const res = await fetch(`${API_URL}/fixtures?date=${dateStr}`, {
      headers: {
        'x-apisports-key': API_KEY,
        'x-rapidapi-key': API_KEY,
      },
      next: { revalidate: 0 },
    })

    if (!res.ok) {
      throw new Error(`API-Football responded with status ${res.status}`)
    }

    const data = await res.json()
    if (data.errors && Object.keys(data.errors).length > 0) {
      return NextResponse.json({ error: 'API Error', details: data.errors }, { status: 500 })
    }

    const fixtures = data.response || []

    // 5. Map fixtures to a clean client-friendly format
    const mapped = fixtures.map((item: any) => ({
      api_football_id: item.fixture.id,
      team_a: item.teams.home.name,
      team_b: item.teams.away.name,
      team_a_logo: item.teams.home.logo,
      team_b_logo: item.teams.away.logo,
      start_time: item.fixture.date,
      league: `${item.league.name} - ${item.league.round}`,
      status: item.fixture.status.short,
      score_a: item.goals.home ?? 0,
      score_b: item.goals.away ?? 0,
    }))

    return NextResponse.json({
      date: dateStr,
      fixtures: mapped,
    })

  } catch (error: any) {
    console.error('Error fetching fixtures:', error)
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}
