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
    <div className="min-h-screen pb-20 space-y-12">
      {/* Page Hero */}
      <section className="bg-slate-900 border-b border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold">
              <Compass size={14} /> Curated City Tours & Private Chauffeurs
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Mumbai Layover City Tours with On-Time Guarantee
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
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
              className="bg-slate-800/80 border border-slate-700/60 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between hover:border-rose-500/50 transition-all duration-300"
            >
              <div>
                <div className="relative h-52 w-full">
                  <Image src={tour.image} alt={tour.name} fill className="object-cover" />
                  <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-amber-400 flex items-center gap-1 shadow-md border border-slate-700">
                    <Star size={13} className="fill-amber-400" /> {tour.rating} ({tour.reviews})
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{tour.name}</h3>
                    <p className="text-xs font-bold text-rose-400 flex items-center gap-1">
                      <Clock size={13} /> {tour.duration}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    {tour.highlights.map((h, idx) => (
                      <div key={idx} className="text-xs text-slate-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span> {h}
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-slate-700/60 pt-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Tour Price</span>
                      <span className="text-xl font-extrabold text-white">{tour.price}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href="/plan-my-layover"
                  className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-md shadow-rose-600/20"
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
