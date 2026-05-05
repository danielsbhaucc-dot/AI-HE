'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, CheckCircle2, ArrowLeft, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { HlsVideo } from './HlsVideo';
import { getBunnyHlsSourceFromFields } from '../../lib/journey/bunny-pull';

interface VideoSectionProps {
  provider: string | null;
  externalId: string | null;
  externalUrl: string | null;
  title: string;
  onComplete: () => void;
  isWatched: boolean;
}

/** Library/video id for iframe.mediadelivery.net/embed/{id} */
function getBunnyEmbedId(externalId: string | null, externalUrl: string | null): string | null {
  if (getBunnyHlsSourceFromFields(externalId, externalUrl)) return null;
  const id = externalId?.trim();
  if (!id || id === 'PLACEHOLDER_HEYGEN_VIDEO_ID') return null;
  return id;
}

function getEmbedUrl(
  provider: string | null,
  externalId: string | null,
  externalUrl: string | null,
  opts?: { autoplay?: boolean; bunnyCompact?: boolean }
): string | null {
  if (!provider) return null;
  const ap = opts?.autoplay !== false;
  switch (provider) {
    case 'heygen':
      return externalId ? `https://app.heygen.com/share/${externalId}` : null;
    case 'bunny':
      return null;
    case 'youtube':
      return externalId
        ? `https://www.youtube.com/embed/${externalId}?rel=0${ap ? '&autoplay=1' : ''}`
        : null;
    case 'vimeo':
      return externalId
        ? `https://player.vimeo.com/video/${externalId}${ap ? '?autoplay=1' : ''}`
        : null;
    case 'custom':
      return externalUrl ?? null;
    default:
      return null;
  }
}

function bunnyIframeUrl(embedId: string, opts?: { autoplay?: boolean; bunnyCompact?: boolean }): string {
  const ap = opts?.autoplay !== false;
  const compact = opts?.bunnyCompact ? 'true' : 'false';
  return `https://iframe.mediadelivery.net/embed/${embedId}?autoplay=${ap}&preload=true&responsive=true&playsinline=true&compactControls=${compact}&rememberPosition=false`;
}

function mightBeVideoEndedMessage(data: unknown): boolean {
  if (data == null || typeof data !== 'object') return false;
  const o = data as Record<string, unknown>;
  const ev = typeof o.event === 'string' ? o.event.toLowerCase() : '';
  const typ = typeof o.type === 'string' ? o.type.toLowerCase() : '';
  const keys = [ev, typ].join(' ');
  return /(end|complete|finish)/i.test(keys);
}

export function VideoSection({ provider, externalId, externalUrl, title, onComplete, isWatched }: VideoSectionProps) {
  const router = useRouter();
  const immersiveOpenedForKey = useRef<string | null>(null);
  const [inlineLoaded, setInlineLoaded] = useState(false);
  const [immersiveLoaded, setImmersiveLoaded] = useState(false);
  const [inlinePlaying, setInlinePlaying] = useState(false);
  const [immersiveOpen, setImmersiveOpen] = useState(false);
  const [exitConfirmOpen, setExitConfirmOpen] = useState(false);

  const bunnyHlsSrc = provider === 'bunny' ? getBunnyHlsSourceFromFields(externalId, externalUrl) : null;
  const bunnyEmbedId = provider === 'bunny' ? getBunnyEmbedId(externalId, externalUrl) : null;
  const isBunnyIframe = provider === 'bunny' && !!bunnyEmbedId;
  const isBunnyHls = provider === 'bunny' && !!bunnyHlsSrc;

  const baseEmbed = getEmbedUrl(provider, externalId, externalUrl, { autoplay: false, bunnyCompact: false });
  const immersiveIframeSrc = bunnyEmbedId ? bunnyIframeUrl(bunnyEmbedId, { autoplay: true, bunnyCompact: true }) : null;
  const inlineIframeSrc = bunnyEmbedId ? bunnyIframeUrl(bunnyEmbedId, { autoplay: inlinePlaying, bunnyCompact: false }) : null;

  const isPlaceholder =
    externalId === 'PLACEHOLDER_HEYGEN_VIDEO_ID' ||
    (provider === 'bunny' ? !bunnyHlsSrc && !bunnyEmbedId : !baseEmbed);

  const immersiveKey = isBunnyHls ? `hls:${bunnyHlsSrc}` : bunnyEmbedId ? `iframe:${bunnyEmbedId}` : '';

  useEffect(() => {
    if (isPlaceholder || provider !== 'bunny' || !immersiveKey) {
      setImmersiveOpen(false);
      return;
    }
    if (immersiveOpenedForKey.current === immersiveKey) return;
    immersiveOpenedForKey.current = immersiveKey;
    setImmersiveOpen(true);
    setImmersiveLoaded(false);
  }, [isPlaceholder, provider, immersiveKey]);

  const closeImmersive = useCallback(() => {
    setImmersiveOpen(false);
    setInlinePlaying(false);
    setInlineLoaded(false);
    setImmersiveLoaded(false);
  }, []);

  useEffect(() => {
    if (!immersiveOpen || !isBunnyIframe) return;
    const onMsg = (e: MessageEvent) => {
      if (typeof e.origin === 'string' && e.origin.includes('mediadelivery.net') && mightBeVideoEndedMessage(e.data)) {
        closeImmersive();
      }
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, [immersiveOpen, isBunnyIframe, closeImmersive]);

  useEffect(() => {
    if (!immersiveOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [immersiveOpen]);

  const confirmLeaveToJourney = () => {
    setExitConfirmOpen(false);
    closeImmersive();
    router.push('/journey');
  };

  const showBunnyReplayGate = (isBunnyIframe || isBunnyHls) && !inlinePlaying;
  const showNonBunnyIframe = !isPlaceholder && !isBunnyHls && !isBunnyIframe && !!baseEmbed;
  const showInlineIframe = !isPlaceholder && isBunnyIframe && inlinePlaying && !!inlineIframeSrc;
  const showInlineHls = !isPlaceholder && isBunnyHls && inlinePlaying && !!bunnyHlsSrc;

  return (
    <div className="space-y-5">
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

      <div
        className="relative rounded-2xl overflow-hidden"
        style={{ aspectRatio: '16/9', background: '#0a1f1a' }}
      >
        {isPlaceholder ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #064e3b, #047857, #10b981)' }}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
              style={{ background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.3)' }}>
              <Play className="w-10 h-10 text-white ml-1" fill="white" />
            </div>
            <p className="text-white/90 text-lg font-bold mb-1">{title}</p>
            <p className="text-white/60 text-sm">הסרטון יהיה זמין בקרוב 🎬</p>
          </div>
        ) : showBunnyReplayGate ? (
          <button
            type="button"
            onClick={() => { setInlinePlaying(true); setInlineLoaded(false); }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10 group"
            style={{ background: 'linear-gradient(145deg, #064e3b, #0f172a)' }}
          >
            <div className="w-20 h-20 rounded-full flex items-center justify-center transition-transform group-active:scale-95"
              style={{ background: 'rgba(16,185,129,0.35)', border: '2px solid rgba(52,211,153,0.5)' }}>
              <Play className="w-10 h-10 text-white ml-1" fill="white" />
            </div>
            <span className="text-white font-bold text-sm">הפעלת הסרטון שוב</span>
          </button>
        ) : null}

        {showNonBunnyIframe && (
          <>
            {!inlineLoaded && (
              <div className="absolute inset-0 flex items-center justify-center z-10"
                style={{ background: 'rgba(0,0,0,0.7)' }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center animate-pulse"
                  style={{ background: 'rgba(16,185,129,0.3)', border: '2px solid rgba(16,185,129,0.5)' }}>
                  <Play className="w-7 h-7 text-emerald-400 ml-0.5" fill="currentColor" />
                </div>
              </div>
            )}
            <iframe
              key={baseEmbed!}
              src={baseEmbed!}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
              onLoad={() => setInlineLoaded(true)}
              loading="lazy"
            />
          </>
        )}

        {showInlineIframe && (
          <>
            {!inlineLoaded && (
              <div className="absolute inset-0 flex items-center justify-center z-10"
                style={{ background: 'rgba(0,0,0,0.7)' }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center animate-pulse"
                  style={{ background: 'rgba(16,185,129,0.3)', border: '2px solid rgba(16,185,129,0.5)' }}>
                  <Play className="w-7 h-7 text-emerald-400 ml-0.5" fill="currentColor" />
                </div>
              </div>
            )}
            <iframe
              key={`inline-${inlineIframeSrc}-${inlinePlaying}`}
              src={inlineIframeSrc!}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
              onLoad={() => setInlineLoaded(true)}
              loading="lazy"
            />
          </>
        )}

        {showInlineHls && (
          <>
            {!inlineLoaded && (
              <div className="absolute inset-0 flex items-center justify-center z-10"
                style={{ background: 'rgba(0,0,0,0.7)' }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center animate-pulse"
                  style={{ background: 'rgba(16,185,129,0.3)', border: '2px solid rgba(16,185,129,0.5)' }}>
                  <Play className="w-7 h-7 text-emerald-400 ml-0.5" fill="currentColor" />
                </div>
              </div>
            )}
            <HlsVideo
              key={`inline-hls-${bunnyHlsSrc}-${inlinePlaying}`}
              src={bunnyHlsSrc!}
              className="absolute inset-0 w-full h-full object-contain bg-black"
              controls
              playsInline
              autoPlay
              onLoaded={() => setInlineLoaded(true)}
            />
          </>
        )}
      </div>

      <AnimatePresence>
        {immersiveOpen && !isPlaceholder && (isBunnyHls || isBunnyIframe) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center"
          >
            <button
              type="button"
              aria-label="סגור"
              onClick={() => setExitConfirmOpen(true)}
              className="absolute top-4 left-4 z-[210] w-11 h-11 rounded-full flex items-center justify-center text-white text-xl font-light"
              style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)' }}
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative w-full h-[100dvh] max-w-[480px] mx-auto bg-black">
              {!immersiveLoaded && (
                <div className="absolute inset-0 flex items-center justify-center z-10 bg-black">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center animate-pulse"
                    style={{ background: 'rgba(16,185,129,0.25)', border: '2px solid rgba(16,185,129,0.45)' }}>
                    <Play className="w-7 h-7 text-emerald-400 ml-0.5" fill="currentColor" />
                  </div>
                </div>
              )}
              {isBunnyHls && bunnyHlsSrc ? (
                <HlsVideo
                  src={bunnyHlsSrc}
                  className="absolute inset-0 w-full h-full object-contain"
                  autoPlay
                  playsInline
                  controls={false}
                  onLoaded={() => setImmersiveLoaded(true)}
                  onEnded={closeImmersive}
                />
              ) : immersiveIframeSrc ? (
                <iframe
                  src={immersiveIframeSrc}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                  style={{ objectFit: 'cover' }}
                  onLoad={() => setImmersiveLoaded(true)}
                />
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {exitConfirmOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[220] flex items-center justify-center p-6"
            style={{ background: 'rgba(6,24,18,0.55)' }}
            onClick={() => setExitConfirmOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="w-full max-w-sm rounded-3xl p-6 text-center shadow-2xl"
              style={{
                background: 'linear-gradient(165deg, #ffffff 0%, #ecfdf5 100%)',
                border: '1px solid rgba(16,185,129,0.25)',
              }}
              onClick={e => e.stopPropagation()}
            >
              <p className="text-lg font-black mb-2" style={{ color: '#1A1730' }}>לצאת מהסרטון?</p>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                תחזרו למסך &quot;המסע שלי&quot;. אפשר תמיד להיכנס שוב לצעד ולהמשיך מהמקום שבו עצרתם.
              </p>
              <div className="flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={confirmLeaveToJourney}
                  className="w-full py-3.5 rounded-2xl font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #047857, #10b981)', boxShadow: '0 6px 18px rgba(16,185,129,0.35)' }}
                >
                  כן, חזרה למסע
                </button>
                <button
                  type="button"
                  onClick={() => setExitConfirmOpen(false)}
                  className="w-full py-3.5 rounded-2xl font-bold text-gray-600"
                  style={{ background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.08)' }}
                >
                  להמשיך לצפות
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
