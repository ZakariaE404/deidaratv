'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Send, Home, Calendar, BookOpen, Search } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const isHomeActive = pathname === '/'
  const isBlogActive = pathname.startsWith('/blog')

  return (
    <header className="sticky top-0 z-[100] w-full glass-panel border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20" dir="rtl">
          
          {/* Logo & Desktop Nav */}
          <div className="flex items-center gap-8 lg:gap-12">
            <Link href="/" className="flex items-center gap-3 active:scale-95 transition-all select-none group">
              <img 
                src="/imgs/icon.png" 
                alt="DeidaraTV Logo" 
                className="h-10 md:h-12 w-auto object-contain transition-opacity group-hover:opacity-95" 
              />
              <div className="relative flex flex-col">
                <span className="text-xl md:text-2xl font-black italic tracking-tighter uppercase leading-none text-white">
                  Deidara<span className="text-brand-primary">TV</span>
                </span>
                <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mt-0.5">
                  Kora Live
                </span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              <Link 
                href="/" 
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-bold text-sm border ${
                  isHomeActive && !isBlogActive
                    ? 'text-white bg-white/5 border-brand-primary/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border-transparent'
                }`}
              >
                <Home className={`w-4 h-4 ${isHomeActive && !isBlogActive ? 'text-brand-primary' : 'text-slate-400'}`} />
                الرئيسية
              </Link>
              <Link 
                href="/#fixtures" 
                className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all font-semibold text-sm border border-transparent"
              >
                <Calendar className="w-4 h-4" />
                جدول المباريات
              </Link>
              <Link 
                href="/blog" 
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-bold text-sm border ${
                  isBlogActive
                    ? 'text-white bg-white/5 border-brand-primary/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border-transparent'
                }`}
              >
                <BookOpen className={`w-4 h-4 ${isBlogActive ? 'text-brand-primary' : 'text-slate-400'}`} />
                أهم الأخبار
              </Link>
            </nav>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <a 
              href="https://t.me/deidaraTV" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#1e293b] hover:bg-[#2e3e56] border border-slate-700 hover:border-brand-accent text-white px-3 py-2 md:px-4 md:py-2 rounded-xl transition-all flex items-center gap-2 font-bold text-sm"
            >
              <Send className="w-4 h-4 text-[#38bdf8] rotate-[-45deg]" />
              <span className="hidden sm:inline text-slate-200">انضم إلينا</span>
            </a>

            <Link
              href="/admin/dashboard"
              className="hidden sm:flex items-center justify-center p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors border border-transparent hover:border-slate-800"
              title="لوحة التحكم"
            >
              <Search className="w-5 h-5" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden glass-panel border-b border-brand-border absolute w-full left-0 animate-fade-in z-50 shadow-2xl bg-[#0b0f19]/95 backdrop-blur-xl transition-all duration-300" dir="rtl">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold border ${
                isHomeActive && !isBlogActive
                  ? 'text-white bg-brand-primary/10 border-brand-primary/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5 border-transparent'
              }`}
            >
              <Home className={`w-5 h-5 ${isHomeActive && !isBlogActive ? 'text-brand-primary' : 'text-slate-400'}`} />
              الرئيسية
            </Link>
            <Link
              href="/#fixtures"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-all font-semibold border border-transparent"
            >
              <Calendar className="w-5 h-5 text-slate-400" />
              جدول المباريات
            </Link>
            <Link
              href="/blog"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold border ${
                isBlogActive
                  ? 'text-white bg-brand-primary/10 border-brand-primary/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5 border-transparent'
              }`}
            >
              <BookOpen className={`w-5 h-5 ${isBlogActive ? 'text-brand-primary' : 'text-slate-400'}`} />
              أهم الأخبار
            </Link>
            <Link
              href="/admin/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-all font-semibold border border-transparent"
            >
              <Search className="w-5 h-5 text-slate-400" />
              لوحة التحكم (أدمن)
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
