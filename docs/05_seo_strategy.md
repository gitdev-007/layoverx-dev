# Phase 5: Technical & Programmatic SEO Strategy
**Domain Target:** `https://layoverx.in`  
**Focus:** High-Intent Search Captive Capture for Transit Travelers (Mumbai CSMIA BOM & Key Transit Hubs)  
**Deliverables:** Programmatic URL Structure, Schema.org JSON-LD Structured Data, Dynamic OpenGraph & Meta Generation.

---

## 1. Programmatic URL Hierarchy & Architecture

Transit search queries follow highly predictable, intent-rich search syntax:
- *"What to do during 6 hour layover in Mumbai?"*
- *"Can I leave Mumbai airport during 8 hour transit?"*
- *"Day use hotels near Mumbai Terminal 2"*
- *"Left luggage facilities Mumbai CSMIA T2"*

To systematically capture long-tail search volume, we establish a standardized programmatic URL tree:

```
/layover/
  ├── [airport]/
  │     ├── [duration]-hours/              --> e.g. /layover/bom-mumbai/6-hours
  │     ├── micro-stay-hotels/             --> e.g. /layover/bom-mumbai/micro-stay-hotels
  │     ├── luggage-storage/               --> e.g. /layover/bom-mumbai/luggage-storage
  │     └── terminal-transit-guide/        --> e.g. /layover/bom-mumbai/terminal-transit-guide
```

### 1.1 Canonical Programmatic Routes for Mumbai (CSMIA)
1. `/layover/bom-mumbai/4-hours` (Inside Terminal 2 Focus: Sleeping Pods, Spas, Express Dining)
2. `/layover/bom-mumbai/6-hours` (Near-Airport Sahar Focus: Day-Use Pool & Buffet, 5-Star Day Room)
3. `/layover/bom-mumbai/8-hours` (Bandra & South Mumbai Express Private Tour)
4. `/layover/bom-mumbai/12-hours` (Full Day Transit Experience with Chauffeur & Left Luggage)
5. `/layover/bom-mumbai/luggage-storage` (Arrivals Locker Facility Pricing & Pre-booking Guide)

---

## 2. Schema.org JSON-LD Structured Data Specs

To earn rich snippets in Google Search (Knowledge Panels, FAQ Accordions, Price Ranges, and Star Ratings), the application will embed the following structured JSON-LD schemas.

### 2.1 `TravelAgency` Schema (Homepage & Airport Hub Pages)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "name": "LayoverX",
  "url": "https://layoverx.in",
  "logo": "https://layoverx.in/images/logo.png",
  "image": "https://layoverx.in/images/og-layover-mumbai.jpg",
  "description": "Guaranteed usable-time booking platform for airport transit travelers, offering day-use hotel rooms, left-luggage storage, and flight-tracked private transfers.",
  "telephone": "+91-22-6900-LAYO",
  "email": "concierge@layoverx.in",
  "priceRange": "₹1499 - ₹8999",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Chhatrapati Shivaji Maharaj International Airport, Terminal 2",
    "addressLocality": "Mumbai",
    "addressRegion": "Maharashtra",
    "postalCode": "400099",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 19.0896,
    "longitude": 72.8742
  },
  "areaServed": {
    "@type": "Airport",
    "name": "Chhatrapati Shivaji Maharaj International Airport",
    "iataCode": "BOM"
  }
}
</script>
```

### 2.2 `LodgingBusiness` Schema (Micro-Stay Hotel Pages)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "name": "Niranta Transit Hotel CSMIA T2 (Day Use Micro-Stay)",
  "url": "https://layoverx.in/hotels/niranta-transit-hotel",
  "image": "https://images.unsplash.com/photo-1590490360182-c33d57733427",
  "priceRange": "₹2500 - ₹5500",
  "starRating": {
    "@type": "Rating",
    "ratingValue": "4.8"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "1280"
  },
  "amenityFeature": [
    {
      "@type": "LocationFeatureSpecification",
      "name": "Soundproof Sleeping Pods",
      "value": "true"
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Hot Rain Shower Suite",
      "value": "true"
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Airside Terminal Access",
      "value": "true"
    }
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Level 2, International Arrivals, Terminal 2, CSMIA",
    "addressLocality": "Mumbai",
    "addressRegion": "MH",
    "postalCode": "400099",
    "addressCountry": "IN"
  }
}
</script>
```

### 2.3 `FAQPage` Schema (Transit FAQ Rich Results)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Can I leave Mumbai Airport during a 6-hour layover?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, if you hold an Indian Visa or OCI card and have completed domestic immigration. However, after factoring in 60 minutes for arrival clearance and 120 minutes for return security, your usable dwell time is approximately 3 hours. We recommend staying within the Sahar Airport District (such as ITC Maratha or JW Marriott) rather than traveling to South Mumbai."
      }
    },
    {
      "@type": "Question",
      "name": "Is there a luggage locker facility at Mumbai Airport Terminal 2?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Mumbai CSMIA Terminal 2 operates a 24/7 Left Luggage facility located on the ground floor arrivals concourse. Rates typically range between ₹150 and ₹350 per bag depending on luggage dimensions and storage duration."
      }
    },
    {
      "@type": "Question",
      "name": "What are the CISF gate re-entry rules for transit passengers at CSMIA?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Under CISF and BCAS security guidelines, passengers holding onward domestic tickets are permitted re-entry to Terminal 2 departures starting 4 hours prior to scheduled departure. For international flights, entry gates open 4 to 5 hours before departure."
      }
    }
  ]
}
</script>
```

---

## 3. Dynamic Metadata & OpenGraph Architecture

For Next.js App Router (`app/layover/[airport]/[duration]-hours/page.tsx`), metadata is generated dynamically using `generateMetadata()`:

```typescript
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { airport: string; duration: string } }): Promise<Metadata> {
  const airportCode = params.airport.toUpperCase().slice(0, 3);
  const hours = params.duration;
  
  const title = `${hours}-Hour Layover in Mumbai (BOM) — Safe Itinerary & Day Hotels | LayoverX`;
  const description = `Got ${hours} hours in Mumbai CSMIA? Discover verified daytime hotel micro-stays, left-luggage lockers, and traffic-guaranteed airport transfers.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://layoverx.in/layover/${params.airport}/${params.duration}-hours`,
    },
    openGraph: {
      title,
      description,
      url: `https://layoverx.in/layover/${params.airport}/${params.duration}-hours`,
      siteName: 'LayoverX',
      images: [
        {
          url: `https://layoverx.in/api/og?airport=${airportCode}&duration=${hours}`,
          width: 1200,
          height: 630,
          alt: `${hours} Hour Layover Guide Mumbai Airport`,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}
```

---

## 4. Robots & Sitemap Optimization
- `robots.ts` ensures programmatic layover landing pages are fully indexed with a crawl-delay of 0 for Googlebot.
- `sitemap.ts` programmatically enumerates the permutation matrix: `[BOM, DEL, BLR, DXB, DOH]` × `[3, 4, 6, 8, 10, 12]` hours = 30 foundational high-ranking programmatic URLs updated daily.
