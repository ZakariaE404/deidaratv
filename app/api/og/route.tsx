import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const matchId = searchParams.get('matchId')

    if (!matchId) {
      // Fallback preview
      return new ImageResponse(
        (
          <div
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#0b0f19',
              backgroundImage: 'radial-gradient(circle at 50% 50%, #1e1b4b 0%, #0b0f19 100%)',
              color: '#fff',
            }}
          >
            <span style={{ fontSize: '64px', fontWeight: 'bold' }}>
              Deidara<span style={{ color: '#e11d48' }}>TV</span>
            </span>
            <span style={{ fontSize: '24px', color: '#94a3b8', marginTop: '20px', letterSpacing: '4px' }}>
              KORA LIVE STREAMING
            </span>
          </div>
        ),
        { width: 1200, height: 630 }
      )
    }

    const supabase = createAdminClient()
    const { data: match } = await supabase
      .from('matches')
      .select('*')
      .eq('id', matchId)
      .single()

    if (!match) {
      return new Response('Match not found', { status: 404 })
    }

    const isLive = match.status === 'LIVE'
    const isFinished = match.status === 'FT'

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0b0f19',
            backgroundImage: 'radial-gradient(circle at 50% 50%, #161a2b 0%, #0b0f19 100%)',
            padding: '40px',
            color: '#fff',
          }}
        >
          {/* Top Brand Logo */}
          <div
            style={{
              position: 'absolute',
              top: '40px',
              left: '40px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span style={{ fontSize: '28px', fontWeight: 'bold' }}>
              Deidara<span style={{ color: '#e11d48' }}>TV</span>
            </span>
            <span style={{ fontSize: '10px', color: '#64748b', letterSpacing: '2px', fontWeight: 'bold' }}>
              KORA LIVE
            </span>
          </div>

          {/* League Badge */}
          <div
            style={{
              display: 'flex',
              padding: '8px 20px',
              borderRadius: '24px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#94a3b8',
              marginBottom: '30px',
            }}
          >
            {match.league || 'كأس العالم 2026'}
          </div>

          {/* Match container */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '85%',
              margin: '0 auto',
            }}
          >
            {/* Team A */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
              }}
            >
              {match.team_a_logo ? (
                <img
                  src={match.team_a_logo}
                  alt={match.team_a}
                  width="130"
                  height="130"
                  style={{ objectFit: 'contain' }}
                />
              ) : (
                <div
                  style={{
                    width: '130px',
                    height: '130px',
                    borderRadius: '50%',
                    backgroundColor: '#1f2937',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '44px',
                    fontWeight: 'bold',
                  }}
                >
                  {match.team_a.substring(0, 2)}
                </div>
              )}
              <span style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '16px', textAlign: 'center' }}>
                {match.team_a}
              </span>
            </div>

            {/* Score box */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 40px',
              }}
            >
              {isLive || isFinished ? (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: '72px', fontWeight: 'bold', color: isLive ? '#e11d48' : '#fff' }}>
                    {match.score_a}
                  </span>
                  <span style={{ fontSize: '48px', color: '#475569', margin: '0 24px' }}>-</span>
                  <span style={{ fontSize: '72px', fontWeight: 'bold', color: isLive ? '#e11d48' : '#fff' }}>
                    {match.score_b}
                  </span>
                </div>
              ) : (
                <span style={{ fontSize: '48px', fontWeight: 'bold', color: '#475569' }}>VS</span>
              )}

              {isLive && (
                <span
                  style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#e11d48',
                    backgroundColor: 'rgba(225, 29, 72, 0.12)',
                    border: '1px solid rgba(225, 29, 72, 0.25)',
                    padding: '6px 16px',
                    borderRadius: '16px',
                    marginTop: '20px',
                    letterSpacing: '1px',
                  }}
                >
                  🔴 LIVE
                </span>
              )}
            </div>

            {/* Team B */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
              }}
            >
              {match.team_b_logo ? (
                <img
                  src={match.team_b_logo}
                  alt={match.team_b}
                  width="130"
                  height="130"
                  style={{ objectFit: 'contain' }}
                />
              ) : (
                <div
                  style={{
                    width: '130px',
                    height: '130px',
                    borderRadius: '50%',
                    backgroundColor: '#1f2937',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '44px',
                    fontWeight: 'bold',
                  }}
                >
                  {match.team_b.substring(0, 2)}
                </div>
              )}
              <span style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '16px', textAlign: 'center' }}>
                {match.team_b}
              </span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (error: any) {
    return new Response(`Failed to generate image: ${error.message}`, { status: 500 })
  }
}
