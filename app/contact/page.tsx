import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ContactForm } from '@/components/contact-form';

export const metadata: Metadata = {
  title: 'Contact Us & Grievance Office | LayoverX — CSMIA T2 Mumbai',
  description:
    'Contact LayoverX 24/7 airport support hotline (+91 022 4900-1234), email support@layoverx.com, or get in touch with our Grievance Officer at CSMIA Terminal 2 Exit Gate 2.',
  alternates: {
    canonical: 'https://layoverx-dev.vercel.app/contact',
  },
};

export default function ContactPage() {
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
                📞 24/7 SUPPORT &amp; ASSISTANCE
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                24/7 Transit Customer <br />
                <span className="bg-gradient-to-r from-sky-400 to-sky-200 bg-clip-text text-transparent">
                  Support &amp; Dispatch
                </span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                Have a question about an upcoming layover? Need urgent help with a booking? Contact our 24/7 airport dispatch office at CSMIA Terminal 2 or reach our grievance team.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                  <span className="font-semibold text-slate-200">24/7 Dispatch Hotline (+91 022 4900-1234)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                  <span className="font-semibold text-slate-200">15-Min Response Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                  <span className="font-semibold text-slate-200">WhatsApp Live Concierge</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                  <span className="font-semibold text-slate-200">Designated Grievance Officer</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80"
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
            <ContactForm />

            {/* SUPPORT INFO & BUSINESS ENQUIRIES */}
            <aside className="w-full lg:w-2/5 space-y-8">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
                <h3 className="font-bold text-slate-900 text-lg">Direct Contacts</h3>
                <ul className="space-y-4 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-3">
                    <span className="text-xl">📞</span>
                    <div>
                      <strong className="text-slate-800 block">24/7 Airport Support Hotline</strong>
                      <a href="tel:+9102249001234" className="text-[#0284C7] font-bold">+91 022 4900-1234</a>
                      <p className="text-slate-500 text-xs mt-0.5">Available 24/7 for active transit passenger coordination.</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="text-xl">💬</span>
                    <div>
                      <strong className="text-slate-800 block">WhatsApp Dispatch Chat</strong>
                      <a href="https://wa.me/9102249001234" target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-bold">+91 022 4900-1234</a>
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

              {/* Corporate Entity & Grievance Officer */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
                <h3 className="font-bold text-slate-900 text-lg">Corporate &amp; Legal</h3>
                <div className="text-xs sm:text-sm text-slate-700 space-y-3">
                  <div>
                    <strong className="text-slate-800 block">Corporate Entity Name</strong>
                    <p className="font-semibold text-slate-900">LayoverX Technologies Pvt. Ltd.</p>
                  </div>
                  <div>
                    <strong className="text-slate-800 block">Airport Hub Address</strong>
                    <p>CSMIA Terminal 2, Exit Gate 2 Arrivals,<br />Sahar, Mumbai 400099, India</p>
                  </div>
                  <div>
                    <strong className="text-slate-800 block">Registered Corporate Address</strong>
                    <p>4th Floor, WeWork BKC, Bandra Kurla Complex,<br />Mumbai 400051, Maharashtra, India</p>
                  </div>
                  <div className="pt-2 border-t border-slate-200">
                    <strong className="text-slate-800 block">Designated Grievance / Nodal Officer</strong>
                    <p className="mt-1">For legal notices, compliance, and dispute escalations:</p>
                    <a href="mailto:grievance@layoverx.com" className="text-[#0284C7] font-bold block mt-1">grievance@layoverx.com</a>
                    <p className="text-slate-500 text-xs mt-1">All grievances are acknowledged within 48 hours and resolved within 15 working days in accordance with Indian regulatory norms.</p>
                  </div>
                </div>
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
