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
    if (!isMounted || type !== 'native' || !containerRef.current) return;
    if (containerRef.current.firstChild) return;

    const adContainer = containerRef.current;

    const script = document.createElement('script');
    script.src = 'https://pl29749257.effectivecpmnetwork.com/8012d57dcffaca2ccd3f66e0bcc4ca9a/invoke.js';
    script.async = true;
    script.setAttribute('data-cfasync', 'false');

    const nativeDiv = document.createElement('div');
    nativeDiv.id = 'container-8012d57dcffaca2ccd3f66e0bcc4ca9a';

    adContainer.appendChild(script);
    adContainer.appendChild(nativeDiv);
  }, [type, isMounted]);

  if (!isMounted) {
    let dimensions = 'min-h-[90px] w-full max-w-[728px]';
    if (type === 'mobile') {
      dimensions = 'min-h-[50px] w-full max-w-[320px]';
    } else if (type === 'native') {
      dimensions = 'min-h-[150px] w-full max-w-[650px]';
    }
    return (
      <div 
        className={`mx-auto bg-slate-900/10 rounded-xl border border-slate-800/10 ${dimensions} ${className}`}
      />
    );
  }

  if (type === 'leaderboard') {
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <style>
          body { margin: 0; padding: 0; overflow: hidden; display: flex; justify-content: center; align-items: center; background: transparent; }
        </style>
      </head>
      <body>
        <script type="text/javascript">
          atOptions = {
            'key' : 'a80c85e25ff44dbe85a001d4fc296099',
            'format' : 'iframe',
            'height' : 90,
            'width' : 728,
            'params' : {}
          };
        </script>
        <script type="text/javascript" src="https://www.highperformanceformat.com/a80c85e25ff44dbe85a001d4fc296099/invoke.js"></script>
      </body>
      </html>
    `;

    return (
      <div className={`mx-auto flex items-center justify-center overflow-hidden py-3 bg-slate-900/5 rounded-xl border border-slate-800/10 min-h-[90px] w-full max-w-[728px] ${className}`}>
        <iframe
          srcDoc={htmlContent}
          width="728"
          height="90"
          scrolling="no"
          frameBorder="0"
          className="border-0 overflow-hidden"
          style={{ width: '728px', height: '90px' }}
        />
      </div>
    );
  }

  if (type === 'mobile') {
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <style>
          body { margin: 0; padding: 0; overflow: hidden; display: flex; justify-content: center; align-items: center; background: transparent; }
        </style>
      </head>
      <body>
        <script type="text/javascript">
          atOptions = {
            'key' : 'df048af0c4b200818dc2d1ed23fe278b',
            'format' : 'iframe',
            'height' : 50,
            'width' : 320,
            'params' : {}
          };
        </script>
        <script type="text/javascript" src="https://www.highperformanceformat.com/df048af0c4b200818dc2d1ed23fe278b/invoke.js"></script>
      </body>
      </html>
    `;

    return (
      <div className={`mx-auto flex items-center justify-center overflow-hidden py-3 bg-slate-900/5 rounded-xl border border-slate-800/10 min-h-[50px] w-full max-w-[320px] ${className}`}>
        <iframe
          srcDoc={htmlContent}
          width="320"
          height="50"
          scrolling="no"
          frameBorder="0"
          className="border-0 overflow-hidden"
          style={{ width: '320px', height: '50px' }}
        />
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className={`mx-auto flex items-center justify-center overflow-hidden py-3 bg-slate-900/5 rounded-xl border border-slate-800/10 min-h-[150px] w-full max-w-[650px] ${className}`}
    />
  );
}
