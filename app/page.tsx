import { createClient } from '@/lib/supabase/server'
import FixtureDashboard from '@/components/FixtureDashboard'
import Link from 'next/link'
import { Newspaper, ChevronLeft, CalendarDays, Zap } from 'lucide-react'

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col gap-12" dir="rtl">
      
      {/* Premium Hero Banner (Bento Box) */}
      <section className="glass-card rounded-3xl p-6 md:p-10 border border-brand-border relative overflow-hidden flex flex-col md:flex-row items-center gap-8 justify-between">
        {/* Glow Effects */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Content */}
        <div className="flex flex-col gap-4 text-center md:text-right max-w-xl z-10">
          <div className="inline-flex self-center md:self-start items-center gap-2 bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full text-xs font-bold border border-brand-primary/20">
            <Zap className="w-3.5 h-3.5" />
            بث مباشر فائق السرعة وبدون تقطيع
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
            شاهد مباريات اليوم بث مباشر مع <span className="text-brand-primary glow-text-primary">Deidara TV</span>
          </h1>
          
          <p className="text-sm md:text-base text-slate-400 font-medium leading-relaxed">
            منصة كورة لايف Koora Live الرسمية لمتابعة أقوى مواجهات كأس العالم 2026 والدوريات العالمية بجودات متعددة تناسب جميع سرعات الإنترنت.
          </p>
        </div>

        {/* Call to Action or Quick Stats */}
        <div className="flex flex-col sm:flex-row md:flex-col gap-4 w-full md:w-auto z-10">
          <a
            href="#fixtures"
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-brand-primary hover:bg-rose-700 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-brand-primary/20 hover:shadow-brand-primary/30 transition-all hover:scale-[1.02]"
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

      {/* Main Fixtures Dashboard */}
      <section className="flex flex-col gap-4">
        <FixtureDashboard initialMatches={activeMatchesList} />
      </section>

      {/* Latest News / Blogs Section (Bento layout) */}
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
                <div className="glass-card rounded-2xl p-5 border border-brand-border h-full flex flex-col justify-between gap-4">
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
                    
                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                      {blog.meta_description}
                    </p>
                  </div>
                  
                  <span className="text-xs font-bold text-brand-accent flex items-center gap-1 group-hover:underline self-start">
                    اقرأ المزيد
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </span>
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

    </div>
  )
}
