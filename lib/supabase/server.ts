import { createServerClient } from '@supabase/ssr';
import { cookies, headers } from 'next/headers';

export function createClient() {
  const cookieStore = cookies();
  const reqHeaders = headers();
  const host = reqHeaders.get('x-forwarded-host') || reqHeaders.get('host') || '';
  const cookieDomain = host.endsWith('layoverx.in') ? '.layoverx.in' : undefined;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://chskafikxskbiaalmiaw.supabase.co';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, {
              ...options,
              domain: cookieDomain,
              sameSite: 'lax',
              secure: true,
              path: '/',
            })
          );
        } catch {
          // Server component context
        }
      },
    },
    cookieOptions: {
      name: 'sb-auth-token',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      domain: cookieDomain,
      path: '/',
      sameSite: 'lax',
      secure: true,
    }
  });
}
