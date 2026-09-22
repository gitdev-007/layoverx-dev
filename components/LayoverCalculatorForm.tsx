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
  hideHeader?: boolean;
  hideSubmit?: boolean;
  onSearch?: (data: LayoverFormData) => void;
  onChange?: (data: LayoverFormData) => void;
}

export default function LayoverCalculatorForm({
  initialValues,
  buttonText = 'Build My Stopover Plan',
  compact = false,
  hideHeader = false,
  hideSubmit = false,
  onSearch,
  onChange,
}: LayoverCalculatorFormProps) {
  const router = useRouter();

  // Helper to format local date to YYYY-MM-DDTHH:MM for datetime-local input
  const toLocalISOString = (date: Date): string => {
    const pad = (n: number) => String(n).padStart(2, '0');
    const y = date.getFullYear();
    const m = pad(date.getMonth() + 1);
    const d = pad(date.getDate());
    const h = pad(date.getHours());
    const min = pad(date.getMinutes());
    return `${y}-${m}-${d}T${h}:${min}`;
  };

  // Track live current time string to dynamically disable elapsed time as the day goes on
  const [currentLocalStr, setCurrentLocalStr] = useState<string>(() => toLocalISOString(new Date()));

  // Periodically refresh the dateline min threshold (every minute)
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentLocalStr(toLocalISOString(new Date()));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Initialize default arrival (next full hour + 2 hours from now) & departure (+ 8 hours layover)
  const defaultArr = useMemo(() => {
    const now = new Date();
    const arr = new Date(now.getTime() + 2 * 60 * 60 * 1000);
    arr.setMinutes(0, 0, 0);
    return toLocalISOString(arr);
  }, []);

  const defaultDep = useMemo(() => {
    const now = new Date();
    const arr = new Date(now.getTime() + 2 * 60 * 60 * 1000);
    arr.setMinutes(0, 0, 0);
    const dep = new Date(arr.getTime() + 8 * 60 * 60 * 1000);
    return toLocalISOString(dep);
  }, []);

  const [destinationArea, setDestinationArea] = useState<string>('csmia-t2');
  const [arrivalTime, setArrivalTime] = useState<string>(defaultArr);
  const [departureTime, setDepartureTime] = useState<string>(defaultDep);
  const [travelers, setTravelers] = useState<string>('2 Passengers');

  // Load initial values or persisted localStorage draft on mount & prop changes
  React.useEffect(() => {
    let saved: Partial<LayoverFormData> = {};
    try {
      const stored = localStorage.getItem('layoverx_calculator_data');
      if (stored) saved = JSON.parse(stored);
    } catch {}

    const dest = initialValues?.destinationArea || saved?.destinationArea || 'csmia-t2';
    const rawArr = initialValues?.arrivalTime || saved?.arrivalTime;
    const rawDep = initialValues?.departureTime || saved?.departureTime;
    const trav = initialValues?.travelers || saved?.travelers || '2 Passengers';

    // Auto-invalidate past dates: if stored arrival is in the past, reset to future default
    const isPastArr = rawArr && new Date(rawArr).getTime() < Date.now() - 60 * 1000;
    const arr = rawArr && !isPastArr ? rawArr : defaultArr;

    const isPastDep =
      rawDep &&
      (new Date(rawDep).getTime() <= new Date(arr).getTime() ||
        new Date(rawDep).getTime() < Date.now() - 60 * 1000);
    const dep = rawDep && !isPastDep ? rawDep : defaultDep;

    setDestinationArea(dest);
    setArrivalTime(arr);
    setDepartureTime(dep);
    setTravelers(trav);
  }, [
    initialValues?.destinationArea,
    initialValues?.arrivalTime,
    initialValues?.departureTime,
    initialValues?.travelers,
    defaultArr,
    defaultDep,
  ]);

  const updateField = (
    field: 'destinationArea' | 'arrivalTime' | 'departureTime' | 'travelers',
    value: string
  ) => {
    let nextDest = destinationArea;
    let nextArr = arrivalTime;
    let nextDep = departureTime;
    let nextTrav = travelers;

    if (field === 'destinationArea') {
      setDestinationArea(value);
      nextDest = value;
    } else if (field === 'arrivalTime') {
      setArrivalTime(value);
      nextArr = value;
      // If departure is now before or equal to arrival, automatically push departure forward by 8 hours
      if (value && nextDep) {
        const arrTimeMs = new Date(value).getTime();
        const depTimeMs = new Date(nextDep).getTime();
        if (!isNaN(arrTimeMs) && (!depTimeMs || depTimeMs <= arrTimeMs)) {
          const autoDep = new Date(arrTimeMs + 8 * 60 * 60 * 1000);
          const autoDepStr = toLocalISOString(autoDep);
          setDepartureTime(autoDepStr);
          nextDep = autoDepStr;
        }
      }
    } else if (field === 'departureTime') {
      setDepartureTime(value);
      nextDep = value;
    } else if (field === 'travelers') {
      setTravelers(value);
      nextTrav = value;
    }

    const updatedData: LayoverFormData = {
      destinationArea: nextDest,
      arrivalTime: nextArr,
      departureTime: nextDep,
      travelers: nextTrav,
    };

    try {
      localStorage.setItem('layoverx_calculator_data', JSON.stringify(updatedData));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('layoverx_timings_updated'));
      }
    } catch (err) {}

    if (onChange) {
      onChange(updatedData);
    }
  };

  // Real-time Layover Calculation Engine with Past Date & Dateline Validation
  const metrics = useMemo(() => {
    try {
      const arr = new Date(arrivalTime).getTime();
      const dep = new Date(departureTime).getTime();
      const nowMs = Date.now() - 60 * 1000; // 1-minute buffer for active editing

      if (isNaN(arr) || isNaN(dep)) {
        return {
          valid: false,
          isPast: false,
          isInvalidOrder: false,
          error: 'Please choose valid arrival and departure dates.',
          totalHours: 0,
          totalMinutes: 0,
          hoursStr: '0h 0m',
          usableHours: 0,
          eligibleForCity: false,
        };
      }

      // Past date check
      if (arr < nowMs) {
        return {
          valid: false,
          isPast: true,
          isInvalidOrder: false,
          error: 'Landing flight arrival cannot be in the past. Select current time or a future date.',
          totalHours: 0,
          totalMinutes: 0,
          hoursStr: '0h 0m',
          usableHours: 0,
          eligibleForCity: false,
        };
      }

      // Order check
      if (dep <= arr) {
        return {
          valid: false,
          isPast: false,
          isInvalidOrder: true,
          error: 'Boarding flight departure must be after landing arrival time.',
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
        isPast: false,
        isInvalidOrder: false,
        error: null,
        totalHours: diffMs / (1000 * 60 * 60),
        totalMinutes,
        hoursStr: `${hours}h ${mins}m`,
        usableHours,
        eligibleForCity,
      };
    } catch {
      return {
        valid: false,
        isPast: false,
        isInvalidOrder: false,
        error: 'Invalid flight timings.',
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

    if (!metrics.valid) {
      alert(metrics.error || 'Please enter valid future flight timings.');
      return;
    }

    const formData: LayoverFormData = {
      destinationArea,
      arrivalTime,
      departureTime,
      travelers,
    };

    // Store in localStorage for seamless draft persistence across pages
    try {
      localStorage.setItem('layoverx_calculator_data', JSON.stringify(formData));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('layoverx_timings_updated'));
      }
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

  // Departure can never be earlier than arrival or current time
  const minDeparture = arrivalTime && arrivalTime > currentLocalStr ? arrivalTime : currentLocalStr;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 text-slate-900 space-y-6">
      {/* Title Header (Conditional) */}
      {!hideHeader && (
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
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Field 1: TERMINAL / DESTINATION AREA */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider h-5 flex items-center gap-1.5 whitespace-nowrap overflow-hidden text-ellipsis">
              <MapPin size={13} className="text-sky-600 flex-shrink-0" />
              <span className="truncate">TERMINAL / DESTINATION</span>
            </label>
            <select
              value={destinationArea}
              onChange={(e) => updateField('destinationArea', e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            >
              <option value="csmia-t2">CSMIA Terminal 2 (International)</option>
              <option value="csmia-t1">CSMIA Terminal 1 (Domestic)</option>
            </select>
          </div>

          {/* Field 2: LANDING FLIGHT ARRIVAL */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider h-5 flex items-center gap-1.5 whitespace-nowrap overflow-hidden text-ellipsis">
              <Calendar size={13} className="text-sky-600 flex-shrink-0" />
              <span className="truncate">LANDING FLIGHT ARRIVAL</span>
            </label>
            <input
              type="datetime-local"
              required
              min={currentLocalStr}
              value={arrivalTime}
              onChange={(e) => updateField('arrivalTime', e.target.value)}
              className={`w-full border rounded-2xl p-3 text-xs sm:text-sm font-semibold transition focus:outline-none focus:ring-2 ${
                metrics.isPast
                  ? 'bg-rose-50 border-rose-300 text-rose-900 focus:ring-rose-500'
                  : 'bg-slate-50 border-slate-200 text-slate-800 focus:ring-sky-500'
              }`}
            />
            {metrics.isPast && (
              <p className="text-[11px] font-bold text-rose-600 flex items-center gap-1 pt-0.5">
                <span>⚠️ Past time cannot be booked</span>
              </p>
            )}
          </div>

          {/* Field 3: BOARDING FLIGHT DEPARTURE */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider h-5 flex items-center gap-1.5 whitespace-nowrap overflow-hidden text-ellipsis">
              <Clock size={13} className="text-sky-600 flex-shrink-0" />
              <span className="truncate">BOARDING FLIGHT DEPARTURE</span>
            </label>
            <input
              type="datetime-local"
              required
              min={minDeparture}
              value={departureTime}
              onChange={(e) => updateField('departureTime', e.target.value)}
              className={`w-full border rounded-2xl p-3 text-xs sm:text-sm font-semibold transition focus:outline-none focus:ring-2 ${
                metrics.isInvalidOrder
                  ? 'bg-rose-50 border-rose-300 text-rose-900 focus:ring-rose-500'
                  : 'bg-slate-50 border-slate-200 text-slate-800 focus:ring-sky-500'
              }`}
            />
            {metrics.isInvalidOrder && (
              <p className="text-[11px] font-bold text-rose-600 flex items-center gap-1 pt-0.5">
                <span>⚠️ Departure must be after arrival</span>
              </p>
            )}
          </div>

          {/* Field 4: PASSENGERS / GUESTS COUNT */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider h-5 flex items-center gap-1.5 whitespace-nowrap overflow-hidden text-ellipsis">
              <Users size={13} className="text-sky-600 flex-shrink-0" />
              <span className="truncate">TRAVELERS COUNT</span>
            </label>
            <select
              value={travelers}
              onChange={(e) => updateField('travelers', e.target.value)}
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
                {metrics.valid ? (
                  `Calculated Layover: ${metrics.hoursStr} (${metrics.usableHours.toFixed(1)}h usable time)`
                ) : (
                  <span className="text-rose-400 font-semibold text-sm sm:text-base flex items-center gap-1.5">
                    ⚠️ {metrics.error || 'Please enter valid future flight timings'}
                  </span>
                )}
              </div>
            </div>

            {/* Dynamic Eligibility Badge */}
            <div>
              {metrics.valid &&
                (metrics.eligibleForCity ? (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-extrabold text-xs rounded-xl">
                    🟢 City Sightseeing &amp; Micro-Stays Eligible
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-500/20 border border-amber-500/40 text-amber-300 font-extrabold text-xs rounded-xl">
                    🟡 Airside Transit &amp; Express Lounge Eligible
                  </span>
                ))}
            </div>
          </div>

          <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span>
              *Includes 1.5h security &amp; immigration clearance plus 1.0h gate buffer time.
            </span>
            <span className="text-sky-300 font-semibold flex items-center gap-1">
              <ShieldCheck size={13} />
              Smart Traffic Buffer Included
            </span>
          </div>
        </div>

        {/* Submit Action Button (Conditional) */}
        {!hideSubmit && (
          <button
            type="submit"
            disabled={!metrics.valid}
            className={`w-full py-4 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-xl transition flex items-center justify-center gap-2 group ${
              metrics.valid
                ? 'bg-[#0369a1] hover:bg-[#075985] cursor-pointer'
                : 'bg-slate-700 opacity-60 cursor-not-allowed'
            }`}
          >
            <span>{buttonText}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </form>
    </div>
  );
}
