'use client';

import React, { useState } from 'react';
import { Clock, MapPin, Users, ArrowRight, ShieldCheck, AlertTriangle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const LayoverCalculator: React.FC = () => {
  const [terminal, setTerminal] = useState('CSMIA Terminal 2');
  const [arrival, setArrival] = useState('2026-07-28T10:00');
  const [departure, setDeparture] = useState('2026-07-28T16:00');
  const [guests, setGuests] = useState('1');

  React.useEffect(() => {
    const now = new Date();
    const arr = new Date(now.getTime() + 2 * 60 * 60 * 1000); // 2 hours from now
    arr.setMinutes(0);
    const dep = new Date(arr.getTime() + 6 * 60 * 60 * 1000); // 6 hours stay
    setArrival(arr.toISOString().slice(0, 16));
    setDeparture(dep.toISOString().slice(0, 16));
  }, []);

  const getCalculatedTime = () => {
    if (!arrival || !departure) return null;
    const arrDate = new Date(arrival);
    const depDate = new Date(departure);
    const diffMs = depDate.getTime() - arrDate.getTime();

    if (diffMs <= 0) return null;

    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    const totalHours = totalMinutes / 60;
    
    // Subtract 2.5 hours (150 mins) airport security & transit buffer
    const bufferMinutes = 150;
    const usableMinutes = Math.max(0, totalMinutes - bufferMinutes);

    const totalH = Math.floor(totalMinutes / 60);
    const totalM = totalMinutes % 60;

    const usableH = (usableMinutes / 60).toFixed(1);

    return {
      totalFormatted: `${totalH}h ${totalM < 10 ? '0' : ''}${totalM}m`,
      totalHours,
      usableH,
      isSufficient: totalHours >= 4.0,
    };
  };

  const calc = getCalculatedTime();

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 text-slate-900">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#0369a1]" /> Layover Safety & Usable Time Calculator
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Includes mandatory 2.5-hour airport security, immigration, and transit buffer.
          </p>
        </div>
        <span className="hidden sm:inline-flex bg-sky-50 text-[#0369a1] text-xs font-bold px-3 py-1 rounded-full border border-sky-100">
          AeroAPI Buffer Active
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1">
            <MapPin size={13} className="text-[#0369a1]" /> Terminal
          </label>
          <select
            value={terminal}
            onChange={(e) => setTerminal(e.target.value)}
            className="w-full text-xs font-semibold rounded-xl border border-slate-200 px-3 py-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0369a1]"
          >
            <option value="CSMIA Terminal 2">CSMIA Terminal 2 (International)</option>
            <option value="CSMIA Terminal 1">CSMIA Terminal 1 (Domestic)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1">
            <Clock size={13} className="text-[#0369a1]" /> Arrival Time
          </label>
          <input
            type="datetime-local"
            value={arrival}
            onChange={(e) => setArrival(e.target.value)}
            className="w-full text-xs font-semibold rounded-xl border border-slate-200 px-3 py-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0369a1]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1">
            <Clock size={13} className="text-[#0369a1]" /> Departure Time
          </label>
          <input
            type="datetime-local"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            className="w-full text-xs font-semibold rounded-xl border border-slate-200 px-3 py-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0369a1]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1">
            <Users size={13} className="text-[#0369a1]" /> Guests
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full text-xs font-semibold rounded-xl border border-slate-200 px-3 py-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0369a1]"
          >
            <option value="1">1 Passenger</option>
            <option value="2">2 Passengers</option>
            <option value="3">3 Passengers</option>
            <option value="4+">4+ Group Pass</option>
          </select>
        </div>
      </div>

      {calc && (
        <div className="mb-6 p-4 rounded-2xl border transition-all bg-sky-50 border-sky-100 text-slate-900">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Calculated Layover
              </span>
              <div className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5">
                Calculated Layover: <span className="text-[#0369a1]">{calc.totalFormatted}</span>{' '}
                <span className="text-xs sm:text-sm font-bold text-slate-700">({calc.usableH}h usable time)</span>
              </div>
            </div>

            {calc.isSufficient ? (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                <CheckCircle2 size={14} /> City Sightseeing & Micro-Stays Eligible
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
                <AlertTriangle size={14} /> Recommended for Terminal Lounges & Pods
              </span>
            )}
          </div>

          <p className="text-[11px] text-slate-500 mt-2">
            *Includes 1.5h security & immigration clearance plus 1.0h gate buffer time.
          </p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Flight Delay Auto-Protection Included</span>
        </div>

        <Link
          href="/plan-my-layover"
          className="w-full sm:w-auto px-6 py-3 bg-[#0369a1] hover:bg-[#075985] text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2"
        >
          Explore Verified Layover Experiences <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};
