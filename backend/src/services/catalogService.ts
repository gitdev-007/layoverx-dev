import { supabase } from '../utils/supabase.js';

export interface VendorInfo {
  name: string;
  proximity: string;
  coords: {
    lat: number;
    lng: number;
  };
}

export interface ServiceCatalogItem {
  id: string;
  title: string;
  description: string;
  category: 'HOTEL_PODS' | 'DINING' | 'TOURS' | 'SPA' | 'GAMING' | 'TRANSFERS';
  hourlyRate: number;
  currency: string;
  minUsableMinutes: number;
  rating: number;
  imageUrl: string;
  vendor: VendorInfo;
}

// Fallback comprehensive catalog dataset for development / testing when DB is empty or unreachable
const SAMPLE_CATALOG: ServiceCatalogItem[] = [
  {
    id: 'srv-pod-01',
    title: '3-Hour Pod Stay & Hot Shower',
    description: 'Private soundproof sleeping pod inside T2 international arrivals area with hot shower suite and high-speed Wi-Fi.',
    category: 'HOTEL_PODS',
    hourlyRate: 2500,
    currency: 'INR',
    minUsableMinutes: 180,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    vendor: {
      name: 'Niranta Airport Transit Hotel',
      proximity: 'Inside Terminal 2',
      coords: { lat: 19.0896, lng: 72.8742 },
    },
  },
  {
    id: 'srv-hotel-02',
    title: '6-Hour Executive Day Room Access',
    description: '5-Star resort day room with outdoor pool, steam room, and 24/7 airport terminal shuttle.',
    category: 'HOTEL_PODS',
    hourlyRate: 5499,
    currency: 'INR',
    minUsableMinutes: 240,
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    vendor: {
      name: 'JW Marriott Mumbai Sahar',
      proximity: '1.2 km from Terminal 2',
      coords: { lat: 19.0988, lng: 72.8715 },
    },
  },
  {
    id: 'srv-dining-01',
    title: 'Peshawri 18-Hour Dal Bukhara Feast',
    description: 'Pre-reserved table for 2 featuring authentic Northwest Frontier Mughlai delicacies and clay-oven kebabs.',
    category: 'DINING',
    hourlyRate: 4500,
    currency: 'INR',
    minUsableMinutes: 180,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    vendor: {
      name: 'Peshawri — ITC Maratha',
      proximity: '1.1 km from Terminal 2',
      coords: { lat: 19.1022, lng: 72.8689 },
    },
  },
  {
    id: 'srv-dining-02',
    title: 'Coastal Seafood & Tandoori Crab Lunch',
    description: 'Famous coastal dining experience with authentic butter garlic crab and Konkan seafood thalis.',
    category: 'DINING',
    hourlyRate: 1800,
    currency: 'INR',
    minUsableMinutes: 180,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    vendor: {
      name: 'Gajalee Coastal Seafood',
      proximity: '3.5 km from CSMIA',
      coords: { lat: 19.1001, lng: 72.8550 },
    },
  },
  {
    id: 'srv-tour-01',
    title: 'South Mumbai Heritage & Gateway Express Tour',
    description: 'Private AC chauffeur tour covering Gateway of India, Marine Drive Art Deco district, and Taj Mahal Palace.',
    category: 'TOURS',
    hourlyRate: 2899,
    currency: 'INR',
    minUsableMinutes: 300,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&w=800&q=80',
    vendor: {
      name: 'LayoverX Heritage Chauffeurs',
      proximity: 'Door-to-door T2 Pickup',
      coords: { lat: 18.9220, lng: 72.8347 },
    },
  },
  {
    id: 'srv-spa-01',
    title: 'Express Jetlag Foot Reflexology',
    description: '45-minute revitalizing foot & shoulder massage located inside T2 international security gate.',
    category: 'SPA',
    hourlyRate: 1800,
    currency: 'INR',
    minUsableMinutes: 120,
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
    vendor: {
      name: 'O2 Spa Terminal 2',
      proximity: 'Inside Terminal 2 Gate 68',
      coords: { lat: 19.0896, lng: 72.8742 },
    },
  },
  {
    id: 'srv-gaming-01',
    title: 'PS5 Pro Esports Lounge & High-Speed Wi-Fi',
    description: 'Executive gaming pods with 4K monitors, PS5 Pro consoles, recliner seats, and unlimited gourmet snacks.',
    category: 'GAMING',
    hourlyRate: 1499,
    currency: 'INR',
    minUsableMinutes: 120,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
    vendor: {
      name: 'Adani Executive Esports Lounge',
      proximity: 'Inside Terminal 2',
      coords: { lat: 19.0896, lng: 72.8742 },
    },
  },
  {
    id: 'srv-cab-01',
    title: 'AC Sedan Surge-Free Airport Transfer',
    description: 'Verified chauffeur pick-up at T2 gate with 45-minute free flight delay buffer and included tolls.',
    category: 'TRANSFERS',
    hourlyRate: 899,
    currency: 'INR',
    minUsableMinutes: 60,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80',
    vendor: {
      name: 'LayoverX Airport Fleet',
      proximity: 'CSMIA Terminal 2 & 1',
      coords: { lat: 19.0896, lng: 72.8742 },
    },
  },
];

export async function fetchServiceCatalog(queryParams: {
  category?: string;
  usableMinutes?: number;
  terminal?: string;
}): Promise<ServiceCatalogItem[]> {
  const { category, usableMinutes, terminal } = queryParams;

  try {
    let query = supabase.from('services').select(`
        id,
        title,
        description,
        category,
        hourly_rate,
        currency,
        min_usable_minutes,
        rating,
        image_url,
        vendors (
          name,
          terminal_proximity,
          latitude,
          longitude
        )
      `);

    if (category) {
      query = query.eq('category', category);
    }

    if (usableMinutes !== undefined && !isNaN(usableMinutes)) {
      query = query.lte('min_usable_minutes', usableMinutes);
    }

    const { data, error } = await query;

    if (!error && data && data.length > 0) {
      return data.map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        category: item.category,
        hourlyRate: item.hourly_rate ?? 0,
        currency: item.currency ?? 'INR',
        minUsableMinutes: item.min_usable_minutes ?? 0,
        rating: item.rating ?? 4.5,
        imageUrl: item.image_url ?? '',
        vendor: {
          name: item.vendors?.name ?? 'Airport Vendor',
          proximity: item.vendors?.terminal_proximity ?? 'Near CSMIA',
          coords: {
            lat: item.vendors?.latitude ?? 19.0896,
            lng: item.vendors?.longitude ?? 72.8742,
          },
        },
      }));
    }
  } catch (err) {
    console.warn('⚠️ Supabase catalog fetch warning, falling back to sample dataset:', err);
  }

  // Filter sample dataset if DB query had no results or failed
  return SAMPLE_CATALOG.filter((item) => {
    if (category && item.category !== category.toUpperCase()) {
      return false;
    }
    if (usableMinutes !== undefined && !isNaN(usableMinutes) && item.minUsableMinutes > usableMinutes) {
      return false;
    }
    return true;
  });
}
