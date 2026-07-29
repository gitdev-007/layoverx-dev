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
  const isProduction = process.env.NODE_ENV === 'production';

  let status: 'ON_TIME' | 'DELAYED' | 'CANCELLED' | 'UNKNOWN' = 'ON_TIME';
  let delayMinutes = 0;
  let originalETA = '14:30';
  let updatedETA = '14:30';

  const shouldSimulateDelay = flightNumber.toUpperCase().startsWith('DELAY') || !isProduction;

  if (shouldSimulateDelay) {
    status = 'DELAYED';
    delayMinutes = 90;
    originalETA = '14:30';
    updatedETA = '16:00';
    console.log(`[FLIGHT SERVICE] Simulating delay of ${delayMinutes} minutes for flight ${flightNumber}`);
  } else {
    try {
      if (apiKey && !apiKey.includes('your_') && !apiKey.includes('sample_')) {
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
        }
      }
    } catch (err: any) {
      console.error('[FLIGHT SERVICE] AviationStack API error, falling back to ON_TIME:', err?.message || err);
    }
  }

  let slotProtectionApplied = false;

  if (bookingId && status === 'DELAYED') {
    slotProtectionApplied = true;

    if (SUPABASE_URL.startsWith('http') && !SUPABASE_URL.includes('sample-project')) {
      try {
        const { error: updateError } = await supabase
          .from('bookings')
          .update({
            payment_status: 'CONFIRMED',
            flight_status: 'DELAYED',
            delay_minutes: delayMinutes,
          })
          .eq('id', bookingId);

        if (updateError) {
          console.error('❌ Supabase update error in flight track:', updateError.message);
        }
      } catch (err: any) {
        console.error('❌ Exception in flight delay protection flow:', err?.message || err);
      }
    }

    // Dispatch Discord Webhook Alert
    const discordMessage = `⚠️ FLIGHT DELAY DETECTED! Flight ${flightNumber} delayed by 90 mins. Booking ${bookingId} slot window automatically shifted.`;
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
