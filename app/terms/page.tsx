import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | LayoverX CSMIA',
  description: 'LayoverX transit service terms and conditions.',
  alternates: {
    canonical: 'https://layoverx-dev.vercel.app/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen pb-20 space-y-8 p-6 max-w-4xl mx-auto text-slate-300 text-xs leading-relaxed">
      <h1 className="text-3xl font-extrabold text-white">Terms of Service</h1>
      <p>
        These terms govern your micro-stay hotel pod reservations, lounge passes, chauffeur transfers, and city sightseeing bookings via the LayoverX platform.
      </p>
      <h2 className="text-base font-bold text-white mt-4">1. Flight Delay Protection</h2>
      <p>
        In the event of an airline schedule shift or delay, LayoverX guarantees automated voucher window rescheduling at zero additional cost.
      </p>
    </div>
  );
}
