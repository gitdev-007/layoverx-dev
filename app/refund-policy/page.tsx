import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cancellation & Refund Policy | LayoverX',
  description:
    'LayoverX cancellation windows and refund policy for transit micro-stay, dining, spa, and tour bookings at CSMIA Terminal 2, Mumbai.',
  alternates: {
    canonical: 'https://layoverx-dev.vercel.app/refund-policy',
  },
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-300 pb-24">
      {/* Header */}
      <section className="pt-28 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          <nav className="flex items-center gap-2 text-xs text-sky-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-slate-600">/</span>
            <span className="text-white font-medium">Cancellation &amp; Refund Policy</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Cancellation &amp; Refund Policy
          </h1>
          <p className="text-slate-400 text-sm mt-3">
            Last updated: 29 July 2026 &nbsp;·&nbsp; Applicable to all bookings made via layoverx.com
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-4">
        <div className="max-w-3xl mx-auto space-y-10 text-sm leading-relaxed">

          {/* Refund Schedule Table */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white">1. Cancellation Windows &amp; Refund Schedule</h2>
            <p>
              LayoverX offers flexible cancellation with the following refund structure based on the time remaining before
              your booked slot start time:
            </p>

            <div className="overflow-hidden rounded-xl border border-slate-700">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-800 text-slate-200">
                    <th className="text-left px-5 py-3 font-bold">Cancellation Window</th>
                    <th className="text-left px-5 py-3 font-bold">Refund Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  <tr className="bg-emerald-950/30">
                    <td className="px-5 py-3">
                      <span className="text-emerald-400 font-bold">2+ hours</span> before slot start time
                    </td>
                    <td className="px-5 py-3 text-emerald-400 font-bold">100% Full Refund</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3">
                      <span className="text-amber-400 font-bold">Within 2 hours</span> of slot start time
                    </td>
                    <td className="px-5 py-3 text-amber-400 font-bold">50% Refund</td>
                  </tr>
                  <tr className="bg-red-950/20">
                    <td className="px-5 py-3">
                      <span className="text-red-400 font-bold">After slot start time</span> or no-show
                    </td>
                    <td className="px-5 py-3 text-red-400 font-bold">Non-Refundable</td>
                  </tr>
                  <tr className="bg-sky-950/30">
                    <td className="px-5 py-3">
                      <span className="text-sky-400 font-bold">Airline cancellation</span> or severe delay (+3 hours)
                    </td>
                    <td className="px-5 py-3 text-sky-400 font-bold">100% Full Refund Guarantee</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Airline Cancellation */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white">2. Airline Flight Cancellation &amp; Severe Delay Protection</h2>
            <p>
              If your inbound or outbound flight is <strong className="text-white">cancelled by the airline</strong> or delayed by
              <strong className="text-white"> 3 hours or more</strong>, LayoverX guarantees a <strong className="text-white">100% full refund</strong> of
              your booking amount, regardless of how close to the slot start time the cancellation occurs.
            </p>
            <p>
              This protection is automatically triggered by our Flight Delay Auto-Protection Engine when connected to live
              AeroAPI / AirLabs tracking. If automatic detection is not possible, passengers may request a manual review
              by contacting <a href="mailto:support@layoverx.com" className="text-sky-400 hover:underline">support@layoverx.com</a> with
              proof of the airline disruption.
            </p>

            {/* Section 3.1 */}
            <div className="bg-rose-950/30 border border-rose-800/50 p-4 rounded-xl space-y-2 mt-4">
              <h3 className="font-bold text-rose-300 text-sm">Section 3.1: Immigration &amp; Visa Compliance Disclaimer</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Landside service bookings (including airport cabs, external micro-stay hotels, and guided city tours) require valid Indian Immigration clearance (Tourist Visa, e-Visa, Transit Visa, or OCI Card). If a passenger is denied entry through CSMIA T2 Immigration due to missing visa documentation, <strong className="text-white">Landside bookings are strictly non-refundable once the booked slot start time begins</strong>. Passengers remain eligible to swap to Airside pod alternatives prior to slot start time.
              </p>
            </div>
          </div>

          {/* Refund Timeline */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white">3. Refund Processing Timeline</h2>
            <div className="bg-sky-950/40 border border-sky-800/50 rounded-xl p-5 space-y-2">
              <p className="text-sky-300 font-bold text-base">
                ⏱️ Refunds are credited within 5 to 7 working days
              </p>
              <p className="text-slate-400">
                All approved refunds are processed back to the <strong className="text-slate-200">original payment source</strong> (credit card,
                debit card, UPI, or net banking) used at the time of booking. Refund processing timelines are subject to
                your bank&apos;s internal settlement cycles.
              </p>
            </div>
            <p>
              Razorpay initiates the refund within 24 hours of approval. The credit timeline of 5–7 working days is determined
              by your issuing bank or payment provider and is outside LayoverX&apos;s control.
            </p>
          </div>

          {/* How to Cancel */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white">4. How to Cancel a Booking</h2>
            <p>You can cancel your booking through any of the following channels:</p>
            <ul className="list-disc pl-6 space-y-1 text-slate-400">
              <li>
                <strong className="text-slate-200">Self-Service:</strong> Navigate to{' '}
                <Link href="/my-itinerary" className="text-sky-400 hover:underline">My Itinerary</Link> and click &ldquo;Cancel Booking.&rdquo;
              </li>
              <li>
                <strong className="text-slate-200">Email:</strong> Send cancellation request to{' '}
                <a href="mailto:support@layoverx.com" className="text-sky-400 hover:underline">support@layoverx.com</a> with your booking ID.
              </li>
              <li>
                <strong className="text-slate-200">Phone:</strong> Call our 24/7 support hotline at{' '}
                <a href="tel:+910224900234" className="text-sky-400 hover:underline font-mono">+91 022 4900-1234</a>.
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3 pb-4">
            <h2 className="text-lg font-bold text-white">5. Questions or Disputes</h2>
            <p>
              For refund-related questions or disputes, contact our Grievance Officer at{' '}
              <a href="mailto:grievance@layoverx.com" className="text-sky-400 hover:underline font-semibold">grievance@layoverx.com</a>.
              All disputes are resolved within 15 working days in accordance with applicable consumer protection laws.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
