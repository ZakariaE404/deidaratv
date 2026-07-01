'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { slugify } from '@/lib/utils'
import DOMPurify from 'dompurify'
import { 
  Trophy, 
  FileText, 
  LogOut, 
  RefreshCw, 
  Save, 
  ToggleLeft, 
  ToggleRight, 
  Plus, 
  Trash2, 
  Check, 
  AlertCircle 
} from 'lucide-react'

interface Match {
  id: string
  api_football_id?: number | null
  slug: string
  team_a: string
  team_b: string
  team_a_logo?: string | null
  team_b_logo?: string | null
  score_a: number
  score_b: number
  status: string
  is_manual: boolean
  start_time: string
  league?: string | null
  channel?: string | null
  servers: { name: string; url: string }[]
}

interface Blog {
  id: string
  title: string
  slug: string
  content: string
  meta_description?: string | null
  created_at: string
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const supabase = createClient()

  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'matches' | 'blogs'>('matches')

  // Status updates
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)
  const [syncing, setSyncing] = useState(false)

  // Matches State
  const [matches, setMatches] = useState<Match[]>([])
  const [editingMatch, setEditingMatch] = useState<Partial<Match> | null>(null)
  
  // Custom Match form state
  const [showAddMatch, setShowAddMatch] = useState(false)
  const [newMatch, setNewMatch] = useState({
    team_a: '',
    team_b: '',
    team_a_logo: '',
    team_b_logo: '',
    score_a: 0,
    score_b: 0,
    status: 'NS',
    start_time: '',
    league: 'كأس العالم 2026',
    channel: 'beIN Sports HD 1',
    servers: [{ name: 'سيرفر 1', url: '' }]
  })

  // Blogs State
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [newBlog, setNewBlog] = useState({
    title: '',
    meta_description: '',
    content: ''
  })

  // API Fixtures Import State
  const [showApiImport, setShowApiImport] = useState(false)
  const [apiFixtures, setApiFixtures] = useState<any[]>([])
  const [fetchingFixtures, setFetchingFixtures] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  // Check auth session
  useEffect(() => {
    const getSessionData = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/admin/login')
      } else {
        setSession(session)
        fetchData()
      }
      setLoading(false)
    }
    getSessionData()
  }, [router, supabase])

  const fetchData = async () => {
    // Fetch matches
    const { data: matchesData } = await supabase
      .from('matches')
      .select('*')
      .order('start_time', { ascending: false })
    
    if (matchesData) setMatches(matchesData)

    // Fetch blogs
    const { data: blogsData } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (blogsData) setBlogs(blogsData)
  }

  const showNotification = (text: string, type: 'success' | 'error') => {
    setMessage({ text, type })
    setTimeout(() => setMessage(null), 4000)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  // --- SYNC CONTROLLERS ---
  const triggerSync = async (mode: 'live' | 'daily') => {
    setSyncing(true)
    try {
      const res = await fetch(`/api/sync?mode=${mode}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Sync failed')
      
      showNotification(`اكتمل المزامنة بنجاح: ${data.message || ''}`, 'success')
      fetchData()
    } catch (err: any) {
      showNotification(`فشلت المزامنة: ${err.message}`, 'error')
    } finally {
      setSyncing(false)
    }
  }

  const fetchApiFixtures = async () => {
    setFetchingFixtures(true)
    setApiFixtures([])
    try {
      const res = await fetch(`/api/fixtures?date=${selectedDate}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to fetch fixtures')
      setApiFixtures(data.fixtures || [])
      showNotification(`تم العثور على ${data.fixtures?.length || 0} مباراة لهذه التاريخ.`, 'success')
    } catch (err: any) {
      showNotification(`خطأ في جلب المباريات: ${err.message}`, 'error')
    } finally {
      setFetchingFixtures(false)
    }
  }

  const handleImportMatch = async (fixture: any) => {
    try {
      const alreadyExists = matches.some(m => m.api_football_id === fixture.api_football_id)
      if (alreadyExists) {
        showNotification('هذه المباراة مضافة بالفعل في النظام!', 'error')
        return
      }

      const generatedSlug = `${slugify(fixture.team_a)}-vs-${slugify(fixture.team_b)}-${fixture.api_football_id}`

      const { error } = await supabase
        .from('matches')
        .insert({
          api_football_id: fixture.api_football_id,
          slug: generatedSlug,
          team_a: fixture.team_a,
          team_b: fixture.team_b,
          team_a_logo: fixture.team_a_logo || null,
          team_b_logo: fixture.team_b_logo || null,
          score_a: Number(fixture.score_a),
          score_b: Number(fixture.score_b),
          status: fixture.status === 'FT' ? 'FT' : (fixture.status === 'NS' ? 'NS' : 'LIVE'),
          start_time: fixture.start_time,
          league: fixture.league,
          channel: 'beIN Sports HD 1',
          servers: [{ name: 'سيرفر 1', url: '' }],
          is_manual: false
        })

      if (error) throw error

      showNotification(`تم إضافة مباراة ${fixture.team_a} ضد ${fixture.team_b} بنجاح!`, 'success')
      setApiFixtures(prev => prev.filter(f => f.api_football_id !== fixture.api_football_id))
      fetchData()
    } catch (err: any) {
      showNotification(`فشل إضافة المباراة: ${err.message}`, 'error')
    }
  }

  // --- MATCH MANAGER CONTROLLERS ---
  const handleUpdateMatchField = (id: string, field: keyof Match, value: any) => {
    setMatches(prev => prev.map(m => m.id === id ? { ...m, [field]: value } : m))
  }

  const handleUpdateMatchServer = (matchId: string, idx: number, field: 'name' | 'url', val: string) => {
    setMatches(prev => prev.map(m => {
      if (m.id === matchId) {
        const updatedServers = [...m.servers]
        updatedServers[idx] = { ...updatedServers[idx], [field]: val }
        return { ...m, servers: updatedServers }
      }
      return m
    }))
  }

  const handleAddServerField = (matchId: string) => {
    setMatches(prev => prev.map(m => {
      if (m.id === matchId) {
        return { ...m, servers: [...m.servers, { name: `سيرفر ${m.servers.length + 1}`, url: '' }] }
      }
      return m
    }))
  }

  const handleRemoveServerField = (matchId: string, idx: number) => {
    setMatches(prev => prev.map(m => {
      if (m.id === matchId) {
        const updated = m.servers.filter((_, sidx) => sidx !== idx)
        return { ...m, servers: updated }
      }
      return m
    }))
  }

  const saveMatchUpdate = async (match: Match) => {
    try {
      const { error } = await supabase
        .from('matches')
        .update({
          score_a: Number(match.score_a),
          score_b: Number(match.score_b),
          status: match.status,
          is_manual: match.is_manual,
          channel: match.channel,
          servers: match.servers,
        })
        .eq('id', match.id)

      if (error) throw error
      showNotification('تم تحديث بيانات المباراة بنجاح', 'success')
      fetchData()
    } catch (err: any) {
      showNotification(`فشل التحديث: ${err.message}`, 'error')
    }
  }

  const handleCreateMatch = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const generatedSlug = `${slugify(newMatch.team_a)}-vs-${slugify(newMatch.team_b)}-${Date.now().toString().slice(-6)}`
      
      const { error } = await supabase
        .from('matches')
        .insert({
          slug: generatedSlug,
          team_a: newMatch.team_a,
          team_b: newMatch.team_b,
          team_a_logo: newMatch.team_a_logo || null,
          team_b_logo: newMatch.team_b_logo || null,
          score_a: Number(newMatch.score_a),
          score_b: Number(newMatch.score_b),
          status: newMatch.status,
          start_time: newMatch.start_time,
          league: newMatch.league,
          channel: newMatch.channel,
          servers: newMatch.servers,
          is_manual: true // Custom matches are manual by default
        })

      if (error) throw error

      showNotification('تم إضافة المباراة بنجاح', 'success')
      setShowAddMatch(false)
      // Reset form
      setNewMatch({
        team_a: '',
        team_b: '',
        team_a_logo: '',
        team_b_logo: '',
        score_a: 0,
        score_b: 0,
        status: 'NS',
        start_time: '',
        league: 'كأس العالم 2026',
        channel: 'beIN Sports HD 1',
        servers: [{ name: 'سيرفر 1', url: '' }]
      })
      fetchData()
    } catch (err: any) {
      showNotification(`فشل إضافة المباراة: ${err.message}`, 'error')
    }
  }

  const handleDeleteMatch = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه المباراة نهائياً؟')) return
    try {
      const { error } = await supabase
        .from('matches')
        .delete()
        .eq('id', id)

      if (error) throw error
      showNotification('تم حذف المباراة بنجاح', 'success')
      fetchData()
    } catch (err: any) {
      showNotification(`فشل الحذف: ${err.message}`, 'error')
    }
  }

  // --- BLOG PUBLISHER CONTROLLERS ---
  const handlePublishBlog = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const generatedSlug = slugify(newBlog.title)
      
      // STRICT SECURITY: Sanitize user input (especially content editor) client-side before inserting to database
      const cleanContent = typeof window !== 'undefined' 
        ? DOMPurify.sanitize(newBlog.content) 
        : newBlog.content

      const { error } = await supabase
        .from('blogs')
        .insert({
          title: newBlog.title,
          slug: generatedSlug,
          meta_description: newBlog.meta_description,
          content: cleanContent,
        })

      if (error) throw error

      showNotification('تم نشر المقال بنجاح', 'success')
      setNewBlog({ title: '', meta_description: '', content: '' })
      fetchData()
    } catch (err: any) {
      showNotification(`فشل نشر المقال: ${err.message}`, 'error')
    }
  }

  const handleDeleteBlog = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المقال نهائياً؟')) return
    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id)

      if (error) throw error
      showNotification('تم حذف المقال بنجاح', 'success')
      fetchData()
    } catch (err: any) {
      showNotification(`فشل الحذف: ${err.message}`, 'error')
    }
  }

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-slate-400 font-bold">
        جاري تحميل لوحة التحكم...
      </div>
    )
  }

  if (!session) return null

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 flex flex-col gap-8" dir="rtl">
      
      {/* Header Panel */}
      <div className="glass-card rounded-3xl p-6 border border-brand-border flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col gap-1 text-center md:text-right">
          <h1 className="text-xl md:text-2xl font-black text-white">لوحة إشراف Deidara TV</h1>
          <span className="text-xs text-slate-500 font-medium">{session.user.email}</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => triggerSync('live')}
            disabled={syncing}
            className="bg-[#1e293b] hover:bg-[#28374f] border border-slate-700 disabled:opacity-50 text-brand-accent px-4 py-2 rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
            تحديث مباشر (API)
          </button>

          <button
            onClick={() => triggerSync('daily')}
            disabled={syncing}
            className="bg-[#1e293b] hover:bg-[#28374f] border border-slate-700 disabled:opacity-50 text-slate-200 px-4 py-2 rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
            مزامنة جدول اليوم (API)
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-950/30 hover:bg-red-900/40 border border-red-900/50 text-red-400 px-4 py-2 rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 transition-all"
          >
            <LogOut className="w-4 h-4" />
            خروج
          </button>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex gap-2 border-b border-brand-border pb-px">
        <button
          onClick={() => setActiveTab('matches')}
          className={`flex items-center gap-2 px-6 py-3 font-bold text-sm md:text-base border-b-2 transition-all ${
            activeTab === 'matches'
              ? 'border-brand-primary text-white'
              : 'border-transparent text-slate-455 hover:text-white'
          }`}
        >
          <Trophy className="w-4 h-4" />
          إدارة المباريات اليومية
        </button>
        <button
          onClick={() => setActiveTab('blogs')}
          className={`flex items-center gap-2 px-6 py-3 font-bold text-sm md:text-base border-b-2 transition-all ${
            activeTab === 'blogs'
              ? 'border-brand-primary text-white'
              : 'border-transparent text-slate-455 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          نشر الأخبار والمقالات
        </button>
      </div>

      {/* Message Banner */}
      {message && (
        <div className={`p-4 rounded-2xl border text-xs md:text-sm font-bold flex items-center gap-2 ${
          message.type === 'success' 
            ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-400' 
            : 'bg-rose-950/30 border-rose-800/40 text-rose-455'
        }`}>
          {message.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{message.text}</span>
        </div>
      )}

      {/* --- TAB CONTENT: MATCHES --- */}
      {activeTab === 'matches' && (
        <div className="flex flex-col gap-6">
          
          {/* Header & Buttons */}
          <div className="flex flex-wrap justify-between items-center gap-3">
            <h2 className="text-lg font-extrabold text-white">قائمة مواجهات اليوم</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setShowApiImport(!showApiImport)
                  setShowAddMatch(false)
                }}
                className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 transition-all border ${
                  showApiImport
                    ? 'bg-brand-primary text-white border-transparent'
                    : 'bg-[#1e293b] hover:bg-[#28374f] border-slate-700 text-brand-accent'
                }`}
              >
                <Plus className="w-4 h-4" />
                استيراد من الـ API
              </button>

              <button
                onClick={() => {
                  setShowAddMatch(!showAddMatch)
                  setShowApiImport(false)
                }}
                className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 transition-all border ${
                  showAddMatch
                    ? 'bg-brand-primary text-white border-transparent'
                    : 'bg-[#1e293b] hover:bg-[#28374f] border-slate-700 text-slate-200'
                }`}
              >
                <Plus className="w-4 h-4" />
                إضافة مباراة يدوية
              </button>
            </div>
          </div>

          {/* API Import Panel */}
          {showApiImport && (
            <div className="glass-card rounded-2xl p-6 border border-brand-border flex flex-col gap-5 animate-fade-in">
              <h3 className="font-extrabold text-slate-200 border-b border-brand-border pb-2 text-sm md:text-base">استيراد المباريات من API-Football</h3>
              
              <div className="flex flex-wrap items-end gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-bold">تاريخ المباريات</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="bg-[#070b13] border border-brand-border rounded-xl py-2.5 px-4 text-xs md:text-sm text-slate-200 focus:outline-none focus:border-brand-primary"
                  />
                </div>
                
                <button
                  type="button"
                  onClick={fetchApiFixtures}
                  disabled={fetchingFixtures}
                  className="bg-brand-primary hover:bg-rose-700 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-xl text-xs md:text-sm flex items-center gap-2 transition-all"
                >
                  <RefreshCw className={`w-4 h-4 ${fetchingFixtures ? 'animate-spin' : ''}`} />
                  جلب المباريات
                </button>
              </div>

              {/* API Matches List */}
              {fetchingFixtures ? (
                <div className="text-center py-8 text-xs text-slate-500 font-bold">جاري تحميل المباريات من API-Football...</div>
              ) : apiFixtures.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[450px] overflow-y-auto pr-1">
                  {apiFixtures.map((fixture) => {
                    const alreadyAdded = matches.some(m => m.api_football_id === fixture.api_football_id)
                    return (
                      <div key={fixture.api_football_id} className="bg-[#070b13]/80 border border-brand-border/60 rounded-xl p-4 flex flex-col justify-between gap-3 hover:border-brand-border transition-colors">
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-[10px] text-slate-500 font-extrabold bg-[#1e293b] px-2 py-0.5 rounded-md">
                            {fixture.league}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {new Date(fixture.start_time).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>

                        <div className="flex justify-between items-center my-1.5">
                          <div className="flex items-center gap-2">
                            {fixture.team_a_logo && <img src={fixture.team_a_logo} className="w-5 h-5 object-contain" alt="" />}
                            <span className="text-xs font-bold text-slate-200">{fixture.team_a}</span>
                          </div>
                          <span className="text-xs text-slate-500 font-extrabold">ضد</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-200">{fixture.team_b}</span>
                            {fixture.team_b_logo && <img src={fixture.team_b_logo} className="w-5 h-5 object-contain" alt="" />}
                          </div>
                        </div>

                        <div className="flex justify-between items-center border-t border-brand-border/30 pt-2.5">
                          <span className="text-[10px] text-slate-500">حالة: {fixture.status} | {fixture.score_a} - {fixture.score_b}</span>
                          <button
                            type="button"
                            disabled={alreadyAdded}
                            onClick={() => handleImportMatch(fixture)}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${
                              alreadyAdded 
                                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                : 'bg-brand-primary hover:bg-rose-700 text-white'
                            }`}
                          >
                            {alreadyAdded ? 'تمت الإضافة' : 'إضافة لجدول المباريات'}
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-xs text-slate-500 font-bold bg-[#070b13]/20 border border-dashed border-brand-border rounded-xl">
                  لا توجد مباريات معروضة. اختر تاريخاً واضغط على "جلب المباريات".
                </div>
              )}
            </div>
          )}

          {/* Add Match Modal Form */}
          {showAddMatch && (
            <form onSubmit={handleCreateMatch} className="glass-card rounded-2xl p-6 border border-brand-border flex flex-col gap-4 animate-fade-in">
              <h3 className="font-extrabold text-slate-200 border-b border-brand-border pb-2 text-sm md:text-base">إضافة مواجهة جديدة (يدوياً)</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-slate-400 font-bold">الفريق أ (المستضيف)</label>
                  <input
                    type="text"
                    required
                    value={newMatch.team_a}
                    onChange={(e) => setNewMatch(prev => ({ ...prev, team_a: e.target.value }))}
                    className="w-full bg-[#070b13] border border-brand-border rounded-xl py-2 px-3 text-xs md:text-sm text-slate-200"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-slate-400 font-bold">الفريق ب (الضيف)</label>
                  <input
                    type="text"
                    required
                    value={newMatch.team_b}
                    onChange={(e) => setNewMatch(prev => ({ ...prev, team_b: e.target.value }))}
                    className="w-full bg-[#070b13] border border-brand-border rounded-xl py-2 px-3 text-xs md:text-sm text-slate-200"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-slate-400 font-bold">رابط شعار الفريق أ (اختياري)</label>
                  <input
                    type="url"
                    value={newMatch.team_a_logo}
                    onChange={(e) => setNewMatch(prev => ({ ...prev, team_a_logo: e.target.value }))}
                    className="w-full bg-[#070b13] border border-brand-border rounded-xl py-2 px-3 text-xs md:text-sm text-slate-200"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-slate-400 font-bold">رابط شعار الفريق ب (اختياري)</label>
                  <input
                    type="url"
                    value={newMatch.team_b_logo}
                    onChange={(e) => setNewMatch(prev => ({ ...prev, team_b_logo: e.target.value }))}
                    className="w-full bg-[#070b13] border border-brand-border rounded-xl py-2 px-3 text-xs md:text-sm text-slate-200"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-slate-400 font-bold">توقيت الانطلاق (بالتوقيت المحلي/GMT)</label>
                  <input
                    type="datetime-local"
                    required
                    value={newMatch.start_time}
                    onChange={(e) => setNewMatch(prev => ({ ...prev, start_time: e.target.value }))}
                    className="w-full bg-[#070b13] border border-brand-border rounded-xl py-2 px-3 text-xs md:text-sm text-slate-200"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-slate-400 font-bold">البطولة / الدوري</label>
                  <input
                    type="text"
                    value={newMatch.league}
                    onChange={(e) => setNewMatch(prev => ({ ...prev, league: e.target.value }))}
                    className="w-full bg-[#070b13] border border-brand-border rounded-xl py-2 px-3 text-xs md:text-sm text-slate-200"
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end mt-2">
                <button
                  type="button"
                  onClick={() => setShowAddMatch(false)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-xl text-xs md:text-sm font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="bg-brand-primary hover:bg-rose-700 text-white px-6 py-2 rounded-xl text-xs md:text-sm font-bold"
                >
                  حفظ المباراة
                </button>
              </div>
            </form>
          )}

          {/* List of Matches Grid (Bento Boxes) */}
          <div className="flex flex-col gap-6">
            {matches.map((match) => (
              <div key={match.id} className="glass-card rounded-2xl p-5 border border-brand-border flex flex-col gap-4">
                
                {/* Header (Teams summary) */}
                <div className="flex flex-wrap justify-between items-center border-b border-brand-border pb-3 gap-2">
                  <div className="flex items-center gap-2 font-extrabold text-white text-sm md:text-base">
                    <span>{match.team_a}</span>
                    <span className="text-slate-500 text-xs">ضد</span>
                    <span>{match.team_b}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Manual Override switch */}
                    <button
                      onClick={() => handleUpdateMatchField(match.id, 'is_manual', !match.is_manual)}
                      className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white"
                    >
                      {match.is_manual ? (
                        <>
                          <ToggleRight className="w-6 h-6 text-brand-primary" />
                          <span className="text-brand-primary">تحكم يدوي مفعل</span>
                        </>
                      ) : (
                        <>
                          <ToggleLeft className="w-6 h-6 text-slate-600" />
                          <span>تحديث تلقائي (API)</span>
                        </>
                      )}
                    </button>
                    
                    <button
                      onClick={() => handleDeleteMatch(match.id)}
                      className="p-1.5 text-slate-500 hover:text-red-500 rounded-lg hover:bg-red-950/20 transition-all"
                      title="حذف"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Inline score and status controls */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-500 font-bold">أهداف {match.team_a}</label>
                    <input
                      type="number"
                      value={match.score_a}
                      onChange={(e) => handleUpdateMatchField(match.id, 'score_a', e.target.value)}
                      className="w-full bg-[#070b13] border border-brand-border rounded-xl py-2 px-3 text-xs md:text-sm text-slate-200"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-500 font-bold">أهداف {match.team_b}</label>
                    <input
                      type="number"
                      value={match.score_b}
                      onChange={(e) => handleUpdateMatchField(match.id, 'score_b', e.target.value)}
                      className="w-full bg-[#070b13] border border-brand-border rounded-xl py-2 px-3 text-xs md:text-sm text-slate-200"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-500 font-bold">حالة المباراة</label>
                    <select
                      value={match.status}
                      onChange={(e) => handleUpdateMatchField(match.id, 'status', e.target.value)}
                      className="w-full bg-[#070b13] border border-brand-border rounded-xl py-2 px-3 text-xs md:text-sm text-slate-200 focus:outline-none"
                    >
                      <option value="NS">لم تبدأ (NS)</option>
                      <option value="LIVE">مباشر (LIVE)</option>
                      <option value="FT">انتهت (FT)</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-500 font-bold">القناة الناقلة</label>
                    <input
                      type="text"
                      value={match.channel || ''}
                      onChange={(e) => handleUpdateMatchField(match.id, 'channel', e.target.value)}
                      className="w-full bg-[#070b13] border border-brand-border rounded-xl py-2 px-3 text-xs md:text-sm text-slate-200"
                    />
                  </div>
                </div>

                {/* Server URLs Configuration */}
                <div className="flex flex-col gap-3 border-t border-brand-border/40 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400 font-bold">خوادم البث المباشر (سيرفرات)</span>
                    <button
                      type="button"
                      onClick={() => handleAddServerField(match.id)}
                      className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1.5 rounded-lg font-bold transition-all"
                    >
                      إضافة سيرفر
                    </button>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    {match.servers?.map((server, sidx) => (
                      <div key={sidx} className="flex gap-2 items-center">
                        <input
                          type="text"
                          value={server.name}
                          placeholder="اسم السيرفر (مثلاً سيرفر 1 HD)"
                          onChange={(e) => handleUpdateMatchServer(match.id, sidx, 'name', e.target.value)}
                          className="w-1/4 bg-[#070b13] border border-brand-border rounded-xl py-1.5 px-3 text-xs text-slate-200"
                        />
                        <input
                          type="text"
                          value={server.url}
                          placeholder="الرابط المشفر Base64 أو المباشر"
                          onChange={(e) => handleUpdateMatchServer(match.id, sidx, 'url', e.target.value)}
                          className="flex-1 bg-[#070b13] border border-brand-border rounded-xl py-1.5 px-3 text-xs text-slate-200 text-left"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveServerField(match.id, sidx)}
                          className="text-red-500 hover:bg-red-950/20 p-1.5 rounded-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => saveMatchUpdate(match)}
                    className="bg-brand-primary hover:bg-rose-700 text-white px-5 py-2 rounded-xl text-xs md:text-sm font-bold flex items-center gap-1.5 transition-all shadow-md shadow-brand-primary/10"
                  >
                    <Save className="w-4 h-4" />
                    حفظ التعديلات
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

      {/* --- TAB CONTENT: BLOGS --- */}
      {activeTab === 'blogs' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Blog Editor (Left Columns) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h2 className="text-lg font-extrabold text-white">محرر المقالات الجديد</h2>

            <form onSubmit={handlePublishBlog} className="glass-card rounded-2xl p-6 border border-brand-border flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-slate-400 font-bold">عنوان المقال</label>
                <input
                  type="text"
                  required
                  value={newBlog.title}
                  onChange={(e) => setNewBlog(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full bg-[#070b13] border border-brand-border rounded-xl py-2.5 px-3 text-xs md:text-sm text-slate-200"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-slate-400 font-bold">الوصف التعريفي (Meta Description - لـ SEO)</label>
                <textarea
                  required
                  rows={2}
                  value={newBlog.meta_description}
                  onChange={(e) => setNewBlog(prev => ({ ...prev, meta_description: e.target.value }))}
                  className="w-full bg-[#070b13] border border-brand-border rounded-xl py-2 px-3 text-xs md:text-sm text-slate-200 text-right leading-relaxed"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs text-slate-400 font-bold">محتوى المقال (يدعم كود HTML المنسق أو النصوص)</label>
                  <span className="text-[10px] text-slate-500">سيتم تصفية الأكواد الضارة تلقائياً</span>
                </div>
                <textarea
                  required
                  rows={10}
                  value={newBlog.content}
                  onChange={(e) => setNewBlog(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="اكتب المحتوى هنا... يمكنك استخدام وسوم HTML مثل <p> و <h2> و <strong> و <ul> لتهيئة مقالك."
                  className="w-full bg-[#070b13] border border-brand-border rounded-xl py-3 px-4 text-xs md:text-sm text-slate-200 leading-relaxed text-right font-mono"
                />
              </div>

              <button
                type="submit"
                className="bg-brand-primary hover:bg-rose-700 text-white font-bold py-3 rounded-xl text-xs md:text-sm transition-all flex items-center justify-center gap-2 mt-2 shadow-lg shadow-brand-primary/10"
              >
                <Save className="w-4 h-4" />
                نشر المقال الجديد
              </button>
            </form>
          </div>

          {/* Published Articles List (Right Column) */}
          <div className="flex flex-col gap-6">
            <h2 className="text-lg font-extrabold text-white">المقالات المنشورة</h2>

            <div className="flex flex-col gap-4">
              {blogs.map((blog) => (
                <div key={blog.id} className="glass-card rounded-2xl p-4 border border-brand-border flex justify-between items-start gap-3">
                  <div className="flex flex-col gap-1 max-w-[80%]">
                    <span className="text-[9px] text-slate-500 font-bold">
                      {new Date(blog.created_at).toLocaleDateString('ar-EG')}
                    </span>
                    <h4 className="text-xs md:text-sm font-bold text-slate-250 line-clamp-2">
                      {blog.title}
                    </h4>
                  </div>

                  <button
                    onClick={() => handleDeleteBlog(blog.id)}
                    className="p-1.5 text-slate-500 hover:text-red-500 rounded-lg hover:bg-red-950/20 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {blogs.length === 0 && (
                <p className="text-xs text-slate-500 font-bold text-center py-8">لا توجد مقالات منشورة بعد.</p>
              )}
            </div>
          </div>

        </div>
      )}

    </div>
  )
}
