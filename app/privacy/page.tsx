import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | LayoverX — DPDP Act Compliant',
  description:
    'LayoverX privacy policy compliant with India\'s Digital Personal Data Protection (DPDP) Act. Learn how we collect, process, and protect your personal data.',
  alternates: {
    canonical: 'https://layoverx-dev.vercel.app/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-300 pb-24">
      {/* Header */}
      <section className="pt-28 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          <nav className="flex items-center gap-2 text-xs text-sky-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-slate-600">/</span>
            <span className="text-white font-medium">Privacy Policy</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-slate-400 text-sm mt-3">
            Last updated: 29 July 2026 &nbsp;·&nbsp; Compliant with the Digital Personal Data Protection (DPDP) Act, 2023
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-4">
        <div className="max-w-3xl mx-auto space-y-10 text-sm leading-relaxed">

          {/* 1. Data Collected */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white">1. Personal Data We Collect</h2>
            <p>
              LayoverX Technologies Pvt. Ltd. collects the following categories of personal data when you use our platform:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-slate-400">
              <li><strong className="text-slate-200">Identity Data:</strong> Full name, phone number, email address.</li>
              <li><strong className="text-slate-200">Flight Data:</strong> Flight number, airline, arrival/departure timestamps, layover duration.</li>
              <li><strong className="text-slate-200">Travel Documents:</strong> Passport number or government-issued ID (required for CSMIA T2 entry verification only).</li>
              <li><strong className="text-slate-200">Payment Data:</strong> Tokenized payment information processed exclusively by Razorpay. LayoverX does not store card numbers.</li>
              <li><strong className="text-slate-200">Device &amp; Usage Data:</strong> Browser type, IP address, pages viewed, referrer URL (for analytics and fraud prevention).</li>
            </ul>
          </div>

          {/* 2. Purpose of Processing */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white">2. Purpose of Data Processing</h2>
            <p>We process your personal data strictly for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-1 text-slate-400">
              <li><strong className="text-slate-200">Booking &amp; Voucher Generation:</strong> Creating QR-coded access passes, vendor dispatch alerts, and booking confirmations.</li>
              <li><strong className="text-slate-200">Flight Delay Alerts:</strong> WhatsApp and push notifications for real-time flight status changes and automatic slot window shifts.</li>
              <li><strong className="text-slate-200">Concierge Dispatch:</strong> Sharing confirmed booking details with verified ground operations partners at CSMIA T2 for meet-and-greet coordination.</li>
              <li><strong className="text-slate-200">Customer Support:</strong> Responding to inquiries, resolving disputes, and processing refund requests.</li>
              <li><strong className="text-slate-200">Platform Improvement:</strong> Anonymized analytics for service quality optimization and performance monitoring.</li>
            </ul>
          </div>

          {/* 3. Third-Party Sharing */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white">3. Third-Party Data Sharing</h2>
            <p>
              LayoverX shares personal data only with the following categories of verified partners, strictly on a need-to-know basis:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-slate-400">
              <li><strong className="text-slate-200">Service Vendors:</strong> Hotel operators, restaurant partners, spa providers, and transport operators for service fulfillment.</li>
              <li><strong className="text-slate-200">Payment Processors:</strong> Razorpay for secure payment processing (PCI-DSS Level 1 certified).</li>
              <li><strong className="text-slate-200">Flight Data Providers:</strong> AirLabs / AeroAPI for real-time flight tracking.</li>
              <li><strong className="text-slate-200">Communication Services:</strong> WhatsApp Business API and email services for booking notifications.</li>
            </ul>
            <p>
              We do <strong className="text-white">not</strong> sell, rent, or trade your personal data to third-party advertisers or data brokers under any circumstances.
            </p>
          </div>

          {/* 4. Payment Security */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white">4. Payment Security &amp; PCI-DSS Compliance</h2>
            <p>
              All payment transactions are processed through Razorpay, which maintains PCI-DSS Level 1 certification — the highest
              level of security compliance in the payment card industry.
            </p>
            <p>
              LayoverX uses <strong className="text-white">tokenized payment references</strong> only. We never receive, store, or process
              your full credit/debit card number, CVV, or expiry date. Payment data is encrypted end-to-end between your browser
              and Razorpay&apos;s secure infrastructure.
            </p>
          </div>

          {/* 5. Data Retention & Deletion */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white">5. Data Retention &amp; Your Rights</h2>
            <p>
              We retain your personal data only for as long as reasonably necessary to fulfill the purposes for which it was collected,
              typically for a period of <strong className="text-white">12 months</strong> from the date of your last booking or interaction with the platform.
            </p>
            <p>Under the DPDP Act, 2023, you have the right to:</p>
            <ul className="list-disc pl-6 space-y-1 text-slate-400">
              <li>Access, correct, or update your personal data.</li>
              <li>Request complete erasure of your personal data.</li>
              <li>Withdraw consent for specific processing activities.</li>
              <li>Lodge a complaint with the Data Protection Board of India.</li>
            </ul>
            <p>
              To exercise any of these rights, email us at{' '}
              <a href="mailto:privacy@layoverx.com" className="text-sky-400 hover:underline font-semibold">privacy@layoverx.com</a>.
              We will respond within 72 hours of receiving your request.
            </p>
          </div>

          {/* 6. Contact */}
          <div className="space-y-3 pb-4">
            <h2 className="text-lg font-bold text-white">6. Data Protection Officer</h2>
            <p>
              <strong className="text-slate-200">Designated Grievance &amp; Data Protection Officer</strong><br />
              LayoverX Technologies Pvt. Ltd.<br />
              CSMIA Terminal 2, Exit Gate 2 Arrivals, Sahar, Mumbai 400099<br />
              Email: <a href="mailto:privacy@layoverx.com" className="text-sky-400 hover:underline">privacy@layoverx.com</a>
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
