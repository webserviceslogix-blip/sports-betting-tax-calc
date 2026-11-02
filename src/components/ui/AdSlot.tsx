'use client';

import { useEffect, useRef } from 'react';

interface AdSlotProps {
  slot: string;
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  className?: string;
}

const PUBLISHER_ID = 'ca-pub-6848158488842300';

export default function AdSlot({ slot, format = 'auto', className = '' }: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (!adRef.current) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch {
      // AdSense not loaded or blocked
    }
  }, []);

  return (
    <div className={`ad-container my-6 ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={PUBLISHER_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
