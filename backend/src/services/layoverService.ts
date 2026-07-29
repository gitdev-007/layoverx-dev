import axios from 'axios';
import { supabase } from '../utils/supabase.js';

export interface CalculateLayoverInput {
  terminal: string;
  arrivalTime: string;
  departureTime: string;
  passengers?: number;
  destinationCoords?: [number, number]; // [longitude, latitude]
}

export interface CalculateLayoverResponse {
  totalLayoverMinutes: number;
  totalLayoverFormatted: string;
  usableTimeMinutes: number;
  usableTimeFormatted: string;
  buffers: {
    securityMinutes: number;
    gateMinutes: number;
    transitMinutes: number;
  };
  canExitAirport: boolean;
  eligibleCategories: string[];
  recommendation: string;
}

export function formatDuration(minutes: number): string {
  const absoluteMinutes = Math.abs(minutes);
  const hours = Math.floor(absoluteMinutes / 60);
  const mins = absoluteMinutes % 60;
  const formattedMins = mins < 10 ? `0${mins}` : `${mins}`;
  const prefix = minutes < 0 ? '-' : '';
  return `${prefix}${hours}h ${formattedMins}m`;
}

export async function calculateLayover(
  input: CalculateLayoverInput
): Promise<CalculateLayoverResponse> {
  const { terminal, arrivalTime, departureTime, destinationCoords } = input;

  // 1. Date Validation
  const arrDate = new Date(arrivalTime);
  const depDate = new Date(departureTime);

  if (isNaN(arrDate.getTime()) || isNaN(depDate.getTime())) {
    throw new Error('Invalid arrivalTime or departureTime ISO format');
  }

  const totalLayoverMs = depDate.getTime() - arrDate.getTime();
  if (totalLayoverMs <= 0) {
    throw new Error('departureTime must be after arrivalTime');
  }

  const totalLayoverMinutes = Math.floor(totalLayoverMs / (1000 * 60));

  // 2. Query Supabase for airport_buffers (with fallback)
  let securityMinutes = 90;
  let gateMinutes = 60;

  try {
    const { data, error } = await supabase
      .from('airport_buffers')
      .select('security_minutes, gate_minutes')
      .eq('terminal', terminal)
      .single();

    if (!error && data) {
      securityMinutes = data.security_minutes ?? 90;
      gateMinutes = data.gate_minutes ?? 60;
    }
  } catch (err) {
    // Fallback to default values
    securityMinutes = 90;
    gateMinutes = 60;
  }

  // 3. Query OpenRouteService Matrix API for transit driving time (with fallback)
  let transitMinutes = 30;

  if (
    destinationCoords &&
    Array.isArray(destinationCoords) &&
    destinationCoords.length === 2 &&
    typeof destinationCoords[0] === 'number' &&
    typeof destinationCoords[1] === 'number'
  ) {
    try {
      const apiKey = process.env.OPENROUTESERVICE_API_KEY;
      if (apiKey) {
        const matrixResponse = await axios.post(
          'https://api.openrouteservice.org/v2/matrix/driving-car',
          {
            locations: [
              [72.8742, 19.0896], // CSMIA T2 coordinates
              destinationCoords,
            ],
          },
          {
            headers: {
              Authorization: apiKey,
              'Content-Type': 'application/json',
            },
            timeout: 5000,
          }
        );

        if (
          matrixResponse.data &&
          matrixResponse.data.durations &&
          matrixResponse.data.durations[0] &&
          typeof matrixResponse.data.durations[0][1] === 'number'
        ) {
          const durationSeconds = matrixResponse.data.durations[0][1];
          transitMinutes = Math.ceil(durationSeconds / 60);
        }
      }
    } catch (err) {
      // Fallback to 30 minutes transit buffer on API failure
      transitMinutes = 30;
    }
  }

  // 4. Calculate Usable Time
  const usableTimeMinutes =
    totalLayoverMinutes - securityMinutes - gateMinutes - transitMinutes;

  // 5. Apply Eligibility Rules
  let canExitAirport = false;
  let eligibleCategories: string[] = [];
  let recommendation = '';

  if (usableTimeMinutes < 180) {
    canExitAirport = false;
    eligibleCategories = ['TRANSIT_PODS', 'AIRPORT_LOUNGE', 'EXPRESS_SPA'];
    recommendation =
      'Stay inside Terminal. Micro-stays & express spas available.';
  } else if (usableTimeMinutes <= 300) {
    canExitAirport = true;
    eligibleCategories = [
      'TRANSIT_PODS',
      'NEARBY_HOTELS',
      'SPA',
      'GAMING_LOUNGE',
      'AIRPORT_TRANSFERS',
    ];
    recommendation =
      'Nearby airport hotel or lounge micro-stay recommended.';
  } else {
    canExitAirport = true;
    eligibleCategories = [
      'CITY_TOURS',
      'NEARBY_HOTELS',
      'SPA',
      'GAMING_LOUNGE',
      'AIRPORT_TRANSFERS',
      'FINE_DINING',
    ];
    recommendation =
      'City Sightseeing Tour & Micro-Stay Eligible with return guarantee.';
  }

  return {
    totalLayoverMinutes,
    totalLayoverFormatted: formatDuration(totalLayoverMinutes),
    usableTimeMinutes,
    usableTimeFormatted: formatDuration(usableTimeMinutes),
    buffers: {
      securityMinutes,
      gateMinutes,
      transitMinutes,
    },
    canExitAirport,
    eligibleCategories,
    recommendation,
  };
}
