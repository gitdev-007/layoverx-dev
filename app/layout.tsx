import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/auth-context';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AuthModal } from '@/components/auth-modal';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://layoverx-dev.vercel.app'),
  title: 'LayoverX — Mumbai CSMIA Airport Transit Experiences & Micro-Stays',
  description:
    'Transform your Mumbai CSMIA airport stopover with flexible hourly transit hotel pods, airport lounge passes, authentic dining, express spas, and guaranteed city tours.',
  keywords: [
    'Mumbai Airport Transit Hotel',
    'CSMIA Hourly Hotels',
    'Niranta Hotel Terminal 2',
    'Mumbai Layover Tours',
    'Airport Lounge Passes',
    'Bombay Layover Guide',
  ],
  alternates: {
    canonical: 'https://layoverx-dev.vercel.app',
  },
  openGraph: {
    title: 'LayoverX — Mumbai Airport Transit Platform',
    description: 'Book hourly hotel pods, spas, lounges & guided city tours near Mumbai CSMIA.',
    url: 'https://layoverx-dev.vercel.app',
    siteName: 'LayoverX',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'LayoverX Mumbai CSMIA',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} scroll-smooth`}>
      <body className="font-sans bg-slate-900 text-slate-100 antialiased selection:bg-sky-500 selection:text-white min-h-screen flex flex-col">
        <AuthProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <AuthModal />
        </AuthProvider>
      </body>
    </html>
  );
}
