import { supabaseClient } from '@/lib/supabaseClient';

const getApiBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_API_BASE_URL) {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL;
    return url.endsWith('/api/v1') || url.endsWith('/api/v1/') ? url : `${url.replace(/\/$/, '')}/api/v1`;
  }
  if (typeof window !== 'undefined' && window.location.origin) {
    return `${window.location.origin}/api/v1`;
  }
  return 'https://layoverx-dev.onrender.com/api/v1';
};

async function getAuthHeaders(): Promise<Record<string, string>> {
  if (typeof window === 'undefined') return {};
  try {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (session?.access_token) {
      return {
        'Authorization': `Bearer ${session.access_token}`,
      };
    }
  } catch (err) {
    console.error('[API Auth] Token acquisition failed:', err);
  }
  return {};
}

async function authenticatedFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const authHeaders = await getAuthHeaders();
  const headers = {
    ...options.headers,
    ...authHeaders,
  };
  return fetch(url, { ...options, headers });
}


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
  country_code?: string;
  currency?: string;
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

    const res = await authenticatedFetch(`${getApiBaseUrl()}/services?${params.toString()}`);
    if (!res.ok) throw new Error(`Failed to fetch services: ${res.statusText}`);
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.warn('[API Layer] Service catalog fallback active:', error);
    return [];
  }
}

export async function holdSlot(payload: HoldSlotPayload): Promise<HoldSlotResponse> {
  const res = await authenticatedFetch(`${getApiBaseUrl()}/booking/hold-slot`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  
  const contentType = res.headers.get('content-type');
  let json: any;
  if (contentType && contentType.includes('application/json')) {
    json = await res.json();
  } else {
    const text = await res.text();
    console.error(`HTTP ${res.status} Error from holdSlot:`, text);
    throw new Error(`Server returned status ${res.status}. Please check route mapping.`);
  }

  if (!res.ok || json.status === 'error') {
    throw new Error(json.message || '⚠️ This slot is currently held or booked by another traveler. Please choose another time slot.');
  }
  return json;
}

export async function createRazorpayOrder(payload: CreateOrderPayload): Promise<CreateOrderResponse> {
  const res = await authenticatedFetch(`${getApiBaseUrl()}/booking/create-order`, {
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
  const res = await authenticatedFetch(`${getApiBaseUrl()}/flight/track`, {
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

export interface VerifyVoucherPayload {
  qrData?: string;
  token?: string;
  bookingId?: string;
  hmac?: string;
}

export interface VerifyVoucherResponse {
  status: 'success' | 'error';
  code: 'VALID_BOOKING' | 'ALREADY_REDEEMED' | 'TAMPERED_VOUCHER' | 'INVALID_BOOKING' | string;
  message: string;
  redeemedAt?: string;
  booking?: {
    bookingId: string;
    passengerName: string;
    flightNumber: string;
    passportNumber: string;
    bookedService: string;
    redemptionToken: string;
    redeemedAt?: string;
  };
}

export async function verifyVoucher(payload: VerifyVoucherPayload): Promise<VerifyVoucherResponse> {
  const res = await authenticatedFetch(`${getApiBaseUrl()}/booking/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  return json;
}

export interface DispatchRequestPayload {
  bookingId?: string;
  token?: string;
  passengerName?: string;
  dropLocation?: string;
}

export interface DispatchRequestResponse {
  status: 'success' | 'error';
  code: string;
  message: string;
  dispatch?: {
    bookingId: string;
    passengerName: string;
    scanGate: string;
    dispatchStatus: string;
    assignedAt: string;
    pickupZone: string;
  };
}

export async function requestGateDispatch(payload: DispatchRequestPayload): Promise<DispatchRequestResponse> {
  const res = await authenticatedFetch(`${getApiBaseUrl()}/ops/dispatch-request`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  return json;
}

export interface UploadTicketResponse {
  success: boolean;
  bookingId: string;
  extracted: {
    pnr: string | null;
    flights: string[];
  };
  message: string;
}

export async function uploadTicket(ticketFile: File, phone: string, isConsented: boolean, userId: string): Promise<UploadTicketResponse> {
  const formData = new FormData();
  formData.append('ticket', ticketFile);
  formData.append('phone', phone);
  formData.append('isConsented', isConsented.toString());
  formData.append('userId', userId);

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://layoverx-dev.onrender.com';
  let uploadUrl = '';
  if (baseUrl.endsWith('/api/v1')) {
    uploadUrl = baseUrl.replace('/api/v1', '/api/bookings/upload-ticket');
  } else if (baseUrl.endsWith('/api/v1/')) {
    uploadUrl = baseUrl.replace('/api/v1/', '/api/bookings/upload-ticket');
  } else {
    uploadUrl = `${baseUrl.replace(/\/$/, '')}/api/bookings/upload-ticket`;
  }

  const res = await fetch(uploadUrl, {
    method: 'POST',
    body: formData,
  });

  const contentType = res.headers.get('content-type');
  let resultData: any;

  if (contentType && contentType.includes('application/json')) {
    resultData = await res.json();
  } else {
    const text = await res.text();
    console.error('⚠️ Non-JSON response received from server:', text);
    throw new Error(`Server returned status ${res.status}. Please check backend logs.`);
  }

  if (!res.ok || resultData?.status === 'error' || resultData?.error) {
    throw new Error(resultData?.error || resultData?.message || 'Failed to upload and process ticket.');
  }
  return resultData;
}



