'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand & Overview */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block group">
              <span className="text-2xl font-extrabold tracking-tight text-white">LayoverX</span>
            </Link>
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              The ultimate Mumbai CSMIA Airport transit experience platform. Book micro-stay hotel pods, authentic dining, express spas, private chauffeurs, and verified city tours designed specifically for flight stopovers.
            </p>
          </div>

          {/* Micro-Services */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-100 mb-4">
              Micro-Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/hotels" className="hover:text-sky-400 transition">
                  Transit Hotels &amp; Pods
                </Link>
              </li>
              <li>
                <Link href="/restaurants" className="hover:text-sky-400 transition">
                  Airport Dining &amp; Trails
                </Link>
              </li>
              <li>
                <Link href="/spa-wellness" className="hover:text-sky-400 transition">
                  Spa &amp; Rejuvenation
                </Link>
              </li>
              <li>
                <Link href="/gaming-entertainment" className="hover:text-sky-400 transition">
                  Gaming &amp; Lounges
                </Link>
              </li>
              <li>
                <Link href="/experiences" className="hover:text-sky-400 transition">
                  City Sightseeing Tours
                </Link>
              </li>
              <li>
                <Link href="/airport-transfers" className="hover:text-sky-400 transition">
                  Fixed-Rate Airport Cabs
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick & Legal Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-100 mb-4">
              Legal &amp; Policy
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/terms" className="hover:text-sky-400 transition">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-sky-400 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="hover:text-sky-400 transition">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-sky-400 transition">
                  Cancellation &amp; Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-sky-400 transition">
                  Contact Us &amp; Grievance
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-sky-400 transition">
                  Transit Visa &amp; Exit FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Airport Contact (Fixed Phone Link) */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-100 mb-4">
              Airport Concierge
            </h4>
            <div className="space-y-3.5 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <span>CSMIA Terminal 2, Exit Gate 2 Arrivals, Sahar, Mumbai 400099</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <a href="tel:+9102249001234" className="hover:text-sky-400 transition font-mono font-bold">
                  +91 022 4900-1234
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <a href="mailto:support@layoverx.com" className="hover:text-sky-400 transition">
                  support@layoverx.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
