'use client'

import React from 'react'
import Link from 'next/link'
import { formatLocalTime, getEffectiveStatus } from '@/lib/utils'

interface MatchCardProps {
  match: {
    id: string
    slug: string
    team_a: string
    team_b: string
    team_a_logo?: string | null
    team_b_logo?: string | null
    score_a: number
    score_b: number
    status: string // 'NS' | 'LIVE' | 'FT'
    start_time: string
    league?: string | null
    channel?: string | null
  }
}

export default function MatchCard({ match }: MatchCardProps) {
  const effectiveStatus = getEffectiveStatus(match.status, match.start_time)
  const isLive = effectiveStatus === 'LIVE'
  const isFinished = effectiveStatus === 'FT'

  return (
    <Link href={`/match/${match.slug}`} className="block">
      <div className="glass-card rounded-2xl p-5 border border-brand-border flex flex-col gap-4 relative overflow-hidden select-none h-full justify-between">
        {/* League & Status Header */}
        <div className="flex justify-between items-center text-xs text-slate-400">
          <span className="font-semibold truncate max-w-[70%] text-slate-400">
            {match.league || 'كأس العالم'}
          </span>
          {isLive ? (
            <span className="flex items-center gap-1 bg-brand-primary/10 text-brand-primary px-2.5 py-1 rounded-full font-bold border border-brand-primary/20 pulse-live">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
              مباشر
            </span>
          ) : isFinished ? (
            <span className="bg-slate-850 text-slate-400 px-2.5 py-1 rounded-full font-bold border border-slate-800">
              انتهت
            </span>
          ) : (
            <span className="bg-slate-900 text-slate-400 px-2.5 py-1 rounded-full font-bold border border-slate-800">
              {formatLocalTime(match.start_time)}
            </span>
          )}
        </div>

        {/* Teams & Score Section */}
        <div className="flex items-center justify-between gap-2 py-3" dir="rtl">
          {/* Team A */}
          <div className="flex flex-col items-center gap-2 flex-1 text-center">
            {match.team_a_logo ? (
              <img 
                src={match.team_a_logo} 
                alt={match.team_a} 
                className="w-12 h-12 md:w-14 md:h-14 object-contain drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]"
                loading="lazy"
              />
            ) : (
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-slate-800 flex items-center justify-center font-bold text-white text-lg border border-slate-700">
                {match.team_a.substring(0, 2)}
              </div>
            )}
            <span className="text-sm md:text-base font-bold text-slate-100 max-w-[90px] truncate">
              {match.team_a}
            </span>
          </div>

          {/* Scores or VS */}
          <div className="flex flex-col items-center justify-center min-w-[70px]">
            {isLive || isFinished ? (
              <div className="flex items-center gap-3">
                <span className={`text-2xl md:text-3xl font-black tracking-tight ${isLive ? 'text-brand-primary' : 'text-slate-400'}`}>
                  {match.score_a}
                </span>
                <span className="text-slate-600 font-bold">-</span>
                <span className={`text-2xl md:text-3xl font-black tracking-tight ${isLive ? 'text-brand-primary' : 'text-slate-400'}`}>
                  {match.score_b}
                </span>
              </div>
            ) : (
              <div className="text-center">
                <span className="text-lg font-black text-slate-500 tracking-wider">VS</span>
              </div>
            )}
          </div>

          {/* Team B */}
          <div className="flex flex-col items-center gap-2 flex-1 text-center">
            {match.team_b_logo ? (
              <img 
                src={match.team_b_logo} 
                alt={match.team_b} 
                className="w-12 h-12 md:w-14 md:h-14 object-contain drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]"
                loading="lazy"
              />
            ) : (
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-slate-800 flex items-center justify-center font-bold text-white text-lg border border-slate-700">
                {match.team_b.substring(0, 2)}
              </div>
            )}
            <span className="text-sm md:text-base font-bold text-slate-100 max-w-[90px] truncate">
              {match.team_b}
            </span>
          </div>
        </div>

        {/* Footer Channel Info */}
        {match.channel && (
          <div className="text-center text-xs text-slate-500 border-t border-slate-800/40 pt-2 font-medium">
            {match.channel}
          </div>
        )}
      </div>
    </Link>
  )
}
