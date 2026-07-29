'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  Calendar, 
  Clock, 
  MapPin, 
  Plane, 
  ShieldCheck, 
  AlertCircle,
  RefreshCw,
  Home
} from 'lucide-react';

interface BookingData {
  bookingId: string;
  leadPassengerName: string;
  flightIn: string;
  arrivalTime: string;
  departureTime: string;
  totalPrice: number;
}

export default function ConfirmationPage() {
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [flightNumber, setFlightNumber] = useState('');
  const [flightDate, setFlightDate] = useState('');
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [trackingResult, setTrackingResult] = useState<any>(null);
  const [trackingError, setTrackingError] = useState<string | null>(null);

  const [reminderType, setReminderType] = useState<'sms' | 'email'>('email');
  const [reminderInput, setReminderInput] = useState('');
  const [reminderStatus, setReminderStatus] = useState<string | null>(null);

  const handleSetReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reminderInput.trim()) {
      setReminderStatus('Please enter details.');
      return;
    }
    setReminderStatus(`Active alerts set for ${reminderInput.trim()}!`);
    setTimeout(() => setReminderStatus(null), 4000);
  };

  const handleExportICS = () => {
    if (!booking) return;
    
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//LayoverX//Mumbai Transit Platform//EN',
      'BEGIN:VEVENT',
      `UID:${booking.bookingId}@layoverx.dev`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTSTART:${new Date(booking.arrivalTime).toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTEND:${new Date(booking.departureTime).toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `SUMMARY:LayoverX stopover booking: ${booking.bookingId}`,
      `DESCRIPTION:Your LayoverX Mumbai Airport stopover bookings are active. Lead traveler: ${booking.leadPassengerName}. Flight: ${booking.flightIn}`,
      'LOCATION:Mumbai CSM International Airport (BOM) Terminal 2',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `layoverx-booking-${booking.bookingId}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadTicketSlip = () => {
    if (!booking) return;

    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 600, 400);

    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 6;
    ctx.strokeRect(10, 10, 580, 380);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText('LAYOVERX BOARDING PASS', 40, 60);

    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(40, 80);
    ctx.lineTo(560, 80);
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px monospace';
    ctx.fillText('BOOKING ID:', 40, 120);
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 18px monospace';
    ctx.fillText(booking.bookingId, 160, 120);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px sans-serif';
    ctx.fillText('PASSENGER:', 40, 170);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText(booking.leadPassengerName, 160, 170);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px sans-serif';
    ctx.fillText('FLIGHT IN:', 40, 220);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText(booking.flightIn, 160, 220);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px sans-serif';
    ctx.fillText('ARRIVAL:', 40, 270);
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px sans-serif';
    ctx.fillText(new Date(booking.arrivalTime).toLocaleString(), 160, 270);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px sans-serif';
    ctx.fillText('DEPARTURE:', 40, 320);
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px sans-serif';
    ctx.fillText(new Date(booking.departureTime).toLocaleString(), 160, 320);

    ctx.fillStyle = '#0284c7';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText('MUMBAI CSMIA TRANSIT ZONE • FLAT-RATE CAB CHARGES INCLUDED', 40, 370);

    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = `layoverx-boarding-pass-${booking.bookingId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStayHours = () => {
    if (!booking) return '8.0 Hours';
    const arr = new Date(booking.arrivalTime);
    const dep = new Date(booking.departureTime);
    const diff = dep.getTime() - arr.getTime();
    if (diff > 0) {
      return `${(diff / (1000 * 60 * 60)).toFixed(1)} Hours`;
    }
    return '8.0 Hours';
  };

  useEffect(() => {
    // Retrieve dynamic draft details from localStorage
    const saved = localStorage.getItem('layoverx_draft');
    if (saved) {
      try {
        const draft = JSON.parse(saved);
        setBooking({
          bookingId: `bk_${Math.floor(100000 + Math.random() * 900000)}`,
          leadPassengerName: draft.leadPassengerName || 'Guest Traveler',
          flightIn: draft.flightIn || 'EK-504',
          arrivalTime: draft.arrivalTime || new Date().toISOString(),
          departureTime: draft.departureTime || new Date().toISOString(),
          totalPrice: draft.totalPrice || 4798,
        });
        setFlightNumber(draft.flightIn || 'EK-504');
        setFlightDate(new Date(draft.arrivalTime || Date.now()).toISOString().split('T')[0]);
      } catch (e) {
        console.warn('Failed to load draft details on confirmation page:', e);
      }
    }
  }, []);

  const handleTrackFlight = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!flightNumber.trim() || !flightDate.trim()) {
      setTrackingError('Flight number and date are required.');
      return;
    }

    setTrackingLoading(true);
    setTrackingError(null);
    setTrackingResult(null);

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
      const response = await fetch(`${apiBase}/api/v1/flight/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          flightNumber: flightNumber.trim(),
          flightDate: flightDate.trim(),
          bookingId: booking?.bookingId,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.status === 'error') {
        setTrackingError(data.message || 'Failed to track flight status.');
      } else {
        setTrackingResult(data.flight);
      }
    } catch (err: any) {
      setTrackingError('Unable to connect to flight tracking server.');
      console.error('[FLIGHT TRACK CLIENT ERROR]', err);
    } finally {
      setTrackingLoading(false);
    }
  };

  if (!booking) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center space-y-4">
        <AlertCircle className="w-12 h-12 text-sky-400 animate-pulse" />
        <p className="text-sm font-semibold">Loading confirmation details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 bg-slate-950 text-slate-100">
      
      {/* HEADER HERO */}
      <section className="theme-hero py-16 text-center border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 mb-2">
            <CheckCircle2 size={40} className="stroke-[2]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Stopover Booking Confirmed!
          </h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Your booking credentials have been synchronized successfully. Check-in guidelines have been dispatched to your registered email.
          </p>
        </div>
      </section>

      {/* WORKSPACE DETAIL CARDS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* LEFT COLUMN: Booking Metadata */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6 shadow-xl">
            <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
              Reservation Summary
            </h2>

            <div className="space-y-4 text-xs">
              <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400">Booking ID:</span>
                <strong className="text-white text-sm font-mono">{booking.bookingId}</strong>
              </div>

              <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400">Lead Passenger:</span>
                <strong className="text-white text-sm">{booking.leadPassengerName}</strong>
              </div>

              <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400">Arrival Flight:</span>
                <strong className="text-white text-sm flex items-center gap-1">
                  <Plane size={12} className="text-sky-400" /> {booking.flightIn}
                </strong>
              </div>

              <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400">Arrival Time:</span>
                <strong className="text-white text-sm">
                  {new Date(booking.arrivalTime).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                </strong>
              </div>

              <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400">Departure Time:</span>
                <strong className="text-white text-sm">
                  {new Date(booking.departureTime).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                </strong>
              </div>

              <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400">Total Price Paid:</span>
                <strong className="text-sky-400 text-sm font-extrabold">₹{booking.totalPrice.toLocaleString()}</strong>
              </div>
            </div>

            {/* Total Stay Elapsed Progress Indicator */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-300">
                <span className="font-bold">Total Transit Elapsed</span>
                <span className="font-semibold text-sky-400">{getStayHours()}</span>
              </div>
              <div className="relative w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div className="absolute top-0 left-0 h-full bg-sky-500 rounded-full w-[65%]"></div>
              </div>
              <div className="flex justify-between text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                <span>0h Checked-in</span>
                <span>{getStayHours()} Check-out</span>
              </div>
            </div>

            {/* Reminder Alert subscription */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs print:hidden">
              <div className="font-bold text-slate-200">⏰ Check-out Alert Reminders</div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => { setReminderType('email'); setReminderInput(''); }}
                  className={`px-3 py-1 rounded-lg font-bold border transition ${reminderType === 'email' ? 'bg-sky-500/10 border-sky-400 text-sky-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                >
                  Email
                </button>
                <button
                  type="button"
                  onClick={() => { setReminderType('sms'); setReminderInput(''); }}
                  className={`px-3 py-1 rounded-lg font-bold border transition ${reminderType === 'sms' ? 'bg-sky-500/10 border-sky-400 text-sky-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                >
                  SMS
                </button>
              </div>
              <form onSubmit={handleSetReminder} className="flex gap-2">
                <input
                  type={reminderType === 'email' ? 'email' : 'tel'}
                  value={reminderInput}
                  onChange={(e) => setReminderInput(e.target.value)}
                  placeholder={reminderType === 'email' ? 'passenger@travel.com' : '+1-xxx-xxx-xxxx'}
                  className="flex-grow bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-sky-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-lg transition"
                >
                  Set
                </button>
              </form>
              {reminderStatus && (
                <div className="text-[10px] font-bold text-emerald-400">
                  {reminderStatus}
                </div>
              )}
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button 
                onClick={() => window.print()}
                type="button"
                className="w-full py-3.5 bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-md shadow-sky-500/20 print:hidden"
              >
                🖨️ Export / Print Pass
              </button>
              <button 
                onClick={handleDownloadTicketSlip}
                type="button"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 print:hidden"
              >
                🎟️ Download Boarding Pass (.png)
              </button>
              <button 
                onClick={handleExportICS}
                type="button"
                className="w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 border border-slate-700 print:hidden"
              >
                📅 Add to Calendar (.ics)
              </button>
              <Link 
                href="/" 
                className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 border border-slate-700 print:hidden"
              >
                <Home size={14} /> Back to Homepage
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: Real-time Flight Tracker Widget */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6 shadow-xl">
            <div>
              <h2 className="text-lg font-bold text-white">Live Flight Tracker</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Check incoming flight delays and verify active slot protection.
              </p>
            </div>

            <form onSubmit={handleTrackFlight} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1.5 tracking-wider">
                  Flight Number
                </label>
                <input 
                  type="text" 
                  value={flightNumber}
                  onChange={(e) => setFlightNumber(e.target.value)}
                  placeholder="e.g. EK-504"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                />
                <div className="flex gap-1.5 mt-1.5 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setFlightNumber('EK-504')}
                    className="px-2 py-0.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded text-[10px] transition"
                  >
                    Emirates EK-504
                  </button>
                  <button
                    type="button"
                    onClick={() => setFlightNumber('AI-102')}
                    className="px-2 py-0.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded text-[10px] transition"
                  >
                    Air India AI-102
                  </button>
                  <button
                    type="button"
                    onClick={() => setFlightNumber('DELAY-6E-213')}
                    className="px-2 py-0.5 bg-slate-900 border border-slate-800 text-amber-500 hover:text-amber-400 rounded text-[10px] transition font-bold"
                  >
                    Test Delay (DELAY-6E)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1.5 tracking-wider">
                  Flight Date
                </label>
                <input 
                  type="date" 
                  value={flightDate}
                  onChange={(e) => setFlightDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                />
                <div className="flex gap-1.5 mt-1.5 flex-wrap">
                  <button
                    type="button"
                    onClick={() => {
                      const today = new Date().toISOString().split('T')[0];
                      setFlightDate(today);
                    }}
                    className="px-2 py-0.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded text-[10px] transition"
                  >
                    Today
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const tomorrow = new Date(Date.now() + 24*60*60*1000).toISOString().split('T')[0];
                      setFlightDate(tomorrow);
                    }}
                    className="px-2 py-0.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded text-[10px] transition"
                  >
                    Tomorrow
                  </button>
                </div>
              </div>

              <button 
                type="submit"
                disabled={trackingLoading}
                className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {trackingLoading ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" /> Querying API...
                  </>
                ) : (
                  <>
                    <Plane size={14} /> Track & Protect
                  </>
                )}
              </button>
            </form>

            {/* Skeleton Loading Card */}
            {trackingLoading && (
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-4 animate-pulse">
                <div className="flex justify-between items-center pb-2 border-b border-slate-900">
                  <div className="h-3 w-20 bg-slate-800 rounded"></div>
                  <div className="h-3 w-16 bg-slate-800 rounded"></div>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-900">
                  <div className="h-3 w-12 bg-slate-800 rounded"></div>
                  <div className="h-3 w-10 bg-slate-800 rounded"></div>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-900">
                  <div className="h-3 w-24 bg-slate-800 rounded"></div>
                  <div className="h-3 w-12 bg-slate-800 rounded"></div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="h-3 w-24 bg-slate-800 rounded mx-auto"></div>
                </div>
              </div>
            )}

            {/* Error Overlay */}
            {trackingError && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle size={14} /> {trackingError}
              </div>
            )}

            {/* Result Details */}
            {trackingResult && (
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3 text-xs">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Flight Status:</span>
                  <span className={`font-bold ${trackingResult.status === 'DELAYED' ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {trackingResult.status}
                  </span>
                </div>

                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Delay:</span>
                  <span className="font-bold text-white">{trackingResult.delayMinutes} mins</span>
                </div>

                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Original ETA:</span>
                  <span className="font-bold text-white">{trackingResult.originalETA}</span>
                </div>

                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Updated ETA:</span>
                  <span className="font-bold text-white">{trackingResult.updatedETA}</span>
                </div>

                {trackingResult.slotProtectionApplied && (
                  <div className="pt-2 text-emerald-400 font-bold flex items-center gap-1.5 justify-center">
                    <ShieldCheck size={16} /> Auto Delay Protection Applied!
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </section>
      
    </div>
  );
}
