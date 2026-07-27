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
    <div className="min-h-screen pb-20 space-y-12">
      {/* Page Hero */}
      <section className="bg-slate-900 border-b border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-500/10 border border-slate-500/30 text-slate-300 text-xs font-bold">
              <Car size={14} /> Guaranteed Flight-Tracked Airport Transfers
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Mumbai Airport Transfers & Private Chauffeurs
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
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
              className="bg-slate-800/80 border border-slate-700/60 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between hover:border-sky-500/50 transition-all duration-300"
            >
              <div>
                <div className="relative h-56 w-full">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                  <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-amber-400 flex items-center gap-1 shadow-md border border-slate-700">
                    <Star size={13} className="fill-amber-400" /> {item.rating} ({item.reviews})
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{item.name}</h3>
                    <p className="text-xs font-semibold text-sky-400">{item.vehicle}</p>
                  </div>

                  <div className="space-y-2">
                    {item.features.map((f, idx) => (
                      <div key={idx} className="text-xs text-slate-300 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" /> {f}
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-slate-700/60 pt-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Flat Transfer Fee</span>
                      <span className="text-xl font-extrabold text-white">{item.price}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href="/plan-my-layover"
                  className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-md shadow-sky-500/20"
                >
                  Book Airport Transfer <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
