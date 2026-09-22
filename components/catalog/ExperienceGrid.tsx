'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Clock, Star, MapPin, Compass, RotateCcw, BedDouble, AlertCircle, ArrowRight } from 'lucide-react';
import { TOURS_DATA, Tour } from '@/data/layover-data';
import { useItinerary } from '@/context/itinerary-context';
import { useAuth } from '@/context/auth-context';
import { parseDurationToMinutes, validateLayoverTimes } from '@/lib/validations/layover';

export interface ExperienceGridProps {
  experiences?: Tour[];
  usableLayoverMinutes?: number;
  terminal?: string;
  initialCategory?: string;
}

export default function ExperienceGrid({
  experiences = TOURS_DATA,
  usableLayoverMinutes,
  terminal = 'csmia-t2',
  initialCategory = 'all',
}: ExperienceGridProps) {
  const router = useRouter();
  const { items = [], addToItinerary = () => {}, removeFromItinerary = () => {} } = useItinerary() || {};
  const { requireAuth } = useAuth();

  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [resolvedUsableMinutes, setResolvedUsableMinutes] = useState<number | null>(
    usableLayoverMinutes ?? null
  );

  // If usableLayoverMinutes prop is not directly provided, read stored calculator data
  useEffect(() => {
    if (usableLayoverMinutes !== undefined) {
      setResolvedUsableMinutes(usableLayoverMinutes);
      return;
    }

    try {
      const stored = localStorage.getItem('layoverx_calculator_data');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.arrivalTime && parsed.departureTime) {
          const res = validateLayoverTimes({
            arrivalTime: parsed.arrivalTime,
            departureTime: parsed.departureTime,
            terminal: parsed.destinationArea || terminal,
          });
          if (res.isValid) {
            setResolvedUsableMinutes(res.usableMinutes);
          }
        }
      }
    } catch {
      // Fallback: no filter restriction if no calculator data
    }
  }, [usableLayoverMinutes, terminal]);

  // Categories list
  const categories = [
    { id: 'all', label: 'All Activities' },
    { id: 'sightseeing', label: '📸 Sightseeing' },
    { id: 'culture', label: '🕌 Culture & Heritage' },
    { id: 'food', label: '🍲 Food Crawls' },
    { id: 'shopping', label: '🛍️ Shopping' },
    { id: 'nightlife', label: '🌙 Evening Views' },
  ];

  // Filtering: Category + Usable Time Check
  const filteredExperiences = useMemo(() => {
    return experiences.filter((tour) => {
      // 1. Category check
      if (activeCategory !== 'all' && tour.category !== activeCategory) {
        return false;
      }

      // 2. Usable time check: if usableLayoverMinutes is established and > 0
      if (resolvedUsableMinutes !== null && resolvedUsableMinutes > 0) {
        const tourDurationMins = parseDurationToMinutes(tour.duration);
        if (tourDurationMins > 0 && tourDurationMins > resolvedUsableMinutes) {
          return false;
        }
      }

      return true;
    });
  }, [experiences, activeCategory, resolvedUsableMinutes]);

  // Handler for scrolling to calculator or navigating to hub calculator
  const handleScrollToCalculator = () => {
    const el = document.getElementById('calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push('/#calculator');
    }
  };

  const usableHoursStr = resolvedUsableMinutes
    ? `${(resolvedUsableMinutes / 60).toFixed(1)} hrs`
    : null;

  return (
    <div className="w-full space-y-8">
      {/* Category Pills Header */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-[#0284C7] text-white shadow-md'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* When No Experiences Fit the Window */}
      {filteredExperiences.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-amber-300 rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-sm space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-amber-600 shadow-inner">
            <AlertCircle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300">
              BUFFER RESTRICTION ACTIVE
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              No experiences fit your current layover window.
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
              {usableHoursStr ? (
                <>
                  Your usable transit time of <strong className="text-slate-900">{usableHoursStr}</strong>{' '}
                  (after mandatory immigration and gate clearance) is shorter than the minimum itinerary
                  length for these city tours.
                </>
              ) : (
                <>
                  The activities in this category require a longer stopover buffer than your current schedule allows.
                </>
              )}
            </p>
          </div>

          {/* Action CTAs: Adjust Flight Buffer & View Express Lounges */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleScrollToCalculator}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-[0.98] cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-amber-400" />
              <span>Adjust Flight Buffer</span>
            </button>

            <Link
              href="/hotels"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0284C7] hover:bg-[#0369a1] text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-[0.98]"
            >
              <BedDouble className="w-4 h-4" />
              <span>View Express Lounges</span>
            </Link>
          </div>
        </div>
      ) : (
        /* Experiences Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredExperiences.map((tour) => {
            const isAdded = items.some((item) => item.id === tour.id);

            return (
              <article
                key={tour.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative w-full h-48 sm:h-52">
                    <Image
                      src={tour.image}
                      alt={tour.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <span className="absolute top-3 left-3 bg-amber-600/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                      📸 {(tour.category || 'Sightseeing').toUpperCase()}
                    </span>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
                      <span className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2 py-1 rounded-md">
                        <Clock size={13} className="text-amber-400" /> {tour.duration}
                      </span>
                      <span className="bg-black/50 backdrop-blur-md px-2 py-1 rounded-md text-amber-300 font-bold flex items-center gap-1">
                        <Star size={13} className="fill-amber-400 text-amber-400" /> {tour.rating}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <h4 className="font-bold text-slate-900 text-base leading-snug">{tour.name}</h4>
                    <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">
                      {tour.description}
                    </p>
                    {tour.location && (
                      <div className="text-[11px] text-slate-400 flex items-center gap-1 pt-1">
                        <MapPin size={12} className="text-sky-600" />
                        <span>{tour.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between gap-3 mt-3">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">
                      Price Per Guest
                    </span>
                    <strong className="text-base font-black text-slate-900">{tour.price}</strong>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/service-details?id=${tour.id}`}
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                    >
                      Details
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        if (isAdded) {
                          removeFromItinerary(tour.id);
                        } else {
                          requireAuth(() => {
                            addToItinerary({
                              id: tour.id,
                              title: tour.name,
                              type: 'tour',
                              price: tour.price,
                              cost: tour.price,
                              durationHours: parseDurationToMinutes(tour.duration) / 60 || 4.0,
                              image: tour.image,
                              location: tour.location || 'Mumbai',
                              detail: `Duration: ${tour.duration} (${tour.safeWindow || 'Safe Return Guaranteed'})`,
                              badge: 'Tour',
                            });
                          });
                        }
                      }}
                      className={`px-3.5 py-2 font-bold text-xs rounded-xl shadow transition cursor-pointer ${
                        isAdded
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          : 'bg-[#0284C7] hover:bg-[#0369a1] text-white'
                      }`}
                    >
                      {isAdded ? 'Added ✓' : 'Add to Plan'}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
