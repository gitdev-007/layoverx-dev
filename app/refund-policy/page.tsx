import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  RefreshCw,
  ShieldCheck,
  Clock,
  AlertCircle,
  Plane,
  CheckCircle2,
  Calendar,
  CreditCard,
  MessageSquare,
  HelpCircle,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cancellation & Refund Policy | LayoverX',
  description:
    'LayoverX cancellation windows, refund timelines, and flight-delay protection for transit hotel, dining, spa, tour, and transfer bookings at CSMIA T2, Mumbai.',
  alternates: { canonical: '/refund-policy' },
};

const sections = [
  { id: 'schedule', title: '1. Cancellation Windows & Refund Schedule' },
  { id: 'flight-delay', title: '2. Flight Delay & Cancellation Protection' },
  { id: 'immigration', title: '3. Immigration & Visa Non-Clearance' },
  { id: 'services', title: '4. Service-Specific Cancellation Rules' },
  { id: 'timeline', title: '5. Refund Method & Bank Timeline' },
  { id: 'how-to-cancel', title: '6. How to Cancel a Booking' },
  { id: 'disputes', title: '7. Disputes & Grievance Redressal' },
];

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] pb-24">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white pt-24 pb-16 overflow-hidden border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <nav className="flex items-center gap-2 text-xs text-sky-300" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-slate-500">/</span>
              <span className="text-slate-400">Legal &amp; Policy</span>
              <span className="text-slate-500">/</span>
              <span className="text-white font-medium">Cancellation &amp; Refund Policy</span>
            </nav>

            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-sky-500/20 text-sky-300 border border-sky-400/30">
              💳 GUARANTEED REFUND PROTOCOL
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Cancellation &amp; Refund Policy
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Guaranteed cancellation schedules, 100% automated flight delay protection, and transparent 5–7 day original payment settlement for CSMIA T2 bookings.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-sky-400" /> Last Updated: 25 September 2026
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Consumer Protection (E-Commerce) Rules, 2020 Compliant
              </span>
              <span className="flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-sky-400" /> Razorpay Direct Reversal
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* POLICY NAVIGATION BAR */}
      <section className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar text-xs font-bold">
            <Link
              href="/terms"
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex-shrink-0 transition"
            >
              1. Terms &amp; Conditions
            </Link>
            <Link
              href="/privacy"
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex-shrink-0 transition"
            >
              2. Privacy Policy (DPDP)
            </Link>
            <Link
              href="/cookie-policy"
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex-shrink-0 transition"
            >
              3. Cookie Policy
            </Link>
            <Link
              href="/refund-policy"
              className="px-4 py-2 rounded-xl bg-[#0369a1] text-white flex-shrink-0 shadow-xs"
            >
              4. Cancellation &amp; Refund Policy
            </Link>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT SECTION */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* STICKY SIDEBAR INDEX */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-36">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-2 border-b border-slate-100">
                Refund Navigation
              </h2>
              <nav className="space-y-1.5 text-xs">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block p-2 rounded-xl text-slate-600 hover:text-[#0369a1] hover:bg-sky-50 font-medium transition"
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>

            {/* Flight Delay Guarantee Card */}
            <div className="bg-emerald-950 text-white rounded-3xl p-6 shadow-sm space-y-3 border border-emerald-900">
              <div className="flex items-center gap-2">
                <Plane className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-sm">100% Flight Delay Protection</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                If your airline cancels or delays your flight by 3+ hours, you receive a full 100% refund automatically via our real-time AeroAPI tracking engine.
              </p>
              <div className="pt-2 text-[11px] text-emerald-300 font-bold">
                ✓ Zero Cancellation Penalties on Airline Delays
              </div>
            </div>

            {/* Fast Settlement Banner */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-sm space-y-2">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Default Payment Method</h3>
              <p className="text-xs text-slate-300">
                Refunds are paid directly back to your original source (UPI, Credit/Debit Card, Net Banking). No forced store credits or vouchers.
              </p>
            </div>
          </aside>

          {/* MAIN DOCUMENT CARD */}
          <main className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-10 text-sm leading-relaxed text-slate-700">
            
            {/* 1. Standard Windows */}
            <div id="schedule" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                1. Standard Cancellation Windows &amp; Refund Schedule
              </h2>
              <p>
                LayoverX provides transparent cancellation tiers based on the time remaining before your scheduled slot
                start time. Cancellations can be triggered instantly with one click via your LayoverX itinerary dashboard.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100/80 text-slate-800 border-b border-slate-200">
                      <th className="text-left px-5 py-3.5 font-bold">Cancellation Window</th>
                      <th className="text-left px-5 py-3.5 font-bold">Refund Amount</th>
                      <th className="text-left px-5 py-3.5 font-bold">Settlement Window</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="bg-emerald-50/50 hover:bg-emerald-50 transition">
                      <td className="px-5 py-3.5">
                        <span className="font-bold text-emerald-800 block">4+ Hours Prior</span>
                        <span className="text-[11px] text-slate-500">Before booked slot start time</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-200">
                          100% Full Refund
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-600 font-medium">5–7 working days</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60 transition">
                      <td className="px-5 py-3.5">
                        <span className="font-bold text-amber-800 block">2 – 4 Hours Prior</span>
                        <span className="text-[11px] text-slate-500">Before booked slot start time</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-800 border border-amber-200">
                          75% Partial Refund
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-600 font-medium">5–7 working days</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60 transition">
                      <td className="px-5 py-3.5">
                        <span className="font-bold text-orange-800 block">Within 2 Hours</span>
                        <span className="text-[11px] text-slate-500">Before booked slot start time</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-black bg-orange-100 text-orange-800 border border-orange-200">
                          50% Partial Refund
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-600 font-medium">5–7 working days</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60 transition">
                      <td className="px-5 py-3.5">
                        <span className="font-bold text-rose-800 block">After Slot Start / No-Show</span>
                        <span className="text-[11px] text-slate-500">Service window expired</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-black bg-rose-100 text-rose-800 border border-rose-200">
                          Non-Refundable
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-400">—</td>
                    </tr>
                    <tr className="bg-sky-50/60 hover:bg-sky-50 transition border-t-2 border-sky-100">
                      <td className="px-5 py-3.5">
                        <span className="font-bold text-[#0369a1] block">Flight Delay 3+ Hours / Cancelled</span>
                        <span className="text-[11px] text-slate-500">Airline operational disruption</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-black bg-sky-100 text-[#0369a1] border border-sky-200">
                          100% Full Refund
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-600 font-medium">5–7 working days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-slate-500">
                * Processing time is calculated from the moment of cancellation approval. Exact credit date depends on your issuing bank&apos;s settlement schedule.
              </p>
            </div>

            {/* 2. Flight Delay Protection */}
            <div id="flight-delay" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                2. Flight Delay &amp; Cancellation Protection
              </h2>
              <p>
                Connecting flight delays are not the passenger&apos;s fault. If your incoming flight is delayed by{' '}
                <strong className="text-slate-900 font-bold">3 hours or more</strong>, or cancelled entirely by the carrier,
                LayoverX provides a <strong className="text-emerald-700 font-bold">100% complete refund</strong> of all booked
                services, regardless of notice time.
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2 text-xs">
                <p className="font-bold text-slate-900 text-sm">Automated Flight Tracking Trigger:</p>
                <p className="text-slate-600 leading-relaxed">
                  Our system continuously queries aviation radar APIs. When a 3+ hour delay or cancellation is logged on your flight number,
                  our auto-protection engine flags your booking. If automated detection is delayed, simply email{' '}
                  <a href="mailto:support@layoverx.in" className="text-[#0369a1] font-bold underline">
                    support@layoverx.in
                  </a>{' '}
                  within 24 hours with your airline SMS/email notice or boarding gate photo for manual refund processing.
                </p>
              </div>
            </div>

            {/* 3. Immigration Non-Clearance */}
            <div id="immigration" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                3. Immigration &amp; Visa Non-Clearance Disclaimer
              </h2>
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 space-y-3">
                <h3 className="font-bold text-rose-900 text-base flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                  Landside Bookings — Visa Prerequisite
                </h3>
                <p className="text-rose-950 text-xs sm:text-sm leading-relaxed">
                  Services outside the sterile terminal (city tours, South Mumbai restaurants, off-airport hotels, and transfers)
                  require passengers to hold valid Indian visa documentation (e-Tourist, Transit Visa, or OCI Card).
                </p>
                <p className="text-rose-950 text-xs sm:text-sm leading-relaxed">
                  If an international passenger is denied entry through CSMIA T2 Immigration due to missing or invalid visas,{' '}
                  <strong className="font-bold">Landside bookings are non-refundable once the slot start time has passed</strong>.
                  Travelers may switch to Airside transit lounge alternatives before their slot time commences.
                </p>
                <p className="text-xs text-rose-800">
                  Verify eligibility online prior to flying at{' '}
                  <a
                    href="https://indianvisaonline.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold underline"
                  >
                    indianvisaonline.gov.in
                  </a>
                  .
                </p>
              </div>
            </div>

            {/* 4. Service Specific Rules */}
            <div id="services" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                4. Service-Specific Cancellation Rules
              </h2>
              <div className="grid sm:grid-cols-2 gap-3.5">
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-1.5">
                  <strong className="text-slate-900 text-sm block font-bold">Transit Hotel Pods &amp; Rooms</strong>
                  <p className="text-xs text-slate-600">Standard tiers apply. Unused hours from premature early checkout are non-refundable unless caused by flight disruption.</p>
                </div>
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-1.5">
                  <strong className="text-slate-900 text-sm block font-bold">Airport Dining &amp; Tables</strong>
                  <p className="text-xs text-slate-600">Tables cancelled 4+ hours prior receive 100% refund. Cancellations within 2 hours incur a 50% supplier reservation fee.</p>
                </div>
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-1.5">
                  <strong className="text-slate-900 text-sm block font-bold">Spa &amp; Jetlag Recovery</strong>
                  <p className="text-xs text-slate-600">Standard schedule applies. Multi-treatment suites require at least 4 hours notice for full refund eligibility.</p>
                </div>
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-1.5">
                  <strong className="text-slate-900 text-sm block font-bold">Airport Transfers &amp; Chauffeurs</strong>
                  <p className="text-xs text-slate-600">Free cancellation up to 1 hour before scheduled pickup. Driver no-shows or post-dispatch cancellations are non-refundable.</p>
                </div>
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-1.5">
                  <strong className="text-slate-900 text-sm block font-bold">Guided City Tours</strong>
                  <p className="text-xs text-slate-600">Tours that have already departed are non-refundable. If LayoverX cancels due to extreme weather or road closures, 100% is refunded.</p>
                </div>
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-1.5">
                  <strong className="text-slate-900 text-sm block font-bold">Gaming &amp; Work Lounges</strong>
                  <p className="text-xs text-slate-600">Standard cancellation applies. Once a reserved pod time has commenced, unused time is non-refundable.</p>
                </div>
              </div>
            </div>

            {/* 5. Method & Timeline */}
            <div id="timeline" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                5. Refund Method &amp; Bank Timeline
              </h2>
              <div className="bg-sky-50 border border-sky-200 rounded-2xl p-5 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0369a1] block">Direct Bank Reversal</span>
                <p className="text-sm font-bold text-slate-900">⏱ Credited within 5–7 working days</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  All refunds are issued directly to the original payment source (credit/debit card, UPI, or net banking) via
                  Razorpay. We initiate reversal within 24 hours of cancellation approval. The 5–7 day timeline is governed by your card-issuing bank.
                </p>
              </div>
              <p className="text-xs text-slate-600">
                We do not enforce store credits or vouchers. Cash refunds to the original payment instrument are our mandatory default.
              </p>
            </div>

            {/* 6. How to Cancel */}
            <div id="how-to-cancel" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                6. How to Cancel a Booking
              </h2>
              <div className="space-y-2.5">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 text-xs sm:text-sm block font-bold">1-Click Self-Service (Fastest):</strong>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Navigate to{' '}
                      <Link href="/my-itinerary" className="text-[#0369a1] font-bold hover:underline">
                        My Itinerary
                      </Link>
                      , choose your booking card, and click &ldquo;Cancel Booking&rdquo;. Refund calculations occur instantly.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-[#0369a1] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 text-xs sm:text-sm block font-bold">Airport Concierge WhatsApp:</strong>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Send your Booking ID to our official support line for immediate on-ground assistance at CSMIA T2.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 text-xs sm:text-sm block font-bold">Email Support Desk:</strong>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Email{' '}
                      <a href="mailto:support@layoverx.in" className="text-[#0369a1] font-bold hover:underline">
                        support@layoverx.in
                      </a>{' '}
                      with your booking ID. Requests are acknowledged within 2 hours during operational windows.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 7. Disputes */}
            <div id="disputes" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                7. Disputes &amp; Grievance Redressal
              </h2>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
                <p className="font-bold text-slate-900 text-sm">Nodal Grievance Officer — LayoverX</p>
                <p className="text-xs text-slate-600">
                  Consumer dispute escalation pursuant to Consumer Protection (E-Commerce) Rules, 2020:
                </p>
                <p className="text-xs">
                  Email:{' '}
                  <a href="mailto:grievance@layoverx.in" className="text-[#0369a1] font-bold hover:underline">
                    grievance@layoverx.in
                  </a>
                </p>
                <p className="text-xs text-slate-500">
                  All grievances acknowledged within 48 hours; resolved within 15 working days. Unresolved complaints may be escalated to the National Consumer Helpline (1800-11-4000).
                </p>
              </div>
            </div>

            {/* RELATED DOCUMENTS FOOTER */}
            <div className="border-t border-slate-200 pt-8 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Related Legal &amp; Compliance Documents
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Link
                  href="/terms"
                  className="p-4 rounded-2xl bg-slate-50 hover:bg-sky-50 border border-slate-200/80 hover:border-sky-200 transition group"
                >
                  <p className="text-xs text-slate-500 font-bold">Policy 01</p>
                  <p className="text-sm font-bold text-slate-900 group-hover:text-[#0369a1]">Terms &amp; Conditions →</p>
                </Link>
                <Link
                  href="/privacy"
                  className="p-4 rounded-2xl bg-slate-50 hover:bg-sky-50 border border-slate-200/80 hover:border-sky-200 transition group"
                >
                  <p className="text-xs text-slate-500 font-bold">Policy 02</p>
                  <p className="text-sm font-bold text-slate-900 group-hover:text-[#0369a1]">Privacy Policy (DPDP) →</p>
                </Link>
                <Link
                  href="/cookie-policy"
                  className="p-4 rounded-2xl bg-slate-50 hover:bg-sky-50 border border-slate-200/80 hover:border-sky-200 transition group"
                >
                  <p className="text-xs text-slate-500 font-bold">Policy 03</p>
                  <p className="text-sm font-bold text-slate-900 group-hover:text-[#0369a1]">Cookie Policy →</p>
                </Link>
              </div>
            </div>
          </main>

        </div>
      </section>
    </div>
  );
}
