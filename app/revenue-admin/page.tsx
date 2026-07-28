'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function RevenueAdminPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'pricing' | 'promotions' | 'payouts'>('overview');

  return (
    <div className="min-h-screen pb-24 bg-[#F8FAFC] text-[#0F172A]">
      
      {/* ADMIN HERO */}
      <section className="relative bg-slate-900 text-white pt-24 pb-16 overflow-hidden border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <nav className="flex items-center gap-2 text-xs text-emerald-400" aria-label="Breadcrumb">
            <Link href="/" className="hover:underline">Home</Link>
            <span>&rarr;</span>
            <span className="text-white font-semibold">Revenue & Pricing Control Console</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Revenue & <span className="text-emerald-400">Pricing Admin</span>
              </h1>
              <p className="text-slate-300 text-sm max-w-2xl mt-1">
                Enterprise-grade revenue management, dynamic yield overrides, discount stacking rule logs, and vendor payout ledgers.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-emerald-500/10 text-emerald-400 font-extrabold px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Live Pricing Engine Active
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN ADMIN CONTENT */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`px-5 py-3 text-sm font-extrabold rounded-xl transition ${
                activeTab === 'overview' ? 'bg-slate-900 text-white shadow' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              📈 Revenue Overview
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('pricing')}
              className={`px-5 py-3 text-sm font-bold transition ${
                activeTab === 'pricing' ? 'bg-slate-900 text-white shadow' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              ⚙️ Pricing Rules & Yield
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('promotions')}
              className={`px-5 py-3 text-sm font-bold transition ${
                activeTab === 'promotions' ? 'bg-slate-900 text-white shadow' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              🏷️ Coupons & Discounts
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('payouts')}
              className={`px-5 py-3 text-sm font-bold transition ${
                activeTab === 'payouts' ? 'bg-slate-900 text-white shadow' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              💼 Payouts & Audit Logs
            </button>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Key Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-1">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Gross Booking Value (GBV)</p>
                  <div className="text-2xl font-black text-slate-900">₹1,84,500</div>
                  <p className="text-xs text-emerald-600 font-semibold">↑ 12.4% from last week</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-1">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Platform Net Revenue</p>
                  <div className="text-2xl font-black text-emerald-700">₹32,280</div>
                  <p className="text-xs text-slate-500 font-medium">Includes fees + commissions</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-1">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Simulated Occupancy</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-slate-900">74%</span>
                    <span className="text-xs font-extrabold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">High</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">Yield-pricing active</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-1">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Active Coupons</p>
                  <div className="text-2xl font-black text-indigo-700">4</div>
                  <p className="text-xs text-slate-500 font-medium">4 active stacking filters</p>
                </div>
              </div>

              {/* Transaction Ledger */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">🛒 Real-time Revenue Transaction Ledger</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Calculated prices, platform convenience fees, and taxes collected.</p>
                  </div>
                  <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl transition shadow">
                    📥 Compile CA Financial Summary
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700 border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-slate-900 font-bold">
                        <th className="p-3">Tx ID</th>
                        <th className="p-3">Service</th>
                        <th className="p-3">Base Cost</th>
                        <th className="p-3">Commission</th>
                        <th className="p-3">Net Total</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="p-3 font-bold text-slate-900">#TX-9481</td>
                        <td className="p-3">Niranta Transit Hotel (6h)</td>
                        <td className="p-3">₹3,499</td>
                        <td className="p-3 text-emerald-700 font-bold">₹524 (15%)</td>
                        <td className="p-3 font-bold">₹4,023</td>
                        <td className="p-3"><span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded">Settled</span></td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-slate-900">#TX-9482</td>
                        <td className="p-3">South Mumbai Tour</td>
                        <td className="p-3">₹2,899</td>
                        <td className="p-3 text-emerald-700 font-bold">₹434 (15%)</td>
                        <td className="p-3 font-bold">₹3,333</td>
                        <td className="p-3"><span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded">Settled</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

        </div>
      </section>

    </div>
  );
}
