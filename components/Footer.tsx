import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full border-t border-brand-border glass-panel mt-auto py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" dir="rtl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-lg font-black italic uppercase text-white leading-none">
              Deidara<span className="text-brand-primary">TV</span>
            </span>
            <span className="text-xs text-slate-500 mt-1">
              جميع الحقوق محفوظة © {new Date().getFullYear()}
            </span>
          </div>

          <div className="flex gap-6 text-sm text-slate-400">
            <Link href="/" className="hover:text-brand-primary transition-colors">
              الرئيسية
            </Link>
            <a href="https://t.me/deidaraTV" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors">
              تليجرام
            </a>
            <Link href="/blog" className="hover:text-brand-primary transition-colors">
              الأخبار
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
