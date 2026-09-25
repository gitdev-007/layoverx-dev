import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cookie Policy | LayoverX — How We Use Cookies & Tracking',
  description:
    'Detailed Cookie Policy for LayoverX. Learn about the essential, functional, performance, and security cookies used on our CSMIA Mumbai T2 transit platform.',
  alternates: { canonical: '/cookie-policy' },
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-300 pb-24">
      {/* Header */}
      <section className="pt-28 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          <nav className="flex items-center gap-2 text-xs text-sky-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-slate-600">/</span>
            <span className="text-white font-medium">Cookie Policy</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Cookie Policy
          </h1>
          <p className="text-slate-400 text-sm mt-3">
            Last updated: 25 September 2026&nbsp;·&nbsp;Applicable to all visitors and users of layoverx.in
          </p>
          <p className="text-slate-500 text-xs mt-2">
            This Cookie Policy explains how <strong className="text-slate-400">LayoverX</strong> uses cookies, local storage,
            and similar technologies in compliance with the <strong className="text-slate-400">Information Technology Act, 2000</strong>,
            the <strong className="text-slate-400">IT (SPDI) Rules, 2011</strong>, and the{' '}
            <strong className="text-slate-400">Digital Personal Data Protection (DPDP) Act, 2023</strong>.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-4">
        <div className="max-w-3xl mx-auto space-y-10 text-sm leading-relaxed">

          {/* 1. What Are Cookies */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white">1. What Are Cookies?</h2>
            <p>
              Cookies are small text files placed on your computer, smartphone, or mobile device by websites that you
              visit. They are widely used to make websites work properly, improve user experience, provide authentication
              security, and report aggregate analytics to website operators.
            </p>
            <p>
              When you browse <strong className="text-white">layoverx.in</strong>, we may also utilize browser{' '}
              <strong className="text-white">Local Storage</strong> and <strong className="text-white">Session Storage</strong>{' '}
              to temporarily preserve your custom transit itinerary, flight times, and calculated airport buffer windows so you
              do not lose your booking progress if your connection drops.
            </p>
          </div>

          {/* 2. Categories of Cookies We Use */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white">2. Categories of Cookies We Use</h2>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-slate-800/50 border border-slate-700/80 rounded-2xl p-5 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Category 1</span>
                <h3 className="font-bold text-white text-base">Essential / Strictly Necessary</h3>
                <p className="text-xs text-slate-400">
                  Required for core platform functionality, security verification, user authentication via Supabase, and
                  CSRF protection. The platform cannot function properly without these cookies.
                </p>
              </div>

              <div className="bg-slate-800/50 border border-slate-700/80 rounded-2xl p-5 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Category 2</span>
                <h3 className="font-bold text-white text-base">Functional &amp; Itinerary State</h3>
                <p className="text-xs text-slate-400">
                  Remembers your selected transit services (hotel pods, dining, chauffeur transfer, express spa), flight
                  timings, terminal selection (T1/T2), and pricing currency preferences (INR/USD/EUR).
                </p>
              </div>

              <div className="bg-slate-800/50 border border-slate-700/80 rounded-2xl p-5 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Category 3</span>
                <h3 className="font-bold text-white text-base">Payment &amp; Security Verification</h3>
                <p className="text-xs text-slate-400">
                  Enables secure tokenized checkout via Razorpay, PCI-DSS Level 1 compliance verification, fraud detection,
                  and 3D Secure bank OTP validation.
                </p>
              </div>

              <div className="bg-slate-800/50 border border-slate-700/80 rounded-2xl p-5 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Category 4</span>
                <h3 className="font-bold text-white text-base">Performance &amp; Diagnostics</h3>
                <p className="text-xs text-slate-400">
                  Anonymized page latency, error logging, and high-traffic route calculation telemetry (OSRM transit routing)
                  to optimize server speeds and prevent downtime during airport peak flight hours.
                </p>
              </div>
            </div>
          </div>

          {/* 3. Detailed Cookie Inventory Table */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white">3. Inventory of Cookies Used on LayoverX</h2>
            <p className="text-slate-400 text-xs">
              Below is an itemized breakdown of the primary cookies and storage tokens utilized across layoverx.in:
            </p>

            <div className="overflow-x-auto rounded-xl border border-slate-700">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-800 text-slate-200">
                    <th className="text-left px-4 py-3 font-bold">Cookie Name</th>
                    <th className="text-left px-4 py-3 font-bold">Provider / Domain</th>
                    <th className="text-left px-4 py-3 font-bold">Purpose</th>
                    <th className="text-left px-4 py-3 font-bold">Type</th>
                    <th className="text-left px-4 py-3 font-bold">Lifespan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  <tr>
                    <td className="px-4 py-3 font-mono text-sky-300">sb-access-token</td>
                    <td className="px-4 py-3">LayoverX / Supabase</td>
                    <td className="px-4 py-3">Maintains authenticated user session &amp; profile access</td>
                    <td className="px-4 py-3 font-semibold text-emerald-400">Essential</td>
                    <td className="px-4 py-3 text-slate-400">Session (1 hour)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-sky-300">sb-refresh-token</td>
                    <td className="px-4 py-3">LayoverX / Supabase</td>
                    <td className="px-4 py-3">Securely refreshes authentication token without re-login</td>
                    <td className="px-4 py-3 font-semibold text-emerald-400">Essential</td>
                    <td className="px-4 py-3 text-slate-400">7 days</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-sky-300">layoverx_itinerary_items</td>
                    <td className="px-4 py-3">LayoverX (Local Storage)</td>
                    <td className="px-4 py-3">Caches active transit items and selection order</td>
                    <td className="px-4 py-3 font-semibold text-sky-400">Functional</td>
                    <td className="px-4 py-3 text-slate-400">Persistent (30 days)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-sky-300">layoverx_saved_plans</td>
                    <td className="px-4 py-3">LayoverX (Local Storage)</td>
                    <td className="px-4 py-3">Stores saved itinerary drafts in user control panel</td>
                    <td className="px-4 py-3 font-semibold text-sky-400">Functional</td>
                    <td className="px-4 py-3 text-slate-400">Persistent</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-sky-300">layoverx_calculator_data</td>
                    <td className="px-4 py-3">LayoverX (Local Storage)</td>
                    <td className="px-4 py-3">Stores landing and departure timestamps for buffer computation</td>
                    <td className="px-4 py-3 font-semibold text-sky-400">Functional</td>
                    <td className="px-4 py-3 text-slate-400">Session</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-sky-300">rzp_checkout_anon_id</td>
                    <td className="px-4 py-3">Razorpay (razorpay.com)</td>
                    <td className="px-4 py-3">Payment order security verification &amp; tokenization</td>
                    <td className="px-4 py-3 font-semibold text-purple-400">Payment</td>
                    <td className="px-4 py-3 text-slate-400">Session</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-sky-300">cf_clearance / __cf_bm</td>
                    <td className="px-4 py-3">Cloudflare</td>
                    <td className="px-4 py-3">Bot detection, rate limiting, and DDoS security protection</td>
                    <td className="px-4 py-3 font-semibold text-emerald-400">Security</td>
                    <td className="px-4 py-3 text-slate-400">30 mins – 1 year</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 4. Third-Party Cookies */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white">4. Third-Party Integrations</h2>
            <p>
              When completing transit bookings on LayoverX, certain trusted third-party partners may set cookies on
              your browser to execute payment processing and map routing:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-slate-400">
              <li>
                <strong className="text-slate-200">Razorpay Software Private Limited:</strong> Handles tokenized payment
                gateways, UPI intents, and card compliance. Read their{' '}
                <a
                  href="https://razorpay.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:underline"
                >
                  Privacy &amp; Cookie Policy
                </a>
                .
              </li>
              <li>
                <strong className="text-slate-200">Supabase Inc.:</strong> Manages encrypted user session tokens and row-level
                security controls for your account.
              </li>
              <li>
                <strong className="text-slate-200">Project OSRM / OpenStreetMap:</strong> Computes real-time road driving
                durations between CSMIA T2 and off-terminal partner venues with zero personal tracking.
              </li>
            </ul>
          </div>

          {/* 5. How to Control Cookies */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white">5. How to Control &amp; Disable Cookies</h2>
            <p>
              Most web browsers allow you to manage or block cookies through their application settings. Please note that
              blocking strictly necessary or functional cookies will prevent you from creating itineraries or completing
              secure bookings on LayoverX.
            </p>
            <p className="text-xs text-slate-400">
              To manage cookies in your browser:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-slate-400 text-xs">
              <li><strong className="text-slate-200">Google Chrome:</strong> Settings → Privacy &amp; Security → Third-party cookies</li>
              <li><strong className="text-slate-200">Apple Safari:</strong> Preferences / Settings → Privacy → Block all cookies</li>
              <li><strong className="text-slate-200">Mozilla Firefox:</strong> Settings → Privacy &amp; Security → Cookies and Site Data</li>
              <li><strong className="text-slate-200">Microsoft Edge:</strong> Settings → Cookies and site permissions → Manage and delete cookies</li>
            </ul>
          </div>

          {/* 6. Grievance Redressal & Contact */}
          <div className="space-y-3 pb-4">
            <h2 className="text-lg font-bold text-white">6. Grievance Officer &amp; Contact</h2>
            <p>
              If you have any questions about our use of cookies or privacy practices, please contact our designated Grievance
              Officer:
            </p>
            <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-5 space-y-1">
              <p className="text-slate-200 font-semibold">Nodal Grievance Officer — LayoverX</p>
              <p>
                Email:{' '}
                <a href="mailto:privacy@layoverx.in" className="text-sky-400 hover:underline font-semibold">
                  privacy@layoverx.in
                </a>
              </p>
              <p>
                General Support:{' '}
                <a href="mailto:support@layoverx.in" className="text-sky-400 hover:underline font-semibold">
                  support@layoverx.in
                </a>
              </p>
              <p className="text-slate-500 text-xs mt-2">
                Address: CSMIA Terminal 2, Exit Gate 2 Arrivals Concierge Desk, Sahar, Andheri East, Mumbai, Maharashtra 400099
              </p>
            </div>
          </div>

          {/* Related Legal Documents */}
          <div className="border-t border-slate-700 pt-8 pb-4 space-y-3">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Related Legal Documents:</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/terms"
                className="text-xs bg-slate-800 hover:bg-slate-700 border border-slate-600 text-sky-400 px-4 py-2 rounded-lg transition-colors"
              >
                1. Website Terms &amp; Conditions →
              </Link>
              <Link
                href="/privacy"
                className="text-xs bg-slate-800 hover:bg-slate-700 border border-slate-600 text-sky-400 px-4 py-2 rounded-lg transition-colors"
              >
                2. Privacy Policy →
              </Link>
              <Link
                href="/refund-policy"
                className="text-xs bg-slate-800 hover:bg-slate-700 border border-slate-600 text-sky-400 px-4 py-2 rounded-lg transition-colors font-bold"
              >
                4. Refund Policy →
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
