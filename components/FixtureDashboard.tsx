'use client'

import React, { useState } from 'react'
import MatchCard from '@/components/MatchCard'
import { Search, Flame, Calendar, CheckCircle, Trophy, ChevronDown, ChevronUp } from 'lucide-react'
import { getEffectiveStatus } from '@/lib/utils'

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
  const [showAll, setShowAll] = useState(false)
  const defaultVisibleCount = 9 // Represents exactly 3 rows on desktop (3 items per row)

  // Dynamically calculate effective status for all matches based on start time
  const matches = initialMatches.map((m) => ({
    ...m,
    status: getEffectiveStatus(m.status, m.start_time),
  }))

  // Filter matches based on search query and status tabs
  const filteredMatches = matches.filter((match) => {
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
  const liveMatches = matches.filter((m) => m.status === 'LIVE')

  // Slice displayed matches based on count toggle
  const displayedMatches = showAll ? filteredMatches : filteredMatches.slice(0, defaultVisibleCount)

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
          {/* Tabs - Scrollable on mobile with flex-shrink-0 to prevent squeezing */}
          <div className="flex gap-1.5 bg-[#0b0f19]/60 p-1 rounded-xl border border-brand-border w-full md:w-auto overflow-x-auto hide-scrollbar scroll-smooth" dir="rtl">
            <button
              onClick={() => {
                setFilter('all')
                setShowAll(false) // Reset visible count on filter change
              }}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs md:text-sm font-bold transition-all flex-shrink-0 whitespace-nowrap ${
                filter === 'all'
                  ? 'bg-brand-primary text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Trophy className="w-4 h-4 animate-pulse" />
              الكل ({matches.length})
            </button>
            <button
              onClick={() => {
                setFilter('live')
                setShowAll(false)
              }}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs md:text-sm font-bold transition-all flex-shrink-0 whitespace-nowrap ${
                filter === 'live'
                  ? 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20 pulse-live'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Flame className="w-4 h-4" />
              مباشر ({liveMatches.length})
            </button>
            <button
              onClick={() => {
                setFilter('upcoming')
                setShowAll(false)
              }}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs md:text-sm font-bold transition-all flex-shrink-0 whitespace-nowrap ${
                filter === 'upcoming'
                  ? 'bg-[#1e293b] text-brand-accent border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Calendar className="w-4 h-4" />
              القادمة ({matches.filter((m) => m.status === 'NS').length})
            </button>
            <button
              onClick={() => {
                setFilter('finished')
                setShowAll(false)
              }}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs md:text-sm font-bold transition-all flex-shrink-0 whitespace-nowrap ${
                filter === 'finished'
                  ? 'bg-slate-800 text-slate-350'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              المنتهية ({matches.filter((m) => m.status === 'FT').length})
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
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setShowAll(false)
              }}
              className="w-full bg-[#070b13] border border-brand-border rounded-xl py-2.5 pr-10 pl-4 text-xs md:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-primary transition-colors text-right"
              dir="rtl"
            />
          </div>
        </div>

        {/* Bento Grid layout of matches */}
        {displayedMatches.length > 0 ? (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {displayedMatches.map((match) => (
                <div key={match.id} className="h-full">
                  <MatchCard match={match} />
                </div>
              ))}
            </div>
            
            {/* Show More / Show Less Button */}
            {filteredMatches.length > defaultVisibleCount && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900/60 hover:bg-slate-850 border border-brand-border hover:border-brand-primary/30 text-xs md:text-sm font-bold text-slate-300 hover:text-white transition-all hover:scale-[1.02] active:scale-95"
                >
                  {showAll ? (
                    <>
                      <span>عرض أقل</span>
                      <ChevronUp className="w-4 h-4 text-brand-primary" />
                    </>
                  ) : (
                    <>
                      <span>عرض المزيد ({filteredMatches.length - defaultVisibleCount})</span>
                      <ChevronDown className="w-4 h-4 text-brand-primary" />
                    </>
                  )}
                </button>
              </div>
            )}
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
