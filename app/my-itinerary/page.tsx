'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Plane,
  Clock,
  Hotel,
  Utensils,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Plus,
  Trash2,
  Sparkles,
  Save,
  Copy,
  AlertCircle,
  RefreshCw,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import { createRazorpayOrder } from '@/lib/api';
import { useAuth } from '@/context/auth-context';
import { useItinerary, calculateDynamicCabDriveTime } from '@/context/itinerary-context';
import { calculateBookingTotal } from '@/lib/pricing';

export default function MyItineraryPage() {
  const router = useRouter();
  const { user } = useAuth();
  const {
    items,
    savedPlans,
    saveCurrentPlan,
    deleteSavedPlan,
    loadSavedPlan,
    updateItemDuration,
    moveItemUp,
    moveItemDown,
    removeItem,
    showToast,
  } = useItinerary();

  const [totalHours, setTotalHours] = useState('8.0 Hours');
  const [usedHours, setUsedHours] = useState('4.5 Hours');
  const [remainingHours, setRemainingHours] = useState('3.5 Hours');
  const [percentUsed, setPercentUsed] = useState(55);

  const [countdown, setCountdown] = useState({ min: 28, sec: 42 });
  const [trafficLevel, setTrafficLevel] = useState<'normal' | 'heavy'>('normal');
  const [selectedRouteNode, setSelectedRouteNode] = useState<'t2' | 'stay' | null>(null);

  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.sec > 0) {
          return { ...prev, sec: prev.sec - 1 };
        }
        if (prev.min > 0) {
          return { min: prev.min - 1, sec: 59 };
        }
        return { min: 30, sec: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Compute total hours dynamically
  React.useEffect(() => {
    let arrivalTime = '';
    let departureTime = '';

    try {
      const calcData = localStorage.getItem('layoverx_calculator_data');
      if (calcData) {
        const parsed = JSON.parse(calcData);
        if (parsed.arrivalTime) arrivalTime = parsed.arrivalTime;
        if (parsed.departureTime) departureTime = parsed.departureTime;
      }
    } catch {}

    if (arrivalTime && departureTime) {
      const arrDate = new Date(arrivalTime);
      const depDate = new Date(departureTime);
      const diffMs = depDate.getTime() - arrDate.getTime();
      
      if (diffMs > 0) {
        const totalH = diffMs / (1000 * 60 * 60);
        const bufferH = 3.5;
        const remainingH = Math.max(0, totalH - bufferH);
        const usedH = totalH - remainingH;

        setTotalHours(`${totalH.toFixed(1)} Hours`);
        setUsedHours(`${usedH.toFixed(1)} Hours`);
        setRemainingHours(`${remainingH.toFixed(1)} Hours`);
        setPercentUsed(Math.round((usedH / totalH) * 100));
      }
    }
  }, []);

  const rawBaseAmount = items.reduce((acc, i) => acc + (parseInt(i.cost.replace(/[^0-9]/g, '')) || 0), 0);
  const pricingBreakdown = calculateBookingTotal(rawBaseAmount || 0);

  const [passportCountry, setPassportCountry] = useState('India');
  const [currency, setCurrency] = useState<'INR' | 'USD' | 'EUR' | 'GBP'>('INR');

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    setCheckoutError(null);

    const userId = user?.id || 'usr_demo_123';
    const serviceId = 'h1';
    const slotId = 'slot_niranta_101';

    try {
      const orderData = await createRazorpayOrder({
        userId,
        serviceId,
        slotId,
        amount: pricingBreakdown.grandTotalINR, // Payload receives grand total inclusive of 18% GST
        country_code: passportCountry || 'IN',
        currency: currency || 'INR',
      });


      const options = {
        key: orderData.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_samplekey',
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        order_id: orderData.razorpayOrderId,
        name: 'LayoverX Mumbai T2',
        description: 'Transit Slot Booking',
        handler: function (response: any) {
          router.push(`/confirmation`);
        },
        prefill: {
          name: user?.name || 'Alex Traveler',
          email: user?.email || 'traveler@layoverx.com',
        },
        theme: {
          color: '#0284c7',
        },
      };

      if ((window as any).Razorpay) {
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } else {
        // Fallback redirection if SDK blocked by adblocker
        console.warn('[Razorpay SDK] Window.Razorpay not loaded, simulating checkout redirect');
        router.push('/confirmation');
      }
    } catch (err: any) {
      console.warn('[Checkout API Error]', err);
      setCheckoutError(err.message || 'Unable to connect to payment gateway server.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  const pathD = trafficLevel === 'normal' 
    ? "M 10 80 Q 50 20 90 40" 
    : "M 10 80 Q 30 10, 60 70, 90 40";

  return (
    <div className="min-h-screen pb-24 bg-[#F8FAFC] text-[#0F172A]">
      
      {/* HERO SECTION */}
      <section className="bg-slate-900 border-b border-slate-800 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <nav className="flex items-center gap-2 text-xs text-slate-400" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-slate-600">/</span>
            <span className="text-white font-medium">Itinerary Workspace</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Stopover Planner & Workspace
          </h1>
          <p className="text-slate-300 text-sm max-w-2xl">
            Build and refine your layover timeline. Check real-time exit timings, calculate prices, and apply AI co-pilot improvements.
          </p>
        </div>
      </section>

      {/* MAIN WORKSPACE SECTION */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: Timeline Editor */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Timings & Exit Window Indicator Card */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Timings & Exit Window</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Immigration exit & transfer buffer: 3.5h</p>
                  </div>
                  <Link
                    href="/plan-my-layover"
                    className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition text-center"
                  >
                    ✏️ Modify Trip Timings
                  </Link>
                </div>

                {/* Progress Bar Indicators & Formula Breakdown */}
                {(() => {
                  const parseTotalH = parseFloat(totalHours) || 8.0;
                  const cabDrivingTime = calculateDynamicCabDriveTime(items);
                  const transitBuffer = 2.5; // Fixed 2.5h transit buffer requested
                  const extraTenMin = cabDrivingTime > 0 ? 0.17 : 0.0; // 10 mins extra buffer only when cab ride exists
                  const fixedBuffersTotal = transitBuffer + cabDrivingTime + extraTenMin;

                  const availableStopoverWindow = Math.max(0, parseTotalH - fixedBuffersTotal);
                  const usedActivitiesH = items.reduce((sum, item) => sum + (item.badge === 'Cab' ? 0 : (item.durationHours || 2)), 0);
                  const remainingH = Math.max(0, availableStopoverWindow - usedActivitiesH);
                  const pctUsed = Math.min(100, Math.round((usedActivitiesH / Math.max(1, availableStopoverWindow)) * 100));

                  const isTimeExceeded = usedActivitiesH > availableStopoverWindow && items.length > 0;

                  return (
                    <div className="space-y-4">
                      {isTimeExceeded && (
                        <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold rounded-2xl flex items-center gap-2">
                          <AlertCircle size={16} className="text-rose-600 flex-shrink-0" />
                          <span>
                            ⚠️ Time Limit Exceeded! Activities duration ({usedActivitiesH.toFixed(1)}h) exceeds available stopover window ({availableStopoverWindow.toFixed(1)}h). Reduce spend slot hours to proceed to checkout.
                          </span>
                        </div>
                      )}

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold text-slate-700">
                        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                          <span className="text-slate-500 block text-[10px] uppercase tracking-wider mb-0.5">Total Layover</span>
                          <strong className="text-sm font-extrabold text-slate-900">{parseTotalH.toFixed(1)} Hours</strong>
                        </div>
                        <div className="bg-amber-50 p-3 rounded-2xl border border-amber-100">
                          <span className="text-amber-700 block text-[10px] uppercase tracking-wider mb-0.5">Buffers ({cabDrivingTime > 0 ? `2.5h + ${cabDrivingTime.toFixed(1)}h Drive` : '2.5h Transit'})</span>
                          <strong className="text-sm font-extrabold text-amber-900">{fixedBuffersTotal.toFixed(1)} Hours</strong>
                        </div>
                        <div className="bg-sky-50 p-3 rounded-2xl border border-sky-100">
                          <span className="text-[#0369a1] block text-[10px] uppercase tracking-wider mb-0.5">Used Activities</span>
                          <strong className="text-sm font-extrabold text-[#0369a1]">{usedActivitiesH.toFixed(1)} Hours</strong>
                        </div>
                        <div className={`p-3 rounded-2xl border ${isTimeExceeded ? 'bg-rose-50 border-rose-200' : 'bg-indigo-50 border-indigo-100'}`}>
                          <span className={`block text-[10px] uppercase tracking-wider mb-0.5 ${isTimeExceeded ? 'text-rose-700' : 'text-indigo-600'}`}>Available Window</span>
                          <strong className={`text-sm font-extrabold ${isTimeExceeded ? 'text-rose-900' : 'text-indigo-900'}`}>{remainingH.toFixed(1)} Hours</strong>
                        </div>
                      </div>

                      <div className="relative w-full h-3.5 bg-slate-100 rounded-full overflow-hidden flex border border-slate-200">
                        <div 
                          className={`h-full transition-all duration-500 ${isTimeExceeded ? 'bg-rose-600' : 'bg-[#0369a1]'}`}
                          style={{ width: `${pctUsed}%` }}
                        ></div>
                        <div 
                          className="h-full bg-slate-300 transition-all duration-500"
                          style={{ width: `${100 - pctUsed}%` }}
                        ></div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 font-bold uppercase tracking-wider px-1">
                        <span>🛫 Landing</span>
                        <span>Formula: Total Layover - 2.5h Transit - Cab Drive - 10m = {availableStopoverWindow.toFixed(1)}h Available</span>
                        <span>🛬 Takeoff</span>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Sequence List */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900">Timeline Sequence</h3>
                  <span className="text-xs text-slate-500 font-semibold">{items.length} items</span>
                </div>

                {items.length === 0 ? (
                  <div className="p-8 text-center space-y-3 bg-slate-50 rounded-2xl border border-slate-200">
                    <div className="text-3xl">🗺️</div>
                    <h4 className="text-sm font-bold text-slate-900">Your itinerary is currently empty</h4>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Add transit hotels, dining, airport cabs, or sightseeing experiences to build your stopover schedule.
                    </p>
                    <Link
                      href="/plan-my-layover"
                      className="inline-block px-5 py-2.5 bg-[#0369a1] hover:bg-[#075985] text-white font-bold text-xs rounded-xl shadow-md transition"
                    >
                      Build My Stopover Plan &rarr;
                    </Link>
                  </div>
                ) : (
                  <div className="relative border-l-2 border-sky-200 ml-4 space-y-6 pl-8">
                    {items.map((item, idx) => (
                      <div key={item.id} className="relative group">
                        <div className="absolute -left-[41px] top-0 w-7 h-7 rounded-full bg-[#0369a1] text-white flex items-center justify-center text-xs font-bold shadow">
                          ✓
                        </div>

                        <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-extrabold text-[#0369a1]">{item.time || 'Scheduled'}</span>
                              <span className="text-[10px] font-bold text-slate-600 bg-slate-200 px-2 py-0.5 rounded uppercase">
                                {item.badge}
                              </span>
                            </div>
                            <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                            <p className="text-xs text-slate-600 flex items-center gap-1.5 relative">
                              {item.detail}
                            </p>

                            {/* Duration / Hour Slot Selector directly on timeline card */}
                            <div className="pt-2">
                              {item.badge === 'Cab' ? (
                                <span className="inline-block text-[11px] font-bold text-slate-600 bg-slate-200/80 px-2.5 py-1 rounded-lg border border-slate-300">
                                  🔒 Fixed Calculated Transit ({item.durationHours || 0.75}h ride)
                                </span>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <span className="text-[11px] font-bold text-slate-500">Spend Slot:</span>
                                  <select
                                    value={item.durationHours || (item.badge === 'Hotel' ? 3 : item.badge === 'Dining' ? 1.5 : item.badge === 'Spa' ? 1 : item.badge === 'Gaming' ? 2 : 3)}
                                    onChange={(e) => {
                                      const newH = parseFloat(e.target.value);
                                      let costStr = item.cost;
                                      if (item.badge === 'Hotel') {
                                        costStr = newH <= 3 ? '₹3,499' : newH <= 6 ? '₹5,299' : '₹8,999';
                                      } else if (item.badge === 'Dining') {
                                        costStr = newH <= 1 ? '₹1,299' : newH <= 1.5 ? '₹1,800' : '₹2,400';
                                      } else if (item.badge === 'Spa') {
                                        costStr = newH <= 0.75 ? '₹1,999' : newH <= 1 ? '₹2,600' : '₹3,500';
                                      } else if (item.badge === 'Gaming') {
                                        costStr = newH <= 1 ? '₹800' : newH <= 2 ? '₹1,499' : '₹1,999';
                                      } else if (item.badge === 'Tour') {
                                        costStr = newH <= 3 ? '₹2,499' : newH <= 5 ? '₹3,999' : '₹5,499';
                                      }
                                      updateItemDuration(item.id, newH, costStr);
                                    }}
                                    className="text-xs font-bold bg-white text-slate-900 border border-slate-300 rounded-lg px-2.5 py-1 shadow-sm cursor-pointer hover:border-sky-400 transition"
                                  >
                                    {item.badge === 'Hotel' && (
                                      <>
                                        <option value={3}>3 Hours Stay — ₹3,499</option>
                                        <option value={6}>6 Hours Stay — ₹5,299</option>
                                        <option value={12}>12 Hours Stay — ₹8,999</option>
                                      </>
                                    )}
                                    {item.badge === 'Dining' && (
                                      <>
                                        <option value={1}>1.0 Hour Table — ₹1,299</option>
                                        <option value={1.5}>1.5 Hours Table — ₹1,800</option>
                                        <option value={2}>2.0 Hours Table — ₹2,400</option>
                                      </>
                                    )}
                                    {item.badge === 'Spa' && (
                                      <>
                                        <option value={0.75}>45 Mins Therapy — ₹1,999</option>
                                        <option value={1}>1.0 Hour Massage — ₹2,600</option>
                                        <option value={1.5}>1.5 Hours Treatment — ₹3,500</option>
                                      </>
                                    )}
                                    {item.badge === 'Gaming' && (
                                      <>
                                        <option value={1}>1.0 Hour Station — ₹800</option>
                                        <option value={2}>2.0 Hours Station — ₹1,499</option>
                                        <option value={3}>3.0 Hours Pass — ₹1,999</option>
                                      </>
                                    )}
                                    {item.badge === 'Tour' && (
                                      <>
                                        <option value={3}>3.0 Hours Tour — ₹2,499</option>
                                        <option value={5}>5.0 Hours Tour — ₹3,999</option>
                                        <option value={7}>7.0 Hours Tour — ₹5,499</option>
                                      </>
                                    )}
                                  </select>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex sm:flex-col items-end justify-between gap-2">
                            <span className="text-sm font-black text-slate-900">{item.cost}</span>
                            
                            {/* Priority Shift & Action Controls */}
                            <div className="flex items-center gap-1.5 pt-1">
                              {/* Move Up */}
                              <button
                                type="button"
                                onClick={() => moveItemUp(idx)}
                                disabled={idx === 0}
                                className="p-1 rounded bg-slate-200 hover:bg-sky-500 hover:text-white disabled:opacity-30 disabled:hover:bg-slate-200 disabled:hover:text-slate-500 text-slate-700 transition"
                                title="Increase Priority (Move Up)"
                              >
                                <ChevronUp size={14} />
                              </button>

                              {/* Move Down */}
                              <button
                                type="button"
                                onClick={() => moveItemDown(idx)}
                                disabled={idx === items.length - 1}
                                className="p-1 rounded bg-slate-200 hover:bg-sky-500 hover:text-white disabled:opacity-30 disabled:hover:bg-slate-200 disabled:hover:text-slate-500 text-slate-700 transition"
                                title="Decrease Priority (Move Down)"
                              >
                                <ChevronDown size={14} />
                              </button>

                              {/* Replace Option */}
                              <button
                                type="button"
                                onClick={() => router.push('/plan-my-layover')}
                                className="px-2 py-0.5 rounded bg-sky-100 hover:bg-sky-200 text-[#0369a1] text-[11px] font-bold transition flex items-center gap-1"
                                title="Replace with alternative stopover activity"
                              >
                                <RefreshCw size={11} /> Replace
                              </button>

                              {/* Delete Item */}
                              <button
                                type="button"
                                onClick={() => removeItem(item.id)}
                                className="p-1 text-slate-400 hover:text-rose-600 transition"
                                title="Remove item"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* RIGHT COLUMN: Control Panel */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Saved Itineraries Summary Card */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    My Saved Itineraries ({savedPlans.length})
                  </h3>
                  <button
                    onClick={() => saveCurrentPlan()}
                    disabled={items.length === 0}
                    className="py-1.5 px-3 bg-slate-900 hover:bg-black disabled:bg-slate-300 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Save size={14} /> Save Current
                  </button>
                </div>

                {savedPlans.length === 0 ? (
                  <p className="text-xs text-slate-500 italic py-2 text-center">
                    No saved itineraries. Build a plan and click "Save Current" above.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {savedPlans.map((plan) => (
                      <div key={plan.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2">
                        <div className="flex items-center justify-between">
                          <strong className="text-xs font-bold text-slate-900">{plan.name}</strong>
                          <span className="text-[10px] text-slate-500">{plan.createdAt}</span>
                        </div>
                        <div className="text-[11px] text-slate-600 font-semibold">
                          {plan.items.length} items • ₹{plan.totalCost.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-2 pt-1 border-t border-slate-200">
                          <button
                            type="button"
                            onClick={() => loadSavedPlan(plan)}
                            className="px-2.5 py-1 bg-[#0369a1] hover:bg-[#075985] text-white rounded-lg text-[11px] font-bold transition flex items-center gap-1"
                            title="Replace all active itinerary items with this saved plan"
                          >
                            🔄 Replace Active
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard?.writeText(window.location.href);
                              showToast(`Share link for "${plan.name}" copied!`, 'success');
                            }}
                            className="px-2.5 py-1 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-[11px] font-bold transition flex items-center gap-1"
                          >
                            🔗 Share
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteSavedPlan(plan.id)}
                            className="px-2.5 py-1 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg text-[11px] font-bold transition flex items-center gap-1 ml-auto"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Checkout Card */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-md space-y-6">
                {/* High-Trust Launch Badge */}
                <div className="bg-sky-50 border border-sky-200 rounded-xl p-2.5 text-center text-xs font-bold text-sky-900 flex items-center justify-center gap-1.5 shadow-sm">
                  <span>🚀 CSMIA T2 Launch Special — 24/7 Gate 2 Airport Concierge Included</span>
                </div>

                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-3">
                  Pricing Breakdown
                </h3>


                <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                  {items.some(i => i.badge === 'Hotel') && (
                    <div className="flex justify-between">
                      <span>Niranta Transit Hotel:</span>
                      <strong className="text-slate-900">₹3,499</strong>
                    </div>
                  )}
                  {items.some(i => i.badge === 'Dining') && (
                    <div className="flex justify-between">
                      <span>Peshawri Lunch Table:</span>
                      <strong className="text-slate-900">₹1,299</strong>
                    </div>
                  )}
                  {!items.some(i => i.badge === 'Hotel' || i.badge === 'Dining') && (
                    <div className="text-slate-500 italic text-center py-2">
                      No services selected.
                    </div>
                  )}

                  <div className="border-t border-slate-100 pt-3 space-y-2">
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>Subtotal (Base Price):</span>
                      <strong className="text-slate-800">₹{pricingBreakdown.basePriceINR.toLocaleString()}</strong>
                    </div>
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>GST (18% Tax):</span>
                      <strong className="text-slate-800">₹{pricingBreakdown.gstAmountINR.toLocaleString()}</strong>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-bold text-slate-900 block">Total Payable</span>
                    <span className="text-[11px] text-slate-500">Incl. 18% GST &amp; Razorpay tokenization</span>
                  </div>
                  <span className="text-2xl sm:text-3xl font-black text-[#0369a1]">
                    ₹{pricingBreakdown.grandTotalINR.toLocaleString()}
                  </span>
                </div>

                {checkoutError && (
                  <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-600 text-xs rounded-xl flex items-start gap-2">
                    <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                    <span>{checkoutError}</span>
                  </div>
                )}

                <button 
                  type="button"
                  onClick={() => {
                    const parseTotalH = parseFloat(totalHours) || 8.0;
                    const cabDrivingTime = calculateDynamicCabDriveTime(items);
                    const transitBuffer = 2.5;
                    const extraTenMin = cabDrivingTime > 0 ? 0.17 : 0.0;
                    const availableStopoverWindow = Math.max(0, parseTotalH - transitBuffer - cabDrivingTime - extraTenMin);
                    const usedActivitiesH = items.reduce((sum, item) => sum + (item.badge === 'Cab' ? 0 : (item.durationHours || 2)), 0);

                    if (usedActivitiesH > availableStopoverWindow && items.length > 0) {
                      setCheckoutError(`Cannot proceed: Total activity duration (${usedActivitiesH.toFixed(1)}h) exceeds your safe stopover window (${availableStopoverWindow.toFixed(1)}h). Please reduce spend hours.`);
                      return;
                    }
                    handleCheckout();
                  }}
                  disabled={checkoutLoading || (() => {
                    const parseTotalH = parseFloat(totalHours) || 8.0;
                    const cabDrivingTime = calculateDynamicCabDriveTime(items);
                    const transitBuffer = 2.5;
                    const extraTenMin = cabDrivingTime > 0 ? 0.17 : 0.0;
                    const availableStopoverWindow = Math.max(0, parseTotalH - transitBuffer - cabDrivingTime - extraTenMin);
                    const usedActivitiesH = items.reduce((sum, item) => sum + (item.badge === 'Cab' ? 0 : (item.durationHours || 2)), 0);
                    return usedActivitiesH > availableStopoverWindow && items.length > 0;
                  })()}
                  className="w-full py-4 bg-[#0369a1] hover:bg-[#075985] disabled:bg-slate-300 disabled:opacity-60 disabled:cursor-not-allowed text-white font-extrabold text-sm rounded-xl transition shadow-md flex items-center justify-center gap-2 text-center cursor-pointer"
                >
                  {checkoutLoading ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" /> Creating Order & Launching Razorpay...
                    </>
                  ) : (() => {
                    const parseTotalH = parseFloat(totalHours) || 8.0;
                    const cabDrivingTime = calculateDynamicCabDriveTime(items);
                    const transitBuffer = 2.5;
                    const extraTenMin = cabDrivingTime > 0 ? 0.17 : 0.0;
                    const availableStopoverWindow = Math.max(0, parseTotalH - transitBuffer - cabDrivingTime - extraTenMin);
                    const usedActivitiesH = items.reduce((sum, item) => sum + (item.badge === 'Cab' ? 0 : (item.durationHours || 2)), 0);
                    if (usedActivitiesH > availableStopoverWindow && items.length > 0) {
                      return <span>⚠️ Time Window Exceeded — Reduce Hours to Book</span>;
                    }
                    return <span>Proceed to Checkout &rarr;</span>;
                  })()}
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Step Coordinates Modal Overlay */}
      {selectedRouteNode && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-sm rounded-3xl p-6 relative space-y-4 shadow-2xl text-white">
            <button
              onClick={() => setSelectedRouteNode(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              {selectedRouteNode === 't2' ? '📍 Terminal 2 Route Coordinates' : '🏨 Stay Node Route Coordinates'}
            </h3>
            <div className="space-y-2 text-xs font-mono text-slate-300 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              {selectedRouteNode === 't2' ? (
                <>
                  <div>Node: CSMIA T2 Departures</div>
                  <div>Lat: 19.0896° N</div>
                  <div>Long: 72.8656° E</div>
                  <div className="text-rose-400 mt-1">Chauffeur pick-up zone: Pillar 4B</div>
                </>
              ) : (
                <>
                  <div>Node: Niranta Airport Stay</div>
                  <div>Lat: 19.0885° N</div>
                  <div>Long: 72.8679° E</div>
                  <div className="text-emerald-400 mt-1">Transit access gate: Security Corridor 2</div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
