import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Transit Hotels & Micro-Stay Pods | LayoverX CSMIA T2',
  description:
    'Book 3, 6, or 12-hour hotel pods inside or adjacent to Mumbai Airport Terminal 1 & 2. Express check-in, hot showers, fast WiFi, and traffic-buffered departure timing.',
  alternates: {
    canonical: '/hotels',
  },
};

export default function HotelsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
