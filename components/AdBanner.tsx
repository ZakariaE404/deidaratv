'use client';

import { useEffect, useRef, useState } from 'react';

interface AdBannerProps {
  type: 'leaderboard' | 'mobile' | 'native';
  className?: string;
}

export default function AdBanner({ type, className = '' }: AdBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !containerRef.current) return;
    
    // Prevent duplicate loading if scripts are already present
    if (containerRef.current.firstChild) return;

    const adContainer = containerRef.current;

    if (type === 'leaderboard') {
      const atOptionsScript = document.createElement('script');
      atOptionsScript.innerHTML = `
        atOptions = {
          'key' : 'a80c85e25ff44dbe85a001d4fc296099',
          'format' : 'iframe',
          'height' : 90,
          'width' : 728,
          'params' : {}
        };
      `;
      
      const script = document.createElement('script');
      script.src = 'https://www.highperformanceformat.com/a80c85e25ff44dbe85a001d4fc296099/invoke.js';
      script.async = true;

      adContainer.appendChild(atOptionsScript);
      adContainer.appendChild(script);
    } else if (type === 'mobile') {
      const atOptionsScript = document.createElement('script');
      atOptionsScript.innerHTML = `
        atOptions = {
          'key' : 'df048af0c4b200818dc2d1ed23fe278b',
          'format' : 'iframe',
          'height' : 50,
          'width' : 320,
          'params' : {}
        };
      `;

      const script = document.createElement('script');
      script.src = 'https://www.highperformanceformat.com/df048af0c4b200818dc2d1ed23fe278b/invoke.js';
      script.async = true;

      adContainer.appendChild(atOptionsScript);
      adContainer.appendChild(script);
    } else if (type === 'native') {
      const script = document.createElement('script');
      script.src = 'https://pl29749257.effectivecpmnetwork.com/8012d57dcffaca2ccd3f66e0bcc4ca9a/invoke.js';
      script.async = true;
      script.setAttribute('data-cfasync', 'false');

      const nativeDiv = document.createElement('div');
      nativeDiv.id = 'container-8012d57dcffaca2ccd3f66e0bcc4ca9a';

      adContainer.appendChild(script);
      adContainer.appendChild(nativeDiv);
    }
  }, [type, isMounted]);

  // Set fixed heights to avoid Cumulative Layout Shift (CLS)
  let dimensions = 'min-h-[90px] w-full max-w-[728px]';
  if (type === 'mobile') {
    dimensions = 'min-h-[50px] w-full max-w-[320px]';
  } else if (type === 'native') {
    dimensions = 'min-h-[150px] w-full max-w-[650px]';
  }

  return (
    <div 
      ref={containerRef} 
      className={`mx-auto flex items-center justify-center overflow-hidden py-3 bg-slate-900/10 rounded-xl border border-slate-800/10 ${dimensions} ${className}`}
    />
  );
}
