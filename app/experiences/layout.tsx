import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guided Mumbai Layover Tours | LayoverX CSMIA Hub',
  description:
    'Private chauffeured 4 to 8-hour city tours covering Gateway of India, Sea Link, and Marine Drive with calculated airport departure buffers.',
  alternates: {
    canonical: '/experiences',
  },
};

export default function ExperiencesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
