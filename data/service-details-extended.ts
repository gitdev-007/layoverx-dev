export interface ExtendedServiceDetail {
  id: string;
  tagline: string;
  fullOverview: string;
  terminalAccessGuide: string;
  transitTimingBreakdown: {
    normalMinutes: string;
    peakMinutes: string;
    recommendedDepartureBuffer: string;
  };
  venueSpecifications: {
    label: string;
    value: string;
  }[];
  signatureHighlights: {
    title: string;
    desc: string;
  }[];
  whatsIncluded: string[];
  whatsExcluded: string[];
  layoverTips: string[];
}

export const EXTENDED_SERVICE_DETAILS: Record<string, ExtendedServiceDetail> = {
  // HOTELS
  h1: {
    id: 'h1',
    tagline: 'Zero-Commute In-Terminal Micro-Stay Pods & Suites',
    fullOverview:
      'Niranta Airport Transit Hotel is physically integrated inside Mumbai CSMIA Terminal 2. It offers two distinct wings: an Airside wing for international transit passengers connecting on onward international flights without clearing Indian immigration, and a Landside wing for domestic travelers. Each room is soundproofed with acoustic double glazing to eliminate tarmac aircraft noise, and features high-pressure rain showers, luxury bedding, and real-time flight departure screens.',
    terminalAccessGuide:
      'Airside Wing: Follow transit signage on Level 2 (Arrivals Concourse) directly after security check. Landside Wing: Located on Level 1, near the public arrivals corridor. No taxi or bus required.',
    transitTimingBreakdown: {
      normalMinutes: '0 mins (Inside Terminal 2)',
      peakMinutes: '0 mins walk to boarding gates',
      recommendedDepartureBuffer: 'Walk to T2 gates in 3–7 minutes',
    },
    venueSpecifications: [
      { label: 'Room Soundproofing', value: 'Double-glazed 42dB acoustic isolation' },
      { label: 'Shower Facilities', value: 'Private en-suite hot rain shower with organic bath amenities' },
      { label: 'Bedding Quality', value: 'Custom orthopedic mattress with 400-thread Egyptian cotton' },
      { label: 'Flight Monitoring', value: 'In-room interactive TV linked to live CSMIA departure radar' },
      { label: 'Visa Requirement', value: 'Zero visa needed for International Airside transit guests' },
    ],
    signatureHighlights: [
      { title: 'Zero Airport Exit Required', desc: 'Sleep and shower post-security without passing through Indian customs or immigration lines.' },
      { title: 'Full Sleep Darkness', desc: '100% blackout roller blinds ensure deep, restorative rest regardless of daylight or tarmac lights.' },
      { title: 'Hourly Precision Slots', desc: 'Book flexible 3, 6, or 12-hour micro-stay blocks tailored around your flight arrival time.' },
      { title: '24/7 Transit Dining', desc: 'Round-the-clock room service and express continental breakfast served in under 15 minutes.' },
    ],
    whatsIncluded: ['High-speed Wi-Fi (300 Mbps)', 'Private rain shower & toiletries', 'Bottled mineral water & tea/coffee kit', 'Luggage stowage in room', 'Flight wake-up call'],
    whatsExcluded: ['Alcoholic beverages', 'Laundry services', 'International phone calls'],
    layoverTips: [
      'Ensure your connecting flight departs from Terminal 2 before booking the Airside wing.',
      'If your baggage is checked through to your final destination, proceed directly to the hotel without visiting baggage claim.',
    ],
  },
  h2: {
    id: 'h2',
    tagline: '5-Star Resort Sanctuary 5 Minutes from Terminal 2',
    fullOverview:
      'JW Marriott Mumbai Sahar represents the pinnacle of luxury stopovers. Located less than 1.5 km from Terminal 2, this urban resort offers dedicated day-use rooms, an expansive outdoor lagoon pool set amidst tropical palms, the award-winning Quan Spa, and 24-hour global dining at JW Cafe. Complimentary luxury airport shuttles run every 15 minutes around the clock.',
    terminalAccessGuide:
      'Exit Terminal 2 Arrivals on Level P4 (Commercial Pick-up Zone, Pillar 4). Look for the uniformed JW Marriott airport representative holding an iPad sign. Free shuttle coach takes 5–8 minutes.',
    transitTimingBreakdown: {
      normalMinutes: '5–8 mins by shuttle coach',
      peakMinutes: '10–12 mins via Sahar Elevated Road',
      recommendedDepartureBuffer: 'Leave hotel 2.5 hours before international flights',
    },
    venueSpecifications: [
      { label: 'Property Class', value: '5-Star Luxury Urban Resort (Marriott International)' },
      { label: 'Pool & Wellness', value: 'Resort lagoon pool, whirlpool jacuzzi, & poolside cabanas' },
      { label: 'Dining Options', value: 'JW Cafe (24/7 Buffet), Romano’s (Italian), & JW Lounge' },
      { label: 'Airport Shuttle', value: 'Complimentary luxury AC coach departing every 15 minutes 24/7' },
      { label: 'Luggage Handling', value: 'Full bell-desk concierge service and secure luggage hold' },
    ],
    signatureHighlights: [
      { title: 'Resort Day Pass Included', desc: 'Full access to the palm-fringed outdoor pool, fitness center, and luxury spa steam rooms during your stay.' },
      { title: 'Seamless Terminal Transfer', desc: 'Dedicated hotel shuttle ensures smooth, hassle-free airport transit without booking outside cabs.' },
      { title: 'Executive Day Suites', desc: 'Marble bathrooms with deep soaking tubs, separate rain showers, and ergonomic workstations.' },
      { title: 'Award-Winning Dining', desc: 'Indulge in extensive multi-cuisine buffets featuring Indian, Asian, Japanese, and Western specialties.' },
    ],
    whatsIncluded: ['24/7 complimentary airport shuttle', 'Outdoor lagoon pool & gym access', 'High-speed Wi-Fi', 'Luxury Aromatherapy Associates bath amenities', 'Complimentary bottled water'],
    whatsExcluded: ['Spa treatments (available for booking)', 'Buffet meals (unless included in slot package)', 'Minibar items'],
    layoverTips: [
      'Have your Indian Tourist or Transit e-Visa ready to clear immigration at T2 before meeting the shuttle.',
      'Notify front desk of your boarding time upon check-in to schedule your return shuttle departure.',
    ],
  },
  h3: {
    id: 'h3',
    tagline: 'Asia’s First Certified Eco-5-Star Hotel with Runway Views',
    fullOverview:
      'The Orchid Hotel Mumbai is renowned as Asia’s first certified 5-star Ecotel, situated along the domestic airport corridor. It features a spectacular 70-foot indoor atrium waterfall that purifies indoor air, a rooftop swimming pool with breathtaking views of aircraft taking off and landing at CSMIA, and double-glazed soundproof rooms designed for quiet transit rest.',
    terminalAccessGuide:
      'Located on Nehru Road, Vile Parle East. 800 meters from Domestic Terminal 1 (3 min drive) and 1.8 km from International Terminal 2 (10–15 min drive via Western Express Highway). Hotel shuttle available on request.',
    transitTimingBreakdown: {
      normalMinutes: '10–15 mins taxi to T2 / 3 mins to T1',
      peakMinutes: '15–22 mins taxi to T2',
      recommendedDepartureBuffer: 'Head to T2 at least 2.5 hours prior to flight',
    },
    venueSpecifications: [
      { label: 'Environmental Rating', value: 'Asia’s First 5-Star Ecotel (ISO 14001 Certified)' },
      { label: 'Runway Observation', value: 'Rooftop infinity pool with clear tarmac takeoff views' },
      { label: 'Atrium Architecture', value: '70-foot natural indoor cascading waterfall & botanical garden' },
      { label: 'Dining Venues', value: 'Boulevard (24/7 Coffee Shop), South of Vindhyas (Coastal)' },
      { label: 'Soundproofing', value: 'Double acoustic glazed sound barrier windows' },
    ],
    signatureHighlights: [
      { title: 'Rooftop Runway Pool', desc: 'Swim in the rooftop pool while watching Boeing and Airbus aircraft ascend into the Mumbai sky.' },
      { title: 'Eco-Luxury Standard', desc: 'Chemical-free ambient air, herbal bathroom toiletries, and zero single-use plastics.' },
      { title: 'Ideal Inter-Terminal Hub', desc: 'Strategically positioned between Terminal 1 and Terminal 2 for seamless domestic-to-international transfers.' },
      { title: 'Authentic Coastal Delicacies', desc: 'Home to the celebrated South of Vindhyas restaurant serving traditional master-curated thalis.' },
    ],
    whatsIncluded: ['Rooftop swimming pool & gym access', 'Airport shuttle transfers', 'Complimentary Wi-Fi', 'Herbal guest amenities', 'Luggage storage'],
    whatsExcluded: ['Restaurant specialty dining', 'Laundry & dry cleaning', 'Spa therapies'],
    layoverTips: [
      'Perfect choice if your layover involves transferring between Domestic Terminal 1 and International Terminal 2.',
      'Visit the rooftop deck during sunset for incredible aviation photography.',
    ],
  },
  h4: {
    id: 'h4',
    tagline: 'Smart, Ergonomic Budget Transit Rooms Near Terminal 1',
    fullOverview:
      'Ibis Mumbai Airport provides smart, European-standard micro-stays focused on ergonomic comfort and efficiency. Located right on the Western Express Highway minutes from Terminal 1, it features the signature "Sweet Bed by Ibis", sound-insulated rooms, high-speed Wi-Fi, and 24/7 grab-and-go dining.',
    terminalAccessGuide:
      'Located on Western Express Highway, Vile Parle East. Just 800m from Domestic T1 and 3.5 km from Terminal 2. Fast app-based cabs (Uber/Ola) arrive at the lobby within 3 minutes.',
    transitTimingBreakdown: {
      normalMinutes: '10–18 mins taxi to T2 / 4 mins to T1',
      peakMinutes: '18–25 mins taxi to T2',
      recommendedDepartureBuffer: 'Depart hotel 2.5 hours before international flights',
    },
    venueSpecifications: [
      { label: 'Bed Innovation', value: 'Signature "Sweet Bed by Ibis" with high-density topper' },
      { label: 'Connectivity', value: 'High-speed business fiber Wi-Fi throughout hotel' },
      { label: 'Food & Beverage', value: 'Spice It Restaurant & 24/7 Grab & Go counter' },
      { label: 'Work Setup', value: 'Ergonomic in-room desk with universal charging hub' },
      { label: 'Check-in Speed', value: 'Mobile digital express check-in under 60 seconds' },
    ],
    signatureHighlights: [
      { title: 'Unbeatable Transit Value', desc: 'Get comfortable 5-star standard bedding and private hot shower suites at budget-friendly rates.' },
      { title: 'Sound-Insulated Sleep', desc: 'Thick soundproofing materials ensure quiet sleep despite proximity to major transit roads.' },
      { title: 'Grab & Go 24/7 Cafe', desc: 'Fresh espresso, hot croissants, sandwiches, and ready-to-eat hot bowls available at any hour.' },
      { title: 'Express Airport Taxi Service', desc: 'Direct access to Western Express Highway avoids inner city bottleneck chokepoints.' },
    ],
    whatsIncluded: ['High-speed Wi-Fi', 'Hot shower & bath towels', 'In-room tea & coffee maker', 'Left-luggage hold'],
    whatsExcluded: ['Airport shuttle (pre-paid cabs readily available)', 'Buffet breakfast (available on order)'],
    layoverTips: [
      'Use the hotel concierge to book a prepaid airport taxi directly to your departure terminal gate.',
    ],
  },
  h5: {
    id: 'h5',
    tagline: 'Japanese-Style Futuristic Sleeping Pods with Keycard Lockers',
    fullOverview:
      'Urbanpod Airport Pod Hotel offers a futuristic Japanese capsule experience for transit passengers wanting privacy, clean sleep, and low cost. Located 5 minutes from Terminal 2, each self-contained pod is equipped with customized ambient mood lighting, personal TV with headphone jacks, climate control, and digital keycard security.',
    terminalAccessGuide:
      'Located in Andheri East, 1.5 km from Terminal 2. Quick 8-minute taxi ride directly from the airport terminal pickup level.',
    transitTimingBreakdown: {
      normalMinutes: '8–12 mins taxi to T2',
      peakMinutes: '15–20 mins taxi to T2',
      recommendedDepartureBuffer: 'Leave pod 2.5 hours prior to international departure',
    },
    venueSpecifications: [
      { label: 'Pod Dimensions', value: 'Single & Suite Pods with memory foam mattresses' },
      { label: 'In-Pod Tech', value: 'Individual TV, USB ports, headphone jack, and ambient LED controls' },
      { label: 'Bathrooms', value: 'Modern shared luxury shower and vanity suites with hot water' },
      { label: 'Baggage Security', value: 'Private electronic keycard locker for trolley & carry-on bags' },
      { label: 'Air Circulation', value: 'Continuous HEPA-filtered silent pod ventilation system' },
    ],
    signatureHighlights: [
      { title: 'High-Tech Private Capsule', desc: 'Slide the acoustic shutter closed and enjoy your own private climate-controlled sleeping chamber.' },
      { title: 'Electronic Locker Included', desc: 'Keep your passport, laptop, and trolley bag completely safe in your designated secure locker.' },
      { title: 'Luxury Rain Showers', desc: 'Spotlessly clean shared vanity and hot rain shower stalls with fresh towels and soap dispensers.' },
      { title: 'Cost-Effective Short Stay', desc: 'Ideal for solo transit travelers needing 3 to 6 hours of sleep without booking expensive hotel suites.' },
    ],
    whatsIncluded: ['Private sleeping pod', 'Electronic locker access', 'Shared hot rain shower & fresh towels', 'High-speed Wi-Fi'],
    whatsExcluded: ['In-pod dining (lounge area available)', 'Private en-suite bathroom'],
    layoverTips: [
      'Pack your immediate essentials in a small backpack for the pod; store your main trolley in the provided locker.',
    ],
  },

  // RESTAURANTS
  r1: {
    id: 'r1',
    tagline: 'World-Renowned Coastal Seafood 12 Mins from Airport',
    fullOverview:
      'Gajalee is internationally acclaimed as one of Mumbai’s greatest coastal seafood institutions. Specializing in Mangalorean and Malvani coastal delicacies, Gajalee is celebrated worldwide for its Butter Garlic King Crab, Tandoori Lobster, crispy Bombay Duck (Bombil Rava Fry), and authentic Sol Kadhi. Located in Vile Parle East, it is an easy 12-minute taxi ride from Terminal 2.',
    terminalAccessGuide:
      'Located on Hanuman Road, Vile Parle East. Take an airport taxi from Terminal 2 Arrivals via Sahar Elevated Road (approx 12–15 mins). Driver can wait outside or taxi easily hailed via Uber/Ola for the return.',
    transitTimingBreakdown: {
      normalMinutes: '12–18 mins taxi from T2',
      peakMinutes: '20–28 mins taxi from T2',
      recommendedDepartureBuffer: 'Allow 2.5 hours before flight check-in',
    },
    venueSpecifications: [
      { label: 'Cuisine Focus', value: 'Authentic Mangalorean & Malvani Coastal Seafood' },
      { label: 'Service Turnaround', value: 'Express transit service (dishes served in 15–20 mins)' },
      { label: 'Hygiene & Water', value: '100% RO purified mineral water food preparation' },
      { label: 'Dining Ambience', value: 'Fully air-conditioned luxury family dining hall' },
      { label: 'Takeaway Packaging', value: 'Spill-proof airport-safe food packaging available' },
    ],
    signatureHighlights: [
      { title: 'Legendary Butter Garlic Crab', desc: 'Fresh live catch simmered in rich garlic butter sauce, recognized worldwide by international food critics.' },
      { title: 'Crispy Bombay Duck (Bombil Fry)', desc: 'Tender fish coated in semolina and fried to a crisp golden crunch — a quintessential Mumbai classic.' },
      { title: 'Refreshing Sol Kadhi', desc: 'Tangy, soothing digestive drink made from fresh coconut milk and kokum fruit with green chillies.' },
      { title: 'Fast-Track Transit Ordering', desc: 'Inform your server you have a flight connection for expedited kitchen preparation and instant billing.' },
    ],
    whatsIncluded: ['Reserved transit table', 'Complimentary bottled water', 'Expedited bill service', 'Hand baggage safe-keeping at host desk'],
    whatsExcluded: ['Personal alcoholic beverages', 'Government dining taxes / service charges'],
    layoverTips: [
      'Ask the steward to show you the day’s live crab selection to choose your preferred size before cooking.',
      'Order Neer Dosa to scoop up the luscious coastal crab and prawn curry gravies.',
    ],
  },
  r2: {
    id: 'r2',
    tagline: 'Legendary Northwest Frontier Cuisine Inside 5-Star ITC Maratha',
    fullOverview:
      'Peshawri at ITC Maratha is a legendary tribute to the rugged culinary traditions of the Northwest Frontier. Cooked exclusively in traditional clay tandoors over glowing charcoal, its menu features the world-famous Dal Bukhara (simmered slowly for 18 hours), melt-in-the-mouth Sikandari Raan, and succulent Murgh Malai Kababs. Located just 1.1 km from Terminal 2, it offers an unforgettable gourmet experience for transit travelers.',
    terminalAccessGuide:
      'Located inside ITC Maratha Luxury Collection Hotel, Sahar Road, Andheri East. Just 5 minutes by pre-arranged car or airport taxi from Terminal 2 Arrivals.',
    transitTimingBreakdown: {
      normalMinutes: '5–8 mins taxi from T2',
      peakMinutes: '10–12 mins taxi from T2',
      recommendedDepartureBuffer: 'Head back to T2 gates 2.5 hours prior to departure',
    },
    venueSpecifications: [
      { label: 'Culinary Style', value: 'Authentic Northwest Frontier / Tandoori Clay Oven' },
      { label: 'Iconic Dish', value: 'Dal Bukhara (slow-cooked black lentils for 18 hours)' },
      { label: 'Dining Ritual', value: 'Traditional finger-food dining with checkered bibs provided' },
      { label: 'Hygiene & Safety', value: 'ITC Hotels WeAssure 5-Star international hygiene certification' },
      { label: 'Dietary Options', value: 'Halal certified meats and dedicated Pure Vegetarian specialties' },
    ],
    signatureHighlights: [
      { title: '18-Hour Dal Bukhara', desc: 'Rich, creamy black lentils, tomatoes, ginger, and garlic simmered overnight over slow charcoal embers.' },
      { title: 'Sikandari Raan', desc: 'Whole leg of tender spring lamb marinated in spiced braising juices and charcoal roasted to perfection.' },
      { title: 'Rustic Luxury Décor', desc: 'Rough-hewn timber tables, copper crockery, and warm Bukhara carpets creating an authentic frontier ambiance.' },
      { title: '5 Minutes to Terminal 2', desc: 'Positioned right on the Sahar Airport corridor, ensuring you never stress about missing your flight.' },
    ],
    whatsIncluded: ['Guaranteed table reservation', 'Valet parking & airport luggage hold', 'Checkered dining bibs & hot towels', 'High-speed Wi-Fi'],
    whatsExcluded: ['Premium vintage wines & cocktails', 'A la carte dessert selections'],
    layoverTips: [
      'Peshawri encourages eating with your fingers to truly experience the textures of frontier cuisine; bibs are provided!',
      'Book your table slot in advance as dinner reservations fill quickly during international transit banks.',
    ],
  },
  r3: {
    id: 'r3',
    tagline: '30-Year-Old Authentic Maharashtrian & Konkani Family Feast',
    fullOverview:
      'Highway Gomantak in Bandra East is an iconic 30-year-old culinary landmark beloved by Mumbaikars for authentic Konkani and Gomantak homestyle cooking. Renowned for its fish curry thalis, fried Surmai (kingfish), spicy Sukha Mutton, and Tisrya (clams) masala, it offers a quick, affordable, and incredibly flavorful taste of local Mumbai culture just 18 minutes from the airport.',
    terminalAccessGuide:
      'Located on Western Express Highway Service Road, Bandra East. Easy 18–25 minute taxi ride directly via the Western Express Highway from Terminal 2 or Terminal 1.',
    transitTimingBreakdown: {
      normalMinutes: '18–22 mins taxi from T2',
      peakMinutes: '28–35 mins taxi from T2',
      recommendedDepartureBuffer: 'Depart restaurant 2.5 hours before flight boarding',
    },
    venueSpecifications: [
      { label: 'Cuisine Style', value: 'Authentic Konkani, Goan, & Maharashtrian Seafood' },
      { label: 'Dining Format', value: 'Traditional Thali & quick homestyle a la carte' },
      { label: 'Turnaround Time', value: 'Rapid service (meals served in 12–15 minutes)' },
      { label: 'Heritage', value: '30+ years of family-run culinary excellence' },
      { label: 'Budget Level', value: 'High value local pricing (approx ₹800 for two)' },
    ],
    signatureHighlights: [
      { title: 'Surmai Fry Thali', desc: 'Crispy fried kingfish steak served with coconut fish curry, steamed rice, chapatis, and fresh sol kadhi.' },
      { title: 'Tisrya (Clams) Masala', desc: 'Fresh local clams cooked in roasted coconut and onion gravy with traditional Konkani spices.' },
      { title: 'Swift Transit Pace', desc: 'Famous for rapid table turnover and prompt food delivery, ideal for time-conscious travelers.' },
      { title: 'True Local Culture', desc: 'Step away from sanitized airport terminals and taste Mumbai homestyle cooking as locals have for decades.' },
    ],
    whatsIncluded: ['Reserved seating', 'Bottled mineral water', 'Luggage stowage by host station', 'Fast billing'],
    whatsExcluded: ['Alcohol (dry establishment)', 'Dessert varieties'],
    layoverTips: [
      'Order the Bombil Rava Fry alongside your main thali for an extraordinary seafood appetizer.',
      'Combine this dining trip with a short drive across the Bandra-Worli Sea Link if you have 5+ hours of layover.',
    ],
  },
  r4: {
    id: 'r4',
    tagline: 'Iconic Hygienic Mumbai Street Food & Chaat Trail in Bandra',
    fullOverview:
      'Elco Chowpatty on Hill Road, Bandra is Mumbai’s most famous and trusted destination for authentic street food. Celebrating over 40 years of culinary history, Elco is world-renowned for its crispy Pani Puri prepared exclusively with purified mineral RO water, butter-drenched Pav Bhaji, Sev Puri, and rich Rabdi Kulfi Falooda. Located in the lively shopping district of Bandra West, it is a must-visit for food lovers.',
    terminalAccessGuide:
      'Located on Hill Road, Bandra West. Take an AC airport cab from Terminal 2 via Bandra Kurla Complex (BKC) or Western Express Highway (approx 22–30 mins).',
    transitTimingBreakdown: {
      normalMinutes: '22–28 mins taxi from T2',
      peakMinutes: '32–40 mins taxi during evening rush',
      recommendedDepartureBuffer: 'Leave Bandra 2.5 hours before flight boarding time',
    },
    venueSpecifications: [
      { label: 'Water Hygiene', value: '100% Mineral RO water used in all Pani Puri & cooking' },
      { label: 'Dining Comfort', value: 'Multi-story fully air-conditioned modern restaurant' },
      { label: 'Famous Specialties', value: 'Pani Puri, Butter Pav Bhaji, Dahi Batata Puri, Kulfi' },
      { label: 'Dietary Standard', value: '100% Pure Vegetarian & Jain friendly options' },
      { label: 'Serving Speed', value: 'Immediate live counter service (under 10 minutes)' },
    ],
    signatureHighlights: [
      { title: 'Safe & Hygienic Street Food', desc: 'Indulge in Mumbai’s iconic street chaat with zero water worries thanks to strict mineral water protocols.' },
      { title: 'Amul Butter Pav Bhaji', desc: 'Piping hot spiced vegetable mash generously topped with melting Amul butter and toasted soft buns.' },
      { title: 'Crispy Dahi Batata Puri', desc: 'Crunchy puris filled with spiced potatoes, sweetened yogurt, tangy tamarind chutney, and fine sev.' },
      { title: 'Royal Kulfi Falooda', desc: 'Traditional dense Indian pistachio kulfi served with vermicelli noodles, rose syrup, and basil seeds.' },
    ],
    whatsIncluded: ['Reserved AC table', 'Filtered mineral water', 'Dedicated baggage security space', 'Takeaway packaging'],
    whatsExcluded: ['Non-vegetarian items (100% Pure Veg)', 'Alcoholic drinks'],
    layoverTips: [
      'Take a quick 10-minute stroll down Bandra’s vibrant Hill Road or Bandstand after dining to see the Arabian Sea.',
      'Inform the chaat master if you prefer medium, sweet, or extra spicy pani puri water.',
    ],
  },

  // SPAS
  s1: {
    id: 's1',
    tagline: 'Airside Express Foot Reflexology & Anti-Fatigue Therapy',
    fullOverview:
      'O2 Spa inside Mumbai CSMIA Terminal 2 is the premier airside wellness center designed specifically for international transit passengers. Situated near Gate 68 post-security, it requires no immigration clearance or visa. Offering targeted reflexology, back and neck stress relief, private hot shower suites, and herbal detox teas, it rejuvenates weary passengers in 45 minutes.',
    terminalAccessGuide:
      'Located post-security inside Terminal 2, near Gate 68 on the International Departures Concourse. Zero transit visa needed. Just walk from your arrival gate in 3–5 minutes.',
    transitTimingBreakdown: {
      normalMinutes: '0 mins (Inside Terminal 2)',
      peakMinutes: '0 mins walk to departure gates',
      recommendedDepartureBuffer: 'Reach boarding gate 30 mins before departure',
    },
    venueSpecifications: [
      { label: 'Location Type', value: 'Airside Post-Security (Inside Terminal 2 Gate 68)' },
      { label: 'Shower Availability', value: 'Private hot rain shower stalls with fresh towels' },
      { label: 'Therapist Training', value: 'Certified international sports & reflexology therapists' },
      { label: 'Session Lengths', value: 'Express 30m, 45m, & 60m layover sessions' },
      { label: 'Baggage Handling', value: 'Personal luggage lockers inside treatment room' },
    ],
    signatureHighlights: [
      { title: 'Zero Airport Exit', desc: 'Relax and shower without going through customs, immigration queues, or baggage reclaim.' },
      { title: 'Long-Haul Foot Reflexology', desc: 'Targets pressure points on swollen feet and calves to restore healthy blood circulation after long flights.' },
      { title: 'Rain Shower Suite Included', desc: 'Step off your red-eye flight, enjoy a hot pressurized shower, and change into clean clothes.' },
      { title: 'Herbal Detox Infusions', desc: 'Complimentary hot ginger-lemon and chamomile teas to soothe digestion and hydrate your body.' },
    ],
    whatsIncluded: ['Foot reflexology treatment', 'Private rain shower access & fresh towels', 'Herbal teas & mineral water', 'Cabin luggage locker'],
    whatsExcluded: ['Extended hotel day rooms (spa facility only)'],
    layoverTips: [
      'Book a 45-minute slot if you have a short 2 to 3-hour layover to leave ample time for gate boarding.',
    ],
  },
  s2: {
    id: 's2',
    tagline: 'Holistic Jetlag Recovery & Scandinavian Steam Suite at JW Marriott',
    fullOverview:
      'Quan Spa at JW Marriott Sahar is a world-class wellness sanctuary offering customized deep-tissue jetlag therapies. Featuring marine botanicals, eucalyptus steam suites, therapeutic hydrotherapy jacuzzis, and heated stone beds, this 90-minute circuit dissolves muscle tension and resets your circadian rhythm.',
    terminalAccessGuide:
      'Located inside JW Marriott Sahar, 1.2 km from Terminal 2. Take the complimentary 24/7 hotel shuttle coach from T2 Arrivals Level P4 (Pillar 4).',
    transitTimingBreakdown: {
      normalMinutes: '5–8 mins shuttle from T2',
      peakMinutes: '10–12 mins shuttle from T2',
      recommendedDepartureBuffer: 'Head back to T2 2.5 hours prior to international flight',
    },
    venueSpecifications: [
      { label: 'Facility Standard', value: '5-Star Luxury Spa (Marriott International)' },
      { label: 'Thermal Circuit', value: 'Eucalyptus steam room, Scandinavian sauna, & jacuzzi' },
      { label: 'Oils & Botanicals', value: 'Pure cold-pressed organic sesame, lavender, & sandalwood' },
      { label: 'Treatment Suites', value: 'Soundproof private treatment rooms with attached showers' },
      { label: 'Pool Access', value: 'Complimentary access to outdoor tropical lagoon pool' },
    ],
    signatureHighlights: [
      { title: 'Comprehensive 90-Min Reset', desc: 'Full body deep tissue massage targeting lower back compression and shoulder tension from airplane seats.' },
      { title: 'Thermal Steam & Sauna Suite', desc: 'Detoxify your skin and sinuses in eucalyptus-scented steam rooms before your massage.' },
      { title: 'Outdoor Lagoon Pool Access', desc: 'Spend time relaxing on sun loungers beside the tropical outdoor pool after your treatment.' },
      { title: 'Dedicated Airport Shuttle', desc: 'Zero hassle return travel with hotel shuttles departing every 15 minutes directly to T2.' },
    ],
    whatsIncluded: ['90-min deep tissue massage', 'Steam, sauna & jacuzzi access', 'Outdoor resort pool access', 'Fresh herbal refreshments', 'Luggage concierge'],
    whatsExcluded: ['A la carte salon hair styling', 'Overnight accommodation'],
    layoverTips: [
      'Arrive 20 minutes prior to your therapy appointment to unwind in the eucalyptus steam room.',
    ],
  },
  s3: {
    id: 's3',
    tagline: 'Royal Indian Ayurvedic Head & Body Therapy Near Terminal 1',
    fullOverview:
      'Jiva Spa at Taj Santacruz channels ancient Indian royal wellness traditions using pure botanical essential oils, Ayurvedic herbal poultices, and pressure point techniques. Located adjacent to Domestic Terminal 1, it starts with a traditional brass foot-wash ceremony and delivers restorative wellness for international and domestic passengers.',
    terminalAccessGuide:
      'Located inside Taj Santacruz, next to Domestic Terminal 1. Just 3 mins from T1 and 12–15 mins from Terminal 2 by airport taxi.',
    transitTimingBreakdown: {
      normalMinutes: '10–15 mins taxi from T2 / 3 mins from T1',
      peakMinutes: '18–25 mins taxi from T2',
      recommendedDepartureBuffer: 'Depart hotel 2.5 hours before international flights',
    },
    venueSpecifications: [
      { label: 'Wellness Lineage', value: 'Traditional Royal Indian Ayurveda (Taj Hotels Heritage)' },
      { label: 'Herbal Ingredients', value: '100% natural indigenous Indian botanicals & essential oils' },
      { label: 'Ceremony Ritual', value: 'Signature ceremonial warm foot bath with fresh rose petals' },
      { label: 'Shower Amenities', value: 'Private marble shower suite with organic Ayurvedic soaps' },
      { label: 'Transit Proximity', value: '0.5 km from Domestic Terminal 1 gates' },
    ],
    signatureHighlights: [
      { title: 'Authentic Indian Aromatherapy', desc: 'Custom blended oils of sandalwood, rose, and tulsi soothe travel nerves and restore inner harmony.' },
      { title: 'Indian Head & Neck Relief', desc: 'Specialized ancient champi acupressure techniques release tension from economy seat neck strain.' },
      { title: 'Signature Taj Hospitality', desc: 'Experience world-renowned Indian hospitality from the moment you step into the serene marble sanctuary.' },
      { title: 'Signature Vishram Massage', desc: 'A deeply relaxing rhythmic full-body massage using warm herbal oils and palm pressure.' },
    ],
    whatsIncluded: ['60-min Ayurvedic therapy', 'Foot-wash ritual', 'Private shower suite & bath robe', 'Signature herbal tea & jaggery', 'Luggage stowage'],
    whatsExcluded: ['Salon services', 'Restaurant dining'],
    layoverTips: [
      'Ideal for travelers flying out of Terminal 1 or transferring between terminals with 4+ hours of layover.',
    ],
  },
  s4: {
    id: 's4',
    tagline: '30-Minute Rapid Anti-Stress Massage Post-Security in T2',
    fullOverview:
      'Encalm Spa at Terminal 2 Departures provides ultra-fast anti-stress therapies for travelers on tight 2 to 3-hour layovers. Located near Gate 75 post-security, its specialized chair massages, foot reflexology, and hot towel treatments relieve neck stiffness and swollen ankles without needing to disrobe or leave the departure concourse.',
    terminalAccessGuide:
      'Inside Terminal 2 post-security near Gate 75 on the Departures Level. No visa or immigration required. Direct walking access from all T2 gates.',
    transitTimingBreakdown: {
      normalMinutes: '0 mins (Inside Terminal 2)',
      peakMinutes: '0 mins walk to gates',
      recommendedDepartureBuffer: 'Finish treatment 35 mins before flight boarding',
    },
    venueSpecifications: [
      { label: 'Location', value: 'Terminal 2 Airside (Near Gate 75 Departures)' },
      { label: 'Session Length', value: 'Fast 30-Minute Targeted Layover Relief' },
      { label: 'Apparel', value: 'No disrobing required for chair massages' },
      { label: 'Focus Areas', value: 'Cervical spine, shoulders, upper back, & calves' },
      { label: 'Flight Proximity', value: 'Steps away from boarding gates 68 to 85' },
    ],
    signatureHighlights: [
      { title: '30-Min Rapid Relief', desc: 'Designed specifically for tight flight connections where every minute counts.' },
      { title: 'Zero Departure Risk', desc: 'Located right next to departure gates with real-time flight monitors visible from your chair.' },
      { title: 'Targeted Pressure Points', desc: 'Releases shoulder blade knots and upper back spasms caused by heavy cabin baggage.' },
      { title: 'Instant Walk-in Access', desc: 'Fast check-in with your LayoverX digital voucher directly on your phone.' },
    ],
    whatsIncluded: ['30-min targeted acupressure therapy', 'Aromatic hot towel revive', 'Herbal green tea', 'Carry-on luggage space'],
    whatsExcluded: ['Private shower suites (chair and massage pod format)'],
    layoverTips: [
      'Perfect for quick stopovers under 3 hours where booking an off-airport hotel is impractical.',
    ],
  },
  s5: {
    id: 's5',
    tagline: 'Eco-Certified Balinese Massage & Rain Shower Near Terminal 1',
    fullOverview:
      'Aura Spa at The Orchid Hotel provides an eco-friendly wellness sanctuary near Terminal 1. Specializing in soothing Balinese long-stroke massages, herbal steam baths, and hot rain showers, it uses 100% natural, chemical-free herbal balms to relax muscles and restore energy between flight legs.',
    terminalAccessGuide:
      'Located on Nehru Road, Vile Parle East. 800m from Terminal 1 (5 mins drive) and 2 km from Terminal 2 (12 mins drive). Free hotel transfer available.',
    transitTimingBreakdown: {
      normalMinutes: '8–12 mins taxi from T2 / 4 mins from T1',
      peakMinutes: '14–20 mins taxi from T2',
      recommendedDepartureBuffer: 'Leave spa 2.5 hours prior to international flight',
    },
    venueSpecifications: [
      { label: 'Eco Certification', value: 'ISO 14001 Eco-Certified Spa Facility' },
      { label: 'Therapy Style', value: 'Balinese Long-Stroke & Acupressure' },
      { label: 'Thermal Amenities', value: 'Herbal steam chamber & hot rain shower' },
      { label: 'Ingredients', value: 'Pure virgin coconut oil and lemongrass balms' },
      { label: 'Pool Access', value: 'Complimentary access to rooftop runway pool' },
    ],
    signatureHighlights: [
      { title: 'Balinese Flow Massage', desc: 'Gentle stretches, long soothing strokes, and pressure points melt away travel stiffness.' },
      { title: 'Herbal Steam Chamber', desc: 'Inhaling natural eucalyptus and camphor steam opens airways and hydrates dry airline cabin skin.' },
      { title: 'Rooftop Pool Inclusion', desc: 'Take a swim in the rooftop pool watching aircraft land at CSMIA after your treatment.' },
      { title: 'Convenient Inter-Terminal Stop', desc: 'Easily accessible whether your flight arrives at T1 or T2.' },
    ],
    whatsIncluded: ['60-min Balinese massage', 'Herbal steam & shower access', 'Rooftop swimming pool pass', 'Green tea refreshment', 'Luggage stowage'],
    whatsExcluded: ['Salon hair treatments', 'Dining meals'],
    layoverTips: [
      'Pair this spa session with a relaxing meal at The Orchid’s 24-hour Boulevard cafe.',
    ],
  },
  s6: {
    id: 's6',
    tagline: '120-Minute Heated Stone & Hydrotherapy Circuit by Westin',
    fullOverview:
      'Heavenly Spa by Westin near the Mumbai International Airport district is the gold standard for full-day wellness. This comprehensive 120-minute journey incorporates heated volcanic basalt stones, Swedish deep muscle massage, a private sauna suite, and access to hydrotherapy plunge pools, delivering the ultimate rejuvenating stopover.',
    terminalAccessGuide:
      'Located in the International Airport district (Powai/Sahar). Easy 18–25 minute taxi ride from Terminal 2 via the expressway.',
    transitTimingBreakdown: {
      normalMinutes: '18–24 mins taxi from T2',
      peakMinutes: '28–35 mins taxi from T2',
      recommendedDepartureBuffer: 'Leave spa 3 hours prior to international departure',
    },
    venueSpecifications: [
      { label: 'Brand Standard', value: 'Heavenly Spa by Westin (Marriott Luxury Portfolio)' },
      { label: 'Therapy Type', value: 'Heated Basalt Stone & Deep Swedish Kneading' },
      { label: 'Hydro Circuit', value: 'Hot & cold vitality pools, sauna, & eucalyptus steam' },
      { label: 'Treatment Time', value: 'Full 120-Minute Rejuvenation Journey' },
      { label: 'Relaxation Deck', value: 'Serene outdoor garden deck with herbal refreshments' },
    ],
    signatureHighlights: [
      { title: 'Heated Basalt Stone Therapy', desc: 'Smooth volcanic stones retain heat to penetrate deep muscle layers and relieve persistent travel aches.' },
      { title: 'Complete Hydrotherapy Circuit', desc: 'Alternate between warm vitality plunge pools and cold showers to stimulate lymphatic circulation.' },
      { title: 'Private Swedish Sauna', desc: 'Indulge in deep thermal sweat therapy to flush out toxins and jetlag fatigue.' },
      { title: 'Westin White Tea Aromatics', desc: 'Surround yourself with Westin’s signature calming white tea fragrance throughout the spa.' },
    ],
    whatsIncluded: ['120-min heated stone & massage therapy', 'Full hydrotherapy & sauna access', 'Outdoor relaxation deck', 'White tea hydration', 'Concierge baggage hold'],
    whatsExcluded: ['Overnight room stay', 'Hotel restaurant dining'],
    layoverTips: [
      'Recommended for layovers of 6 hours or longer to thoroughly enjoy the full 2-hour circuit and pool.',
    ],
  },

  // GAMING & ENTERTAINMENT
  g1: {
    id: 'g1',
    tagline: 'High-Tech PS5 Pro Arena & VIP Lounge Inside Terminal 2',
    fullOverview:
      'The Adani Executive Lounge & Esports Arena is located post-security on the Terminal 2 Departures Concourse. Built for travelers wanting high-octane gaming or quiet entertainment, it features PlayStation 5 Pro consoles, 4K 144Hz monitors, low-latency gigabit fiber internet, VR stations, and an all-inclusive snack and beverage bar. Luggage lockers and live flight radar screens ensure peace of mind.',
    terminalAccessGuide:
      'Post-security inside Terminal 2 Departures near Gate 68. No visa or immigration exit required for international passengers connecting on Terminal 2.',
    transitTimingBreakdown: {
      normalMinutes: '0 mins (Inside Terminal 2)',
      peakMinutes: '0 mins walk to gates',
      recommendedDepartureBuffer: 'Wrap up 40 mins prior to flight boarding time',
    },
    venueSpecifications: [
      { label: 'Gaming Hardware', value: 'Sony PlayStation 5 Pro consoles with DualSense Wireless' },
      { label: 'Displays', value: '27-inch 4K HDR 144Hz 1ms low-latency esports monitors' },
      { label: 'Internet Speed', value: 'Dedicated gigabit fiber connection with sub-10ms ping' },
      { label: 'Snack & Drinks', value: 'Complimentary buffet snack bar, artisanal coffees, & cold drinks' },
      { label: 'Luggage Safety', value: 'Electronic keycard lockers right beside each gaming station' },
    ],
    signatureHighlights: [
      { title: 'Zero Airport Exit', desc: 'Play your favorite games inside the departure terminal without going through immigration queues.' },
      { title: 'Massive Game Library', desc: 'Pre-loaded with popular titles: EA Sports FC 25, Gran Turismo 7, Call of Duty, Spider-Man 2, and Mortal Kombat.' },
      { title: 'Complimentary Snack Bar', desc: 'Help yourself to unlimited gourmet sandwiches, hot pizza pockets, gourmet coffees, and chilled beverages.' },
      { title: 'Boarding Gate Pacing', desc: 'Lounge hosts track your flight radar and personally alert you 40 minutes before gate boarding.' },
    ],
    whatsIncluded: ['3-hour unlimited PS5 Pro gaming pass', 'Complimentary snack buffet & beverages', 'Secure luggage locker', 'High-speed fiber Wi-Fi'],
    whatsExcluded: ['Physical game discs to take home', 'Alcoholic cocktails'],
    layoverTips: [
      'Multiplayer setups allow you to challenge your travel partner to head-to-head FIFA or racing matches.',
    ],
  },
  g2: {
    id: 'g2',
    tagline: 'VR Rollercoasters, Automated Cricket Nets & Bowling 12 Mins from T2',
    fullOverview:
      'Smaaash at Phoenix Marketcity is Mumbai’s largest indoor interactive entertainment hub. Located just 12 minutes from Terminal 2, it features 360-degree virtual reality roller coasters, automated cricket simulators where you face deliveries from virtual world-class bowlers, twilight bowling alleys, and sports bar dining.',
    terminalAccessGuide:
      'Located inside Phoenix Marketcity Mall, Kurla West. 4.5 km from Terminal 2 via the Sahar Elevated Access Road (12–18 mins taxi).',
    transitTimingBreakdown: {
      normalMinutes: '12–18 mins taxi from T2',
      peakMinutes: '20–28 mins taxi from T2',
      recommendedDepartureBuffer: 'Leave mall 2.5 hours prior to flight departure',
    },
    venueSpecifications: [
      { label: 'Attraction Type', value: 'VR Coasters, Cricket Simulators, & Arcade Gaming' },
      { label: 'Cricket Technology', value: 'Automated 360° bowling simulator with speed tracking' },
      { label: 'Bowling Lanes', value: 'UV twilight glow bowling with interactive digital scoring' },
      { label: 'Dining On-Site', value: 'Full sports bar restaurant serving pizzas, burgers, & beer' },
      { label: 'Baggage Concierge', value: 'Mall customer service luggage storage desk available' },
    ],
    signatureHighlights: [
      { title: 'World-Class Cricket Simulator', desc: 'Pick up a bat and face bowling deliveries from legends like Malinga and Warne in a safe netted cage.' },
      { title: '360° Virtual Reality Rides', desc: 'Experience heart-pounding VR roller coasters and flight simulators that move with every twist and drop.' },
      { title: 'Twilight Bowling Alley', desc: 'Enjoy fun, energetic bowling games with your travel companions under blacklight illumination.' },
      { title: 'Unlimited Gaming Pass', desc: 'Play dozens of arcade classics, air hockey, and racing simulators with your LayoverX day card.' },
    ],
    whatsIncluded: ['Unlimited arcade & simulator card', '1 bowling game session', 'Luggage stowage', 'Mall Wi-Fi'],
    whatsExcluded: ['Arcade redemption prize tickets', 'Food & drinks from the sports bar'],
    layoverTips: [
      'Take advantage of the mall’s numerous duty-free and luxury fashion retail stores right outside the arena.',
    ],
  },
  g3: {
    id: 'g3',
    tagline: '180° Heated Motorized Recliners & In-Seat Butler Dining',
    fullOverview:
      'PVR INOX Luxe & IMAX at Phoenix Marketcity redefines cinema comfort for transit travelers. Watch current global releases in ultra-plush, fully reclining heated leather loungers with pillow and fleece blanket service, laser projection, Dolby Atmos 3D sound, and gourmet in-seat butler dining.',
    terminalAccessGuide:
      'Located on Level 3, Phoenix Marketcity Mall, Kurla West. 12–18 minutes by airport cab from Terminal 2 Arrivals.',
    transitTimingBreakdown: {
      normalMinutes: '12–18 mins taxi from T2',
      peakMinutes: '20–26 mins taxi from T2',
      recommendedDepartureBuffer: 'Depart cinema 2.5 hours before flight departure',
    },
    venueSpecifications: [
      { label: 'Seating Quality', value: '180° motorized heated leather loungers with footrests' },
      { label: 'Projection & Audio', value: 'Laser IMAX projection with 64-channel Dolby Atmos 3D sound' },
      { label: 'Butler Service', value: 'In-seat digital call button for gourmet food & beverage delivery' },
      { label: 'Blanket Comfort', value: 'Sanitized fleece blankets and ergonomic head pillows provided' },
      { label: 'Luggage Storage', value: 'Cinema concierge secure luggage check-in desk' },
    ],
    signatureHighlights: [
      { title: '180° Flat Recliner Sleeping Comfort', desc: 'Stretch completely flat in heated leather seats while watching the latest Hollywood or Bollywood film.' },
      { title: 'Gourmet In-Seat Butler Dining', desc: 'Order artisanal pizzas, gourmet dim sum, popcorn varieties, and mocktails delivered directly to your seat.' },
      { title: 'Fleece Blanket & Pillow Service', desc: 'Stay warm and cozy in the climate-controlled theater with freshly laundered luxury blankets.' },
      { title: 'State-of-the-Art IMAX Technology', desc: 'Massive floor-to-ceiling curved screens deliver an immersive cinematic escape during long transits.' },
    ],
    whatsIncluded: ['VIP recliner cinema ticket', 'Fleece blanket and pillow', 'Concierge luggage hold', 'Reserved lounge access'],
    whatsExcluded: ['Food and beverage orders (billed a la carte at seat)'],
    layoverTips: [
      'Check movie runtimes against your available dwell time to ensure a minimum 2.5-hour post-movie buffer.',
    ],
  },
  g4: {
    id: 'g4',
    tagline: 'Ultra-Exclusive Private Screening Pods & Artisanal Sushi in BKC',
    fullOverview:
      'PVR Maison Luxe & Director’s Cut at Jio World Drive, BKC offers an ultra-exclusive movie and lounge experience. Located 20 minutes from the airport via the SCLR expressway, it features private transit screening pods, chef-curated Japanese sushi, signature handcrafted beverages, and personalized concierge luggage holding.',
    terminalAccessGuide:
      'Located in Jio World Drive, Bandra Kurla Complex (BKC). Direct expressway drive via Santa Cruz-Chembur Link Road (SCLR) in approx 20–25 minutes from Terminal 2.',
    transitTimingBreakdown: {
      normalMinutes: '20–25 mins taxi from T2',
      peakMinutes: '28–35 mins taxi from T2',
      recommendedDepartureBuffer: 'Leave BKC 2.5 to 3 hours prior to flight check-in',
    },
    venueSpecifications: [
      { label: 'Lounge Level', value: 'VIP Director’s Cut Private Pods' },
      { label: 'Dining Heritage', value: 'Curated artisanal Japanese sushi, robata, & continental' },
      { label: 'Seating Pods', value: 'Private partitioned couple and solo leather recliner pods' },
      { label: 'Highway Access', value: 'Direct SCLR expressway access avoids local street traffic' },
      { label: 'Luggage Security', value: 'Dedicated VIP concierge luggage cloakroom' },
    ],
    signatureHighlights: [
      { title: 'Private VIP Transit Pods', desc: 'Enjoy maximum privacy with partitioned screening pods, personal adjustable lighting, and charging ports.' },
      { title: 'Chef-Curated Japanese Cuisine', desc: 'Savor fresh sushi rolls, edamame, and gourmet hot bowls prepared by specialized master chefs.' },
      { title: 'Express Airport Route', desc: 'Direct expressway connection back to Terminal 2 ensures rapid and predictable travel times.' },
      { title: 'Jio World Luxury Enclave', desc: 'Surrounded by high-end luxury retail stores, outdoor art installations, and chic open-air cafes.' },
    ],
    whatsIncluded: ['VIP screening pod ticket', 'Concierge luggage check', 'Pillow & blanket', 'Jio World Drive Wi-Fi'],
    whatsExcluded: ['Chef dining orders (billed a la carte at seat)'],
    layoverTips: [
      'Take 15 minutes before or after your film to explore the stunning rooftop garden at Jio World Drive.',
    ],
  },
  g5: {
    id: 'g5',
    tagline: 'Multi-Level Laser Tag Arena, VR Simulators & Bumper Cars',
    fullOverview:
      'Timezone at R City Mall, Ghatkopar offers energetic entertainment for families and solo travelers. Located 18 minutes from Terminal 2, it features a multi-level glow-in-the-dark tactical laser tag arena, modern VR motion rides, spin bumper cars, bowling lanes, and over 100 interactive arcade games.',
    terminalAccessGuide:
      'Located in R City Mall, LBS Marg, Ghatkopar West. Approx 18–25 minutes by taxi from Terminal 2 via the Lal Bahadur Shastri Marg corridor.',
    transitTimingBreakdown: {
      normalMinutes: '18–24 mins taxi from T2',
      peakMinutes: '28–34 mins taxi from T2',
      recommendedDepartureBuffer: 'Depart mall 2.5 hours before flight check-in',
    },
    venueSpecifications: [
      { label: 'Arena Features', value: 'Multi-Level Tactical Laser Tag Arena with infrared phasers' },
      { label: 'Arcade Machines', value: '100+ latest Japanese and Western arcade titles' },
      { label: 'Motion Attractions', value: 'Spin bumper cars and VR 4D motion ride theaters' },
      { label: 'Baggage Safety', value: 'Mall customer service luggage storage facility' },
      { label: 'Family Friendly', value: 'Suitable for travelers of all ages from kids to adults' },
    ],
    signatureHighlights: [
      { title: 'Tactical Multi-Level Laser Tag', desc: 'Compete in an adrenaline-filled, blacklit maze with ramps, obstacles, and interactive base targets.' },
      { title: 'Spin Bumper Cars', desc: 'Whirl and slide in bumper cars equipped with dual joystick controls and responsive LED collision rings.' },
      { title: 'Massive Arcade Selection', desc: 'Race on Super Bikes, test your aim in basketball shootouts, and play the latest rhythm games.' },
      { title: 'Card-Loaded Gaming Pass', desc: 'Pre-loaded LayoverX Powercard allows seamless tap-and-play across all attractions.' },
    ],
    whatsIncluded: ['Loaded Timezone Powercard', '1 Laser Tag mission pass', 'Mall luggage storage access', 'High-speed Wi-Fi'],
    whatsExcluded: ['Food & drinks from mall food court', 'Redemption merchandise'],
    layoverTips: [
      'Wear flat, comfortable walking or running shoes for full mobility in the multi-level laser tag arena.',
    ],
  },

  // TOURS
  t1: {
    id: 't1',
    tagline: 'Private AC Chauffeur Door-to-Door Tour with 2.5h Flight Buffer',
    fullOverview:
      'The Mumbai Highlights Express Private Tour is customized specifically for transit passengers with layovers of 6 hours or longer. Travel in private air-conditioned comfort with an experienced English-speaking chauffeur who meets you right outside Terminal 2 Arrivals. Drive across the iconic Bandra-Worli Sea Link to explore the Gateway of India, the historic Taj Mahal Palace Hotel in Colaba, Marine Drive Queen’s Necklace, and the open-air laundry of Dhobi Ghat, before returning to CSMIA with a guaranteed 2.5-hour security cushion.',
    terminalAccessGuide:
      'Driver meets you directly at Terminal 2 Arrivals (Pillar 4 pickup lane) holding an official LayoverX digital name board. Your luggage is locked securely in the vehicle trunk.',
    transitTimingBreakdown: {
      normalMinutes: '40–55 mins drive to South Mumbai via Sea Link',
      peakMinutes: '60–75 mins drive during peak traffic',
      recommendedDepartureBuffer: 'Calculated 2.5-hour gate return buffer strictly enforced',
    },
    venueSpecifications: [
      { label: 'Vehicle Type', value: 'Private AC Sedan (Dzire/Etios) or SUV (Innova Crysta)' },
      { label: 'Chauffeur Experience', value: 'Licensed commercial tourist driver fluent in English' },
      { label: 'Luggage Security', value: 'All suitcases & carry-on bags locked in vehicle trunk' },
      { label: 'Toll Roads Included', value: 'All Sea Link and Coastal Road expressway tolls pre-paid' },
      { label: 'Flight Protection', value: 'Route dynamically adjusted using live Google Maps traffic radar' },
    ],
    signatureHighlights: [
      { title: 'Gateway of India & Taj Mahal Palace', desc: 'Stand before Mumbai’s most iconic monument and marvel at the 1903 colonial grandeur of the Taj Palace.' },
      { title: 'Marine Drive Queen’s Necklace', desc: 'Enjoy a scenic coastal drive along the sweeping 3.6 km promenade curving along the Arabian Sea.' },
      { title: 'Bandra-Worli Sea Link Highway', desc: 'Glide over the Arabian Sea across the 8-lane cable-stayed architectural marvel with panoramic city skyline views.' },
      { title: 'Dhobi Ghat Observation', desc: 'Glimpse the world’s largest outdoor human-powered laundry system in operation since 1890.' },
    ],
    whatsIncluded: ['Private AC vehicle & dedicated chauffeur', 'Terminal 2 pickup and drop-off', 'All highway tolls & parking fees', 'Chilled bottled mineral water', 'Luggage trunk stowage'],
    whatsExcluded: ['Monument entry tickets (minimal fees)', 'Meals & beverages', 'Personal shopping'],
    layoverTips: [
      'Ensure you have cleared Indian Immigration and hold an Indian Tourist or Transit e-Visa.',
      'Your driver will remain with the car and your luggage at all times while you step out for photos and sightseeing.',
    ],
  },
  t2: {
    id: 't2',
    tagline: 'Portuguese Hamlets, Street Art, Celebrity Homes & Famous Food',
    fullOverview:
      'The Bandra Heritage & Street Food Crawl immerses you in the eclectic cultural heart of Mumbai. Stroll through the 400-year-old Portuguese village of Ranwar with its vibrant wall murals and historic heritage cottages, visit the hilltop Mount Mary Basilica, see Bollywood celebrity mansions on Bandstand overlooking the Arabian Sea, and taste authentic, hygienic street food at 4 iconic culinary stops.',
    terminalAccessGuide:
      'Meet your private driver at Terminal 2 Arrivals. Fast 20–25 minute drive to Bandra West via BKC or Western Express Highway.',
    transitTimingBreakdown: {
      normalMinutes: '20–25 mins drive from T2',
      peakMinutes: '30–38 mins drive from T2',
      recommendedDepartureBuffer: 'Depart Bandra 2.5 hours before flight boarding',
    },
    venueSpecifications: [
      { label: 'Tour Duration', value: '4 Hours (Requires 5.5+ Hour Layover Window)' },
      { label: 'Transport', value: 'Private AC vehicle for transfers + guided walking in Ranwar' },
      { label: 'Food Stops', value: '4 curated tasting stops (Pani Puri, Pav Bhaji, Kebab, Kulfi)' },
      { label: 'Food Hygiene', value: '100% Mineral RO water and hygienic certified vendors' },
      { label: 'Heritage Guide', value: 'Knowledgeable local guide explaining Portuguese & colonial history' },
    ],
    signatureHighlights: [
      { title: 'Ranwar Portuguese Village', desc: 'Wander through narrow winding lanes lined with wooden balconies, heritage crosses, and contemporary street art.' },
      { title: 'Mount Mary Basilica', desc: 'Visit the 16th-century Roman Catholic minor basilica perched atop a scenic hill overlooking the sea.' },
      { title: 'Bollywood Mansions & Bandstand', desc: 'Drive along Bandstand promenade to view the legendary homes of Bollywood superstars including Shah Rukh Khan.' },
      { title: 'Hygienic Street Food Feast', desc: 'Sample mineral water pani puri, buttery pav bhaji, tender seekh kebabs, and pistachio kulfi.' },
    ],
    whatsIncluded: ['Private AC transport & chauffeur', 'All 4 food tasting stop delicacies', 'Bottled mineral water', 'Luggage safely locked in car', 'Airport return transfer'],
    whatsExcluded: ['Alcoholic drinks', 'Personal shopping'],
    layoverTips: [
      'Wear comfortable walking shoes for the 45-minute stroll through Ranwar village’s pedestrian alleys.',
      'Vegetarian and Jain tasting alternatives are readily available at every stop.',
    ],
  },
  t3: {
    id: 't3',
    tagline: 'UNESCO World Heritage Rock-Cut Caves & Colonial Architecture',
    fullOverview:
      'The South Mumbai Heritage & Elephanta Caves Tour is the ultimate cultural stopover for passengers with long layovers of 9 hours or more. Cruise across Mumbai Harbor to the UNESCO World Heritage Elephanta Island to explore 5th-century rock-cut cave temples dedicated to Lord Shiva, followed by a tour of South Mumbai’s British colonial architecture including the UNESCO-listed Victoria Terminus (CST) and the Gateway of India.',
    terminalAccessGuide:
      'Chauffeur greets you at Terminal 2 Arrivals. Drive to the Gateway of India harbor to board the private Elephanta ferry.',
    transitTimingBreakdown: {
      normalMinutes: '45–60 mins drive to Gateway + 1-hour harbor cruise',
      peakMinutes: '60–75 mins drive to Gateway',
      recommendedDepartureBuffer: 'Return to airport 3 hours before international departure',
    },
    venueSpecifications: [
      { label: 'UNESCO Status', value: 'Two UNESCO World Heritage Sites (Elephanta Caves & CST Station)' },
      { label: 'Harbor Cruise', value: '1-Hour scenic ferry boat ride across Mumbai Harbor' },
      { label: 'Heritage Era', value: '5th–8th Century Hindu & Buddhist Rock Architecture' },
      { label: 'Transport', value: 'Dedicated private AC vehicle throughout the entire day' },
      { label: 'Guide', value: 'Government-licensed archaeological guide on Elephanta Island' },
    ],
    signatureHighlights: [
      { title: 'UNESCO Elephanta Island Caves', desc: 'Marvel at the monumental 20-foot three-headed Sadashiva sculpture carved out of solid basalt rock.' },
      { title: 'Mumbai Harbor Scenic Cruise', desc: 'Breathe the fresh sea breeze while admiring views of the naval docks and coastal Mumbai skyline.' },
      { title: 'Victoria Terminus (CST Railway)', desc: 'View the world’s most magnificent Victorian Gothic revival railway station and UNESCO World Heritage site.' },
      { title: 'Colaba Causeway & Cafe Leopold', desc: 'Experience the historic buzz of Colaba Causeway and grab a cold beverage at the legendary Cafe Leopold.' },
    ],
    whatsIncluded: ['Private AC vehicle & chauffeur for full duration', 'Elephanta ferry tickets & island toy train pass', 'Licensed English cave guide', 'Bottled water', 'Airport transfers'],
    whatsExcluded: ['Elephanta camera permit fees (nominal)', 'Lunch dining expenses'],
    layoverTips: [
      'This comprehensive tour requires a minimum 9-hour layover to accommodate the 1-hour boat crossing each way.',
      'Carry sunglasses, sunhat, and comfortable walking shoes for the stone steps on Elephanta Island.',
    ],
  },
  t4: {
    id: 't4',
    tagline: 'Golden Hour Sunset over Arabian Sea, Sea Link & Illuminated Night Landmarks',
    fullOverview:
      "The Queen's Necklace Sunset & Marine Drive Evening Tour captures Mumbai during its most atmospheric twilight hours. Depart the airport in private air-conditioned comfort to watch the golden sun dip into the Arabian Sea from Bandra Bandstand, cruise over the illuminated Bandra-Worli Sea Link, and drive along the famous 3.6 km crescent of Marine Drive as the streetlights glow like pearls. Finish with views of the illuminated Victorian architecture of CSMT and the Gateway of India before heading back to Terminal 2.",
    terminalAccessGuide:
      'Chauffeur greets you at Terminal 2 Arrivals. Best suited for flights arriving between 3:00 PM and 6:30 PM.',
    transitTimingBreakdown: {
      normalMinutes: '35–45 mins drive to Bandra & Marine Drive',
      peakMinutes: '50–65 mins during evening peak traffic',
      recommendedDepartureBuffer: 'Return to airport 2.5 hours prior to departure',
    },
    venueSpecifications: [
      { label: 'Departure Timeframe', value: 'Optimized for late afternoon & evening arrivals' },
      { label: 'Vehicle Type', value: 'Private AC Sedan with panoramic windows' },
      { label: 'Sunset Vantage', value: 'Bandra Bandstand & Marine Drive promenade' },
      { label: 'Night Lighting', value: 'Chhatrapati Shivaji Maharaj Terminus & Gateway of India' },
      { label: 'Dessert Stop', value: 'Complimentary artisanal kulfi at Girgaon Chowpatty' },
    ],
    signatureHighlights: [
      { title: "Marine Drive Queen's Necklace", desc: 'View the dazzling night curve of seaside lights from Nariman Point and Chowpatty.' },
      { title: 'Illuminated Bandra-Worli Sea Link', desc: 'Cross the cable-stayed architectural gem as its towering pylons glow against the dark ocean.' },
      { title: 'Colonial Landmark Light Show', desc: 'Witness Victoria Terminus (CST) and Municipal Heritage headquarters lit in stunning multicolored facade lighting.' },
      { title: 'Chowpatty Beach Kulfi Stop', desc: 'Taste rich, authentic malai and pistachio kulfi directly along Mumbai’s most famous urban beach.' },
    ],
    whatsIncluded: ['Private AC vehicle & dedicated driver', 'All expressway tolls & airport parking', 'Chilled bottled water', 'Girgaon Chowpatty kulfi treat', 'Luggage stowage in car'],
    whatsExcluded: ['Dinner dining bills', 'Personal shopping'],
    layoverTips: [
      'Have your camera or phone fully charged for spectacular sunset and night illumination photos.',
      'Drivers monitor airport return traffic via real-time GPS to ensure you never miss your check-in time.',
    ],
  },
  t5: {
    id: 't5',
    tagline: 'Curated Heritage Bazaars, Indian Textiles, Spices & Handicrafts Trail',
    fullOverview:
      'The Colaba Causeway & Crawford Market Shopping Expedition is designed for transit travelers looking to take home authentic Indian treasures without the stress of navigating Mumbai traffic alone. With a private air-conditioned car and dedicated driver at your service, your purchased goods and carry-on luggage remain safely locked in the vehicle boot while you explore vibrant spice stalls, Kashmiri pashmina emporiums, brass handicrafts, and chic boutique alleyways.',
    terminalAccessGuide:
      'Private chauffeur meets you at Terminal 2 Arrivals with an official name placard. Direct highway drive to South Mumbai bazaars.',
    transitTimingBreakdown: {
      normalMinutes: '40–55 mins drive to Crawford Market / Colaba',
      peakMinutes: '60–75 mins during peak hours',
      recommendedDepartureBuffer: 'Leave South Mumbai 2.5 hours before flight departure',
    },
    venueSpecifications: [
      { label: 'Bazaar Coverage', value: 'Crawford Market, Colaba Causeway & Khadi Emporium' },
      { label: 'Shopping Categories', value: 'Spices, teas, silk scarves, brassware, & boutique jewelry' },
      { label: 'Baggage Security', value: 'Secure vehicle boot to store all shopping bags between stops' },
      { label: 'Vehicle Type', value: 'Private AC Sedan with large luggage compartment' },
      { label: 'Payment Acceptance', value: 'Credit cards & UPI accepted at all partner stalls' },
    ],
    signatureHighlights: [
      { title: 'Crawford Market Spice & Tea Alley', desc: 'Select fragrant Indian saffron, cardamom, Darjeeling loose-leaf teas, and Alphonso mango products.' },
      { title: 'Colaba Causeway Artisan Boutiques', desc: 'Browse handcrafted leather goods, vintage brass artifacts, beaded jewelry, and pashminas.' },
      { title: 'Government Khadi & Handloom Village', desc: 'Shop certified authentic Indian handwoven organic cotton, silks, and traditional clothing.' },
      { title: 'Private Car Boot Convenience', desc: 'Drop heavy bags in the air-conditioned car between stops without carrying them through the markets.' },
    ],
    whatsIncluded: ['Private AC car & chauffeur for entire duration', 'Airport pickup & return drop', 'All expressway tolls', 'Chilled water', 'Luggage safety lockbox'],
    whatsExcluded: ['Personal shopping purchases', 'Meals and drinks'],
    layoverTips: [
      'Drivers can recommend government-certified stores with fixed transparent prices to avoid haggling.',
      'Pack an extra foldable tote bag in your carry-on for your newly purchased souvenirs.',
    ],
  },
};
