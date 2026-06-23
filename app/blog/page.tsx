import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { BookOpen, Calendar, ChevronLeft, ArrowRight } from 'lucide-react'

export const revalidate = 900 // 15 minutes static revalidation window

export default async function BlogIndexPage() {
  const supabase = createClient()
  
  const { data: blogs } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false })

  const blogList = blogs || []

  return (
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
              <div className="glass-card rounded-2xl p-6 border border-brand-border h-full flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-3">
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
                
                <span className="text-xs font-bold text-brand-accent flex items-center gap-1 group-hover:underline self-start">
                  اقرأ المقال الكامل
                  <ChevronLeft className="w-3.5 h-3.5" />
                </span>
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
  )
}
