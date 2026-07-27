export interface Hotel {
  id: string;
  name: string;
  terminal: string;
  rating: number;
  reviews: number;
  price3h: string;
  price6h: string;
  amenities: string[];
  image: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  location: string;
  rating: number;
  reviews: number;
  avgCost: string;
  image: string;
}

export interface Spa {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  price: string;
  treatment: string;
  image: string;
}

export interface GamingLounge {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  price: string;
  features: string[];
  image: string;
}

export interface Tour {
  id: string;
  name: string;
  duration: string;
  rating: number;
  reviews: number;
  price: string;
  highlights: string[];
  image: string;
}

export interface Transfer {
  id: string;
  name: string;
  vehicle: string;
  rating: number;
  reviews: number;
  price: string;
  features: string[];
  image: string;
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
    name: 'Niranta Transit Hotel & Lounge',
    terminal: 'CSMIA Terminal 2 (Inside Security)',
    rating: 4.8,
    reviews: 320,
    price3h: '₹3,499',
    price6h: '₹5,299',
    amenities: ['In-Terminal Access', 'Express Check-in', 'Free High-Speed Wi-Fi', 'Rain Shower'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'h2',
    name: 'Urbanpod Airport Pod Hotel',
    terminal: 'Andheri East (5 Mins from T2)',
    rating: 4.6,
    reviews: 210,
    price3h: '₹1,499',
    price6h: '₹2,499',
    amenities: ['Individual Sleeping Pod', 'Air Conditioned', 'Shared Luxury Baths', 'Luggage Lockers'],
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'h3',
    name: 'The Leela Mumbai Transit Suites',
    terminal: 'Airport Road (7 Mins from T2)',
    rating: 4.9,
    reviews: 540,
    price3h: '₹4,999',
    price6h: '₹7,999',
    amenities: ['5-Star Luxury', 'Chauffeur Shuttle', 'Outdoor Pool & Spa', '24/7 Room Service'],
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
  },
];

export const RESTAURANTS_DATA: Restaurant[] = [
  {
    id: 'r1',
    name: 'Peshawri — ITC Maratha',
    cuisine: 'North Indian / Mughlai / Kebab',
    location: 'Sahar, 5 Mins from T2',
    rating: 4.9,
    reviews: 410,
    avgCost: '₹2,500 for two',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'r2',
    name: 'Global Buffet — CSMIA Lounge Dining',
    cuisine: 'Multi-Cuisine / International Buffet',
    location: 'Inside Terminal 2 (Departures)',
    rating: 4.7,
    reviews: 185,
    avgCost: '₹1,299 per person',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'r3',
    name: 'Mahesh Lunch Home — Seafood Special',
    cuisine: 'Mangalorean / Coastal Indian Seafood',
    location: 'Andheri East (10 Mins from T2)',
    rating: 4.8,
    reviews: 620,
    avgCost: '₹1,800 for two',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
  },
];

export const SPAS_DATA: Spa[] = [
  {
    id: 's1',
    name: 'O2 Spa — CSMIA Terminal 2',
    location: 'Inside T2 Security (Gate 68)',
    rating: 4.8,
    reviews: 230,
    price: '₹1,999',
    treatment: '45-Min Express Foot Reflexology & Back Massage',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 's2',
    name: 'Quan Spa — JW Marriott Sahar',
    location: 'Sahar, 3 Mins from Airport T2',
    rating: 4.9,
    reviews: 410,
    price: '₹4,499',
    treatment: '90-Min Full Body Jetlag Recovery & Steam Suite',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
  },
];

export const GAMING_DATA: GamingLounge[] = [
  {
    id: 'g1',
    name: 'Adani Executive Lounge & Esports Arena',
    location: 'Terminal 2 Departures',
    rating: 4.7,
    reviews: 140,
    price: '₹1,499 / 3 Hours',
    features: ['PS5 Pro Gaming Stations', 'High-Speed Fiber Wi-Fi', 'Complimentary Gourmet Snacks', 'Recliner Seats'],
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'g2',
    name: 'Smaaash VR & Arcade Zone',
    location: 'Phoenix Marketcity (12 Mins from T2)',
    rating: 4.8,
    reviews: 520,
    price: '₹1,999 Unlimited Pass',
    features: ['Virtual Reality Coasters', 'Cricket Simulators', 'Bowling Alley', 'Craft Beer Bar'],
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80',
  },
];

export const TOURS_DATA: Tour[] = [
  {
    id: 't1',
    name: 'Mumbai Highlights Express Private Tour',
    duration: '5 Hours (Safe Window: 6+ Hr Layover)',
    rating: 4.9,
    reviews: 480,
    price: '₹3,999 per car',
    highlights: ['Gateway of India', 'Taj Mahal Palace', "Marine Drive Queen's Necklace", 'Bandra Worli Sea Link'],
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 't2',
    name: 'Bandra Heritage & Street Food Crawl',
    duration: '4 Hours (Safe Window: 5+ Hr Layover)',
    rating: 4.8,
    reviews: 290,
    price: '₹2,499 per person',
    highlights: ['Mount Mary Church', 'Bollywood Stars Mansions', 'Portuguese Villages', 'Local Street Food Tasting'],
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 't3',
    name: 'South Mumbai Heritage & Elephanta Caves',
    duration: '8 Hours (Safe Window: 9+ Hr Layover)',
    rating: 4.9,
    reviews: 310,
    price: '₹5,999 per car',
    highlights: ['Elephanta Island Ferry', 'UNESCO World Heritage Caves', 'CSMT Station Tour', 'Colaba Causeway'],
    image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80',
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
    features: ['Flight-Tracked Pickup', '60-Min Free Wait Time', 'Gate Chauffeur Greeting', 'Luggage Assistance'],
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'c2',
    name: 'Luxury SUV Chauffeur Package',
    vehicle: 'Mercedes E-Class / BMW 5 Series',
    rating: 5.0,
    reviews: 190,
    price: '₹3,999 per ride',
    features: ['Uniformed Chauffeur', 'Water & Wi-Fi Onboard', 'Terminal Arrival Meet & Greet', 'Zero Cancellation Fee'],
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
  },
];

export const FAQS_DATA: FAQItem[] = [
  {
    question: 'Can I leave Mumbai Airport during a transit layover?',
    answer: 'Yes! Indian passport holders and international travelers with a valid Indian Transit Visa (or e-Visa) can leave the airport during layovers of 4+ hours. Terminal exit procedures take approximately 30-45 minutes.',
  },
  {
    question: 'How far are Terminal 1 and Terminal 2 from city attractions?',
    answer: 'Terminal 2 is located in Sahar/Andheri East. Bandra is ~20 minutes away, while South Mumbai (Gateway of India) is ~35-45 minutes via the Bandra-Worli Sea Link.',
  },
  {
    question: 'What happens if my incoming flight is delayed?',
    answer: 'LayoverX includes automated flight delay protection. We track your flight via live radar feeds and automatically shift your hotel room or chauffeur booking window with zero penalty.',
  },
  {
    question: 'Where can I securely store my heavy luggage during a layover?',
    answer: 'Both T1 and T2 at CSMIA offer official Left Luggage counters in the arrivals zone. Our city tour chauffeurs also provide secure luggage storage in private AC vehicles.',
  },
];

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'rev1',
    author: 'Sarah L.',
    flight: 'London (LHR) ➔ Sydney (SYD)',
    comment: 'Had a 7-hour layover at Mumbai T2. Booked a 4-hour micro-stay at Niranta Transit Hotel followed by a shower. Seamless and total lifesaver!',
    rating: 5,
    date: 'July 2026',
  },
  {
    id: 'rev2',
    author: 'David K.',
    flight: 'Dubai (DXB) ➔ Singapore (SIN)',
    comment: 'The express South Mumbai private tour was unbelievable. The driver picked me up at T2 gates and had me back 2 hours before my connecting flight.',
    rating: 5,
    date: 'June 2026',
  },
  {
    id: 'rev3',
    author: 'Ananya R.',
    flight: 'Delhi (DEL) ➔ San Francisco (SFO)',
    comment: 'The Layover Safety Calculator gave me total confidence to leave the airport. Relaxed at JW Marriott Quan Spa during my 8h stopover.',
    rating: 5,
    date: 'May 2026',
  },
];
