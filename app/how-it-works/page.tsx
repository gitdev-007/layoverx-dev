'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FAQS_DATA, REVIEWS_DATA } from '@/data/layover-data';
import {
  ShieldCheck,
  Clock,
  MapPin,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  Plane,
  Luggage,
  Award,
} from 'lucide-react';

export default function HowItWorksPage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  return (
    <div className="min-h-screen pb-24 bg-[#F8FAFC] text-[#0F172A]">
      
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white pt-16 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <nav className="flex items-center gap-2 text-xs text-sky-300" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span className="text-slate-500">/</span>
                <span className="text-white font-medium">How It Works</span>
              </nav>

              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-sky-500/20 text-sky-300 border border-sky-400/30">
                📋 LAYOVER PROTOCOL & PLANNING
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                Escaping Mumbai Airport <br />
                <span className="text-sky-400">Made Simple</span>
              </h1>

              <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-2xl">
                Escape the terminals safely. We synchronize immigration clearance, baggage storage, private transit taxis, and flight timings so you never miss a connection.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">Terminal Exit Protocol Guides</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">Luggage Lockers Instructions</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">Transit Visa Requirements</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">Missed Flight Protection Guarantee</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=800&q=80"
                  alt="Mumbai Airport Terminal"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md px-3.5 py-2 rounded-xl text-xs text-white font-bold flex items-center gap-2 border border-white/10">
                  <MapPin size={14} className="text-sky-400" /> CSMIA Terminal 2 Departures
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TRANSIT TIMING LOGIC SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-[#0369a1] font-bold text-xs uppercase tracking-wider block">
                Transit Timing Logic
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900">
                How We Calculate Your Buffer Hours
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Clearing airport gates requires security buffers. When you enter your landing and boarding flight timings, our smart system automatically subtracts necessary checkpoints:
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-xs font-bold text-rose-600 flex-shrink-0">1</span>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Landing & Immigration (1.5 Hours)</h3>
                    <p className="text-slate-500 text-xs mt-0.5">De-boarding, walking through CSMIA T2, and clearing passport control queues.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-xs font-bold text-rose-600 flex-shrink-0">2</span>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Departures Security & Boarding (2 Hours)</h3>
                    <p className="text-slate-500 text-xs mt-0.5">Security screening check-in, customs control, and airport boarding gate checks prior to flight takeoff.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-xs font-bold text-emerald-700 flex-shrink-0">3</span>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Active Exploration Window</h3>
                    <p className="text-slate-500 text-xs mt-0.5">The remaining middle window is your safe zone to enjoy hotels, food crawls, or private sightseeing.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 8-Hour Layover Example Timeline Card */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 space-y-6 shadow-sm">
              <h3 className="font-bold text-slate-900 text-lg text-center">8-Hour Layover Example Timeline</h3>
              
              <div className="relative pl-6 border-l-2 border-[#0369a1] space-y-6 text-xs sm:text-sm">
                <div className="relative">
                  <span className="absolute -left-[31px] top-0 w-3.5 h-3.5 rounded-full bg-[#0369a1] border-2 border-white"></span>
                  <strong className="text-slate-900 block">08:00 AM • Flight Lands</strong>
                  <p className="text-slate-500 text-xs">Clear passport checks, proceed to Exit Gate 2.</p>
                </div>

                <div className="relative">
                  <span className="absolute -left-[31px] top-0 w-3.5 h-3.5 rounded-full bg-[#0369a1] border-2 border-white"></span>
                  <strong className="text-slate-900 block">09:15 AM • Driver Meet-up</strong>
                  <p className="text-slate-500 text-xs">Meet your private chauffeur at the arrival zone.</p>
                </div>

                <div className="relative">
                  <span className="absolute -left-[31px] top-0 w-3.5 h-3.5 rounded-full bg-emerald-600 border-2 border-white"></span>
                  <strong className="text-emerald-700 font-bold block">10:00 AM - 02:00 PM • Explore City</strong>
                  <p className="text-slate-500 text-xs">Tour Bandra, Juhu beach, or enjoy coastal seafood lunch.</p>
                </div>

                <div className="relative">
                  <span className="absolute -left-[31px] top-0 w-3.5 h-3.5 rounded-full bg-[#0369a1] border-2 border-white"></span>
                  <strong className="text-slate-900 block">02:45 PM • Arrive Back at CSMIA</strong>
                  <p className="text-slate-500 text-xs">Dropoff directly at Terminal 2 departure ramp.</p>
                </div>

                <div className="relative">
                  <span className="absolute -left-[31px] top-0 w-3.5 h-3.5 rounded-full bg-rose-600 border-2 border-white"></span>
                  <strong className="text-rose-600 font-bold block">04:00 PM • Flight Boarding</strong>
                  <p className="text-slate-500 text-xs">Gate boarding for your connecting flight.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ESSENTIAL LAYOVER LOGISTICS */}
      <section className="py-16 bg-slate-50 border-t border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center">
            <span className="text-[#0369a1] font-bold text-xs uppercase tracking-wider block mb-1">Transit Rules</span>
            <h2 className="text-3xl font-extrabold text-slate-900">Essential Layover Logistics</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Visa Info Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center text-2xl text-[#0369a1]">🛂</div>
              <h3 className="font-bold text-slate-900 text-lg">Indian Transit Visa Rules</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                To exit the airport grounds during layover, travelers must hold a valid Indian visa. For transit stays under 72 hours, you can apply for an <strong>Indian e-Transit Visa</strong> online at least 4 days prior to departure. Alternatively, standard e-Tourist visas are accepted for exits.
              </p>
              <a
                href="https://indianvisaonline.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#0369a1] font-bold hover:underline inline-flex items-center gap-1 pt-2"
              >
                Apply on Government Portal <ExternalLink size={14} />
              </a>
            </div>

            {/* Luggage Lockers Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center text-2xl text-[#0369a1]">💼</div>
              <h3 className="font-bold text-slate-900 text-lg">Left Luggage Locker Facility</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Don't drag heavy luggage around Mumbai. Clear security with your cabin bags and store larger check-in bags at the <strong>CSMIA Terminal 2 arrivals locker desk</strong> (operated by airport authorities). Rates range from ₹150 to ₹300 per bag.
              </p>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block pt-2">📍 Location: Arrivals Hall, Ground Level</span>
            </div>

          </div>
        </div>
      </section>

      {/* FAQs SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center">
            <span className="text-[#0369a1] font-bold text-xs uppercase tracking-wider block mb-1">Common Questions</span>
            <h2 className="text-3xl font-extrabold text-slate-900">Transit General FAQs</h2>
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
