'use client';

import { useState, useEffect } from 'react';
import { HlsVideo, type HlsVideoProps } from './HlsVideo';

/** מונע hydration mismatch + parentNode — הווידאו נטען רק אחרי mount בצד לקוח */
export function HlsVideoGate(props: HlsVideoProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={props.className} style={props.style}>
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div
            className="h-16 w-16 animate-pulse rounded-full"
            style={{ background: 'rgba(16,185,129,0.3)', border: '2px solid rgba(16,185,129,0.5)' }}
          />
        </div>
      </div>
    );
  }

  return <HlsVideo {...props} />;
}
