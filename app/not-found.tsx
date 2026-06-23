import Link from 'next/link'
import { Home, SearchX } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 gap-6" dir="rtl">
      <div className="glass-card rounded-3xl p-10 md:p-14 border border-brand-border max-w-lg relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-brand-primary/5 rounded-full blur-[80px] pointer-events-none"></div>
        
        <SearchX className="w-16 h-16 text-slate-600 mx-auto mb-4" />
        
        <h1 className="text-4xl md:text-6xl font-black text-white mb-2">404</h1>
        <h2 className="text-lg md:text-xl font-bold text-slate-300 mb-2">الصفحة غير موجودة</h2>
        <p className="text-sm text-slate-500 mb-8 max-w-sm mx-auto">
          الصفحة التي تبحث عنها ربما تم حذفها أو أنها غير متوفرة. تأكد من صحة الرابط.
        </p>
        
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-brand-primary hover:bg-rose-700 text-white font-bold px-8 py-3.5 rounded-2xl transition-all shadow-lg shadow-brand-primary/15 hover:scale-[1.02]"
        >
          <Home className="w-5 h-5" />
          العودة للرئيسية
        </Link>
      </div>
    </div>
  )
}
