import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://chskafikxskbiaalmiaw.supabase.co';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

  return createBrowserClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookieOptions: {
        name: 'sb-auth-token',
        lifetime: 60 * 60 * 24 * 7, // 7 days
        domain: '',
        path: '/',
        sameSite: 'lax',
        secure: true,
      },
    }
  );
}
