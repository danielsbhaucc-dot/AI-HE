import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'מערכת קורסים לירידה במשקל | AI Powered',
  description: 'מערכת לימוד חכמה לירידה במשקל עם AI - קורסים אינטראקטיביים, מעקב התקדמות, וליווי אישי',
  keywords: ['ירידה במשקל', 'קורסים אונליין', 'AI', 'בריאות', 'כושר'],
  authors: [{ name: 'AI Weight Loss System' }],
  openGraph: {
    title: 'מערכת קורסים לירידה במשקל',
    description: 'קורסים אינטראקטיביים עם AI לירידה במשקל',
    type: 'website',
    locale: 'he_IL',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'מערכת קורסים לירידה במשקל',
    description: 'קורסים אינטראקטיביים עם AI לירידה במשקל',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#d946ef' },
    { media: '(prefers-color-scheme: dark)', color: '#701a75' },
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
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
