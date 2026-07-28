import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { RESTAURANTS_DATA } from '@/data/layover-data';
import { Utensils, MapPin, Star, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Transit Dining & Restaurants near Mumbai Airport CSMIA | LayoverX',
  description:
    'Savor authentic Mumbai cuisine, 5-star hotel buffets, and fast-track airport dining with reserved tables near CSMIA T1 & T2.',
  alternates: {
    canonical: 'https://layoverx-dev.vercel.app/restaurants',
  },
};

export default function RestaurantsPage() {
  return (
    <div className="min-h-screen pb-20 space-y-12 bg-slate-50">
      {/* Page Hero */}
      <section className="bg-gradient-to-br from-orange-900 to-red-950 py-16 text-white mb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-400/30 text-xs font-bold">
              <Utensils size={14} /> Airport Dining & Express Restaurants
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Mumbai Layover Dining & Authentic Cuisine
            </h1>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Savor authentic Mumbai flavors, 5-star hotel buffets, and fast-track airport dining with reserved tables and priority service.
            </p>
          </div>
        </div>
      </section>

      {/* Restaurant Listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {RESTAURANTS_DATA.map((res) => (
            <div
              key={res.id}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-52 w-full">
                  <Image src={res.image} alt={res.name} fill className="object-cover" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-slate-900 flex items-center gap-1 shadow-sm">
                    <Star size={13} className="text-amber-500 fill-amber-500" /> {res.rating} ({res.reviews})
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div>
                    <h3 className="text-xl font-bold text-[#0F172A] mb-1">{res.name}</h3>
                    <p className="text-xs font-semibold text-orange-600 mb-2">{res.cuisine}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-2">
                      <MapPin size={13} className="text-[#0369a1]" /> {res.location}
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 block font-medium">Estimated Pricing</span>
                      <span className="text-lg font-extrabold text-slate-900">{res.avgCost}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href="/plan-my-layover"
                  className="w-full py-3 bg-[#0369a1] hover:bg-[#075985] text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-sm"
                >
                  Reserve Table & Fast-Pass <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
