import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, ArrowRight, Clock, BookOpen } from 'lucide-react'
import ResponsiveAd from '@/components/ResponsiveAd'
import AdBanner from '@/components/AdBanner'

export const revalidate = 900 // 15 minutes static revalidation window

interface BlogPageProps {
  params: {
    blog_slug: string
  }
}

async function getBlog(slug: string) {
  try {
    const supabase = createClient()
    const decodedSlug = decodeURIComponent(slug)
    const { data: blog, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', decodedSlug)
      .single()
    
    if (error) {
      console.error('Supabase blog fetch error:', error.message)
      return null
    }
    return blog
  } catch (err) {
    console.error('Failed to fetch blog:', err)
    return null
  }
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const blog = await getBlog(params.blog_slug)
  if (!blog) {
    return {
      title: 'المقال غير موجود | Deidara TV',
    }
  }

  const ogImage = blog.image_url || 'https://deidaratv.live/imgs/icon.png'

  return {
    title: `${blog.title} | أخبار Deidara TV`,
    description: blog.meta_description || 'تابع التفاصيل الكاملة للمقال الحصري على شبكة ديدارا تي في.',
    alternates: {
      canonical: `/blog/${blog.slug}`,
    },
    openGraph: {
      title: `${blog.title} | أخبار Deidara TV`,
      description: blog.meta_description || 'تابع التفاصيل الكاملة للمقال الحصري على شبكة ديدارا تي في.',
      url: `https://deidaratv.live/blog/${blog.slug}`,
      siteName: 'DeidaraTV',
      type: 'article',
      locale: 'ar_AR',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${blog.title} | أخبار Deidara TV`,
      description: blog.meta_description || 'تابع التفاصيل الكاملة للمقال الحصري على شبكة ديدارا تي في.',
      images: [ogImage],
    },
    other: {
      'article:published_time': blog.created_at,
      'article:section': 'رياضة',
      'article:author': 'Deidara TV',
    },
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const blog = await getBlog(params.blog_slug)

  if (!blog) {
    notFound()
  }

  // Fetch 3 suggested blog posts (excluding current)
  const supabase = createClient()
  const { data: suggestedBlogs } = await supabase
    .from('blogs')
    .select('*')
    .neq('slug', blog.slug)
    .order('created_at', { ascending: false })
    .limit(3)

  // Calculate read time roughly
  const wordCount = blog.content.split(/\s+/).length
  const readTime = Math.max(1, Math.ceil(wordCount / 200)) // 200 wpm

  // JSON-LD: Article schema
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': blog.title,
    'description': blog.meta_description || '',
    'image': blog.image_url || 'https://deidaratv.live/imgs/icon.png',
    'datePublished': blog.created_at,
    'dateModified': blog.updated_at || blog.created_at,
    'author': {
      '@type': 'Organization',
      'name': 'Deidara TV',
      'url': 'https://deidaratv.live',
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Deidara TV',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://deidaratv.live/imgs/icon.png',
      },
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://deidaratv.live/blog/${blog.slug}`,
    },
    'wordCount': wordCount,
    'inLanguage': 'ar',
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
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'الأخبار',
        'item': 'https://deidaratv.live/blog',
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': blog.title,
        'item': `https://deidaratv.live/blog/${blog.slug}`,
      },
    ],
  }

  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 flex flex-col gap-8" dir="rtl">
        {/* Back Link */}
        <Link 
          href="/blog" 
          className="flex items-center gap-1.5 text-xs md:text-sm font-bold text-slate-400 hover:text-white transition-colors self-start"
        >
          <ArrowRight className="w-4 h-4" />
          العودة لقسم الأخبار
        </Link>

        {/* Article Header */}
        <section className="flex flex-col gap-4 border-b border-brand-border pb-6">
          <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight tracking-tight">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-semibold">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-brand-primary" />
              {new Date(blog.created_at).toLocaleDateString('ar-EG', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <span className="hidden sm:inline w-1 h-1 rounded-full bg-slate-700"></span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-brand-accent" />
              وقت القراءة: {readTime} دقيقة
            </span>
          </div>
        </section>

        {/* Blog Image Banner */}
        {blog.image_url && (
          <div className="rounded-3xl overflow-hidden border border-brand-border aspect-[21/9] w-full bg-slate-950/40 relative shadow-2xl">
            <img
              src={blog.image_url}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Top Ad banner */}
        <ResponsiveAd />

        {/* Article Reader Content */}
        <article className="glass-card rounded-3xl p-6 md:p-12 border border-brand-border leading-[1.9] text-slate-200">
          {/* We format paragraphs nicely. If content contains HTML we render it directly. */}
          <div 
            className="prose prose-invert prose-lg max-w-none text-slate-300 text-[15px] md:text-[17px] space-y-6 leading-[1.9] prose-headings:text-white prose-headings:font-bold prose-a:text-brand-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-p:text-slate-300"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </article>

        {/* Middle Native Ad Banner */}
        <AdBanner type="native" />

        {/* SEO Rich Description */}
        <section className="glass-card rounded-2xl p-6 md:p-8 border border-brand-border">
          <p className="text-sm md:text-[15px] text-slate-400 leading-[1.9] text-justify">
            تابع أحدث أخبار الكرة العربية والعالمية عبر موقع <strong className="text-brand-primary">Deidara TV</strong> (<strong className="text-brand-primary">ديدارا تي في</strong>). شاهد <strong className="text-slate-300">مباريات اليوم بث مباشر</strong> على أفضل منصة <strong className="text-slate-300">بث مباشر</strong> للمباريات. يوفر لك موقع <strong className="text-brand-primary">كورة لايف</strong> (<strong className="text-brand-primary">koora live</strong> / <strong className="text-brand-primary">kora live</strong>) تغطية شاملة لجميع الدوريات والبطولات، بما في ذلك دوري أبطال أوروبا، الدوري الإنجليزي، الدوري الإسباني، وكأس العالم. تابعنا على <strong className="text-brand-primary">Deidara TV</strong> لمتابعة أحدث المقالات والتحليلات الرياضية الحصرية.
          </p>
        </section>

        {/* Suggested Articles */}
        {suggestedBlogs && suggestedBlogs.length > 0 && (
          <section className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 rounded-full bg-brand-primary"></div>
              <h2 className="text-lg md:text-xl font-extrabold text-white">مقالات ذات صلة</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {suggestedBlogs.map((suggested: any) => (
                <Link
                  key={suggested.slug}
                  href={`/blog/${suggested.slug}`}
                  className="glass-card rounded-2xl border border-brand-border overflow-hidden group hover:border-brand-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-brand-primary/5 flex flex-col"
                >
                  {suggested.image_url && (
                    <div className="aspect-[16/9] w-full overflow-hidden bg-slate-950/40">
                      <img
                        src={suggested.image_url}
                        alt={suggested.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-4 flex flex-col gap-2.5 flex-1">
                    <h3 className="text-sm md:text-[15px] font-bold text-white leading-snug line-clamp-2 group-hover:text-brand-primary transition-colors duration-200">
                      {suggested.title}
                    </h3>
                    {suggested.meta_description && (
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                        {suggested.meta_description}
                      </p>
                    )}
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-600 mt-auto pt-1">
                      <Calendar className="w-3.5 h-3.5 text-brand-accent" />
                      {new Date(suggested.created_at).toLocaleDateString('ar-EG', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Share / Telegram Banner */}
        <section className="glass-card rounded-2xl p-6 border border-brand-border bg-[#0e1726]/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#0088cc]/10 text-[#0088cc] rounded-xl hidden sm:block">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="flex flex-col gap-0.5 text-right">
              <span className="text-sm font-bold text-slate-200">اشترك في قناتنا الإخبارية</span>
              <span className="text-xs text-slate-400">كن أول من يعلم بآخر مستجدات كأس العالم ومواعيد البث المباشر.</span>
            </div>
          </div>
          <a 
            href="https://t.me/deidaraTV" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#0088cc] hover:bg-[#0077b3] text-white font-bold px-6 py-2.5 rounded-xl text-xs md:text-sm transition-colors text-center w-full sm:w-auto"
          >
            انضم لتليجرام
          </a>
        </section>

        {/* Bottom Ad banner */}
        <ResponsiveAd />

      </div>
    </>
  )
}
