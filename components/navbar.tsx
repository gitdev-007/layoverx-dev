'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { useItinerary } from '@/context/itinerary-context';
import { createClient } from '@/lib/supabase/client';
import { getUserHandle } from '@/lib/utils';
import {
  Menu,
  X,
  Calendar,
  Shield,
  Plane,
  Sun,
  Moon,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { isAdmin } = useAuth();
  const { items, toast } = useItinerary();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

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

            {/* Login and signup functionality removed */}
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
              <Link
                href="/my-itinerary"
                className="block w-full text-center py-3 bg-sky-50 text-[#0369a1] font-bold text-sm rounded-xl border border-sky-100 hover:bg-sky-100 transition"
              >
                My Itinerary {items.length > 0 && `(${items.length})`}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
