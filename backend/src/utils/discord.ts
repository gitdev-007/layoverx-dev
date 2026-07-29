export interface DiscordBookingAlert {
  bookingId: string;
  slotId: string;
  userId: string;
  paymentId: string;
  leadPassengerName?: string;
  passportId?: string;
  flightNumber?: string;
  flightDate?: string;
  serviceNames?: string;
  redemptionToken?: string;
  calculatedPickupTime?: string;
}

export async function sendDiscordAlert(bookingData: DiscordBookingAlert): Promise<void> {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl || webhookUrl.includes('your_webhook_id')) {
    console.warn('[DISCORD WARNING] DISCORD_WEBHOOK_URL missing!');
    return;
  }

  const leadName = bookingData.leadPassengerName || 'Alex Traveler';
  const passport = bookingData.passportId || 'L892401';
  const flightNum = bookingData.flightNumber || 'EK-504';
  const flightDt = bookingData.flightDate || new Date().toISOString().split('T')[0];
  const services = bookingData.serviceNames || 'Niranta Airport Transit Hotel';
  const token = bookingData.redemptionToken || 'LX-7842';
  const pickupTime = bookingData.calculatedPickupTime || '15:00';

  const payload = {
    content: `--------------------------------------------------\n✈️ CSMIA T2 GROUND OPS DISPATCH ALERT\n--------------------------------------------------\n• Passenger Name: ${leadName}\n• Passport / ID: ${passport}\n• Incoming Flight: ${flightNum} (${flightDt})\n• Services Booked: ${services}\n• Redemption Token: ${token}\n• Chauffeur Pickup Window: ${pickupTime} (Landing + 30m Buffer)\n• Designated Spot: CSMIA T2 Exit Gate 2 Concierge\n--------------------------------------------------`,
    embeds: [
      {
        title: 'Operations Summary Details',
        color: 5814783,
        fields: [
          { name: 'Booking ID', value: String(bookingData.bookingId), inline: true },
          { name: 'Slot ID', value: String(bookingData.slotId), inline: true },
          { name: 'User ID', value: String(bookingData.userId), inline: true },
          { name: 'Payment ID', value: String(bookingData.paymentId), inline: true },
        ],
      },
    ],
  };

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error(`[DISCORD FAILED] HTTP ${res.status}: ${err}`);
    } else {
      console.log('[DISCORD SUCCESS] Concierge alert sent to Discord channel!');
    }
  } catch (err: any) {
    console.error(`[DISCORD FAILED] Exception sending Discord alert: ${err?.message || err}`);
  }
}
