'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
} from 'lucide-react';

export default function MyItineraryPage() {
  const [totalHours, setTotalHours] = useState('8.0 Hours');
  const [usedHours, setUsedHours] = useState('4.5 Hours');
  const [remainingHours, setRemainingHours] = useState('3.5 Hours');
  const [percentUsed, setPercentUsed] = useState(55);

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
    const saved = localStorage.getItem('layoverx_draft');
    if (saved) {
      try {
        const draft = JSON.parse(saved);
        if (draft.arrivalTime && draft.departureTime) {
          const arrDate = new Date(draft.arrivalTime);
          const depDate = new Date(draft.departureTime);
          const diffMs = depDate.getTime() - arrDate.getTime();
          
          if (diffMs > 0) {
            const totalH = diffMs / (1000 * 60 * 60);
            const bufferH = 3.5; // immigration transit buffer
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
            const t2 = formatTime(new Date(arrDate.getTime() + 30 * 60 * 1000));
            const t3 = formatTime(new Date(arrDate.getTime() + 2 * 60 * 60 * 1000));
            const t4 = formatTime(new Date(arrDate.getTime() + 5.5 * 60 * 60 * 1000));
            const t5 = formatTime(new Date(depDate.getTime() - 2.5 * 60 * 60 * 1000));

            setItems([
              {
                id: '1',
                time: t1,
                title: 'Flight Arrival at CSMIA Terminal 2',
                detail: `Incoming Flight: ${draft.flightIn || 'EK-504'}. Flight status: On Time.`,
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
                cost: draft.selectedHotelId ? '₹3,499' : '₹0',
              },
              {
                id: '4',
                time: t4,
                title: 'Peshawri ITC Maratha Express Lunch',
                detail: `Table reserved for ${draft.travelers || '2'}. 5 mins from Terminal 2.`,
                badge: 'Dining',
                cost: draft.selectedDiningId ? '₹1,299' : '₹0',
              },
              {
                id: '5',
                time: t5,
                title: 'Return to Terminal 2 Departures',
                detail: 'Clear security for outgoing connection flight.',
                badge: 'Departure',
                cost: '₹0',
              },
            ].filter(item => item.cost !== '₹0' || item.id === '1' || item.id === '2' || item.id === '5'));
          }
        }
      } catch (e) {
        console.warn('Failed to parse draft details:', e);
      }
    }
  }, []);

  const removeItem = (id: string) => {
    setItems(items.filter((i) => i.id !== id));
  };

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
                  {items.map((item) => (
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
                          <p className="text-xs text-slate-600">{item.detail}</p>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <span className="text-xs font-bold text-slate-900">{item.cost}</span>
                          {item.cost !== '₹0' && (
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-slate-400 hover:text-rose-600 text-xs transition"
                              title="Remove item"
                            >
                              <Trash2 size={15} />
                            </button>
                          )}
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

              {/* Checkout Card */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-md space-y-6">
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
                </div>

                <div className="border-t border-slate-100 pt-4 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-slate-900">Total Price</span>
                  <span className="text-2xl sm:text-3xl font-black text-[#0369a1]">
                    ₹{((items.some(i => i.badge === 'Hotel') ? 3499 : 0) + (items.some(i => i.badge === 'Dining') ? 1299 : 0)).toLocaleString()}
                  </span>
                </div>

                <Link 
                  href="/confirmation"
                  className="w-full py-4 bg-[#0369a1] hover:bg-[#075985] text-white font-extrabold text-sm rounded-xl transition shadow-md flex items-center justify-center gap-2 text-center"
                >
                  Proceed to Checkout &rarr;
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
