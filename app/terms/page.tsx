import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms & Conditions | LayoverX — CSMIA T2 Transit Services',
  description:
    'Read the complete terms of service for LayoverX transit hotel pods, dining, spa, chauffeur, and city tour bookings at Mumbai CSMIA Terminal 2.',
  alternates: { canonical: '/terms' },
};

const sections = [
  {
    id: '1',
    title: '1. About LayoverX',
    content: (
      <>
        <p>
          LayoverX (&ldquo;LayoverX,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our&rdquo;) is an online transit
          concierge platform operated as a sole proprietorship by an individual entrepreneur, trading under the brand
          name <strong className="text-white">LayoverX</strong>, with operational correspondence at{' '}
          <a href="mailto:support@layoverx.in" className="text-sky-400 hover:underline">
            support@layoverx.in
          </a>
          .
        </p>
        <p>
          LayoverX connects international transit passengers at Chhatrapati Shivaji Maharaj International Airport,
          Terminal&nbsp;2 (CSMIA&nbsp;T2), Mumbai, India, with verified third-party service providers including:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-slate-400">
          <li>Micro-stay hotel pods and transit lounges (airside &amp; landside)</li>
          <li>Airport and city restaurants, culinary trail experiences</li>
          <li>Spa, wellness, and rejuvenation facilities</li>
          <li>Private chauffeur and fixed-rate airport transfers</li>
          <li>Guided city sightseeing, heritage, and cultural tours</li>
          <li>Gaming, entertainment, and co-working lounges</li>
        </ul>
        <p>
          LayoverX acts as a <strong className="text-white">technology facilitator and booking aggregator</strong> only.
          All services are rendered by independent third-party vendors. LayoverX does not own, operate, employ staff for,
          or directly provide any hospitality, transport, or tourism service listed on the platform.
        </p>
      </>
    ),
  },
  {
    id: '2',
    title: '2. Acceptance of Terms',
    content: (
      <>
        <p>
          By accessing the LayoverX website (layoverx.in), mobile application, or any related digital interface, and by
          completing a booking or creating an account, you unconditionally agree to be bound by these Terms &amp;
          Conditions (&ldquo;Terms&rdquo;), our{' '}
          <Link href="/privacy" className="text-sky-400 hover:underline">
            Privacy Policy
          </Link>
          , and our{' '}
          <Link href="/refund-policy" className="text-sky-400 hover:underline">
            Cancellation &amp; Refund Policy
          </Link>
          .
        </p>
        <p>
          If you do not agree with any part of these Terms, please discontinue use of the platform immediately. These
          Terms constitute a legally binding agreement between you and LayoverX under the{' '}
          <strong className="text-white">Information Technology Act, 2000</strong> and the{' '}
          <strong className="text-white">Indian Contract Act, 1872</strong>.
        </p>
      </>
    ),
  },
  {
    id: '3',
    title: '3. Eligibility &amp; Account Registration',
    content: (
      <>
        <p>
          You must be at least <strong className="text-white">18 years of age</strong> to create an account or make a
          booking on LayoverX. By registering, you confirm that all information provided is accurate, current, and
          complete.
        </p>
        <p>
          You are responsible for maintaining the confidentiality of your account credentials. LayoverX is not liable
          for any unauthorized access resulting from your failure to secure your login details. Any activity conducted
          through your account is deemed to be authorized by you.
        </p>
      </>
    ),
  },
  {
    id: '4',
    title: '4. Flight Tracking &amp; Passenger Responsibility',
    content: (
      <>
        <p>
          LayoverX integrates real-time flight tracking via AeroAPI / AirLabs and automatically adjusts booked service
          windows when your flight is delayed. This{' '}
          <strong className="text-white">Slot Window Shift</strong> feature is provided as a value-added convenience and
          does not transfer any responsibility for missed flights to LayoverX.
        </p>
        <p>
          <strong className="text-white">It is the sole and exclusive responsibility of the passenger</strong> to
          monitor flight status, manage travel time, and ensure timely return to the airport terminal for immigration
          clearance, security screening, and boarding. LayoverX is not liable for missed flights, connections, or costs
          arising from delayed return to the terminal, regardless of the cause.
        </p>
      </>
    ),
  },
  {
    id: '5',
    title: '5. Immigration, Visa &amp; Indian Entry Compliance',
    content: (
      <>
        <p>
          Certain LayoverX services require passengers to exit the international transit zone and enter Indian territory
          (landside). Passengers are{' '}
          <strong className="text-white">solely responsible</strong> for holding a valid Indian Tourist Visa, e-Visa,
          Transit Visa (TV), or Overseas Citizen of India (OCI) Card as mandated by the Bureau of Immigration,
          Government of India.
        </p>
        <p>
          <strong className="text-white">Airside-only services</strong> (transit lounges and hotel pods within the
          sterile zone) do not require Indian visa clearance.{' '}
          <strong className="text-white">Landside services</strong> (city tours, external restaurants, chauffeur
          transfers to the city) require valid immigration entry permission.
        </p>
        <div className="bg-rose-950/30 border border-rose-800/50 p-4 rounded-xl space-y-2 mt-2">
          <h3 className="font-bold text-rose-300 text-sm">Immigration Disclaimer</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            If a passenger is denied entry through CSMIA T2 Immigration or fails to present valid visa documentation
            upon arrival, all Landside bookings become <strong className="text-white">strictly non-refundable</strong>{' '}
            once the booked slot start time has passed. Passengers must verify entry eligibility prior to departure via
            the official Government of India visa portal at{' '}
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
      </>
    ),
  },
  {
    id: '6',
    title: '6. Bookings, Payments &amp; Pricing',
    content: (
      <>
        <p>
          All prices on the LayoverX platform are quoted in{' '}
          <strong className="text-white">Indian Rupees (INR)</strong> and include applicable Goods &amp; Services Tax
          (GST) at the prevailing rate, unless explicitly stated otherwise. LayoverX reserves the right to revise
          prices at any time; the price confirmed at the time of payment is final and binding for that transaction.
        </p>
        <p>
          Payments are processed securely through{' '}
          <strong className="text-white">Razorpay Payment Gateway</strong>, a PCI-DSS Level 1 certified payment
          processor. LayoverX does not store, view, or process your card or banking credentials. All transactions are
          tokenized and encrypted end-to-end by Razorpay.
        </p>
        <p>
          A booking is confirmed only upon receipt of a booking confirmation email and/or WhatsApp message containing
          your unique booking reference number and QR-coded access pass.
        </p>
      </>
    ),
  },
  {
    id: '7',
    title: '7. Service Delivery &amp; Vendor Obligations',
    content: (
      <>
        <p>
          LayoverX shall use reasonable efforts to ensure vendor partners fulfil confirmed bookings. However, in
          exceptional circumstances (acts of God, AERA/AAI airport authority directives, CISF security restrictions,
          airline-mandated terminal closures, or force majeure events), services may be modified or rescheduled.
          LayoverX will notify you promptly and offer alternatives or a full refund where applicable.
        </p>
        <p>
          LayoverX is not responsible for the quality, safety, legality, or suitability of services delivered by
          third-party vendors beyond making reasonable commercial efforts to vet and maintain partnerships with
          verified, reputed service providers at CSMIA T2.
        </p>
      </>
    ),
  },
  {
    id: '8',
    title: '8. Intellectual Property',
    content: (
      <p>
        All content on the LayoverX platform — including the brand name, logo, design, text, graphics, software, and
        data compilations — is the intellectual property of the LayoverX proprietor and is protected under the{' '}
        <strong className="text-white">Copyright Act, 1957</strong> and the{' '}
        <strong className="text-white">Trade Marks Act, 1999</strong> of India. Unauthorized reproduction,
        redistribution, scraping, or commercial use of any LayoverX content without prior written permission is
        strictly prohibited and actionable under applicable law.
      </p>
    ),
  },
  {
    id: '9',
    title: '9. Limitation of Liability',
    content: (
      <>
        <p>
          To the maximum extent permitted by applicable Indian law, LayoverX&apos;s total aggregate liability for any
          claim arising out of or related to the platform or any booked service shall be{' '}
          <strong className="text-white">limited to the total booking amount paid</strong> by the passenger for the
          specific service giving rise to the claim.
        </p>
        <p>
          LayoverX shall not be liable for any indirect, incidental, punitive, or consequential damages including loss
          of profits, missed flights, travel disruptions, or visa-related expenses arising from use of or inability to
          use the platform. These exclusions apply regardless of the theory of liability (contract, tort, or otherwise).
        </p>
        <p>
          Nothing in these Terms limits or excludes liability that cannot be excluded under the{' '}
          <strong className="text-white">Consumer Protection Act, 2019</strong> of India, including liability for
          deficiency in service or unfair trade practices as defined therein.
        </p>
      </>
    ),
  },
  {
    id: '10',
    title: '10. Governing Law, Dispute Resolution &amp; Contact',
    content: (
      <>
        <p>
          These Terms are governed by and construed in accordance with the laws of India. Any disputes arising out of
          or in connection with these Terms, including disputes relating to their validity, breach, or interpretation,
          shall be subject to the{' '}
          <strong className="text-white">exclusive jurisdiction of the courts at Mumbai, Maharashtra</strong>.
        </p>
        <p>
          LayoverX adheres to the dispute redressal mechanism prescribed under the{' '}
          <strong className="text-white">Consumer Protection Act, 2019</strong>. If you have a grievance, contact our
          Nodal Grievance Officer at{' '}
          <a href="mailto:grievance@layoverx.in" className="text-sky-400 hover:underline font-semibold">
            grievance@layoverx.in
          </a>
          . We aim to resolve all complaints within{' '}
          <strong className="text-white">15 working days</strong> of receipt.
        </p>
        <p>
          For general support, email us at{' '}
          <a href="mailto:support@layoverx.in" className="text-sky-400 hover:underline">
            support@layoverx.in
          </a>{' '}
          or visit our{' '}
          <Link href="/contact" className="text-sky-400 hover:underline">
            Contact Us
          </Link>{' '}
          page.
        </p>
      </>
    ),
  },
];

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
            Last updated: 22 September 2026&nbsp;·&nbsp;Effective for all bookings made via layoverx.in
          </p>
          <p className="text-slate-500 text-xs mt-2">
            Please read these terms carefully before using the LayoverX platform. By proceeding with a booking
            you agree to be bound by these terms in their entirety.
          </p>
        </div>
      </section>

      {/* Quick-nav */}
      <section className="px-4 mb-10">
        <div className="max-w-3xl mx-auto bg-slate-800/50 border border-slate-700 rounded-2xl p-5">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Quick Navigation</p>
          <ol className="grid sm:grid-cols-2 gap-1 text-xs text-sky-400 list-decimal list-inside">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#section-${s.id}`} className="hover:text-white transition-colors">
                  {s.title.replace(/^\d+\.\s/, '')}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Content */}
      <section className="px-4">
        <div className="max-w-3xl mx-auto space-y-10 text-sm leading-relaxed">
          {sections.map((s) => (
            <div key={s.id} id={`section-${s.id}`} className="space-y-3 scroll-mt-28">
              <h2 className="text-lg font-bold text-white">{s.title}</h2>
              {s.content}
            </div>
          ))}

          {/* Related policies */}
          <div className="border-t border-slate-700 pt-8 pb-4 space-y-2">
            <p className="text-slate-400 text-xs">Related legal documents:</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/privacy"
                className="text-xs bg-slate-800 hover:bg-slate-700 border border-slate-600 text-sky-400 px-4 py-2 rounded-lg transition-colors"
              >
                Privacy Policy →
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
