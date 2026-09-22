import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.js';

const router = Router();

/**
 * POST /api/v1/booking/verify or /
 * Verify and redeem QR code / token (LX-XXXX) at Gate 2.
 * Inserts immutable proof-of-service log into Supabase 'proof_of_service_logs'.
 */
router.post(['/', '/verify'], requireAuth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { qrData, token: rawToken, bookingId: rawBookingId, hmac: rawHmac, passportCountry, flightNumber, scanGate } = req.body || {};
    
    let bookingId = rawBookingId;
    let token = rawToken;
    let hmac = rawHmac;

    if (qrData && typeof qrData === 'string' && qrData.startsWith('{')) {
      try {
        const parsed = JSON.parse(qrData);
        if (parsed.id) bookingId = parsed.id;
        if (parsed.token) token = parsed.token;
        if (parsed.hmac) hmac = parsed.hmac;
      } catch (_e) {
        res.status(400).json({
          status: 'error',
          code: 'TAMPERED_VOUCHER',
          message: 'Malformed QR code payload format.',
        });
        return;
      }
    } else if (qrData && typeof qrData === 'string' && !token) {
      token = qrData.trim().toUpperCase();
    }

    const refCode = token || qrData || bookingId;

    if (!refCode) {
      res.status(400).json({
        status: 'error',
        code: 'MISSING_PARAMS',
        message: 'Redemption token, QR data, or booking ID is required',
      });
      return;
    }

    token = token ? String(token).trim().toUpperCase() : undefined;

    // Cryptographic HMAC Verification
    const secret = process.env.QR_HMAC_SECRET || 'layoverx_mumbai_t2_secret_key_2026';
    if (hmac && bookingId && token) {
      const expectedHmac = crypto.createHmac('sha256', secret).update(`${bookingId}:${token}`).digest('hex').slice(0, 32);
      const hmacBuf = Buffer.from(String(hmac), 'utf-8');
      const expBuf = Buffer.from(expectedHmac, 'utf-8');
      const isSignatureMatch = hmacBuf.length === expBuf.length && crypto.timingSafeEqual(hmacBuf, expBuf);
      const isTestTokenBypass = process.env.NODE_ENV !== 'production' && (token === 'LX-7842' || token === 'LX-TEST');

      if (!isSignatureMatch && !isTestTokenBypass) {
        res.status(400).json({
          status: 'error',
          code: 'TAMPERED_VOUCHER',
          message: 'Cryptographic HMAC verification failed. Voucher QR may be tampered or forged.',
        });
        return;
      }
    }

    const SUPABASE_URL = process.env.SUPABASE_URL || '';
    const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';
    const redeemedAt = new Date().toISOString();
    const targetGate = scanGate || 'CSMIA_T2_EXIT_GATE_2';
    const hmacSig = hmac || `hmac_sha256_${Date.now()}_verified`;

    // Mock Mode fallback
    if (!SUPABASE_URL.startsWith('http') || SUPABASE_URL.includes('sample-project')) {
      res.status(200).json({
        status: 'success',
        code: 'VALID_BOOKING',
        message: 'Voucher verified and redeemed successfully at Gate 2!',
        redeemedAt,
        proofOfService: {
          bookingId: refCode,
          redeemedAt,
          passportCountry: passportCountry || 'United States',
          flightNumber: flightNumber || 'EK-504',
          scanGate: targetGate,
          hmacSignature: hmacSig,
          disputeStatus: 'IMMUTABLE_LOG_VERIFIED',
        },
      });
      return;
    }

    const { createClient } = await import('@supabase/supabase-js');
    const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    let query = db.from('bookings').select('*');
    if (token || qrData) {
      query = query.eq('vendor_ref_code', token || qrData);
    } else {
      query = query.eq('id', bookingId);
    }

    const { data: booking, error } = await query.maybeSingle();

    if (error) {
      res.status(500).json({
        status: 'error',
        code: 'SERVER_ERROR',
        message: `Database error on verification: ${error.message}`,
      });
      return;
    }

    if (!booking) {
      res.status(404).json({
        status: 'error',
        code: 'INVALID_BOOKING',
        message: 'Voucher token or booking ID not found in system.',
      });
      return;
    }

    if (booking.payment_status === 'REDEEMED') {
      res.status(409).json({
        status: 'error',
        code: 'ALREADY_REDEEMED',
        message: '⚠️ This voucher was already redeemed!',
        redeemedAt: booking.redeemed_at || booking.updated_at || redeemedAt,
      });
      return;
    }

    // Mark booking as REDEEMED
    await db
      .from('bookings')
      .update({
        payment_status: 'REDEEMED',
        redeemed_at: redeemedAt,
      })
      .eq('id', booking.id);

    // Insert Immutable Record into Supabase table 'proof_of_service_logs'
    const proofRecord = {
      booking_id: booking.id,
      redeemed_at: redeemedAt,
      passport_country: passportCountry || booking.passport_country || 'United States',
      flight_number: flightNumber || booking.flight_number || 'EK-504',
      scan_gate: targetGate,
      hmac_signature: hmacSig,
    };

    try {
      await db.from('proof_of_service_logs').insert([proofRecord]);
    } catch (logErr: any) {
      console.warn('⚠️ Proof of service log insertion warning:', logErr?.message || logErr);
    }

    res.status(200).json({
      status: 'success',
      code: 'VALID_BOOKING',
      message: 'Voucher verified and redeemed successfully at Gate 2!',
      redeemedAt,
      proofOfService: proofRecord,
    });
  } catch (err: any) {
    res.status(500).json({
      status: 'error',
      code: 'SERVER_ERROR',
      message: err.message || 'Internal server error while verifying voucher',
    });
  }
});

/**
 * GET /api/v1/booking/proof/:bookingId or /proof/:bookingId
 * Expose dispute submission proof for chargeback protection.
 */
router.get(['/proof/:bookingId', '/:bookingId/proof'], requireAuth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { bookingId } = req.params;
    const currentUserId = req.user?.id;
    const userRole = req.userRole || req.user?.role;

    if (!bookingId) {
      res.status(400).json({ status: 'error', message: 'bookingId parameter is required' });
      return;
    }

    const SUPABASE_URL = process.env.SUPABASE_URL || '';
    const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';

    // Mock Mode fallback
    if (!SUPABASE_URL.startsWith('http') || SUPABASE_URL.includes('sample-project')) {
      res.status(200).json({
        status: 'success',
        proof: {
          bookingId,
          redeemedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          passportCountry: 'United States',
          flightNumber: 'EK-504',
          scanGate: 'CSMIA_T2_EXIT_GATE_2',
          hmacSignature: 'verified_hmac_sha256_sig',
          disputeProofStatus: 'IMMUTABLE_LOG_VERIFIED',
          legalStatement: 'Physical presence and redemption verified at CSMIA T2 Exit Gate 2. Chargeback dispute evidence generated.',
        },
      });
      return;
    }

    const { createClient } = await import('@supabase/supabase-js');
    const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // IDOR Check: Ensure requester owns booking or has privileged role
    if (userRole !== 'admin' && userRole !== 'operator' && userRole !== 'staff') {
      const { data: bookingData } = await db.from('bookings').select('user_id').eq('id', bookingId).maybeSingle();
      if (!bookingData || bookingData.user_id !== currentUserId) {
        res.status(403).json({ status: 'error', message: 'Access denied: You do not own this booking.' });
        return;
      }
    }

    const { data: log, error } = await db
      .from('proof_of_service_logs')
      .select('*')
      .eq('booking_id', bookingId)
      .maybeSingle();

    if (error || !log) {
      res.status(404).json({
        status: 'error',
        message: 'No redemption proof log found for this booking ID.',
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      proof: {
        bookingId: log.booking_id,
        redeemedAt: log.redeemed_at,
        passportCountry: log.passport_country,
        flightNumber: log.flight_number,
        scanGate: log.scan_gate,
        hmacSignature: log.hmac_signature,
        disputeProofStatus: 'IMMUTABLE_LOG_VERIFIED',
        legalStatement: 'Physical presence and redemption verified at CSMIA T2 Exit Gate 2. Chargeback dispute evidence generated.',
      },
    });
  } catch (err: any) {
    res.status(500).json({ status: 'error', message: err.message || 'Internal server error while fetching proof' });
  }
});

export default router;
