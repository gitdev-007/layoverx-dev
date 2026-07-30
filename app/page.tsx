import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import LayoverCalculatorForm from '@/components/LayoverCalculatorForm';
import { fetchServices } from '@/lib/api';
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
  title: 'Mumbai Travel & Layover Experience Platform | LayoverX',
  description:
    'Discover luxury transit hotels, authentic restaurants, spas, local city tours, and airport transfers near CSM International Airport Mumbai. Plan your perfect stopover.',
  alternates: {
    canonical: 'https://layoverx-dev.vercel.app',
  },
};

export default async function HomePage() {
  const dynamicServices = await fetchServices();
  const hotelPods = dynamicServices.filter(item => item.category === 'HOTEL_PODS');
  const hotelsToRender = hotelPods && hotelPods.length > 0
    ? hotelPods.slice(0, 3).map(item => ({
        id: item.id,
        name: item.name,
        terminal: item.terminal || 'CSMIA Terminal 2',
        rating: item.rating || 4.8,
        reviews: item.reviews || 1200,
        price3h: `₹${item.price || 3499}`,
        image: item.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        amenities: item.amenities || ['🚿 Shower Facility', '⚡ Fast WiFi', '🛌 24/7 Check-in'],
      }))
    : HOTELS_DATA;
  const categories = [
    {
      title: 'Transit Hotels & Pods',
      desc: 'Book 3, 6, or 12-hour slots inside or right outside CSMIA T1 & T2 with express check-in.',
      href: '/hotels',
      icon: Hotel,
      badge: 'Hourly Stay',
      color: 'bg-amber-100 text-amber-900 border-amber-200',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Airport Dining & Food Trails',
      desc: 'Authentic Mumbai flavors, 5-star hotel buffets, and fast-track airport lounge dining.',
      href: '/restaurants',
      icon: Utensils,
      badge: 'Priority Table',
      color: 'bg-orange-100 text-orange-900 border-orange-200',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Guided Layover City Tours',
      desc: '4 to 8-hour private chauffeured tours covering Gateway of India, Sea Link & Marine Drive.',
      href: '/experiences',
      icon: Compass,
      badge: 'Guaranteed Return',
      color: 'bg-rose-100 text-rose-900 border-rose-200',
      image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Express Spa & Jetlag Recovery',
      desc: 'Rejuvenate with foot reflexology, deep tissue massage, hot showers, and steam suites.',
      href: '/spa-wellness',
      icon: Sparkles,
      badge: 'Rejuvenate',
      color: 'bg-purple-100 text-purple-900 border-purple-200',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Esports & Gaming Lounges',
      desc: 'High-speed Wi-Fi, PS5 gaming pods, VR simulators, and quiet executive work bays.',
      href: '/gaming-entertainment',
      icon: Gamepad2,
      badge: 'Executive Bay',
      color: 'bg-fuchsia-100 text-fuchsia-900 border-fuchsia-200',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Fixed-Rate Airport Transfers',
      desc: 'Flight-tracked private chauffeurs with zero wait time at CSMIA T1 & T2 gate exits.',
      href: '/airport-transfers',
      icon: Car,
      badge: '0-Min Wait',
      color: 'bg-sky-100 text-sky-900 border-sky-200',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Section */}
      <section className="theme-hero py-20 lg:py-28 relative overflow-hidden text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-bold shadow-sm">
              <Plane size={14} /> CSMIA Mumbai Airport Layover Hub
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
            <div className="pt-6 text-left">
              <LayoverCalculatorForm />
            </div>

          </div>
        </div>
      </section>


      {/* Service Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Curated Services for Travelers
          </h2>
          <p className="text-slate-600 text-sm">
            Hand-picked services near Mumbai International Airport (CSMIA) Terminal 1 & Terminal 2.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, idx) => {
            const IconComp = cat.icon;
            return (
              <div
                key={idx}
                className="group bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#0369a1] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2UzZThlOCIvPjwvc3ZnPg=="
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                    <span
                      className={`absolute top-3 right-3 text-[11px] font-extrabold px-3 py-1 rounded-full border backdrop-blur-md ${cat.color}`}
                    >
                      {cat.badge}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 text-[#0369a1] flex items-center justify-center">
                        <IconComp size={20} />
                      </div>
                      <h3 className="text-xl font-bold text-[#0F172A] group-hover:text-[#0369a1] transition">
                        {cat.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{cat.desc}</p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={cat.href}
                    className="w-full py-2.5 bg-slate-100 hover:bg-[#0369a1] text-slate-700 hover:text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 group-hover:bg-[#0369a1] group-hover:text-white"
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
      <section className="bg-slate-100/70 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-200 pb-6">
            <div>
              <span className="text-xs font-extrabold uppercase text-[#0369a1] tracking-wider">
                Popular In-Demand Stay
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mt-1">
                Top Rated Transit Hotels & Micro-Stays
              </h2>
            </div>
            <Link
              href="/hotels"
              className="text-xs font-bold text-[#0369a1] hover:underline flex items-center gap-1"
            >
              View All Hotels <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {hotelsToRender.map((h) => (
              <div
                key={h.id}
                className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full">
                    <Image 
                      src={h.image} 
                      alt={h.name} 
                      fill 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover" 
                    />
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-slate-900 flex items-center gap-1 shadow-md border border-slate-200">
                      <Star size={13} className="text-amber-500 fill-amber-500" /> {h.rating} ({h.reviews})
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <h3 className="text-lg font-bold text-[#0F172A] leading-snug">{h.name}</h3>
                    <p className="text-xs text-slate-500">{h.terminal}</p>

                    <div className="flex flex-wrap gap-1.5">
                      {h.amenities.map((item, idx) => (
                        <span
                          key={idx}
                          className="bg-slate-100 text-slate-700 text-[10px] px-2.5 py-1 rounded-md font-medium"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-500 block font-medium">3-Hour Stay From</span>
                        <span className="text-lg font-extrabold text-[#0369a1]">{h.price3h}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href="/hotels"
                    className="w-full py-2.5 bg-[#0369a1] hover:bg-[#075985] text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-2"
                  >
                    Book Hourly Stay
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Why Choose LayoverX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-extrabold uppercase text-[#0369a1] tracking-wider">
              Transit Safety Engine
            </span>
            <h2 className="text-3xl font-extrabold text-[#0F172A] mt-1">Why Book With LayoverX?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3 p-4">
              <div className="w-14 h-14 bg-sky-50 text-[#0369a1] rounded-2xl flex items-center justify-center mx-auto border border-sky-100">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-lg font-bold text-[#0F172A]">Flight Delay Protection</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Real-time automated flight delay tracking automatically reschedules or refunds your bookings.
              </p>
            </div>

            <div className="space-y-3 p-4">
              <div className="w-14 h-14 bg-sky-50 text-[#0369a1] rounded-2xl flex items-center justify-center mx-auto border border-sky-100">
                <Clock size={28} />
              </div>
              <h3 className="text-lg font-bold text-[#0F172A]">Guaranteed On-Time Return</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our smart layover engine calculates traffic windows so you never miss your connecting flight.
              </p>
            </div>

            <div className="space-y-3 p-4">
              <div className="w-14 h-14 bg-sky-50 text-[#0369a1] rounded-2xl flex items-center justify-center mx-auto border border-sky-100">
                <Plane size={28} />
              </div>
              <h3 className="text-lg font-bold text-[#0F172A]">24/7 Airport Support</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                On-ground airport concierges ready to assist you at Mumbai CSMIA Terminal 1 & 2.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-extrabold text-[#0F172A]">Verified Traveler Reviews</h2>
          <p className="text-xs text-slate-500 mt-1">Real experiences from international & domestic transit passengers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS_DATA.map((rev) => (
            <div key={rev.id} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-500" />
                  ))}
                </div>
                <span className="text-[10px] text-slate-400 font-medium">{rev.date}</span>
              </div>
              <p className="text-xs text-slate-600 italic leading-relaxed">"{rev.comment}"</p>
              <div className="border-t border-slate-100 pt-3">
                <p className="text-xs font-bold text-[#0F172A]">{rev.author}</p>
                <p className="text-[10px] text-[#0369a1] font-mono mt-0.5">{rev.flight}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <HelpCircle className="w-6 h-6 text-[#0369a1]" />
            <h2 className="text-2xl font-extrabold text-[#0F172A]">Mumbai Airport Layover FAQs</h2>
          </div>

          <div className="space-y-4 divide-y divide-slate-100">
            {FAQS_DATA.map((faq, idx) => (
              <div key={idx} className={`${idx !== 0 ? 'pt-4' : ''}`}>
                <h3 className="text-sm font-bold text-[#0F172A] mb-1.5">{faq.question}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
