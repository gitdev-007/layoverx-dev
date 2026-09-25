import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | LayoverX — How We Handle Your Data',
  description:
    'Learn how LayoverX collects, uses, and protects your personal information in compliance with the Information Technology Act, 2000 and applicable Indian laws.',
  alternates: { canonical: '/privacy' },
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
            Last updated: 22 September 2026&nbsp;·&nbsp;Applicable to all users of layoverx.in
          </p>
          <p className="text-slate-500 text-xs mt-2">
            This policy explains what personal information we collect when you use the LayoverX platform, how we use
            it, with whom we share it, and what rights you have regarding your information.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-4">
        <div className="max-w-3xl mx-auto space-y-10 text-sm leading-relaxed">

          {/* 1. Who We Are */}
          <div id="who-we-are" className="space-y-3 scroll-mt-28">
            <h2 className="text-lg font-bold text-white">1. Who We Are</h2>
            <p>
              LayoverX is a sole-proprietorship transit concierge platform operating under the brand name{' '}
              <strong className="text-white">LayoverX</strong>, with registered correspondence at{' '}
              <a href="mailto:support@layoverx.in" className="text-sky-400 hover:underline">
                support@layoverx.in
              </a>
              . We operate the website layoverx.in and related digital interfaces to connect transit passengers at
              CSMIA Terminal 2, Mumbai, with verified service partners.
            </p>
            <p>
              This Privacy Policy is governed by the{' '}
              <strong className="text-white">
                Information Technology Act, 2000 and the Information Technology (Reasonable Security Practices and
                Procedures and Sensitive Personal Data or Information) Rules, 2011
              </strong>{' '}
              (&ldquo;IT (SPDI) Rules&rdquo;), issued by the Ministry of Electronics and Information Technology
              (MeitY), Government of India.
            </p>
          </div>

          {/* 2. What We Collect */}
          <div id="data-collected" className="space-y-3 scroll-mt-28">
            <h2 className="text-lg font-bold text-white">2. Information We Collect</h2>
            <p>We collect only the information necessary to deliver our services:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-400">
              <li>
                <strong className="text-slate-200">Identity &amp; Contact:</strong> Full name, email address, and
                phone number provided during account registration or booking.
              </li>
              <li>
                <strong className="text-slate-200">Flight Information:</strong> Flight number, airline code,
                arrival/departure timestamps, and layover duration — collected for real-time slot adjustment and
                delay protection.
              </li>
              <li>
                <strong className="text-slate-200">Travel Documents (landside services only):</strong> Passport
                number or government-issued photo ID — collected solely for CSMIA T2 entry verification where the
                service vendor requires it. We do not retain copies of travel documents beyond the booking window.
              </li>
              <li>
                <strong className="text-slate-200">Payment References:</strong> Tokenized payment references only.
                LayoverX does not collect, store, or process card numbers, CVV codes, or net banking credentials.
                All payment data is handled exclusively by Razorpay (PCI-DSS Level 1 certified).
              </li>
              <li>
                <strong className="text-slate-200">Device &amp; Usage Data:</strong> Browser type, IP address,
                pages visited, and referral source — collected for analytics, fraud prevention, and platform
                performance improvement.
              </li>
            </ul>
            <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 mt-2">
              <p className="text-xs text-slate-400">
                <strong className="text-slate-200">We do not collect</strong> sensitive personal data beyond
                what is listed above. We do not collect caste, religion, political opinions, health data, biometric
                data, or financial records outside of tokenized payment references.
              </p>
            </div>
          </div>

          {/* 3. How We Use It */}
          <div id="data-use" className="space-y-3 scroll-mt-28">
            <h2 className="text-lg font-bold text-white">3. How We Use Your Information</h2>
            <p>Your information is used strictly for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-400">
              <li>
                <strong className="text-slate-200">Booking &amp; Confirmation:</strong> Generating your QR-coded
                e-pass, booking confirmation email, and WhatsApp notification.
              </li>
              <li>
                <strong className="text-slate-200">Flight Delay Alerts:</strong> Sending automatic slot-shift
                notifications via WhatsApp and email when your flight status changes.
              </li>
              <li>
                <strong className="text-slate-200">Vendor Dispatch:</strong> Sharing your name, booking reference,
                and service details with the specific vendor partner who is fulfilling your booking.
              </li>
              <li>
                <strong className="text-slate-200">Customer Support:</strong> Responding to queries, processing
                refund requests, and resolving complaints.
              </li>
              <li>
                <strong className="text-slate-200">Platform Analytics:</strong> Understanding usage patterns
                through anonymized, aggregated data to improve service quality and the booking experience.
              </li>
              <li>
                <strong className="text-slate-200">Legal Compliance:</strong> Meeting obligations under Indian law,
                responding to lawful government requests, and preventing fraud.
              </li>
            </ul>
            <p>
              We process your information on the basis of{' '}
              <strong className="text-white">contractual necessity</strong> (to fulfil a booking you have made),{' '}
              <strong className="text-white">legitimate business interests</strong> (platform security and fraud
              prevention), and where required,{' '}
              <strong className="text-white">your explicit consent</strong> (e.g., marketing communications, which
              you may opt out of at any time).
            </p>
          </div>

          {/* 4. Sharing */}
          <div id="data-sharing" className="space-y-3 scroll-mt-28">
            <h2 className="text-lg font-bold text-white">4. Information Sharing</h2>
            <p>
              We share your personal information only with the following categories of partners, strictly on a
              need-to-know basis:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-400">
              <li>
                <strong className="text-slate-200">Service Vendors:</strong> Hotel operators, restaurant partners,
                spa facilities, transport providers, and tour operators — only for the specific booking you have
                confirmed.
              </li>
              <li>
                <strong className="text-slate-200">Payment Processor:</strong> Razorpay Software Pvt. Ltd., for
                secure payment processing. Razorpay&apos;s privacy policy governs their data practices.
              </li>
              <li>
                <strong className="text-slate-200">Flight Data Providers:</strong> AirLabs / AeroAPI for real-time
                flight status tracking (we share your flight number only).
              </li>
              <li>
                <strong className="text-slate-200">Communication Platforms:</strong> WhatsApp Business API and
                transactional email services for booking notifications and support communications.
              </li>
            </ul>
            <p>
              <strong className="text-white">We do not sell, rent, licence, or trade</strong> your personal
              information to any third-party advertiser, data broker, or marketing firm under any circumstances,
              for any consideration.
            </p>
          </div>

          {/* 5. Security */}
          <div id="security" className="space-y-3 scroll-mt-28">
            <h2 className="text-lg font-bold text-white">5. Security of Your Information</h2>
            <p>
              LayoverX implements reasonable technical and organisational security measures as required under the{' '}
              <strong className="text-white">IT (SPDI) Rules, 2011</strong>, including:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-slate-400">
              <li>HTTPS encryption (TLS 1.2+) across all platform endpoints.</li>
              <li>Tokenized payment processing — no card data stored on our servers.</li>
              <li>Role-based access controls for any personal data held in our systems.</li>
              <li>Regular security reviews of third-party vendor integrations.</li>
            </ul>
            <p>
              While we take reasonable precautions, no internet-based system is completely secure. In the event of a
              data breach affecting your information, we will notify you promptly and take all reasonable remedial
              steps as required by applicable law.
            </p>
          </div>

          {/* 6. Data Retention */}
          <div id="retention" className="space-y-3 scroll-mt-28">
            <h2 className="text-lg font-bold text-white">6. Data Retention</h2>
            <p>
              We retain your personal data only for as long as reasonably necessary to fulfil the purposes for which
              it was collected:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-slate-400">
              <li>
                <strong className="text-slate-200">Booking records:</strong> Retained for{' '}
                <strong className="text-white">24 months</strong> from your last booking date for accounting,
                dispute resolution, and legal compliance.
              </li>
              <li>
                <strong className="text-slate-200">Account information:</strong> Retained until account deletion
                or 12 months of inactivity, whichever comes first.
              </li>
              <li>
                <strong className="text-slate-200">Travel documents:</strong> Deleted within{' '}
                <strong className="text-white">48 hours</strong> of service delivery.
              </li>
              <li>
                <strong className="text-slate-200">Analytics data:</strong> Anonymised and aggregated — not
                subject to a fixed retention window.
              </li>
            </ul>
          </div>

          {/* 7. Your Rights */}
          <div id="your-rights" className="space-y-3 scroll-mt-28">
            <h2 className="text-lg font-bold text-white">7. Your Rights &amp; Choices</h2>
            <p>
              Under applicable Indian law, including the IT Act, 2000 and IT (SPDI) Rules, 2011, you have the
              following rights with respect to your personal information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-400">
              <li>
                <strong className="text-slate-200">Access &amp; Correction:</strong> Review and update your
                personal data via your LayoverX account settings or by contacting us.
              </li>
              <li>
                <strong className="text-slate-200">Withdrawal of Consent:</strong> Withdraw consent for
                non-essential processing (such as marketing communications) at any time by emailing us or
                unsubscribing via any notification.
              </li>
              <li>
                <strong className="text-slate-200">Data Deletion:</strong> Request deletion of your account and
                associated personal data. We will action this within 30 days except where retention is required by
                law.
              </li>
              <li>
                <strong className="text-slate-200">Grievance Redressal:</strong> Lodge a complaint with our
                Nodal Grievance Officer if you believe your information has been misused.
              </li>
            </ul>
          </div>

          {/* 8. Cookies */}
          <div id="cookies" className="space-y-3 scroll-mt-28">
            <h2 className="text-lg font-bold text-white">8. Cookies &amp; Tracking Technologies</h2>
            <p>
              LayoverX uses essential cookies to maintain your login session, remember booking preferences, and
              ensure platform security. We also use anonymised analytics cookies (e.g., Google Analytics in
              IP-anonymisation mode) to understand aggregate usage patterns.
            </p>
            <p>
              For comprehensive information on all cookies used, their lifespan, and instructions on how to manage
              them, please read our dedicated{' '}
              <Link href="/cookie-policy" className="text-sky-400 hover:underline font-bold">
                Cookie Policy →
              </Link>
            </p>
          </div>

          {/* 9. Contact */}
          <div id="contact" className="space-y-3 pb-4 scroll-mt-28">
            <h2 className="text-lg font-bold text-white">9. Grievance Officer &amp; Contact</h2>
            <p>
              As required under Rule 5(9) of the IT (SPDI) Rules, 2011, LayoverX has designated a Nodal Grievance
              Officer for privacy-related concerns:
            </p>
            <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-5 space-y-1">
              <p className="text-slate-200 font-semibold">Nodal Grievance Officer — LayoverX</p>
              <p>
                Email:{' '}
                <a href="mailto:privacy@layoverx.in" className="text-sky-400 hover:underline">
                  privacy@layoverx.in
                </a>
              </p>
              <p>
                General support:{' '}
                <a href="mailto:support@layoverx.in" className="text-sky-400 hover:underline">
                  support@layoverx.in
                </a>
              </p>
              <p className="text-slate-500 text-xs mt-2">
                We aim to acknowledge all privacy-related complaints within 48 hours and resolve them within
                30 days of receipt.
              </p>
            </div>
            <p>
              If you are not satisfied with our response, you may seek further redressal through your local
              Consumer Disputes Redressal Commission under the{' '}
              <strong className="text-white">Consumer Protection Act, 2019</strong>.
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
                href="/cookie-policy"
                className="text-xs bg-slate-800 hover:bg-slate-700 border border-slate-600 text-sky-400 px-4 py-2 rounded-lg transition-colors"
              >
                Cookie Policy →
              </Link>
              <Link
                href="/refund-policy"
                className="text-xs bg-slate-800 hover:bg-slate-700 border border-slate-600 text-sky-400 px-4 py-2 rounded-lg transition-colors"
              >
                Cancellation &amp; Refund Policy →
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
