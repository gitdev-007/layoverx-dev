'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFullName('');
      setEmail('');
      setPhone('');
      setDate('');
      setMessage('');
    }, 4000);
  };

  return (
    <div className="min-h-screen pb-24 bg-[#F8FAFC] text-[#0F172A]">
      
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-b from-slate-900 to-slate-950 text-white pt-24 pb-16 overflow-hidden border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <nav className="flex items-center gap-2 text-xs text-sky-300" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span className="text-slate-500">/</span>
                <span className="text-white font-medium">Contact</span>
              </nav>
              
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-sky-500/20 text-sky-300 border border-sky-400/30">
                📞 24/7 SUPPORT & ASSISTANCE
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                24/7 Transit Customer <br />
                <span className="bg-gradient-to-r from-sky-400 to-sky-200 bg-clip-text text-transparent">
                  Support & Dispatch
                </span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                Have a question about an upcoming layover? Need urgent help with a booking? Contact our 24/7 airport dispatch office or apply to join our partner program.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                  <span className="font-semibold text-slate-200">24/7 Dispatch Hotline Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                  <span className="font-semibold text-slate-200">15-Min Response Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                  <span className="font-semibold text-slate-200">WhatsApp Live Chat Assistance</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                  <span className="font-semibold text-slate-200">Corporate & Supplier Registrations</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1483450388369-9ed95738483c?auto=format&fit=crop&w=800&q=75"
                  alt="Customer Service Desk"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs text-white font-semibold flex items-center gap-2 border border-white/10">
                  <span>📍 LayoverX Travel Assistance Desk</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MAIN FORMS & CONTACTS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* CONTACT FORM */}
            <div className="w-full lg:w-3/5 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Send Us a Message</h2>
                <p className="text-slate-600 text-sm mt-1">Our transit coordinators usually respond within 15 minutes.</p>
              </div>

              {submitted ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-sm font-bold text-center">
                  ✓ Message sent successfully! Our dispatch team will contact you shortly.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Full Name</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Doe"
                        required
                        className="w-full border border-slate-300 rounded-xl p-3 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="w-full border border-slate-300 rounded-xl p-3 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">WhatsApp / Phone Number</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 123 456 7890"
                        required
                        className="w-full border border-slate-300 rounded-xl p-3 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Layover Date</label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="w-full border border-slate-300 rounded-xl p-3 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Tell us about your flight timings & layover details
                    </label>
                    <textarea
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write landing times, airlines, and specific help needed..."
                      required
                      className="w-full border border-slate-300 rounded-xl p-3 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#0284C7] hover:bg-[#027ab1] text-white font-bold text-sm rounded-xl shadow-md transition"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* SUPPORT INFO & BUSINESS ENQUIRIES */}
            <aside className="w-full lg:w-2/5 space-y-8">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
                <h3 className="font-bold text-slate-900 text-lg">Direct Contacts</h3>
                <ul className="space-y-4 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-3">
                    <span className="text-xl">📞</span>
                    <div>
                      <strong className="text-slate-800 block">Urgent Support Hotline</strong>
                      <a href="tel:+912212345678" className="text-[#0284C7] font-bold">+91 22 1234 5678</a>
                      <p className="text-slate-500 text-xs mt-0.5">Available 24/7 for active transit passenger coordination.</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="text-xl">💬</span>
                    <div>
                      <strong className="text-slate-800 block">WhatsApp Dispatch Chat</strong>
                      <a href="https://wa.me/912212345678" target="_blank" rel="noopener" className="text-emerald-700 font-bold">+91 22 1234 5678</a>
                      <p className="text-slate-500 text-xs mt-0.5">Quickest channel for live coordinates updates.</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="text-xl">✉️</span>
                    <div>
                      <strong className="text-slate-800 block">General Support Email</strong>
                      <a href="mailto:support@layoverx.com" className="text-[#0284C7] font-bold">support@layoverx.com</a>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Partner Callout Box */}
              <div className="bg-gradient-to-br from-[#0284C7] to-indigo-700 text-white rounded-2xl p-6 shadow-md space-y-3">
                <h3 className="font-bold text-lg">Partner with LayoverX</h3>
                <p className="text-sky-100 text-xs leading-relaxed">
                  Are you a fleet manager, hotel owner near CSMIA, or a tourist guide? Register as an official LayoverX supplier to earn premium rates from global transit flyers.
                </p>
                <Link
                  href="/supplier-dashboard"
                  className="inline-block px-4 py-2 bg-white text-[#0284C7] font-bold text-xs rounded-xl shadow hover:bg-slate-50 transition"
                >
                  Register as Supplier
                </Link>
              </div>
            </aside>

          </div>
        </div>
      </section>

    </div>
  );
}
