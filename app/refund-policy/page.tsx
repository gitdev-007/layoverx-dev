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
  AlertTriangle,
  FileText,
  Building2,
  Phone,
  Mail,
  Info,
  MapPin,
  Scale,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cancellation & Refund Policy | LayoverX — Transit Bookings',
  description:
    'Official LayoverX cancellation windows, refund schedules, provider-specific terms, and bank reversal procedures for bookings at Mumbai CSMIA T2.',
  alternates: { canonical: '/refund-policy' },
};

const Placeholder: React.FC<{ text: string }> = ({ text }) => (
  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-300 font-mono text-xs font-bold tracking-tight">
    {text}
  </span>
);

const sections = [
  { id: 'scope-and-introduction', title: '1. Scope & Introduction' },
  { id: 'booking-specific-terms', title: '2. Booking-Specific Cancellation Terms' },
  { id: 'standard-schedule', title: '3. Standard Cancellation Schedule' },
  { id: 'service-rules', title: '4. Category-Specific Cancellation Rules' },
  { id: 'flight-disruptions', title: '5. Flight Delays & Airline Cancellations' },
  { id: 'immigration-and-layover', title: '6. Immigration, Visas & Layover Shortage' },
  { id: 'provider-and-force-majeure', title: '7. Provider Cancellation & Force Majeure' },
  { id: 'how-to-cancel', title: '8. How to Request a Cancellation' },
  { id: 'refund-processing', title: '9. Refund Processing & Bank Timelines' },
  { id: 'failed-and-duplicate', title: '10. Failed & Duplicate Payments' },
  { id: 'no-show-and-partial', title: '11. No-Show & Partial Cancellations' },
  { id: 'taxes-and-consumer-rights', title: '12. Taxes, Fees & Consumer Rights' },
  { id: 'grievance-and-updates', title: '13. Grievance Redressal & Policy Updates' },
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
              💳 TRANSPARENT REFUND PROTOCOL
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Cancellation &amp; Refund Policy
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Clear cancellation timeframes, provider-specific terms, flight delay procedures, and direct payment source reversal guidelines for CSMIA T2 transit bookings.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-sky-400" /> Last Updated: 25 September 2026
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Consumer Protection (E-Commerce) Rules, 2020
              </span>
              <span className="flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-sky-400" /> Direct Source Reversals
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
              2. Privacy Policy
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
                Refund Navigation (13 Sections)
              </h2>
              <nav className="space-y-1 text-xs max-h-[calc(100vh-280px)] overflow-y-auto no-scrollbar pr-1">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block p-1.5 rounded-lg text-slate-600 hover:text-[#0369a1] hover:bg-sky-50 font-medium transition truncate"
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>

            {/* Direct Source Refund Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-sky-400" />
                <h3 className="font-bold text-sm">Direct Payment Reversal</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Approved refunds are credited directly back to your original source (UPI, Credit/Debit Card, Net Banking). LayoverX does not enforce mandatory store credits or locked vouchers.
              </p>
              <div className="pt-2 text-[11px] text-slate-400 space-y-1 border-t border-slate-800">
                <div>• Refund Desk: <Placeholder text="[REFUND EMAIL]" /></div>
                <div>• Support Line: <Placeholder text="[SUPPORT PHONE]" /></div>
                <div>• Grievance Desk: <Placeholder text="[GRIEVANCE EMAIL]" /></div>
              </div>
            </div>
          </aside>

          {/* MAIN DOCUMENT CARD */}
          <main className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-10 text-sm leading-relaxed text-slate-700">
            
            {/* 1. Scope & Introduction */}
            <div id="scope-and-introduction" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                1. Scope &amp; Introduction
              </h2>
              <p>
                This Cancellation &amp; Refund Policy (&ldquo;Policy&rdquo;) governs all bookings, reservations, and transit services purchased through the LayoverX platform (
                <a href="https://www.layoverx.in/" className="text-[#0369a1] font-semibold hover:underline">
                  https://www.layoverx.in/
                </a>
                ), operated by <Placeholder text="[LEGAL ENTITY NAME]" /> (&ldquo;LayoverX,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), having its registered office at{' '}
                <Placeholder text="[REGISTERED ADDRESS]" />.
              </p>
              <p>
                As a transit-concierge and technology booking aggregator serving travelers passing through <strong className="text-slate-900">Chhatrapati Shivaji Maharaj International Airport, Terminal 2 (CSMIA T2), Mumbai</strong>, LayoverX connects passengers with independent third-party operators (such as transit hotels, dining venues, wellness spas, chauffeur fleets, and guided city tours).
              </p>
              <div className="bg-sky-50 border border-sky-200/80 rounded-2xl p-4 text-sky-950 text-xs sm:text-sm space-y-1.5">
                <p className="font-bold text-[#0369a1] flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-[#0369a1]" /> Determinants of Cancellation Eligibility:
                </p>
                <p>
                  Cancellation eligibility and refund amounts are governed by:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-700">
                  <li>The specific category of service booked (e.g., hotel pod, chauffeur ride, spa therapy, or dining table).</li>
                  <li>The operational terms and cancellation cutoffs of the independent service partner.</li>
                  <li>The exact timestamp at which your cancellation request is received relative to the scheduled slot start time.</li>
                  <li>Booking-specific conditions explicitly disclosed on the service page, checkout screen, or confirmation voucher.</li>
                  <li>Applicable Indian statutory consumer protection and contract laws.</li>
                </ul>
              </div>
            </div>

            {/* 2. Booking-Specific Terms */}
            <div id="booking-specific-terms" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                2. Booking-Specific Cancellation Terms
              </h2>
              <p>
                Because LayoverX aggregates diverse travel services from multiple independent operators, cancellation windows and penalty terms may vary between individual venues and service categories.
              </p>
              <p>
                <strong className="text-slate-900">Precedence of Disclosed Terms:</strong> The specific cancellation terms, cutoff hours, and non-refundable flags displayed on:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-slate-600 text-xs sm:text-sm">
                <li>The individual service catalog description card prior to adding to itinerary;</li>
                <li>The final checkout summary screen before payment authorization; and</li>
                <li>The issued booking confirmation email and electronic voucher;</li>
              </ul>
              <p>
                form an integral, binding part of your agreement with LayoverX. Where a service-specific policy explicitly differs from the general schedule set out in Section 3, the service-specific rule shown before purchase shall prevail, subject to applicable Indian law.
              </p>
            </div>

            {/* 3. Standard Cancellation Schedule */}
            <div id="standard-schedule" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                3. Standard Cancellation Schedule
              </h2>
              <p>
                Unless an alternate cancellation timeframe is explicitly specified for a particular premium experience or non-cancellable promotional rate, the following standard schedule applies to verified bookings:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100/80 text-slate-800 border-b border-slate-200">
                      <th className="text-left px-5 py-3.5 font-bold">Cancellation Notice Period</th>
                      <th className="text-left px-5 py-3.5 font-bold">Refund Eligibility</th>
                      <th className="text-left px-5 py-3.5 font-bold">Applicable Deduction</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="bg-emerald-50/50 hover:bg-emerald-50 transition">
                      <td className="px-5 py-3.5">
                        <span className="font-bold text-emerald-800 block">4+ Hours Prior</span>
                        <span className="text-[11px] text-slate-500">To scheduled service slot start time</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-200">
                          100% Full Refund
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-600 font-medium">0% Cancellation Fee</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60 transition">
                      <td className="px-5 py-3.5">
                        <span className="font-bold text-amber-800 block">2 – 4 Hours Prior</span>
                        <span className="text-[11px] text-slate-500">To scheduled service slot start time</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-800 border border-amber-200">
                          75% Partial Refund
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-600 font-medium">25% Partner Retention Fee</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60 transition">
                      <td className="px-5 py-3.5">
                        <span className="font-bold text-orange-800 block">Less Than 2 Hours Prior</span>
                        <span className="text-[11px] text-slate-500">To scheduled service slot start time</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-black bg-orange-100 text-orange-800 border border-orange-200">
                          50% Partial Refund
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-600 font-medium">50% Operational Holding Fee</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60 transition">
                      <td className="px-5 py-3.5">
                        <span className="font-bold text-rose-800 block">After Service Begins / No-Show</span>
                        <span className="text-[11px] text-slate-500">Scheduled slot elapsed or non-attendance</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-black bg-rose-100 text-rose-800 border border-rose-200">
                          Non-Refundable (0%)
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-600 font-medium">100% Forfeiture</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-slate-500">
                Notice periods are calculated strictly against the scheduled slot start time recorded on your official LayoverX booking confirmation.
              </p>
            </div>

            {/* 4. Category-Specific Rules */}
            <div id="service-rules" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                4. Category-Specific Cancellation Rules
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2">
                  <strong className="text-slate-900 text-sm block font-bold text-[#0369a1]">Transit Hotels &amp; Sleeping Pods</strong>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Subject to provider-specific booking windows. Cancellations submitted 4+ hours prior qualify for a full refund under the standard schedule. Once checked in, early check-out or unused hours from the reserved block are non-refundable. Failure to check in within the hotel grace window constitutes a no-show.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2">
                  <strong className="text-slate-900 text-sm block font-bold text-[#0369a1]">Restaurants &amp; Dining Reservations</strong>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Table reservations and executive buffets cancelled 4+ hours prior receive a 100% refund. Cancellations within 2 hours or failure to arrive within 20 minutes of reserved dining time incur partner reservation retention fees, as culinary preparations and seating are committed.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2">
                  <strong className="text-slate-900 text-sm block font-bold text-[#0369a1]">Spa &amp; Wellness Treatments</strong>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Because therapy suites and certified massage therapists are allocated exclusively per reservation, full refunds require at least 4 hours advance notice. Cancellations made less than 2 hours prior or failure to attend receive 50% or 0% respectively.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2">
                  <strong className="text-slate-900 text-sm block font-bold text-[#0369a1]">Airport Transfers &amp; Chauffeurs</strong>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Private airport transfers may be cancelled up to 2 hours before scheduled pickup time for a full refund. Cancellations made after a chauffeur has been dispatched to CSMIA arrivals or passenger failure to board within 45 minutes of scheduled pickup are non-refundable.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2">
                  <strong className="text-slate-900 text-sm block font-bold text-[#0369a1]">Guided City Tours &amp; Excursions</strong>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    City tours require advance coordination of private vehicles and licensed guides. Full refunds apply when cancelled 4+ hours prior. Once a tour vehicle departs CSMIA, unused portions are non-refundable. If extreme weather or municipal road closures force cancellation by the operator, a full refund is issued.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2">
                  <strong className="text-slate-900 text-sm block font-bold text-[#0369a1]">Gaming &amp; Executive Workspaces</strong>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Reserved gaming stations and quiet work pods follow the standard cancellation schedule. Once a reserved station time has commenced, session pauses or unused minutes are non-refundable.
                  </p>
                </div>
              </div>
            </div>

            {/* 5. Flight Disruptions */}
            <div id="flight-disruptions" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                5. Flight Delays &amp; Airline Cancellations
              </h2>
              <p>
                LayoverX recognizes that commercial aviation schedules are subject to air traffic control holds, weather diversions, and airline operational delays beyond passenger control.
              </p>
              
              <div className="bg-sky-50 border border-sky-200/80 rounded-2xl p-5 space-y-3 text-xs sm:text-sm text-sky-950">
                <p className="font-bold text-[#0369a1] flex items-center gap-1.5">
                  <Plane className="w-4 h-4 text-[#0369a1]" /> Flight Delay Protection Conditions:
                </p>
                <p>
                  Where a booking expressly includes <strong className="font-semibold text-slate-900">Flight Disruption Protection</strong>, the specific eligibility conditions, qualifying delay thresholds, and verification steps displayed at checkout or in the booking confirmation will apply.
                </p>
                <p className="text-slate-700 text-xs leading-relaxed">
                  In all cases of airline delays or cancellations:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-700 text-xs">
                  <li><strong className="text-slate-900">Immediate Notice:</strong> You must inform LayoverX concierge support as soon as your operating carrier announces a flight schedule change or cancellation.</li>
                  <li><strong className="text-slate-900">Verification Requirement:</strong> You must provide written proof of the disruption, such as an official airline SMS alert, email rescheduling notice, or boarding pass re-endorsement.</li>
                  <li><strong className="text-slate-900">Concierge Coordination:</strong> Our on-ground support desk will immediately contact the relevant third-party partners to reschedule your booking slot or seek partner-level fee waivers.</li>
                  <li><strong className="text-slate-900">Airline Cancellation:</strong> If your connecting flight is cancelled entirely by the carrier before arrival at CSMIA T2, LayoverX will work with vendors to secure a maximum available refund or credit note for unutilized services.</li>
                </ul>
              </div>
            </div>

            {/* 6. Immigration & Layover Shortage */}
            <div id="immigration-and-layover" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                6. Immigration, Visas &amp; Layover Shortage
              </h2>
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs text-slate-600">
                  <strong className="text-slate-900 text-sm block font-bold">Immigration &amp; Visa Non-Clearance:</strong>
                  <p>
                    Passengers are exclusively responsible for holding valid passports, entry visas (e-Tourist, Transit Visa, or OCI), and legal authorizations to cross Indian border control for landside services outside the sterile transit area.
                  </p>
                  <p>
                    If an international passenger is denied entry into India by the Bureau of Immigration at CSMIA T2, LayoverX cannot be held responsible for the inability to access landside hotels, tours, or transfers. Refund eligibility for unused landside bookings will strictly follow the standard cancellation schedule based on the timestamp when notice is provided.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs text-slate-600">
                  <strong className="text-slate-900 text-sm block font-bold">Layover Duration Becomes Insufficient:</strong>
                  <p>
                    If your available transit window becomes compressed due to minor flight delays, passenger re-ticketing, or inaccurate flight parameters entered during itinerary creation, LayoverX concierge will attempt to adjust your schedule or substitute unutilized items where feasible. However, LayoverX does not provide automatic refunds for bookings that cannot be utilized solely due to insufficient transit time.
                  </p>
                </div>
              </div>
            </div>

            {/* 7. Provider Cancellation & Force Majeure */}
            <div id="provider-and-force-majeure" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                7. Provider Cancellation &amp; Force Majeure
              </h2>
              <p>
                In the rare event that an independent partner venue cancels a confirmed service (for example, due to facility maintenance, private government buyout, or kitchen closure):
              </p>
              <ul className="list-disc pl-6 space-y-1 text-slate-600 text-xs sm:text-sm">
                <li>LayoverX will promptly notify the passenger via email or WhatsApp.</li>
                <li>We will offer a comparable alternative service or reschedule the session to a mutually agreeable time.</li>
                <li>If no alternative is acceptable to the passenger, LayoverX will issue an immediate <strong className="text-slate-900 font-bold">100% full refund</strong> for the affected service.</li>
              </ul>
              
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs text-slate-600 mt-2">
                <strong className="text-slate-900 text-sm block font-bold">Force Majeure Disruptions:</strong>
                <p>
                  Neither LayoverX nor its service partners shall be liable for cancellations arising from events beyond reasonable control, including airport closures, runway maintenance, CISF security lockdowns, governmental travel restrictions, severe weather, flooding, earthquakes, civil unrest, or major telecommunication outages.
                </p>
                <p>
                  In verified Force Majeure circumstances, LayoverX will actively liaise with vendors to secure partner fee waivers, rescheduling credits, or refunds for impacted passengers where commercially feasible.
                </p>
              </div>
            </div>

            {/* 8. How to Cancel */}
            <div id="how-to-cancel" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                8. How to Request a Cancellation
              </h2>
              <p>
                To ensure proper timestamp recording and timely vendor notification, cancellation requests must be submitted through our official concierge channels:
              </p>
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#0369a1] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 text-xs sm:text-sm block font-bold">Email Cancellation Desk:</strong>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Send an email to <Placeholder text="[REFUND EMAIL]" /> or <Placeholder text="[SUPPORT EMAIL]" /> with the subject line: &ldquo;Cancellation Request – [Your Booking ID]&rdquo;.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <Phone className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 text-xs sm:text-sm block font-bold">Airport Concierge Phone / WhatsApp:</strong>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Contact our on-ground concierge support at <Placeholder text="[SUPPORT PHONE]" /> for urgent cancellation assistance while transiting CSMIA T2.
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-500">
                Please provide your unique LayoverX Booking ID, primary passenger name, booked service name, and reason for cancellation to ensure fast processing.
              </p>
            </div>

            {/* 9. Refund Processing */}
            <div id="refund-processing" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                9. Refund Processing &amp; Bank Timelines
              </h2>
              <div className="bg-sky-50 border border-sky-200 rounded-2xl p-5 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0369a1] block">Direct Bank &amp; Source Reversal</span>
                <p className="text-sm font-bold text-slate-900">Processing Protocols:</p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-slate-700 leading-relaxed">
                  <li>All approved refunds are processed exclusively back to the original source payment instrument (credit card, debit card, UPI handle, or net banking account) through our authorized payment gateway (Razorpay).</li>
                  <li>LayoverX initiates approved refund instructions within <strong className="font-semibold text-slate-900">24 to 48 business hours</strong> following cancellation verification.</li>
                  <li>The actual reflection of credit in your bank or card account typically takes <strong className="font-semibold text-slate-900">5 to 7 working days</strong>, depending on your card-issuing bank or payment intermediary&rsquo;s settlement cycle.</li>
                </ul>
              </div>
              <p className="text-xs text-slate-600">
                LayoverX does not charge hidden refund processing fees. The net refundable amount calculated under Section 3 will be transmitted directly to your original payment method.
              </p>
            </div>

            {/* 10. Failed & Duplicate Payments */}
            <div id="failed-and-duplicate" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                10. Failed &amp; Duplicate Payments
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs text-slate-600">
                  <strong className="text-slate-900 text-sm block font-bold">Payment Debited but Booking Failed:</strong>
                  <p>
                    If funds are debited from your bank or card but a booking confirmation is not generated due to internet disruption or gateway timeout, please email <Placeholder text="[SUPPORT EMAIL]" /> with your bank transaction reference or UPI UTR number.
                  </p>
                  <p>
                    Upon reconciliation, if the payment was captured, we will either manually issue your booking confirmation or initiate an automatic full reversal within 24 hours.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs text-slate-600">
                  <strong className="text-slate-900 text-sm block font-bold">Duplicate Charges:</strong>
                  <p>
                    If your payment instrument is charged multiple times for the same transaction due to a double-click or gateway glitch, contact support with proof of both charges.
                  </p>
                  <p>
                    Confirmed duplicate charges are flagged for immediate 100% reversal back to your original payment instrument with zero cancellation deductions.
                  </p>
                </div>
              </div>
            </div>

            {/* 11. No-Show & Partial Cancellations */}
            <div id="no-show-and-partial" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                11. No-Show &amp; Partial Cancellations
              </h2>
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-xs text-slate-600">
                  <strong className="text-slate-900 text-sm block font-bold">No-Show Policy:</strong>
                  <p>
                    A &ldquo;No-Show&rdquo; occurs when a passenger fails to arrive at the designated service venue (hotel pod, spa, dining table, or chauffeur meeting point) within the venue&rsquo;s specified grace period without prior written or telephonic notice to LayoverX.
                  </p>
                  <p>
                    Because service partners commit rooms, staff, vehicles, and tables exclusively for your reservation, <strong className="font-semibold text-slate-900">no-show reservations are 100% non-refundable</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-xs text-slate-600">
                  <strong className="text-slate-900 text-sm block font-bold">Partial Cancellation of Bundled Itineraries:</strong>
                  <p>
                    If you book a multi-service layover bundle (e.g., Transit Hotel + Airport Transfer + Dining), you may cancel individual components independently. Each service component will be assessed against its own cancellation window and partner policy, and eligible refunds will be issued without voiding the remaining confirmed bookings in your itinerary.
                  </p>
                </div>
              </div>
            </div>

            {/* 12. Taxes, Fees & Consumer Rights */}
            <div id="taxes-and-consumer-rights" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                12. Taxes, Platform Fees &amp; Consumer Rights
              </h2>
              <div className="space-y-3">
                <p>
                  <strong className="text-slate-900">Tax &amp; Convenience Fee Treatment:</strong> Where a booking is eligible for a full or partial refund, the corresponding statutory Goods and Services Tax (GST) charged on the refundable portion will be reversed in compliance with Indian GST regulations. Platform convenience fees associated with processed and completed gateway authorizations may be retained where operational expenses were incurred.
                </p>
                <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200/80 space-y-1 text-xs sm:text-sm text-sky-950">
                  <strong className="text-[#0369a1] block font-bold">Preservation of Mandatory Consumer Rights:</strong>
                  <p className="text-xs text-slate-700">
                    Nothing in this Cancellation &amp; Refund Policy is intended to limit, exclude, or restrict any mandatory statutory consumer rights, remedies, or protections available to you under the Consumer Protection Act, 2019 or the Consumer Protection (E-Commerce) Rules, 2020.
                  </p>
                </div>
              </div>
            </div>

            {/* 13. Grievance Redressal & Updates */}
            <div id="grievance-and-updates" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                13. Grievance Redressal &amp; Policy Updates
              </h2>
              <p>
                In compliance with the Consumer Protection (E-Commerce) Rules, 2020, LayoverX provides a dedicated Nodal Grievance Officer to resolve any disputed refund or cancellation matter:
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#0369a1]" />
                  <h3 className="font-bold text-slate-900 text-sm">Nodal Grievance Officer Details</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                  <div>
                    <span className="text-slate-500 block font-medium">Nodal Grievance Officer:</span>
                    <Placeholder text="[GRIEVANCE OFFICER]" />
                  </div>
                  <div>
                    <span className="text-slate-500 block font-medium">Designated Entity:</span>
                    <Placeholder text="[LEGAL ENTITY NAME]" />
                  </div>
                  <div>
                    <span className="text-slate-500 block font-medium">Grievance Email:</span>
                    <Placeholder text="[GRIEVANCE EMAIL]" />
                  </div>
                  <div>
                    <span className="text-slate-500 block font-medium">Refund Desk Email:</span>
                    <Placeholder text="[REFUND EMAIL]" />
                  </div>
                  <div>
                    <span className="text-slate-500 block font-medium">General Support Email:</span>
                    <Placeholder text="[SUPPORT EMAIL]" />
                  </div>
                  <div>
                    <span className="text-slate-500 block font-medium">Support Phone:</span>
                    <Placeholder text="[SUPPORT PHONE]" />
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate-500 block font-medium">Registered Office:</span>
                    <Placeholder text="[REGISTERED ADDRESS]" />
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200/80 text-xs text-sky-950 space-y-1">
                <p className="font-bold text-[#0369a1]">Resolution Timelines:</p>
                <p>
                  • All cancellation and refund grievances submitted in writing are formally acknowledged within <strong className="font-semibold text-slate-900">forty-eight (48) hours</strong>.
                </p>
                <p>
                  • A full investigation and final decision will be delivered within <strong className="font-semibold text-slate-900">fifteen (15) to thirty (30) days</strong> from acknowledgment.
                </p>
              </div>

              <p className="text-xs text-slate-500 pt-2">
                LayoverX reserves the right to amend this Policy periodically to reflect changes in supplier arrangements or legal standards. Revisions will be published on this page with an updated &ldquo;Last Updated&rdquo; timestamp.
              </p>
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
                  <p className="text-sm font-bold text-slate-900 group-hover:text-[#0369a1]">Privacy Policy →</p>
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
