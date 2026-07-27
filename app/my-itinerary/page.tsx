import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Plane, Clock, Hotel, Utensils, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'My Layover Itinerary & Booking Cart | LayoverX',
  description:
    'View your saved real-time synchronized stopover itinerary and active bookings for Mumbai CSMIA Airport.',
  alternates: {
    canonical: 'https://layoverx-dev.vercel.app/my-itinerary',
  },
};

export default function MyItineraryPage() {
  const timeline = [
    {
      time: '10:00 AM',
      title: 'Flight Arrival at CSMIA Terminal 2',
      detail: 'Air India AI 102 from JFK. Flight status: On Time.',
      icon: Plane,
      badge: 'Arrival',
      color: 'bg-sky-500',
    },
    {
      time: '11:30 AM',
      title: 'Immigration & Baggage Clearance',
      detail: 'Estimated clearance time: 45 minutes.',
      icon: CheckCircle2,
      badge: 'Security',
      color: 'bg-emerald-500',
    },
    {
      time: '12:00 PM',
      title: 'Niranta Transit Hotel Micro-Stay Check-In',
      detail: '3-Hour rest room booked. Booking #LX-BOM-88329.',
      icon: Hotel,
      badge: 'Hotel',
      color: 'bg-amber-500',
    },
    {
      time: '03:30 PM',
      title: 'Peshawri ITC Maratha Express Lunch',
      detail: 'Table reserved for 2. 5 mins from Terminal 2.',
      icon: Utensils,
      badge: 'Dining',
      color: 'bg-orange-500',
    },
    {
      time: '05:30 PM',
      title: 'Return to Terminal 2 Departures',
      detail: 'Clear security for outgoing flight UK 985 to Delhi.',
      icon: Plane,
      badge: 'Departure',
      color: 'bg-sky-500',
    },
  ];

  return (
    <div className="min-h-screen pb-20 space-y-10">
      {/* Page Hero */}
      <section className="bg-slate-900 border-b border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
              <ShieldCheck size={14} /> Live Flight Tracked Itinerary
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              My Layover Itinerary Timeline
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm">
              Real-time synchronized stopover itinerary for Mumbai CSMIA Terminal 1 & Terminal 2.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-800/80 border border-slate-700/60 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-700 pb-6">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Current Reservation</span>
              <h3 className="text-xl font-bold text-white">Mumbai CSMIA 8-Hour Stopover Plan</h3>
            </div>
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full">
              Flight Sync Active
            </span>
          </div>

          <div className="relative border-l-2 border-sky-500/30 ml-4 space-y-8 pl-8">
            {timeline.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="relative">
                  <div className={`absolute -left-[45px] top-0 w-8 h-8 rounded-full ${item.color} text-white flex items-center justify-center shadow-lg`}>
                    <IconComp size={16} />
                  </div>
                  <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-sky-400">{item.time}</span>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                        {item.badge}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white">{item.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t border-slate-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              Total Package Cost: <strong className="text-white text-base">₹4,798</strong>
            </div>
            <Link
              href="/plan-my-layover"
              className="w-full sm:w-auto px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl text-xs transition text-center flex items-center justify-center gap-2 shadow-md shadow-sky-500/20"
            >
              Modify Layover Plan <ArrowRight size={14} />
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
