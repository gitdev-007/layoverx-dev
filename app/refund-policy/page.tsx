import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cancellation & Refund Policy | LayoverX',
  description:
    'LayoverX cancellation windows, refund timelines, and flight-delay protection for transit hotel, dining, spa, tour, and transfer bookings at CSMIA T2, Mumbai.',
  alternates: { canonical: '/refund-policy' },
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
            Last updated: 22 September 2026&nbsp;·&nbsp;Applicable to all bookings made via layoverx.in
          </p>
          <p className="text-slate-500 text-xs mt-2">
            This policy is issued in compliance with the{' '}
            <strong className="text-slate-400">Consumer Protection Act, 2019</strong> and the{' '}
            <strong className="text-slate-400">Consumer Protection (E-Commerce) Rules, 2020</strong>.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-4">
        <div className="max-w-3xl mx-auto space-y-10 text-sm leading-relaxed">

          {/* 1. Cancellation & Refund Table */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white">1. Standard Cancellation Windows &amp; Refund Schedule</h2>
            <p>
              LayoverX offers flexible cancellation with the following refund structure, based on time remaining
              before your booked slot start time. All cancellations must be initiated via your LayoverX account
              or by contacting support before the slot start time.
            </p>

            <div className="overflow-x-auto rounded-xl border border-slate-700">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-800 text-slate-200">
                    <th className="text-left px-5 py-3 font-bold">Cancellation Window</th>
                    <th className="text-left px-5 py-3 font-bold">Refund</th>
                    <th className="text-left px-5 py-3 font-bold">Processing Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  <tr className="bg-emerald-950/30">
                    <td className="px-5 py-3">
                      <span className="text-emerald-400 font-bold">4+ hours</span> before slot start
                    </td>
                    <td className="px-5 py-3 text-emerald-400 font-bold">100% Full Refund</td>
                    <td className="px-5 py-3 text-slate-400">5–7 working days</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3">
                      <span className="text-amber-400 font-bold">2–4 hours</span> before slot start
                    </td>
                    <td className="px-5 py-3 text-amber-400 font-bold">75% Refund</td>
                    <td className="px-5 py-3 text-slate-400">5–7 working days</td>
                  </tr>
                  <tr className="bg-orange-950/20">
                    <td className="px-5 py-3">
                      <span className="text-orange-400 font-bold">Within 2 hours</span> of slot start
                    </td>
                    <td className="px-5 py-3 text-orange-400 font-bold">50% Refund</td>
                    <td className="px-5 py-3 text-slate-400">5–7 working days</td>
                  </tr>
                  <tr className="bg-red-950/20">
                    <td className="px-5 py-3">
                      <span className="text-red-400 font-bold">After slot start time</span> or no-show
                    </td>
                    <td className="px-5 py-3 text-red-400 font-bold">Non-Refundable</td>
                    <td className="px-5 py-3 text-slate-400">—</td>
                  </tr>
                  <tr className="bg-sky-950/30">
                    <td className="px-5 py-3">
                      <span className="text-sky-400 font-bold">Flight cancelled or delayed 3+ hours</span>{' '}
                      (airline fault)
                    </td>
                    <td className="px-5 py-3 text-sky-400 font-bold">100% Full Refund</td>
                    <td className="px-5 py-3 text-slate-400">5–7 working days</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-slate-500 text-xs">
              * Processing time is from the date of refund approval. Actual credit to your account depends on
              your issuing bank&apos;s settlement cycle, which is outside LayoverX&apos;s control.
            </p>
          </div>

          {/* 2. Flight Delay Protection */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white">2. Flight Delay &amp; Cancellation Protection</h2>
            <p>
              If your inbound or outbound flight is <strong className="text-white">cancelled by the airline</strong>{' '}
              or delayed by <strong className="text-white">3 hours or more</strong>, LayoverX provides a{' '}
              <strong className="text-white">100% full refund</strong> of your booking amount, regardless of how
              close to the slot start time the disruption occurs.
            </p>
            <p>
              This protection is automatically triggered by our Flight Delay Auto-Protection Engine via real-time
              AeroAPI / AirLabs tracking. If automatic detection is not possible, you may request a manual review
              by contacting{' '}
              <a href="mailto:support@layoverx.in" className="text-sky-400 hover:underline">
                support@layoverx.in
              </a>{' '}
              with the following supporting documents:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-slate-400">
              <li>Airline cancellation or delay notification email/SMS</li>
              <li>Screenshot from the airline&apos;s official flight status page or CSMIA departure board</li>
              <li>Your LayoverX booking ID</li>
            </ul>
            <p>
              Manual review requests must be submitted within{' '}
              <strong className="text-white">24 hours</strong> of the disruption event.
            </p>
          </div>

          {/* 3. Immigration & Visa Disclaimer */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white">3. Immigration &amp; Visa Non-Clearance</h2>
            <div className="bg-rose-950/30 border border-rose-800/50 p-5 rounded-xl space-y-3">
              <h3 className="font-bold text-rose-300 text-base">Landside Services — Visa Disclaimer</h3>
              <p className="text-slate-300 leading-relaxed">
                Landside service bookings (including airport transfers to the city, external hotel pods, guided
                city tours, and restaurants outside the airport perimeter) require valid Indian immigration entry
                clearance — Tourist Visa, e-Visa, Transit Visa (TV), or Overseas Citizen of India (OCI) Card.
              </p>
              <p className="text-slate-300 leading-relaxed">
                If a passenger is denied entry through CSMIA T2 Immigration due to missing or invalid visa
                documentation, <strong className="text-white">Landside bookings are strictly non-refundable</strong>{' '}
                once the booked slot start time has passed. Passengers remain eligible to cancel Landside bookings
                and switch to Airside alternatives (transit lounges, airside pods) prior to their slot start time.
              </p>
              <p className="text-xs text-slate-500">
                Verify entry eligibility before travel at{' '}
                <a
                  href="https://indianvisaonline.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 underline"
                >
                  indianvisaonline.gov.in
                </a>
                .
              </p>
            </div>
          </div>

          {/* 4. Service-Specific Cancellation Rules */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white">4. Service-Specific Rules</h2>
            <div className="space-y-3">
              {[
                {
                  service: 'Hotel / Transit Pods',
                  rule: 'Standard cancellation windows apply. Early checkout is non-refundable for the unused portion of the stay unless due to airline disruption.',
                },
                {
                  service: 'Restaurants &amp; Dining',
                  rule: 'Group bookings of 6 or more guests require cancellation at least 4 hours in advance for a full refund. Cancellations within 2 hours for group bookings are non-refundable.',
                },
                {
                  service: 'Spa &amp; Wellness',
                  rule: 'Individual sessions follow the standard schedule. Package bookings of 3+ treatments require 4-hour advance cancellation for full eligibility.',
                },
                {
                  service: 'Airport Transfers',
                  rule: 'Cancellation must be made at least 1 hour before the scheduled pickup time for a full refund. No-show or cancellations post-dispatch are non-refundable.',
                },
                {
                  service: 'Guided Tours &amp; Experiences',
                  rule: 'Tours that have departed or begun are non-refundable. If LayoverX or the tour operator cancels due to operational reasons, a 100% refund is issued.',
                },
                {
                  service: 'Gaming &amp; Entertainment',
                  rule: 'Time-based sessions: standard policy applies. Unused time is non-refundable once a session has commenced.',
                },
              ].map((item) => (
                <div key={item.service} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                  <p
                    className="font-semibold text-slate-200 mb-1"
                    dangerouslySetInnerHTML={{ __html: item.service }}
                  />
                  <p className="text-slate-400 text-xs">{item.rule}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Refund Method */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white">5. Refund Method &amp; Timeline</h2>
            <div className="bg-sky-950/40 border border-sky-800/50 rounded-xl p-5 space-y-2">
              <p className="text-sky-300 font-bold text-base">⏱ Refunds credited within 5–7 working days</p>
              <p className="text-slate-400">
                All approved refunds are processed back to the{' '}
                <strong className="text-slate-200">original payment method</strong> used at the time of booking
                — credit/debit card, UPI, or net banking. Razorpay initiates the refund within{' '}
                <strong className="text-white">24 hours</strong> of approval. The subsequent 5–7 working day
                timeline is governed by your issuing bank and is outside LayoverX&apos;s control.
              </p>
            </div>
            <p>
              Refunds are <strong className="text-white">not issued as LayoverX credits or vouchers</strong> unless
              explicitly requested by the customer. Cash refunds to the original payment method are the default.
            </p>
          </div>

          {/* 6. How to Cancel */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white">6. How to Cancel a Booking</h2>
            <p>You can cancel through any of the following channels:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-400">
              <li>
                <strong className="text-slate-200">Self-Service:</strong> Go to{' '}
                <Link href="/my-itinerary" className="text-sky-400 hover:underline">
                  My Itinerary
                </Link>{' '}
                → select the booking → click &ldquo;Cancel Booking.&rdquo; Refund eligibility is computed
                automatically based on your slot start time.
              </li>
              <li>
                <strong className="text-slate-200">Email:</strong> Send your cancellation request to{' '}
                <a href="mailto:support@layoverx.in" className="text-sky-400 hover:underline">
                  support@layoverx.in
                </a>{' '}
                with your booking ID and reason. Response within 2 hours during operational hours (06:00–23:00
                IST).
              </li>
              <li>
                <strong className="text-slate-200">WhatsApp:</strong> Send your booking ID to our support number
                shared in your booking confirmation. Fastest channel during airport hours.
              </li>
            </ul>
          </div>

          {/* 7. Disputes */}
          <div className="space-y-3 pb-4">
            <h2 className="text-lg font-bold text-white">7. Disputes &amp; Grievance Redressal</h2>
            <p>
              If you disagree with a refund decision or experience any issue with a booking, you may escalate to
              our Nodal Grievance Officer:
            </p>
            <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-5 space-y-1">
              <p className="text-slate-200 font-semibold">Nodal Grievance Officer — LayoverX</p>
              <p>
                Email:{' '}
                <a href="mailto:grievance@layoverx.in" className="text-sky-400 hover:underline font-semibold">
                  grievance@layoverx.in
                </a>
              </p>
              <p className="text-slate-500 text-xs mt-2">
                All disputes are acknowledged within 48 hours and resolved within{' '}
                <strong className="text-slate-400">15 working days</strong> in accordance with the Consumer
                Protection Act, 2019.
              </p>
            </div>
            <p>
              If not resolved to your satisfaction, you may approach the National Consumer Helpline at{' '}
              <strong className="text-white">1800-11-4000</strong> or file a complaint via the{' '}
              <a
                href="https://consumerhelpline.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:underline"
              >
                National Consumer Helpline portal
              </a>
              .
            </p>
          </div>

          {/* Related */}
          <div className="border-t border-slate-700 pt-8 pb-4 space-y-2">
            <p className="text-slate-400 text-xs">Related legal documents:</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/terms"
                className="text-xs bg-slate-800 hover:bg-slate-700 border border-slate-600 text-sky-400 px-4 py-2 rounded-lg transition-colors"
              >
                Terms &amp; Conditions →
              </Link>
              <Link
                href="/privacy"
                className="text-xs bg-slate-800 hover:bg-slate-700 border border-slate-600 text-sky-400 px-4 py-2 rounded-lg transition-colors"
              >
                Privacy Policy →
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
