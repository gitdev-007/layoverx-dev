'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, MessageSquare, ShieldCheck, Plane, FileText } from 'lucide-react';

interface BookingData {
  id: string;
  user_phone: string;
  ticket_file_path: string;
  extracted_pnr: string | null;
  extracted_inbound_flight: string | null;
  extracted_outbound_flight: string | null;
  dpdp_consented: boolean;
  payment_status: string;
  payment_id?: string;
  amount: number;
  currency: string;
  created_at: string;
}

function BookingConfirmationContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!bookingId) {
      setError('No booking ID provided in the URL.');
      setLoading(false);
      return;
    }

    async function fetchBookingDetails() {
      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://layoverx-dev.onrender.com';
        const targetUrl = apiBaseUrl.endsWith('/api/v1') 
          ? `${apiBaseUrl}/booking/${bookingId}` 
          : `${apiBaseUrl.replace(/\/$/, '')}/api/v1/booking/${bookingId}`;

        const res = await fetch(targetUrl);
        if (!res.ok) throw new Error('Failed to fetch booking details.');
        const json = await res.json();
        if (json.success && json.booking) {
          setBooking(json.booking);
        } else {
          throw new Error('Invalid response structure from backend.');
        }
      } catch (err: any) {
        console.error('Error fetching confirmation booking:', err);
        setError(err.message || 'An error occurred while loading your digital pass.');
      } finally {
        setLoading(false);
      }
    }

    fetchBookingDetails();
  }, [bookingId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-sky-600 border-t-transparent"></div>
        <p className="text-sm font-medium text-slate-500">Generating your digital layover pass...</p>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="max-w-md mx-auto my-12 bg-white border border-rose-200 rounded-2xl p-8 text-center shadow-sm">
        <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4 text-rose-600">
          ⚠️
        </div>
        <h1 className="text-lg font-bold text-slate-900 mb-2">Failed to load booking pass</h1>
        <p className="text-sm text-slate-500 mb-6">{error || 'Booking details could not be found.'}</p>
        <Link
          href="/plan-my-layover"
          className="inline-flex items-center justify-center px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl text-sm transition-all"
        >
          Return to Layover Calculator
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto my-8 px-4 sm:px-6">
      
      {/* SUCCESS CONFIRMATION HEADER */}
      <div className="text-center space-y-4 mb-8">
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600 border border-emerald-100 shadow-sm animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-1">
          <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
            Payment Confirmed
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 pt-2">
            🎉 Layover Booking Confirmed!
          </h1>
          <p className="text-sm text-slate-500">
            Your premium transit package is active. Check WhatsApp for coordination.
          </p>
        </div>
      </div>

      {/* DIGITAL TRANSIT PASS CONTAINER */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden divide-y divide-dashed divide-slate-200 relative">
        {/* Curved punches to make it look like a physical ticket */}
        <div className="absolute left-[-10px] top-[140px] w-5 h-5 bg-[#F8FAFC] border-r border-slate-200 rounded-full z-10 hidden sm:block"></div>
        <div className="absolute right-[-10px] top-[140px] w-5 h-5 bg-[#F8FAFC] border-l border-slate-200 rounded-full z-10 hidden sm:block"></div>

        {/* SECTION 1: PASSENGER & TELEMETRY HEADER */}
        <div className="p-6 sm:p-8 bg-sky-50/50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">DIGITAL PASS ID</p>
              <p className="text-sm font-mono font-bold text-slate-900">{booking.id}</p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">CONTACT PHONE</p>
              <p className="text-sm font-semibold text-slate-800">{booking.user_phone}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-6 pt-6 border-t border-slate-200/60">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">PNR Reference</span>
              <span className="text-base font-black text-slate-800 font-mono">{booking.extracted_pnr || 'N/A'}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Inbound Flight</span>
              <span className="text-sm font-semibold text-slate-800 flex items-center gap-1">
                <Plane className="w-3.5 h-3.5 text-sky-600 rotate-90" />
                {booking.extracted_inbound_flight || 'N/A'}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Outbound Flight</span>
              <span className="text-sm font-semibold text-slate-800 flex items-center gap-1">
                <Plane className="w-3.5 h-3.5 text-sky-600" />
                {booking.extracted_outbound_flight || 'N/A'}
              </span>
            </div>
          </div>
        </div>

        {/* SECTION 2: CHAUFFEUR & INSTRUCTIONS */}
        <div className="p-6 sm:p-8 space-y-6">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">ARRIVAL &amp; CHAUFFEUR DETAILS</h3>
          
          <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 flex items-start gap-4">
            <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center shrink-0 text-sky-700">
              📍
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-800">CSMIA Terminal 2 Exit Gate 2 Pickup</p>
              <p className="text-xs text-slate-500 leading-relaxed">
                Walk out of arrivals hall and proceed directly to exit gate 2. Your designated chauffeur will be waiting holding a custom signboard.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 flex items-start gap-4">
            <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center shrink-0 text-sky-700">
              💬
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-800">WhatsApp Dispatch Synchronization</p>
              <p className="text-xs text-slate-500 leading-relaxed">
                Driver assignments, real-time license plate updates, and active flight tracking alerts are pushed live via WhatsApp 45 minutes prior to touchdown.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 3: PRICING & PAYMENT */}
        <div className="p-6 sm:p-8 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">TRANSACTION ID</p>
            <p className="text-xs font-mono font-bold text-slate-700">{booking.payment_id || 'N/A'}</p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">TOTAL PAID</p>
            <p className="text-lg font-black text-slate-900">
              {booking.currency} {booking.amount.toLocaleString()}
            </p>
          </div>
        </div>

        {/* SECTION 4: SECURITY & RETENTION POLICIES */}
        <div className="p-6 sm:p-8">
          <div className="bg-emerald-50/80 border border-emerald-100 rounded-2xl p-4 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-xs font-bold text-emerald-900">🔒 Document Security &amp; Auto-Deletion Policy</p>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                In strict compliance with modern privacy guidelines, your uploaded e-ticket is encrypted inside our private secure bucket. The document and OCR raw records are scheduled for automatic, permanent deletion in 48 hours.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CALL TO ACTION BUTTONS */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="https://wa.me/9198946956006"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.01] text-sm cursor-pointer"
        >
          <MessageSquare className="w-4 h-4 fill-white" />
          Open WhatsApp Chauffeur Support
        </a>
        <Link
          href="/my-itinerary"
          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-2xl shadow-sm transition-all text-sm"
        >
          <FileText className="w-4 h-4" />
          View Active Itinerary
        </Link>
      </div>

    </div>
  );
}

export default function BookingConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-sky-600 border-t-transparent"></div>
        <p className="text-sm font-medium text-slate-500">Loading your transit pass...</p>
      </div>
    }>
      <BookingConfirmationContent />
    </Suspense>
  );
}
