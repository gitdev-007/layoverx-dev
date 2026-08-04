'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useItinerary } from '@/context/itinerary-context';
import { supabaseClient } from '@/lib/supabaseClient';
import AuthModal from '@/components/AuthModal';
import { getUserHandle } from '@/lib/utils';
import {
  Menu,
  X,
  User,
  LogOut,
  Calendar,
  Shield,
  Plane,
  ChevronDown,
  Sun,
  Moon,
  AlertTriangle,
  CheckCircle,
  Copy,
  Check,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { items, toast } = useItinerary();
  
  const [user, setUser] = useState<any>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    async function getSession() {
      try {
        if (typeof window !== 'undefined') {
          const searchParams = new URLSearchParams(window.location.search);
          const code = searchParams.get('code');
          if (code) {
            // Remove code parameter immediately to prevent duplicate exchanges
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.delete('code');
            window.history.replaceState({}, '', newUrl.toString());

            const { data, error } = await supabaseClient.auth.exchangeCodeForSession(code);
            if (!error && data.session) {
              setUser(data.session.user);
              window.history.replaceState({}, document.title, window.location.pathname);
              setLoading(false);
              return;
            }
          }
        }
        const { data: { session } } = await supabaseClient.auth.getSession();
        setUser(session?.user || null);
        
        // Error URL sanitization: If session is valid, clear error parameters
        if (session?.user && typeof window !== 'undefined') {
          if (
            window.location.search.includes('error=') ||
            window.location.search.includes('otp_expired')
          ) {
            window.history.replaceState({}, document.title, window.location.pathname);
          }
        }
      } catch (err) {
        console.error('[Navbar Auth] Error:', err);
      } finally {
        setLoading(false);
      }
    }
    getSession();

    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
        
        // Clean up error/code parameters from browser URL bar after successful auth
        if (
          typeof window !== 'undefined' && (
            window.location.search.includes('code=') || 
            window.location.hash.includes('access_token=') || 
            window.location.search.includes('error=') ||
            window.location.search.includes('otp_expired')
          )
        ) {
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabaseClient.auth.signOut();
    setUser(null);
    setDropdownOpen(false);
  };

  const name = user?.user_metadata?.full_name 
    || user?.user_metadata?.name 
    || user?.email?.split('@')[0] 
    || 'Traveler';

  const avatarUrl = user?.user_metadata?.avatar_url 
    || user?.user_metadata?.picture 
    || '';

  const usernamePrefix = user?.user_metadata?.username 
    || user?.email?.split('@')[0] 
    || 'traveler';

  const userId = user?.id || '';

  const isAdmin = user ? (user.app_metadata?.role === 'admin' || user.user_metadata?.role === 'admin' || user.email === 'founder@layoverx.in') : false;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n.charAt(0))
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  useEffect(() => {
    setMobileMenuOpen(false);
    
    const active = localStorage.getItem('layoverx_dark_mode') === 'true';
    setDarkMode(active);
    if (active) {
      document.body.classList.add('dark-theme-active');
    } else {
      document.body.classList.remove('dark-theme-active');
    }
  }, [pathname]);

  const toggleDarkMode = () => {
    const nextVal = !darkMode;
    setDarkMode(nextVal);
    localStorage.setItem('layoverx_dark_mode', String(nextVal));
    if (nextVal) {
      document.body.classList.add('dark-theme-active');
    } else {
      document.body.classList.remove('dark-theme-active');
    }
  };

  const navLinks = [
    { href: '/hotels', label: 'Hotels' },
    { href: '/restaurants', label: 'Restaurants' },
    { href: '/spa-wellness', label: 'Spa' },
    { href: '/gaming-entertainment', label: 'Gaming' },
    { href: '/experiences', label: 'Tours' },
    { href: '/airport-transfers', label: 'Transfers' },
    { href: '/how-it-works', label: 'How It Works' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-[#E5E7EB] shadow-sm py-2 text-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
              <div className="w-9 h-9 bg-[#0369a1] rounded-lg flex items-center justify-center transition-transform group-hover:scale-105 duration-300 shadow-sm">
                <Plane className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0F172A]">LayoverX</span>
            </Link>
          </div>


          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors duration-200 py-1 ${
                    isActive
                      ? 'text-[#0369a1] border-b-2 border-[#0369a1]'
                      : 'text-[#64748B] hover:text-[#0369a1]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Admin Privileged Links */}
            {isAdmin && (
              <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
                <Link
                  href="/supplier-dashboard"
                  className={`text-xs sm:text-sm font-bold px-3 py-1 rounded-md transition ${
                    pathname === '/supplier-dashboard'
                      ? 'bg-amber-100 text-amber-900'
                      : 'text-amber-700 hover:bg-amber-50'
                  }`}
                >
                  Supplier Hub
                </Link>
                <Link
                  href="/revenue-admin"
                  className={`text-xs sm:text-sm font-bold px-3 py-1 rounded-md transition ${
                    pathname === '/revenue-admin'
                      ? 'bg-purple-100 text-purple-900'
                      : 'text-purple-700 hover:bg-purple-50'
                  }`}
                >
                  Revenue Admin
                </Link>
              </div>
            )}
          </div>

          {/* Right Action Buttons - Single Auth State */}
          <div className="hidden lg:flex items-center gap-3.5">
            <div className="relative">
              <Link
                href="/my-itinerary"
                className={`text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                  pathname === '/my-itinerary' ? 'text-[#0369a1]' : 'text-[#64748B] hover:text-[#0369a1]'
                }`}
              >
                My Itinerary
                {items.length > 0 && (
                  <span className="w-5 h-5 bg-[#0369a1] text-white text-[11px] font-black rounded-full flex items-center justify-center animate-pulse">
                    {items.length}
                  </span>
                )}
              </Link>

              {/* Toast Pop-Up Notification originating from My Itinerary navbar node */}
              {toast && (
                <div
                  className={`absolute top-10 right-0 z-[2000] min-w-[280px] max-w-xs p-3.5 rounded-2xl shadow-2xl border text-xs font-bold transition-all duration-300 transform translate-y-0 ${
                    toast.type === 'warning'
                      ? 'bg-amber-950 text-amber-100 border-amber-500/50'
                      : toast.type === 'info'
                      ? 'bg-slate-900 text-slate-100 border-slate-700'
                      : 'bg-emerald-950 text-emerald-100 border-emerald-500/50'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {toast.type === 'warning' ? (
                      <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    )}
                    <span className="leading-snug">{toast.message}</span>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/plan-my-layover"
              className="px-4 py-2 bg-[#0369a1] hover:bg-[#075985] text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-sm"
            >
              Plan My Layover
            </Link>

            {/* Dynamic Auth State: Logged In (Avatar/Profile) vs Loading vs Logged Out */}
            {loading ? (
              <div className="flex items-center gap-2 border border-slate-200 bg-slate-100 px-3.5 py-1.5 rounded-full animate-pulse">
                <div className="w-6 h-6 rounded-full bg-slate-300 flex-shrink-0" />
                <div className="w-20 h-3 bg-slate-300 rounded-full" />
              </div>
            ) : user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 border border-slate-200 bg-white px-3.5 py-1.5 rounded-full hover:bg-slate-50 transition shadow-sm"
                >
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={name}
                      className="w-6 h-6 rounded-full object-cover flex-shrink-0 shadow-sm border border-slate-200"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-extrabold text-[11px] uppercase flex-shrink-0 shadow-sm border border-sky-200">
                      {getInitials(name)}
                    </div>
                  )}
                  <span className="text-xs sm:text-sm font-bold text-[#0F172A] truncate max-w-[120px]">
                    {name}
                  </span>
                  <ChevronDown size={14} className="text-slate-400" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-72 bg-white border border-slate-100 rounded-2xl shadow-2xl py-4 px-4 z-[1010] text-slate-800 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                    
                    {/* User Profile Header */}
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                      {avatarUrl ? (
                        <img
                          src={avatarUrl}
                          alt={name}
                          className="w-12 h-12 rounded-full object-cover shadow-sm border border-slate-200 flex-shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-black text-lg uppercase flex-shrink-0 border border-sky-200 shadow-sm">
                          {getInitials(name)}
                        </div>
                      )}
                      <div className="flex flex-col min-w-0">
                        <p className="font-extrabold text-sm text-slate-900 truncate leading-snug">{name}</p>
                        <p className="text-xs text-[#0284C7] font-semibold">@{usernamePrefix}</p>
                      </div>
                    </div>

                    {/* Email Info */}
                    <div className="space-y-1">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Email Address</p>
                      <p className="text-xs font-semibold text-slate-700 truncate">{user.email}</p>
                    </div>



                    {/* Action Links */}
                    <div className="flex flex-col gap-1 border-t border-slate-100 pt-3">
                      <Link
                        href="/my-itinerary"
                        className="flex items-center gap-2.5 px-3 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-sky-50 hover:text-[#0284C7] rounded-xl transition"
                      >
                        <Calendar size={16} /> My Layover Itinerary
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left flex items-center gap-2.5 px-3 py-2 text-xs sm:text-sm font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition border-t border-slate-50 mt-1"
                      >
                        <LogOut size={16} /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-4 py-2 bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-sm"
                >
                  Sign In / Register
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="lg:hidden p-2 text-slate-700 hover:text-slate-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 py-4 px-2 space-y-2 rounded-b-2xl shadow-xl mt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-2.5 text-base font-semibold rounded-xl ${
                  pathname === link.href ? 'bg-sky-50 text-[#0369a1]' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {isAdmin && (
              <div className="pt-2 border-t border-slate-100">
                <p className="px-4 text-xs uppercase font-bold text-amber-600 mb-1">Admin Links</p>
                <Link href="/supplier-dashboard" className="block px-4 py-2 text-sm font-bold text-slate-700 hover:text-[#0369a1]">
                  Supplier Hub
                </Link>
                <Link href="/revenue-admin" className="block px-4 py-2 text-sm font-bold text-slate-700 hover:text-[#0369a1]">
                  Revenue Admin
                </Link>
              </div>
            )}

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2 px-2">
              <Link
                href="/plan-my-layover"
                className="w-full text-center py-3 bg-[#0369a1] text-white font-bold text-sm rounded-xl"
              >
                Plan My Layover
              </Link>
              {loading ? (
                <div className="flex items-center gap-2 border border-slate-200 bg-slate-100 px-4 py-3 rounded-xl animate-pulse">
                  <div className="w-9 h-9 rounded-full bg-slate-300 flex-shrink-0" />
                  <div className="w-24 h-4 bg-slate-300 rounded-full" />
                </div>
              ) : user ? (
                <div className="space-y-3 p-2 bg-slate-50 border border-slate-100 rounded-2xl">
                  
                  {/* Profile Header */}
                  <div className="flex items-center gap-3 px-2 py-1">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt={name}
                        className="w-10 h-10 rounded-full object-cover shadow-sm border border-slate-200"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-black text-md uppercase border border-sky-200 shadow-sm">
                        {getInitials(name)}
                      </div>
                    )}
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-extrabold text-[#0F172A] truncate">
                        {name}
                      </span>
                      <span className="text-[10px] text-[#0284C7] font-bold truncate">
                        @{usernamePrefix}
                      </span>
                    </div>
                  </div>

                  {/* Email Info */}
                  <div className="px-2">
                    <p className="text-[11px] text-slate-600 truncate">
                      <span className="font-bold text-slate-400 text-[9px] uppercase tracking-wider">Email:</span> {user.email}
                    </p>
                  </div>

                  {/* Action Links */}
                  <div className="space-y-1 pt-1.5 border-t border-slate-200/60">
                    <Link
                      href="/my-itinerary"
                      className="block w-full text-center py-2.5 bg-sky-50 text-[#0284C7] font-bold text-xs rounded-xl border border-sky-100"
                    >
                      My Layover Itinerary
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-center py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl border border-rose-200 transition"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="py-2.5 bg-slate-100 text-slate-700 text-sm font-bold rounded-xl border border-slate-200"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="py-2.5 bg-[#0F172A] text-white text-sm font-bold rounded-xl"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {mounted && createPortal(
        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />,
        document.body
      )}
    </nav>
  );
};
