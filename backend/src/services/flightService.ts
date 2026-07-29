import axios from 'axios';
import { createClient } from '@supabase/supabase-js';
import { sendDiscordAlert } from '../utils/discord.js';

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';

const supabase = createClient(
  SUPABASE_URL.startsWith('http') ? SUPABASE_URL : 'https://placeholder.supabase.co',
  SUPABASE_ANON_KEY || 'placeholder'
);

export interface FlightTrackInput {
  flightNumber: string;
  flightDate: string;
  bookingId?: string;
}

export interface FlightTrackResult {
  success: boolean;
  flightNumber: string;
  status: 'ON_TIME' | 'DELAYED' | 'CANCELLED' | 'UNKNOWN';
  delayMinutes: number;
  originalETA: string;
  updatedETA: string;
  slotProtectionApplied: boolean;
  message?: string;
}

export async function trackAndProtectFlight(input: FlightTrackInput): Promise<FlightTrackResult> {
  const { flightNumber, flightDate, bookingId } = input;
  const apiKey = process.env.AVIATIONSTACK_API_KEY;

  let status: 'ON_TIME' | 'DELAYED' | 'CANCELLED' | 'UNKNOWN' = 'ON_TIME';
  let delayMinutes = 0;
  let originalETA = '14:30';
  let updatedETA = '14:30';

  const shouldSimulateDelay = !apiKey || 
    apiKey.includes('your_') || 
    apiKey.includes('sample_') || 
    flightNumber.toUpperCase().startsWith('DELAY');

  if (shouldSimulateDelay) {
    // Fallback / Dev Test Mode
    status = 'DELAYED';
    delayMinutes = 90;
    originalETA = '14:30';
    updatedETA = '16:00';
    console.log(`[FLIGHT SERVICE] Simulating delay of ${delayMinutes} minutes for flight ${flightNumber}`);
  } else {
    try {
      // Fetch live status from AviationStack API
      const url = `http://api.aviationstack.com/v1/flights?access_key=${apiKey}&flight_iata=${flightNumber}`;
      const response = await axios.get(url);
      const flightData = response.data?.data?.[0];

      if (flightData) {
        const arrival = flightData.arrival;
        delayMinutes = arrival?.delay || 0;
        
        if (delayMinutes > 15) {
          status = 'DELAYED';
        } else {
          status = 'ON_TIME';
        }

        originalETA = arrival?.scheduled ? new Date(arrival.scheduled).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '14:30';
        updatedETA = arrival?.estimated ? new Date(arrival.estimated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : originalETA;
      } else {
        console.warn(`[FLIGHT SERVICE] No live flight data found for ${flightNumber}, defaulting to ON_TIME`);
      }
    } catch (err: any) {
      console.error('[FLIGHT SERVICE] AviationStack API error, falling back to ON_TIME:', err?.message || err);
    }
  }

  let slotProtectionApplied = false;

  // 3. Automated Delay Protection & Slot Shift
  if (bookingId && SUPABASE_URL.startsWith('http') && !SUPABASE_URL.includes('sample-project')) {
    try {
      // Find current booking info
      const { data: booking, error: fetchError } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', bookingId)
        .maybeSingle();

      if (fetchError) {
        console.error('❌ Supabase fetch error in flight track:', fetchError.message);
      } else if (booking) {
        // Prepare updates
        const updates: any = {
          flight_number: flightNumber,
          flight_status: status,
          delay_minutes: delayMinutes,
        };

        // If there's an active hold_expires_at, extend it. Check if column exists, else proceed.
        if (booking.hold_expires_at) {
          const currentExpiry = new Date(booking.hold_expires_at).getTime();
          const extendedExpiry = new Date(currentExpiry + delayMinutes * 60 * 1000).toISOString();
          updates.hold_expires_at = extendedExpiry;
        }

        // Apply updates
        const { error: updateError } = await supabase
          .from('bookings')
          .update(updates)
          .eq('id', bookingId);

        if (updateError) {
          console.error('❌ Supabase update error in flight track:', updateError.message);
        } else {
          slotProtectionApplied = true;

          if (status === 'DELAYED') {
            // Trigger Discord alert for delay protection
            const discordMessage = `⚠️ **FLIGHT DELAY DETECTED!** Flight **${flightNumber}** delayed by **${delayMinutes}** mins. Booking **${bookingId}** slot window automatically shifted.`;
            
            // Re-use Discord webhook helper but with custom Ops message
            const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
            if (webhookUrl && !webhookUrl.includes('your_webhook_id')) {
              try {
                await fetch(webhookUrl, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    content: discordMessage,
                  }),
                });
                console.log('[FLIGHT SERVICE] Discord alert sent successfully.');
              } catch (discordErr) {
                console.error('[FLIGHT SERVICE] Failed to send Discord alert:', discordErr);
              }
            } else {
              console.warn('[FLIGHT SERVICE] DISCORD_WEBHOOK_URL missing, skipping alert.');
            }
          }
        }
      }
    } catch (err: any) {
      console.error('❌ Exception in flight delay protection flow:', err?.message || err);
    }
  }

  return {
    success: true,
    flightNumber,
    status,
    delayMinutes,
    originalETA,
    updatedETA,
    slotProtectionApplied,
  };
}
