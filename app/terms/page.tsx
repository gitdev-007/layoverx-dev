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
  Clock,
  MapPin,
  Mail,
  Building2,
  Phone,
  Info,
  CheckCircle2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms & Conditions | LayoverX — CSMIA T2 Transit Concierge',
  description:
    'Official Terms & Conditions for LayoverX transit concierge, itinerary planning, and third-party bookings at Mumbai CSMIA Terminal 2.',
  alternates: { canonical: '/terms' },
};

const Placeholder: React.FC<{ text: string }> = ({ text }) => (
  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-300 font-mono text-xs font-bold tracking-tight">
    {text}
  </span>
);

const sections = [
  {
    id: '1',
    title: '1. Introduction',
    content: (
      <>
        <p>
          These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your access to and use of the LayoverX website (
          <a href="https://www.layoverx.in/" className="text-[#0369a1] font-semibold hover:underline">
            https://www.layoverx.in/
          </a>
          ), mobile-optimized interfaces, itinerary-planning engines, concierge facilitation services, customer support desks, and all related digital tools (collectively, the &ldquo;Platform&rdquo; or &ldquo;Services&rdquo;).
        </p>
        <p>
          The Platform is operated under the brand name <strong className="text-slate-900">LayoverX</strong> by{' '}
          <Placeholder text="[LEGAL ENTITY NAME]" /> (&ldquo;LayoverX,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), having its registered office at{' '}
          <Placeholder text="[REGISTERED ADDRESS]" />.
        </p>
        <p>
          LayoverX is an Indian transit-concierge and booking-facilitation platform primarily assisting domestic and international passengers with layovers and stopovers in and around <strong className="text-slate-900">Chhatrapati Shivaji Maharaj International Airport, Terminal 2 (CSMIA T2), Mumbai, Maharashtra, India</strong>.
        </p>
        <p>
          By accessing or browsing the Platform, registering an account, building an itinerary through our planning tools, completing a booking, or utilizing any of our concierge features, you (&ldquo;User,&rdquo; &ldquo;Passenger,&rdquo; &ldquo;Customer,&rdquo; or &ldquo;you&rdquo;) unconditionally acknowledge that you have read, understood, and agree to be bound by these Terms in their entirety.
        </p>
        <div className="bg-sky-50 border border-sky-200/80 rounded-2xl p-4 text-sky-950 text-xs sm:text-sm space-y-1.5">
          <p className="font-bold text-[#0369a1] flex items-center gap-1.5">
            <Info className="w-4 h-4 text-[#0369a1]" /> Integrated Legal Documentation:
          </p>
          <p>
            These Terms must be read in conjunction with our integrated policies, which form an essential part of your agreement with LayoverX:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700">
            <li>
              <Link href="/privacy" className="text-[#0369a1] font-semibold hover:underline">
                Privacy Policy
              </Link>{' '}
              — details how your personal and travel information is collected, processed, and safeguarded under Indian data protection laws.
            </li>
            <li>
              <Link href="/cookie-policy" className="text-[#0369a1] font-semibold hover:underline">
                Cookie Policy
              </Link>{' '}
              — explains our use of cookies and tracking technologies to maintain session continuity and itinerary preferences.
            </li>
            <li>
              <Link href="/refund-policy" className="text-[#0369a1] font-semibold hover:underline">
                Cancellation &amp; Refund Policy
              </Link>{' '}
              — sets out cancellation timeframes, service-specific refund rules, and bank settlement timelines.
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: '2',
    title: '2. About LayoverX & The Facilitator Model',
    content: (
      <>
        <p>
          LayoverX operates as an online technology and booking-facilitation aggregator designed to help transit travelers discover, bundle, and schedule airport and city experiences during flight layovers at CSMIA T2 Mumbai.
        </p>
        <p>
          LayoverX facilitates access to verified, independent third-party service providers across diverse transit categories, including:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
          <li>Transit hotels, micro-stay hourly rooms, and airside/landside sleeping pods</li>
          <li>Airport and city restaurants, executive buffet reservations, and culinary trails</li>
          <li>Express spa, foot reflexology, wellness suites, and jetlag recovery lounges</li>
          <li>Airport transfers, private chauffeur cars, fixed-rate cab services, and luxury transit vehicles</li>
          <li>Guided layover city sightseeing, heritage monuments, and South Mumbai cultural tours</li>
          <li>Gaming arenas, esports stations, and quiet executive work pods</li>
          <li>Airport departure/arrival lounges, shower suites, and executive workspaces</li>
          <li>Luggage cloakroom, baggage assistance, and other travel-related amenities</li>
        </ul>
        <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 text-amber-950 text-xs sm:text-sm">
          <p className="font-bold text-amber-800 mb-1 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-600" /> Technology Facilitator Status:
          </p>
          <p>
            LayoverX acts solely as a <strong className="font-semibold text-slate-900">technology platform, booking intermediary, and concierge aggregator</strong>. Unless explicitly confirmed in writing on the website for a specific service, LayoverX does not own, operate, manage, or control the physical hotels, sleeping pods, vehicles, culinary venues, spas, or tour operators, nor does LayoverX directly employ drivers, therapists, hotel staff, or tour guides. The contract for actual service fulfillment is formed directly between the passenger and the third-party service partner.
          </p>
        </div>
      </>
    ),
  },
  {
    id: '3',
    title: '3. Eligibility',
    content: (
      <>
        <p>
          To access our Services and execute binding bookings, you must possess the full legal capacity to enter into a valid contract pursuant to the Indian Contract Act, 1872.
        </p>
        <p>
          For independent bookings, you must be at least <strong className="text-slate-900">18 years of age</strong>. Minors may utilize services only when accompanied by a parent, legal guardian, or an authorized adult passenger traveling on the same itinerary.
        </p>
        <p>
          <strong className="text-slate-900">Booking on Behalf of Others:</strong> If you make a reservation for family members, traveling companions, corporate colleagues, or other third-party passengers, you expressly warrant and represent that:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-slate-600">
          <li>You are duly authorized by each passenger to provide their personal data, flight details, and contact information.</li>
          <li>You have informed all passengers of these Terms, the Privacy Policy, the Cancellation &amp; Refund Policy, and any vendor-specific rules.</li>
          <li>You accept joint and individual responsibility for timely payment, accurate travel documentation, and adherence to all booking terms.</li>
        </ul>
      </>
    ),
  },
  {
    id: '4',
    title: '4. Account Registration & Security',
    content: (
      <>
        <p>
          Passengers may browse services and construct layover itineraries without mandatory pre-registration. However, saving an itinerary, accessing personalized customer dashboards, or completing a checkout requires providing accurate identity information or completing one-time password (OTP) verification.
        </p>
        <p>
          When interacting with the Platform, you agree to:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
          <li>Provide true, accurate, current, and complete personal, contact, and flight information.</li>
          <li>Promptly update your contact information if your phone number or email address changes.</li>
          <li>Safeguard your authentication credentials, one-time passwords, and booking links against unauthorized disclosure.</li>
          <li>Notify LayoverX immediately at <Placeholder text="[SUPPORT EMAIL]" /> if you suspect unauthorized access or security compromise.</li>
        </ul>
        <p>
          LayoverX reserves the absolute right to suspend, restrict, or terminate account access and cancel associated bookings without liability if we reasonably suspect fraudulent transactions, identity misrepresentation, automated data scraping, or any violation of applicable laws.
        </p>
      </>
    ),
  },
  {
    id: '5',
    title: '5. Flight and Itinerary Information',
    content: (
      <>
        <p>
          To tailor recommendations and assemble feasible layover schedules, LayoverX utilizes passenger-submitted flight and travel parameters, which may include:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-slate-600">
          <li>Arrival airline name, flight number, scheduled date, and arrival time</li>
          <li>Departure airline name, flight number, scheduled date, and departure time</li>
          <li>Airport terminal details (CSMIA Terminal 2)</li>
          <li>Total passenger count, luggage status, and transit preferences</li>
          <li>Calculated layover duration and user-selected transit activities</li>
        </ul>
        <p>
          Our proprietary &ldquo;My Itinerary&rdquo; planning engine computes an estimated available activity window by factoring in estimated airport clearance, terminal walking buffers, and standard security checks.
        </p>
        <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 text-amber-950 text-xs sm:text-sm space-y-2">
          <p className="font-bold text-amber-900 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-600" /> Crucial Itinerary Planning Disclaimer:
          </p>
          <p>
            Itinerary calculations, duration estimates, buffer recommendations, and schedule timelines generated by LayoverX are <strong className="font-bold text-slate-900">advisory planning aids only</strong>. They do NOT constitute a guarantee, warranty, or binding representation that you will have sufficient time to complete every selected activity, clear airport customs or CISF security lines, or reach your boarding gate on time.
          </p>
          <p>
            Flight arrival times, gate allocations, disembarkation durations, airport queues, immigration wait times, and city traffic around CSMIA Mumbai fluctuate dynamically and remain entirely outside LayoverX&rsquo;s control. You remain solely responsible for evaluating time feasibility.
          </p>
        </div>
      </>
    ),
  },
  {
    id: '6',
    title: '6. Passenger Responsibility',
    content: (
      <>
        <p>
          As a transit passenger traveling through CSMIA T2, you retain sole and exclusive responsibility for managing your journey and complying with statutory travel requirements. Specifically, you agree that you are responsible for:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-600">
          <li>
            <strong className="text-slate-900">Monitoring Flight Schedules:</strong> Actively monitoring your operating airline&rsquo;s notifications, flight status boards, gate announcements, and schedule revisions.
          </li>
          <li>
            <strong className="text-slate-900">Travel Documentation:</strong> Possessing valid passports (with required minimum validity), domestic photo ID, visas, overseas citizenship documents, or health certificates.
          </li>
          <li>
            <strong className="text-slate-900">Airport &amp; CISF Security:</strong> Complying with Central Industrial Security Force (CISF) security directives, baggage restrictions, and screening requirements.
          </li>
          <li>
            <strong className="text-slate-900">Boarding Cutoffs:</strong> Allowing adequate time to return to CSMIA T2, re-clear security, and arrive at the departure boarding gate before your airline&rsquo;s mandatory gate closure.
          </li>
          <li>
            <strong className="text-slate-900">Accurate Submissions:</strong> Providing accurate flight numbers, arrival dates, passenger counts, and contact coordinates at the time of booking.
          </li>
          <li>
            <strong className="text-slate-900">Partner Venue Rules:</strong> Complying with check-in schedules, dress codes, luggage restrictions, and conduct rules established by third-party service venues.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: '7',
    title: '7. Immigration, Visa and Landside Access',
    content: (
      <>
        <p>
          CSMIA Terminal 2 operates with strict jurisdictional demarcations separating sterile airside transit areas from public landside access and the city of Mumbai.
        </p>
        <p>
          If your selected itinerary includes any <strong className="text-slate-900">landside service</strong> (such as city sightseeing tours, private chauffeur transfers, or city-side hotels and spas outside the terminal), you must possess the lawful right, appropriate transit visa, tourist visa, or entry authorization to clear Indian border immigration and enter the territory of India.
        </p>
        <div className="bg-sky-50 border border-sky-200/80 rounded-2xl p-4 text-sky-950 text-xs sm:text-sm space-y-1.5">
          <p className="font-bold text-[#0369a1] flex items-center gap-1.5">
            <Info className="w-4 h-4 text-[#0369a1]" /> Border Authority Disclaimer:
          </p>
          <p>
            LayoverX is a private commercial platform and has no affiliation with the Bureau of Immigration (BOI), Ministry of Home Affairs, or airport border control. LayoverX does not issue visas, transit permits, or immigration clearance.
          </p>
          <p>
            A confirmed LayoverX booking <strong className="font-semibold text-slate-900">does not guarantee immigration approval or entry permission</strong> into India. If immigration authorities deny you entry, you remain responsible for any resulting cancellation fees as outlined in our Cancellation &amp; Refund Policy.
          </p>
        </div>
      </>
    ),
  },
  {
    id: '8',
    title: '8. Airside and Landside Services',
    content: (
      <>
        <p>
          To ensure clarity and prevent transit complications, LayoverX categorizes all listed services based on physical airport location:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 inline-block">
              Airside Services
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Amenities situated inside the sterile, post-security transit zone of CSMIA T2. Accessible to connecting passengers holding a valid boarding pass for an onward flight without passing through Indian immigration, subject to terminal transfer rules and CISF security regulations.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 inline-block">
              Landside Services
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Services located in the public arrivals concourse, airport precinct, or across the city of Mumbai. Access requires passengers to clear Indian immigration, customs, and baggage collection, and subsequently re-clear CISF security screening upon terminal re-entry.
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-500">
          Each service page and booking summary clearly indicates whether a service is Airside or Landside. Passengers must verify their zone eligibility before confirming their reservation.
        </p>
      </>
    ),
  },
  {
    id: '9',
    title: '9. Booking Process & Confirmation Status',
    content: (
      <>
        <p>
          The LayoverX booking workflow is structured into clear, transparent steps:
        </p>
        <ol className="list-decimal pl-6 space-y-1.5 text-slate-600">
          <li><strong className="text-slate-900">Service Selection:</strong> Browse and select preferred transit hotels, spas, dining, tours, or transfer services.</li>
          <li><strong className="text-slate-900">Itinerary Assembly:</strong> Add chosen services to your layover timeline and review time allocations against your flight schedule.</li>
          <li><strong className="text-slate-900">Details Entry:</strong> Input lead passenger names, contact information, airline details, and special requirements.</li>
          <li><strong className="text-slate-900">Policy Review:</strong> Review the transparent price breakdown and service-specific cancellation rules.</li>
          <li><strong className="text-slate-900">Payment Authorization:</strong> Complete payment through our secure, authorized payment gateway.</li>
          <li><strong className="text-slate-900">Voucher Issuance:</strong> Receive an automated booking confirmation with your unique Booking ID and digital voucher.</li>
        </ol>
        <div className="bg-sky-50 border border-sky-200/80 rounded-2xl p-4 text-sky-950 text-xs sm:text-sm">
          <p className="font-bold text-[#0369a1] mb-1">Saved Itinerary vs. Confirmed Booking:</p>
          <p>
            Building, saving, or sharing an itinerary on the Platform <strong className="font-semibold text-slate-900">does not constitute a confirmed booking</strong>, nor does it hold room inventory, lock prices, or guarantee service partner availability. A booking is legally confirmed ONLY after successful receipt of payment in full and the electronic generation of an official LayoverX Booking ID.
          </p>
        </div>
      </>
    ),
  },
  {
    id: '10',
    title: '10. Pricing & Applicable Taxes',
    content: (
      <>
        <p>
          All pricing displayed on the LayoverX platform is quoted in <strong className="text-slate-900">Indian Rupees (INR)</strong> unless an international currency display is explicitly enabled on the checkout interface.
        </p>
        <p>
          The total booking amount displayed prior to final payment authorization includes:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-slate-600">
          <li>The base service charge established by the independent service partner</li>
          <li>Applicable statutory taxes, including Goods and Services Tax (GST) under Indian tax laws</li>
          <li>Platform facilitation, technology, and concierge coordination fees</li>
          <li>Applicable chauffeur, toll, or transportation fees for transfer and tour services</li>
          <li>Any partner-disclosed surcharges or peak-hour operational fees</li>
        </ul>
        <p>
          LayoverX practices transparent billing. The comprehensive price breakdown is fully displayed on the checkout screen before you authorize payment. No undisclosed or hidden fees will be added after checkout completion.
        </p>
      </>
    ),
  },
  {
    id: '11',
    title: '11. Payment Processing',
    content: (
      <>
        <p>
          All electronic payments on the Platform are processed through accredited, Reserve Bank of India (RBI)-compliant third-party payment aggregators (such as Razorpay or other payment gateways displayed during checkout).
        </p>
        <p>
          Supported payment methods include Unified Payments Interface (UPI), domestic and international credit/debit cards (Visa, Mastercard, RuPay, American Express), net banking, and authorized digital payment instruments.
        </p>
        <p>
          <strong className="text-slate-900">Data Security:</strong> LayoverX does not collect, process, or store credit card numbers, CVV security codes, card expiration dates, or net banking passwords on our internal servers. All financial transactions take place within the encrypted, PCI-DSS Level 1 compliant infrastructure of the payment gateway.
        </p>
        <p className="text-xs text-slate-500">
          Payment processing is governed by the terms, conditions, and privacy policies of the respective payment aggregator and applicable RBI master directions on digital payment systems.
        </p>
      </>
    ),
  },
  {
    id: '12',
    title: '12. Booking Confirmation & Digital Vouchers',
    content: (
      <>
        <p>
          Upon successful payment processing, LayoverX automatically issues a digital booking confirmation delivered to your registered email address and displayed on your screen. The confirmation contains:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
          <li>A unique, trackable <strong className="text-slate-900">LayoverX Booking ID</strong></li>
          <li>Detailed itinerary timetable, including booked service start and end times</li>
          <li>Service partner details, physical location (terminal or city address), and check-in instructions</li>
          <li>Passenger names, contact details, and guest count</li>
          <li>Digital QR code or electronic voucher for swift on-site redemption</li>
          <li>Specific cancellation windows and refund terms applicable to the booking</li>
        </ul>
        <p>
          Passengers must present their LayoverX digital voucher along with valid government photo identification (or passport for international travelers) upon arrival at the partner venue.
        </p>
      </>
    ),
  },
  {
    id: '13',
    title: '13. Third-Party Services & Venue Rules',
    content: (
      <>
        <p>
          Third-party service partners are independent commercial entities and remain exclusively responsible for the execution, quality, safety, and hygiene of their respective services.
        </p>
        <p>
          Each partner venue maintains its own operational terms, house rules, and admission conditions, which passengers must strictly respect:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-slate-600">
          <li><strong className="text-slate-900">Identity Verification:</strong> Production of original government photo ID (Aadhaar, Passport, Voter ID, Driver License) at check-in.</li>
          <li><strong className="text-slate-900">Age Restrictions:</strong> Specific minimum age requirements for pod check-in, spa treatments, or gaming access.</li>
          <li><strong className="text-slate-900">Dress &amp; Conduct:</strong> Adherence to venue dress guidelines, hygiene protocols, and non-disruptive behavior.</li>
          <li><strong className="text-slate-900">Luggage Limits:</strong> Capacity restrictions on large bags or suitcases in micro-stay pods and private transfer vehicles.</li>
          <li><strong className="text-slate-900">Dietary &amp; Health Rules:</strong> Disclosure of food allergies or medical conditions before participating in dining or wellness treatments.</li>
          <li><strong className="text-slate-900">Operating Hours:</strong> Adherence to pre-reserved time slots; partners are not obligated to extend sessions for late arrivals.</li>
        </ul>
        <p className="text-xs text-slate-500">
          Service partners reserve the legal right to deny admission or terminate service to any individual exhibiting intoxication, aggressive behavior, or failure to comply with safety directives, without any entitlement to a refund.
        </p>
      </>
    ),
  },
  {
    id: '14',
    title: '14. Changes to Itinerary & Modifications',
    content: (
      <>
        <p>
          We understand that transit schedules often require flexibility. Where operational circumstances permit, LayoverX allows passengers to request modifications to their confirmed bookings.
        </p>
        <p>
          All modification requests are subject to the real-time availability of the partner venue and operational notice periods. LayoverX does not guarantee that requested rescheduling can be accommodated.
        </p>
        <p>
          Where an itinerary change affects a confirmed booking:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-slate-600">
          <li>Our concierge desk will assist in coordinating alternative time slots with the respective service partner.</li>
          <li>If an alternative time is unavailable, cancellation rules will apply based on the notification timestamp.</li>
          <li>Any price differences resulting from higher room categories, peak-hour transfers, or extended durations must be paid prior to confirmation.</li>
        </ul>
      </>
    ),
  },
  {
    id: '15',
    title: '15. Cancellation and Refund',
    content: (
      <>
        <p>
          All cancellations, booking terminations, and refund calculations are strictly governed by our dedicated{' '}
          <Link href="/refund-policy" className="text-[#0369a1] font-semibold hover:underline">
            Cancellation &amp; Refund Policy
          </Link>
          , which is incorporated into these Terms by reference.
        </p>
        <p>
          Key cancellation conditions include:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
          <li>Service-specific cancellation deadlines (e.g., free cancellation up to 6 hours or 24 hours prior to service start) are prominently displayed before payment.</li>
          <li>Late cancellations submitted after the free cancellation window are subject to partner retention fees.</li>
          <li>Approved refunds are credited exclusively back to the original source payment instrument (card, UPI, net banking) via our payment gateway within 5 to 7 business days.</li>
        </ul>
      </>
    ),
  },
  {
    id: '16',
    title: '16. Flight Delays and Airline Cancellations',
    content: (
      <>
        <p>
          Flight schedules are subject to air traffic control directives, adverse meteorological conditions, mechanical checks, and airline operational decisions beyond LayoverX&rsquo;s control.
        </p>
        <p>
          LayoverX does not automatically track every connecting flight in real time unless dedicated concierge flight monitoring is active on your booking. Passengers must notify LayoverX support immediately upon becoming aware of any flight delay or diversion.
        </p>
        <p>
          While LayoverX will make commercially reasonable efforts to reschedule partner bookings in the event of an airline delay, LayoverX does not guarantee that service slots can be held or rescheduled without penalty unless a specific delay protection guarantee was included in the confirmed booking.
        </p>
      </>
    ),
  },
  {
    id: '17',
    title: '17. Force Majeure',
    content: (
      <>
        <p>
          Neither LayoverX nor its service partners shall be liable, in breach of these Terms, or held responsible for any failure, delay, or interruption in performance resulting from causes beyond reasonable commercial control (&ldquo;Force Majeure Events&rdquo;).
        </p>
        <p>
          Force Majeure Events include, without limitation:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-slate-600">
          <li>Severe weather events, monsoonal flooding, cyclones, earthquakes, or natural disasters</li>
          <li>Airport closures, runway suspensions, airspace restrictions, or CISF security lockdowns at CSMIA</li>
          <li>Governmental emergency orders, border closures, travel bans, or statutory epidemic restrictions</li>
          <li>Civil disturbances, riots, acts of war, terrorism, sabotage, or public emergencies</li>
          <li>Strikes, industrial actions, major public transit disruptions, or municipal road blockages</li>
          <li>Citywide telecommunications blackouts, widespread power grid failures, or internet infrastructure outages</li>
        </ul>
        <p className="text-xs text-slate-500">
          In the event of a verified Force Majeure disruption, LayoverX will actively coordinate with affected partners to facilitate rescheduling or credit notes where commercially viable.
        </p>
      </>
    ),
  },
  {
    id: '18',
    title: '18. User Conduct & Prohibited Uses',
    content: (
      <>
        <p>
          The LayoverX platform may only be used for legitimate, lawful travel planning and personal concierge bookings. You agree not to engage in any prohibited activities, including:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
          <li>Making fraudulent, speculative, or false reservations, or using unauthorized payment credentials.</li>
          <li>Impersonating any person or misrepresenting your affiliation with any individual, airline, or entity.</li>
          <li>Attempting to hack, decompile, reverse-engineer, or breach Platform security, firewalls, or databases.</li>
          <li>Deploying automated robots, spiders, scrapers, or crawlers to extract pricing, itinerary data, or content.</li>
          <li>Uploading or transmitting malicious software, viruses, trojans, or destructive code.</li>
          <li>Reselling, sublicensing, or commercially redistributing LayoverX booking vouchers, vouchers, or services.</li>
          <li>Engaging in abusive, defamatory, threatening, or harassing behavior toward LayoverX staff or vendor personnel.</li>
          <li>Using the Platform in any manner that impairs system performance or disrupts other users&rsquo; access.</li>
        </ul>
      </>
    ),
  },
  {
    id: '19',
    title: '19. Intellectual Property Rights',
    content: (
      <>
        <p>
          All content, features, and functionality on the Platform—including but not limited to the brand name <strong className="text-slate-900">LayoverX</strong>, logos, trademarks, domain names (<code className="text-xs font-mono text-slate-800">layoverx.in</code>), graphic designs, user interface layouts, software code, proprietary itinerary logic, text, icons, and compilation databases—are the exclusive intellectual property of LayoverX or its licensors.
        </p>
        <p>
          You are granted a limited, revocable, non-exclusive, non-transferable license to access the Platform and download or print digital booking confirmations solely for your personal, non-commercial use.
        </p>
        <p>
          Any unauthorized reproduction, modification, distribution, public display, commercial exploitation, or creation of derivative works based on LayoverX intellectual property is strictly prohibited without our prior written authorization.
        </p>
      </>
    ),
  },
  {
    id: '20',
    title: '20. User Content and Reviews',
    content: (
      <>
        <p>
          Where the Platform permits users to submit testimonials, ratings, reviews, photos, or feedback regarding transit experiences, you confirm that your submissions are genuine, accurate, and based on firsthand experience.
        </p>
        <p>
          You agree that submitted reviews shall not contain defamatory, obscene, offensive, hateful, or unlawful material, nor shall they infringe the intellectual property or privacy rights of any third party.
        </p>
        <p>
          By submitting reviews or feedback to LayoverX, you grant us an irrevocable, perpetual, royalty-free, worldwide license to display, publish, format, and utilize such feedback across our marketing channels and operational reviews. LayoverX reserves the right to moderate, edit, or remove any user-submitted content at its sole discretion.
        </p>
      </>
    ),
  },
  {
    id: '21',
    title: '21. Privacy & Data Protection',
    content: (
      <>
        <p>
          Your privacy and personal data security are paramount to our concierge operations. The collection, storage, processing, and transfer of your personal data, travel details, and contact information are governed by our comprehensive{' '}
          <Link href="/privacy" className="text-[#0369a1] font-semibold hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
        <p>
          Our privacy practices are designed to comply with applicable Indian legal standards, including the <strong className="text-slate-900">Digital Personal Data Protection Act, 2023 (DPDP)</strong> and the <strong className="text-slate-900">Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 (IT SPDI Rules)</strong>.
        </p>
        <p>
          LayoverX does not sell passenger personal data to third-party brokers. Data sharing is strictly confined to verified service partners and payment processors required to execute your booked transit arrangements.
        </p>
      </>
    ),
  },
  {
    id: '22',
    title: '22. Cookies & Tracking Technologies',
    content: (
      <>
        <p>
          LayoverX utilizes first-party and third-party cookies, local web storage, and session tokens to ensure essential site operation, remember your itinerary drafts, authenticate user sessions, and analyze traffic patterns.
        </p>
        <p>
          For a complete breakdown of the cookies we deploy, their operational purposes, and instructions on how to manage or disable cookie preferences through your web browser, please consult our dedicated{' '}
          <Link href="/cookie-policy" className="text-[#0369a1] font-semibold hover:underline">
            Cookie Policy
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    id: '23',
    title: '23. Limitation of Liability',
    content: (
      <>
        <p>
          To the maximum extent permitted by applicable Indian law:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-600">
          <li>
            <strong className="text-slate-900">Intermediary Protection:</strong> LayoverX functions as an electronic intermediary platform under Section 79 of the Information Technology Act, 2000. LayoverX shall not be liable for the acts, omissions, delays, breaches, representations, warranties, or negligence of independent third-party service vendors.
          </li>
          <li>
            <strong className="text-slate-900">Transit &amp; Flight Risks:</strong> LayoverX shall not be liable for missed flights, boarding denials, flight schedule changes, baggage loss, immigration entry refusals, CISF security delays, or road traffic congestion in Mumbai.
          </li>
          <li>
            <strong className="text-slate-900">Indirect Damages:</strong> Under no circumstances shall LayoverX be liable for indirect, incidental, special, punitive, exemplary, or consequential damages, including loss of business, profits, or travel opportunities.
          </li>
          <li>
            <strong className="text-slate-900">Liability Cap:</strong> In all circumstances where liability is proven and established by a competent legal authority, the total aggregate liability of LayoverX arising out of or related to any booking shall be strictly capped at the <strong className="text-slate-900">total amount paid by the passenger to LayoverX for that specific booking</strong>.
          </li>
        </ul>
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600">
          <strong className="text-slate-900 block font-bold mb-1">Non-Excludable Statutory Liabilities:</strong>
          Nothing in these Terms shall limit or exclude any liability that cannot lawfully be disclaimed or limited under mandatory provisions of applicable Indian law, including the Consumer Protection Act, 2019.
        </div>
      </>
    ),
  },
  {
    id: '24',
    title: '24. Consumer Rights & Statutory Protection',
    content: (
      <>
        <p>
          LayoverX is committed to maintaining fair, transparent, and ethical trade practices in full adherence to the <strong className="text-slate-900">Consumer Protection Act, 2019</strong> and the <strong className="text-slate-900">Consumer Protection (E-Commerce) Rules, 2020</strong>.
        </p>
        <p>
          Nothing contained in these Terms is intended to derogate, restrict, or eliminate your statutory rights as a consumer under Indian law, including your right to:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-slate-600">
          <li>Receive transparent, accurate pre-booking disclosures regarding pricing, taxes, and vendor terms.</li>
          <li>Access prompt, professional customer support and structured grievance redressal.</li>
          <li>Approach competent District, State, or National Consumer Disputes Redressal Commissions having jurisdiction.</li>
        </ul>
      </>
    ),
  },
  {
    id: '25',
    title: '25. Grievance Redressal Mechanism',
    content: (
      <>
        <p>
          In accordance with Rule 5(9) of the Consumer Protection (E-Commerce) Rules, 2020 and Rule 3(2) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, LayoverX has established a structured grievance escalation mechanism:
        </p>
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#0369a1]" />
            <h3 className="font-bold text-slate-900 text-sm">Nodal Grievance Officer Details</h3>
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
              <span className="text-slate-500 block font-medium">Registered Office:</span>
              <Placeholder text="[REGISTERED ADDRESS]" />
            </div>
            <div>
              <span className="text-slate-500 block font-medium">Grievance Email:</span>
              <Placeholder text="[GRIEVANCE EMAIL]" />
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
              <span className="text-slate-500 block font-medium">Operating Hours:</span>
              <span>Monday – Saturday, 09:30 AM – 06:30 PM IST</span>
            </div>
          </div>
        </div>
        <p className="font-bold text-slate-900 text-xs sm:text-sm mt-3">
          Filing a Grievance or Dispute:
        </p>
        <p className="text-xs text-slate-600">
          To enable efficient investigation and prompt resolution, your grievance notice sent to <Placeholder text="[GRIEVANCE EMAIL]" /> should contain:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-xs text-slate-600">
          <li>Your unique LayoverX Booking ID and primary passenger name</li>
          <li>Registered contact email address and mobile phone number</li>
          <li>Flight numbers, layover date, and specific service(s) involved</li>
          <li>A clear, concise chronological statement of the facts and disputed issue</li>
          <li>Copies of relevant digital vouchers, receipts, airline alerts, or photographs</li>
        </ul>
        <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200/80 text-xs text-sky-950 space-y-1">
          <p className="font-bold text-[#0369a1]">Statutory Redressal Timelines:</p>
          <p>
            • LayoverX will officially acknowledge receipt of your grievance within <strong className="font-semibold text-slate-900">forty-eight (48) hours</strong>.
          </p>
          <p>
            • A comprehensive investigation and formal resolution proposal will be communicated within <strong className="font-semibold text-slate-900">fifteen (15) working days</strong> from the date of acknowledgment.
          </p>
        </div>
      </>
    ),
  },
  {
    id: '26',
    title: '26. Governing Law & Dispute Resolution',
    content: (
      <>
        <p>
          These Terms &amp; Conditions, and any claim, controversy, or dispute arising out of or related to their interpretation, execution, or performance, shall be governed by, construed, and enforced in accordance with the substantive <strong className="text-slate-900">laws of the Republic of India</strong>.
        </p>
        <p>
          <strong className="text-slate-900">Amicable Settlement:</strong> In the event of any dispute or disagreement, the parties agree to first endeavor to resolve the matter amicably through direct, good-faith consultations with our Grievance Redressal desk for a minimum period of thirty (30) days.
        </p>
        <p>
          <strong className="text-slate-900">Jurisdiction:</strong> Subject to the overriding statutory jurisdiction of competent Consumer Disputes Redressal Commissions under the Consumer Protection Act, 2019, any legal suit, action, or proceeding arising out of or relating to these Terms shall be subject to the exclusive jurisdiction of the <strong className="text-slate-900">competent courts of law in Mumbai, Maharashtra, India</strong>.
        </p>
      </>
    ),
  },
  {
    id: '27',
    title: '27. Modifications to Terms & Conditions',
    content: (
      <>
        <p>
          LayoverX reserves the right to amend, modify, update, or replace any part of these Terms at its sole discretion, to reflect changes in regulatory requirements, operational models, new service integrations, or technological advancements.
        </p>
        <p>
          Any modifications will take effect immediately upon the posting of the updated Terms on the Platform, marked with the current &ldquo;Last Updated&rdquo; and &ldquo;Effective Date&rdquo; timestamps.
        </p>
        <p>
          Your continued access to or use of the Platform following the publication of any modifications constitutes your unconditional acceptance of the revised Terms. We encourage passengers to review these Terms periodically when planning layovers.
        </p>
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
              Terms &amp; Conditions
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Standard operating agreement, passenger responsibilities, pricing regulations, and vendor facilitator terms for LayoverX bookings at Mumbai CSMIA T2.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-sky-400" /> Last Updated: 25 September 2026
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Effective Date: 25 September 2026
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
                Table of Contents (27 Sections)
              </h2>
              <nav className="space-y-1 text-xs max-h-[calc(100vh-280px)] overflow-y-auto no-scrollbar pr-1">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#section-${s.id}`}
                    className="block p-1.5 rounded-lg text-slate-600 hover:text-[#0369a1] hover:bg-sky-50 font-medium transition truncate"
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
              <div className="pt-2 text-[11px] text-slate-400 space-y-1.5">
                <div>• Jurisdiction: Competent Courts in Mumbai, India</div>
                <div>• Support: <Placeholder text="[SUPPORT EMAIL]" /></div>
                <div>• Grievance: <Placeholder text="[GRIEVANCE EMAIL]" /></div>
                <div>• Phone: <Placeholder text="[SUPPORT PHONE]" /></div>
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
                  <p className="text-sm font-bold text-slate-900 group-hover:text-[#0369a1]">Privacy Policy →</p>
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
