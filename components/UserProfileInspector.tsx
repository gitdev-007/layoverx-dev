'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { 
  User as UserIcon, 
  Mail, 
  Image as ImageIcon, 
  Shield, 
  Key, 
  Clock, 
  ChevronDown, 
  ChevronRight, 
  LogOut, 
  CheckCircle2, 
  XCircle, 
  Info,
  Terminal,
  Activity
} from 'lucide-react';

export default function UserProfileInspector() {
  const { 
    user, // This is the application-derived UserProfile object (id, email, name, avatarUrl, role)
    rawUser, // This is the native Supabase User object
    session, // This is the native Supabase Session object
    loading, 
    logout, 
    openAuthModal 
  } = useAuth();

  const isAdmin = user?.role === 'admin';

  const [isRawJsonExpanded, setIsRawJsonExpanded] = useState(false);

  // Handle loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-slate-900/50 border border-slate-800 rounded-3xl backdrop-blur-md max-w-2xl mx-auto my-6 text-slate-200">
        <Activity className="w-8 h-8 text-sky-400 animate-spin mb-4" />
        <p className="text-sm font-semibold tracking-wide text-slate-400">Loading Auth Profile & Session data...</p>
      </div>
    );
  }

  // Handle logged-out state
  if (!rawUser) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-slate-900/50 border border-slate-800 rounded-3xl backdrop-blur-md max-w-2xl mx-auto my-6">
        <div className="w-16 h-16 bg-slate-800 border border-slate-700 text-slate-400 flex items-center justify-center rounded-2xl mb-4 shadow-xl">
          <UserIcon className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">No Active Session Found</h3>
        <p className="text-sm text-slate-400 max-w-sm mb-6 leading-relaxed">
          Please log in to view active session cookies, OAuth metadata, user tokens, and security claims.
        </p>
        <button
          onClick={() => openAuthModal('login')}
          className="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm rounded-xl transition duration-200 shadow-lg shadow-sky-600/25"
        >
          Sign In / Log In
        </button>
      </div>
    );
  }

  // Derive dynamic handle using preferred_username or email handle fallback
  const dynamicHandle = rawUser.user_metadata?.preferred_username 
    || rawUser.email?.split('@')[0] 
    || 'Traveler';

  // Calculate token remaining lifetime (if session.expires_at exists)
  const getRemainingTime = () => {
    if (!session?.expires_at) return 'N/A';
    const expiresAtMs = session.expires_at * 1000;
    const diffMs = expiresAtMs - Date.now();
    if (diffMs <= 0) return 'Expired';
    
    const minutes = Math.floor(diffMs / 60000);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    return `${hours}h ${remainingMinutes}m remaining (${new Date(expiresAtMs).toLocaleTimeString()})`;
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl max-w-2xl mx-auto my-6 text-slate-200 font-sans">
      
      {/* Top Banner / User Header */}
      <div className="relative bg-gradient-to-r from-sky-900/40 to-slate-900/60 p-6 border-b border-slate-800 flex flex-col sm:flex-row items-center gap-5">
        
        {/* Profile Avatar / Initial Badge */}
        {user?.avatarUrl ? (
          <img 
            src={user.avatarUrl} 
            alt={user.name} 
            className="w-20 h-20 rounded-2xl object-cover shadow-lg border-2 border-sky-500/30"
          />
        ) : (
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-sky-600 to-indigo-700 text-white flex items-center justify-center text-3xl font-extrabold shadow-lg uppercase">
            {dynamicHandle.charAt(0)}
          </div>
        )}

        <div className="flex-1 text-center sm:text-left min-w-0">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
            <h2 className="text-xl font-bold text-white tracking-tight truncate">{user?.name || dynamicHandle}</h2>
            {rawUser.email_confirmed_at && (
              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">
                <CheckCircle2 className="w-3 h-3" /> Verified
              </span>
            )}
            {isAdmin && (
              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/20">
                <Shield className="w-3 h-3" /> Admin
              </span>
            )}
          </div>
          <p className="text-xs text-sky-400 font-semibold mb-2 font-mono">@{dynamicHandle}</p>
          <p className="text-sm text-slate-400 truncate flex items-center justify-center sm:justify-start gap-2">
            <Mail className="w-4 h-4 text-slate-500" />
            {rawUser.email}
          </p>
        </div>

        {/* Sign Out Button */}
        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 bg-rose-950/40 hover:bg-rose-950/70 border border-rose-500/30 text-rose-300 hover:text-rose-100 rounded-xl text-sm font-bold transition duration-200 mt-2 sm:mt-0"
        >
          <LogOut className="w-4 h-4" /> Log Out
        </button>
      </div>

      {/* Profile Claims Grid */}
      <div className="p-6 space-y-6">
        
        {/* Section: Application Mapped Info */}
        <div>
          <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
            <UserIcon className="w-3.5 h-3.5 text-sky-400" />
            Frontend Derived UserProfile
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-900/30 border border-slate-900 p-4 rounded-2xl">
            <div className="flex flex-col">
              <span className="text-[11px] text-slate-500 uppercase font-bold">Display Name (mapped)</span>
              <span className="text-sm text-slate-300 font-medium">{user?.name || 'N/A'}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] text-slate-500 uppercase font-bold">Email Address</span>
              <span className="text-sm text-slate-300 font-medium">{user?.email || 'N/A'}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] text-slate-500 uppercase font-bold">Avatar URL</span>
              <span className="text-sm text-slate-300 font-medium truncate" title={user?.avatarUrl}>
                {user?.avatarUrl ? user.avatarUrl : 'None'}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] text-slate-500 uppercase font-bold">Role Claim</span>
              <span className="text-sm font-semibold capitalize text-sky-400">{user?.role || 'user'}</span>
            </div>
          </div>
        </div>

        {/* Section: Google OAuth User Metadata */}
        <div>
          <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-sky-400" />
            OAuth Identity / Metadata Claims
          </h4>
          <div className="space-y-2 bg-slate-900/30 border border-slate-900 p-4 rounded-2xl">
            <div className="flex justify-between items-center py-1.5 border-b border-slate-900 text-xs">
              <span className="text-slate-500 font-bold">OAuth Name</span>
              <span className="text-slate-300 font-mono font-medium">{rawUser.user_metadata?.full_name || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-slate-900 text-xs">
              <span className="text-slate-500 font-bold">OAuth Avatar Url</span>
              <span className="text-slate-300 font-mono font-medium truncate max-w-[280px]">
                {rawUser.user_metadata?.avatar_url || rawUser.user_metadata?.picture || 'N/A'}
              </span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-slate-900 text-xs">
              <span className="text-slate-500 font-bold">Google Sub ID</span>
              <span className="text-slate-300 font-mono font-medium">{rawUser.user_metadata?.sub || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 text-xs">
              <span className="text-slate-500 font-bold">Verification Status</span>
              {rawUser.email_confirmed_at ? (
                <span className="text-emerald-400 font-mono font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Email Verified
                </span>
              ) : (
                <span className="text-rose-400 font-mono font-medium flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5" /> Email Unverified
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Section: Auth System Information */}
        <div>
          <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
            <Key className="w-3.5 h-3.5 text-sky-400" />
            Auth System Parameters
          </h4>
          <div className="space-y-2 bg-slate-900/30 border border-slate-900 p-4 rounded-2xl">
            <div className="flex justify-between items-center py-1.5 border-b border-slate-900 text-xs">
              <span className="text-slate-500 font-bold">User UUID</span>
              <span className="text-slate-300 font-mono font-medium">{rawUser.id}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-slate-900 text-xs">
              <span className="text-slate-500 font-bold">JWT Access Role</span>
              <span className="text-slate-300 font-mono font-medium text-sky-400 uppercase font-bold">{rawUser.role || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-slate-900 text-xs">
              <span className="text-slate-500 font-bold">Auth Provider</span>
              <span className="text-slate-300 font-mono font-medium capitalize">{rawUser.app_metadata?.provider || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-slate-900 text-xs">
              <span className="text-slate-500 font-bold">Last Sign-In</span>
              <span className="text-slate-300 font-mono font-medium">
                {rawUser.last_sign_in_at ? new Date(rawUser.last_sign_in_at).toLocaleString() : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between items-center py-1.5 text-xs">
              <span className="text-slate-500 font-bold">Token Expiry</span>
              <span className="text-slate-300 font-mono font-medium flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                {getRemainingTime()}
              </span>
            </div>
          </div>
        </div>

        {/* Section: Expandable Raw Session JSON Inspector */}
        <div className="border border-slate-800 rounded-2xl overflow-hidden">
          <button
            onClick={() => setIsRawJsonExpanded(!isRawJsonExpanded)}
            className="w-full px-5 py-4 bg-slate-900/40 hover:bg-slate-900/60 flex items-center justify-between text-xs font-bold uppercase tracking-wide text-slate-400 transition"
          >
            <span className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-sky-400" />
              Raw Token & User Payload Inspector
            </span>
            {isRawJsonExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>

          {isRawJsonExpanded && (
            <div className="p-4 bg-slate-950 border-t border-slate-900 font-mono text-[11px] leading-relaxed text-slate-300 space-y-4">
              <div>
                <p className="text-[10px] font-extrabold uppercase text-sky-500 mb-1.5">// Session User Payload (Claims & Identity metadata)</p>
                <pre className="p-3 bg-slate-900 border border-slate-850 rounded-xl overflow-x-auto text-sky-300">
                  {JSON.stringify(session?.user || rawUser, null, 2)}
                </pre>
              </div>

              <div>
                <p className="text-[10px] font-extrabold uppercase text-purple-400 mb-1.5">// OAuth Provider Access Token (If available in local storage/cookies)</p>
                <pre className="p-3 bg-slate-900 border border-slate-850 rounded-xl overflow-x-auto text-purple-300">
                  {JSON.stringify({
                    provider_token: session?.provider_token || null,
                    provider_refresh_token: session?.provider_refresh_token || null,
                    expires_at: session?.expires_at || null,
                  }, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}
