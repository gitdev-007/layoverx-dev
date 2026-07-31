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
import { calculateBookingTotal } from '@/lib/pricing';

export default function MyItineraryPage() {
  const router = useRouter();
  const { user } = useAuth();
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

  const [items, setItems] = useState([
    {
      id: '1',
      time: '10:00 AM',
      title: 'Flight Arrival at CSMIA Terminal 2',
      detail: 'Air India AI 102 from JFK. Flight status: On Time.',
      badge: 'Arrival',
      cost: '₹0',
    },
    {
      id: '2',
      time: '11:30 AM',
      title: 'Immigration & Baggage Clearance',
      detail: 'Estimated clearance time: 45 minutes.',
      badge: 'Security',
      cost: '₹0',
    },
    {
      id: '3',
      time: '12:00 PM',
      title: 'Niranta Transit Hotel Micro-Stay Check-In',
      detail: '3-Hour rest room booked. Booking #LX-BOM-88329.',
      badge: 'Hotel',
      cost: '₹3,499',
    },
    {
      id: '4',
      time: '03:30 PM',
      title: 'Peshawri ITC Maratha Express Lunch',
      detail: 'Table reserved for 2. 5 mins from Terminal 2.',
      badge: 'Dining',
      cost: '₹1,299',
    },
    {
      id: '5',
      time: '05:30 PM',
      title: 'Return to Terminal 2 Departures',
      detail: 'Clear security for outgoing flight UK 985 to Delhi.',
      badge: 'Departure',
      cost: '₹0',
    },
  ]);

  React.useEffect(() => {
    let arrivalTime = '';
    let departureTime = '';
    let flightIn = '';
    let travelers = '2';

    try {
      const calcData = localStorage.getItem('layoverx_calculator_data');
      if (calcData) {
        const parsed = JSON.parse(calcData);
        if (parsed.arrivalTime) arrivalTime = parsed.arrivalTime;
        if (parsed.departureTime) departureTime = parsed.departureTime;
        if (parsed.travelers) travelers = parsed.travelers;
      }
    } catch {}

    try {
      const saved = localStorage.getItem('layoverx_draft');
      if (saved) {
        const draft = JSON.parse(saved);
        if (draft.passportCountry) setPassportCountry(draft.passportCountry);
        if (draft.currency) setCurrency(draft.currency);
        if (!arrivalTime && draft.arrivalTime) arrivalTime = draft.arrivalTime;
        if (!departureTime && draft.departureTime) departureTime = draft.departureTime;
        if (draft.flightIn) flightIn = draft.flightIn;
        if (draft.travelers) travelers = draft.travelers;
      }
    } catch (e) {
      console.warn('Failed to parse draft details:', e);
    }

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

        const formatTime = (date: Date) => {
          return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        };

        const t1 = formatTime(arrDate);
        const t2 = formatTime(new Date(arrDate.getTime() + 45 * 60 * 1000));
        const t3 = formatTime(new Date(arrDate.getTime() + 1.5 * 60 * 60 * 1000));
        const t4 = formatTime(new Date(arrDate.getTime() + 5.0 * 60 * 60 * 1000));
        const t5 = formatTime(new Date(depDate.getTime() - 2.5 * 60 * 60 * 1000));

        setItems([
          {
            id: '1',
            time: t1,
            title: 'Flight Arrival at CSMIA Terminal 2',
            detail: `Incoming Flight: ${flightIn || 'AI 102 from JFK'}. Flight status: On Time.`,
            badge: 'Arrival',
            cost: '₹0',
          },
          {
            id: '2',
            time: t2,
            title: 'Immigration & Baggage Clearance',
            detail: 'Estimated clearance time: 45 minutes.',
            badge: 'Security',
            cost: '₹0',
          },
          {
            id: '3',
            time: t3,
            title: 'Niranta Transit Hotel Micro-Stay Check-In',
            detail: '3-Hour rest room booked. Booking #LX-BOM-88329.',
            badge: 'Hotel',
            cost: '₹3,499',
          },
          {
            id: '4',
            time: t4,
            title: 'Peshawri ITC Maratha Express Lunch',
            detail: `Table reserved for ${travelers}. 5 mins from Terminal 2.`,
            badge: 'Dining',
            cost: '₹1,299',
          },
          {
            id: '5',
            time: t5,
            title: 'Return to Terminal 2 Departures',
            detail: 'Clear security for outgoing connection flight.',
            badge: 'Departure',
            cost: '₹0',
          },
        ]);
      }
    }
  }, []);

  const moveItemUp = (index: number) => {
    if (index <= 0) return;
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[index - 1];
    newItems[index - 1] = temp;
    setItems(newItems);
  };

  const moveItemDown = (index: number) => {
    if (index >= items.length - 1) return;
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[index + 1];
    newItems[index + 1] = temp;
    setItems(newItems);
  };

  const removeItem = (id: string) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const rawBaseAmount = (items.some(i => i.badge === 'Hotel') ? 3499 : 0) + (items.some(i => i.badge === 'Dining') ? 1299 : 0);
  const pricingBreakdown = calculateBookingTotal(rawBaseAmount || 3499);

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

                {/* Progress Bar Indicators */}
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-xs font-bold text-slate-700">
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <span className="text-slate-500 block text-[10px] uppercase tracking-wider mb-0.5">Total Layover</span>
                      <strong className="text-sm font-extrabold text-slate-900">{totalHours}</strong>
                    </div>
                    <div className="bg-sky-50 p-3 rounded-2xl border border-sky-100">
                      <span className="text-[#0369a1] block text-[10px] uppercase tracking-wider mb-0.5">Used Hours</span>
                      <strong className="text-sm font-extrabold text-[#0369a1]">{usedHours}</strong>
                    </div>
                    <div className="bg-indigo-50 p-3 rounded-2xl border border-indigo-100">
                      <span className="text-indigo-600 block text-[10px] uppercase tracking-wider mb-0.5">Remaining Window</span>
                      <strong className="text-sm font-extrabold text-indigo-900">{remainingHours}</strong>
                    </div>
                  </div>

                  <div className="relative w-full h-3.5 bg-slate-100 rounded-full overflow-hidden flex border border-slate-200">
                    <div 
                      className="h-full bg-[#0369a1] transition-all duration-500" 
                      style={{ width: `${percentUsed}%` }}
                    ></div>
                    <div 
                      className="h-full bg-slate-300 transition-all duration-500"
                      style={{ width: `${100 - percentUsed}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-bold uppercase tracking-wider px-1">
                    <span>🛫 Landing</span>
                    <span>Buffer (Immigration/Transit)</span>
                    <span>🛬 Takeoff</span>
                  </div>
                </div>
              </div>

              {/* Sequence List */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900">Timeline Sequence</h3>
                  <span className="text-xs text-slate-500 font-semibold">{items.length} items</span>
                </div>

                <div className="relative border-l-2 border-sky-200 ml-4 space-y-6 pl-8">
                  {items.map((item, idx) => (
                    <div key={item.id} className="relative group">
                      <div className="absolute -left-[41px] top-0 w-7 h-7 rounded-full bg-[#0369a1] text-white flex items-center justify-center text-xs font-bold shadow">
                        ✓
                      </div>

                      <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-1 flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-extrabold text-[#0369a1]">{item.time}</span>
                            <span className="text-[10px] font-bold text-slate-600 bg-slate-200 px-2 py-0.5 rounded">
                              {item.badge}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                          <p className="text-xs text-slate-600 flex items-center gap-1.5 relative">
                            {item.detail}
                            {item.cost !== '₹0' && (
                              <span 
                                className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-sky-100 text-sky-700 text-[9px] font-black cursor-help relative group/tooltip" 
                                title="Package Details Summary"
                              >
                                ?
                                <span className="hidden group-hover/tooltip:block absolute left-full ml-1 bottom-full bg-slate-900 text-white text-[9px] p-1.5 rounded border border-slate-800 shadow-xl whitespace-nowrap z-50">
                                  Includes 24/7 terminal airport shuttle & baggage assistance.
                                </span>
                              </span>
                            )}
                          </p>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <span className="text-xs font-bold text-slate-900">{item.cost}</span>
                          
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
                            {item.cost !== '₹0' && (
                              <button
                                type="button"
                                onClick={() => removeItem(item.id)}
                                className="p-1 text-slate-400 hover:text-rose-600 transition"
                                title="Remove item"
                              >
                                <Trash2 size={14} />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Control Panel */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Draft Management Card */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Draft Management
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <button className="py-2.5 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-2">
                    <Save size={14} /> Save Draft
                  </button>
                  <button className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 transition flex items-center justify-center gap-2">
                    <Copy size={14} /> Duplicate
                  </button>
                </div>
              </div>

              {/* AI Co-Pilot Card */}
              <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl space-y-4 border border-slate-800">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                  <h3 className="font-extrabold text-base">AI Stopover Co-Pilot</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Need an optimized plan? The co-pilot reads your layover window to auto-select recommendations.
                </p>
                <button className="w-full py-3 bg-[#0369a1] hover:bg-[#075985] text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-2">
                  ✨ Optimize Schedule With AI
                </button>
              </div>

              {/* Dynamic Path Map Card */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900">CSMIA Transfer Route Map</h3>
                  <span className="bg-sky-50 text-[#0369a1] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                    Chauffeur Live
                  </span>
                </div>
                <div className="relative w-full h-44 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 opacity-90"></div>
                  
                  <svg className="absolute inset-0 w-full h-full p-4" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path 
                      d={pathD} 
                      fill="none" 
                      stroke="#1e293b" 
                      strokeWidth="2" 
                      strokeDasharray="4 4"
                    />
                    <path 
                      d={pathD} 
                      fill="none" 
                      stroke="#0284c7" 
                      strokeWidth="2" 
                      className="animate-dash"
                      style={{
                        strokeDasharray: '100',
                        strokeDashoffset: '100',
                      }}
                    />
                    
                    <circle cx="10" cy="80" r="4" fill="#ef4444" className="animate-pulse" />
                    <circle cx="90" cy="40" r="4" fill="#22c55e" className="animate-pulse" />

                    {/* Animated Telemetry Car Indicator */}
                    <g>
                      <circle r="4" fill="#38bdf8" />
                      <animateMotion 
                        dur="6s" 
                        repeatCount="indefinite" 
                        path={pathD}
                      />
                    </g>
                  </svg>
                  
                  {/* Tooltip Badges */}
                  <button
                    type="button"
                    onClick={() => setSelectedRouteNode('t2')}
                    className="absolute bottom-8 left-4 bg-slate-900/90 text-white border border-slate-800 text-[10px] p-2 rounded-lg pointer-events-auto cursor-pointer group z-10 transition hover:bg-slate-800"
                    title="Click to view T2 GPS Coordinates"
                  >
                    📍 T2 Node
                    <div className="hidden group-hover:block absolute left-0 bottom-full mb-1 bg-slate-950 border border-slate-800 p-1.5 rounded text-[9px] text-rose-400 whitespace-nowrap">
                      Start point (CSMIA Term 2)
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRouteNode('stay')}
                    className="absolute top-8 right-4 bg-slate-900/90 text-white border border-slate-800 text-[10px] p-2 rounded-lg pointer-events-auto cursor-pointer group z-10 transition hover:bg-slate-800"
                    title="Click to view Stay GPS Coordinates"
                  >
                    🏨 Stay Node
                    <div className="hidden group-hover:block absolute right-0 bottom-full mb-1 bg-slate-950 border border-slate-800 p-1.5 rounded text-[9px] text-emerald-400 whitespace-nowrap">
                      12m Chauffeur transfer distance
                    </div>
                  </button>

                  {/* Map Controls */}
                  <div className="absolute bottom-2 right-2 flex flex-col gap-1 z-10">
                    <button
                      type="button"
                      onClick={() => alert('Map Zoomed In')}
                      className="w-5 h-5 bg-slate-900 border border-slate-800 text-white rounded flex items-center justify-center text-[10px] hover:bg-slate-800 transition"
                      title="Zoom In"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => alert('Map Zoomed Out')}
                      className="w-5 h-5 bg-slate-900 border border-slate-800 text-white rounded flex items-center justify-center text-[10px] hover:bg-slate-800 transition"
                      title="Zoom Out"
                    >
                      -
                    </button>
                  </div>

                  {/* Traffic Level Selector */}
                  <div className="absolute bottom-2 left-20 bg-slate-900/90 border border-slate-800 text-white rounded p-1 text-[9px] flex gap-1 z-10">
                    <button
                      type="button"
                      onClick={() => setTrafficLevel('normal')}
                      className={`px-1.5 py-0.5 rounded transition font-bold ${trafficLevel === 'normal' ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                    >
                      🟢 Normal
                    </button>
                    <button
                      type="button"
                      onClick={() => setTrafficLevel('heavy')}
                      className={`px-1.5 py-0.5 rounded transition font-bold ${trafficLevel === 'heavy' ? 'bg-amber-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                    >
                      🔴 Heavy
                    </button>
                  </div>

                  <span className="absolute bottom-2 left-2 text-[9px] font-bold text-slate-400 bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-800">
                    Terminal 2
                  </span>
                  <span className="absolute top-2 right-2 text-[9px] font-bold text-slate-400 bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-800">
                    Stay / Dining Node
                  </span>
                </div>

                {/* Live Chauffeur Countdown Status */}
                <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-center flex items-center justify-between gap-3 text-xs text-white">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    <span className="font-bold">Live Chauffeur Status</span>
                  </div>
                  <div className="font-mono bg-slate-950 px-2.5 py-1 rounded border border-slate-800 text-sky-400 font-bold">
                    🚗 Pickup in {countdown.min}:{countdown.sec < 10 ? `0${countdown.sec}` : countdown.sec}
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Estimated transit distance: 3.2 km. Route is calculated dynamically based on traffic. Current traffic mode: <strong className="text-slate-800 uppercase">{trafficLevel}</strong>. Est. travel duration: <strong className="text-slate-900">{trafficLevel === 'normal' ? '12 min' : '24 min'}</strong>.
                </p>
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
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                  className="w-full py-4 bg-[#0369a1] hover:bg-[#075985] disabled:opacity-50 text-white font-extrabold text-sm rounded-xl transition shadow-md flex items-center justify-center gap-2 text-center cursor-pointer"
                >
                  {checkoutLoading ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" /> Creating Order & Launching Razorpay...
                    </>
                  ) : (
                    <>
                      Proceed to Checkout &rarr;
                    </>
                  )}
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
