import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { LayoverCalculator } from '@/components/layover-calculator';
import {
  HOTELS_DATA,
  RESTAURANTS_DATA,
  TOURS_DATA,
  FAQS_DATA,
  REVIEWS_DATA,
} from '@/data/layover-data';
import {
  Hotel,
  Utensils,
  Compass,
  Sparkles,
  Gamepad2,
  Car,
  ShieldCheck,
  Clock,
  Plane,
  Star,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'LayoverX — Mumbai CSMIA Airport Layover & Transit Platform',
  description:
    'Book hourly transit hotel pods, airport lounge passes, authentic dining, and guided city tours near Mumbai CSMIA Airport Terminal 1 & 2.',
  alternates: {
    canonical: 'https://layoverx-dev.vercel.app',
  },
};

export default function HomePage() {
  const categories = [
    {
      title: 'Transit Hotels & Pods',
      desc: 'Book 3, 6, or 12-hour slots inside or right outside CSMIA T1 & T2 with express check-in.',
      href: '/hotels',
      icon: Hotel,
      badge: 'Hourly Stay',
      color: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Airport Dining & Food Trails',
      desc: 'Authentic Mumbai flavors, 5-star hotel buffets, and fast-track airport lounge dining.',
      href: '/restaurants',
      icon: Utensils,
      badge: 'Priority Table',
      color: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Guided Layover City Tours',
      desc: '4 to 8-hour private chauffeured tours covering Gateway of India, Sea Link & Marine Drive.',
      href: '/experiences',
      icon: Compass,
      badge: 'Guaranteed Return',
      color: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Express Spa & Jetlag Recovery',
      desc: 'Rejuvenate with foot reflexology, deep tissue massage, hot showers, and steam suites.',
      href: '/spa-wellness',
      icon: Sparkles,
      badge: 'Rejuvenate',
      color: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Esports & Gaming Lounges',
      desc: 'High-speed Wi-Fi, PS5 gaming pods, VR simulators, and quiet executive work bays.',
      href: '/gaming-entertainment',
      icon: Gamepad2,
      badge: 'Executive Bay',
      color: 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Fixed-Rate Airport Transfers',
      desc: 'Flight-tracked private chauffeurs with zero wait time at CSMIA T1 & T2 gate exits.',
      href: '/airport-transfers',
      icon: Car,
      badge: '0-Min Wait',
      color: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      
      {/* Hero Section */}
      <section className="theme-hero py-20 lg:py-28 relative overflow-hidden text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs font-bold shadow-sm">
              <Plane size={14} /> Mumbai CSMIA Airport Transit Experience Hub
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Transform Your Mumbai Layover Into an{' '}
              <span className="bg-gradient-to-r from-sky-400 via-indigo-300 to-amber-300 bg-clip-text text-transparent">
                Unforgettable Experience
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Book hourly transit hotel pods, luxury lounges, authentic dining, airport transfers, and quick city tours designed specifically for flight stopovers.
            </p>

            {/* Layover Calculator Widget */}
            <div className="pt-6">
              <LayoverCalculator />
            </div>

          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Curated Services for Transit Travelers
          </h2>
          <p className="text-slate-400 text-sm">
            Hand-picked micro-services near Chhatrapati Shivaji Maharaj International Airport (CSMIA) Terminal 1 & 2.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, idx) => {
            const IconComp = cat.icon;
            return (
              <div
                key={idx}
                className="group bg-slate-800/80 border border-slate-700/60 rounded-3xl overflow-hidden shadow-xl hover:border-sky-500/50 hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                    <span
                      className={`absolute top-3 right-3 text-[11px] font-extrabold px-3 py-1 rounded-full border backdrop-blur-md ${cat.color}`}
                    >
                      {cat.badge}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
                        <IconComp size={20} />
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-sky-400 transition">
                        {cat.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{cat.desc}</p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={cat.href}
                    className="w-full py-2.5 bg-slate-700/60 hover:bg-sky-600 text-slate-200 hover:text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 group-hover:bg-sky-600 group-hover:text-white"
                  >
                    Explore Category <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Micro-Services Highlights */}
      <section className="bg-slate-800/40 border-y border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-700/60 pb-6">
            <div>
              <span className="text-xs font-extrabold uppercase text-sky-400 tracking-wider">
                Popular In-Demand Stay
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Top Rated Transit Hotels & Suites
              </h2>
            </div>
            <Link
              href="/hotels"
              className="text-xs font-bold text-sky-400 hover:underline flex items-center gap-1"
            >
              View All Hotels <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {HOTELS_DATA.map((h) => (
              <div
                key={h.id}
                className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl hover:border-slate-700 transition"
              >
                <div className="relative h-48 w-full">
                  <Image src={h.image} alt={h.name} fill className="object-cover" />
                  <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-amber-400 flex items-center gap-1 shadow-md border border-slate-700">
                    <Star size={13} className="fill-amber-400" /> {h.rating} ({h.reviews})
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-lg font-bold text-white leading-snug">{h.name}</h3>
                  <p className="text-xs text-slate-400">{h.terminal}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {h.amenities.map((item, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-800 text-slate-300 text-[10px] px-2.5 py-1 rounded-md font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="border-t border-slate-800 pt-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">3-Hour Stay From</span>
                      <span className="text-lg font-extrabold text-sky-400">{h.price3h}</span>
                    </div>
                    <Link
                      href="/hotels"
                      className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl text-xs transition"
                    >
                      Book Hourly Stay
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Why Choose LayoverX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/80 rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-extrabold uppercase text-sky-400 tracking-wider">
              Transit Safety Engine
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-1">Why Book With LayoverX?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3 p-4">
              <div className="w-12 h-12 bg-sky-500/10 border border-sky-500/30 text-sky-400 rounded-2xl flex items-center justify-center mx-auto">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-lg font-bold text-white">Automated Flight Delay Protection</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We monitor live AeroAPI radar feeds. If your flight is delayed, your booking window automatically adjusts at zero cost.
              </p>
            </div>

            <div className="space-y-3 p-4">
              <div className="w-12 h-12 bg-sky-500/10 border border-sky-500/30 text-sky-400 rounded-2xl flex items-center justify-center mx-auto">
                <Clock size={24} />
              </div>
              <h3 className="text-lg font-bold text-white">Guaranteed On-Time Return</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Our traffic algorithm accounts for Mumbai peak hours, guaranteeing safe terminal return clearance with zero missed flights.
              </p>
            </div>

            <div className="space-y-3 p-4">
              <div className="w-12 h-12 bg-sky-500/10 border border-sky-500/30 text-sky-400 rounded-2xl flex items-center justify-center mx-auto">
                <Plane size={24} />
              </div>
              <h3 className="text-lg font-bold text-white">24/7 Airport Door Concierge</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dedicated on-ground concierges stationed directly at CSMIA Terminal 1 & Terminal 2 arrival gates to guide your transit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-extrabold text-white">Verified Traveler Reviews</h2>
          <p className="text-xs text-slate-400 mt-1">Real experiences from international & domestic transit passengers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS_DATA.map((rev) => (
            <div key={rev.id} className="bg-slate-800/80 border border-slate-700/60 p-6 rounded-2xl shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] text-slate-400 font-medium">{rev.date}</span>
              </div>
              <p className="text-xs text-slate-300 italic leading-relaxed">"{rev.comment}"</p>
              <div className="border-t border-slate-700 pt-3">
                <p className="text-xs font-bold text-white">{rev.author}</p>
                <p className="text-[10px] text-sky-400 font-mono mt-0.5">{rev.flight}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-800/80 border border-slate-700/60 rounded-3xl p-8 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700 pb-4">
            <HelpCircle className="w-6 h-6 text-sky-400" />
            <h2 className="text-2xl font-extrabold text-white">Mumbai Airport Layover FAQs</h2>
          </div>

          <div className="space-y-4 divide-y divide-slate-700/60">
            {FAQS_DATA.map((faq, idx) => (
              <div key={idx} className={`${idx !== 0 ? 'pt-4' : ''}`}>
                <h3 className="text-sm font-bold text-white mb-1.5">{faq.question}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
