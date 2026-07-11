'use client'

import React, { useState, useEffect, useRef } from 'react'
import { decodeBase64 } from '@/lib/utils'
import { Tv, Play, Loader2 } from 'lucide-react'

interface Server {
  name: string
  url: string
  type?: string
}

interface StreamPlayerProps {
  servers: Server[]
}

declare global {
  interface Window {
    Hls: any;
  }
}

export default function StreamPlayer({ servers }: StreamPlayerProps) {
  const [activeServerIndex, setActiveServerIndex] = useState(0)
  const [isHls, setIsHls] = useState(false)
  const [hlsLoaded, setHlsLoaded] = useState(false)
  const [loading, setLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const hlsInstanceRef = useRef<any>(null)

  const activeServer = servers?.[activeServerIndex]
  const decodedUrl = activeServer ? decodeBase64(activeServer.url) : ''
  const serverType = activeServer?.type || 'auto'

  const checkIsHtml = (str: string) => {
    const trimmed = str.trim()
    return trimmed.startsWith('<') && trimmed.endsWith('>')
  }

  const isHtml = checkIsHtml(decodedUrl)

  // Detect stream type
  const checkIsHls = (url: string) => {
    if (!url) return false
    if (serverType === 'hls') return true
    if (serverType === 'iframe') return false
    if (isHtml) return false
    return url.toLowerCase().includes('.m3u8') || url.toLowerCase().includes('.mp4')
  }

  useEffect(() => {
    if (!decodedUrl) return
    const isUrlHls = checkIsHls(decodedUrl)
    setIsHls(isUrlHls)
    setLoading(true)

    if (isUrlHls) {
      // Load HLS script from CDN if not already loaded
      if (window.Hls) {
        setHlsLoaded(true)
      } else {
        const scriptId = 'hls-cdn-script'
        let script = document.getElementById(scriptId) as HTMLScriptElement
        if (!script) {
          script = document.createElement('script')
          script.id = scriptId
          script.src = 'https://cdn.jsdelivr.net/npm/hls.js@latest'
          script.async = true
          document.body.appendChild(script)
        }
        
        const handleScriptLoad = () => {
          setHlsLoaded(true)
        }
        
        script.addEventListener('load', handleScriptLoad)
        return () => {
          script.removeEventListener('load', handleScriptLoad)
        }
      }
    } else {
      setLoading(false)
    }
  }, [decodedUrl])

  useEffect(() => {
    if (!isHls || !hlsLoaded || !videoRef.current || !decodedUrl) return

    const video = videoRef.current
    const Hls = window.Hls

    // Clean up previous instance
    if (hlsInstanceRef.current) {
      hlsInstanceRef.current.destroy()
      hlsInstanceRef.current = null
    }

    if (Hls && Hls.isSupported()) {
      const hls = new Hls({
        maxMaxBufferLength: 10,
        enableWorker: true
      })
      hlsInstanceRef.current = hls
      hls.loadSource(decodedUrl)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setLoading(false)
        video.play().catch((err) => console.log('Autoplay prevented:', err))
      })
      hls.on(Hls.Events.ERROR, (event: any, data: any) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad()
              break
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError()
              break
            default:
              break
          }
        }
      })
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Fallback for native Safari
      video.src = decodedUrl
      video.addEventListener('loadedmetadata', () => {
        setLoading(false)
        video.play().catch((err) => console.log('Autoplay prevented:', err))
      })
    } else {
      setLoading(false)
    }

    return () => {
      if (hlsInstanceRef.current) {
        hlsInstanceRef.current.destroy()
        hlsInstanceRef.current = null
      }
    }
  }, [isHls, hlsLoaded, decodedUrl])

  if (!servers || servers.length === 0) {
    return (
      <div className="w-full aspect-video rounded-2xl bg-[#0e1726]/40 border border-brand-border flex flex-col items-center justify-center text-center p-6">
        <Tv className="w-12 h-12 text-slate-600 mb-3" />
        <h3 className="text-slate-300 font-bold text-base md:text-lg">البث المباشر غير متوفر حالياً</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-[280px]">
          تتوفر روابط البث المباشر قبل بداية المباراة بحوالي 15 دقيقة.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Aspect ratio 16:9 responsive frame */}
      <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black border border-brand-border shadow-2xl relative">
        {decodedUrl ? (
          isHls ? (
            <div className="w-full h-full relative bg-black">
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/85 z-10">
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="w-8 h-8 text-brand-primary animate-spin" />
                    <span className="text-xs text-slate-400 font-bold">جاري تحميل البث المباشر...</span>
                  </div>
                </div>
              )}
              <video
                ref={videoRef}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain animate-fade-in"
                poster="/imgs/cover.jpg"
              ></video>
            </div>
          ) : isHtml ? (
            <div 
              className="w-full h-full [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:border-0"
              dangerouslySetInnerHTML={{ __html: decodedUrl }}
            />
          ) : (
            <div className="w-full h-full relative">
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/85 z-10">
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="w-8 h-8 text-brand-primary animate-spin" />
                    <span className="text-xs text-slate-400 font-bold">جاري تحميل البث المباشر...</span>
                  </div>
                </div>
              )}
              <iframe
                src={decodedUrl}
                className="w-full h-full border-0"
                allowFullScreen
                allow="autoplay; encrypted-media; picture-in-picture"
                referrerPolicy="no-referrer"
                onLoad={() => setLoading(false)}
              ></iframe>
            </div>
          )
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
