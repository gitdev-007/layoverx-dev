import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FileText,
  ShieldCheck,
  Scale,
  CreditCard,
  Plane,
  AlertTriangle,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Clock,
  MapPin,
  Mail,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms & Conditions | LayoverX — CSMIA T2 Transit Services',
  description:
    'Read the complete terms of service for LayoverX transit hotel pods, dining, spa, chauffeur, and city tour bookings at Mumbai CSMIA Terminal 2.',
  alternates: { canonical: '/terms' },
};

const sections = [
  {
    id: '1',
    title: '1. About LayoverX & The Aggregator Model',
    content: (
      <>
        <p>
          LayoverX (&ldquo;LayoverX,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our&rdquo;) is an online transit
          concierge platform operated as a sole proprietorship by an individual entrepreneur, trading under the brand
          name <strong className="text-slate-900">LayoverX</strong>, with operational correspondence at{' '}
          <a href="mailto:support@layoverx.in" className="text-[#0369a1] font-semibold hover:underline">
            support@layoverx.in
          </a>
          .
        </p>
        <p>
          LayoverX connects international and domestic transit passengers at Chhatrapati Shivaji Maharaj International
          Airport, Terminal 2 (CSMIA T2), Mumbai, India, with verified third-party service partners including:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
          <li>Micro-stay transit hotel rooms and sleeping pods (airside &amp; landside)</li>
          <li>Airport and city restaurants, executive buffet reservations, and culinary trails</li>
          <li>Express spa, foot reflexology, and jetlag recovery wellness suites</li>
          <li>Private chauffeur services and fixed-rate airport transfers</li>
          <li>Guided layover city sightseeing, heritage, and South Mumbai cultural tours</li>
          <li>Gaming, esports pods, and quiet executive work lounges</li>
        </ul>
        <div className="bg-sky-50 border border-sky-200/80 rounded-2xl p-4 text-sky-950 text-xs sm:text-sm">
          <p className="font-bold text-[#0369a1] mb-1">Facilitator Status:</p>
          LayoverX acts as a <strong className="font-semibold">technology facilitator and booking aggregator</strong> only.
          All services are rendered by independent, licensed third-party vendors. LayoverX does not own, operate, or employ
          staff directly for any hospitality, chauffeur, or tourism venue listed on the platform.
        </div>
      </>
    ),
  },
  {
    id: '2',
    title: '2. Acceptance of Terms & Statutory Framework',
    content: (
      <>
        <p>
          By accessing the LayoverX website (layoverx.in), mobile interface, or by completing a booking, you unconditionally
          agree to be bound by these Terms &amp; Conditions (&ldquo;Terms&rdquo;), our{' '}
          <Link href="/privacy" className="text-[#0369a1] font-semibold hover:underline">
            Privacy Policy (DPDP)
          </Link>
          , our{' '}
          <Link href="/cookie-policy" className="text-[#0369a1] font-semibold hover:underline">
            Cookie Policy
          </Link>
          , and our{' '}
          <Link href="/refund-policy" className="text-[#0369a1] font-semibold hover:underline">
            Cancellation &amp; Refund Policy
          </Link>
          .
        </p>
        <p>
          If you do not agree with any part of these Terms, please discontinue use of the platform immediately. These
          Terms constitute a legally binding electronic agreement between you and LayoverX executed under the{' '}
          <strong className="text-slate-900">Information Technology Act, 2000</strong>, the rules thereunder, and the{' '}
          <strong className="text-slate-900">Indian Contract Act, 1872</strong>.
        </p>
      </>
    ),
  },
  {
    id: '3',
    title: '3. Eligibility & Account Registration',
    content: (
      <>
        <p>
          You must be at least <strong className="text-slate-900">18 years of age</strong> and legally capable of entering
          into binding contracts under Indian law to create an account or complete bookings on LayoverX. By booking, you
          confirm that all passenger and flight information provided is accurate and truthful.
        </p>
        <p>
          You are responsible for maintaining the confidentiality of your account credentials and login sessions. LayoverX is
          not liable for any unauthorized activity arising from compromised credentials on your device.
        </p>
      </>
    ),
  },
  {
    id: '4',
    title: '4. Flight Tracking & Passenger Responsibility',
    content: (
      <>
        <p>
          LayoverX integrates real-time flight tracking telemetry and automatically adjusts booked service windows when your
          inbound connection experiences schedule shifts. This{' '}
          <strong className="text-slate-900">Slot Window Shift</strong> engine is provided as an automated convenience and
          does not transfer any responsibility for missed flights or boarding gate closures to LayoverX.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-amber-950 text-xs sm:text-sm">
          <strong className="font-bold block text-amber-900 mb-1">Mandatory Passenger Dwell Time Management:</strong>
          It is the sole and exclusive responsibility of the traveler to monitor airline flight status, manage off-terminal
          dwell time, and ensure timely return to CSMIA Terminal 2 for immigration, CISF security checks, and gate boarding.
          LayoverX is not liable for missed flights, rebooking fees, or hotel expenses caused by delayed passenger return.
        </div>
      </>
    ),
  },
  {
    id: '5',
    title: '5. Immigration, Visa & Indian Entry Compliance',
    content: (
      <>
        <p>
          Certain LayoverX stopover experiences require travelers to exit the international sterile transit area and enter
          Indian sovereign territory (landside). Passengers are{' '}
          <strong className="text-slate-900">solely responsible</strong> for possessing valid Indian immigration entry
          permission — Tourist e-Visa, Regular Paper Visa, Transit Visa (TV), or an Overseas Citizen of India (OCI) Card.
        </p>
        <p>
          <strong className="text-slate-900">Airside Services:</strong> In-terminal transit hotel pods and airside lounges do not
          require clearing Indian immigration or holding an Indian visa.
        </p>
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-rose-950 text-xs sm:text-sm space-y-2">
          <h4 className="font-bold text-rose-900 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            Immigration Disclaimer & Landside Restrictions
          </h4>
          <p className="text-xs text-rose-900 leading-relaxed">
            If a passenger is denied entry through CSMIA T2 Immigration due to missing, expired, or rejected visa documents,
            all Landside bookings become <strong className="font-bold">strictly non-refundable</strong> once the slot start
            time has passed. Passengers must verify official entry eligibility at{' '}
            <a
              href="https://indianvisaonline.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0369a1] font-bold underline"
            >
              indianvisaonline.gov.in
            </a>
            .
          </p>
        </div>
      </>
    ),
  },
  {
    id: '6',
    title: '6. Bookings, Payments, GST & Pricing',
    content: (
      <>
        <p>
          All prices on the LayoverX platform are quoted in <strong className="text-slate-900">Indian Rupees (INR)</strong> and
          transparently itemize applicable Goods &amp; Services Tax (GST) at 18% during checkout. Confirmed booking rates are
          final and guaranteed against subsequent price changes.
        </p>
        <p>
          Payments are tokenized and processed securely through <strong className="text-slate-900">Razorpay</strong>, a PCI-DSS
          Level 1 compliant payment aggregator. LayoverX does not store raw credit card numbers or net-banking credentials on its
          servers.
        </p>
        <p>
          A booking is confirmed only upon generation of your LayoverX Booking ID, digital itinerary receipt, and QR-coded access
          voucher delivered via email or WhatsApp.
        </p>
      </>
    ),
  },
  {
    id: '7',
    title: '7. Service Delivery & Vendor Obligations',
    content: (
      <>
        <p>
          LayoverX uses commercial efforts to verify and monitor partner operational reliability. However, in events of force
          majeure (extreme weather, Mumbai airport authority / AAI / AERA directives, CISF security emergencies, or airline
          schedule cancellations), bookings may be rescheduled or refunded in full.
        </p>
        <p>
          LayoverX is not responsible for the direct conduct or third-party venue maintenance beyond vetting and partnering with
          reputable service providers at CSMIA T2.
        </p>
      </>
    ),
  },
  {
    id: '8',
    title: '8. Intellectual Property',
    content: (
      <p>
        All digital assets, logos, design themes, itinerary calculations, and software algorithms on layoverx.in are the
        intellectual property of LayoverX and are protected under the{' '}
        <strong className="text-slate-900">Copyright Act, 1957</strong> and the{' '}
        <strong className="text-slate-900">Trade Marks Act, 1999</strong> of India. Any unauthorized scraping, commercial
        reproduction, or reverse engineering is strictly prohibited.
      </p>
    ),
  },
  {
    id: '9',
    title: '9. Limitation of Liability',
    content: (
      <>
        <p>
          To the maximum extent permitted under Indian law, LayoverX&apos;s aggregate liability for any claim arising out of a
          service booking shall be strictly <strong className="text-slate-900">capped at the total booking amount paid</strong>{' '}
          by the passenger for the specific service in dispute.
        </p>
        <p>
          LayoverX shall not be liable for any indirect, incidental, or consequential damages including missed flight connections,
          rebooking expenses, or third-party airline fees. Nothing herein excludes statutory liabilities under the{' '}
          <strong className="text-slate-900">Consumer Protection Act, 2019</strong>.
        </p>
      </>
    ),
  },
  {
    id: '10',
    title: '10. Governing Law, Jurisdiction & Grievance Redressal',
    content: (
      <>
        <p>
          These Terms are governed by the laws of India. Any legal proceedings arising out of these Terms shall be subject to
          the <strong className="text-slate-900">exclusive jurisdiction of the competent courts in Mumbai, Maharashtra</strong>.
        </p>
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2 mt-2">
          <p className="font-bold text-slate-900 text-sm">Nodal Grievance Officer — LayoverX</p>
          <p className="text-xs text-slate-600">
            Designated pursuant to Rule 5(9) of the IT (Intermediary Guidelines) Rules:
          </p>
          <p className="text-xs">
            Email:{' '}
            <a href="mailto:grievance@layoverx.in" className="text-[#0369a1] font-bold hover:underline">
              grievance@layoverx.in
            </a>{' '}
            | General Support:{' '}
            <a href="mailto:support@layoverx.in" className="text-[#0369a1] font-bold hover:underline">
              support@layoverx.in
            </a>
          </p>
          <p className="text-xs text-slate-500">
            All grievances are acknowledged within 48 hours and resolved within 15 working days.
          </p>
        </div>
      </>
    ),
  },
];

export default function TermsPage() {
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
              <span className="text-white font-medium">Terms &amp; Conditions</span>
            </nav>

            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-sky-500/20 text-sky-300 border border-sky-400/30">
              ⚖️ OFFICIAL TERMS OF SERVICE
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Website Terms &amp; Conditions
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Standard operating agreement, passenger responsibilities, pricing regulations, and vendor facilitator terms for LayoverX bookings at Mumbai CSMIA T2.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-sky-400" /> Last Updated: 25 September 2026
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> IT Act 2000 &amp; CPA 2019 Compliant
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-sky-400" /> Jurisdiction: Mumbai, India
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
              className="px-4 py-2 rounded-xl bg-[#0369a1] text-white flex-shrink-0 shadow-xs"
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
                Table of Contents
              </h2>
              <nav className="space-y-1.5 text-xs">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#section-${s.id}`}
                    className="block p-2 rounded-xl text-slate-600 hover:text-[#0369a1] hover:bg-sky-50 font-medium transition"
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>

            {/* Regulatory Seal Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-sky-400" />
                <h3 className="font-bold text-sm">Legal &amp; Consumer Protection</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Operated under the laws of the Republic of India. Inquiries or service concerns are addressed promptly by our Mumbai airport concierge team.
              </p>
              <div className="pt-2 text-[11px] text-slate-400 space-y-1">
                <div>• Jurisdiction: Mumbai High Court</div>
                <div>• Support: support@layoverx.in</div>
                <div>• Phone: +91 022 4900-1234</div>
              </div>
            </div>
          </aside>

          {/* MAIN DOCUMENT CARD */}
          <main className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-10 text-sm leading-relaxed text-slate-700">
            {sections.map((s) => (
              <div key={s.id} id={`section-${s.id}`} className="space-y-4 scroll-mt-36 pt-2 first:pt-0">
                <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                  {s.title}
                </h2>
                {s.content}
              </div>
            ))}

            {/* RELATED DOCUMENTS FOOTER */}
            <div className="border-t border-slate-200 pt-8 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Related Legal &amp; Compliance Documents
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
