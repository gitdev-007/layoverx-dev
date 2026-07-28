'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle2, Send, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pb-20 space-y-12 bg-slate-50">
      {/* Page Hero */}
      <section className="bg-slate-900 text-white py-12 mb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Contact & Airport Support Desk</h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Reach out to our 24/7 Mumbai Airport ground team for inquiries, booking adjustments, or partner onboarding.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Contact Info Sidebar */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 md:col-span-1">
            <h3 className="text-base font-bold text-[#0F172A] border-b border-slate-100 pb-3">Direct Support</h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#0369a1] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-[#0F172A]">CSMIA Arrivals Desk</p>
                  <p className="text-slate-500">Terminal 1 & Terminal 2 Gate Exits, Mumbai, India</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#0369a1] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-[#0F172A]">24/7 Hotline</p>
                  <a href="tel:+912212345678" className="text-[#0369a1] font-mono font-bold hover:underline">
                    +91 22 1234 5678
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#0369a1] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-[#0F172A]">Email Inquiries</p>
                  <a href="mailto:support@layoverx.com" className="text-[#0369a1] hover:underline">
                    support@layoverx.com
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                <ShieldCheck size={14} /> Official Airport Partner
              </div>
              <p>On-ground response time under 15 minutes.</p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm md:col-span-2">
            {submitted ? (
              <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-emerald-900">Message Sent Successfully!</h3>
                <p className="text-xs text-emerald-800">
                  Thank you for reaching out. Our Mumbai CSMIA airport concierge team will contact you within 15 minutes.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-slate-800 text-white font-bold text-xs rounded-xl mt-4"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-[#0F172A] mb-2">Send an Inquiry</h3>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full text-xs font-semibold rounded-xl border border-slate-200 bg-white text-slate-900 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0369a1]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Your Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full text-xs font-semibold rounded-xl border border-slate-200 bg-white text-slate-900 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0369a1]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can our Mumbai Airport team assist you?"
                    className="w-full text-xs font-semibold rounded-xl border border-slate-200 bg-white text-slate-900 p-3 focus:outline-none focus:ring-2 focus:ring-[#0369a1]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#0369a1] hover:bg-[#075985] text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-sm"
                >
                  Send Message <Send size={14} />
                </button>
              </form>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
