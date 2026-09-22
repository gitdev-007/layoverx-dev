import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Airport Dining & Culinary Trails | LayoverX Mumbai',
  description:
    'Explore authentic Mumbai street flavors, luxury 5-star hotel buffets, and fast-track lounge dining with priority reservations near CSMIA Terminal 2.',
  alternates: {
    canonical: '/restaurants',
  },
};

export default function RestaurantsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
