'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Maximize2, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';

interface VideoSectionProps {
  provider: string | null;
  externalId: string | null;
  externalUrl: string | null;
  title: string;
  onComplete: () => void;
  isWatched: boolean;
}

function getEmbedUrl(provider: string | null, externalId: string | null, externalUrl: string | null): string | null {
  if (!provider) return null;
  switch (provider) {
    case 'heygen':
      return externalId ? `https://app.heygen.com/share/${externalId}` : null;
    case 'bunny':
      return externalId ? `https://iframe.mediadelivery.net/embed/${externalId}?autoplay=false&preload=true` : null;
    case 'youtube':
      return externalId ? `https://www.youtube.com/embed/${externalId}?rel=0` : null;
    case 'vimeo':
      return externalId ? `https://player.vimeo.com/video/${externalId}` : null;
    case 'custom':
      return externalUrl ?? null;
    default:
      return null;
  }
}

export function VideoSection({ provider, externalId, externalUrl, title, onComplete, isWatched }: VideoSectionProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const embedUrl = getEmbedUrl(provider, externalId, externalUrl);

  const isPlaceholder = externalId === 'PLACEHOLDER_HEYGEN_VIDEO_ID' || !embedUrl;

  return (
    <div className="space-y-5">
      {/* Section header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-3"
          style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
          <Play className="w-4 h-4 text-emerald-600" />
          <span className="text-sm font-bold text-emerald-700">צפו בסרטון</span>
        </div>
        <h2 className="text-2xl font-black" style={{ color: '#1A1730', fontFamily: "'Rubik','Heebo',sans-serif" }}>
          {title}
        </h2>
      </div>

      {/* Video player */}
      <div className={`relative rounded-2xl overflow-hidden ${isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''}`}
        style={{ aspectRatio: isFullscreen ? undefined : '16/9', background: '#0a1f1a' }}>

        {isPlaceholder ? (
          // Beautiful placeholder
          <div className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #064e3b, #047857, #10b981)' }}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
              style={{ background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.3)' }}>
              <Play className="w-10 h-10 text-white ml-1" fill="white" />
            </div>
            <p className="text-white/90 text-lg font-bold mb-1">{title}</p>
            <p className="text-white/60 text-sm">הסרטון יהיה זמין בקרוב 🎬</p>
          </div>
        ) : (
          <>
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center z-10"
                style={{ background: 'rgba(0,0,0,0.7)' }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center animate-pulse"
                  style={{ background: 'rgba(16,185,129,0.3)', border: '2px solid rgba(16,185,129,0.5)' }}>
                  <Play className="w-7 h-7 text-emerald-400 ml-0.5" fill="currentColor" />
                </div>
              </div>
            )}
            <iframe
              src={embedUrl!}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              onLoad={() => setIsLoaded(true)}
              loading="lazy"
            />
          </>
        )}

        {/* Fullscreen toggle */}
        {!isPlaceholder && (
          <button onClick={() => setIsFullscreen(!isFullscreen)}
            className="absolute top-3 left-3 z-20 w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.5)' }}>
            <Maximize2 className="w-4 h-4 text-white" />
          </button>
        )}
      </div>

      {/* Continue button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        {isWatched ? (
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-emerald-700 font-bold"
            style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)' }}>
            <CheckCircle2 className="w-5 h-5" />
            <span>צפית בסרטון ✓</span>
          </div>
        ) : null}
        <button onClick={onComplete}
          className="mt-3 w-full py-4 rounded-2xl font-bold text-lg text-white flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95"
          style={{ background: 'linear-gradient(135deg, #047857, #10b981)', boxShadow: '0 6px 20px rgba(16,185,129,0.3)' }}>
          <span>{isWatched ? 'המשך לשאלות' : 'צפיתי — קדימה!'}</span>
          <ArrowLeft className="w-5 h-5" />
        </button>
      </motion.div>
    </div>
  );
}
