'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function AccountSettingsPage() {
  const [currency, setCurrency] = useState('INR');
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [emailPromo, setEmailPromo] = useState(false);

  return (
    <div className="min-h-screen pb-24 bg-[#F8FAFC] text-[#0F172A]">
      
      {/* SETTINGS HERO */}
      <section className="relative bg-slate-900 text-white pt-24 pb-16 overflow-hidden border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#0284C7] to-sky-600 flex items-center justify-center text-4xl font-extrabold text-white shadow-lg shadow-sky-500/20 uppercase">
              T
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Account Settings</h1>
              <p className="text-sm text-sky-200 font-semibold">Traveler</p>
              <p className="text-xs text-slate-400">traveler@layoverx.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN SETTINGS FORM */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Left Sidebar Navigation */}
            <aside className="md:col-span-1 space-y-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Navigation</h2>
                <nav className="flex flex-col gap-1 text-sm font-semibold">
                  <Link href="/my-profile" className="flex items-center gap-2 px-3 py-2.5 text-slate-700 hover:bg-slate-50 rounded-xl transition">
                    👤 Profile Details
                  </Link>
                  <Link href="/my-trips" className="flex items-center gap-2 px-3 py-2.5 text-slate-700 hover:bg-slate-50 rounded-xl transition">
                    ✈️ My Trips
                  </Link>
                  <Link href="/saved-itineraries" className="flex items-center gap-2 px-3 py-2.5 text-slate-700 hover:bg-slate-50 rounded-xl transition">
                    💾 Saved Plans
                  </Link>
                  <Link href="/account-settings" className="flex items-center gap-2 px-3 py-2.5 bg-sky-50 text-[#0284C7] rounded-xl font-bold transition">
                    ⚙️ Settings
                  </Link>
                </nav>
              </div>
            </aside>

            {/* Center Profile Panel */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">⚙️ Account Preferences</h2>
                
                <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Default Booking Currency</label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl p-3 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500 cursor-pointer"
                    >
                      <option value="INR">INR (₹) - Indian Rupee</option>
                      <option value="USD">USD ($) - US Dollar</option>
                      <option value="EUR">EUR (€) - Euro</option>
                      <option value="GBP">GBP (£) - British Pound</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Flight Notifications Delivery</label>
                    <div className="space-y-2 mt-2">
                      <label className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={whatsappAlerts}
                          onChange={(e) => setWhatsappAlerts(e.target.checked)}
                          className="rounded border-slate-300 text-[#0284C7] focus:ring-sky-500 h-4 w-4"
                        />
                        <span>Send WhatsApp status updates on my chauffeur details</span>
                      </label>

                      <label className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={smsAlerts}
                          onChange={(e) => setSmsAlerts(e.target.checked)}
                          className="rounded border-slate-300 text-[#0284C7] focus:ring-sky-500 h-4 w-4"
                        />
                        <span>SMS alerts on flight gate changes & delays during layover</span>
                      </label>

                      <label className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={emailPromo}
                          onChange={(e) => setEmailPromo(e.target.checked)}
                          className="rounded border-slate-300 text-[#0284C7] focus:ring-sky-500 h-4 w-4"
                        />
                        <span>Email notifications for exclusive supplier discount codes</span>
                      </label>
                    </div>
                  </div>

                  <hr className="border-slate-100" />

                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-4">🔒 Password and Security</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">New Password</label>
                        <input
                          type="password"
                          placeholder="Enter new password (min 6 characters)"
                          className="w-full bg-white border border-slate-300 rounded-xl p-3 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Confirm Password</label>
                        <input
                          type="password"
                          placeholder="Repeat password"
                          className="w-full bg-white border border-slate-300 rounded-xl p-3 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-xl shadow transition"
                    >
                      Update Settings
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
