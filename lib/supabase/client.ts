import { createBrowserClient } from '@supabase/ssr';

let supabaseClient: ReturnType<typeof createBrowserClient> | null = null;

export function createClient() {
  if (supabaseClient) {
    return supabaseClient;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://chskafikxskbiaalmiaw.supabase.co';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

  let cookieDomain = '';
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname.endsWith('layoverx.in')) {
      cookieDomain = '.layoverx.in';
    }
  }

  supabaseClient = createBrowserClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      auth: {
        detectSessionInUrl: true,
        persistSession: true,
      },
      cookieOptions: {
        name: 'sb-auth-token',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        domain: cookieDomain,
        path: '/',
        sameSite: 'lax',
        secure: true,
      },
    }
  );

  return supabaseClient;
}
