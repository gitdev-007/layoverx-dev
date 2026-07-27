import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | LayoverX CSMIA',
  description: 'LayoverX privacy policy and data protection terms.',
  alternates: {
    canonical: 'https://layoverx-dev.vercel.app/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pb-20 space-y-8 p-6 max-w-4xl mx-auto text-slate-300 text-xs leading-relaxed">
      <h1 className="text-3xl font-extrabold text-white">Privacy Policy</h1>
      <p>
        At LayoverX, we prioritize traveler confidentiality and secure data processing for all flight-tracked stopovers at Chhatrapati Shivaji Maharaj International Airport (CSMIA).
      </p>
      <h2 className="text-base font-bold text-white mt-4">1. Data Collection</h2>
      <p>
        We collect flight numbers and arrival/departure timestamps strictly to compute layover safety buffers and track live radar feeds via AeroAPI.
      </p>
    </div>
  );
}
