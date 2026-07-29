import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Script from 'next/script';
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
      <body className="font-sans bg-[#F8FAFC] text-[#0F172A] antialiased selection:bg-[#0369a1] selection:text-white min-h-screen flex flex-col pt-16">
        <AuthProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <AuthModal />
        </AuthProvider>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
        
        {/* Floating WhatsApp Support Button */}
        <a
          href="https://wa.me/919999999999?text=Hello%20LayoverX%20Support,%20I%20need%20help%20with%20my%20stopover!"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-[999] bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 rounded-full shadow-2xl transition-transform hover:scale-110 duration-300 flex items-center justify-center print:hidden"
          title="Chat on WhatsApp"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.968C16.574 1.971 14.1 1.94 12.008 1.94c-5.44 0-9.866 4.372-9.87 9.802 0 1.74.453 3.441 1.314 4.962L2.435 21.67l5.059-1.328c.553.308 1.096.462 1.654.462" />
          </svg>
        </a>
      </body>
    </html>
  );
}
