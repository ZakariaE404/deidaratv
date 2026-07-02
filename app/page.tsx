import { createClient } from '@/lib/supabase/server'
import FixtureDashboard from '@/components/FixtureDashboard'
import Link from 'next/link'
import { Newspaper, ChevronLeft, CalendarDays, Zap, Flame } from 'lucide-react'
import { getEffectiveStatus } from '@/lib/utils'
import ResponsiveAd from '@/components/ResponsiveAd'
import AdBanner from '@/components/AdBanner'

// Home page will revalidate every 30 seconds to capture live score updates
export const revalidate = 30

export default async function Home() {
  const supabase = createClient()

  // Fetch matches sorted by start time
  const { data: matches } = await supabase
    .from('matches')
    .select('*')
    .order('start_time', { ascending: true })

  // Fetch latest 3 blog articles
  const { data: blogs } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3)

  const activeMatchesList = matches || []
  const activeBlogsList = blogs || []
  const liveCount = activeMatchesList.filter(m => getEffectiveStatus(m.status, m.start_time) === 'LIVE').length

  // JSON-LD: WebSite schema with SearchAction for Google Sitelinks
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'Deidara TV',
    'alternateName': ['DeidaraTV', 'ديدارا تي في', 'كورة لايف', 'Koora Live'],
    'url': 'https://deidaratv.live',
    'inLanguage': 'ar',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': 'https://deidaratv.live/?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  // JSON-LD: Organization schema
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Deidara TV',
    'alternateName': 'DeidaraTV',
    'url': 'https://deidaratv.live',
    'logo': 'https://deidaratv.live/imgs/icon.png',
    'sameAs': [
      'https://t.me/deidaraTV',
    ],
    'description': 'Deidara TV - بث مباشر للمباريات اليوم بجودة HD بدون تقطيع. شاهد كورة لايف وتابع أهم مباريات كأس العالم 2026 والدوريات مجاناً.',
  }

  // JSON-LD: BreadcrumbList
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
    ],
  }

  return (
    <>
      {/* JSON-LD Schemas for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col gap-12" dir="rtl">
        
        {/* Premium Hero Banner with Cover Image */}
        <section className="hero-cover glass-card rounded-3xl p-6 md:p-10 border border-brand-border relative overflow-hidden flex flex-col md:flex-row items-center gap-8 justify-between min-h-[280px] md:min-h-[320px]">
          {/* Animated Glow Orbs */}
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-brand-primary/15 rounded-full blur-[100px] pointer-events-none animate-float z-[2]"></div>
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-brand-accent/8 rounded-full blur-[100px] pointer-events-none animate-float-slow z-[2]"></div>

          {/* Content */}
          <div className="flex flex-col gap-4 text-center md:text-right max-w-xl z-10 relative">
            <div className="flex flex-wrap items-center gap-2 self-center md:self-start">
              <div className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full text-xs font-bold border border-brand-primary/20 animate-fade-in-up">
                <Zap className="w-3.5 h-3.5" />
                بث مباشر فائق السرعة وبدون تقطيع
              </div>
              {liveCount > 0 && (
                <div className="inline-flex items-center gap-1.5 bg-brand-primary/15 text-brand-primary px-3 py-1 rounded-full text-xs font-bold border border-brand-primary/30 pulse-live animate-fade-in-up">
                  <Flame className="w-3.5 h-3.5" />
                  <span>{liveCount} مباراة مباشرة الآن</span>
                </div>
              )}
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight animate-fade-in-up-delay">
              شاهد مباريات اليوم بث مباشر مع <span className="text-brand-primary glow-text-primary">Deidara TV</span>
            </h1>
            
            <p className="text-sm md:text-base text-slate-400 font-medium leading-relaxed animate-fade-in-up-delay-2">
              منصة كورة لايف Koora Live الرسمية لمتابعة أقوى مواجهات كأس العالم 2026 والدوريات العالمية بجودات متعددة تناسب جميع سرعات الإنترنت.
            </p>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-4 w-full md:w-auto z-10 relative animate-fade-in-up-delay-2">
            <a
              href="#fixtures"
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 btn-shimmer text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-brand-primary/25 hover:shadow-brand-primary/40 transition-all hover:scale-[1.02]"
            >
              جدول مباريات اليوم
              <ChevronLeft className="w-5 h-5" />
            </a>
            
            <a
              href="https://t.me/deidaraTV"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#1e293b] hover:bg-[#2b394f] border border-slate-700 text-white font-bold px-8 py-4 rounded-2xl transition-all hover:scale-[1.02]"
            >
              انضم لقناة التليجرام
            </a>
          </div>
        </section>

        {/* Top Ad banner */}
        <ResponsiveAd />

        {/* Main Fixtures Dashboard */}
        <section className="flex flex-col gap-4">
          <FixtureDashboard initialMatches={activeMatchesList} />
        </section>

        {/* Middle Native Ad Banner */}
        <AdBanner type="native" />

        {/* Latest News / Blogs Section with Cover Images */}
        <section className="flex flex-col gap-6">
          <div className="flex justify-between items-center px-1">
            <div className="flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-brand-primary" />
              <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
                أحدث المقالات والأخبار
              </h2>
            </div>
            
            <Link
              href="/blog"
              className="text-xs md:text-sm font-bold text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              عرض جميع المقالات
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </div>

          {activeBlogsList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {activeBlogsList.map((blog) => (
                <Link 
                  key={blog.id} 
                  href={`/blog/${blog.slug}`}
                  className="group"
                >
                  <div className="blog-card-cover glass-card rounded-2xl border border-brand-border h-full flex flex-col justify-between overflow-hidden">
                    {/* Cover Image */}
                    {blog.image_url ? (
                      <div className="relative aspect-video w-full overflow-hidden bg-slate-950/60">
                        <img
                          src={blog.image_url}
                          alt={blog.title}
                          className="blog-cover-img w-full h-full object-cover transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/80 via-transparent to-transparent"></div>
                      </div>
                    ) : (
                      <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-brand-primary/10 via-slate-900 to-brand-accent/5 flex items-center justify-center">
                        <Newspaper className="w-10 h-10 text-slate-700" />
                      </div>
                    )}
                    
                    {/* Card Content */}
                    <div className="p-5 flex flex-col gap-3 flex-1 justify-between">
                      <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-bold text-brand-primary flex items-center gap-1">
                          <CalendarDays className="w-3.5 h-3.5" />
                          {new Date(blog.created_at).toLocaleDateString('ar-EG', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                        
                        <h3 className="text-base font-extrabold text-slate-200 group-hover:text-brand-primary transition-colors line-clamp-2">
                          {blog.title}
                        </h3>
                        
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                          {blog.meta_description}
                        </p>
                      </div>
                      
                      <span className="text-xs font-bold text-brand-accent flex items-center gap-1 group-hover:underline self-start mt-2">
                        اقرأ المزيد
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-10 border border-brand-border text-center">
              <p className="text-slate-400 font-medium">لا توجد مقالات منشورة حالياً.</p>
            </div>
          )}
        </section>

        {/* Bottom Ad banner */}
        <ResponsiveAd />

      </div>
    </>
  )
}
