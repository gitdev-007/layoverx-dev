import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fixed-Rate Airport Transfers & Cabs | LayoverX CSMIA',
  description:
    'Flight-tracked private chauffeurs with zero wait time at Mumbai CSMIA T1 & T2 arrivals gates. Pre-negotiated fixed rates and on-time flight return guarantee.',
  alternates: {
    canonical: '/airport-transfers',
  },
};

export default function TransfersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
