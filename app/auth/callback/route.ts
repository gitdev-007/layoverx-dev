import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

  // Construct origin dynamically from x-forwarded headers to avoid Vercel internal host overrides
  const host = request.headers.get('x-forwarded-host') || new URL(request.url).host;
  const proto = request.headers.get('x-forwarded-proto') || 'https';
  const cleanOrigin = host.includes('localhost') ? `${proto}://${host}` : 'https://layoverx.in';

  if (code) {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, {
                  ...options,
                  sameSite: 'lax',
                  secure: true,
                  path: '/',
                })
              );
            } catch {
              // Server Component Context
            }
          },
        },
      }
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Redirect cleanly to destination WITHOUT `?code=` query parameters!
      const cleanRedirectUrl = new URL(next, cleanOrigin);
      cleanRedirectUrl.searchParams.delete('code');
      
      const response = NextResponse.redirect(cleanRedirectUrl.toString());
      response.headers.set('Cache-Control', 'no-store, max-age=0');
      return response;
    } else {
      console.error('Callback Exchange Error:', error.message);
    }
  }

  // Fallback clean redirect
  return NextResponse.redirect(`${cleanOrigin}/`);
}
