export interface Hotel {
  id: string;
  name: string;
  terminal: string;
  distance: string;
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
  name: string;
  cuisine: string;
  location: string;
  rating: number;
  reviews: number;
  avgCost: string;
  image: string;
  badge?: string;
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
  badge?: string;
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
  badge?: string;
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
  badge?: string;
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
    terminal: 'International Terminal 2 (Arrivals Lounge), CSMIA',
    distance: '0 km from T2 Gates',
    rating: 4.8,
    reviews: 2400,
    stars: 5,
    price3h: '₹3,499',
    price6h: '₹5,299',
    priceFullNight: '₹6,900',
    locationCategory: 'in-terminal',
    badge: 'Inside T2',
    amenities: ['🚿 Shower Facility', '⚡ Fast WiFi', '🛌 24/7 Check-in', '💆 Massage Spa'],
    description: 'Ideal for quick transits. No visa check needed if remaining in international area. Features express spa sessions, dining counters, and luxury beds.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'h2',
    name: 'JW Marriott Mumbai Sahar',
    terminal: 'Sahar Road, Andheri East, Mumbai',
    distance: '1.2 km from Terminal 2',
    rating: 4.7,
    reviews: 1800,
    stars: 5,
    price3h: '₹3,999',
    price6h: '₹5,499',
    priceFullNight: '₹12,000',
    locationCategory: 'near-t2',
    badge: '5-Star Luxury',
    amenities: ['🚍 Free Airport Shuttle', '🏊 Pool Access', '🛌 24/7 Check-in', '🍽️ Fine Dining'],
    description: 'Ultra-luxury stays with high-speed lounge setups, award-winning spa, resort pool, and 24/7 airport pick and drop shuttles included.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'h3',
    name: 'Ibis Mumbai Airport',
    terminal: 'Western Express Highway, Vile Parle East, Mumbai',
    distance: '0.8 km from Domestic T1',
    rating: 4.2,
    reviews: 1100,
    stars: 3,
    price3h: '₹1,499',
    price6h: '₹2,200',
    priceFullNight: '₹4,200',
    locationCategory: 'near-t1',
    badge: 'Budget Friendly',
    amenities: ['🚍 Airport Shuttle (paid)', '☕ Breakfast Buffet', '🛌 24/7 Check-in', '⚡ Fast WiFi'],
    description: 'Cozy, ergonomic rooms designed for short-stay transits. Excellent continental breakfast, business desk, and hourly check-in.',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'h4',
    name: 'The Orchid Hotel Mumbai Vile Parle',
    terminal: 'Nehru Road, Vile Parle East, Mumbai',
    distance: '2.1 km from Terminal 2',
    rating: 4.6,
    reviews: 1500,
    stars: 4,
    price3h: '₹2,999',
    price6h: '₹4,500',
    priceFullNight: '₹8,500',
    locationCategory: 'near-t2',
    badge: 'Eco Friendly',
    amenities: ['🚍 Free Airport Shuttle', '🏊 Rooftop Pool', '🌿 Green Certified', '💆 Massage Spa'],
    description: "Asia's first certified 5-star ecofriendly hotel. Features a rooftop swimming pool with runway view, airport lounge, and spa treatments.",
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'h5',
    name: 'Urbanpod Airport Pod Hotel',
    terminal: 'Andheri East (5 Mins from T2)',
    distance: '1.5 km from Terminal 2',
    rating: 4.6,
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
    name: 'Peshawri — ITC Maratha',
    cuisine: 'North Indian / Mughlai / Kebab',
    location: 'Sahar, 5 Mins from T2',
    rating: 4.9,
    reviews: 410,
    avgCost: '₹2,500 for two',
    badge: 'Award Winning',
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
    badge: 'Inside T2',
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
    badge: 'Local Speciality',
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
    badge: 'In-Terminal',
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
    badge: '5-Star Luxury',
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
    badge: 'Inside T2',
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
    badge: 'Arcade Arena',
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
    badge: 'Most Popular',
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
    badge: 'Food & Heritage',
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
    badge: 'Full Day Tour',
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
    badge: 'Gate Meet & Greet',
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
    badge: 'Luxury Chauffeur',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
  },
];

export const FAQS_DATA: FAQItem[] = [
  {
    question: 'Do I need an Indian Visa to stay at these hotels?',
    answer: 'If you book a hotel inside the airport terminal (like Niranta inside T2 Transit area), you do not need an Indian visa. If you book an external hotel (even 1 km away), you will need to clear immigration, which requires a valid Indian Transit Visa or e-Tourist Visa.',
  },
  {
    question: 'How do hourly transit check-ins work?',
    answer: 'Unlike standard hotel check-ins (usually 12 PM or 2 PM), transit hotels support check-ins at any hour of the day or night. Your booking duration (3h, 6h, or 12h) starts the moment you check in at the front desk.',
  },
  {
    question: 'Are airport shuttles free?',
    answer: '5-star partner hotels like JW Marriott Sahar and The Orchid provide free 24/7 round-trip airport shuttles. Budget options provide low-cost fixed cab pickups.',
  },
  {
    question: 'What happens if my incoming flight is delayed?',
    answer: 'LayoverX includes automated flight delay protection. We track your flight via live radar feeds and automatically shift your hotel room or chauffeur booking window with zero penalty.',
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
