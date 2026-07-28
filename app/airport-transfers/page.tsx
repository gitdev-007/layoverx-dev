import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { TRANSFERS_DATA } from '@/data/layover-data';
import { Car, ShieldCheck, Star, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Mumbai Airport Fixed-Rate Cabs & Chauffeur Transfers | LayoverX',
  description:
    'Flight-tracked airport pickups and luxury chauffeur transfers at CSMIA Terminal 1 & Terminal 2 with zero wait times.',
  alternates: {
    canonical: 'https://layoverx-dev.vercel.app/airport-transfers',
  },
};

export default function AirportTransfersPage() {
  return (
    <div className="min-h-screen pb-24 space-y-12 bg-slate-50">
      {/* Page Hero */}
      <section className="bg-slate-900 py-16 lg:py-20 text-white mb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-500/20 text-slate-300 border border-slate-400/30 text-xs sm:text-sm font-bold">
              <Car size={16} /> 🚕 Guaranteed Flight-Tracked Airport Transfers
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Mumbai Airport Transfers & Private Chauffeurs
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Seamless terminal pickup at CSMIA T1 & T2 with live flight tracking, zero wait time, and professional drivers.
            </p>
          </div>
        </div>
      </section>

      {/* Transfer Listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {TRANSFERS_DATA.map((item) => (
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
                    <p className="text-xs sm:text-sm font-bold text-slate-600 mb-2">{item.vehicle}</p>
                  </div>

                  <div className="space-y-2.5">
                    {item.features.map((f, idx) => (
                      <div key={idx} className="text-xs sm:text-sm text-slate-700 flex items-center gap-2 font-medium">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" /> {f}
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-slate-100 pt-5 flex items-center justify-between">
                    <div>
                      <span className="text-xs sm:text-sm text-slate-500 block font-medium">Flat Transfer Fee</span>
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
                  Book Airport Transfer <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
