'use client';

import React, { useEffect, useState } from 'react';
import {
  AlertTriangle,
  RotateCcw,
  Clock,
  ShieldCheck,
  CreditCard,
  MessageSquare,
  X,
  Lock,
} from 'lucide-react';

export interface PaymentFailureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRetry: () => void;
  errorCode?: string;
  errorDescription?: string;
  failureSource?: 'card' | 'upi' | 'netbanking' | 'wallet' | 'timeout' | 'gateway' | string;
  bookingId?: string;
  amount?: number;
  preservedCart?: any;
}

const HOLD_DURATION_MS = 15 * 60 * 1000; // 15 minutes

export default function PaymentFailureModal({
  isOpen,
  onClose,
  onRetry,
  errorCode,
  errorDescription,
  failureSource,
  bookingId,
  amount,
  preservedCart,
}: PaymentFailureModalProps) {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(15 * 60);

  // 15-Minute Reservation Hold preservation logic
  useEffect(() => {
    if (!isOpen) return;

    let targetExpiry: number;
    try {
      const storageKey = `layoverx_hold_${bookingId || 'active'}`;
      const existingHold = localStorage.getItem(storageKey);

      if (existingHold) {
        const parsed = JSON.parse(existingHold);
        if (parsed.expiresAt && parsed.expiresAt > Date.now()) {
          targetExpiry = parsed.expiresAt;
        } else {
          targetExpiry = Date.now() + HOLD_DURATION_MS;
        }
      } else {
        targetExpiry = Date.now() + HOLD_DURATION_MS;
      }

      // Persist cart and hotel slot state
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          bookingId,
          amount,
          preservedCart,
          expiresAt: targetExpiry,
          savedAt: Date.now(),
        })
      );
    } catch {
      targetExpiry = Date.now() + HOLD_DURATION_MS;
    }

    const updateTimer = () => {
      const remaining = Math.max(0, Math.floor((targetExpiry - Date.now()) / 1000));
      setSecondsRemaining(remaining);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [isOpen, bookingId, amount, preservedCart]);

  if (!isOpen) return null;

  // Format countdown mm:ss
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const timeFormatted = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Human-readable mapping of payment failures
  const getFailureDetails = (): { title: string; explanation: string; remedy: string } => {
    const raw = `${errorCode || ''} ${errorDescription || ''} ${failureSource || ''}`.toLowerCase();

    if (raw.includes('card') || raw.includes('decline') || raw.includes('insufficient')) {
      return {
        title: 'Card Authorization Declined',
        explanation:
          'Your issuing bank declined the card transaction. This frequently happens if international online transactions or 2FA limits are unverified.',
        remedy: 'Please try another debit/credit card or authorize the transaction via UPI.',
      };
    }

    if (raw.includes('upi') || raw.includes('cancelled') || raw.includes('rejected')) {
      return {
        title: 'UPI Transaction Cancelled',
        explanation:
          'The UPI authorization request was either manually declined or timed out in your UPI app (GPay / PhonePe / Paytm).',
        remedy: 'You can retry the request or switch to Card / Netbanking checkout.',
      };
    }

    if (raw.includes('timeout') || raw.includes('timed out') || raw.includes('gateway')) {
      return {
        title: 'Banking Gateway Timeout',
        explanation:
          'The banking payment switch encountered a temporary network delay before confirming your authorization. No funds were debited from your account.',
        remedy: 'Tap Retry Payment below to re-initiate a fresh secure checkout session.',
      };
    }

    return {
      title: 'Payment Verification Incomplete',
      explanation:
        errorDescription ||
        'The secure payment gateway could not finalize authorization for your layover package.',
      remedy: 'Your reservation and cart are held securely. You can safely retry without re-entering booking info.',
    };
  };

  const details = getFailureDetails();

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md transition-all animate-fadeIn"
    >
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900">
        {/* Top Warning Ribbon */}
        <div className="bg-rose-50 border-b border-rose-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wider">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
            Transaction Not Completed
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1 rounded-xl hover:bg-rose-100/60 text-slate-400 hover:text-slate-700 transition"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Failure Alert Icon & Title */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-black tracking-tight text-slate-900">{details.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{details.explanation}</p>
            </div>
          </div>

          {/* 15-Minute Reservation Slot Guarantee Pill */}
          <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <Lock className="w-4 h-4 text-amber-700 shrink-0" />
              <div>
                <span className="font-bold text-amber-900 block">
                  Transit Slot &amp; Room Hold Active
                </span>
                <span className="text-amber-700 text-[11px]">
                  Cart preserved in checkout state
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 font-mono font-black text-amber-800 bg-white/80 border border-amber-300 px-3 py-1.5 rounded-xl text-sm shadow-sm shrink-0">
              <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin" />
              <span>{timeFormatted}</span>
            </div>
          </div>

          {/* Advice / Diagnostic Notice */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-1.5 text-xs text-slate-600">
            <div className="flex items-center gap-1.5 text-slate-800 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Recommended Action:</span>
            </div>
            <p className="leading-relaxed pl-5">{details.remedy}</p>
          </div>

          {/* Action Buttons: 1-Click Retry & Switch Method */}
          <div className="space-y-2.5 pt-1">
            <button
              onClick={() => {
                onClose();
                onRetry();
              }}
              type="button"
              className="w-full py-3.5 bg-[#0284C7] hover:bg-[#0369a1] text-white font-extrabold text-sm rounded-xl shadow-lg shadow-sky-950/20 transition active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Payment (1-Click)</span>
            </button>

            <button
              onClick={onClose}
              type="button"
              className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer flex items-center justify-center gap-2"
            >
              <CreditCard className="w-3.5 h-3.5 text-slate-500" />
              <span>Choose Another Payment Method</span>
            </button>
          </div>

          {/* Concierge Assistance Footer */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Need immediate terminal support?</span>
            <a
              href={`https://wa.me/919876543210?text=Hi%20LayoverX%20Concierge,%20my%20payment%20failed%20for%20booking%20${bookingId || ''}.%20Can%20you%20help%20me%20confirm%20my%20slot?`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-sky-600 hover:underline flex items-center gap-1"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
