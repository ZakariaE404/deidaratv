'use client'

import React, { useState } from 'react'
import MatchCard from '@/components/MatchCard'
import { Search, Flame, Calendar, CheckCircle, Trophy } from 'lucide-react'

interface Match {
  id: string
  slug: string
  team_a: string
  team_b: string
  team_a_logo?: string | null
  team_b_logo?: string | null
  score_a: number
  score_b: number
  status: string
  start_time: string
  league?: string | null
  channel?: string | null
}

interface FixtureDashboardProps {
  initialMatches: Match[]
}

type FilterType = 'all' | 'live' | 'upcoming' | 'finished'

export default function FixtureDashboard({ initialMatches }: FixtureDashboardProps) {
  const [filter, setFilter] = useState<FilterType>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Filter matches based on search query and status tabs
  const filteredMatches = initialMatches.filter((match) => {
    const matchesSearch =
      match.team_a.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.team_b.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (match.league && match.league.toLowerCase().includes(searchQuery.toLowerCase()))

    if (!matchesSearch) return false

    if (filter === 'live') return match.status === 'LIVE'
    if (filter === 'upcoming') return match.status === 'NS'
    if (filter === 'finished') return match.status === 'FT'
    
    return true
  })

  // Live match carousel count
  const liveMatches = initialMatches.filter((m) => m.status === 'LIVE')

  return (
    <div className="flex flex-col gap-8">
      {/* Live Match Horizontal Carousel - Only shows when there are live games */}
      {liveMatches.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 px-1">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-primary pulse-live"></span>
            <h2 className="text-lg md:text-xl font-extrabold text-white tracking-tight">
              المباريات الجارية الآن
            </h2>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 pt-1 px-1 snap-x scroll-smooth hide-scrollbar -mx-4 md:mx-0 px-4 md:px-0">
            {liveMatches.map((match) => (
              <div key={match.id} className="min-w-[280px] sm:min-w-[340px] max-w-[340px] snap-start flex-shrink-0">
                <MatchCard match={match} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Fixtures Section */}
      <div className="flex flex-col gap-6" id="fixtures">
        {/* Search & Filter Header (Bento Box styled) */}
        <div className="glass-card rounded-2xl p-4 md:p-6 border border-brand-border flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Tabs */}
          <div className="flex gap-1.5 bg-brand-dark p-1 rounded-xl border border-brand-border w-full md:w-auto" dir="rtl">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs md:text-sm font-bold transition-all ${
                filter === 'all'
                  ? 'bg-brand-primary text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Trophy className="w-4 h-4" />
              الكل ({initialMatches.length})
            </button>
            <button
              onClick={() => setFilter('live')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs md:text-sm font-bold transition-all ${
                filter === 'live'
                  ? 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20 pulse-live'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Flame className="w-4 h-4" />
              مباشر ({liveMatches.length})
            </button>
            <button
              onClick={() => setFilter('upcoming')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs md:text-sm font-bold transition-all ${
                filter === 'upcoming'
                  ? 'bg-[#1e293b] text-brand-accent border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Calendar className="w-4 h-4" />
              القادمة ({initialMatches.filter((m) => m.status === 'NS').length})
            </button>
            <button
              onClick={() => setFilter('finished')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs md:text-sm font-bold transition-all ${
                filter === 'finished'
                  ? 'bg-slate-800 text-slate-350'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              المنتهية ({initialMatches.filter((m) => m.status === 'FT').length})
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-500">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="ابحث عن مباراة أو فريق..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#070b13] border border-brand-border rounded-xl py-2.5 pr-10 pl-4 text-xs md:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-primary transition-colors text-right"
              dir="rtl"
            />
          </div>
        </div>

        {/* Bento Grid layout of matches */}
        {filteredMatches.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMatches.map((match) => (
              <div key={match.id} className="h-full">
                <MatchCard match={match} />
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card rounded-2xl p-12 border border-brand-border text-center">
            <p className="text-slate-400 font-bold text-base md:text-lg">لا توجد مباريات تطابق فلتر البحث</p>
            <p className="text-xs text-slate-500 mt-1">تأكد من كتابة اسم الفريق بشكل صحيح أو اختر تبويباً آخر.</p>
          </div>
        )}
      </div>
    </div>
  )
}
