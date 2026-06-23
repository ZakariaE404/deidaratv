'use client'

import React, { useState } from 'react'
import { decodeBase64 } from '@/lib/utils'
import { Tv, Play } from 'lucide-react'

interface Server {
  name: string
  url: string
}

interface StreamPlayerProps {
  servers: Server[]
}

export default function StreamPlayer({ servers }: StreamPlayerProps) {
  const [activeServerIndex, setActiveServerIndex] = useState(0)

  if (!servers || servers.length === 0) {
    return (
      <div className="w-full aspect-video rounded-2xl bg-brand-card/85 border border-brand-border flex flex-col items-center justify-center text-center p-6">
        <Tv className="w-12 h-12 text-slate-600 mb-3" />
        <h3 className="text-slate-300 font-bold text-base md:text-lg">البث المباشر غير متوفر حالياً</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-[280px]">
          تتوفر روابط البث المباشر قبل بداية المباراة بحوالي 15 دقيقة.
        </p>
      </div>
    )
  }

  const activeServer = servers[activeServerIndex]
  const decodedUrl = decodeBase64(activeServer.url)

  return (
    <div className="flex flex-col gap-4">
      {/* Aspect ratio 16:9 responsive frame */}
      <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black border border-brand-border shadow-2xl relative">
        {decodedUrl ? (
          <iframe
            src={decodedUrl}
            className="w-full h-full border-0"
            allowFullScreen
            allow="autoplay; encrypted-media; picture-in-picture"
            referrerPolicy="no-referrer"
            sandbox="allow-scripts allow-same-origin allow-presentation allow-forms"
          ></iframe>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold animate-pulse">
            جاري تحميل سيرفر البث...
          </div>
        )}
      </div>

      {/* Servers Selection */}
      <div className="flex flex-wrap gap-2 justify-center" dir="rtl">
        {servers.map((server, idx) => (
          <button
            key={idx}
            onClick={() => setActiveServerIndex(idx)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-bold border transition-all ${
              idx === activeServerIndex
                ? 'bg-brand-primary border-brand-primary text-white shadow-lg shadow-brand-primary/20'
                : 'bg-brand-card border-brand-border text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            <Play className={`w-3.5 h-3.5 ${idx === activeServerIndex ? 'fill-white text-white' : 'text-slate-500'}`} />
            {server.name}
          </button>
        ))}
      </div>
    </div>
  )
}
