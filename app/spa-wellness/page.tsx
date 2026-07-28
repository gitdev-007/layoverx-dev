import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SPAS_DATA } from '@/data/layover-data';
import { Sparkles, MapPin, Star, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Express Airport Spa & Jetlag Therapy near Mumbai CSMIA | LayoverX',
  description:
    'Relax between flights with foot reflexology, deep tissue massage, hot showers, and steam suites at CSMIA Terminal 2 & nearby luxury hotels.',
  alternates: {
    canonical: 'https://layoverx-dev.vercel.app/spa-wellness',
  },
};

export default function SpaWellnessPage() {
  return (
    <div className="min-h-screen pb-24 space-y-12 bg-slate-50">
      {/* Page Hero */}
      <section className="bg-gradient-to-br from-purple-950 to-indigo-950 py-16 lg:py-20 text-white mb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 text-xs sm:text-sm font-bold">
              <Sparkles size={16} /> ✨ Express Spas & Rejuvenation Lounges
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Airport Spas & Jetlag Recovery Therapies
            </h1>
            <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
              Unwind between flights with aromatherapy, deep tissue massages, hot shower packages, and foot reflexology.
            </p>
          </div>
        </div>
      </section>

      {/* Spa Listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {SPAS_DATA.map((spa) => (
            <div
              key={spa.id}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-60 w-full">
                  <Image src={spa.image} alt={spa.name} fill className="object-cover" />
                  <div className="absolute top-3.5 right-3.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5 shadow-md">
                    <Star size={15} className="text-amber-500 fill-amber-500" /> {spa.rating} ({spa.reviews})
                  </div>
                </div>

                <div className="p-6 sm:p-7 space-y-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-1">{spa.name}</h3>
                    <p className="text-xs sm:text-sm font-bold text-purple-700 mb-2">{spa.treatment}</p>
                    <p className="text-xs sm:text-sm font-medium text-slate-500 flex items-center gap-1.5 mt-2">
                      <MapPin size={16} className="text-[#0369a1]" /> {spa.location}
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-5 flex items-center justify-between">
                    <div>
                      <span className="text-xs sm:text-sm text-slate-500 block font-medium">Session Price</span>
                      <span className="text-xl sm:text-2xl font-extrabold text-slate-900">{spa.price}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-7 pt-0">
                <Link
                  href={`/service-details?id=${spa.id}`}
                  className="w-full py-3.5 bg-[#0369a1] hover:bg-[#075985] text-white font-bold text-sm sm:text-base rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
                >
                  Book Spa Session <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
