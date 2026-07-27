'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import {
  Menu,
  X,
  User,
  LogOut,
  Heart,
  Calendar,
  Settings,
  Shield,
  Plane,
  ChevronDown,
  LayoutDashboard,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { user, isAdmin, setIsAdmin, signOut, openAuthModal } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

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
    <nav className="sticky top-0 left-0 right-0 z-[1000] transition-all duration-300 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-lg text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Admin Mode Switch */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
              <div className="w-9 h-9 bg-sky-500 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 duration-300 shadow-md shadow-sky-500/20">
                <Plane className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">LayoverX</span>
            </Link>

            {/* Admin Toggle Badge for QA */}
            <button
              onClick={() => setIsAdmin(!isAdmin)}
              className={`hidden md:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border transition-all ${
                isAdmin
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
              title="Toggle Admin Privilege Guard"
            >
              <Shield size={12} />
              {isAdmin ? 'Admin Mode ON' : 'Traveler Mode'}
            </button>
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
                      ? 'text-sky-400 border-b-2 border-sky-400'
                      : 'text-slate-300 hover:text-sky-400'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Admin Privileged Links */}
            {isAdmin && (
              <div className="flex items-center gap-4 border-l border-slate-800 pl-4">
                <Link
                  href="/supplier-dashboard"
                  className={`text-xs font-bold px-2 py-1 rounded-md transition ${
                    pathname === '/supplier-dashboard'
                      ? 'bg-amber-500/20 text-amber-300'
                      : 'text-amber-400 hover:bg-amber-500/10'
                  }`}
                >
                  Supplier Hub
                </Link>
                <Link
                  href="/revenue-admin"
                  className={`text-xs font-bold px-2 py-1 rounded-md transition ${
                    pathname === '/revenue-admin'
                      ? 'bg-purple-500/20 text-purple-300'
                      : 'text-purple-400 hover:bg-purple-500/10'
                  }`}
                >
                  Revenue Admin
                </Link>
              </div>
            )}
          </div>

          {/* Right Action Buttons - Single Auth State */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/my-itinerary"
              className={`text-sm font-semibold transition-colors ${
                pathname === '/my-itinerary' ? 'text-sky-400' : 'text-slate-300 hover:text-white'
              }`}
            >
              My Itinerary
            </Link>

            <Link
              href="/plan-my-layover"
              className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs rounded-xl transition shadow-md shadow-sky-500/20"
            >
              Plan My Layover
            </Link>

            {/* Clean Auth Switch: Either Logged In OR Logged Out */}
            {user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 border border-slate-700 bg-slate-800 px-3 py-1.5 rounded-full hover:bg-slate-700 transition"
                >
                  <div className="w-6 h-6 bg-sky-500 text-white rounded-full flex items-center justify-center text-xs font-bold uppercase">
                    {user.email[0]}
                  </div>
                  <span className="text-xs font-bold text-slate-200 truncate max-w-[110px]">
                    {user.name}
                  </span>
                  <ChevronDown size={14} className="text-slate-400" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl py-2 z-[1010] text-slate-200">
                    <div className="px-4 py-2 border-b border-slate-800">
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Signed in as</p>
                      <p className="text-xs font-bold text-white truncate">{user.email}</p>
                    </div>
                    <Link
                      href="/my-itinerary"
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium hover:bg-slate-800 hover:text-sky-400"
                    >
                      <Calendar size={15} /> Saved Trips
                    </Link>
                    <Link
                      href="/contact"
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium hover:bg-slate-800 hover:text-sky-400"
                    >
                      <Settings size={15} /> Support & Contact
                    </Link>
                    {isAdmin && (
                      <Link
                        href="/revenue-admin"
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-amber-400 hover:bg-slate-800"
                      >
                        <Shield size={15} /> Admin Portal
                      </Link>
                    )}
                    <button
                      onClick={signOut}
                      className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-950/40 border-t border-slate-800 mt-1"
                    >
                      <LogOut size={15} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 border-l border-slate-800 pl-3">
                <button
                  onClick={() => openAuthModal('login')}
                  className="text-xs font-bold text-slate-300 hover:text-white px-2 py-1.5"
                >
                  Log In
                </button>
                <button
                  onClick={() => openAuthModal('signup')}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-sky-400 font-bold text-xs rounded-xl border border-slate-700 transition"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="lg:hidden p-2 text-slate-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-900 border-t border-slate-800 py-4 px-2 space-y-2 rounded-b-2xl shadow-xl">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-2.5 text-sm font-semibold rounded-xl ${
                  pathname === link.href ? 'bg-sky-500/20 text-sky-400' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {isAdmin && (
              <div className="pt-2 border-t border-slate-800">
                <p className="px-4 text-[10px] uppercase font-bold text-amber-400 mb-1">Admin Links</p>
                <Link href="/supplier-dashboard" className="block px-4 py-2 text-xs font-bold text-slate-300 hover:text-amber-300">
                  Supplier Hub
                </Link>
                <Link href="/revenue-admin" className="block px-4 py-2 text-xs font-bold text-slate-300 hover:text-purple-300">
                  Revenue Admin
                </Link>
              </div>
            )}

            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2 px-2">
              <Link
                href="/plan-my-layover"
                className="w-full text-center py-2.5 bg-sky-500 text-white font-bold text-xs rounded-xl"
              >
                Plan My Layover
              </Link>
              {user ? (
                <button
                  onClick={signOut}
                  className="w-full text-center py-2 bg-rose-950/40 text-rose-300 font-bold text-xs rounded-xl border border-rose-800/40"
                >
                  Sign Out ({user.name})
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => openAuthModal('login')}
                    className="py-2 bg-slate-800 text-slate-200 text-xs font-bold rounded-xl border border-slate-700"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => openAuthModal('signup')}
                    className="py-2 bg-sky-600 text-white text-xs font-bold rounded-xl"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
