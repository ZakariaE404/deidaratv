'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Search, Globe, ChevronDown, PlusCircle } from 'lucide-react'
import teamsData from '@/public/data/teams.json'

interface Team {
  name: string
  logo: string
}

interface League {
  id: string
  name: string
  teams: Team[]
}

interface TeamSearchInputProps {
  value: string
  logoValue: string
  onChange: (name: string, logo: string) => void
  label: string
  placeholder?: string
}

export default function TeamSearchInput({
  value,
  logoValue,
  onChange,
  label,
  placeholder = 'ابحث عن فريق أو منتخب...'
}: TeamSearchInputProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  // Sync state with parent value on mount or change
  useEffect(() => {
    setSearchQuery(value)
  }, [value])

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Filter teams based on search query
  const getFilteredLeagues = () => {
    if (!searchQuery.trim()) {
      return teamsData.leagues
    }

    const query = searchQuery.toLowerCase().trim()
    return teamsData.leagues
      .map((league) => {
        const matchingTeams = league.teams.filter((team) =>
          team.name.toLowerCase().includes(query)
        )
        return { ...league, teams: matchingTeams }
      })
      .filter((league) => league.teams.length > 0)
  }

  const filteredLeagues = getFilteredLeagues()

  const handleSelectTeam = (name: string, logo: string) => {
    onChange(name, logo)
    setSearchQuery(name)
    setIsOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setSearchQuery(val)
    onChange(val, logoValue) // keeps the logo or lets user update it manually
    setIsOpen(true)
  }

  return (
    <div className="flex flex-col gap-1.5 w-full relative" ref={containerRef} dir="rtl">
      <label className="text-xs text-slate-400 font-bold flex items-center gap-1.5">
        {label}
        {logoValue && (
          <img
            src={logoValue}
            alt=""
            className="w-4 h-4 object-contain rounded-md bg-slate-900 border border-slate-700/50"
            onError={(e) => {
              ;(e.target as HTMLImageElement).src = teamsData.default_flag
            }}
          />
        )}
      </label>

      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full bg-[#070b13] border border-brand-border rounded-xl py-2.5 pr-10 pl-10 text-xs md:text-sm text-slate-200 focus:outline-none focus:border-brand-primary transition-all font-semibold"
        />
        <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-slate-350 transition-colors"
        >
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute top-[102%] left-0 right-0 z-50 bg-[#0c1220]/95 border border-brand-border rounded-2xl shadow-2xl max-h-72 overflow-y-auto backdrop-blur-xl animate-fade-in divide-y divide-brand-border/40 font-sans">
          {/* Option to use custom typed text */}
          {searchQuery.trim() && (
            <div
              onClick={() => handleSelectTeam(searchQuery, logoValue || teamsData.default_flag)}
              className="p-3 hover:bg-brand-primary/10 text-brand-accent cursor-pointer flex items-center justify-between text-xs font-black transition-colors"
            >
              <span className="flex items-center gap-2">
                <PlusCircle className="w-4 h-4" />
                استخدام: &quot;{searchQuery}&quot;
              </span>
              <span className="text-[10px] text-slate-500 font-bold">إضافة يدوية</span>
            </div>
          )}

          {filteredLeagues.length > 0 ? (
            filteredLeagues.map((league) => (
              <div key={league.id} className="p-2">
                <div className="text-[10px] text-slate-455 font-black px-2.5 py-1.5 flex items-center gap-1 bg-slate-900/40 rounded-lg">
                  <Globe className="w-3 h-3 text-brand-primary" />
                  {league.name}
                </div>
                <div className="grid grid-cols-1 gap-0.5 mt-1">
                  {league.teams.map((team) => (
                    <div
                      key={team.name}
                      onClick={() => handleSelectTeam(team.name, team.logo)}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-slate-800/60 rounded-xl cursor-pointer transition-all"
                    >
                      <img
                        src={team.logo}
                        alt={team.name}
                        className="w-5 h-5 object-contain rounded-md bg-slate-900 border border-slate-700/30"
                        onError={(e) => {
                          ;(e.target as HTMLImageElement).src = teamsData.default_flag
                        }}
                      />
                      <span className="text-xs md:text-sm font-bold text-slate-200">
                        {team.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-xs text-slate-500 font-bold">
              لا توجد نتائج مطابقة. اكتب الاسم بالكامل واضغط على &quot;استخدام&quot;.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
