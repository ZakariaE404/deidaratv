import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, ArrowRight, Clock, BookOpen } from 'lucide-react'

export const revalidate = 900 // 15 minutes static revalidation window

interface BlogPageProps {
  params: {
    blog_slug: string
  }
}

async function getBlog(slug: string) {
  const supabase = createClient()
  const { data: blog } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .single()
  return blog
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const blog = await getBlog(params.blog_slug)
  if (!blog) {
    return {
      title: 'المقال غير موجود | Deidara TV',
    }
  }

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
      images: [
        {
          url: 'https://deidaratv.live/imgs/icon.png',
          width: 512,
          height: 512,
          alt: blog.title,
        },
      ],
    },
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const blog = await getBlog(params.blog_slug)

  if (!blog) {
    notFound()
  }

  // Calculate read time roughly
  const wordCount = blog.content.split(/\s+/).length
  const readTime = Math.max(1, Math.ceil(wordCount / 200)) // 200 wpm

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 flex flex-col gap-8" dir="rtl">
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
        <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">
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

      {/* Article Reader Content */}
      <article className="glass-card rounded-3xl p-6 md:p-10 border border-brand-border leading-relaxed text-slate-200">
        {/* We format paragraphs nicely. If content contains HTML we render it directly. */}
        <div 
          className="prose prose-invert max-w-none text-slate-350 text-sm md:text-base space-y-6"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>

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

    </div>
  )
}
