'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TOURS_DATA, FAQS_DATA, REVIEWS_DATA } from '@/data/layover-data';
import {
  Compass,
  MapPin,
  Star,
  Clock,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export default function ExperiencesPage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  return (
    <div className="min-h-screen pb-24 bg-[#F8FAFC] text-[#0F172A]">
      
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-rose-950 via-slate-900 to-red-950 text-white pt-16 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <nav className="flex items-center gap-2 text-xs text-rose-200" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span className="text-rose-400">/</span>
                <span className="text-white font-medium">Tours</span>
              </nav>

              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-rose-500/20 text-rose-300 border border-rose-400/30">
                🌆 CURATED CITY TOURS & PRIVATE CHAUFFEURS
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                Mumbai Layover Tours <br />
                <span className="text-rose-400">On-Time Return Guarantee</span>
              </h1>

              <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-2xl">
                Explore Gateway of India, Taj Mahal Palace, Marine Drive, and Bandra Worli Sea Link with private AC cars, licensed local guides, and guaranteed airport return.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">Private AC Chauffeur Pickup</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">Luggage Secured Onboard</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">Guaranteed Return Buffer</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">Live Traffic & Flight Tracked</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80"
                  alt="Mumbai City Tour"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md px-3.5 py-2 rounded-xl text-xs text-white font-bold flex items-center gap-2 border border-white/10">
                  <MapPin size={14} className="text-rose-400" /> Gateway of India, Mumbai
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MARKETPLACE GRID */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h2 className="text-xl font-bold text-slate-900">Verified Layover City Tours</h2>
            <span className="text-xs text-slate-500 font-bold">{TOURS_DATA.length} Available Packages</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {TOURS_DATA.map((tour) => (
              <div
                key={tour.id}
                className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-60 w-full">
                    <Image src={tour.image} alt={tour.name} fill className="object-cover" />
                    {tour.badge && (
                      <span className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md">
                        {tour.badge}
                      </span>
                    )}
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-slate-900 flex items-center gap-1 shadow-md">
                      <Star size={14} className="text-amber-500 fill-amber-500" /> {tour.rating} ({tour.reviews})
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-1">{tour.name}</h3>
                      <div className="flex items-center gap-3 text-xs font-bold text-rose-600">
                        <span className="flex items-center gap-1"><Clock size={14} /> {tour.duration}</span>
                        <span className="bg-rose-50 px-2 py-0.5 rounded border border-rose-100">{tour.safeWindow}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">{tour.description}</p>

                    <div className="space-y-2 pt-2">
                      {tour.highlights.map((h, idx) => (
                        <div key={idx} className="text-xs text-slate-700 font-medium flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-rose-500 flex-shrink-0"></span> {h}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 block font-medium">Tour Price</span>
                    <span className="text-2xl font-black text-slate-900">{tour.price}</span>
                  </div>
                  <Link
                    href={`/service-details?id=${tour.id}`}
                    className="px-5 py-3 bg-[#0369a1] hover:bg-[#075985] text-white font-bold text-xs rounded-xl shadow-md transition"
                  >
                    Book Private Tour
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center">
            <span className="text-[#0369a1] font-bold text-xs uppercase tracking-wider block mb-1">Got Questions?</span>
            <h2 className="text-3xl font-extrabold text-slate-900">Layover Tours FAQ</h2>
          </div>
          <div className="space-y-4">
            {FAQS_DATA.map((faq, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl border border-slate-200 p-5 cursor-pointer"
                onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
              >
                <div className="flex items-center justify-between text-sm sm:text-base font-bold text-slate-900">
                  <span>{faq.question}</span>
                  <ChevronDown
                    size={18}
                    className={`text-[#0369a1] transition-transform duration-200 ${
                      faqOpen === idx ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                {faqOpen === idx && (
                  <p className="text-slate-600 text-xs sm:text-sm mt-3 leading-relaxed border-t border-slate-200 pt-3">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
