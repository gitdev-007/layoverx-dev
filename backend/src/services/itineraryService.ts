import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';

const supabase = createClient(
  SUPABASE_URL.startsWith('http') ? SUPABASE_URL : 'https://placeholder.supabase.co',
  SUPABASE_ANON_KEY || 'placeholder'
);

export interface FormattedItinerary {
  bookingId: string;
  serviceName: string;
  airport: string;
  slotId: string;
  amount: number;
  paymentStatus: string;
  vendorRefCode: string;
  checkInInstructions: string;
  supportWhatsapp: string;
  createdAt: string;
}

export interface GetItineraryResult {
  success: boolean;
  count: number;
  itineraries: FormattedItinerary[];
  statusCode: number;
  message?: string;
}

const SAMPLE_MOCK_ITINERARIES: FormattedItinerary[] = [
  {
    bookingId: 'bk_sample_001',
    serviceName: '3-Hour Pod Stay & Hot Shower',
    airport: 'CSMIA Terminal 2 (BOM)',
    slotId: 'slot_1001',
    amount: 2500,
    paymentStatus: 'CONFIRMED',
    vendorRefCode: 'LX-BOM-9821',
    checkInInstructions:
      'Head to the front desk and state your booking is under LayoverX (Ref: LX-BOM-9821)',
    supportWhatsapp: '+91 98200 98200',
    createdAt: new Date().toISOString(),
  },
];

export async function getUserItinerary(userId: string): Promise<GetItineraryResult> {
  if (!userId || typeof userId !== 'string' || userId.trim() === '') {
    return {
      success: false,
      count: 0,
      itineraries: [],
      statusCode: 400,
      message: 'Missing required query parameter: userId',
    };
  }

  // Query Supabase database if configured
  if (SUPABASE_URL.startsWith('http') && !SUPABASE_URL.includes('sample-project')) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          id,
          service_id,
          slot_id,
          amount,
          payment_status,
          created_at,
          vendor_ref_code,
          services (
            title,
            name,
            terminal,
            airport_code,
            vendors (
              name,
              support_whatsapp
            )
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Supabase getUserItinerary query error:', error);
        return {
          success: false,
          count: 0,
          itineraries: [],
          statusCode: 500,
          message: `Database query error: ${error.message}`,
        };
      }

      if (!data || data.length === 0) {
        return {
          success: true,
          count: 0,
          itineraries: [],
          statusCode: 200,
        };
      }

      const itineraries: FormattedItinerary[] = data.map((b: any) => {
        const refCode = b.vendor_ref_code || b.id;
        const serviceName = b.services?.title || b.services?.name || 'LayoverX Transit Service';
        const terminalName = b.services?.terminal || 'CSMIA Terminal 2';
        const airportCode = b.services?.airport_code || 'BOM';
        const airportStr = `${terminalName} (${airportCode})`;
        const whatsapp = b.services?.vendors?.support_whatsapp || '+91 98200 98200';

        return {
          bookingId: b.id,
          serviceName,
          airport: airportStr,
          slotId: b.slot_id,
          amount: b.amount ?? 0,
          paymentStatus: b.payment_status ?? 'PENDING',
          vendorRefCode: refCode,
          checkInInstructions: `Head to the front desk and state your booking is under LayoverX (Ref: ${refCode})`,
          supportWhatsapp: whatsapp,
          createdAt: b.created_at || new Date().toISOString(),
        };
      });

      return {
        success: true,
        count: itineraries.length,
        itineraries,
        statusCode: 200,
      };
    } catch (err: any) {
      console.error('❌ Exception fetching user itinerary:', err);
      return {
        success: false,
        count: 0,
        itineraries: [],
        statusCode: 500,
        message: `Internal server error: ${err.message || String(err)}`,
      };
    }
  }

  // Fallback for development / mock mode
  if (userId.includes('empty') || userId.includes('none')) {
    return {
      success: true,
      count: 0,
      itineraries: [],
      statusCode: 200,
    };
  }

  return {
    success: true,
    count: SAMPLE_MOCK_ITINERARIES.length,
    itineraries: SAMPLE_MOCK_ITINERARIES,
    statusCode: 200,
  };
}
