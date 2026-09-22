import { supabase, SUPABASE_URL } from '../utils/supabase.js';

export interface BookingRecord {
  id: string;
  user_id?: string;
  user_phone?: string;
  service_id?: string;
  slot_id?: string;
  payment_status: string;
  amount: number;
  currency: string;
  ticket_file_path?: string;
  extracted_pnr?: string | null;
  extracted_inbound_flight?: string | null;
  extracted_outbound_flight?: string | null;
  dpdp_consented?: boolean;
  metadata?: any;
  created_at?: string;
}

export interface SlotLockResult {
  success: boolean;
  statusCode: number;
  message: string;
  bookingId?: string;
  slotId?: string;
  serviceId?: string;
  redemptionToken?: string;
  holdExpiresInSeconds?: number;
}

const isSupabaseConfigured = (): boolean => {
  return (
    Boolean(SUPABASE_URL) &&
    SUPABASE_URL.startsWith('http') &&
    !SUPABASE_URL.includes('placeholder') &&
    !SUPABASE_URL.includes('sample-project')
  );
};

/**
 * BookingRepository: Encapsulates pure database interactions and RPC executions.
 */
export class BookingRepository {
  /**
   * Invokes the PostgreSQL atomic RPC function `hold_inventory_slot`.
   */
  async holdSlotRPC(
    slotId: string,
    serviceId: string,
    userId: string,
    holdSeconds: number = 600
  ): Promise<SlotLockResult | null> {
    if (!isSupabaseConfigured()) {
      return null; // Signals caller to utilize Redis / In-Memory mutex fallback
    }

    try {
      const { data, error } = await supabase.rpc('hold_inventory_slot', {
        p_slot_id: slotId,
        p_service_id: serviceId,
        p_user_id: userId,
        p_hold_seconds: holdSeconds,
      });

      if (error) {
        // If RPC is missing in this environment, fall back gracefully
        if (error.code === '42883' || error.message?.includes('function') || error.message?.includes('not found')) {
          return null;
        }
        throw error;
      }

      if (data) {
        return {
          success: Boolean(data.success),
          statusCode: Number(data.status_code || (data.success ? 200 : 409)),
          message: data.message || (data.success ? 'Slot held successfully' : 'Slot unavailable'),
          bookingId: data.booking_id,
          slotId: data.slot_id || slotId,
          serviceId: data.service_id || serviceId,
          redemptionToken: data.redemption_token,
          holdExpiresInSeconds: data.hold_expires_in_seconds || holdSeconds,
        };
      }
    } catch (err: any) {
      console.warn('[BookingRepository.holdSlotRPC] Database RPC failed, relying on cache lock:', err.message);
    }

    return null;
  }

  /**
   * Find booking by ID with ownership/role security scoping.
   */
  async findById(id: string, userId?: string, userRole?: string): Promise<BookingRecord | null> {
    if (!isSupabaseConfigured()) {
      return null;
    }

    let query = supabase.from('bookings').select('*').eq('id', id);

    // Scoping check for IDOR protection
    if (userRole !== 'admin' && userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query.maybeSingle();
    if (error) {
      throw error;
    }

    return data as BookingRecord | null;
  }

  /**
   * Insert a new booking record.
   */
  async insert(record: Partial<BookingRecord>): Promise<BookingRecord> {
    if (!isSupabaseConfigured()) {
      return {
        id: record.id || `bk_${Date.now()}`,
        amount: record.amount || 0,
        currency: record.currency || 'INR',
        payment_status: record.payment_status || 'PENDING',
        ...record,
      } as BookingRecord;
    }

    const { data, error } = await supabase.from('bookings').insert(record).select().single();
    if (error) {
      throw error;
    }
    return data as BookingRecord;
  }

  /**
   * Update booking by ID.
   */
  async update(id: string, updates: Partial<BookingRecord>): Promise<BookingRecord | null> {
    if (!isSupabaseConfigured()) {
      return { id, ...updates } as BookingRecord;
    }

    const { data, error } = await supabase
      .from('bookings')
      .update(updates)
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) {
      throw error;
    }
    return data as BookingRecord | null;
  }
}

export const bookingRepository = new BookingRepository();
