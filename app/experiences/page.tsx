import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { TOURS_DATA } from '@/data/layover-data';
import { Compass, Clock, Star, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Mumbai Layover Guided City Tours & Private Drivers | LayoverX',
  description:
    'Explore Gateway of India, Bandra Sea Link, and Marine Drive on a 4 to 8-hour private chauffeured layover tour with guaranteed airport return.',
  alternates: {
    canonical: 'https://layoverx-dev.vercel.app/experiences',
  },
};

export default function ExperiencesPage() {
  return (
    <div className="min-h-screen pb-20 space-y-12 bg-slate-50">
      {/* Page Hero */}
      <section className="bg-gradient-to-br from-rose-950 to-red-950 py-16 text-white mb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-400/30 text-xs font-bold">
              <Compass size={14} /> Curated City Tours & Private Chauffeurs
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Mumbai Layover City Tours with On-Time Guarantee
            </h1>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Explore Mumbai with private air-conditioned cars, licensed local guides, airport door-to-door pickups, and traffic-buffered return windows.
            </p>
          </div>
        </div>
      </section>

      {/* Tour Listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {TOURS_DATA.map((tour) => (
            <div
              key={tour.id}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-52 w-full">
                  <Image src={tour.image} alt={tour.name} fill className="object-cover" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-slate-900 flex items-center gap-1 shadow-sm">
                    <Star size={13} className="text-amber-500 fill-amber-500" /> {tour.rating} ({tour.reviews})
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#0F172A] mb-1">{tour.name}</h3>
                    <p className="text-xs font-bold text-rose-600 flex items-center gap-1">
                      <Clock size={13} /> {tour.duration}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    {tour.highlights.map((h, idx) => (
                      <div key={idx} className="text-xs text-slate-600 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> {h}
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 block font-medium">Tour Price</span>
                      <span className="text-xl font-extrabold text-slate-900">{tour.price}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href="/plan-my-layover"
                  className="w-full py-3 bg-[#0369a1] hover:bg-[#075985] text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-sm"
                >
                  Book Private Tour <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
