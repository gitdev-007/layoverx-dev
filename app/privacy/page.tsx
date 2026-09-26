import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  UserCheck,
  EyeOff,
  Database,
  Scale,
  Mail,
  Clock,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Building2,
  Phone,
  Info,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy (DPDP) | LayoverX — Transit Concierge Data Governance',
  description:
    'Comprehensive disclosure of personal data processing, lawful bases, passenger rights, and data protection governance under the Digital Personal Data Protection Act, 2023.',
  alternates: { canonical: '/privacy' },
};

const Placeholder: React.FC<{ text: string }> = ({ text }) => (
  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-300 font-mono text-xs font-bold tracking-tight">
    {text}
  </span>
);

const sections = [
  { id: 'who-we-are', title: '1. Who We Are & Governance' },
  { id: 'information-collected', title: '2. Information We Collect' },
  { id: 'how-we-use-information', title: '3. How We Use Your Information' },
  { id: 'consent-and-rights', title: '4. Consent & Your Rights' },
  { id: 'information-sharing', title: '5. Information Sharing & Third Parties' },
  { id: 'international-processing', title: '6. International Processing' },
  { id: 'security-safeguards', title: '7. Security & Safeguards' },
  { id: 'data-retention', title: '8. Data Retention' },
  { id: 'cookies', title: '9. Cookies & Tracking Technologies' },
  { id: 'childrens-data', title: '10. Children’s Data' },
  { id: 'data-breach', title: '11. Data Breach & Incident Response' },
  { id: 'grievance-redressal', title: '12. Grievance Redressal' },
  { id: 'policy-updates', title: '13. Policy Updates & Contact' },
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
              <span className="text-white font-medium">Privacy Policy (DPDP)</span>
            </nav>

            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-sky-500/20 text-sky-300 border border-sky-400/30">
              🛡️ DATA PRIVACY &amp; DPDP COMPLIANCE
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Privacy Policy (DPDP)
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Comprehensive disclosure of personal data processing, lawful bases, passenger rights, and governance standards under the Digital Personal Data Protection Act, 2023.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-sky-400" /> Last Updated: 25 September 2026
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Digital Personal Data Protection Act, 2023
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
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex-shrink-0 transition"
            >
              1. Terms &amp; Conditions
            </Link>
            <Link
              href="/privacy"
              className="px-4 py-2 rounded-xl bg-[#0369a1] text-white flex-shrink-0 shadow-xs"
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
                Privacy Topics (13 Sections)
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

            {/* Zero-Sale Guarantee Card */}
            <div className="bg-emerald-950 text-white rounded-3xl p-6 shadow-sm space-y-3 border border-emerald-900">
              <div className="flex items-center gap-2">
                <EyeOff className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-sm">Zero Data Selling Guarantee</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                LayoverX never sells, rents, monetizes, or trades customer personal data with advertising networks or third-party data brokers. Data is processed solely to fulfill your requested transit arrangements.
              </p>
              <div className="pt-2 text-[11px] text-emerald-300 space-y-1">
                <div>• Operated by: <Placeholder text="[LEGAL ENTITY NAME]" /></div>
                <div>• Privacy Desk: <Placeholder text="[PRIVACY EMAIL]" /></div>
                <div>• Grievance Desk: <Placeholder text="[GRIEVANCE EMAIL]" /></div>
                <div>• Phone: <Placeholder text="[SUPPORT PHONE]" /></div>
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
                LayoverX (&ldquo;LayoverX,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates an Indian transit-concierge and booking-facilitation platform via{' '}
                <a href="https://www.layoverx.in/" className="text-[#0369a1] font-semibold hover:underline">
                  https://www.layoverx.in/
                </a>
                . The platform is operated by <Placeholder text="[LEGAL ENTITY NAME]" />, having its registered office at{' '}
                <Placeholder text="[REGISTERED ADDRESS]" />.
              </p>
              <p>
                LayoverX assists domestic and international transit passengers with stopovers around <strong className="text-slate-900">Chhatrapati Shivaji Maharaj International Airport, Terminal 2 (CSMIA T2), Mumbai, Maharashtra, India</strong>, by enabling them to discover, plan, bundle, and book micro-stay transit hotel pods, dining reservations, express wellness treatments, airport transfers, city excursions, gaming pods, and executive workspaces.
              </p>
              <div className="bg-sky-50 border border-sky-200/80 rounded-2xl p-4 text-sky-950 text-xs sm:text-sm space-y-1.5">
                <p className="font-bold text-[#0369a1] flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-[#0369a1]" /> Primary Legal Framework:
                </p>
                <p>
                  This Privacy Policy is formulated primarily around the <strong className="font-semibold text-slate-900">Digital Personal Data Protection Act, 2023 (DPDP Act)</strong> and the applicable rules and regulations made thereunder, including the Digital Personal Data Protection Rules, 2025 as applicable.
                </p>
                <p className="text-slate-600 text-xs">
                  Where statutory provisions under the DPDP framework are subject to phased notification and staggered operationalization by the Central Government, LayoverX adheres to notified rules and continues to uphold established principles of fair information practices under applicable Indian law, including the Information Technology Act, 2000.
                </p>
              </div>
            </div>

            {/* 2. Information We Collect */}
            <div id="information-collected" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                2. Information We Collect
              </h2>
              <p>
                We practice data minimization. LayoverX collects only personal data that is genuinely required to provide our itinerary planning engine, process concierge bookings, facilitate communication, and fulfill legal compliance:
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <strong className="text-slate-900 text-xs uppercase tracking-wider font-bold block text-[#0369a1]">
                    A. Identity Information
                  </strong>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Primary passenger full name, traveling companion names, age or date of birth (only where specifically necessitated by service-partner minimum age rules, such as hotel pod check-in or spa therapy restrictions), and nationality (only where necessary to confirm transit visa eligibility or airport zone clearance).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <strong className="text-slate-900 text-xs uppercase tracking-wider font-bold block text-[#0369a1]">
                    B. Contact Details
                  </strong>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Email address for dispatching digital booking confirmations, vouchers, and invoice receipts; mobile phone number for urgent SMS updates; and WhatsApp number where you explicitly opt in to receive real-time concierge alerts, driver coordination, and gate status messages.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <strong className="text-slate-900 text-xs uppercase tracking-wider font-bold block text-[#0369a1]">
                    C. Flight &amp; Transit Telemetry
                  </strong>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Inbound airline and flight number, arrival date and scheduled time, outbound airline and flight number, departure date and scheduled time, airport terminal details (CSMIA T2), total passenger count, and calculated layover duration. This data allows our engine to compute realistic activity schedules and buffer windows.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <strong className="text-slate-900 text-xs uppercase tracking-wider font-bold block text-[#0369a1]">
                    D. Booking &amp; Reservation Details
                  </strong>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Unique LayoverX Booking ID, selected transit venues (hotel room pod tier, restaurant dining reservations, express spa treatments, chauffeur transfer routes, guided city excursions, or executive gaming stations), scheduled service time slots, guest special requests, and cancellation/refund records.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <strong className="text-slate-900 text-xs uppercase tracking-wider font-bold block text-[#0369a1]">
                    E. Payment &amp; Transaction References
                  </strong>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Transaction ID, payment gateway Order ID, payment status (successful, pending, failed), refund reference numbers, payment method chosen (e.g., UPI, credit/debit card, net banking), and encrypted token identifiers supplied by our authorized payment provider.
                  </p>
                  <div className="bg-sky-50 border border-sky-200 rounded-xl p-2.5 mt-2 text-xs text-sky-950 font-semibold">
                    🔒 Important Payment Credential Protection: LayoverX does NOT collect, process, or store raw credit or debit card numbers, CVV codes, card expiration dates, or bank account passwords on our servers. All financial transactions take place within the secure, PCI-DSS compliant environment of our authorized payment gateway.
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <strong className="text-slate-900 text-xs uppercase tracking-wider font-bold block text-[#0369a1]">
                    F. Technical &amp; Device Information
                  </strong>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Internet Protocol (IP) address, browser type and version, device operating system, session identifier, security log timestamps, essential session cookies, and local browser storage (used strictly to cache your active itinerary drafts on your device).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <strong className="text-slate-900 text-xs uppercase tracking-wider font-bold block text-[#0369a1]">
                    G. Itinerary Processing Data
                  </strong>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    When using the &ldquo;My Itinerary&rdquo; planning tool, we process your selected services, flight timings, transit buffer calculations, and saved draft parameters to organize your layover schedule.
                  </p>
                </div>
              </div>

              {/* Sub-section on Government IDs */}
              <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 text-amber-950 text-xs sm:text-sm space-y-2 mt-4">
                <p className="font-bold text-amber-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" /> Government Identity Documents:
                </p>
                <p>
                  <strong className="font-semibold text-slate-900">LayoverX does NOT routinely collect, scan, upload, or store government identity documents</strong> (such as Aadhaar cards, Passports, PAN cards, Voter IDs, or Driving Licenses) through our website or standard booking flow.
                </p>
                <p className="text-slate-700">
                  Where an independent third-party provider (such as an airport transit hotel, chauffeur partner, or airport lounge) is mandated by Indian law, local police hotel guest registration rules (Form C for foreign nationals), or airport security (CISF) regulations to verify passenger identity, such physical inspection is conducted directly by the provider upon your arrival at the venue. If any specific service exceptionally requires advance identity submission, only strictly necessary information will be requested with explicit prior disclosure.
                </p>
              </div>
            </div>

            {/* 3. How We Use Your Information */}
            <div id="how-we-use-information" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                3. How We Use Your Information
              </h2>
              <p>We process your personal data strictly for defined, legitimate purposes connected to our transit-concierge services:</p>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600 text-xs sm:text-sm">
                <li><strong className="text-slate-900">Account &amp; Session Management:</strong> Authenticating users, managing customer profiles, and preserving saved itinerary drafts.</li>
                <li><strong className="text-slate-900">Itinerary Assembly &amp; Feasibility:</strong> Calculating transit time windows, estimating buffer periods, and assembling realistic layover schedules.</li>
                <li><strong className="text-slate-900">Booking Execution:</strong> Confirming reservations with independent hotel pod, restaurant, spa, transfer, and tour providers at or near CSMIA T2.</li>
                <li><strong className="text-slate-900">Payment &amp; Invoicing:</strong> Facilitating electronic payment verification, issuing official GST-compliant tax invoices, and processing eligible refunds.</li>
                <li><strong className="text-slate-900">Voucher &amp; Confirmation Issuance:</strong> Generating digital booking confirmations, e-vouchers, and QR access codes.</li>
                <li><strong className="text-slate-900">Passenger Communications &amp; Support:</strong> Delivering service reminders, chauffeur pickup directions, flight delay adjustments, and resolving support inquiries.</li>
                <li><strong className="text-slate-900">Safety, Fraud Prevention &amp; Platform Security:</strong> Detecting unauthorized transactions, preventing fraudulent reservations, verifying payment integrity, and protecting platform infrastructure.</li>
                <li><strong className="text-slate-900">Statutory &amp; Regulatory Compliance:</strong> Retaining mandatory accounting records, complying with tax regulations, responding to lawful governmental directives, and cooperating with consumer dispute bodies.</li>
                <li><strong className="text-slate-900">Platform Enhancement:</strong> Evaluating user navigation flows, correcting technical bugs, and improving concierge reliability.</li>
              </ul>
            </div>

            {/* 4. Consent & Your Rights */}
            <div id="consent-and-rights" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                4. Consent &amp; Your Rights Under the DPDP Framework
              </h2>
              <p>
                In accordance with the Digital Personal Data Protection Act, 2023, processing of personal data is carried out on lawful bases, primarily: (i) your informed, specific, unambiguous, and clear consent; (ii) the performance of a contract or steps necessary to fulfill your requested bookings; and (iii) compliance with legal obligations.
              </p>
              
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm mb-2">
                    Your Statutory Rights as a Data Principal:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-white border border-slate-200/80">
                      <strong className="text-slate-900 block font-bold mb-0.5">1. Right to Access Information:</strong>
                      Request a summary of your personal data processed by LayoverX and the identities of third parties with whom it has been shared.
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-slate-200/80">
                      <strong className="text-slate-900 block font-bold mb-0.5">2. Right to Correction &amp; Updating:</strong>
                      Request correction of inaccurate, misleading, or outdated personal, flight, or contact details.
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-slate-200/80">
                      <strong className="text-slate-900 block font-bold mb-0.5">3. Right to Erasure:</strong>
                      Request the deletion of your personal data when it is no longer necessary for the purpose for which it was collected or to satisfy legal retention mandates.
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-slate-200/80">
                      <strong className="text-slate-900 block font-bold mb-0.5">4. Right of Grievance Redressal:</strong>
                      Access an effective grievance redressal mechanism regarding any act or omission of LayoverX regarding personal data.
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-slate-200/80 sm:col-span-2">
                      <strong className="text-slate-900 block font-bold mb-0.5">5. Right to Nominate:</strong>
                      Where applicable under the DPDP framework, you have the right to nominate an individual who, in the event of death or incapacity, shall exercise your data principal rights.
                    </div>
                  </div>
                </div>

                {/* Withdrawal of Consent */}
                <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200/80 space-y-2 text-xs sm:text-sm text-sky-950">
                  <p className="font-bold text-[#0369a1] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0369a1]" /> Withdrawal of Consent:
                  </p>
                  <p>
                    Where processing is based on your consent, you have the right to withdraw your consent at any time. You may exercise this right by submitting a written notice to our Privacy Desk at <Placeholder text="[PRIVACY EMAIL]" />.
                  </p>
                  <p className="text-slate-700 text-xs">
                    Please note that withdrawal of consent does not affect the lawfulness of processing carried out prior to withdrawal. Furthermore, if you withdraw consent for essential information (such as flight telemetry or contact details) required to execute a live booking, we may be unable to continue providing or coordinating the affected service, and standard cancellation conditions will apply.
                  </p>
                </div>
              </div>
            </div>

            {/* 5. Information Sharing */}
            <div id="information-sharing" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                5. Information Sharing &amp; Third Parties
              </h2>
              <p>
                LayoverX shares personal data strictly on a need-to-know basis with trusted third parties to execute your transit arrangements:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 text-xs sm:text-sm">
                <li>
                  <strong className="text-slate-900">Third-Party Service Providers:</strong> Independent transit hotels, sleeping pod venues, restaurants, spas, chauffeur fleets, tour operators, and entertainment centers receive only the information necessary to fulfill your reservation (e.g., passenger name, service time, booking reference, and special requests).
                </li>
                <li>
                  <strong className="text-slate-900">Payment Processors:</strong> Authorized, RBI-compliant payment gateway providers (such as Razorpay) process transaction amounts, order IDs, and payment authorizations.
                </li>
                <li>
                  <strong className="text-slate-900">Cloud &amp; Database Infrastructure:</strong> Secure cloud hosting, database management, and content delivery services that maintain our application infrastructure under strict confidentiality terms.
                </li>
                <li>
                  <strong className="text-slate-900">Communications Dispatchers:</strong> Telecommunications, SMS, and messaging providers used to deliver digital booking confirmations, vouchers, and operational flight shift notifications.
                </li>
                <li>
                  <strong className="text-slate-900">Legal &amp; Law Enforcement Authorities:</strong> We may disclose information where required by court order, statutory regulation, lawful search warrant, or government agency directive, or where necessary to prevent fraud or protect the safety of passengers and the public.
                </li>
              </ul>
              
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs text-slate-600">
                <strong className="text-slate-900 block font-bold">Independent Third-Party Data Processing:</strong>
                <p>
                  Independent third-party service partners (such as hotel operators, transport drivers, and wellness clinics) act as independent data fiduciaries or controllers with respect to any information they directly obtain from you upon check-in or during service execution. Their handling of such information is governed by their own independent privacy notices and policies.
                </p>
              </div>
            </div>

            {/* 6. International Processing */}
            <div id="international-processing" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                6. International Processing
              </h2>
              <p>
                Our core operations and concierge support desks are based in India. However, in operating a digital platform, certain enterprise technology vendors, cloud hosting providers, and communication networks may store or process data on servers located outside India.
              </p>
              <p>
                Where cross-border processing occurs, LayoverX ensures that such transfers comply with all applicable requirements of the DPDP framework and Indian law, including ensuring that recipient vendors maintain adequate data security, contractual confidentiality, and organizational safeguards comparable to Indian standards.
              </p>
            </div>

            {/* 7. Security & Safeguards */}
            <div id="security-safeguards" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                7. Security &amp; Safeguards
              </h2>
              <p>
                LayoverX implements reasonable technical, administrative, and physical security measures designed to safeguard personal data against unauthorized access, loss, alteration, disclosure, or destruction.
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600 text-xs sm:text-sm">
                <li>Secure data transmission protocols across the Platform using encrypted web connections.</li>
                <li>Restricted internal access controls ensuring that only authorized personnel have access to passenger booking details.</li>
                <li>Strict separation of transactional records, with sensitive payment credentials handled exclusively within certified payment gateway environments.</li>
                <li>Periodic technical assessments, software patch management, and system monitoring to protect platform integrity.</li>
              </ul>
              <p className="text-xs text-slate-500">
                While we implement comprehensive commercial safeguards, no electronic transmission over the internet or cloud storage system can be guaranteed 100% immune from security vulnerabilities. Passengers are advised to safeguard their own devices, accounts, and one-time passwords.
              </p>
            </div>

            {/* 8. Data Retention */}
            <div id="data-retention" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                8. Data Retention
              </h2>
              <p>
                Personal data is retained only for as long as reasonably necessary to fulfill the specific operational purposes for which it was collected, including:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600 text-xs sm:text-sm">
                <li>Facilitating and delivering your booked layover experiences and concierge support.</li>
                <li>Maintaining customer accounts, service history, and draft itineraries.</li>
                <li>Complying with statutory financial, tax, and accounting retention requirements under Indian laws.</li>
                <li>Investigating, addressing, or defending legal, regulatory, or consumer disputes.</li>
                <li>Preventing recurring fraud, abuse, or unauthorized system access.</li>
              </ul>
              <p className="text-xs text-slate-500">
                When personal data is no longer required for operational, legal, or regulatory purposes, it is securely deleted, anonymized, or destroyed in accordance with our data governance practices.
              </p>
            </div>

            {/* 9. Cookies */}
            <div id="cookies" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                9. Cookies &amp; Tracking Technologies
              </h2>
              <p>
                LayoverX uses essential session cookies, local web storage, and functional tokens to maintain platform navigation, authenticate user sessions, remember active itinerary selections, and analyze performance.
              </p>
              <p>
                For a comprehensive description of the cookies we utilize, their purposes, and browser instructions for managing cookie preferences, please review our dedicated{' '}
                <Link href="/cookie-policy" className="text-[#0369a1] font-bold hover:underline">
                  Cookie Policy &rarr;
                </Link>
              </p>
            </div>

            {/* 10. Children's Data */}
            <div id="childrens-data" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                10. Children’s Data
              </h2>
              <p>
                The LayoverX platform and booking services are intended for individuals who have reached the age of majority (18 years or older) and possess the legal capacity to enter into binding contracts.
              </p>
              <p>
                LayoverX does not knowingly permit children under 18 to independently register accounts or execute bookings. Where an itinerary includes a child or minor passenger, the booking must be created and authorized by a parent, legal guardian, or authorized adult traveling companion. LayoverX complies with applicable statutory requirements concerning children&rsquo;s data under the DPDP Act, 2023.
              </p>
            </div>

            {/* 11. Data Breach & Incident Response */}
            <div id="data-breach" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                11. Data Breach &amp; Incident Response
              </h2>
              <p>
                LayoverX maintains an incident management procedure to identify, contain, assess, and remediate any potential personal data security incidents.
              </p>
              <p>
                In the event of a verified personal data breach that compromises passenger information, LayoverX will take immediate containment steps and issue appropriate notifications to the Data Protection Board of India and affected Data Principals in the form, manner, and timeline mandated by the DPDP Act, 2023 and applicable regulations, as well as to the Indian Computer Emergency Response Team (CERT-In) under the Information Technology Act where required.
              </p>
            </div>

            {/* 12. Grievance Redressal */}
            <div id="grievance-redressal" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                12. Grievance Redressal Mechanism
              </h2>
              <p>
                In compliance with the Digital Personal Data Protection Act, 2023 and the Consumer Protection (E-Commerce) Rules, 2020, LayoverX has appointed a dedicated Nodal Grievance Officer to address any privacy questions, data requests, or disputes:
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#0369a1]" />
                  <h3 className="font-bold text-slate-900 text-sm">Grievance Redressal Desk</h3>
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
                    <span className="text-slate-500 block font-medium">Privacy Desk Email:</span>
                    <Placeholder text="[PRIVACY EMAIL]" />
                  </div>
                  <div>
                    <span className="text-slate-500 block font-medium">Support Desk Email:</span>
                    <Placeholder text="[SUPPORT EMAIL]" />
                  </div>
                  <div>
                    <span className="text-slate-500 block font-medium">Postal Address:</span>
                    <Placeholder text="[REGISTERED ADDRESS]" />
                  </div>
                  <div>
                    <span className="text-slate-500 block font-medium">Telephone / Support:</span>
                    <Placeholder text="[SUPPORT PHONE]" />
                  </div>
                </div>
              </div>

              <p className="font-bold text-slate-900 text-xs sm:text-sm mt-3">
                Submitting a Privacy Concern or Request:
              </p>
              <p className="text-xs text-slate-600">
                To submit a data access, correction, erasure, or consent withdrawal request, please send an email to <Placeholder text="[PRIVACY EMAIL]" /> or <Placeholder text="[GRIEVANCE EMAIL]" /> detailing:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-xs text-slate-600">
                <li>Your full name, registered email address, and phone number</li>
                <li>Your LayoverX Booking ID (if your inquiry relates to an active or past booking)</li>
                <li>The specific right you wish to exercise or a clear description of the privacy concern</li>
                <li>Any supporting information necessary to verify your identity as the Data Principal</li>
              </ul>
              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200/80 text-xs text-sky-950 space-y-1">
                <p className="font-bold text-[#0369a1]">Statutory Redressal Standards:</p>
                <p>
                  • Written grievances are officially acknowledged within <strong className="font-semibold text-slate-900">forty-eight (48) hours</strong> of receipt.
                </p>
                <p>
                  • A formal response and resolution plan will be communicated within <strong className="font-semibold text-slate-900">thirty (30) days</strong>.
                </p>
                <p className="text-slate-600 pt-1">
                  If you remain unsatisfied with our grievance resolution, you may have the right under the DPDP framework to escalate the matter to the Data Protection Board of India in accordance with prescribed rules.
                </p>
              </div>
            </div>

            {/* 13. Policy Updates */}
            <div id="policy-updates" className="space-y-4 scroll-mt-36">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                13. Policy Updates &amp; Contact
              </h2>
              <p>
                LayoverX reserves the right to revise or update this Privacy Policy periodically to reflect changes in our operational procedures, new transit features, or evolving legal standards under the DPDP framework and Indian data protection rules.
              </p>
              <p>
                When modifications are made, the revised policy will be posted on this page with an updated &ldquo;Last Updated&rdquo; date. We encourage passengers to review this Privacy Policy periodically to stay informed about how their personal data is protected.
              </p>
              <p className="text-xs text-slate-500">
                For any questions regarding this Privacy Policy or our data protection practices, please contact our team at <Placeholder text="[PRIVACY EMAIL]" />.
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
