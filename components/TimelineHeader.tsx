'use client';

import React from 'react';
import { useItinerary } from '@/context/itinerary-context';
import { Clock, Shield, Compass, Calendar, AlertTriangle } from 'lucide-react';

export default function TimelineHeader() {
  const {
    totalLayoverHours,
    setTotalLayoverHours,
    driveTimeHours,
    totalBufferHours,
    usedActivitiesHours,
    availableWindowHours,
  } = useItinerary();

  const isOverbooked = availableWindowHours < 0;

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            <Calendar className="text-sky-600 w-5 h-5" />
            <span>Layover Timeline &amp; Route Matrix</span>
          </h2>
          <p className="text-gray-500 text-xs mt-0.5">
            Real-time calculations for airport procedures, road transfers, and activities.
          </p>
        </div>
        
        {/* Dynamic layover hours interactive slider */}
        <div className="flex items-center gap-3 bg-slate-50 border border-gray-200 px-4 py-2 rounded-xl">
          <span className="text-xs font-bold text-gray-600 whitespace-nowrap">Layover Duration:</span>
          <input
            type="range"
            min="4"
            max="24"
            step="0.5"
            value={totalLayoverHours}
            onChange={(e) => setTotalLayoverHours(parseFloat(e.target.value))}
            className="w-24 accent-sky-600 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-xs font-extrabold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-100 min-w-[50px] text-center">
            {totalLayoverHours.toFixed(1)}h
          </span>
        </div>
      </div>

      {/* 4 Clean Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* 1. Total Layover */}
        <div className="bg-slate-50 p-4 rounded-xl border border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600 flex-shrink-0">
            <Clock size={20} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">TOTAL LAYOVER</span>
            <strong className="text-gray-900 text-sm font-extrabold">{totalLayoverHours.toFixed(1)} Hours</strong>
          </div>
        </div>

        {/* 2. Buffers */}
        <div className="bg-slate-50 p-4 rounded-xl border border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0">
            <Shield size={20} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">BUFFERS</span>
            <strong className="text-gray-900 text-sm font-extrabold">{totalBufferHours.toFixed(1)} Hours</strong>
            <span className="text-[9px] text-gray-400 block mt-0.5 leading-none">2.5H Base + {driveTimeHours.toFixed(1)}H Drive</span>
          </div>
        </div>

        {/* 3. Used Activities */}
        <div className="bg-slate-50 p-4 rounded-xl border border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0">
            <Compass size={20} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">USED ACTIVITIES</span>
            <strong className="text-gray-900 text-sm font-extrabold">{usedActivitiesHours.toFixed(1)} Hours</strong>
          </div>
        </div>

        {/* 4. Available Window */}
        <div className={`p-4 rounded-xl flex items-center gap-3 border ${
          isOverbooked 
            ? 'bg-rose-50 border-rose-200 text-rose-900' 
            : 'bg-emerald-50 border-emerald-200 text-emerald-900'
        }`}>
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
            isOverbooked ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
          }`}>
            {isOverbooked ? <AlertTriangle size={20} /> : <Shield size={20} />}
          </div>
          <div>
            <span className="text-[10px] font-bold opacity-75 uppercase tracking-wider block">AVAILABLE WINDOW</span>
            <strong className="text-sm font-black">{availableWindowHours.toFixed(1)} Hours</strong>
            {isOverbooked && <span className="text-[9px] block text-rose-600 font-bold leading-none mt-0.5">Time Exceeded!</span>}
          </div>
        </div>
      </div>

      {/* Formula Bar */}
      <div className={`p-3 rounded-xl border text-center text-xs font-semibold leading-relaxed tracking-wide ${
        isOverbooked 
          ? 'bg-rose-50/50 border-rose-100 text-rose-800' 
          : 'bg-slate-50/50 border-gray-100 text-gray-500'
      }`}>
        FORMULA: TOTAL LAYOVER ({totalLayoverHours.toFixed(1)}H) - BASE BUFFER (2.5H) - CAB DRIVE ({driveTimeHours.toFixed(1)}H) - ACTIVITIES ({usedActivitiesHours.toFixed(1)}H) = {availableWindowHours.toFixed(1)}H AVAILABLE
      </div>
    </div>
  );
}
