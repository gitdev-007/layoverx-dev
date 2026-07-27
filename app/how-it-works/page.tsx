import React from 'react';
import type { Metadata } from 'next';
import { FAQS_DATA } from '@/data/layover-data';
import { Plane, Clock, ShieldCheck, CheckCircle2, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Airport Exit Guidelines & Transit Visa FAQs | LayoverX',
  description:
    'Step-by-step Mumbai CSMIA airport exit procedures, luggage storage advice, and transit visa guidelines for layovers.',
  alternates: {
    canonical: 'https://layoverx-dev.vercel.app/how-it-works',
  },
};

export default function HowItWorksPage() {
  const steps = [
    {
      num: '01',
      title: 'Enter Flight Timings',
      desc: 'Provide your incoming and outgoing flight details. Our algorithm computes your guaranteed safe layover duration.',
    },
    {
      num: '02',
      title: 'Browse & Book Micro-Services',
      desc: 'Choose hourly transit hotel pods, airport lounge passes, authentic dining, or private chauffeurs.',
    },
    {
      num: '03',
      title: 'Live Flight Sync & Protection',
      desc: 'Our system constantly monitors AeroAPI flight feeds. If your flight is delayed, your booking is automatically adjusted.',
    },
  ];

  return (
    <div className="min-h-screen pb-20 space-y-12">
      {/* Page Hero */}
      <section className="bg-slate-900 border-b border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-bold">
              <ShieldCheck size={14} /> How LayoverX Works
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Maximizing Your Airport Transit Hours
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Learn how LayoverX guarantees safe exit windows, zero missed flights, and instant hourly vouchers.
            </p>
          </div>
        </div>
      </section>

      {/* Steps Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="bg-slate-800/80 border border-slate-700/60 p-8 rounded-3xl text-center space-y-3 shadow-xl hover:border-sky-500/40 transition"
            >
              <span className="text-4xl font-extrabold text-sky-400 block">{s.num}</span>
              <h3 className="text-xl font-bold text-white">{s.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Transit Visa & Exit FAQs */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-800/80 border border-slate-700/60 rounded-3xl p-8 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700 pb-4">
            <HelpCircle className="w-6 h-6 text-sky-400" />
            <h2 className="text-2xl font-extrabold text-white">Airport Exit & Visa FAQ</h2>
          </div>

          <div className="space-y-4 divide-y divide-slate-700/60">
            {FAQS_DATA.map((faq, idx) => (
              <div key={idx} className={`${idx !== 0 ? 'pt-4' : ''}`}>
                <h3 className="text-sm font-bold text-white mb-1.5">{faq.question}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
