const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1';

export interface ServiceItem {
  id: string;
  slotId?: string;
  name: string;
  category: string;
  terminal: string;
  distance: string;
  rating: number;
  reviews: number;
  price: number;
  description: string;
  image: string;
  amenities?: string[];
  badge?: string;
}

export interface HoldSlotPayload {
  userId: string;
  serviceId: string;
  slotId: string;
}

export interface HoldSlotResponse {
  status: string;
  message: string;
  bookingId?: string;
  slotId?: string;
  serviceId?: string;
}

export interface CreateOrderPayload {
  userId: string;
  serviceId: string;
  slotId: string;
  amount: number;
}

export interface CreateOrderResponse {
  status: string;
  bookingId: string;
  razorpayOrderId: string;
  amount: number;
  currency: string;
  keyId: string;
  order?: any;
  message?: string;
}

export interface TrackFlightPayload {
  flightNumber: string;
  flightDate: string;
  bookingId?: string;
}

export interface TrackFlightResponse {
  status: string;
  flight?: {
    flightNumber: string;
    status: string;
    delayMinutes: number;
    originalETA: string;
    updatedETA: string;
    slotProtectionApplied: boolean;
  };
  message?: string;
}

export async function fetchServices(category?: string, usableMinutes?: number, terminal?: string): Promise<ServiceItem[]> {
  try {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (usableMinutes) params.append('usableMinutes', usableMinutes.toString());
    if (terminal) params.append('terminal', terminal);

    const res = await fetch(`${API_BASE}/services?${params.toString()}`);
    if (!res.ok) throw new Error(`Failed to fetch services: ${res.statusText}`);
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.warn('[API Layer] Service catalog fallback active:', error);
    return [];
  }
}

export async function holdSlot(payload: HoldSlotPayload): Promise<HoldSlotResponse> {
  const res = await fetch(`${API_BASE}/booking/hold-slot`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  if (!res.ok || json.status === 'error') {
    throw new Error(json.message || '⚠️ This slot is currently held or booked by another traveler. Please choose another time slot.');
  }
  return json;
}

export async function createRazorpayOrder(payload: CreateOrderPayload): Promise<CreateOrderResponse> {
  const res = await fetch(`${API_BASE}/booking/create-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  if (!res.ok || json.status === 'error') {
    throw new Error(json.message || 'Failed to create payment order. Please try again.');
  }
  return json;
}

export async function trackFlight(payload: TrackFlightPayload): Promise<TrackFlightResponse> {
  const res = await fetch(`${API_BASE}/flight/track`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  if (!res.ok || json.status === 'error') {
    throw new Error(json.message || 'Unable to track flight status.');
  }
  return json;
}
