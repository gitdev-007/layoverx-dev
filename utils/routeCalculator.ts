export interface Coordinates {
  lat: number;
  lng: number;
}

export const AIRPORT_COORDS: Coordinates = { lat: 19.0896, lng: 72.8656 };

export function getCoordinatesForSpot(item: { title: string; detail: string; badge: string }): Coordinates {
  const text = (item.title + ' ' + item.detail + ' ' + item.badge).toLowerCase();
  
  if (item.badge === 'Arrival' || item.badge === 'Departure' || item.badge === 'Security' || text.includes('niranta') || text.includes('in-terminal') || text.includes('inside t2')) {
    return AIRPORT_COORDS;
  }
  if (text.includes('gateway') || text.includes('colaba') || text.includes('south mumbai') || text.includes('marine drive') || text.includes('highlights') || text.includes('city tour')) {
    return { lat: 18.9220, lng: 72.8347 };
  }
  if (text.includes('bandra') || text.includes('sea link')) {
    return { lat: 19.0544, lng: 72.8402 };
  }
  if (text.includes('bkc') || text.includes('peshawri') || text.includes('leela')) {
    return { lat: 19.0664, lng: 72.8679 };
  }
  if (text.includes('juhu') || text.includes('marriott juhu')) {
    return { lat: 19.1026, lng: 72.8270 };
  }
  if (text.includes('sahar') || text.includes('jw marriott sahar') || text.includes('urbanpod') || text.includes('near-t2')) {
    return { lat: 19.0962, lng: 72.8732 };
  }
  if (text.includes('vile parle') || text.includes('ibis') || text.includes('orchid') || text.includes('near-t1')) {
    return { lat: 19.0911, lng: 72.8530 };
  }
  
  // Default fallback
  return { lat: 19.0920, lng: 72.8680 };
}

function calculateFallbackDuration(activities: any[]): number {
  let maxDriveTime = 0.5;
  for (const item of activities) {
    const text = (item.title + ' ' + item.detail).toLowerCase();
    if (text.includes('gateway') || text.includes('colaba') || text.includes('south mumbai') || text.includes('marine drive') || text.includes('highlights') || text.includes('city tour')) {
      maxDriveTime = Math.max(maxDriveTime, 1.5);
    } else if (text.includes('bkc') || text.includes('bandra') || text.includes('juhu') || text.includes('maratha') || text.includes('peshawri')) {
      maxDriveTime = Math.max(maxDriveTime, 0.75);
    }
  }
  if (activities.length >= 2) {
    maxDriveTime += 0.5;
  }
  return Math.min(maxDriveTime, 2.5);
}

export async function calculateRouteDuration(items: { title: string; detail: string; badge: string }[]): Promise<number> {
  const activities = items.filter(
    (item) => item.badge !== 'Cab' && item.badge !== 'Arrival' && item.badge !== 'Security' && item.badge !== 'Departure'
  );

  if (activities.length === 0) {
    return 0;
  }

  const coordsList = [
    AIRPORT_COORDS,
    ...activities.map(getCoordinatesForSpot),
    AIRPORT_COORDS
  ];

  const coordinatesString = coordsList.map((c) => `${c.lng},${c.lat}`).join(';');
  const url = `https://router.project-osrm.org/route/v1/driving/${coordinatesString}?overview=false`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`OSRM error: ${response.statusText}`);
    }
    const data = await response.json();
    if (data.routes && data.routes[0]) {
      const durationSeconds = data.routes[0].duration;
      return durationSeconds / 3600;
    }
  } catch (err) {
    console.error('[RouteCalculator] Failed to fetch OSRM route:', err);
  }

  return calculateFallbackDuration(activities);
}
