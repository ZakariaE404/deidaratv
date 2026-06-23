import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import StreamPlayer from '@/components/StreamPlayer'
import { formatLocalTime, formatLocalDate } from '@/lib/utils'
import { Metadata } from 'next'
import Link from 'next/link'
import { Tv, Calendar, Info, Send, Trophy, ArrowRight } from 'lucide-react'

export const revalidate = 900 // 15 minutes static revalidation window

interface MatchPageProps {
  params: {
    match_slug: string
  }
}

// Fetch match helper
async function getMatch(slug: string) {
  const supabase = createClient()
  const { data: match } = await supabase
    .from('matches')
    .select('*')
    .eq('slug', slug)
    .single()
  return match
}

// Dynamic SEO metadata generator
export async function generateMetadata({ params }: MatchPageProps): Promise<Metadata> {
  const match = await getMatch(params.match_slug)
  if (!match) {
    return {
      title: 'المباراة غير موجودة | Deidara TV',
    }
  }

  const isLive = match.status === 'LIVE'
  const isFinished = match.status === 'FT'

  let title = `بث مباشر مباراة ${match.team_a} ضد ${match.team_b} | Deidara TV`
  if (isLive) {
    title = `🔴 مباشر: ${match.team_a} (${match.score_a}) - (${match.score_b}) ${match.team_b} | بث مباشر كورة لايف`
  } else if (isFinished) {
    title = `النتيجة: ${match.team_a} ${match.score_a} - ${match.score_b} ${match.team_b} | ملخص المباراة Deidara TV`
  }

  const description = `شاهد البث المباشر لمباراة ${match.team_a} ضد ${match.team_b} بجودة عالية وبدون تقطيع. تابع تفاصيل المواجهة، القنوات الناقلة وتحديثات الأهداف لحظة بلحظة.`

  return {
    title,
    description,
    alternates: {
      canonical: `/match/${match.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://deidaratv.live/match/${match.slug}`,
      siteName: 'DeidaraTV',
      images: [
        {
          url: `https://deidaratv.live/api/og?matchId=${match.id}`, // Custom og image endpoint
          width: 1200,
          height: 630,
          alt: `${match.team_a} vs ${match.team_b}`,
        },
      ],
    },
  }
}

export default async function MatchPage({ params }: MatchPageProps) {
  const match = await getMatch(params.match_slug)

  if (!match) {
    notFound()
  }

  const isLive = match.status === 'LIVE'
  const isFinished = match.status === 'FT'

  // Dynamic SportsEvent Schema markup
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    'name': `${match.team_a} ضد ${match.team_b}`,
    'description': `بث مباشر مباراة ${match.team_a} ضد ${match.team_b} بجودة عالية.`,
    'startDate': match.start_time,
    'homeTeam': {
      '@type': 'SportsTeam',
      'name': match.team_a,
      'logo': match.team_a_logo || undefined,
    },
    'awayTeam': {
      '@type': 'SportsTeam',
      'name': match.team_b,
      'logo': match.team_b_logo || undefined,
    },
    'sport': 'Soccer',
    'location': {
      '@type': 'Place',
      'name': match.league || 'كأس العالم 2026',
    },
    'competitor': [
      { '@type': 'SportsTeam', 'name': match.team_a },
      { '@type': 'SportsTeam', 'name': match.team_b },
    ],
  }

  return (
    <>
      {/* Inject JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 flex flex-col gap-8" dir="rtl">
        {/* Back Link */}
        <Link 
          href="/" 
          className="flex items-center gap-1.5 text-xs md:text-sm font-bold text-slate-400 hover:text-white transition-colors self-start"
        >
          <ArrowRight className="w-4 h-4" />
          العودة للرئيسية
        </Link>

        {/* Head-to-Head Banner (Bento Style) */}
        <section className="glass-card rounded-3xl p-6 md:p-8 border border-brand-border flex flex-col md:flex-row items-center gap-6 justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none"></div>

          {/* Team A */}
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-right flex-1 justify-end">
            <span className="text-lg md:text-2xl font-black text-white order-2 md:order-1">{match.team_a}</span>
            {match.team_a_logo ? (
              <img 
                src={match.team_a_logo} 
                alt={match.team_a} 
                className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] order-1 md:order-2" 
              />
            ) : (
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-slate-800 flex items-center justify-center font-bold text-white text-xl order-1 md:order-2">
                {match.team_a.substring(0, 2)}
              </div>
            )}
          </div>

          {/* Scores / Stats Banner */}
          <div className="flex flex-col items-center justify-center min-w-[120px] gap-2">
            {isLive || isFinished ? (
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-4">
                  <span className={`text-4xl md:text-5xl font-black tracking-tight ${isLive ? 'text-brand-primary glow-text-primary' : 'text-slate-400'}`}>
                    {match.score_a}
                  </span>
                  <span className="text-slate-650 font-bold text-2xl">-</span>
                  <span className={`text-4xl md:text-5xl font-black tracking-tight ${isLive ? 'text-brand-primary glow-text-primary' : 'text-slate-400'}`}>
                    {match.score_b}
                  </span>
                </div>
                {isLive && (
                  <span className="flex items-center gap-1 bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full text-xs font-bold border border-brand-primary/20 pulse-live mt-2">
                    مباشر
                  </span>
                )}
                {isFinished && (
                  <span className="bg-slate-800 text-slate-400 px-3 py-1 rounded-full text-xs font-bold border border-slate-700 mt-2">
                    انتهت المباراة
                  </span>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1 text-center">
                <span className="text-2xl font-black text-slate-500 tracking-wider">VS</span>
                <span className="text-xs md:text-sm font-bold text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl mt-2">
                  {formatLocalTime(match.start_time)}
                </span>
              </div>
            )}
          </div>

          {/* Team B */}
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left flex-1 justify-start">
            {match.team_b_logo ? (
              <img 
                src={match.team_b_logo} 
                alt={match.team_b} 
                className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]" 
              />
            ) : (
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-slate-800 flex items-center justify-center font-bold text-white text-xl">
                {match.team_b.substring(0, 2)}
              </div>
            )}
            <span className="text-lg md:text-2xl font-black text-white">{match.team_b}</span>
          </div>
        </section>

        {/* Dynamic Stream Player Section */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2 px-1">
            <Tv className="w-5 h-5 text-brand-primary" />
            <h2 className="text-lg md:text-xl font-extrabold text-white">شاشة البث المباشر</h2>
          </div>
          
          <StreamPlayer servers={match.servers || []} />
        </section>

        {/* Details Grid (Bento Grid Style) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Info details */}
          <div className="glass-card rounded-2xl p-5 border border-brand-border flex flex-col gap-4 md:col-span-2">
            <div className="flex items-center gap-2 border-b border-brand-border pb-3">
              <Info className="w-4 h-4 text-brand-primary" />
              <h3 className="font-extrabold text-slate-200 text-sm md:text-base">بطاقة المباراة</h3>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs md:text-sm">
              <div className="flex flex-col gap-1">
                <span className="text-slate-500 font-bold">البطولة / الدوري</span>
                <span className="text-slate-200 font-extrabold">{match.league || 'كأس العالم 2026'}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-slate-500 font-bold">القناة الناقلة</span>
                <span className="text-slate-200 font-extrabold">{match.channel || 'beIN Sports HD'}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-slate-500 font-bold">التاريخ</span>
                <span className="text-slate-200 font-extrabold">{formatLocalDate(match.start_time)}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-slate-500 font-bold">التوقيت المحلي</span>
                <span className="text-slate-200 font-extrabold">{formatLocalTime(match.start_time)}</span>
              </div>
            </div>
          </div>

          {/* Telegram Promo card */}
          <div className="glass-card rounded-2xl p-5 border border-brand-border bg-[#0e1726]/40 flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-2">
              <div className="inline-flex self-start p-2.5 bg-[#0088cc]/10 text-[#0088cc] rounded-xl">
                <Send className="w-5 h-5 rotate-[-45deg]" />
              </div>
              <h3 className="font-extrabold text-slate-200 text-sm md:text-base">تحديثات الأهداف على تليجرام</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                انضم إلى قناتنا الرسمية للحصول على إشعارات الأهداف وملخصات الفيديو وروابط البث المباشر الاحتياطية فور توفرها.
              </p>
            </div>
            
            <a 
              href="https://t.me/deidaraTV" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-[#0088cc] hover:bg-[#0077b3] text-white font-bold text-center text-xs md:text-sm transition-colors block"
            >
              انضم إلينا الآن
            </a>
          </div>

        </section>

      </div>
    </>
  )
}
