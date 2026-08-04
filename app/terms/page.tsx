import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms & Conditions | LayoverX — CSMIA T2 Transit Services',
  description:
    'Read the complete terms of service for LayoverX transit micro-stay pods, dining, spa, chauffeur, and city tour bookings at Mumbai CSMIA Terminal 2.',
  alternates: {
    canonical: 'https://layoverx-dev.vercel.app/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-300 pb-24">
      {/* Header */}
      <section className="pt-28 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          <nav className="flex items-center gap-2 text-xs text-sky-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-slate-600">/</span>
            <span className="text-white font-medium">Terms &amp; Conditions</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Terms &amp; Conditions
          </h1>
          <p className="text-slate-400 text-sm mt-3">
            Last updated: 29 July 2026 &nbsp;·&nbsp; Effective for all bookings made via layoverx.com
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-4">
        <div className="max-w-3xl mx-auto space-y-10 text-sm leading-relaxed">

          {/* 1. Platform Services */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white">1. Platform Services &amp; Third-Party Vendor Facilitation</h2>
            <p>
              LayoverX Technologies Pvt. Ltd. (&ldquo;LayoverX,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) operates an online marketplace
              connecting international transit passengers arriving at or departing from Chhatrapati Shivaji Maharaj International Airport,
              Terminal 2 (CSMIA T2), Mumbai, India, with verified third-party service providers including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-slate-400">
              <li>Micro-stay hotel pods and transit lounges</li>
              <li>Restaurant and culinary trail experiences</li>
              <li>Spa, wellness, and rejuvenation services</li>
              <li>Private chauffeur and fixed-rate airport cab transfers</li>
              <li>Guided city sightseeing and cultural tours</li>
              <li>Gaming, entertainment, and co-working lounges</li>
            </ul>
            <p>
              LayoverX acts solely as a technology facilitator and booking aggregator. All services are rendered by independent
              third-party vendors. LayoverX does not own, operate, or directly provide any hospitality, transport, or tourism services listed on the platform.
            </p>
          </div>

          {/* 2. Flight Connections */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white">2. Flight Connections &amp; Passenger Responsibility</h2>
            <p>
              While LayoverX provides real-time flight tracking via AeroAPI / AirLabs integration and automatically adjusts
              booked service windows in the event of flight delays, <strong className="text-white">it is the sole responsibility of the passenger</strong> to ensure
              they return to the airport terminal in sufficient time for immigration clearance, security screening, and onward boarding.
            </p>
            <p>
              LayoverX&apos;s Slot Window Shift Engine provides delay protection as a convenience feature only. We are not liable
              for missed flights, immigration delays, or circumstances beyond our control including but not limited to weather
              disruptions, airline schedule changes, or government restrictions.
            </p>
          </div>

          {/* 3. Immigration & Visa */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white">3. Immigration &amp; Indian Visa Compliance</h2>
            <p>
              Certain LayoverX services require passengers to exit the international transit zone and enter Indian territory (landside).
              Passengers are solely responsible for holding a valid Indian visa, Transit Visa (TV), or e-Visa
              as required by the Bureau of Immigration, Government of India.
            </p>
            <p>
              <strong className="text-white">Airside-only services</strong> (lounges, transit hotel pods within the sterile zone) do not require
              an Indian visa. <strong className="text-white">Landside services</strong> (city tours, external restaurants, spa facilities
              outside the airport perimeter) require valid immigration clearance.
            </p>

            <div className="bg-rose-950/30 border border-rose-800/50 p-4 rounded-xl space-y-2 mt-2">
              <h3 className="font-bold text-rose-300 text-sm">Section 3.1: Immigration &amp; Visa Compliance Disclaimer</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Landside bookings (including private cabs, external hotels, and city tours) strictly require valid Indian Immigration entry clearance. If a passenger is denied entry through CSMIA T2 Immigration or fails to present a valid Indian Tourist Visa / e-Visa / Transit Visa upon arrival, <strong className="text-white">all Landside bookings become strictly non-refundable once the booked slot start time begins</strong>. Passengers must verify entry eligibility prior to flight departure via the official Government of India portal (<a href="https://indianvisaonline.gov.in" target="_blank" rel="noopener noreferrer" className="text-sky-400 underline">https://indianvisaonline.gov.in</a>).
              </p>
            </div>
          </div>

          {/* 4. Payment & Pricing */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white">4. Payment &amp; Pricing Disclosures</h2>
            <p>
              All prices displayed on the LayoverX platform are quoted in Indian Rupees (INR) and are inclusive of applicable
              Goods &amp; Services Tax (GST) at the prevailing rate of <strong className="text-white">18% GST</strong>, unless explicitly stated otherwise.
            </p>
            <p>
              Payments are processed securely through Razorpay Payment Gateway. LayoverX does not store, process,
              or have access to your full card details. All transactions are PCI-DSS compliant and tokenized by Razorpay.
            </p>
            <p>
              Prices are subject to change without prior notice. The price confirmed at the time of payment is final and binding
              for that transaction.
            </p>
          </div>

          {/* 5. Limitation of Liability */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white">5. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, LayoverX&apos;s total aggregate liability for any claim arising out of
              or related to the use of our platform or any booked service shall be <strong className="text-white">limited to the total booking
              amount paid by the passenger</strong> for the specific service giving rise to the claim.
            </p>
            <p>
              In no event shall LayoverX be liable for indirect, incidental, special, consequential, or punitive damages including
              loss of profits, revenue, goodwill, or data arising from the use of or inability to use the platform.
            </p>
          </div>

          {/* 6. Governing Law */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white">6. Governing Law &amp; Jurisdiction</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of
              these Terms shall be subject to the exclusive jurisdiction of the courts located in Mumbai, Maharashtra.
            </p>
          </div>

          {/* 7. Contact */}
          <div className="space-y-3 pb-4">
            <h2 className="text-lg font-bold text-white">7. Contact Information</h2>
            <p>
              For any questions or concerns regarding these terms, please contact us at{' '}
              <a href="mailto:support@layoverx.com" className="text-sky-400 hover:underline">support@layoverx.com</a>{' '}
              or visit our <Link href="/contact" className="text-sky-400 hover:underline">Contact Us</Link> page.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
