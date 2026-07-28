export interface DiscordBookingAlert {
  bookingId: string;
  slotId: string;
  userId: string;
  paymentId: string;
}

export async function sendDiscordAlert(bookingData: DiscordBookingAlert): Promise<void> {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl || webhookUrl.includes('your_webhook_id')) {
    console.warn('[DISCORD WARNING] DISCORD_WEBHOOK_URL missing!');
    return;
  }

  const payload = {
    content: '🚨 **NEW LAYOVERX CONCIERGE BOOKING!** @everyone',
    embeds: [
      {
        title: 'Booking Details',
        color: 5814783,
        fields: [
          { name: 'Booking ID', value: String(bookingData.bookingId), inline: true },
          { name: 'Slot ID', value: String(bookingData.slotId), inline: true },
          { name: 'User ID', value: String(bookingData.userId), inline: true },
          { name: 'Payment ID', value: String(bookingData.paymentId), inline: true },
          { name: 'Status', value: 'CONFIRMED', inline: true },
        ],
        description: '⚡ **ACTION REQUIRED:** Open vendor platform and manually reserve this slot now!',
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
