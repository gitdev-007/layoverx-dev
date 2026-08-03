import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { AuthProvider } from '@/context/auth-context';
import { ItineraryProvider } from '@/context/itinerary-context';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import AuthGuard from '@/components/auth/AuthGuard';
import WhatsAppConcierge from '@/components/WhatsAppConcierge';


const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.layoverx.in'),
  title: 'Mumbai Travel & Layover Experience Platform | LayoverX',
  description:
    'Discover luxury transit hotels, authentic restaurants, spas, local city tours, and airport transfers near CSM International Airport Mumbai. Plan your perfect stopover.',
  keywords: [
    'Mumbai Airport Transit Hotel',
    'CSMIA Hourly Hotels',
    'Niranta Hotel Terminal 2',
    'Mumbai Layover Tours',
    'Airport Lounge Passes',
    'Bombay Layover Guide',
  ],
  alternates: {
    canonical: 'https://www.layoverx.in',
  },
  openGraph: {
    title: 'LayoverX — Mumbai Airport Transit Platform',
    description: 'Book hourly hotel pods, spas, lounges & guided city tours near Mumbai CSMIA.',
    url: 'https://www.layoverx.in',
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
      <body className="font-sans bg-[#F8FAFC] text-[#0F172A] antialiased selection:bg-[#0369a1] selection:text-white min-h-screen flex flex-col pt-16">
        <AuthProvider>
          <ItineraryProvider>
            <AuthGuard>
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
              <WhatsAppConcierge />
            </AuthGuard>
          </ItineraryProvider>
        </AuthProvider>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
