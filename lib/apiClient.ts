import { supabaseClient } from './supabaseClient';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://layoverx-backend.onrender.com';

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}

export async function apiClient(endpoint: string, options: RequestOptions = {}) {
  const { params, headers: customHeaders, ...customOptions } = options;

  // 1. Resolve URL with params
  let url = `${API_BASE_URL}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams.toString()}`;
  }

  // 2. Fetch current session to get the token
  const { data: { session } } = await supabaseClient.auth.getSession();
  const token = session?.access_token;

  // 3. Construct headers
  const headers = new Headers(customHeaders);
  headers.set('Content-Type', 'application/json');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  // 4. Execute fetch request
  const response = await fetch(url, {
    ...customOptions,
    headers,
  });

  // 5. Handle response and 401 token refresh/auto-logout safety
  if (response.status === 401) {
    // Attempt token refresh via getSession (which auto-refreshes if expired)
    const { data: { session: refreshedSession } } = await supabaseClient.auth.getSession();
    if (refreshedSession?.access_token) {
      // Retry request once with the refreshed token
      headers.set('Authorization', `Bearer ${refreshedSession.access_token}`);
      const retryResponse = await fetch(url, {
        ...customOptions,
        headers,
      });
      if (retryResponse.status === 401) {
        // Still 401 -> trigger sign out safely
        await supabaseClient.auth.signOut();
        if (typeof window !== 'undefined') {
          window.location.href = '/';
        }
        throw new Error('Unauthorized session expired. Signed out.');
      }
      return retryResponse;
    } else {
      // No active session -> sign out and redirect
      await supabaseClient.auth.signOut();
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
      throw new Error('Unauthorized. Signed out.');
    }
  }

  return response;
}
