import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://chskafikxskbiaalmiaw.supabase.co',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder',
      {
        cookies: {
          getAll: () => (request as any).cookies?.getAll ? (request as any).cookies.getAll() : [],
          setAll: () => {},
        },
      }
    );
    const { data } = await supabase.auth.exchangeCodeForSession(code);
    if (data?.session?.user) {
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
    }
  }

  return NextResponse.redirect(`${origin}${next}`);
}
