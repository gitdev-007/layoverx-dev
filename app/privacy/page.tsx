import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  UserCheck,
  EyeOff,
  Database,
  Server,
  Scale,
  Mail,
  Clock,
  MapPin,
  CheckCircle2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | LayoverX — How We Handle Your Data',
  description:
    'Learn how LayoverX collects, uses, and protects your personal information in compliance with the Digital Personal Data Protection Act, 2023 and IT (SPDI) Rules, 2011.',
  alternates: { canonical: '/privacy' },
};

const sections = [
  { id: 'who-we-are', title: '1. Who We Are & Governance' },
  { id: 'data-collected', title: '2. Information We Collect' },
  { id: 'data-use', title: '3. How We Use Your Information' },
  { id: 'data-sharing', title: '4. Information Sharing & Third Parties' },
  { id: 'security', title: '5. Security & Encryption Safeguards' },
  { id: 'retention', title: '6. Data Retention Policy' },
  { id: 'your-rights', title: '7. Your Rights Under DPDP Act, 2023' },
  { id: 'cookies', title: '8. Cookies & Tracking Technologies' },
  { id: 'contact', title: '9. Nodal Grievance Officer & Contact' },
];

export default function PrivacyPage() {
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
              <span className="text-white font-medium">Privacy Policy</span>
            </nav>

            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-sky-500/20 text-sky-300 border border-sky-400/30">
              🛡️ DATA PRIVACY &amp; DPDP COMPLIANCE
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Privacy Policy (DPDP)
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Transparent disclosure of what personal data we collect, encryption protocols, strict no-sale guarantees, and your rights under Indian privacy laws.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-sky-400" /> Last Updated: 25 September 2026
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> DPDP Act 2023 &amp; IT SPDI Rules 2011
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-sky-400" /> 256-Bit TLS Encryption
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
              className="px-4 py-2 rounded-xl bg-[#0369a1] text-white flex-shrink-0 shadow-xs"
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
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex-shrink-0 transition"
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
                Privacy Topics
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

            {/* Zero-Sale Guarantee Card */}
            <div className="bg-emerald-950 text-white rounded-3xl p-6 shadow-sm space-y-3 border border-emerald-900">
              <div className="flex items-center gap-2">
                <EyeOff className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-sm">Zero Data Selling Guarantee</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                LayoverX never sells, rents, or licenses your personal data to ad networks or data brokers. Data is processed strictly to fulfil your stopover bookings.
              </p>
              <div className="pt-2 text-[11px] text-emerald-300 font-semibold">
                ✓ Full DPDP 2023 Digital Citizen Protections
              </div>
            </div>
          </aside>

          {/* MAIN DOCUMENT CARD */}
          <main className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-10 text-sm leading-relaxed text-slate-700">
            
            {/* 1. Who We Are */}
            <div id="who-we-are" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                1. Who We Are &amp; Governance
              </h2>
              <p>
                LayoverX is an Indian transit concierge platform operating under the commercial brand name{' '}
                <strong className="text-slate-900">LayoverX</strong>, with correspondence at{' '}
                <a href="mailto:support@layoverx.in" className="text-[#0369a1] font-semibold hover:underline">
                  support@layoverx.in
                </a>
                . We operate layoverx.in to assist air transit travelers at Mumbai International Airport (CSMIA T2).
              </p>
              <p>
                This Privacy Policy is governed by the{' '}
                <strong className="text-slate-900">Digital Personal Data Protection Act, 2023 (DPDP)</strong>, the{' '}
                <strong className="text-slate-900">Information Technology Act, 2000</strong>, and the{' '}
                <strong className="text-slate-900">IT (SPDI) Rules, 2011</strong> issued by the Ministry of Electronics and
                Information Technology (MeitY), Government of India.
              </p>
            </div>

            {/* 2. What We Collect */}
            <div id="data-collected" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                2. Information We Collect
              </h2>
              <p>We collect only the minimum necessary information required to coordinate transit services:</p>
              <div className="space-y-2.5">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <strong className="text-slate-900 block text-xs uppercase tracking-wider mb-1">Identity &amp; Contact:</strong>
                  <p className="text-xs text-slate-600">Full passenger name, email address, and mobile number provided during checkout or registration.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <strong className="text-slate-900 block text-xs uppercase tracking-wider mb-1">Flight Telemetry:</strong>
                  <p className="text-xs text-slate-600">Inbound/outbound flight numbers, airline codes, and connection schedules to enable automated delay protection.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <strong className="text-slate-900 block text-xs uppercase tracking-wider mb-1">Government ID (Landside bookings only):</strong>
                  <p className="text-xs text-slate-600">Passport or Aadhaar/Voter ID numbers when required by hotel or transport partners for airport gate security logs.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <strong className="text-slate-900 block text-xs uppercase tracking-wider mb-1">Tokenized Payment Identifiers:</strong>
                  <p className="text-xs text-slate-600">Razorpay payment tokens and order IDs. LayoverX never touches or stores raw credit card numbers or CVV codes.</p>
                </div>
              </div>
            </div>

            {/* 3. How We Use Your Information */}
            <div id="data-use" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                3. How We Use Your Information
              </h2>
              <p>Your information is processed strictly under contractual necessity and legitimate interest:</p>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600 text-xs sm:text-sm">
                <li><strong className="text-slate-900">Booking Execution:</strong> Generating QR-coded e-vouchers, confirmation receipts, and chauffeur pickup instructions.</li>
                <li><strong className="text-slate-900">Automated Shift Engine:</strong> Automatically shifting your booking slot when incoming flights are delayed.</li>
                <li><strong className="text-slate-900">Partner Coordination:</strong> Relaying passenger names and timing to the specific hotel, spa, or cab vendor delivering your experience.</li>
                <li><strong className="text-slate-900">Concierge Communications:</strong> WhatsApp status alerts and 24/7 Gate 2 arrivals support.</li>
              </ul>
            </div>

            {/* 4. Information Sharing */}
            <div id="data-sharing" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                4. Information Sharing &amp; Third Parties
              </h2>
              <p>
                We share data strictly on a need-to-know basis with verified vendors to fulfill your reservation:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-slate-600 text-xs sm:text-sm">
                <li><strong className="text-slate-900">Service Vendors:</strong> Verified hotel pod, restaurant, spa, and chauffeur partners.</li>
                <li><strong className="text-slate-900">Payment Processor:</strong> Razorpay Software Pvt. Ltd. (PCI-DSS Level 1 compliant).</li>
                <li><strong className="text-slate-900">Flight Status APIs:</strong> AeroAPI / AirLabs for real-time runway status monitoring.</li>
                <li><strong className="text-slate-900">Infrastructure:</strong> Supabase (encrypted database) and Cloudflare (DDoS &amp; bot protection).</li>
              </ul>
              <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 text-xs text-sky-950 font-medium">
                🛡️ Under no circumstances do we sell, rent, monetize, or trade customer data with advertisers or data aggregators.
              </div>
            </div>

            {/* 5. Security Safeguards */}
            <div id="security" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                5. Security &amp; Encryption Safeguards
              </h2>
              <p>
                In compliance with Rule 8 of the IT (SPDI) Rules, 2011, LayoverX maintains comprehensive security controls:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-slate-600 text-xs sm:text-sm">
                <li>256-bit TLS 1.3 encryption across all website and API communications.</li>
                <li>Row-level security (RLS) policies ensuring travelers only ever access their own booking records.</li>
                <li>Zero retention of sensitive payment credentials on LayoverX application servers.</li>
                <li>Continuous Cloudflare security screening preventing unauthorized automated access.</li>
              </ul>
            </div>

            {/* 6. Data Retention Policy */}
            <div id="retention" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                6. Data Retention Policy
              </h2>
              <p>Data is retained only as long as necessary to satisfy operational and legal requirements:</p>
              <ul className="list-disc pl-6 space-y-1 text-slate-600 text-xs sm:text-sm">
                <li><strong className="text-slate-900">Active Itinerary Drafts:</strong> Stored locally on your browser until you clear cookies or 30 days elapse.</li>
                <li><strong className="text-slate-900">Booking Records:</strong> Retained for 24 months for taxation, invoicing, and dispute resolution.</li>
                <li><strong className="text-slate-900">Identity Documents:</strong> Deleted within 48 hours following service delivery completion.</li>
              </ul>
            </div>

            {/* 7. Your Rights */}
            <div id="your-rights" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                7. Your Rights Under DPDP Act, 2023
              </h2>
              <p>As a data principal, you hold full statutory rights under Indian law:</p>
              <div className="grid sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <strong className="text-slate-900 block font-bold mb-0.5">Right to Access:</strong>
                  Review the summary of your personal data processed by LayoverX.
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <strong className="text-slate-900 block font-bold mb-0.5">Right to Correction:</strong>
                  Request rectification of inaccurate flight or passenger details.
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <strong className="text-slate-900 block font-bold mb-0.5">Right to Erasure:</strong>
                  Request deletion of your account and personal history within 30 days.
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <strong className="text-slate-900 block font-bold mb-0.5">Right to Grievance:</strong>
                  Direct recourse through our designated Nodal Grievance Officer.
                </div>
              </div>
            </div>

            {/* 8. Cookies */}
            <div id="cookies" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                8. Cookies &amp; Tracking Technologies
              </h2>
              <p>
                LayoverX uses essential authentication cookies (Supabase), functional itinerary caching (local storage), and secure
                payment tokens (Razorpay) to operate smoothly.
              </p>
              <p>
                For a complete inventory table of every cookie used and instructions on browser management, please review our dedicated{' '}
                <Link href="/cookie-policy" className="text-[#0369a1] font-bold hover:underline">
                  Cookie Policy &rarr;
                </Link>
              </p>
            </div>

            {/* 9. Grievance Officer */}
            <div id="contact" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                9. Nodal Grievance Officer &amp; Contact
              </h2>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
                <p className="font-bold text-slate-900 text-sm">Nodal Grievance Officer — LayoverX</p>
                <p className="text-xs text-slate-600">
                  In compliance with Rule 5(9) of the Information Technology (SPDI) Rules, 2011:
                </p>
                <p className="text-xs">
                  Email:{' '}
                  <a href="mailto:privacy@layoverx.in" className="text-[#0369a1] font-bold hover:underline">
                    privacy@layoverx.in
                  </a>{' '}
                  | General Support:{' '}
                  <a href="mailto:support@layoverx.in" className="text-[#0369a1] font-bold hover:underline">
                    support@layoverx.in
                  </a>
                </p>
                <p className="text-xs text-slate-500">
                  Acknowledgement within 48 hours; resolution within 30 days of receipt.
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
                  href="/cookie-policy"
                  className="p-4 rounded-2xl bg-slate-50 hover:bg-sky-50 border border-slate-200/80 hover:border-sky-200 transition group"
                >
                  <p className="text-xs text-slate-500 font-bold">Policy 03</p>
                  <p className="text-sm font-bold text-slate-900 group-hover:text-[#0369a1]">Cookie Policy →</p>
                </Link>
                <Link
                  href="/refund-policy"
                  className="p-4 rounded-2xl bg-slate-50 hover:bg-sky-50 border border-slate-200/80 hover:border-sky-200 transition group"
                >
                  <p className="text-xs text-slate-500 font-bold">Policy 04</p>
                  <p className="text-sm font-bold text-slate-900 group-hover:text-[#0369a1]">Refund Policy →</p>
                </Link>
              </div>
            </div>
          </main>

        </div>
      </section>
    </div>
  );
}
