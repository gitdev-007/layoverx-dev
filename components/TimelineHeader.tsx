'use client';

import React from 'react';
import { useItinerary } from '@/context/itinerary-context';
import { Pencil, PlaneTakeoff, PlaneLanding } from 'lucide-react';

export default function TimelineHeader() {
  const {
    totalLayoverHours = 17.0,
    driveTimeHours = 0.0,
    totalBufferHours = 2.5,
    usedActivitiesHours = 0.0,
    availableWindowHours = 14.5,
  } = useItinerary();

  const usedPercentage = Math.min(
    100,
    Math.max(0, ((totalBufferHours + usedActivitiesHours) / totalLayoverHours) * 100)
  );

  const handleModifyTimings = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Timings &amp; Exit Window</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Immigration exit &amp; transfer buffer: {totalBufferHours.toFixed(1)}h
          </p>
        </div>
        <button
          type="button"
          onClick={handleModifyTimings}
          className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 transition"
        >
          <Pencil className="w-4 h-4 text-amber-500" />
          Modify Trip Timings
        </button>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Layover */}
        <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Total Layover
          </span>
          <span className="text-xl font-bold text-slate-900 mt-1 block">
            {totalLayoverHours.toFixed(1)} Hours
          </span>
        </div>

        {/* Buffers */}
        <div className="bg-amber-50/70 border border-amber-200/60 p-4 rounded-xl">
          <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">
            Buffers (2.5H Transit{driveTimeHours > 0 ? ` + ${driveTimeHours.toFixed(1)}H Drive` : ''})
          </span>
          <span className="text-xl font-bold text-amber-900 mt-1 block">
            {totalBufferHours.toFixed(1)} Hours
          </span>
        </div>

        {/* Used Activities */}
        <div className="bg-sky-50/70 border border-sky-100 p-4 rounded-xl">
          <span className="text-xs font-bold text-sky-800 uppercase tracking-wider block">
            Used Activities
          </span>
          <span className="text-xl font-bold text-sky-950 mt-1 block">
            {usedActivitiesHours.toFixed(1)} Hours
          </span>
        </div>

        {/* Available Window */}
        <div
          className={`border p-4 rounded-xl ${
            availableWindowHours < 0
              ? 'bg-rose-50 border-rose-200 text-rose-900'
              : 'bg-indigo-50/70 border-indigo-100 text-indigo-950'
          }`}
        >
          <span className="text-xs font-bold uppercase tracking-wider block">
            Available Window
          </span>
          <span className="text-xl font-bold mt-1 block">
            {availableWindowHours.toFixed(1)} Hours
          </span>
        </div>
      </div>

      {/* Timeline Bar */}
      <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
        <div
          className="bg-sky-700 h-full transition-all duration-300 rounded-full"
          style={{ width: `${usedPercentage}%` }}
        />
      </div>

      {/* Formula Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-semibold text-slate-500 gap-2 pt-1">
        <div className="flex items-center gap-1.5 text-slate-700">
          <PlaneLanding className="w-4 h-4 text-sky-600" />
          <span>LANDING</span>
        </div>
        <div className="text-center font-medium tracking-wide">
          FORMULA: TOTAL LAYOVER - 2.5H TRANSIT - CAB DRIVE - 10M = {availableWindowHours.toFixed(1)}H AVAILABLE
        </div>
        <div className="flex items-center gap-1.5 text-slate-700">
          <PlaneTakeoff className="w-4 h-4 text-sky-600" />
          <span>TAKEOFF</span>
        </div>
      </div>
    </div>
  );
}
