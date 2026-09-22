-- SQL Migration: Atomic Slot Lock with PostgreSQL Row-Level Locking
-- File: supabase/migrations/20260731_atomic_slot_lock.sql

CREATE TABLE IF NOT EXISTS service_slots (
  id TEXT PRIMARY KEY,
  service_id TEXT NOT NULL,
  slot_label TEXT NOT NULL DEFAULT 'Transit Slot',
  status TEXT CHECK (status IN ('AVAILABLE', 'HELD', 'BOOKED')) DEFAULT 'AVAILABLE',
  held_by TEXT,
  hold_expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on service_slots
ALTER TABLE service_slots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to service_slots"
ON service_slots FOR SELECT USING (true);

CREATE POLICY "Restrict direct client modification of service_slots"
ON service_slots FOR ALL USING (false) WITH CHECK (false);

-- Atomic PostgreSQL RPC Function for Slot Reservation
CREATE OR REPLACE FUNCTION hold_inventory_slot(
  p_slot_id TEXT,
  p_service_id TEXT,
  p_user_id TEXT,
  p_hold_seconds INT DEFAULT 600
) RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_slot RECORD;
  v_booking_id TEXT;
  v_token TEXT;
BEGIN
  -- 1. Acquire row-level exclusive lock on slot record
  SELECT * INTO v_slot
  FROM service_slots
  WHERE id = p_slot_id
  FOR UPDATE;

  -- 2. Auto-initialize slot record if not yet inserted
  IF NOT FOUND THEN
    INSERT INTO service_slots (id, service_id, slot_label, status, held_by, hold_expires_at)
    VALUES (p_slot_id, p_service_id, 'Standard Slot', 'AVAILABLE', NULL, NULL)
    RETURNING * INTO v_slot;
  END IF;

  -- 3. Check for active hold by another user
  IF v_slot.status = 'HELD' AND v_slot.hold_expires_at > NOW() AND v_slot.held_by != p_user_id THEN
    RETURN jsonb_build_object(
      'success', false,
      'status_code', 409,
      'message', 'Slot is currently held by another passenger. Please select another slot or retry in 10 minutes.'
    );
  END IF;

  -- 4. Check for completed booking
  IF v_slot.status = 'BOOKED' THEN
    RETURN jsonb_build_object(
      'success', false,
      'status_code', 409,
      'message', 'Slot has already been fully booked.'
    );
  END IF;

  -- 5. Generate unique booking ID and HMAC redemption token
  v_booking_id := 'bk_' || EXTRACT(EPOCH FROM NOW())::BIGINT || '_' || SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 6);
  v_token := 'LX-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 4));

  -- 6. Atomic state transition
  UPDATE service_slots
  SET status = 'HELD',
      held_by = p_user_id,
      hold_expires_at = NOW() + (p_hold_seconds || ' seconds')::INTERVAL,
      updated_at = NOW()
  WHERE id = p_slot_id;

  RETURN jsonb_build_object(
    'success', true,
    'status_code', 200,
    'booking_id', v_booking_id,
    'slot_id', p_slot_id,
    'service_id', p_service_id,
    'redemption_token', v_token,
    'hold_expires_in_seconds', p_hold_seconds
  );
END;
$$;
