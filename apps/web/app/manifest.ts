import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'NuraWell - ירידה במשקל עם AI',
    short_name: 'NuraWell',
    description: 'מערכת לירידה במשקל מבוססת AI - קורסים, מעקב, ותוכניות אישיות',
    start_url: '/courses',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#14b8a6',
    orientation: 'portrait',
    lang: 'he',
    dir: 'rtl',
    categories: ['health', 'fitness', 'education'],
    icons: [
      {
        src: '/icons/icon-72x72.png',
        sizes: '72x72',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-128x128.png',
        sizes: '128x128',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-152x152.png',
        sizes: '152x152',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    screenshots: [
      {
        src: '/screenshots/courses.png',
        sizes: '390x844',
        form_factor: 'narrow',
        label: 'דף הקורסים',
      },
    ],
    shortcuts: [
      {
        name: 'הקורסים שלי',
        short_name: 'קורסים',
        description: 'גשו לקורסים שלכם',
        url: '/courses',
        icons: [{ src: '/icons/icon-96x96.png', sizes: '96x96' }],
      },
      {
        name: 'ההתקדמות שלי',
        short_name: 'התקדמות',
        description: 'ראו את ההתקדמות שלכם',
        url: '/progress',
        icons: [{ src: '/icons/icon-96x96.png', sizes: '96x96' }],
      },
    ],
  };
}
