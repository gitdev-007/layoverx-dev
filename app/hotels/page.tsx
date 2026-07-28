import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { HOTELS_DATA } from '@/data/layover-data';
import { Hotel, MapPin, Star, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Transit Hotels near Mumbai CSMIA Airport (T1 & T2) | LayoverX',
  description:
    'Book hourly transit hotel rooms and sleeping pods inside or near Mumbai Airport Terminal 1 and Terminal 2 for 3, 6, or 12-hour stays.',
  alternates: {
    canonical: 'https://layoverx-dev.vercel.app/hotels',
  },
};

export default function HotelsPage() {
  return (
    <div className="min-h-screen pb-24 space-y-12 bg-slate-50">
      {/* Page Hero */}
      <section className="bg-slate-900 py-16 lg:py-20 text-white mb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs sm:text-sm font-bold">
              <Hotel size={16} /> 🏨 Hourly Transit Hotels & Micro-Stays
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Mumbai Airport Transit Hotels & Micro-Stays
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Book flexible 3, 6, or 12-hour slots inside or right outside CSMIA Terminal 1 and Terminal 2. Refresh and rest before your next flight.
            </p>
          </div>
        </div>
      </section>

      {/* Main Hotel Listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {HOTELS_DATA.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-56 w-full">
                  <Image src={hotel.image} alt={hotel.name} fill className="object-cover" />
                  <div className="absolute top-3.5 right-3.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5 shadow-md">
                    <Star size={15} className="text-amber-500 fill-amber-500" /> {hotel.rating} ({hotel.reviews})
                  </div>
                </div>

                <div className="p-6 sm:p-7 space-y-5">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-2">{hotel.name}</h3>
                    <p className="text-xs sm:text-sm font-medium text-slate-500 flex items-center gap-1.5">
                      <MapPin size={16} className="text-[#0369a1]" /> {hotel.terminal}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {hotel.amenities.map((item, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-100 text-slate-700 text-xs sm:text-sm px-3 py-1.5 rounded-lg font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="border-t border-slate-100 pt-5 flex items-center justify-between">
                    <div>
                      <span className="text-xs sm:text-sm text-slate-500 block font-medium">3-Hour Stay From</span>
                      <span className="text-xl sm:text-2xl font-extrabold text-[#0369a1]">{hotel.price3h}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs sm:text-sm text-slate-500 block font-medium">6-Hour Stay From</span>
                      <span className="text-base sm:text-lg font-bold text-slate-800">{hotel.price6h}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-7 pt-0">
                <Link
                  href={`/service-details?id=${hotel.id}`}
                  className="w-full py-3.5 bg-[#0369a1] hover:bg-[#075985] text-white font-bold text-sm sm:text-base rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
                >
                  Book Hourly Stay <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
