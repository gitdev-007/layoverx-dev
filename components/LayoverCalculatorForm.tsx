'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, MapPin, Users, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export interface LayoverFormData {
  destinationArea: string;
  arrivalTime: string;
  departureTime: string;
  travelers: string;
}

interface LayoverCalculatorFormProps {
  initialValues?: Partial<LayoverFormData>;
  buttonText?: string;
  compact?: boolean;
  onSearch?: (data: LayoverFormData) => void;
}

export default function LayoverCalculatorForm({
  initialValues,
  buttonText = 'Build My Stopover Plan',
  compact = false,
  onSearch,
}: LayoverCalculatorFormProps) {
  const router = useRouter();

  // Initialize default arrival (2 hours from now) & departure (8 hours layover)
  const defaultArr = useMemo(() => {
    const now = new Date();
    const arr = new Date(now.getTime() + 2 * 60 * 60 * 1000);
    arr.setMinutes(0);
    return arr.toISOString().slice(0, 16);
  }, []);

  const defaultDep = useMemo(() => {
    const now = new Date();
    const arr = new Date(now.getTime() + 2 * 60 * 60 * 1000);
    arr.setMinutes(0);
    const dep = new Date(arr.getTime() + 8 * 60 * 60 * 1000);
    return dep.toISOString().slice(0, 16);
  }, []);

  const [destinationArea, setDestinationArea] = useState(
    initialValues?.destinationArea || 'csmia-t2'
  );
  const [arrivalTime, setArrivalTime] = useState(
    initialValues?.arrivalTime || defaultArr
  );
  const [departureTime, setDepartureTime] = useState(
    initialValues?.departureTime || defaultDep
  );
  const [travelers, setTravelers] = useState(
    initialValues?.travelers || '2 Passengers'
  );

  // Real-time Layover Calculation Engine
  const metrics = useMemo(() => {
    try {
      const arr = new Date(arrivalTime).getTime();
      const dep = new Date(departureTime).getTime();

      if (isNaN(arr) || isNaN(dep) || dep <= arr) {
        return {
          valid: false,
          totalHours: 0,
          totalMinutes: 0,
          hoursStr: '0h 0m',
          usableHours: 0,
          eligibleForCity: false,
        };
      }

      const diffMs = dep - arr;
      const totalMinutes = Math.floor(diffMs / (1000 * 60));
      const hours = Math.floor(totalMinutes / 60);
      const mins = totalMinutes % 60;

      // Subtract 2.5h mandatory buffer (150 mins: 1.5h immigration + 1.0h gate buffer)
      const usableMinutes = Math.max(0, totalMinutes - 150);
      const usableHours = usableMinutes / 60;
      const eligibleForCity = usableHours >= 3.0;

      return {
        valid: true,
        totalHours: diffMs / (1000 * 60 * 60),
        totalMinutes,
        hoursStr: `${hours}h ${mins}m`,
        usableHours,
        eligibleForCity,
      };
    } catch {
      return {
        valid: false,
        totalHours: 0,
        totalMinutes: 0,
        hoursStr: '0h 0m',
        usableHours: 0,
        eligibleForCity: false,
      };
    }
  }, [arrivalTime, departureTime]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData: LayoverFormData = {
      destinationArea,
      arrivalTime,
      departureTime,
      travelers,
    };

    // Store in localStorage for seamless draft persistence across pages
    try {
      localStorage.setItem('layoverx_calculator_data', JSON.stringify(formData));
    } catch (err) {
      console.warn('[LayoverCalculator] localStorage save failed:', err);
    }

    if (onSearch) {
      onSearch(formData);
    } else {
      const query = new URLSearchParams({
        destinationArea,
        arrivalTime,
        departureTime,
        travelers,
      }).toString();
      router.push(`/plan-my-layover?${query}`);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 text-slate-900 space-y-6">
      
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>✈️ Layover Safety &amp; Usable Time Calculator</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            AI Itinerary Builder &amp; Real-Time Buffer Estimator
          </p>
        </div>
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-sky-50 border border-sky-200 text-sky-700 text-xs font-extrabold rounded-full self-start sm:self-auto">
          <CheckCircle2 size={13} />
          ✓ Flight Delay Auto-Protection Included
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Field 1: TERMINAL / DESTINATION AREA */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin size={13} className="text-sky-600" />
              TERMINAL / DESTINATION
            </label>
            <select
              value={destinationArea}
              onChange={(e) => setDestinationArea(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            >
              <option value="csmia-t2">CSMIA Terminal 2 (International)</option>
              <option value="csmia-t1">CSMIA Terminal 1 (Domestic)</option>
              <option value="near-airport">Near Mumbai Airport</option>
            </select>
          </div>

          {/* Field 2: LANDING FLIGHT ARRIVAL */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar size={13} className="text-sky-600" />
              LANDING FLIGHT ARRIVAL
            </label>
            <input
              type="datetime-local"
              required
              value={arrivalTime}
              onChange={(e) => setArrivalTime(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            />
          </div>

          {/* Field 3: BOARDING FLIGHT DEPARTURE */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Clock size={13} className="text-sky-600" />
              BOARDING FLIGHT DEPARTURE
            </label>
            <input
              type="datetime-local"
              required
              value={departureTime}
              onChange={(e) => setDepartureTime(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            />
          </div>

          {/* Field 4: PASSENGERS / GUESTS COUNT */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Users size={13} className="text-sky-600" />
              TRAVELERS COUNT
            </label>
            <select
              value={travelers}
              onChange={(e) => setTravelers(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            >
              <option value="1 Passenger">1 Passenger</option>
              <option value="2 Passengers">2 Passengers</option>
              <option value="3 Passengers">3 Passengers</option>
              <option value="4+ Travelers">4+ Travelers</option>
            </select>
          </div>
        </div>

        {/* Dynamic Usable Time Summary Card Engine */}
        <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 space-y-3 shadow-lg border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                Real-Time Usable Time Engine
              </div>
              <div className="text-base sm:text-lg font-black text-sky-400">
                Calculated Layover: {metrics.hoursStr} ({metrics.usableHours.toFixed(1)}h usable time)
              </div>
            </div>

            {/* Dynamic Eligibility Badge */}
            <div>
              {metrics.eligibleForCity ? (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-extrabold text-xs rounded-xl">
                  🟢 City Sightseeing &amp; Micro-Stays Eligible
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-500/20 border border-amber-500/40 text-amber-300 font-extrabold text-xs rounded-xl">
                  🟡 Airside Transit &amp; Express Lounge Eligible
                </span>
              )}
            </div>
          </div>

          <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span>
              *Includes 1.5h security &amp; immigration clearance plus 1.0h gate buffer time.
            </span>
            <span className="text-sky-300 font-semibold flex items-center gap-1">
              <ShieldCheck size={13} />
              Guaranteed On-Time Airport Return
            </span>
          </div>
        </div>

        {/* Submit Action Button */}
        <button
          type="submit"
          className="w-full py-4 bg-[#0369a1] hover:bg-[#075985] text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-xl transition flex items-center justify-center gap-2 group"
        >
          <span>{buttonText}</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
    </div>
  );
}
