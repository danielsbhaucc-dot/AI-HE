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

    const run = async () => {
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src;
        video.addEventListener('canplay', onCanPlay, { once: true });
        video.addEventListener('loadeddata', onCanPlay, { once: true });
        if (autoPlay) void video.play().catch(() => {});
        return;
      }

      const { default: Hls } = await import('hls.js');
      if (cancelled) return;

      if (Hls.isSupported()) {
        const hls = new Hls({ enableWorker: true, lowLatencyMode: false });
        hlsRef.current = hls;
        hls.loadSource(src);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          fireLoaded();
          if (autoPlay) void video.play().catch(() => {});
        });
        hls.on(Hls.Events.ERROR, (_, data) => {
          if (data.fatal) console.error('HLS fatal error', data.type, data.details);
        });
      } else {
        video.src = src;
        video.addEventListener('canplay', onCanPlay, { once: true });
        if (autoPlay) void video.play().catch(() => {});
      }
    };

    void run();

    return () => {
      cancelled = true;
      video.removeEventListener('canplay', onCanPlay);
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
