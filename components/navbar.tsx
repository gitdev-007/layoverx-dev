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

            {/* Admin Toggle Badge for QA */}
            <button
              onClick={() => setIsAdmin(!isAdmin)}
              className={`hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold border transition-all ${
                isAdmin
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
              title="Toggle Admin Privilege Guard"
            >
              <Shield size={13} />
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
            <Link
              href="/my-itinerary"
              className={`text-sm font-semibold transition-colors ${
                pathname === '/my-itinerary' ? 'text-[#0369a1]' : 'text-[#64748B] hover:text-[#0369a1]'
              }`}
            >
              My Itinerary
            </Link>

            <Link
              href="/plan-my-layover"
              className="px-4 py-2 bg-[#0369a1] hover:bg-[#075985] text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-sm"
            >
              Plan My Layover
            </Link>

            {/* Clean Auth Switch: Either Logged In OR Logged Out */}
            {user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 border border-slate-200 bg-white px-3.5 py-1.5 rounded-full hover:bg-slate-50 transition shadow-sm"
                >
                  <div className="relative w-6 h-6 rounded-full overflow-hidden flex-shrink-0 border border-slate-200">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80" 
                      alt="Traveler Profile Avatar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-[#0F172A] truncate max-w-[120px]">
                    {user.name}
                  </span>
                  <ChevronDown size={14} className="text-slate-400" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 z-[1010] text-slate-800">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Signed in as</p>
                      <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">{user.email}</p>
                    </div>
                    <Link
                      href="/my-profile"
                      className="flex items-center gap-2.5 px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      <User size={16} /> My Profile
                    </Link>
                    <Link
                      href="/my-trips"
                      className="flex items-center gap-2.5 px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      <Calendar size={16} /> My Trips
                    </Link>
                    <Link
                      href="/saved-itineraries"
                      className="flex items-center gap-2.5 px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      <Heart size={16} /> Saved Itineraries
                    </Link>
                    <Link
                      href="/account-settings"
                      className="flex items-center gap-2.5 px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      <Settings size={16} /> Account Settings
                    </Link>
                    {isAdmin && (
                      <Link
                        href="/revenue-admin"
                        className="flex items-center gap-2.5 px-4 py-2 text-xs sm:text-sm font-bold text-[#0369a1] hover:bg-slate-50"
                      >
                        <Shield size={16} /> Admin Portal
                      </Link>
                    )}
                    <button
                      onClick={signOut}
                      className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-xs sm:text-sm font-semibold text-rose-600 hover:bg-rose-50 border-t border-slate-100 mt-1"
                    >
                      <LogOut size={16} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
                <button
                  onClick={() => openAuthModal('login')}
                  className="text-xs sm:text-sm font-bold text-[#64748B] hover:text-[#0369a1] px-2.5 py-1.5"
                >
                  Log In
                </button>
                <button
                  onClick={() => openAuthModal('signup')}
                  className="px-4 py-2 bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl transition"
                >
                  Sign Up
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
              {user ? (
                <button
                  onClick={signOut}
                  className="w-full text-center py-2.5 bg-rose-50 text-rose-700 font-bold text-sm rounded-xl border border-rose-200"
                >
                  Sign Out ({user.name})
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => openAuthModal('login')}
                    className="py-2.5 bg-slate-100 text-slate-700 text-sm font-bold rounded-xl border border-slate-200"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => openAuthModal('signup')}
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
    </nav>
  );
};
