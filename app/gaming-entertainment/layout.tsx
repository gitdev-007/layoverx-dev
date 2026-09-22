import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Esports & Gaming Lounges | LayoverX Mumbai Airport',
  description:
    'High-speed Wi-Fi, PS5 gaming pods, VR flight simulators, and quiet executive work bays inside and near Mumbai International Airport Terminal 2.',
  alternates: {
    canonical: '/gaming-entertainment',
  },
};

export default function GamingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
