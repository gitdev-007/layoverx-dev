'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  QrCode, 
  ShieldCheck, 
  AlertTriangle, 
  XCircle, 
  CheckCircle2, 
  Search, 
  RefreshCw, 
  Camera, 
  Lock, 
  User, 
  Plane, 
  FileText, 
  Clock,
  Sparkles
} from 'lucide-react';
import { verifyVoucher, VerifyVoucherResponse } from '@/lib/api';

export default function GroundStaffScannerPage() {
  const [tokenInput, setTokenInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerifyVoucherResponse | null>(null);
  const [cameraActive, setCameraActive] = useState(true);
  const [scanHistory, setScanHistory] = useState<VerifyVoucherResponse[]>([]);

  const handleVerify = async (queryInput?: string) => {
    const target = (queryInput || tokenInput).trim();
    if (!target) return;

    setLoading(true);
    setResult(null);

    try {
      let res: VerifyVoucherResponse;
      if (target.startsWith('{')) {
        res = await verifyVoucher({ qrData: target });
      } else {
        res = await verifyVoucher({ token: target.toUpperCase() });
      }

      setResult(res);
      setScanHistory((prev) => [res, ...prev.slice(0, 4)]);
    } catch (err: any) {
      setResult({
        status: 'error',
        code: 'SERVER_ERROR',
        message: err.message || 'Unable to connect to verification server.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleQuickTest = (token: string) => {
    setTokenInput(token);
    handleVerify(token);
  };

  const resetScanner = () => {
    setResult(null);
    setTokenInput('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-24 font-sans selection:bg-sky-500 selection:text-white">
      
      {/* GROUND OPS TOP HEADER */}
      <header className="bg-slate-900 border-b border-slate-800 py-4 px-4 sm:px-6 sticky top-16 z-30">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/30 text-sky-400 flex items-center justify-center font-bold">
              <QrCode size={22} />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
                Ground Ops Scanner <span className="text-xs font-mono bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded border border-sky-400/30">CSMIA T2</span>
              </h1>
              <p className="text-[11px] text-slate-400">Terminal 2 Exit Gate 2 • Staff Verification Portal</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-mono text-emerald-400 font-bold hidden sm:inline">LIVE DISPATCH ONLINE</span>
          </div>
        </div>
      </header>

      {/* MAIN SCANNER BODY */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 mt-8 space-y-6">
        
        {/* CAMERA FINDER & MANUAL INPUT CONTAINER */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* LEFT: CAMERA & QR SCANNER VIEWPORT */}
          <div className="md:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Camera size={18} className="text-sky-400" />
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">High-Speed QR Camera</h2>
              </div>
              <button
                type="button"
                onClick={() => setCameraActive(!cameraActive)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition border ${cameraActive ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-slate-800 text-slate-400 border-slate-700'}`}
              >
                {cameraActive ? '🟢 Camera Active' : '⚪ Camera Off'}
              </button>
            </div>

            {/* SCANNER CAMERA BOX */}
            <div className="relative w-full aspect-[4/3] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
              {cameraActive ? (
                <>
                  {/* ANIMATED SCAN LASER LINE */}
                  <div className="absolute inset-0 bg-gradient-to-b from-sky-500/10 via-sky-500/20 to-transparent animate-pulse pointer-events-none"></div>
                  <div className="absolute top-0 left-0 right-0 h-1 bg-sky-400 shadow-[0_0_15px_#38bdf8] animate-bounce"></div>

                  {/* CORNER TARGET GUIDES */}
                  <div className="absolute inset-8 border-2 border-dashed border-sky-400/40 rounded-2xl pointer-events-none flex items-center justify-center">
                    <span className="text-[11px] font-mono text-sky-400/70 bg-slate-950/80 px-2 py-1 rounded border border-sky-400/20">
                      ALIGN PASS QR HERE
                    </span>
                  </div>

                  <div className="text-center space-y-2 relative z-10 p-4">
                    <QrCode size={48} className="mx-auto text-sky-400/40 animate-pulse" />
                    <p className="text-xs text-slate-400">Position passenger QR pass in frame</p>
                  </div>
                </>
              ) : (
                <div className="text-center space-y-2 text-slate-500 text-xs">
                  <Camera size={36} className="mx-auto opacity-40" />
                  <p>Camera paused. Use manual token search below.</p>
                </div>
              )}
            </div>

            {/* QUICK PRESET TEST TOKENS FOR GROUND STAFF */}
            <div className="space-y-2 pt-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                ⚡ Quick Staff Test Presets:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickTest('LX-7842')}
                  className="px-2.5 py-2 bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 border border-emerald-800/60 rounded-xl text-xs font-bold transition text-center"
                >
                  🟢 Valid Pass
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickTest('LX-REDEEMED')}
                  className="px-2.5 py-2 bg-amber-950/40 hover:bg-amber-900/50 text-amber-300 border border-amber-800/60 rounded-xl text-xs font-bold transition text-center"
                >
                  🟡 Already Used
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickTest('LX-TAMPER')}
                  className="px-2.5 py-2 bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 border border-rose-800/60 rounded-xl text-xs font-bold transition text-center"
                >
                  🔴 HMAC Tampered
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickTest('LX-INVALID')}
                  className="px-2.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-xl text-xs font-bold transition text-center"
                >
                  ⚪ Invalid Token
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: MANUAL TOKEN FORM & SEARCH */}
          <div className="md:col-span-5 space-y-6">
            
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Manual Token Entry
              </h2>
              <p className="text-xs text-slate-400">
                Type the 6-character backup token (e.g. LX-7842) if QR scan is unavailable.
              </p>

              <form onSubmit={(e) => { e.preventDefault(); handleVerify(); }} className="space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    value={tokenInput}
                    onChange={(e) => setTokenInput(e.target.value)}
                    placeholder="Enter LX-XXXX token"
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3.5 text-sm font-mono text-white focus:outline-none focus:border-sky-500 uppercase tracking-widest font-extrabold"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="absolute right-2 top-2 bottom-2 px-4 bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-white rounded-xl font-bold text-xs transition flex items-center gap-1"
                  >
                    {loading ? <RefreshCw size={14} className="animate-spin" /> : <Search size={14} />} Verify
                  </button>
                </div>
              </form>
            </div>

            {/* STAFF VERIFICATION LOG */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recent Scan Log</h3>
              {scanHistory.length === 0 ? (
                <p className="text-xs text-slate-500 italic">No recent scans logged.</p>
              ) : (
                <div className="space-y-2">
                  {scanHistory.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs">
                      <span className="font-mono text-white">{item.booking?.redemptionToken || 'UNKNOWN'}</span>
                      <span className={`font-bold text-[10px] px-2 py-0.5 rounded ${
                        item.code === 'VALID_BOOKING' ? 'bg-emerald-500/20 text-emerald-400' :
                        item.code === 'ALREADY_REDEEMED' ? 'bg-amber-500/20 text-amber-400' : 'bg-rose-500/20 text-rose-400'
                      }`}>
                        {item.code}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>

        {/* INSTANT VISUAL STATUS CARDS RESULT DISPLAY */}
        {result && (
          <div className="mt-8 transition-all duration-300">
            
            {/* GREEN CARD: VALID BOOKING - REDEEMED */}
            {result.code === 'VALID_BOOKING' && (
              <div className="bg-emerald-950/60 border-2 border-emerald-500 rounded-3xl p-6 sm:p-8 text-white space-y-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-500/30 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black">
                      <CheckCircle2 size={32} />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-emerald-400 uppercase tracking-tight">
                        VALID BOOKING — REDEEMED
                      </h3>
                      <p className="text-xs text-emerald-200">Pass verified &amp; marked as REDEEMED in database.</p>
                    </div>
                  </div>

                  <button
                    onClick={resetScanner}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow transition"
                  >
                    Scan Next Passenger &rarr;
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-semibold">
                  <div className="bg-slate-950/70 p-4 rounded-2xl border border-emerald-500/30 space-y-1">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Passenger Name</span>
                    <strong className="text-white text-sm">{result.booking?.passengerName}</strong>
                  </div>

                  <div className="bg-slate-950/70 p-4 rounded-2xl border border-emerald-500/30 space-y-1">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Arrival Flight</span>
                    <strong className="text-white text-sm">{result.booking?.flightNumber}</strong>
                  </div>

                  <div className="bg-slate-950/70 p-4 rounded-2xl border border-emerald-500/30 space-y-1">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Passport / ID</span>
                    <strong className="text-white text-sm font-mono">{result.booking?.passportNumber}</strong>
                  </div>

                  <div className="bg-slate-950/70 p-4 rounded-2xl border border-emerald-500/30 space-y-1">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Assigned Pod / Service</span>
                    <strong className="text-emerald-400 text-sm">{result.booking?.bookedService}</strong>
                  </div>
                </div>
              </div>
            )}

            {/* AMBER CARD: ALREADY REDEEMED */}
            {result.code === 'ALREADY_REDEEMED' && (
              <div className="bg-amber-950/60 border-2 border-amber-500 rounded-3xl p-6 sm:p-8 text-white space-y-6 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-amber-500/30 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
                      <AlertTriangle size={32} />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-amber-400 uppercase tracking-tight">
                        ALREADY REDEEMED VOUCHER
                      </h3>
                      <p className="text-xs text-amber-200">
                        Warning: This voucher was previously scanned at{' '}
                        <strong className="text-white font-mono">{new Date(result.redeemedAt || Date.now()).toLocaleTimeString()}</strong>. Check for duplicate ticket sharing!
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={resetScanner}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow transition"
                  >
                    Dismiss &amp; Reset
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold">
                  <div className="bg-slate-950/70 p-4 rounded-2xl border border-amber-500/30 space-y-1">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Passenger Name</span>
                    <strong className="text-white text-sm">{result.booking?.passengerName || 'Alex Traveler'}</strong>
                  </div>

                  <div className="bg-slate-950/70 p-4 rounded-2xl border border-amber-500/30 space-y-1">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Original Scan Timestamp</span>
                    <strong className="text-amber-400 text-sm font-mono">
                      {new Date(result.redeemedAt || Date.now()).toLocaleString()}
                    </strong>
                  </div>

                  <div className="bg-slate-950/70 p-4 rounded-2xl border border-amber-500/30 space-y-1">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Assigned Pod / Service</span>
                    <strong className="text-white text-sm">{result.booking?.bookedService || 'Transit Hotel'}</strong>
                  </div>
                </div>
              </div>
            )}

            {/* RED CARD: INVALID / TAMPERED VOUCHER */}
            {(result.code === 'TAMPERED_VOUCHER' || result.code === 'INVALID_BOOKING' || result.status === 'error') && (
              <div className="bg-rose-950/60 border-2 border-rose-500 rounded-3xl p-6 sm:p-8 text-white space-y-6 shadow-[0_0_30px_rgba(244,63,94,0.2)]">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-rose-500/30 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center font-black">
                      <XCircle size={32} />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-rose-400 uppercase tracking-tight">
                        {result.code === 'TAMPERED_VOUCHER' ? 'TAMPERED / FORGED VOUCHER' : 'INVALID BOOKING VOUCHER'}
                      </h3>
                      <p className="text-xs text-rose-200">
                        {result.code === 'TAMPERED_VOUCHER'
                          ? '⛔ Cryptographic HMAC SHA-256 signature verification failed. Block entry immediately.'
                          : '⛔ Token or QR data not found in LayoverX database.'}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={resetScanner}
                    className="px-4 py-2 bg-rose-500 hover:bg-rose-400 text-white font-black text-xs rounded-xl shadow transition"
                  >
                    Dismiss Alert
                  </button>
                </div>

                <div className="bg-slate-950/80 p-4 rounded-2xl border border-rose-500/30 text-xs text-rose-300 font-mono">
                  Error Details: {result.message}
                </div>
              </div>
            )}

          </div>
        )}

      </main>

    </div>
  );
}
