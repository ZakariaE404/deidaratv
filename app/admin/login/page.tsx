'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { LogIn, ArrowRight, ShieldAlert } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const supabase = createClient()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        throw authError
      }

      // Use window.location.href to force a full page reload and ensure cookies are sent to middleware
      window.location.href = '/admin/dashboard'
    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء تسجيل الدخول')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center px-4" dir="rtl">
      
      {/* Back button */}
      <button 
        onClick={() => router.push('/')}
        className="mb-6 flex items-center gap-1 text-slate-400 hover:text-white font-bold text-xs md:text-sm transition-colors"
      >
        <ArrowRight className="w-4 h-4" />
        العودة للصفحة الرئيسية
      </button>

      <div className="w-full max-w-md glass-card border border-brand-border rounded-3xl p-6 md:p-8 flex flex-col gap-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-24 h-24 bg-brand-primary/5 rounded-full blur-2xl pointer-events-none"></div>

        {/* Title */}
        <div className="flex flex-col gap-1.5 text-center">
          <span className="text-2xl font-black text-white">تسجيل دخول المشرف</span>
          <span className="text-xs text-slate-500 font-medium">لوحة الإشراف وإدارة مباريات Deidara TV</span>
        </div>

        {/* Errors */}
        {error && (
          <div className="bg-red-950/40 border border-red-800/50 rounded-xl p-3.5 text-red-400 text-xs font-bold flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-slate-400 font-bold pr-1">البريد الإلكتروني</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@deidaratv.live"
              className="w-full bg-[#070b13] border border-brand-border rounded-xl py-3 px-4 text-xs md:text-sm text-slate-200 placeholder-slate-650 focus:outline-none focus:border-brand-primary transition-colors text-right"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-slate-400 font-bold pr-1">كلمة المرور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full bg-[#070b13] border border-brand-border rounded-xl py-3 px-4 text-xs md:text-sm text-slate-200 placeholder-slate-650 focus:outline-none focus:border-brand-primary transition-colors text-right"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-brand-primary hover:bg-rose-700 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-brand-primary/10 hover:shadow-brand-primary/20"
          >
            <LogIn className="w-4 h-4" />
            {loading ? 'جاري التحقق...' : 'دخول المشرف'}
          </button>
        </form>
      </div>

    </div>
  )
}
