-- supabase/migrations/rls.sql
-- Hardening Supabase database table Row Level Security (RLS) policies

-- Enable Row Level Security for services table
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Allow public read access to services for any anonymous client
CREATE POLICY "Allow public read access to services" 
ON services 
FOR SELECT 
USING (true);

-- Enable Row Level Security for bookings table
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Restrict direct client-side modification of bookings completely.
-- All operations (select, insert, update, delete) will be rejected for anonymous/public keys.
-- Server-side integrations using the Service Role Key can bypass these restrictions.
CREATE POLICY "Restrict direct client modification of bookings" 
ON bookings 
FOR ALL 
USING (false)
WITH CHECK (false);
