export interface NtfyBookingAlert {
  bookingId: string;
  slotId: string;
  userId: string;
  paymentId: string;
}

export async function sendNtfyAlert(bookingData: NtfyBookingAlert): Promise<void> {
  console.log(`[NTFY] Triggering alert for booking: ${bookingData.bookingId}`);
  const ntfyUrl = process.env.NTFY_TOPIC_URL;

  if (!ntfyUrl) {
    console.error('[NTFY ERROR] NTFY_TOPIC_URL is missing in process.env!');
    return;
  }

  const messageText = `Booking ID: ${bookingData.bookingId}\nSlot ID: ${bookingData.slotId}\nUser ID: ${bookingData.userId}\nPayment ID: ${bookingData.paymentId}\nStatus: CONFIRMED\n\nACTION REQUIRED: Reserve this slot on the vendor platform immediately!`;

  try {
    const res = await fetch(ntfyUrl, {
      method: 'POST',
      headers: {
        'Title': 'NEW LAYOVERX CONCIERGE BOOKING',
        'Priority': 'high',
        'Tags': 'rotating_light,airplane',
      },
      body: messageText,
    });

    const responseText = await res.text();

    if (!res.ok) {
      console.error(`[NTFY FAILED] HTTP ${res.status}: ${responseText}`);
    } else {
      console.log(`[NTFY SUCCESS] Delivered! Ntfy Response: ${responseText}`);
    }
  } catch (err: any) {
    console.error(`[NTFY ERROR] Failed to send alert: ${err?.message || err}`);
  }
}
