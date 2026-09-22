import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Express Spa & Jetlag Recovery | LayoverX CSMIA',
  description:
    'Recharge between flights with foot reflexology, deep tissue massage, hot showers, and steam suites minutes from Mumbai Airport Terminal 1 and 2.',
  alternates: {
    canonical: '/spa-wellness',
  },
};

export default function SpaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
