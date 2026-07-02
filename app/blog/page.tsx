import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { BookOpen, Calendar, ChevronLeft, ArrowRight } from 'lucide-react'
import { Metadata } from 'next'

export const revalidate = 900 // 15 minutes static revalidation window

export const metadata: Metadata = {
  title: 'أخبار الرياضة وكأس العالم 2026 | Deidara TV',
  description: 'تابع أحدث أخبار وتغطيات مباريات كأس العالم 2026 والدوريات الكبرى. تقارير حصرية وتحليلات يومية للمباريات على ديدارا تي في.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'أخبار الرياضة وكأس العالم 2026 | Deidara TV',
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
    'name': 'أخبار الرياضة وتغطيات كأس العالم 2026 | Deidara TV',
    'description': 'تابع أحدث أخبار وتغطيات مباريات كأس العالم 2026 والدوريات الكبرى. تقارير حصرية وتحليلات يومية للمباريات على ديدارا تي في.',
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 flex flex-col gap-8" dir="rtl">
        
        {/* Breadcrumb / Nav */}
        <Link 
          href="/" 
          className="flex items-center gap-1.5 text-xs md:text-sm font-bold text-slate-400 hover:text-white transition-colors self-start"
        >
          <ArrowRight className="w-4 h-4" />
          العودة للرئيسية
        </Link>

        <div className="flex items-center gap-3 border-b border-brand-border pb-4">
          <BookOpen className="w-6 h-6 text-brand-primary" />
          <h1 className="text-xl md:text-3xl font-extrabold text-white">أهم الأخبار وتغطيات كأس العالم 2026</h1>
        </div>

        {blogList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogList.map((blog) => (
              <Link 
                key={blog.id} 
                href={`/blog/${blog.slug}`}
                className="group"
              >
                <div className="blog-card-cover glass-card rounded-2xl border border-brand-border h-full flex flex-col justify-between overflow-hidden transition-all duration-300">
                  <div className="flex flex-col">
                    {blog.image_url ? (
                      <div className="relative aspect-video w-full overflow-hidden bg-slate-950/40">
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
                        <BookOpen className="w-10 h-10 text-slate-700" />
                      </div>
                    )}

                    <div className="p-5 flex flex-col gap-3">
                      <span className="text-[10px] font-bold text-brand-primary flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(blog.created_at).toLocaleDateString('ar-EG', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                      
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
            ))}
          </div>
        ) : (
          <div className="glass-card rounded-2xl p-16 border border-brand-border text-center">
            <p className="text-slate-400 font-bold text-base md:text-lg">لا توجد مقالات منشورة حالياً</p>
            <p className="text-xs text-slate-500 mt-1">تأكد من مراجعة لوحة التحكم لإضافة وتعديل المقالات.</p>
          </div>
        )}
      </div>
    </>
  )
}
