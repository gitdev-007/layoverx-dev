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
  let siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.layoverx.in';
  if (siteUrl.includes('layoverx.in') && !siteUrl.includes('www.')) {
    siteUrl = siteUrl.replace('layoverx.in', 'www.layoverx.in');
  }
  const cleanOrigin = host.includes('localhost') ? `${proto}://${host}` : siteUrl;

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
              const host = request.headers.get('x-forwarded-host') || new URL(request.url).host;
              const cookieDomain = host.endsWith('layoverx.in') ? '.layoverx.in' : undefined;

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
              // Server Component Context
            }
          },
        },
      }
    );

    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (!error) {
        // Redirect cleanly to destination WITHOUT `?code=` query parameters!
        const cleanRedirectUrl = new URL(next, cleanOrigin);
        cleanRedirectUrl.searchParams.delete('code');
        
        const response = NextResponse.redirect(cleanRedirectUrl.toString());
        response.headers.set('Cache-Control', 'no-store, max-age=0');
        return response;
      } else {
        console.error('Callback Exchange Error:', error);
        return NextResponse.redirect(`${cleanOrigin}/?auth_error=${encodeURIComponent(error.message)}`);
      }
    } catch (err: any) {
      console.error('Callback Exchange Exception (Unhandled):', err);
      const msg = err?.message || 'Authentication code exchange failed';
      return NextResponse.redirect(`${cleanOrigin}/?auth_error=${encodeURIComponent(msg)}`);
    }
  }

  // Fallback clean redirect
  return NextResponse.redirect(`${cleanOrigin}/`);
}
