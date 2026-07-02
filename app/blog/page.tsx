import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { BookOpen, Calendar, ChevronLeft, ArrowRight, Flame, Clock } from 'lucide-react'
import { Metadata } from 'next'

export const revalidate = 900 // 15 minutes static revalidation window

export const metadata: Metadata = {
  title: 'أخبار الرياضة وكأس العالم 2026 | كورة لايف Koora Live بث مباشر - Deidara TV',
  description: 'تابع أحدث أخبار وتغطيات مباريات كأس العالم 2026 والدوريات الكبرى. تقارير حصرية وتحليلات يومية للمباريات على ديدارا تي في كورة لايف koora live kora live بث مباشر.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'أخبار الرياضة وكأس العالم 2026 | كورة لايف بث مباشر - Deidara TV',
    description: 'تابع أحدث أخبار وتغطيات مباريات كأس العالم 2026 والدوريات الكبرى. تقارير حصرية وتحليلات يومية للمباريات على ديدارا تي في.',
    url: 'https://deidaratv.live/blog',
    type: 'website',
    siteName: 'DeidaraTV',
    images: [
      {
        url: 'https://deidaratv.live/imgs/cover.jpg',
        width: 1200,
        height: 630,
        alt: 'Deidara TV Cover',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'أخبار الرياضة وكأس العالم 2026 | Deidara TV',
    description: 'تابع أحدث أخبار وتغطيات مباريات كأس العالم 2026 والدوريات الكبرى.',
    images: ['https://deidaratv.live/imgs/cover.jpg'],
  },
}

export default async function BlogIndexPage() {
  const supabase = createClient()
  
  const { data: blogs } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false })

  const blogList = blogs || []

  // CollectionPage JSON-LD Schema
  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': 'أخبار الرياضة وتغطيات كأس العالم 2026 | كورة لايف Koora Live - Deidara TV',
    'description': 'تابع أحدث أخبار وتغطيات مباريات كأس العالم 2026 والدوريات الكبرى. تقارير حصرية وتحليلات يومية للمباريات على ديدارا تي في كورة لايف.',
    'url': 'https://deidaratv.live/blog',
    'inLanguage': 'ar',
    'hasPart': blogList.map((blog) => ({
      '@type': 'Article',
      'headline': blog.title,
      'description': blog.meta_description || '',
      'image': blog.image_url || 'https://deidaratv.live/imgs/icon.png',
      'datePublished': blog.created_at,
      'url': `https://deidaratv.live/blog/${blog.slug}`
    }))
  }

  // BreadcrumbList JSON-LD Schema
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
        'name': 'الأخبار والتقارير',
        'item': 'https://deidaratv.live/blog',
      },
    ],
  }

  return (
    <>
      {/* Inject JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 flex flex-col gap-10" dir="rtl">
        
        {/* Breadcrumb / Nav */}
        <Link 
          href="/" 
          className="flex items-center gap-1.5 text-xs md:text-sm font-bold text-slate-400 hover:text-white transition-colors self-start"
        >
          <ArrowRight className="w-4 h-4" />
          العودة للرئيسية
        </Link>

        {/* Hero Section */}
        <section className="glass-card rounded-3xl p-6 md:p-10 border border-brand-border relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col gap-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full text-xs font-bold border border-brand-primary/20 self-start">
              <Flame className="w-3.5 h-3.5" />
              أحدث الأخبار والتقارير الحصرية
            </div>
            
            <h1 className="text-2xl md:text-4xl font-black text-white leading-tight">
              أخبار الرياضة وتغطيات <span className="text-brand-primary">كأس العالم 2026</span> — كورة لايف بث مباشر
            </h1>
            
            <p className="text-sm md:text-base text-slate-400 font-medium leading-relaxed">
              تابع أحدث أخبار وتغطيات مباريات كأس العالم 2026 والدوريات الكبرى على <strong className="text-slate-300">Deidara TV</strong>. تقارير حصرية وتحليلات يومية للمباريات على <strong className="text-slate-300">كورة لايف koora live</strong> و<strong className="text-slate-300">kora live</strong>. شاهد <strong className="text-slate-300">بث مباشر</strong> لأقوى مباريات اليوم مجاناً بدون تقطيع على ديدارا تي في.
            </p>
          </div>
        </section>

        {blogList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogList.map((blog) => {
              const wordCount = (blog.content || '').split(/\s+/).length
              const readTime = Math.max(1, Math.ceil(wordCount / 200))

              return (
                <Link 
                  key={blog.id} 
                  href={`/blog/${blog.slug}`}
                  className="group"
                >
                  <div className="glass-card rounded-2xl border border-brand-border h-full flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-brand-primary/30 hover:shadow-lg hover:shadow-brand-primary/5">
                    <div className="flex flex-col">
                      {blog.image_url ? (
                        <div className="relative aspect-video w-full overflow-hidden bg-slate-950/40">
                          <img
                            src={blog.image_url}
                            alt={blog.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/80 via-transparent to-transparent"></div>
                          <div className="absolute bottom-3 right-3">
                            <span className="bg-brand-primary/20 text-brand-primary px-2.5 py-1 rounded-lg text-[10px] font-bold border border-brand-primary/30 backdrop-blur-sm">
                              مقال حصري
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-brand-primary/10 via-slate-900 to-brand-accent/5 flex items-center justify-center">
                          <BookOpen className="w-10 h-10 text-slate-700" />
                        </div>
                      )}

                      <div className="p-5 flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-brand-primary flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(blog.created_at).toLocaleDateString('ar-EG', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </span>
                          <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {readTime} دقيقة قراءة
                          </span>
                        </div>
                        
                        <h2 className="text-base md:text-lg font-extrabold text-slate-200 group-hover:text-brand-primary transition-colors line-clamp-2">
                          {blog.title}
                        </h2>
                        
                        <p className="text-xs md:text-sm text-slate-400 line-clamp-3 leading-relaxed">
                          {blog.meta_description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="p-5 pt-0">
                      <span className="text-xs font-bold text-brand-accent flex items-center gap-1 group-hover:underline self-start">
                        اقرأ المقال الكامل
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="glass-card rounded-2xl p-16 border border-brand-border text-center">
            <p className="text-slate-400 font-bold text-base md:text-lg">لا توجد مقالات منشورة حالياً</p>
            <p className="text-xs text-slate-500 mt-1">تأكد من مراجعة لوحة التحكم لإضافة وتعديل المقالات.</p>
          </div>
        )}

        {/* SEO Bottom Section */}
        <section className="glass-card rounded-2xl p-6 md:p-8 border border-brand-border">
          <h2 className="text-lg md:text-xl font-extrabold text-white mb-4">أخبار كورة لايف Koora Live — مباريات اليوم بث مباشر على Deidara TV</h2>
          <div className="space-y-3 text-sm text-slate-400 leading-relaxed">
            <p>
              اكتشف أحدث الأخبار والتقارير الرياضية الحصرية على <strong className="text-slate-300">ديدارا تي في Deidara TV</strong>، الشبكة الرقمية الأولى لمتابعة <strong className="text-slate-300">مباريات اليوم بث مباشر</strong> بدون تقطيع. نقدم لكم تغطية شاملة لأهم مباريات <strong className="text-slate-300">كأس العالم 2026</strong> والدوريات الأوروبية والعربية عبر <strong className="text-slate-300">كورة لايف koora live</strong> و <strong className="text-slate-300">kora live</strong>.
            </p>
            <p>
              تابعوا آخر المستجدات الرياضية، نتائج المباريات، جداول المواعيد، والتحليلات الفنية المعمقة على <strong className="text-slate-300">بث مباشر</strong> Deidara TV. منصتكم الموثوقة لمشاهدة أقوى المواجهات بجودة عالية HD ومجاناً عبر سيرفرات <strong className="text-slate-300">كورة لايف</strong> المتعددة.
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
