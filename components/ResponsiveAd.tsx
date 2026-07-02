'use client';

import AdBanner from './AdBanner';

interface ResponsiveAdProps {
  className?: string;
}

export default function ResponsiveAd({ className = '' }: ResponsiveAdProps) {
  return (
    <div className={`w-full flex flex-col items-center justify-center my-4 ${className}`}>
      {/* Desktop/Tablet Ad */}
      <AdBanner type="leaderboard" className="hidden md:flex" />

      {/* Mobile Ad */}
      <AdBanner type="mobile" className="flex md:hidden" />
    </div>
  );
}
