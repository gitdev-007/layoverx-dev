-- SQL Migration: Vendor Payout Ledger Table for 80/20 Split
CREATE TABLE IF NOT EXISTS payout_ledger (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id TEXT NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  vendor_name TEXT NOT NULL DEFAULT 'CSMIA T2 Partner Pool',
  total_paid_inr NUMERIC(10,2) NOT NULL,
  vendor_share_inr NUMERIC(10,2) NOT NULL,
  platform_fee_inr NUMERIC(10,2) NOT NULL,
  payout_status TEXT CHECK (payout_status IN ('PENDING', 'PAID')) DEFAULT 'PENDING',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
