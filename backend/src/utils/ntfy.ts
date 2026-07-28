export interface NtfyBookingAlert {
  bookingId: string;
  slotId: string;
  userId: string;
  paymentId: string;
}

export async function sendNtfyAlert(bookingData: NtfyBookingAlert): Promise<void> {
  const ntfyUrl = process.env.NTFY_TOPIC_URL;

  if (!ntfyUrl) {
    console.warn('⚠️ NTFY_TOPIC_URL is missing in process.env, skipping Ntfy alert.');
    return;
  }

  const messageText = `Booking ID: ${bookingData.bookingId}
Slot ID: ${bookingData.slotId}
User ID: ${bookingData.userId}
Payment ID: ${bookingData.paymentId}
Status: CONFIRMED

ACTION REQUIRED: Reserve this slot on the vendor platform immediately!`;

  try {
    const res = await fetch(ntfyUrl, {
      method: 'POST',
      headers: {
        'Title': '🚨 NEW LAYOVERX CONCIERGE BOOKING!',
        'Priority': 'high',
        'Tags': 'rotating_light,airplane',
        'Content-Type': 'text/plain',
      },
      body: messageText,
    });

    if (res.ok) {
      console.log(`🔔 Ntfy concierge push notification dispatched successfully for booking: ${bookingData.bookingId}`);
    } else {
      console.warn(`⚠️ Ntfy push notification responded with HTTP ${res.status}`);
    }
  } catch (err) {
    console.error('❌ Failed to dispatch Ntfy push notification:', err);
  }
}
