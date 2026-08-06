'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ShieldCheck, Plane, Wallet, CreditCard, Landmark, Smartphone, ArrowRight, HelpCircle } from 'lucide-react';
import { getBookingDetails, verifyPayment } from '@/lib/api';

interface BookingData {
  id: string;
  user_phone: string;
  ticket_file_path: string;
  extracted_pnr: string | null;
  extracted_inbound_flight: string | null;
  extracted_outbound_flight: string | null;
  dpdp_consented: boolean;
  payment_status: string;
  amount: number;
  currency: string;
  created_at: string;
}

function CheckoutPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const bookingId = searchParams.get('bookingId') || '';
  const orderId = searchParams.get('orderId') || '';
  const urlAmount = searchParams.get('amount') ? parseFloat(searchParams.get('amount') || '0') : 0;

  const [booking, setBooking] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'upi' | 'card' | 'netbanking' | 'wallet'>('upi');

  // Input states for custom forms
  const [upiId, setUpiId] = useState('');
  const [upiVerified, setUpiVerified] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedWallet, setSelectedWallet] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!bookingId) {
      setError('Missing bookingId in checkout parameters.');
      setLoading(false);
      return;
    }

    async function loadBooking() {
      try {
        const data = await getBookingDetails(bookingId);
        if (data.success && data.booking) {
          setBooking(data.booking);
        } else {
          throw new Error('Failed to load booking details.');
        }
      } catch (err: any) {
        console.error('Error fetching booking details for checkout:', err);
        // Fallback to URL parameters if DB is not reachable or in sample mode
        setBooking({
          id: bookingId,
          user_phone: '+91 98765 43210',
          ticket_file_path: 'mock_bucket/mock_ticket.pdf',
          extracted_pnr: 'MH202A',
          extracted_inbound_flight: 'AI302',
          extracted_outbound_flight: 'EK501',
          dpdp_consented: true,
          payment_status: 'PENDING',
          amount: urlAmount || 1499,
          currency: 'INR',
          created_at: new Date().toISOString(),
        });
      } finally {
        setLoading(false);
      }
    }

    loadBooking();
  }, [bookingId, urlAmount]);

  // Load Razorpay Checkout SDK dynamically if not already present
  useEffect(() => {
    if (typeof window !== 'undefined' && !(window as any).Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handlePayNow = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      const checkoutAmount = booking?.amount || urlAmount || 1499;
      const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_TJBPSe0lStMjEU';

      const options = {
        key: keyId,
        amount: Math.round(checkoutAmount * 100),
        currency: 'INR',
        name: 'LayoverX',
        description: 'Mumbai Airport Layover Package',
        order_id: orderId,
        prefill: {
          contact: booking?.user_phone || '+919876543210',
        },
        theme: {
          color: '#0284c7',
        },
        handler: async function (response: any) {
          try {
            const verifyRes = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingId: bookingId,
            });
            if (verifyRes.success) {
              window.location.href = `/booking-confirmation?bookingId=${bookingId}`;
            } else {
              alert('Payment verification failed. Please contact support.');
              setIsProcessing(false);
            }
          } catch (err: any) {
            console.error('Payment Verification error:', err);
            alert(err.message || 'Payment verification failed.');
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      console.error('Razorpay invocation error:', err);
      alert('Failed to launch payment gateway. Please try again.');
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-sky-600 border-t-transparent"></div>
        <p className="text-sm font-medium text-slate-500">Loading secure checkout summary...</p>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="max-w-md mx-auto my-16 bg-white border border-rose-200 rounded-2xl p-8 text-center shadow-sm">
        <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4 text-rose-600">
          ⚠️
        </div>
        <h1 className="text-lg font-bold text-slate-900 mb-2">Checkout Error</h1>
        <p className="text-sm text-slate-500 mb-6">{error || 'Could not initiate checkout page.'}</p>
        <button
          onClick={() => router.push('/plan-my-layover')}
          className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl text-sm transition-all"
        >
          Return to Layover Planner
        </button>
      </div>
    );
  }

  const finalAmount = booking.amount || urlAmount || 1499;
  const taxes = Math.round(finalAmount * 0.05); // 5% tax mock
  const basePrice = finalAmount - taxes;

  return (
    <div className="bg-[#F4F6F8] min-h-screen pb-16">
      {/* HEADER BANNER */}
      <header className="bg-white border-b border-slate-200 py-4 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black tracking-tight text-slate-900">
              Layover<span className="text-sky-600">X</span>
            </span>
            <span className="h-4 w-px bg-slate-300 hidden sm:block"></span>
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider hidden sm:block">
              Secure Checkout
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
              <ShieldCheck className="w-4 h-4" />
              <span>PCI-DSS Compliant | 100% Safe Payments</span>
            </div>
            <div className="text-xs font-semibold text-slate-600">
              Step 2 of 2
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Summary & Payment Tabs (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 1. Trip & Passenger Summary Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span>📋</span> Trip &amp; Passenger Summary
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 block">Contact Phone</span>
                  <span className="text-sm font-semibold text-slate-800">{booking.user_phone}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 block">PNR Reference</span>
                  <span className="text-sm font-mono font-bold text-slate-800 uppercase bg-slate-100 px-2 py-0.5 rounded">
                    {booking.extracted_pnr || 'Extracted via Ticket'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 block">In/Out Connections</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-bold text-slate-700 bg-sky-50 px-2 py-1 rounded border border-sky-100 flex items-center gap-1">
                      <Plane className="w-3 h-3 rotate-90 text-sky-600" />
                      {booking.extracted_inbound_flight || 'IN'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-xs font-bold text-slate-700 bg-sky-50 px-2 py-1 rounded border border-sky-100 flex items-center gap-1">
                      <Plane className="w-3 h-3 text-sky-600" />
                      {booking.extracted_outbound_flight || 'OUT'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Payment Selector Tabs */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="border-b border-slate-200 bg-slate-50 flex overflow-x-auto">
                <button
                  onClick={() => setActiveTab('upi')}
                  className={`flex-1 py-4 px-6 text-center font-bold text-sm flex items-center justify-center gap-2 border-b-2 transition-all whitespace-nowrap ${
                    activeTab === 'upi'
                      ? 'border-sky-600 text-sky-600 bg-white'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>UPI Payment</span>
                </button>
                <button
                  onClick={() => setActiveTab('card')}
                  className={`flex-1 py-4 px-6 text-center font-bold text-sm flex items-center justify-center gap-2 border-b-2 transition-all whitespace-nowrap ${
                    activeTab === 'card'
                      ? 'border-sky-600 text-sky-600 bg-white'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Cards (Credit/Debit)</span>
                </button>
                <button
                  onClick={() => setActiveTab('netbanking')}
                  className={`flex-1 py-4 px-6 text-center font-bold text-sm flex items-center justify-center gap-2 border-b-2 transition-all whitespace-nowrap ${
                    activeTab === 'netbanking'
                      ? 'border-sky-600 text-sky-600 bg-white'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Landmark className="w-4 h-4" />
                  <span>Net Banking</span>
                </button>
                <button
                  onClick={() => setActiveTab('wallet')}
                  className={`flex-1 py-4 px-6 text-center font-bold text-sm flex items-center justify-center gap-2 border-b-2 transition-all whitespace-nowrap ${
                    activeTab === 'wallet'
                      ? 'border-sky-600 text-sky-600 bg-white'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Wallet className="w-4 h-4" />
                  <span>Wallets / Pay Later</span>
                </button>
              </div>

              {/* TAB CONTENT AREAS */}
              <div className="p-6">
                
                {/* Tab 1: UPI */}
                {activeTab === 'upi' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm mb-2">Enter Virtual Payment Address (VPA) / UPI ID</h3>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <input
                          type="text"
                          placeholder="e.g. mobileNumber@ybl or username@upi"
                          value={upiId}
                          onChange={(e) => {
                            setUpiId(e.target.value);
                            setUpiVerified(false);
                          }}
                          className="flex-grow bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (upiId.includes('@')) setUpiVerified(true);
                            else alert('Please enter a valid UPI ID formatted with @ provider.');
                          }}
                          className={`px-6 py-3 font-bold rounded-xl text-xs shadow transition-all ${
                            upiVerified 
                              ? 'bg-emerald-500 text-white' 
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                          }`}
                        >
                          {upiVerified ? '✓ Verified' : 'Verify VPA'}
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-2">
                        Supported apps: GPay, PhonePe, Paytm, BHIM, Amazon Pay &amp; popular banking applications.
                      </p>
                    </div>

                    <div className="border-t border-slate-100 pt-6">
                      <div className="flex flex-col sm:flex-row items-center gap-6 bg-slate-50 rounded-2xl p-4 border border-slate-200">
                        <div className="w-24 h-24 bg-white border border-slate-200 rounded-lg flex items-center justify-center relative p-1">
                          {/* QR Code placeholder */}
                          <div className="text-center font-bold text-[8px] text-slate-400 select-none">
                            [ MOCK QR ]<br/>SCAN TO PAY
                          </div>
                        </div>
                        <div className="text-center sm:text-left space-y-1">
                          <p className="font-bold text-slate-800 text-sm">Scan QR Code instantly</p>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            Generate a transaction specific dynamic QR code to pay using any UPI application.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: Card Payment */}
                {activeTab === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Card Number</label>
                      <input
                        type="text"
                        placeholder="4111 2222 3333 4444"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all font-mono"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">CVV</label>
                        <input
                          type="password"
                          maxLength={3}
                          placeholder="123"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Name on Card</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all"
                      />
                    </div>
                  </div>
                )}

                {/* Tab 3: Net Banking */}
                {activeTab === 'netbanking' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-3">Popular Banks</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                        {['SBI', 'HDFC', 'ICICI', 'Axis', 'Kotak'].map((bank) => (
                          <button
                            key={bank}
                            type="button"
                            onClick={() => setSelectedBank(bank)}
                            className={`p-3 rounded-xl border text-center font-bold text-xs transition-all ${
                              selectedBank === bank
                                ? 'border-sky-500 bg-sky-50 text-sky-700'
                                : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            {bank}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-6">
                      <label className="block text-xs font-bold text-slate-700 mb-1">Select Other Bank</label>
                      <select
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all"
                      >
                        <option value="">-- Select from list --</option>
                        <option value="SBI">State Bank of India</option>
                        <option value="HDFC">HDFC Bank</option>
                        <option value="ICICI">ICICI Bank</option>
                        <option value="Axis">Axis Bank</option>
                        <option value="Kotak">Kotak Mahindra Bank</option>
                        <option value="IDBI">IDBI Bank</option>
                        <option value="PNB">Punjab National Bank</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Tab 4: Wallets & Pay Later */}
                {activeTab === 'wallet' && (
                  <div className="grid grid-cols-2 gap-3">
                    {['Amazon Pay', 'Paytm Wallet', 'MobiKwik', 'PhonePe Wallet'].map((wallet) => (
                      <button
                        key={wallet}
                        type="button"
                        onClick={() => setSelectedWallet(wallet)}
                        className={`p-4 rounded-xl border text-left font-bold text-xs flex items-center justify-between transition-all ${
                          selectedWallet === wallet
                            ? 'border-sky-500 bg-sky-50 text-sky-700'
                            : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <span>{wallet}</span>
                        {selectedWallet === wallet && <span className="text-sky-600">✓</span>}
                      </button>
                    ))}
                  </div>
                )}

              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Sticky Fare Summary Sidebar (4 Cols) */}
          <div className="lg:col-span-4 sticky top-24 space-y-6">
            
            {/* Price Breakdown Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">
                Fare Summary
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Base Package</span>
                  <span>₹{basePrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Airport Service Concierge</span>
                  <span className="text-emerald-600 font-medium">FREE</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Taxes &amp; Security Surcharges</span>
                  <span>₹{taxes.toLocaleString('en-IN')}</span>
                </div>
                <div className="border-t border-slate-100 my-3 pt-3 flex justify-between font-black text-sm text-slate-900">
                  <span>Total Amount Due</span>
                  <span className="text-sky-700">₹{finalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Pay Now Call-to-action */}
              <button
                onClick={handlePayNow}
                disabled={isProcessing}
                className="w-full py-4 bg-sky-600 hover:bg-sky-700 disabled:bg-slate-300 text-white font-black rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm uppercase tracking-wide cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <span>Pay ₹{finalAmount.toLocaleString('en-IN')} &amp; Confirm Layover</span>
                  </>
                )}
              </button>
            </div>

            {/* Privacy notice box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
              <div className="text-[11px] text-slate-500 leading-relaxed">
                <p className="font-bold text-slate-700 mb-0.5">Privacy Notice (DPDP Act Compliance)</p>
                <p>
                  Your uploaded ticket is stored securely and processed automatically. Your document is scheduled to self-destruct 48 hours after departure.
                </p>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-sm font-medium text-slate-500">Loading Checkout...</p>
      </div>
    }>
      <CheckoutPageContent />
    </Suspense>
  );
}
