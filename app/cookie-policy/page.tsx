import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Cookie,
  ShieldCheck,
  Settings,
  Database,
  Lock,
  Layers,
  Clock,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cookie Policy | LayoverX — How We Use Cookies & Tracking',
  description:
    'Detailed Cookie Policy for LayoverX. Learn about the essential, functional, performance, and security cookies used on our CSMIA Mumbai T2 transit platform.',
  alternates: { canonical: '/cookie-policy' },
};

const sections = [
  { id: 'what-are-cookies', title: '1. What Are Cookies & Local Storage' },
  { id: 'cookie-categories', title: '2. Categories of Cookies We Use' },
  { id: 'inventory-table', title: '3. Inventory of Cookies Used on LayoverX' },
  { id: 'third-parties', title: '4. Third-Party Integrations' },
  { id: 'manage-cookies', title: '5. How to Control & Disable Cookies' },
  { id: 'contact', title: '6. Grievance Redressal & Contact' },
];

export default function CookiePolicyPage() {
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
              <span className="text-white font-medium">Cookie Policy</span>
            </nav>

            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-sky-500/20 text-sky-300 border border-sky-400/30">
              🍪 TRANSPARENCY &amp; CONSENT
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Cookie Policy
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Understand the exact browser cookies, local storage tokens, and session identifiers we use to power your stopover itinerary, payment security, and authentication.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-sky-400" /> Last Updated: 25 September 2026
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> DPDP Act 2023 &amp; IT SPDI Rules 2011
              </span>
              <span className="flex items-center gap-1.5">
                <Settings className="w-3.5 h-3.5 text-sky-400" /> Granular Browser Controls
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
              className="px-4 py-2 rounded-xl bg-[#0369a1] text-white flex-shrink-0 shadow-xs"
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
                Cookie Guide
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

            {/* Offline-Ready Storage Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-sky-400" />
                <h3 className="font-bold text-sm">Airport Connection Resilience</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                LayoverX uses browser local storage so your stopover itinerary, time calculations, and bookings remain intact even if your mobile roaming disconnects inside CSMIA T2.
              </p>
              <div className="pt-2 text-[11px] text-emerald-400 font-semibold">
                ✓ No Third-Party Cross-Site Ad Tracking
              </div>
            </div>
          </aside>

          {/* MAIN DOCUMENT CARD */}
          <main className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-10 text-sm leading-relaxed text-slate-700">
            
            {/* 1. What Are Cookies */}
            <div id="what-are-cookies" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                1. What Are Cookies &amp; Local Storage?
              </h2>
              <p>
                Cookies are small data files saved to your computer or mobile device when you browse websites. They are
                essential for web applications to remember your authentication session, preserve your booking cart, and
                safeguard your transaction details.
              </p>
              <p>
                In addition to cookies, <strong className="text-slate-900">layoverx.in</strong> utilizes modern browser{' '}
                <strong className="text-slate-900">Local Storage</strong> and <strong className="text-slate-900">Session Storage</strong>{' '}
                to securely cache your transit selections (such as selected transit hotel pods, dining reservations, or airport
                transfers) directly on your client device so that temporary connectivity lapses do not erase your planning.
              </p>
            </div>

            {/* 2. Categories of Cookies We Use */}
            <div id="cookie-categories" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                2. Categories of Cookies We Use
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0369a1]">Category 1</span>
                  <h3 className="font-bold text-slate-900 text-base">Essential / Strictly Necessary</h3>
                  <p className="text-xs text-slate-600">
                    Required for core platform functionality, security verification, Supabase user authentication, and
                    CSRF protection. The platform cannot function without these cookies.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Category 2</span>
                  <h3 className="font-bold text-slate-900 text-base">Functional &amp; Itinerary State</h3>
                  <p className="text-xs text-slate-600">
                    Remembers your stopover services (hotels, dining, chauffeurs, spas), flight timings, terminal selection
                    (T1/T2), and currency preferences.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-700">Category 3</span>
                  <h3 className="font-bold text-slate-900 text-base">Payment &amp; Security Verification</h3>
                  <p className="text-xs text-slate-600">
                    Enables secure tokenized checkout via Razorpay, PCI-DSS Level 1 compliance verification, fraud detection,
                    and 3D Secure bank OTP validation.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Category 4</span>
                  <h3 className="font-bold text-slate-900 text-base">Performance &amp; Diagnostics</h3>
                  <p className="text-xs text-slate-600">
                    Anonymized page latency, error telemetry, and transit route calculation telemetry (OSRM transit routing)
                    to ensure fast loading during peak Mumbai flight arrivals.
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Detailed Inventory Table */}
            <div id="inventory-table" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                3. Inventory of Cookies Used on LayoverX
              </h2>
              <p className="text-xs text-slate-500">
                Below is an itemized breakdown of the primary cookies and storage tokens utilized across layoverx.in:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-slate-100/80 text-slate-800 border-b border-slate-200">
                      <th className="text-left px-4 py-3.5 font-bold">Cookie / Key Name</th>
                      <th className="text-left px-4 py-3.5 font-bold">Provider</th>
                      <th className="text-left px-4 py-3.5 font-bold">Purpose</th>
                      <th className="text-left px-4 py-3.5 font-bold">Category</th>
                      <th className="text-left px-4 py-3.5 font-bold">Lifespan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/60">
                      <td className="px-4 py-3 font-mono font-semibold text-[#0369a1]">sb-access-token</td>
                      <td className="px-4 py-3">LayoverX / Supabase</td>
                      <td className="px-4 py-3">Maintains authenticated user session &amp; profile access</td>
                      <td className="px-4 py-3 font-bold text-emerald-700">Essential</td>
                      <td className="px-4 py-3 text-slate-500">Session (1 hour)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="px-4 py-3 font-mono font-semibold text-[#0369a1]">sb-refresh-token</td>
                      <td className="px-4 py-3">LayoverX / Supabase</td>
                      <td className="px-4 py-3">Refreshes authentication token without re-login</td>
                      <td className="px-4 py-3 font-bold text-emerald-700">Essential</td>
                      <td className="px-4 py-3 text-slate-500">7 days</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="px-4 py-3 font-mono font-semibold text-[#0369a1]">layoverx_itinerary_items</td>
                      <td className="px-4 py-3">LayoverX (Local Storage)</td>
                      <td className="px-4 py-3">Caches active transit items and selection order</td>
                      <td className="px-4 py-3 font-bold text-[#0369a1]">Functional</td>
                      <td className="px-4 py-3 text-slate-500">Persistent (30 days)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="px-4 py-3 font-mono font-semibold text-[#0369a1]">layoverx_saved_plans</td>
                      <td className="px-4 py-3">LayoverX (Local Storage)</td>
                      <td className="px-4 py-3">Stores saved itinerary drafts in user control panel</td>
                      <td className="px-4 py-3 font-bold text-[#0369a1]">Functional</td>
                      <td className="px-4 py-3 text-slate-500">Persistent</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="px-4 py-3 font-mono font-semibold text-[#0369a1]">layoverx_calculator_data</td>
                      <td className="px-4 py-3">LayoverX (Local Storage)</td>
                      <td className="px-4 py-3">Stores flight landing and departure timestamps for buffer computation</td>
                      <td className="px-4 py-3 font-bold text-[#0369a1]">Functional</td>
                      <td className="px-4 py-3 text-slate-500">Session</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="px-4 py-3 font-mono font-semibold text-[#0369a1]">rzp_checkout_anon_id</td>
                      <td className="px-4 py-3">Razorpay</td>
                      <td className="px-4 py-3">Payment order security verification &amp; tokenization</td>
                      <td className="px-4 py-3 font-bold text-purple-700">Payment</td>
                      <td className="px-4 py-3 text-slate-500">Session</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="px-4 py-3 font-mono font-semibold text-[#0369a1]">cf_clearance / __cf_bm</td>
                      <td className="px-4 py-3">Cloudflare</td>
                      <td className="px-4 py-3">Bot detection, rate limiting, and DDoS security protection</td>
                      <td className="px-4 py-3 font-bold text-emerald-700">Security</td>
                      <td className="px-4 py-3 text-slate-500">30 mins – 1 year</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 4. Third-Party Integrations */}
            <div id="third-parties" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                4. Third-Party Integrations
              </h2>
              <p>
                When booking transit experiences on LayoverX, select verified third-party partners set technical cookies to fulfill checkout and map services:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600 text-xs sm:text-sm">
                <li><strong className="text-slate-900">Razorpay Software Private Limited:</strong> Manages tokenized payment gateways and 3D Secure bank interfaces.</li>
                <li><strong className="text-slate-900">Supabase Inc.:</strong> Manages encrypted session authentication and secure token renewal.</li>
                <li><strong className="text-slate-900">Project OSRM / OpenStreetMap:</strong> Calculates driving time and distance without recording personal identity.</li>
              </ul>
            </div>

            {/* 5. How to Control Cookies */}
            <div id="manage-cookies" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                5. How to Control &amp; Disable Cookies
              </h2>
              <p>
                You can manage, restrict, or clear cookies through your browser settings. Please note that blocking essential or functional cookies will prevent you from creating custom itineraries or completing bookings on LayoverX.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 text-xs pt-1">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <strong className="text-slate-900 block font-bold mb-0.5">Google Chrome:</strong>
                  Settings → Privacy &amp; Security → Third-party cookies → Block or clear data
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <strong className="text-slate-900 block font-bold mb-0.5">Apple Safari:</strong>
                  Preferences / Settings → Privacy → Prevent cross-site tracking / Block all cookies
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <strong className="text-slate-900 block font-bold mb-0.5">Mozilla Firefox:</strong>
                  Settings → Privacy &amp; Security → Cookies and Site Data → Clear data
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <strong className="text-slate-900 block font-bold mb-0.5">Microsoft Edge:</strong>
                  Settings → Cookies and Site Permissions → Manage and delete cookies
                </div>
              </div>
            </div>

            {/* 6. Grievance Officer */}
            <div id="contact" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                6. Grievance Redressal &amp; Contact
              </h2>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
                <p className="font-bold text-slate-900 text-sm">Nodal Grievance Officer — LayoverX</p>
                <p className="text-xs text-slate-600">
                  For privacy, consent, or cookie-related inquiries:
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
                  Address: CSMIA Terminal 2, Exit Gate 2 Arrivals Concierge Desk, Sahar, Mumbai 400099
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
