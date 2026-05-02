import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'NuraWell | המסע שלך לבריאות מתחיל כאן ✨',
    template: '%s | NuraWell',
  },
  description: 'NuraWell - מערכת AI חכמה לירידה במשקל. קורסים אינטראקטיביים, מנטור AI אישי, מעקב התקדמות ומשימות יומיות. הצטרפו לאלפי הלקוחות שכבר שינו את חייהם!',
  keywords: ['NuraWell', 'ירידה במשקל', 'קורסים אונליין', 'AI', 'בריאות', 'כושר', 'תזונה', 'אורח חיים בריא', 'מנטור אישי'],
  authors: [{ name: 'NuraWell' }],
  creator: 'NuraWell',
  publisher: 'NuraWell',
  metadataBase: new URL('https://nurawell.co.il'),
  openGraph: {
    title: 'NuraWell | המסע שלך לבריאות מתחיל כאן ✨',
    description: 'מערכת AI חכמה לירידה במשקל - קורסים, מנטור אישי, ומעקב התקדמות',
    type: 'website',
    locale: 'he_IL',
    siteName: 'NuraWell',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'NuraWell - AI Weight Loss Platform' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NuraWell | המסע שלך לבריאות מתחיל כאן',
    description: 'מערכת AI חכמה לירידה במשקל - קורסים, מנטור אישי, ומעקב התקדמות',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#14b8a6' },
    { media: '(prefers-color-scheme: dark)', color: '#0f766e' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800;900&family=Rubik:wght@400;500;600;700;800;900&family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'NuraWell',
              url: 'https://nurawell.co.il',
              description: 'מערכת AI חכמה לירידה במשקל',
              inLanguage: 'he',
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
