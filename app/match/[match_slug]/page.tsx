import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import StreamPlayer from '@/components/StreamPlayer'
import { formatLocalTime, formatLocalDate, getEffectiveStatus } from '@/lib/utils'
import { Metadata } from 'next'
import Link from 'next/link'
import { Tv, Calendar, Info, Send, Trophy, ArrowRight, BookOpen } from 'lucide-react'
import Image from 'next/image'
import ResponsiveAd from '@/components/ResponsiveAd'
import AdBanner from '@/components/AdBanner'

// Force dynamic rendering for live match data freshness
export const dynamic = 'force-dynamic'
export const revalidate = 0

interface MatchPageProps {
  params: {
    match_slug: string
  }
}

// Fetch match helper with error handling
async function getMatch(slug: string) {
  try {
    const supabase = createClient()
    const decodedSlug = decodeURIComponent(slug)
    const { data: match, error } = await supabase
      .from('matches')
      .select('*')
      .eq('slug', decodedSlug)
      .single()
    
    if (error) {
      console.error('Supabase match fetch error:', error.message)
      return null
    }
    return match
  } catch (err) {
    console.error('Failed to fetch match:', err)
    return null
  }
}

// Dynamic SEO metadata generator
export async function generateMetadata({ params }: MatchPageProps): Promise<Metadata> {
  const match = await getMatch(params.match_slug)
  if (!match) {
    return {
      title: 'المباراة غير موجودة | Deidara TV',
    }
  }

  const effectiveStatus = getEffectiveStatus(match.status, match.start_time)
  const isLive = effectiveStatus === 'LIVE'
  const isFinished = effectiveStatus === 'FT'
  const scoreA = match.score_a ?? 0
  const scoreB = match.score_b ?? 0

  let title = `بث مباشر مباراة ${match.team_a} ضد ${match.team_b} | Deidara TV`
  if (isLive) {
    title = `🔴 مباشر: ${match.team_a} (${scoreA}) - (${scoreB}) ${match.team_b} | بث مباشر كورة لايف`
  } else if (isFinished) {
    title = `النتيجة: ${match.team_a} ${scoreA} - ${scoreB} ${match.team_b} | ملخص المباراة Deidara TV`
  }

  const description = `شاهد البث المباشر لمباراة ${match.team_a} ضد ${match.team_b} بجودة عالية وبدون تقطيع. تابع تفاصيل المواجهة، القنوات الناقلة وتحديثات الأهداف لحظة بلحظة على كورة لايف Koora Live.`

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
      type: 'website',
      locale: 'ar_AR',
      images: [
        {
          url: `https://deidaratv.live/api/og?matchId=${match.id}`,
          width: 1200,
          height: 630,
          alt: `${match.team_a} vs ${match.team_b}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`https://deidaratv.live/api/og?matchId=${match.id}`],
    },
  }
}

export default async function MatchPage({ params }: MatchPageProps) {
  const match = await getMatch(params.match_slug)

  if (!match) {
    notFound()
  }

  // Fetch suggested blog articles
  const supabase = createClient()
  const { data: suggestedBlogs } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3)

  const effectiveStatus = getEffectiveStatus(match.status, match.start_time)
  const isLive = effectiveStatus === 'LIVE'
  const isFinished = effectiveStatus === 'FT'
  const scoreA = match.score_a ?? 0
  const scoreB = match.score_b ?? 0
  const servers = Array.isArray(match.servers) ? match.servers : []

  // Safe date formatting
  let formattedTime = ''
  let formattedDate = ''
  try {
    formattedTime = formatLocalTime(match.start_time)
    formattedDate = formatLocalDate(match.start_time)
  } catch {
    formattedTime = '--:--'
    formattedDate = 'غير محدد'
  }

  // Dynamic SportsEvent Schema markup
  const sportsEventJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    'name': `${match.team_a} ضد ${match.team_b}`,
    'description': `بث مباشر مباراة ${match.team_a} ضد ${match.team_b} بجودة عالية - ${match.league || 'كأس العالم 2026'}.`,
    'startDate': match.start_time,
    'eventStatus': isFinished ? 'https://schema.org/EventCompleted' : (isLive ? 'https://schema.org/EventScheduled' : 'https://schema.org/EventScheduled'),
    'eventAttendanceMode': 'https://schema.org/OnlineEventAttendanceMode',
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
    'offers': {
      '@type': 'Offer',
      'url': `https://deidaratv.live/match/${match.slug}`,
      'price': '0',
      'priceCurrency': 'USD',
      'availability': 'https://schema.org/InStock',
    },
  }

  // BreadcrumbList schema
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'الرئيسية',
        'item': 'https://deidaratv.live',
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': `${match.team_a} ضد ${match.team_b}`,
        'item': `https://deidaratv.live/match/${match.slug}`,
      },
    ],
  }

  // VideoObject schema when live
  const videoJsonLd = isLive && servers.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    'name': `بث مباشر ${match.team_a} ضد ${match.team_b}`,
    'description': `شاهد البث المباشر لمباراة ${match.team_a} ضد ${match.team_b} على Deidara TV`,
    'thumbnailUrl': match.team_a_logo || 'https://deidaratv.live/imgs/icon.png',
    'uploadDate': match.start_time,
    'publication': {
      '@type': 'BroadcastEvent',
      'isLiveBroadcast': true,
      'startDate': match.start_time,
    },
  } : null

  return (
    <>
      {/* Inject JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sportsEventJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {videoJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
        />
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 flex flex-col gap-8" dir="rtl">
        {/* Back Link */}
        <Link 
          href="/" 
          className="flex items-center gap-1.5 text-xs md:text-sm font-bold text-slate-400 hover:text-white transition-colors self-start"
        >
          <ArrowRight className="w-4 h-4" />
          العودة للرئيسية
        </Link>

        {/* Ad 1: Top Ad (Responsive) */}
        <ResponsiveAd />

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
                    {scoreA}
                  </span>
                  <span className="text-slate-650 font-bold text-2xl">-</span>
                  <span className={`text-4xl md:text-5xl font-black tracking-tight ${isLive ? 'text-brand-primary glow-text-primary' : 'text-slate-400'}`}>
                    {scoreB}
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
                  {formattedTime}
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

        {/* Ad 2: Before Player (Responsive - Live Only) */}
        {isLive && <ResponsiveAd />}

        {/* Dynamic Stream Player Section */}
        {isLive && (
          <section className="flex flex-col gap-4">
            <div className="flex items-center gap-2 px-1">
              <Tv className="w-5 h-5 text-brand-primary" />
              <h2 className="text-lg md:text-xl font-extrabold text-white">شاشة البث المباشر</h2>
            </div>
            
            <StreamPlayer servers={servers} />
          </section>
        )}

        {/* Ad 3: After Player (Native - Live Only) */}
        {isLive && <AdBanner type="native" />}

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
                <span className="text-slate-200 font-extrabold">{formattedDate}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-slate-500 font-bold">التوقيت المحلي</span>
                <span className="text-slate-200 font-extrabold">{formattedTime}</span>
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

        {/* Ad 4: Mid-page Native Banner (Non-Live Only) */}
        {!isLive && <AdBanner type="native" />}

        {/* Ad 5: Mid-page Responsive Banner (Live Only) */}
        {isLive && <ResponsiveAd />}

        {/* Rich SEO Content Section */}
        <section className="glass-card rounded-2xl p-6 md:p-8 border border-brand-border flex flex-col gap-6">
          <h2 className="text-xl md:text-2xl font-black text-white leading-relaxed">
            مشاهدة مباراة {match.team_a} × {match.team_b} اليوم بث مباشر بصوت المعلق — Deidara TV
          </h2>
          <p className="text-sm md:text-base text-slate-300 leading-[1.9]">
            مرحباً بك في <strong className="text-brand-primary">Deidara TV</strong> — وجهتك الأولى لمشاهدة مباراة{' '}
            <strong className="text-white">{match.team_a} ضد {match.team_b}</strong> بث مباشر اليوم بجودة عالية HD وبدون أي تقطيع.
            سواء كنت تبحث عن <strong>كورة لايف</strong> أو <strong>koora live</strong> أو <strong>kora live</strong>، فإن ديدارا تي في
            يوفر لك تجربة بث مباشر سلسة ومجانية بالكامل لجميع مباريات اليوم. يمكنك متابعة المواجهة لحظة بلحظة مع
            تحديثات فورية للنتائج والأهداف عبر خوادم البث المتعددة التي نوفرها لضمان تجربة مشاهدة بدون انقطاع.
            نحن نقدم لك أفضل تجربة بث مباشر مباريات اليوم على الإنترنت مع تعليق عربي حصري.
          </p>

          <h3 className="text-lg md:text-xl font-extrabold text-brand-accent">
            موعد مباراة {match.team_a} و {match.team_b} على Deidara TV — ديدارا تي في
          </h3>
          <p className="text-sm md:text-base text-slate-300 leading-[1.9]">
            تُقام مباراة <strong className="text-white">{match.team_a} و {match.team_b}</strong> ضمن منافسات{' '}
            <strong className="text-white">{match.league || 'كأس العالم 2026'}</strong>. يمكنك مشاهدة المباراة مباشرة على
            موقع <strong className="text-brand-primary">Deidara TV</strong> (ديدارا تي في / سير تيفي) عبر خوادم بث متعددة
            تضمن لك جودة فائقة بدون تقطيع. تابع <strong>مباريات اليوم بث مباشر</strong> بصوت المعلق واستمتع بتغطية شاملة
            تشمل تشكيلة الفريقين وتحديثات الأهداف لحظة بلحظة. سواء كنت تستخدم الهاتف أو الكمبيوتر، البث متاح
            على جميع الأجهزة بتقنية التكيف التلقائي مع سرعة الإنترنت.
          </p>

          <h3 className="text-lg md:text-xl font-extrabold text-brand-accent">
            قنوات نقل {match.team_a} ضد {match.team_b} — البث الحي على ديدارا تي في
          </h3>
          <p className="text-sm md:text-base text-slate-300 leading-[1.9]">
            يتم نقل مباراة {match.team_a} ضد {match.team_b} عبر عدة قنوات رياضية. وعلى موقع <strong className="text-brand-primary">Deidara TV</strong>{' '}
            (كورة لايف / koora live / kora live) نوفر لك روابط بث مباشر مجانية من خوادم متعددة بجودات تتراوح بين
            SD و HD و Full HD. كل ما عليك هو اختيار السيرفر المناسب والاستمتاع بمشاهدة المباراة كاملة. نحن نعمل
            على تحديث روابط البث باستمرار لضمان عمل الخوادم طوال فترة المباراة، حتى تتمكن من متابعة كل لحظة
            بدون أي مشاكل تقنية. تابعنا على تليجرام للحصول على روابط بث احتياطية فورية.
          </p>

          <h3 className="text-lg md:text-xl font-extrabold text-brand-accent">
            بطاقة المباراة — {match.team_a} Vs {match.team_b}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm md:text-base border border-brand-border rounded-xl overflow-hidden">
              <tbody>
                <tr className="border-b border-brand-border">
                  <td className="px-4 py-3 font-bold text-slate-400 bg-slate-900/50 w-1/3">🏟️ البطولة</td>
                  <td className="px-4 py-3 text-white font-extrabold">{match.league || 'كأس العالم 2026'}</td>
                </tr>
                <tr className="border-b border-brand-border">
                  <td className="px-4 py-3 font-bold text-slate-400 bg-slate-900/50">📺 اسم القناة</td>
                  <td className="px-4 py-3 text-white font-extrabold">{match.channel || 'beIN Sports HD'}</td>
                </tr>
                <tr className="border-b border-brand-border">
                  <td className="px-4 py-3 font-bold text-slate-400 bg-slate-900/50">📅 تاريخ المباراة</td>
                  <td className="px-4 py-3 text-white font-extrabold">{formattedDate}</td>
                </tr>
                <tr className="border-b border-brand-border">
                  <td className="px-4 py-3 font-bold text-slate-400 bg-slate-900/50">⏰ توقيت المباراة</td>
                  <td className="px-4 py-3 text-white font-extrabold">{formattedTime}</td>
                </tr>
                <tr className="border-b border-brand-border">
                  <td className="px-4 py-3 font-bold text-slate-400 bg-slate-900/50">🎙️ المعلق</td>
                  <td className="px-4 py-3 text-white font-extrabold">{match.commentator || 'غير محدد بعد'}</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-bold text-slate-400 bg-slate-900/50">⚽ نتيجة المباراة</td>
                  <td className="px-4 py-3 text-white font-extrabold">
                    {isLive || isFinished
                      ? `${match.team_a} ${scoreA} - ${scoreB} ${match.team_b}`
                      : 'لم تبدأ بعد'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Ad 6: Lower-page Native Banner (Live Only) */}
        {isLive && <AdBanner type="native" />}

        {/* Suggested Blog Articles */}
        {suggestedBlogs && suggestedBlogs.length > 0 && (
          <section className="flex flex-col gap-5">
            <div className="flex items-center gap-2 px-1">
              <BookOpen className="w-5 h-5 text-brand-primary" />
              <h2 className="text-lg md:text-xl font-extrabold text-white">أخبار ومقالات ذات صلة</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {suggestedBlogs.map((blog: any) => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  className="glass-card rounded-2xl border border-brand-border overflow-hidden group hover:border-brand-primary/40 transition-all duration-300"
                >
                  {blog.cover_image && (
                    <div className="relative w-full h-40 overflow-hidden">
                      <img
                        src={blog.cover_image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                  )}
                  <div className="p-4 flex flex-col gap-2">
                    <h3 className="text-sm md:text-base font-extrabold text-white line-clamp-2 group-hover:text-brand-primary transition-colors">
                      {blog.title}
                    </h3>
                    <span className="text-xs text-slate-500 font-bold">
                      {new Date(blog.created_at).toLocaleDateString('ar-EG', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Ad 7: Bottom Ad (Responsive) */}
        <ResponsiveAd />

      </div>
    </>
  )
}
