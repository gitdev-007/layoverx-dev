import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Bypass session refresh for the oauth callback route to prevent double token exchange or race conditions
  if (request.nextUrl.pathname.startsWith('/auth/callback')) {
    return response;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If Supabase env vars are missing, skip session refresh and pass through
  if (!supabaseUrl || !supabaseAnonKey) {
    return response;
  }

  const host = request.headers.get('x-forwarded-host') || request.nextUrl.host;
  const cookieDomain = host.endsWith('layoverx.in') ? '.layoverx.in' : undefined;

  try {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, {
              ...options,
              domain: cookieDomain,
              sameSite: 'lax',
              secure: true,
              path: '/',
            })
          );
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

    // Refresh the session cookie on every request
    await supabase.auth.getUser();
  } catch (_e) {
    // Never let middleware crash the entire site — always pass through
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
