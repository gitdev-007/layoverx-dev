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
  AlertTriangle,
  FileText,
  Building2,
  Phone,
  Info,
  MapPin,
  Scale,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cookie Policy | LayoverX — Verified Browser Storage & Tracking',
  description:
    'Comprehensive disclosure of the verified browser cookies, local storage mechanisms, authentication tokens, and payment scripts utilized on LayoverX.',
  alternates: { canonical: '/cookie-policy' },
};

const Placeholder: React.FC<{ text: string }> = ({ text }) => (
  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-300 font-mono text-xs font-bold tracking-tight">
    {text}
  </span>
);

const sections = [
  { id: 'introduction-and-definition', title: '1. What Are Cookies & Browser Storage' },
  { id: 'cookie-categories', title: '2. Categories of Cookies We Use' },
  { id: 'inventory-table', title: '3. Verified Cookie & Storage Inventory' },
  { id: 'local-storage', title: '4. Client-Side Local Storage & My Itinerary' },
  { id: 'third-parties', title: '5. Third-Party Technologies & Scripts' },
  { id: 'consent-and-controls', title: '6. Cookie Consent & Controls' },
  { id: 'browser-instructions', title: '7. How to Manage Cookies in Your Browser' },
  { id: 'updates-and-contact', title: '8. Policy Updates & Grievance Redressal' },
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
              🍪 TRANSPARENCY &amp; TRACKING GOVERNANCE
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Cookie Policy
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Comprehensive disclosure of the verified browser cookies, local storage mechanisms, authentication tokens, and payment scripts utilized on LayoverX.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-sky-400" /> Last Updated: 25 September 2026
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> DPDP Act 2023 Compliant
              </span>
              <span className="flex items-center gap-1.5">
                <Settings className="w-3.5 h-3.5 text-sky-400" /> Direct Browser Controls
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-sky-400" /> Mumbai, India
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
                Cookie Topics (8 Sections)
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

            {/* Offline-Ready Storage Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-sky-400" />
                <h3 className="font-bold text-sm">Airport Connection Resilience</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                LayoverX uses browser local storage so your stopover itinerary, time calculations, and bookings remain intact even if your mobile roaming disconnects inside CSMIA T2.
              </p>
              <div className="pt-2 text-[11px] text-slate-400 space-y-1 border-t border-slate-800">
                <div>• Zero Cross-Site Advertising Trackers</div>
                <div>• Privacy Desk: <Placeholder text="[PRIVACY EMAIL]" /></div>
                <div>• Grievance Desk: <Placeholder text="[GRIEVANCE EMAIL]" /></div>
              </div>
            </div>
          </aside>

          {/* MAIN DOCUMENT CARD */}
          <main className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-10 text-sm leading-relaxed text-slate-700">
            
            {/* 1. What Are Cookies & Storage */}
            <div id="introduction-and-definition" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                1. What Are Cookies &amp; Browser Storage Technologies?
              </h2>
              <p>
                LayoverX (&ldquo;LayoverX,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) uses cookies and similar web storage technologies to operate our transit concierge platform (
                <a href="https://www.layoverx.in/" className="text-[#0369a1] font-semibold hover:underline">
                  https://www.layoverx.in/
                </a>
                ), maintain secure passenger sessions, compute flight buffer timelines, safeguard payment transactions, and remember your stopover preferences.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <strong className="text-slate-900 font-bold block text-sm flex items-center gap-1.5">
                    <Cookie className="w-4 h-4 text-[#0369a1]" /> HTTP Cookies:
                  </strong>
                  <p className="text-slate-600 leading-relaxed">
                    Small data files stored on your web browser by a website server. Cookies allow our platform to recognize your browser on subsequent visits, authenticate your user account, and deliver secure session continuity.
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <strong className="text-slate-900 font-bold block text-sm flex items-center gap-1.5">
                    <Database className="w-4 h-4 text-[#0369a1]" /> Local Storage:
                  </strong>
                  <p className="text-slate-600 leading-relaxed">
                    Client-side browser storage that allows our itinerary builder to cache your flight schedules, selected transit hotels, dining venues, and custom draft plans locally on your device without transmitting unnecessary data on every page reload.
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-500">
                These technologies are deployed strictly to provide essential transit functionality, secure checkout flows, and seamless planning for travelers visiting Mumbai CSMIA Terminal 2.
              </p>
            </div>

            {/* 2. Categories of Cookies We Use */}
            <div id="cookie-categories" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                2. Categories of Cookies We Use
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0369a1]">Category A</span>
                  <h3 className="font-bold text-slate-900 text-base">Strictly Necessary</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Crucial for core platform operations, Supabase user authentication, maintaining secure sessions across page reloads, and bot protection (Cloudflare). The platform cannot operate properly without these essential mechanisms.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Category B</span>
                  <h3 className="font-bold text-slate-900 text-base">Functional &amp; Itinerary State</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Enables our &ldquo;My Itinerary&rdquo; engine and layover calculator to remember your flight landing/departure times, pinned experiences (pods, spas, dining, transfers), draft plans, and UI preferences (such as dark mode toggle).
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-700">Category C</span>
                  <h3 className="font-bold text-slate-900 text-base">Payment &amp; Security</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Deployed during checkout by our authorized payment provider (Razorpay) to verify order tokens, authenticate transactions, prevent payment fraud, and validate 3D Secure bank OTP challenges.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Category D</span>
                  <h3 className="font-bold text-slate-900 text-base">Performance &amp; Diagnostics</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Used to measure platform stability, load times, and API responsiveness (such as OSRM drive-time calculations for Mumbai transfers). If Google Analytics is enabled in production, it collects aggregated, non-identifying visitor volume metrics.
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Detailed Inventory Table */}
            <div id="inventory-table" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                3. Verified Cookie &amp; Storage Inventory
              </h2>
              <p className="text-xs text-slate-600">
                The table below provides a verified inventory of the actual cookies, storage keys, and client-side tokens implemented across the LayoverX production codebase:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-slate-100/80 text-slate-800 border-b border-slate-200">
                      <th className="text-left px-4 py-3.5 font-bold">Key / Cookie Name</th>
                      <th className="text-left px-4 py-3.5 font-bold">Provider</th>
                      <th className="text-left px-4 py-3.5 font-bold">Purpose</th>
                      <th className="text-left px-4 py-3.5 font-bold">Category</th>
                      <th className="text-left px-4 py-3.5 font-bold">Duration</th>
                      <th className="text-left px-4 py-3.5 font-bold">Type</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/60">
                      <td className="px-4 py-3 font-mono font-semibold text-[#0369a1]">sb-auth-token</td>
                      <td className="px-4 py-3">LayoverX / Supabase</td>
                      <td className="px-4 py-3">Encrypted JWT user authentication session token and automatic token refresh</td>
                      <td className="px-4 py-3 font-bold text-emerald-700">Strictly Necessary</td>
                      <td className="px-4 py-3 text-slate-500">7 days</td>
                      <td className="px-4 py-3">First Party (.layoverx.in)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="px-4 py-3 font-mono font-semibold text-[#0369a1]">layoverx_calculator_data</td>
                      <td className="px-4 py-3">LayoverX</td>
                      <td className="px-4 py-3">Caches flight landing &amp; departure times, airline codes, and calculated buffer windows in browser</td>
                      <td className="px-4 py-3 font-bold text-[#0369a1]">Functional</td>
                      <td className="px-4 py-3 text-slate-500">Persistent (Local Storage)</td>
                      <td className="px-4 py-3">First Party</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="px-4 py-3 font-mono font-semibold text-[#0369a1]">layoverx_draft</td>
                      <td className="px-4 py-3">LayoverX</td>
                      <td className="px-4 py-3">Stores active layover draft selections (pinned hotel pod, dining, spa, or transfers) and estimated budget</td>
                      <td className="px-4 py-3 font-bold text-[#0369a1]">Functional</td>
                      <td className="px-4 py-3 text-slate-500">Persistent (Local Storage)</td>
                      <td className="px-4 py-3">First Party</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="px-4 py-3 font-mono font-semibold text-[#0369a1]">layoverx_itinerary_items_anon</td>
                      <td className="px-4 py-3">LayoverX</td>
                      <td className="px-4 py-3">Maintains guest/unauthenticated itinerary selections before account login or checkout sync</td>
                      <td className="px-4 py-3 font-bold text-[#0369a1]">Functional</td>
                      <td className="px-4 py-3 text-slate-500">Persistent (Local Storage)</td>
                      <td className="px-4 py-3">First Party</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="px-4 py-3 font-mono font-semibold text-[#0369a1]">layoverx_saved_plans_anon</td>
                      <td className="px-4 py-3">LayoverX</td>
                      <td className="px-4 py-3">Stores saved multi-service layover plans for guest users prior to account creation</td>
                      <td className="px-4 py-3 font-bold text-[#0369a1]">Functional</td>
                      <td className="px-4 py-3 text-slate-500">Persistent (Local Storage)</td>
                      <td className="px-4 py-3">First Party</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="px-4 py-3 font-mono font-semibold text-[#0369a1]">layoverx_dark_mode</td>
                      <td className="px-4 py-3">LayoverX</td>
                      <td className="px-4 py-3">Stores light/dark UI contrast preference toggle</td>
                      <td className="px-4 py-3 font-bold text-[#0369a1]">Functional</td>
                      <td className="px-4 py-3 text-slate-500">Persistent (Local Storage)</td>
                      <td className="px-4 py-3">First Party</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="px-4 py-3 font-mono font-semibold text-[#0369a1]">rzp_checkout_anon_id</td>
                      <td className="px-4 py-3">Razorpay</td>
                      <td className="px-4 py-3">Payment checkout order tokenization, fraud risk analysis, and bank gateway handoff</td>
                      <td className="px-4 py-3 font-bold text-purple-700">Payment / Security</td>
                      <td className="px-4 py-3 text-slate-500">Session</td>
                      <td className="px-4 py-3">Third Party (checkout.razorpay.com)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="px-4 py-3 font-mono font-semibold text-[#0369a1]">cf_clearance / __cf_bm</td>
                      <td className="px-4 py-3">Cloudflare</td>
                      <td className="px-4 py-3">Automated bot mitigation, DDoS rate-limiting, and Turnstile security challenges</td>
                      <td className="px-4 py-3 font-bold text-emerald-700">Strictly Necessary</td>
                      <td className="px-4 py-3 text-slate-500">30 minutes – 1 year</td>
                      <td className="px-4 py-3">First / Third Party</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="px-4 py-3 font-mono font-semibold text-[#0369a1]">_ga / _ga_* (Conditional)</td>
                      <td className="px-4 py-3">Google Analytics</td>
                      <td className="px-4 py-3">Measures aggregated page visitor numbers and booking funnel completion rates (active only when GA ID is configured)</td>
                      <td className="px-4 py-3 font-bold text-amber-700">Analytics</td>
                      <td className="px-4 py-3 text-slate-500">2 years</td>
                      <td className="px-4 py-3">Third Party</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 4. Local Storage & My Itinerary */}
            <div id="local-storage" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                4. Client-Side Local Storage &amp; My Itinerary
              </h2>
              <p>
                Our core planning tool, &ldquo;My Itinerary&rdquo;, heavily leverages HTML5 Local Storage directly within your browser. This architectural decision guarantees that:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600 text-xs sm:text-sm">
                <li>Your chosen stopover activities (e.g., Niranta hotel pod, express spa treatment, chauffeur airport pickup) remain intact if you accidentally refresh or close the page.</li>
                <li>Your estimated schedule remains accessible even if you experience temporary mobile data dropouts while taxiing on the runway or moving through CSMIA Terminal 2.</li>
                <li>When you subsequently register an account or log in, your draft plans automatically sync to your user profile.</li>
              </ul>
              <div className="bg-sky-50 border border-sky-200/80 rounded-2xl p-4 text-sky-950 text-xs sm:text-sm space-y-1.5">
                <p className="font-bold text-[#0369a1] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#0369a1]" /> Local Storage Security Guarantee:
                </p>
                <p>
                  LayoverX never stores sensitive payment credentials, credit/debit card numbers, CVVs, passwords, or government identity scans in local storage. All data cached in local storage consists purely of operational transit schedules and preference flags.
                </p>
                <p className="text-slate-600 text-xs">
                  You can clear your local storage at any time through your browser settings. Doing so will immediately reset any unsaved draft itineraries on that device.
                </p>
              </div>
            </div>

            {/* 5. Third-Party Technologies */}
            <div id="third-parties" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                5. Third-Party Technologies &amp; Scripts
              </h2>
              <p>
                To provide verified airport concierge operations, LayoverX integrates with specific enterprise service providers:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 text-xs sm:text-sm">
                <li>
                  <strong className="text-slate-900">Razorpay Software Private Limited:</strong> Supplies the client-side checkout script (<code className="text-xs font-mono text-slate-800">checkout.razorpay.com</code>) used to launch the secure payment modal, manage 3D Secure bank redirects, and securely process transactions without exposing card data to LayoverX.
                </li>
                <li>
                  <strong className="text-slate-900">Supabase Inc.:</strong> Manages encrypted user session cookies and authentication tokens for passengers accessing their booking dashboards and saved itineraries.
                </li>
                <li>
                  <strong className="text-slate-900">Cloudflare Inc.:</strong> Provides Content Delivery Network (CDN) edge caching, DDoS mitigation, and Turnstile bot protection to safeguard platform availability during peak arrival periods.
                </li>
                <li>
                  <strong className="text-slate-900">Project OSRM / OpenStreetMap:</strong> Computes driving distances and travel time estimates between CSMIA T2 and off-airport hotels, restaurants, or South Mumbai excursions without recording personal identity.
                </li>
                <li>
                  <strong className="text-slate-900">Google LLC (Google Analytics):</strong> When enabled in production, analyzes aggregated website traffic and navigation patterns without individual passenger tracking.
                </li>
              </ul>
            </div>

            {/* 6. Cookie Consent & Controls */}
            <div id="consent-and-controls" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                6. Cookie Consent &amp; Controls
              </h2>
              <p>
                Because LayoverX relies almost exclusively on strictly necessary session cookies, functional local storage, and payment verification tokens required to assemble itineraries and complete requested bookings, our platform currently relies on direct, transparent browser-level controls rather than an intrusive automated cookie banner.
              </p>
              <p>
                Under the Digital Personal Data Protection Act, 2023, you have the right to be informed about all data technologies deployed on your device. We provide full transparency in this policy so that you can make informed choices using your web browser&rsquo;s built-in cookie and site data management settings.
              </p>
              <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 text-amber-950 text-xs sm:text-sm space-y-1">
                <p className="font-bold text-amber-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" /> Impact of Disabling Cookies:
                </p>
                <p>
                  You are free to block or clear cookies at any time. However, because our authentication, itinerary builder, and checkout gateway rely on these technical identifiers, blocking or clearing them will result in:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-700 text-xs">
                  <li>Inability to log in or maintain your active user session.</li>
                  <li>Immediate loss of unsaved draft itineraries and flight time calculations.</li>
                  <li>Failure of the Razorpay payment checkout modal to initialize or verify orders.</li>
                </ul>
              </div>
            </div>

            {/* 7. Browser Instructions */}
            <div id="browser-instructions" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                7. How to Manage Cookies in Your Browser
              </h2>
              <p>
                Most modern web browsers allow you to review, block, or delete cookies and site storage for specific websites. To manage cookies for <strong className="text-slate-900">layoverx.in</strong>, follow the instructions for your respective browser:
              </p>

              <div className="grid sm:grid-cols-2 gap-3 text-xs pt-1">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold text-sm">Google Chrome</strong>
                  <p className="text-slate-600">
                    Go to Settings → Privacy and Security → Third-party cookies. To clear LayoverX data specifically: Settings → Privacy and Security → Site settings → View permissions and data stored across sites → Search &ldquo;layoverx.in&rdquo; → Clear data.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold text-sm">Apple Safari (iOS / macOS)</strong>
                  <p className="text-slate-600">
                    On Mac: Safari → Settings (or Preferences) → Privacy → Manage Website Data → Search &ldquo;layoverx.in&rdquo; → Remove. On iPhone/iPad: Settings → Safari → Advanced → Website Data → Remove layoverx.in.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold text-sm">Mozilla Firefox</strong>
                  <p className="text-slate-600">
                    Go to Settings → Privacy &amp; Security → Cookies and Site Data → Manage Data → Type &ldquo;layoverx.in&rdquo; → Remove Selected.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold text-sm">Microsoft Edge</strong>
                  <p className="text-slate-600">
                    Go to Settings → Cookies and site permissions → Manage and delete cookies and site data → See all cookies and site data → Search &ldquo;layoverx.in&rdquo; → Delete.
                  </p>
                </div>
              </div>
            </div>

            {/* 8. Updates & Grievance */}
            <div id="updates-and-contact" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                8. Policy Updates &amp; Grievance Redressal
              </h2>
              <p>
                LayoverX may update this Cookie Policy from time to time to reflect modifications in our software architecture, new partner integrations, or evolving regulatory standards under Indian law.
              </p>
              <p>
                Any changes will be posted on this page with an updated &ldquo;Last Updated&rdquo; date. We advise travelers to review this policy periodically when planning stopovers through CSMIA T2.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3 mt-4">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#0369a1]" />
                  <h3 className="font-bold text-slate-900 text-sm">Cookie &amp; Privacy Redressal Desk</h3>
                </div>
                <p className="text-xs text-slate-600">
                  If you have questions regarding our deployment of cookies, local storage mechanisms, or third-party scripts, please contact our data governance team:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 pt-1">
                  <div>
                    <span className="text-slate-500 block font-medium">Nodal Grievance Officer:</span>
                    <Placeholder text="[GRIEVANCE OFFICER]" />
                  </div>
                  <div>
                    <span className="text-slate-500 block font-medium">Designated Entity:</span>
                    <Placeholder text="[LEGAL ENTITY NAME]" />
                  </div>
                  <div>
                    <span className="text-slate-500 block font-medium">Registered Office:</span>
                    <Placeholder text="[REGISTERED ADDRESS]" />
                  </div>
                  <div>
                    <span className="text-slate-500 block font-medium">Grievance Desk Email:</span>
                    <Placeholder text="[GRIEVANCE EMAIL]" />
                  </div>
                  <div>
                    <span className="text-slate-500 block font-medium">Privacy Desk Email:</span>
                    <Placeholder text="[PRIVACY EMAIL]" />
                  </div>
                  <div>
                    <span className="text-slate-500 block font-medium">Support Desk Email:</span>
                    <Placeholder text="[SUPPORT EMAIL]" />
                  </div>
                  <div>
                    <span className="text-slate-500 block font-medium">Customer Support Phone:</span>
                    <Placeholder text="[SUPPORT PHONE]" />
                  </div>
                  <div>
                    <span className="text-slate-500 block font-medium">Response Timeline:</span>
                    <span>Acknowledgment within 48 hours; resolution within 30 days</span>
                  </div>
                </div>
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
                  <p className="text-sm font-bold text-slate-900 group-hover:text-[#0369a1]">Privacy Policy →</p>
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
