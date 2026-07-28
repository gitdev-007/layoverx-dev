'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SPAS_DATA, FAQS_DATA, REVIEWS_DATA } from '@/data/layover-data';
import {
  Sparkles,
  MapPin,
  Star,
  Search,
  Filter,
  ChevronDown,
  ArrowRight,
  Clock,
  ShieldCheck,
} from 'lucide-react';

export default function SpaWellnessPage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  return (
    <div className="min-h-screen pb-24 bg-[#F8FAFC] text-[#0F172A]">
      
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950 text-white pt-16 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <nav className="flex items-center gap-2 text-xs text-purple-200" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span className="text-purple-400">/</span>
                <span className="text-white font-medium">Spa & Wellness</span>
              </nav>

              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-purple-500/20 text-purple-300 border border-purple-400/30">
                ✨ EXPRESS SPAS & REJUVENATION LOUNGES
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                Airport Spas & Jetlag <br />
                <span className="text-purple-400">Recovery Therapies</span>
              </h1>

              <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-2xl">
                Unwind between flights with aromatherapy, deep tissue massages, hot shower packages, and foot reflexology inside Terminal 2 and luxury partner hotels.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">In-Terminal Express Sessions</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">Hot Shower & Steam Suites</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">Ayurvedic Botanicals</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">Zero Flight Anxiety Guarantee</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80"
                  alt="Airport Spa Lounge"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md px-3.5 py-2 rounded-xl text-xs text-white font-bold flex items-center gap-2 border border-white/10">
                  <MapPin size={14} className="text-purple-400" /> CSMIA Wellness Haven
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
            <h2 className="text-xl font-bold text-slate-900">Verified Express Spas & Wellness Lounges</h2>
            <span className="text-xs text-slate-500 font-bold">{SPAS_DATA.length} Available Locations</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {SPAS_DATA.map((spa) => (
              <div
                key={spa.id}
                className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-60 w-full">
                    <Image src={spa.image} alt={spa.name} fill className="object-cover" />
                    {spa.badge && (
                      <span className="absolute top-4 left-4 bg-purple-700 text-white text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md">
                        {spa.badge}
                      </span>
                    )}
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-slate-900 flex items-center gap-1 shadow-md">
                      <Star size={14} className="text-amber-500 fill-amber-500" /> {spa.rating} ({spa.reviews})
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-1">{spa.name}</h3>
                      <p className="text-xs font-bold text-purple-700 mb-2">{spa.treatment}</p>
                      <p className="text-xs text-slate-500 flex items-center gap-1.5">
                        <MapPin size={14} className="text-[#0369a1]" /> {spa.location} ({spa.distance})
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">{spa.description}</p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {spa.amenities.map((item, idx) => (
                        <span key={idx} className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-md font-medium">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 block font-medium">Session Price</span>
                    <span className="text-2xl font-black text-slate-900">{spa.price}</span>
                  </div>
                  <Link
                    href={`/service-details?id=${spa.id}`}
                    className="px-5 py-3 bg-[#0369a1] hover:bg-[#075985] text-white font-bold text-xs rounded-xl shadow-md transition"
                  >
                    Book Session
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
            <h2 className="text-3xl font-extrabold text-slate-900">Spa & Wellness FAQ</h2>
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
