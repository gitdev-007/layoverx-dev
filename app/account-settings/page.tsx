'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { User, CheckCircle2 } from 'lucide-react';

export default function AccountSettingsPage() {
  const { user, loading, openAuthModal } = useAuth();
  const [currency, setCurrency] = useState('INR');
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [emailPromo, setEmailPromo] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (user) {
      const savedCurrency = localStorage.getItem(`layoverx_currency_${user.id}`);
      if (savedCurrency) setCurrency(savedCurrency);
      const savedWhatsapp = localStorage.getItem(`layoverx_whatsapp_${user.id}`);
      if (savedWhatsapp) setWhatsappAlerts(savedWhatsapp === 'true');
      const savedSMS = localStorage.getItem(`layoverx_sms_${user.id}`);
      if (savedSMS) setSmsAlerts(savedSMS === 'true');
      const savedPromo = localStorage.getItem(`layoverx_promo_${user.id}`);
      if (savedPromo) setEmailPromo(savedPromo === 'true');
    }
  }, [user]);

  const handleUpdateSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    localStorage.setItem(`layoverx_currency_${user.id}`, currency);
    localStorage.setItem(`layoverx_whatsapp_${user.id}`, String(whatsappAlerts));
    localStorage.setItem(`layoverx_sms_${user.id}`, String(smsAlerts));
    localStorage.setItem(`layoverx_promo_${user.id}`, String(emailPromo));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-sky-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-semibold text-sm">Loading settings...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4">
        <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-8 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-600 mx-auto">
            <User size={32} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900">Sign In Required</h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              Please sign in or register to view and customize your account preferences.
            </p>
          </div>
          <button
            onClick={() => openAuthModal('login')}
            className="w-full py-3.5 bg-[#0369a1] hover:bg-[#075985] text-white font-extrabold text-sm rounded-xl transition shadow-md shadow-sky-500/10"
          >
            Sign In / Register
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 bg-[#F8FAFC] text-[#0F172A]">
      
      {/* SETTINGS HERO */}
      <section className="relative bg-slate-900 text-white pt-24 pb-16 overflow-hidden border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name || 'Traveler'}
                className="w-24 h-24 rounded-2xl object-cover shadow-lg shadow-sky-500/20 border border-slate-700"
              />
            ) : (
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#0284C7] to-sky-600 flex items-center justify-center text-4xl font-extrabold text-white shadow-lg shadow-sky-500/20 uppercase">
                {(user.name || 'Traveler').charAt(0)}
              </div>
            )}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Account Settings</h1>
              <p className="text-sm text-sky-200 font-semibold">{user.name || 'Traveler'}</p>
              <p className="text-xs text-slate-400">{user.email}</p>
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
                
                {isSaved && (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-4 flex items-center gap-3 text-sm font-semibold animate-in fade-in duration-300 mb-4">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Account preferences updated successfully!</span>
                  </div>
                )}

                <form onSubmit={handleUpdateSettings} className="space-y-6">
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
