import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { Footer } from '@/components/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'HNUI - Dense Hacker News',
  description:
    'A compressed, dark-mode Hacker News UI with no fluff or comments.',
  metadataBase: new URL('https://hnui.xyz'),
  openGraph: {
    title: 'HNUI - Dense Hacker News',
    description: 'Hacker News, but compressed. No comments, no fluff.',
    url: 'https://hnui.xyz',
    siteName: 'HNUI',
    images: [
      {
        url: '/og.png', // or /hnui-og-orange.png if you keep that name
        width: 1200,
        height: 630,
        alt: 'HNUI - Dense Hacker News',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HNUI - Dense Hacker News',
    description:
      'A compressed, dark-mode Hacker News UI with no fluff or comments.',
    site: '@adnjoo', // optional
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
