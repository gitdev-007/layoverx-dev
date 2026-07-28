import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { GAMING_DATA } from '@/data/layover-data';
import { Gamepad2, MapPin, Star, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Airport Gaming Arenas & Executive Work Lounges | LayoverX',
  description:
    'Stay entertained during your transit with PS5 Pro gaming pods, VR simulators, bowling, and quiet executive lounges near Mumbai CSMIA.',
  alternates: {
    canonical: 'https://layoverx-dev.vercel.app/gaming-entertainment',
  },
};

export default function GamingEntertainmentPage() {
  return (
    <div className="min-h-screen pb-24 space-y-12 bg-slate-50">
      {/* Page Hero */}
      <section className="bg-gradient-to-br from-fuchsia-950 to-indigo-950 py-16 lg:py-20 text-white mb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-400/30 text-xs sm:text-sm font-bold">
              <Gamepad2 size={16} /> 🎮 Gaming Zones & Executive Lounges
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Airport Lounges & Gaming Arenas
            </h1>
            <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
              Stay entertained during your transit with high-end gaming stations, private cinema pods, and quiet work lounges.
            </p>
          </div>
        </div>
      </section>

      {/* Gaming Listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {GAMING_DATA.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-60 w-full">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                  <div className="absolute top-3.5 right-3.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5 shadow-md">
                    <Star size={15} className="text-amber-500 fill-amber-500" /> {item.rating} ({item.reviews})
                  </div>
                </div>

                <div className="p-6 sm:p-7 space-y-5">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-1">{item.name}</h3>
                    <p className="text-xs sm:text-sm font-medium text-slate-500 flex items-center gap-1.5">
                      <MapPin size={16} className="text-[#0369a1]" /> {item.location}
                    </p>
                  </div>

                  <div className="space-y-2">
                    {item.features.map((f, idx) => (
                      <div key={idx} className="text-xs sm:text-sm text-slate-700 flex items-center gap-2 font-medium">
                        <span className="w-2 h-2 rounded-full bg-fuchsia-600 flex-shrink-0"></span> {f}
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-slate-100 pt-5 flex items-center justify-between">
                    <div>
                      <span className="text-xs sm:text-sm text-slate-500 block font-medium">Access Pass</span>
                      <span className="text-xl sm:text-2xl font-extrabold text-slate-900">{item.price}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-7 pt-0">
                <Link
                  href={`/service-details?id=${item.id}`}
                  className="w-full py-3.5 bg-[#0369a1] hover:bg-[#075985] text-white font-bold text-sm sm:text-base rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
                >
                  Book Lounge Pass <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
