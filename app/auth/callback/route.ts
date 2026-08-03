import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://chskafikxskbiaalmiaw.supabase.co',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder',
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {
              // Handled in Server Component / Middleware
            }
          },
        },
      }
    );

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error && data?.session?.user) {
      const u = data.session.user;
      const userEmail = u.email || '';
      const fullName = u.user_metadata?.full_name || u.user_metadata?.name || (userEmail ? userEmail.split('@')[0] : 'Traveler');
      try {
        await supabase.from('profiles').upsert({
          id: u.id,
          email: userEmail,
          full_name: fullName,
        }, { onConflict: 'id' });
      } catch (e) {}

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Return user to home page on error/fallback without ugly query params
  return NextResponse.redirect(`${origin}/`);
}
