'use client';

import { useEffect, useRef, type CSSProperties } from 'react';

export type HlsVideoProps = {
  src: string;
  className?: string;
  style?: CSSProperties;
  autoPlay?: boolean;
  playsInline?: boolean;
  muted?: boolean;
  controls?: boolean;
  onLoaded?: () => void;
  onEnded?: () => void;
};

export function HlsVideo({
  src,
  className,
  style,
  autoPlay,
  playsInline = true,
  muted,
  controls,
  onLoaded,
  onEnded,
}: HlsVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<import('hls.js').default | null>(null);
  const onLoadedRef = useRef(onLoaded);
  onLoadedRef.current = onLoaded;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    let cancelled = false;
    let loaded = false;
    const fireLoaded = () => {
      if (loaded) return;
      loaded = true;
      onLoadedRef.current?.();
    };

    const onCanPlay = () => fireLoaded();

    const onVideoError = () => {
      console.warn('HlsVideo: native video error', video.error?.message);
      fireLoaded();
    };

    /** Bunny Pull Zone + many CDNs: Web Workers often break CORS on segment XHR — keep on main thread. */
    const run = async () => {
      const tryNative = () => {
        video.src = src;
        video.addEventListener('canplay', onCanPlay, { once: true });
        video.addEventListener('loadeddata', onCanPlay, { once: true });
        video.addEventListener('error', onVideoError, { once: true });
        if (autoPlay) void video.play().catch(() => {});
      };

      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        tryNative();
        return;
      }

      const { default: Hls } = await import('hls.js');
      if (cancelled) return;

      if (Hls.isSupported()) {
        const hls = new Hls({
          enableWorker: false,
          lowLatencyMode: false,
        });
        hlsRef.current = hls;
        hls.loadSource(src);
        hls.attachMedia(video);

        const tryPlay = () => {
          if (autoPlay) void video.play().catch(() => {});
        };

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          fireLoaded();
          tryPlay();
        });

        hls.on(Hls.Events.MANIFEST_LOADED, () => {
          fireLoaded();
        });

        let recoverAttempts = 0;
        hls.on(Hls.Events.ERROR, (_, data) => {
          if (!data.fatal) return;
          console.warn('HLS fatal', data.type, data.details, data.error);
          if (recoverAttempts < 1) {
            recoverAttempts += 1;
            if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
              hls.startLoad();
              return;
            }
            if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
              hls.recoverMediaError();
              return;
            }
          }
          fireLoaded();
          hls.destroy();
          hlsRef.current = null;
          tryNative();
        });
      } else {
        tryNative();
      }
    };

    const failSafe = window.setTimeout(() => fireLoaded(), 15000);

    void run();

    return () => {
      cancelled = true;
      window.clearTimeout(failSafe);
      video.removeEventListener('canplay', onCanPlay);
      video.removeEventListener('error', onVideoError);
      video.pause();
      hlsRef.current?.destroy();
      hlsRef.current = null;
      video.removeAttribute('src');
      video.load();
    };
  }, [src, autoPlay]);

  return (
    <video
      ref={videoRef}
      className={className}
      style={style}
      playsInline={playsInline}
      muted={muted}
      controls={controls}
      autoPlay={autoPlay}
      onEnded={onEnded}
    />
  );
}
