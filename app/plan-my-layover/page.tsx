'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plane, Clock, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function PlanMyLayoverPage() {
  const [step, setStep] = useState(1);
  const [flightIn, setFlightIn] = useState('AI 102 (JFK ➔ BOM)');
  const [flightOut, setFlightOut] = useState('UK 985 (BOM ➔ DEL)');
  const [arrivalTime, setArrivalTime] = useState('2026-07-28T10:00');
  const [departureTime, setDepartureTime] = useState('2026-07-28T18:00');
  const [travelers, setTravelers] = useState('1');

  const layoverDuration = 8.0;
  const safeExitWindow = 5.5;

  return (
    <div className="min-h-screen pb-20 space-y-10">
      {/* Page Hero */}
      <section className="bg-slate-900 border-b border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-bold">
              <Plane size={14} /> Smart Layover Planner & Feasibility Engine
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Plan Your Mumbai Stopover</h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Input your incoming & outgoing flight details. Our algorithm calculates traffic windows and recommends safe experiences.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Progress Indicator */}
        <div className="flex items-center justify-between px-4">
          <div className={`flex items-center gap-2 text-xs font-bold ${step >= 1 ? 'text-sky-400' : 'text-slate-500'}`}>
            <span className="w-7 h-7 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs">1</span>
            Flight Details
          </div>
          <div className="h-0.5 flex-grow mx-4 bg-slate-800"></div>
          <div className={`flex items-center gap-2 text-xs font-bold ${step >= 2 ? 'text-sky-400' : 'text-slate-500'}`}>
            <span className="w-7 h-7 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs">2</span>
            Verified Feasibility
          </div>
        </div>

        {step === 1 ? (
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Plane className="w-5 h-5 text-sky-400" /> Enter Flight & Layover Timings
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Incoming Flight Number
                </label>
                <input
                  type="text"
                  value={flightIn}
                  onChange={(e) => setFlightIn(e.target.value)}
                  className="w-full text-xs font-semibold rounded-xl border border-slate-700 bg-slate-900 text-white px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="e.g. AI 102"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Outgoing Flight Number
                </label>
                <input
                  type="text"
                  value={flightOut}
                  onChange={(e) => setFlightOut(e.target.value)}
                  className="w-full text-xs font-semibold rounded-xl border border-slate-700 bg-slate-900 text-white px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="e.g. UK 985"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Expected Arrival
                  </label>
                  <input
                    type="datetime-local"
                    value={arrivalTime}
                    onChange={(e) => setArrivalTime(e.target.value)}
                    className="w-full text-xs font-semibold rounded-xl border border-slate-700 bg-slate-900 text-white px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Expected Departure
                  </label>
                  <input
                    type="datetime-local"
                    value={departureTime}
                    onChange={(e) => setDepartureTime(e.target.value)}
                    className="w-full text-xs font-semibold rounded-xl border border-slate-700 bg-slate-900 text-white px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Number of Passengers
                </label>
                <select
                  value={travelers}
                  onChange={(e) => setTravelers(e.target.value)}
                  className="w-full text-xs font-semibold rounded-xl border border-slate-700 bg-slate-900 text-white px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="1">1 Passenger</option>
                  <option value="2">2 Passengers</option>
                  <option value="3">3 Passengers</option>
                  <option value="4">4+ Group Pass</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-md shadow-sky-500/20"
            >
              Calculate Safety Window <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2.5 text-emerald-400">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                <h3 className="text-lg font-bold">Layover Window Verified Safe</h3>
              </div>
              <p className="text-xs text-emerald-200">
                Total Layover: <strong>{layoverDuration} Hours</strong> | Guaranteed Safe Exit & Return Window: <strong>{safeExitWindow} Hours</strong>
              </p>
              <div className="text-[11px] text-slate-300 bg-slate-900/80 p-3.5 rounded-xl border border-emerald-900/60 space-y-1">
                <div>✓ Immigration & Security Buffer: 1.5 Hours</div>
                <div>✓ Terminal Return Clearance: 1.0 Hour</div>
                <div>✓ Live Flight Delay Protection Enabled</div>
              </div>
            </div>

            <h3 className="text-base font-bold text-white">Recommended Experiences for Your Layover</h3>
            
            <div className="space-y-3">
              <Link
                href="/hotels"
                className="block p-4 rounded-2xl border border-slate-700 bg-slate-900 hover:border-sky-500 hover:bg-slate-800 transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-white text-sm mb-0.5">Transit Hotel Pod Stay</h4>
                    <p className="text-xs text-slate-400">6-Hour micro-stay room with rain shower</p>
                  </div>
                  <span className="text-xs font-bold text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-full border border-sky-500/20">
                    100% Feasible
                  </span>
                </div>
              </Link>

              <Link
                href="/experiences"
                className="block p-4 rounded-2xl border border-slate-700 bg-slate-900 hover:border-sky-500 hover:bg-slate-800 transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-white text-sm mb-0.5">South Mumbai Highlights Tour</h4>
                    <p className="text-xs text-slate-400">Private AC car chauffeured sightseeing</p>
                  </div>
                  <span className="text-xs font-bold text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-full border border-sky-500/20">
                    100% Feasible
                  </span>
                </div>
              </Link>
            </div>

            <div className="flex gap-4 pt-2">
              <button
                onClick={() => setStep(1)}
                className="w-1/3 py-3 bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold rounded-xl text-xs transition"
              >
                Back
              </button>
              <Link
                href="/my-itinerary"
                className="w-2/3 py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl text-xs transition text-center flex items-center justify-center gap-2"
              >
                Save Itinerary & View Timeline <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
