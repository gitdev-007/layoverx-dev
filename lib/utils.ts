/**
 * getUserDisplayName
 *
 * Safely derives the best available display name for a user in priority order:
 * 1. Supabase profile full_name (from public.profiles DB row)
 * 2. user_metadata.full_name (set at signup or by Google OAuth)
 * 3. user_metadata.name (alias used by some OAuth providers)
 * 4. Email handle (everything before @) — never exposes full email
 * 5. 'Traveler' as the final safe fallback
 */
export function getUserDisplayName(
  user?: { email?: string; user_metadata?: { full_name?: string; name?: string } } | null,
  profile?: { full_name?: string } | null
): string {
  if (profile?.full_name?.trim()) return profile.full_name.trim();
  if (user?.user_metadata?.full_name?.trim()) return user.user_metadata.full_name.trim();
  if (user?.user_metadata?.name?.trim()) return user.user_metadata.name.trim();
  if (user?.email?.includes('@')) return user.email.split('@')[0];
  return 'Traveler';
}

/**
 * getAvatarUrl
 *
 * Returns the best available avatar URL for a user.
 * Checks both OAuth provider metadata fields used by Google.
 */
export function getAvatarUrl(
  user?: { user_metadata?: { avatar_url?: string; picture?: string } } | null,
  profile?: { avatar_url?: string } | null
): string | undefined {
  return (
    profile?.avatar_url ||
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.picture ||
    undefined
  );
}
