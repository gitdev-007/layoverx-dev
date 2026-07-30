import crypto from 'crypto';

export const DEFAULT_QR_HMAC_SECRET = process.env.NEXT_PUBLIC_QR_HMAC_SECRET || process.env.QR_HMAC_SECRET || 'layoverx_mumbai_t2_secret_key_2026';

export interface QrPassPayload {
  id: string;
  token: string;
  hmac: string;
  t2Gate?: string;
  ts?: number;
}

/**
 * Computes an HMAC SHA-256 signature for a booking ID and redemption token.
 */
export function generateHmacSignature(bookingId: string, token: string, secret = DEFAULT_QR_HMAC_SECRET): string {
  const data = `${bookingId.trim()}:${token.trim().toUpperCase()}`;
  return crypto.createHmac('sha256', secret).update(data).digest('hex').slice(0, 32);
}

/**
 * Creates a signed QR payload object.
 */
export function createQrPayload(bookingId: string, token: string, secret = DEFAULT_QR_HMAC_SECRET): QrPassPayload {
  const cleanId = bookingId.trim();
  const cleanToken = token.trim().toUpperCase();
  const hmac = generateHmacSignature(cleanId, cleanToken, secret);

  return {
    id: cleanId,
    token: cleanToken,
    hmac,
    t2Gate: 'Exit Gate 2 Arrivals',
    ts: Date.now(),
  };
}

/**
 * Creates a JSON stringified signed QR payload.
 */
export function createQrPayloadString(bookingId: string, token: string, secret = DEFAULT_QR_HMAC_SECRET): string {
  return JSON.stringify(createQrPayload(bookingId, token, secret));
}

/**
 * Verifies if a QR payload object or raw JSON string has a valid HMAC signature.
 */
export function verifyQrPayload(qrDataInput: string | QrPassPayload, secret = DEFAULT_QR_HMAC_SECRET): {
  valid: boolean;
  bookingId?: string;
  token?: string;
  error?: string;
} {
  try {
    let payload: QrPassPayload;
    if (typeof qrDataInput === 'string') {
      // Handle plain token fallback or JSON payload
      if (!qrDataInput.startsWith('{')) {
        // Simple token like "LX-7842"
        return {
          valid: true,
          token: qrDataInput.trim().toUpperCase(),
        };
      }
      payload = JSON.parse(qrDataInput);
    } else {
      payload = qrDataInput;
    }

    if (!payload.id || !payload.token || !payload.hmac) {
      return { valid: false, error: 'MISSING_PAYLOAD_FIELDS' };
    }

    const expectedHmac = generateHmacSignature(payload.id, payload.token, secret);
    
    // Constant time comparison
    const hmacBuffer = Buffer.from(payload.hmac, 'utf-8');
    const expectedBuffer = Buffer.from(expectedHmac, 'utf-8');

    const valid = hmacBuffer.length === expectedBuffer.length && crypto.timingSafeEqual(hmacBuffer, expectedBuffer);

    if (!valid) {
      return { valid: false, error: 'TAMPERED_VOUCHER' };
    }

    return {
      valid: true,
      bookingId: payload.id,
      token: payload.token,
    };
  } catch (err: any) {
    return { valid: false, error: 'MALFORMED_QR_DATA' };
  }
}
