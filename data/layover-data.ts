export interface Hotel {
  id: string;
  slotId?: string;
  name: string;
  terminal: string;
  distance: string;
  transitTime?: string;
  rating: number;
  reviews: number;
  stars: number;
  price3h: string;
  price6h: string;
  priceFullNight: string;
  locationCategory: 'in-terminal' | 'near-t2' | 'near-t1';
  amenities: string[];
  description: string;
  image: string;
  badge?: string;
}

export interface Restaurant {
  id: string;
  slotId?: string;
  name: string;
  cuisine: string;
  category: 'seafood' | 'local' | 'north-indian' | 'street-food' | 'fine-dining';
  location: string;
  distance: string;
  rating: number;
  reviews: number;
  avgCost: string;
  transitTime: string;
  amenities: string[];
  description: string;
  image: string;
  badge?: string;
}

export interface Spa {
  id: string;
  slotId?: string;
  name: string;
  category?: string;
  location: string;
  distance: string;
  transitTime?: string;
  rating: number;
  reviews: number;
  price: string;
  duration: string;
  treatment: string;
  amenities: string[];
  description: string;
  image: string;
  badge?: string;
}

export interface GamingLounge {
  id: string;
  slotId?: string;
  name: string;
  category?: string;
  location: string;
  distance: string;
  transitTime?: string;
  rating: number;
  reviews: number;
  price: string;
  features: string[];
  description: string;
  image: string;
  badge?: string;
}

export interface Tour {
  id: string;
  name: string;
  category?: string;
  duration: string;
  safeWindow: string;
  transitTime?: string;
  rating: number;
  reviews: number;
  price: string;
  highlights: string[];
  description: string;
  image: string;
  badge?: string;
  location?: string;
}

export interface Transfer {
  id: string;
  name: string;
  vehicle: string;
  rating: number;
  reviews: number;
  price: string;
  features: string[];
  description: string;
  image: string;
  badge?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  flight: string;
  comment: string;
  rating: number;
  date: string;
}

export const HOTELS_DATA: Hotel[] = [
  {
    id: 'h1',
    name: 'Niranta Airport Transit Hotel & Lounge',
    terminal: 'Inside CSMIA Terminal 2 (Airside & Landside)',
    distance: '0 km from T2 Gates',
    transitTime: '0 min walk (Inside T2)',
    rating: 4.1,
    reviews: 2400,
    stars: 4,
    price3h: '₹3,499',
    price6h: '₹5,299',
    priceFullNight: '₹6,900',
    locationCategory: 'in-terminal',
    badge: 'Inside T2',
    amenities: [
      'Inside T2 Transit Area',
      'Hot Rain Shower Suites',
      'Soundproof Sleeping Rooms',
      'No Transit Visa Needed',
      'Direct Gate Access',
    ],
    description: 'Located directly inside CSMIA Terminal 2. No Indian transit visa required if staying airside in international transit. Features private soundproof day rooms, hot rain shower suites, and flight status screens.',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'h2',
    name: 'JW Marriott Mumbai Sahar',
    terminal: 'Sahar, 1.2 km from Terminal 2',
    distance: '1.2 km from Terminal 2',
    transitTime: '5–10 mins taxi',
    rating: 4.6,
    reviews: 1800,
    stars: 5,
    price3h: '₹3,999',
    price6h: '₹5,499',
    priceFullNight: '₹12,000',
    locationCategory: 'near-t2',
    badge: '5-Star Luxury',
    amenities: [
      'Free 24/7 Airport Shuttle',
      'Outdoor Lagoon Pool',
      'Quan Luxury Spa & Steam',
      '24/7 JW Cafe Dining',
      'Soundproof Luxury Rooms',
    ],
    description: '5-star luxury located 5 minutes from Terminal 2 with complimentary 24/7 airport shuttles every 15 minutes. Features expansive day-use suites, resort lagoon pool, and 24-hour dining.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'h3',
    name: 'The Orchid Hotel Mumbai Vile Parle',
    terminal: 'Nehru Road, Vile Parle (Domestic T1 / Near T2)',
    distance: '1.8 km from T2 / 0.8 km from T1',
    transitTime: '10–18 mins taxi',
    rating: 4.3,
    reviews: 1500,
    stars: 5,
    price3h: '₹2,999',
    price6h: '₹4,500',
    priceFullNight: '₹8,500',
    locationCategory: 'near-t2',
    badge: 'Eco 5-Star',
    amenities: [
      'Free Airport Terminal Transfers',
      'Rooftop Runway-View Pool',
      'Soundproof Double Glazing',
      '24/7 Multi-Cuisine Coffee Shop',
      'Hourly Day Packages',
    ],
    description: "Asia's first certified 5-star Ecotel, located right along the airport corridor. Features a rooftop swimming pool overlooking the CSMIA runway, soundproof rooms, and 24/7 airport shuttles.",
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'h4',
    name: 'Ibis Mumbai Airport',
    terminal: 'Western Express Highway, Vile Parle East, Mumbai',
    distance: '0.8 km from Domestic T1',
    transitTime: '10–20 mins taxi',
    rating: 4.0,
    reviews: 1100,
    stars: 3,
    price3h: '₹1,499',
    price6h: '₹2,200',
    priceFullNight: '₹4,200',
    locationCategory: 'near-t1',
    badge: 'Budget Friendly',
    amenities: [
      '0.8 km from Domestic T1',
      'Ergonomic Work Desk & Fast WiFi',
      '24/7 Grab & Go Cafe',
      'Flexible Hourly Check-in',
      'Pre-Booked Airport Cabs',
    ],
    description: 'Cozy, ergonomic rooms designed for short-stay transits. Excellent continental breakfast, business desk, and hourly check-in.',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'h5',
    name: 'Urbanpod Airport Pod Hotel',
    terminal: 'Andheri East (5 Mins from T2)',
    distance: '1.5 km from Terminal 2',
    transitTime: '8–15 mins taxi',
    rating: 4.2,
    reviews: 210,
    stars: 3,
    price3h: '₹1,499',
    price6h: '₹2,499',
    priceFullNight: '₹3,500',
    locationCategory: 'near-t2',
    badge: 'Futuristic Pods',
    amenities: ['Individual Sleeping Pod', 'Air Conditioned', 'Shared Luxury Baths', 'Luggage Lockers'],
    description: 'Individual Japanese-style sleeping pods with ambient lighting, personal TV, air conditioning, and locker storage.',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
  },
];

export const RESTAURANTS_DATA: Restaurant[] = [
  {
    id: 'r1',
    name: 'Gajalee Coastal Seafood Restaurant',
    cuisine: 'Coastal Seafood',
    category: 'seafood',
    location: 'Vile Parle East, Mumbai',
    distance: '3.5 km from CSMIA',
    transitTime: '12–20 mins taxi',
    rating: 4.8,
    reviews: 940,
    avgCost: '₹1,800',
    badge: '🦀 Seafood',
    amenities: ['🦀 Fresh Coastal', '🍷 Premium Lounge', '⚡ High Hygiene'],
    description: 'World-famous coastal dining near airport. Indulge in authentic Butter Garlic Pepper Crab, Tandoori Pomfret, and Sol Kadhi.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'r2',
    name: 'Peshawri — ITC Maratha',
    cuisine: 'North Indian / Mughlai / Kebab',
    category: 'fine-dining',
    location: 'Sahar Road, Andheri East',
    distance: '1.1 km from T2',
    transitTime: '5–10 mins taxi',
    rating: 4.9,
    reviews: 1200,
    avgCost: '₹4,500',
    badge: '✨ Luxury',
    amenities: ['🍲 Traditional Clay Oven', '✨ Luxury Ambience', '🥩 Sikandari Raan'],
    description: 'Five-star Northwest Frontier luxury dining. Famous for Dal Bukhara (simmered for 18 hours), paneer tikka, and slow cooked lamb.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'r3',
    name: 'Highway Gomantak',
    cuisine: 'Local Maharashtrian / Goan',
    category: 'local',
    location: 'Bandra East, Mumbai',
    distance: '5.2 km from CSMIA',
    transitTime: '18–28 mins taxi',
    rating: 4.5,
    reviews: 560,
    avgCost: '₹800',
    badge: '🥘 Local Food',
    amenities: ['🐟 Fish Curry Thali', '🌶️ Authentic Flavors', '🚀 Quick Service'],
    description: 'Authentic 30-year-old family restaurant serving traditional Konkani fish thalis, bombay duck fry, and kokum curry.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'r4',
    name: 'Elco Chowpatty Street Food Trail',
    cuisine: 'Mumbai Street Food / Chaat',
    category: 'street-food',
    location: 'Hill Road, Bandra West',
    distance: '7.8 km from CSMIA',
    transitTime: '22–35 mins taxi',
    rating: 4.7,
    reviews: 820,
    avgCost: '₹500',
    badge: '🌶️ Street Food',
    amenities: ['🧆 Hygienic Pani Puri', '🍞 Pav Bhaji', '🥛 Mineral Water Prep'],
    description: 'Famous hygienic street food destination. Enjoy crispy Pani Puri served with purified water, butter pav bhaji, and kulfi falooda.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
  },
];

export const SPAS_DATA: Spa[] = [
  {
    id: 's1',
    name: 'O2 Spa — CSMIA Terminal 2',
    category: 'express',
    location: 'Inside T2 Security (Gate 68)',
    distance: '0 km (Inside T2)',
    transitTime: '0 min walk (Inside T2)',
    rating: 4.8,
    reviews: 230,
    price: '₹1,999',
    duration: '45 Mins',
    treatment: 'Express Foot Reflexology & Back Relief',
    badge: 'In-Terminal',
    amenities: ['🚿 Hot Rain Shower', '💆 Deep Tissue', '☕ Herbal Tea'],
    description: 'Express reflexology therapy inside Terminal 2. Perfect for relieving swollen feet and muscle stiffness during short international layovers.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 's2',
    name: 'Quan Spa — JW Marriott Sahar',
    category: 'full-day',
    location: 'Sahar, 3 Mins from Airport T2',
    distance: '1.2 km from T2',
    transitTime: '5–10 mins taxi',
    rating: 4.9,
    reviews: 410,
    price: '₹4,499',
    duration: '90 Mins',
    treatment: 'Full Body Jetlag Recovery & Steam Suite',
    badge: '5-Star Luxury',
    amenities: ['🧖 Steam Suite', '🌊 Hydrotherapy Pool', '🌿 Organic Oils'],
    description: 'Luxury holistic wellness sanctuary featuring custom hydrotherapy, Scandinavian steam suites, and deep tissue jetlag massages.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 's3',
    name: 'Jiva Spa — Taj Santacruz',
    category: 'massage',
    location: 'Near Domestic Terminal 1',
    distance: '0.5 km from T1',
    transitTime: '10–18 mins taxi',
    rating: 4.8,
    reviews: 320,
    price: '₹3,999',
    duration: '60 Mins',
    treatment: 'Indian Aromatherapy & Head Massage',
    badge: 'Royal Wellness',
    amenities: ['🪔 Ayurvedic Herbs', '💆 Head & Shoulder Therapy', '🍵 Signature Drinks'],
    description: 'Traditional Indian royal therapy using ancient Ayurvedic botanicals, soothing oils, and pressure point techniques.',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 's4',
    name: 'Encalm Spa — Terminal 2 Departures',
    category: 'express',
    location: 'Inside T2 Airside (Near Gate 75)',
    distance: '0 km (Inside T2)',
    transitTime: '0 min walk (Inside T2)',
    rating: 4.7,
    reviews: 180,
    price: '₹1,499',
    duration: '30 Mins',
    treatment: 'Neck, Shoulder & Head Anti-Stress Massage',
    badge: 'In-Terminal',
    amenities: ['💆 Chair Massage', '☕ Herbal Infusion', '⚡ Quick Revive'],
    description: 'Ultra-fast anti-stress massage inside Terminal 2 for passengers with short layovers. Zero airport exit or immigration required.',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 's5',
    name: 'Aura Spa — The Orchid Ecotel',
    category: 'massage',
    location: 'Nehru Road, Vile Parle East',
    distance: '0.8 km from T1',
    transitTime: '6–12 mins taxi',
    rating: 4.6,
    reviews: 290,
    price: '₹2,699',
    duration: '60 Mins',
    treatment: 'Balinese Relaxing Massage & Steam',
    badge: 'Eco Sanctuary',
    amenities: ['🚿 Rain Shower', '🧖 Herbal Steam', '🌿 Natural Balms'],
    description: 'Eco-certified transit sanctuary near Terminal 1. Relax with soothing Balinese strokes followed by hot herbal steam and rain shower.',
    image: 'https://images.unsplash.com/photo-1591343395082-e120087004b4?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 's6',
    name: 'Heavenly Spa by Westin — Mumbai Airport',
    category: 'full-day',
    location: 'International Airport Enclave',
    distance: '5.8 km from CSMIA',
    transitTime: '18–30 mins taxi',
    rating: 4.9,
    reviews: 360,
    price: '₹5,200',
    duration: '120 Mins',
    treatment: 'Signature Heated Stone & Hydrotherapy Circuit',
    badge: '5-Star Luxury',
    amenities: ['🧖 Swedish Sauna', '🌊 Jacuzzi & Pool', '💆 Hot Stone Therapy'],
    description: 'Award-winning full body wellness circuit. Includes heated basalt stone massage, private Swedish sauna, and access to hydrotherapy relaxation deck.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
  },
];

export const GAMING_DATA: GamingLounge[] = [
  {
    id: 'g1',
    name: 'Adani Executive Lounge & Esports Arena',
    category: 'gaming',
    location: 'Terminal 2 Departures',
    distance: '0 km (Inside T2)',
    transitTime: '0 min walk (Inside T2)',
    rating: 4.7,
    reviews: 140,
    price: '₹1,499 / 3 Hours',
    badge: 'Inside T2',
    features: ['PS5 Pro Gaming Stations', 'High-Speed Fiber Wi-Fi', 'Complimentary Gourmet Snacks', 'Recliner Seats'],
    description: 'High-tech executive gaming setup featuring PlayStation 5 Pro consoles, 4K monitors, high-speed fiber internet, and complimentary buffet snacks.',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'g2',
    name: 'Smaaash VR & Arcade Zone',
    category: 'gaming',
    location: 'Phoenix Marketcity (12 Mins from T2)',
    distance: '4.5 km from CSMIA',
    transitTime: '15–28 mins taxi',
    rating: 4.8,
    reviews: 520,
    price: '₹1,999 Unlimited Pass',
    badge: 'Arcade Arena',
    features: ['Virtual Reality Coasters', 'Cricket Simulators', 'Bowling Alley', 'Craft Beer Bar'],
    description: 'Immersive entertainment hub featuring virtual reality roller coasters, automated cricket simulators, bowling lanes, and sports lounge dining.',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'g3',
    name: 'PVR INOX Luxe & IMAX — Phoenix Marketcity',
    category: 'movie',
    location: 'Kurla West (12 Mins from T2)',
    distance: '4.8 km from CSMIA',
    transitTime: '15–25 mins taxi',
    rating: 4.8,
    reviews: 680,
    price: '₹950 / Recliner Ticket',
    badge: 'Luxury Cinema',
    features: ['Plush 180° Recliners', 'Gourmet In-Seat Butler Dining', 'Dolby Atmos & Laser IMAX', 'Pillow & Fleece Blanket'],
    description: 'Ultra-luxurious cinema experience for transit passengers. Watch the latest blockbuster in fully reclining heated loungers with blanket service and curated gourmet dining.',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'g4',
    name: 'PVR Maison Luxe & Director’s Cut — Jio World Drive BKC',
    category: 'movie',
    location: 'BKC, Mumbai (Direct via SCLR)',
    distance: '7.2 km from CSMIA',
    transitTime: '20–32 mins taxi',
    rating: 4.9,
    reviews: 420,
    price: '₹1,400 / VIP Pod',
    badge: 'VIP Cinema Lounge',
    features: ['Private Screening Pods', 'Chef-Curated Japanese & Continental', 'Concierge Luggage Hold', 'Direct SCLR Highway Access'],
    description: 'The peak of cinema luxury in BKC. Enjoy private transit screening pods, handcrafted mocktails, artisanal Japanese sushi, and direct express taxi route back to Terminal 2.',
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'g5',
    name: 'Timezone Entertainment Center & Laser Tag',
    category: 'gaming',
    location: 'R City Mall, Ghatkopar (18 Mins from T2)',
    distance: '6.5 km from CSMIA',
    transitTime: '18–30 mins taxi',
    rating: 4.7,
    reviews: 390,
    price: '₹1,200 Play Card',
    badge: 'Arcade & Laser Tag',
    features: ['Multi-Level Laser Tag Arena', 'Bumper Cars', 'Retro Arcade Classics', 'Prizes & VR Simulators'],
    description: 'Energetic entertainment center with multi-level tactical laser tag arena, modern VR simulators, bowling, and fun arcade challenges.',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
  },
];

export const TOURS_DATA: Tour[] = [
  {
    id: 't1',
    name: 'Mumbai Highlights Express Private Tour',
    category: 'sightseeing',
    duration: '5 Hours',
    safeWindow: '6+ Hr Layover Required',
    transitTime: '40–60 mins taxi',
    rating: 4.9,
    reviews: 480,
    price: '₹3,999 per car',
    badge: 'Most Popular',
    highlights: ['Gateway of India', 'Taj Mahal Palace Hotel (Colaba)', "Marine Drive Queen's Necklace", 'Bandra Worli Sea Link'],
    description: 'Explore Mumbai with private air-conditioned cars, licensed local guides, airport door-to-door pickups, and traffic-buffered return windows.',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 't2',
    name: 'Bandra Heritage & Street Food Crawl',
    category: 'food',
    duration: '4 Hours',
    safeWindow: '5+ Hr Layover Required',
    transitTime: '20–35 mins taxi',
    rating: 4.8,
    reviews: 290,
    price: '₹2,499 per person',
    badge: 'Food & Heritage',
    highlights: ['Ranwar Portuguese Village', 'Mount Mary Basilica', 'Bandstand & Bollywood Homes', 'Bandra Street Food & Chaat'],
    description: 'Walk through historic Portuguese hamlets of Ranwar village, admire vibrant street art murals, explore Bandstand, and sample iconic Bandra street food delicacies.',
    image: '/images/bandra-heritage-food.jpg',
  },
  {
    id: 't3',
    name: 'South Mumbai Heritage & Elephanta Caves',
    category: 'culture',
    duration: '8 Hours',
    safeWindow: '9+ Hr Layover Required',
    transitTime: '45–70 mins taxi',
    rating: 4.9,
    reviews: 310,
    price: '₹5,999 per car',
    badge: 'Full Day Tour',
    highlights: ['Elephanta Island Ferry', 'UNESCO World Heritage Caves', 'CSMT Station Tour', 'Colaba Causeway'],
    description: 'Comprehensive day tour covering UNESCO rock-cut cave temples at Elephanta Island, Gothic Victorian architecture, and heritage markets.',
    image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 't4',
    name: "Queen's Necklace Sunset & Marine Drive Evening Tour",
    category: 'nightlife',
    duration: '3.5 Hours',
    safeWindow: '5+ Hr Layover Required',
    transitTime: '35–50 mins taxi',
    rating: 4.8,
    reviews: 180,
    price: '₹2,799 per car',
    badge: 'Evening Views',
    highlights: ["Marine Drive Queen's Necklace", 'Sunset at Bandra Bandstand', 'Illuminated CSMT Heritage Lighting', 'Girgaon Chowpatty Kulfi'],
    description: "Experience Mumbai's magical golden hour and illuminated night skyline along Marine Drive, Bandra Worli Sea Link, and Victorian colonial monuments with private chauffeur.",
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 't5',
    name: 'Colaba Causeway & Crawford Market Shopping Expedition',
    category: 'shopping',
    duration: '4.5 Hours',
    safeWindow: '6+ Hr Layover Required',
    transitTime: '40–60 mins taxi',
    rating: 4.7,
    reviews: 210,
    price: '₹3,299 per car',
    badge: 'Shopping & Bazaars',
    highlights: ['Colaba Causeway Handicrafts', 'Crawford Market Spices & Teas', 'Fashion Street Vintage Finds', 'Private Car with Luggage Boot'],
    description: 'Curated shopping trail through historic bazaars for Indian pashminas, spices, artisanal brassware, and boutique jewelry with private AC car to stow all purchases.',
    image: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&w=800&q=80',
  },
];

export const TRANSFERS_DATA: Transfer[] = [
  {
    id: 'c1',
    name: 'Executive Sedan Airport Pickup',
    vehicle: 'Toyota Innova Crysta / Camry',
    rating: 4.9,
    reviews: 670,
    price: '₹1,499 per ride',
    badge: 'Gate Meet & Greet',
    features: ['Flight-Tracked Pickup', '60-Min Free Wait Time', 'Gate Chauffeur Greeting', 'Luggage Assistance'],
    description: 'Seamless terminal pickup at CSMIA T1 & T2 with live flight tracking, zero wait time, and professional drivers.',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'c2',
    name: 'Luxury SUV Chauffeur Package',
    vehicle: 'Mercedes E-Class / BMW 5 Series',
    rating: 5.0,
    reviews: 190,
    price: '₹3,999 per ride',
    badge: 'Luxury Chauffeur',
    features: ['Uniformed Chauffeur', 'Water & Wi-Fi Onboard', 'Terminal Arrival Meet & Greet', 'Zero Cancellation Fee'],
    description: 'Premium VIP arrival chauffeur experience with luxury sedans, chilled bottled water, onboard high-speed Wi-Fi, and priority airport access.',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
  },
];

export const FAQS_DATA: FAQItem[] = [
  {
    question: 'Do I need an Indian visa to leave the airport or stay at a transit hotel?',
    answer: 'If you stay inside the Terminal 2 international transit area (such as Niranta Transit Hotel airside), you do not clear immigration and no visa is required. If you choose an off-terminal hotel in Andheri/Sahar, visit restaurants, or take a city tour, you must clear immigration with a valid Indian Transit Visa or e-Visa matching your passport.',
  },
  {
    question: 'How are the return timing buffers calculated?',
    answer: 'To protect your connection, our planner automatically reserves a 2.5-hour clearance buffer for security and terminal procedures, plus calculated driving time with local traffic buffers. We only recommend activities that comfortably fit within your available dwell time.',
  },
  {
    question: 'What happens if my incoming flight is delayed?',
    answer: 'If your incoming flight gets delayed, you can easily adjust your plan timings in the planner. For partner reservations, our concierge team helps coordinate rescheduled slots or flexible cancellation so you are never penalized for flight schedule changes.',
  },
  {
    question: 'Where can I store my heavy luggage during a layover?',
    answer: 'Both Terminal 1 and Terminal 2 provide 24/7 Left Luggage cloakroom counters in the arrivals public concourse (operated by airport management, typically ₹200–₹400 per bag). If you book an in-terminal or adjacent day-room, your luggage stays safely with you in your private room.',
  },
  {
    question: 'Can I transfer between Terminal 1 and Terminal 2?',
    answer: 'Yes, but note that CSMIA T1 (domestic) and T2 (international & select domestic) are situated on separate sides of the airfield connected via city roads. We recommend allowing at least 45 minutes for inter-terminal transit by airport taxi.',
  },
];

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'rev1',
    author: 'Elena R.',
    flight: 'Transit to Sydney',
    comment: 'Niranta was perfect. My flight landed at 3 AM and I had a connecting flight at 9 AM. I slept for 4 solid hours, took a hot shower, and went straight to my next gate. Absolute lifesaver.',
    rating: 5,
    date: 'July 2026',
  },
  {
    id: 'rev2',
    author: 'Devansh J.',
    flight: 'Delhi Business Transit',
    comment: 'Booked JW Marriott Sahar day slot for a 12-hour layover. The free shuttle took 10 minutes. Spent the day working by the pool and enjoying the spa. Highly recommend!',
    rating: 5,
    date: 'June 2026',
  },
  {
    id: 'rev3',
    author: 'Hiroshi T.',
    flight: 'Tokyo Transit',
    comment: 'Super convenient pricing. Ibis airport was clean, modern, and reasonably priced for a 6-hour stay. Free high speed internet allowed me to complete all my meetings.',
    rating: 4,
    date: 'May 2026',
  },
];
