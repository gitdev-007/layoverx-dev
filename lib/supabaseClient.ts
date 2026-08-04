import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://chskafikxskbiaalmiaw.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

let cookieDomain = '';
if (typeof window !== 'undefined') {
  const hostname = window.location.hostname;
  if (hostname.endsWith('layoverx.in')) {
    cookieDomain = '.layoverx.in';
  }
}

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    detectSessionInUrl: true,
    autoRefreshToken: true,
    cookieOptions: {
      name: 'sb-auth-token',
      domain: cookieDomain || undefined,
      path: '/',
      sameSite: 'lax',
      secure: true,
    }
  },
});
