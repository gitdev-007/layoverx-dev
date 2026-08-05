'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { HOTELS_DATA, RESTAURANTS_DATA, SPAS_DATA, GAMING_DATA, TOURS_DATA, Hotel as HotelItem, Restaurant, Spa, GamingLounge, Tour } from '@/data/layover-data';
import { holdSlot, fetchServices, uploadTicket, createCheckoutOrder, verifyPayment } from '@/lib/api';
import { calculateBookingTotal } from '@/lib/pricing';
import LayoverCalculatorForm from '@/components/LayoverCalculatorForm';
import { useItinerary, calculateDynamicCabDriveTime } from '@/context/itinerary-context';
import { useAuth } from '@/context/auth-context';
import TimelineHeader from '@/components/TimelineHeader';
import { calculateRouteMetrics, estimateCabFare } from '@/utils/routeCalculator';

import {
  Plane,
  Clock,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Car,
  Hotel as HotelIcon,
  Utensils,
  Compass,
  Sparkles,
  Gamepad2,
  User,
  FileText,
  Bookmark,
  Share2,
  ChevronLeft,
  ChevronRight,
  Upload,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export default function PlanMyLayoverPage() {
  const [destinationArea, setDestinationArea] = useState('near-airport');
  const [arrivalTime, setArrivalTime] = useState('2026-07-28T10:00');
  const [departureTime, setDepartureTime] = useState('2026-07-28T18:00');
  const [travelers, setTravelers] = useState('2');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [isHolding, setIsHolding] = useState(false);

  const [hotelsList, setHotelsList] = useState<HotelItem[]>(HOTELS_DATA);
  const [diningList, setDiningList] = useState<Restaurant[]>(RESTAURANTS_DATA);
  const [toursList, setToursList] = useState<Tour[]>(TOURS_DATA);
  const [spasList, setSpasList] = useState<Spa[]>(SPAS_DATA);
  const [gamingList, setGamingList] = useState<GamingLounge[]>(GAMING_DATA);

  useEffect(() => {
    async function loadDynamicCatalog() {
      try {
        const data = await fetchServices();
        if (data && data.length > 0) {
          const hotelPods = data.filter(item => item.category === 'HOTEL_PODS');
          if (hotelPods.length > 0) {
            setHotelsList(hotelPods.map((item: any) => ({
              id: item.id,
              slotId: item.slotId || `slot_${item.id}_101`,
              name: item.name || item.title || '',
              terminal: item.terminal || item.vendor?.proximity || 'CSMIA Terminal 2',
              distance: item.distance || '0 km',
              rating: item.rating || 4.8,
              reviews: item.reviews || 1200,
              stars: 5,
              price3h: `₹${item.price || item.hourlyRate || 3499}`,
              price6h: `₹${Math.round((item.price || item.hourlyRate || 3499) * 1.4)}`,
              priceFullNight: `₹${Math.round((item.price || item.hourlyRate || 3499) * 1.8)}`,
              locationCategory: 'in-terminal',
              badge: item.badge || item.vendor?.proximity || 'Inside T2',
              amenities: item.amenities || ['🚿 Shower Facility', '⚡ Fast WiFi', '🛌 24/7 Check-in'],
              description: item.description || 'Hourly micro-stay transit accommodations.',
              image: item.image || item.imageUrl || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
            })));
          }

          const spas = data.filter(item => item.category === 'SPA');
          if (spas.length > 0) {
            setSpasList(spas.map((item: any) => ({
              id: item.id,
              slotId: item.slotId || `slot_${item.id}_101`,
              name: item.name || item.title || '',
              location: item.terminal || item.vendor?.proximity || 'Inside T2',
              distance: item.distance || '0 km',
              rating: item.rating || 4.8,
              reviews: item.reviews || 230,
              price: `₹${item.price || item.hourlyRate || 1999}`,
              duration: '45 Mins',
              treatment: item.description || 'Express Foot Reflexology & Back Relief',
              badge: item.badge || 'In-Terminal',
              amenities: item.amenities || ['🚿 Hot Rain Shower', '💆 Deep Tissue', '☕ Herbal Tea'],
              description: item.description || 'Express reflexology therapy inside Terminal 2.',
              image: item.image || item.imageUrl || 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
            })));
          }

          const gaming = data.filter(item => item.category === 'GAMING');
          if (gaming.length > 0) {
            setGamingList(gaming.map((item: any) => ({
              id: item.id,
              slotId: item.slotId || `slot_${item.id}_101`,
              name: item.name || item.title || '',
              location: item.terminal || item.vendor?.proximity || 'Terminal 2 Departures',
              distance: item.distance || '0 km',
              rating: item.rating || 4.7,
              reviews: item.reviews || 140,
              price: `₹${item.price || item.hourlyRate || 1499} / 3 Hours`,
              features: item.amenities || ['PS5 Pro Gaming Stations', 'High-Speed Fiber Wi-Fi'],
              description: item.description || 'High-tech gaming setup.',
              image: item.image || item.imageUrl || 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
            })));
          }

          const tours = data.filter(item => item.category === 'TOURS');
          if (tours.length > 0) {
            setToursList(tours.map((item: any) => ({
              id: item.id,
              name: item.name || item.title || '',
              duration: '5 Hours',
              safeWindow: '6+ Hr Layover Required',
              rating: item.rating || 4.9,
              reviews: item.reviews || 480,
              price: `₹${item.price || item.hourlyRate || 3999} per car`,
              badge: item.badge || 'Most Popular',
              highlights: item.amenities || ['Gateway of India', 'Taj Mahal Palace'],
              description: item.description || 'Explore Mumbai with private air-conditioned cars.',
              image: item.image || item.imageUrl || 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
            })));
          }

          const dining = data.filter(item => item.category === 'DINING' || item.category === 'dining');
          if (dining.length > 0) {
            setDiningList(dining.map((item: any) => ({
              id: item.id,
              name: item.name || item.title || '',
              cuisine: 'Coastal Seafood',
              category: 'seafood',
              location: item.terminal || item.vendor?.proximity || 'Vile Parle East',
              distance: item.distance || '3.5 km',
              rating: item.rating || 4.8,
              reviews: item.reviews || 940,
              avgCost: `₹${item.price || item.hourlyRate || 1800}`,
              transitTime: '15 mins taxi',
              badge: item.badge || '🦀 Seafood',
              amenities: item.amenities || ['🦀 Fresh Coastal', '🍷 Premium Lounge'],
              description: item.description || 'Authentic dining near airport.',
              image: item.image || item.imageUrl || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
            })));
          }
        }
      } catch (err) {
        console.warn('[PlanMyLayover] Failed to load dynamic services catalog:', err);
      }
    }
    loadDynamicCatalog();
  }, []);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const paramDest = params.get('destinationArea');
      const paramArr = params.get('arrivalTime');
      const paramDep = params.get('departureTime');
      const paramTrav = params.get('travelers');

      let savedData: any = null;
      try {
        const stored = localStorage.getItem('layoverx_calculator_data');
        if (stored) savedData = JSON.parse(stored);
      } catch {}

      const finalDest = paramDest || savedData?.destinationArea || 'csmia-t2';
      const finalArr = paramArr || savedData?.arrivalTime;
      const finalDep = paramDep || savedData?.departureTime;
      const finalTrav = paramTrav || savedData?.travelers || '2 Passengers';

      if (finalDest) setDestinationArea(finalDest);
      if (finalTrav) setTravelers(finalTrav);

      if (finalArr) {
        setArrivalTime(finalArr);
      } else {
        const now = new Date();
        const arr = new Date(now.getTime() + 2 * 60 * 60 * 1000);
        arr.setMinutes(0);
        setArrivalTime(arr.toISOString().slice(0, 16));
      }

      if (finalDep) {
        setDepartureTime(finalDep);
      } else {
        const now = new Date();
        const arr = new Date(now.getTime() + 2 * 60 * 60 * 1000);
        arr.setMinutes(0);
        const dep = new Date(arr.getTime() + 8 * 60 * 60 * 1000);
        setDepartureTime(dep.toISOString().slice(0, 16));
      }

      if (typeof window !== 'undefined' && window.location.hash.includes('step-5')) {
        setTimeout(() => {
          const step5El = document.getElementById('step-5-registration');
          if (step5El) {
            step5El.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 400);
      }
    }
  }, []);

  const handleSaveDraft = async () => {
    setValidationError(null);
    try {
      const metrics = await calculateRouteMetrics(contextItems);
      const fare = estimateCabFare(
        selectedCar?.title || 'Sedan',
        metrics.distanceKm,
        metrics.durationMins
      );

      // Lock in the calculated cab fare on the cab item cost
      const cabItem = contextItems.find((i) => i.badge === 'Cab' || i.type === 'transfer');
      if (cabItem) {
        cabItem.cost = `₹${fare}`;
      }

      // Update subtotal
      const currentEsim = selectedEsim ? 400 : 0;
      const currentVip = selectedVipBuggy ? 1999 : 0;
      const currentInter = onwardTerminal === 'T1' && interTerminalCabAddon ? 699 : 0;

      const lockedSubtotal = contextItems.reduce((sum, item) => {
        const numCost = parseInt((item.cost || '0').replace(/[^0-9]/g, '')) || 0;
        return sum + numCost;
      }, 0) + currentEsim + currentVip + currentInter;

      const totalP = lockedSubtotal + Math.round(lockedSubtotal * 0.18);

      setLastCalculatedCabFare(fare);
      setLastTotalPayable(totalP);

      // Save draft to Saved Itineraries list
      const planName = `Mumbai Stopover - ${totalLayoverHours.toFixed(1)}h (${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})`;
      saveCurrentPlan(planName, {
        cabFare: fare,
        subtotal: lockedSubtotal,
        gst: Math.round(lockedSubtotal * 0.18),
        totalPayable: totalP,
        itemsCount: contextItems.length,
      });

      // Persist draft to local storage
      const draftData = {
        destinationArea,
        arrivalTime,
        departureTime,
        travelers,
        selectedCab,
        selectedHotelId,
        selectedDiningId,
        selectedTourId,
        selectedSpaId,
        selectedGamingId,
        totalPrice: totalP,
        cabFare: fare,
        onwardTerminal,
        selectedEsim,
        selectedVipBuggy,
        interTerminalCabAddon,
      };
      localStorage.setItem('layoverx_draft', JSON.stringify(draftData));

      setIsDraftSaved(true);
      setShowPostSaveModal(true);
    } catch (err) {
      console.error('[SaveDraftError]', err);
      showToast('An error occurred while saving draft.', 'warning');
    }
  };

  const handleSharePlan = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Mumbai Stopover Plan - LayoverX',
        text: `Check out my stopover plan at CSMIA Mumbai for ₹${totalPrice.toLocaleString()}!`,
        url: window.location.href,
      }).catch((err) => console.warn(err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      setSaveStatus('Plan link copied to clipboard!');
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };
  const router = useRouter();
  const { requireAuth, user, openAuthModal } = useAuth();
  const { items: contextItems, savedPlans, saveCurrentPlan, deleteSavedPlan, loadSavedPlan, showToast, addItem, removeItem, availableWindowHours, selectedCar, totalLayoverHours } = useItinerary();
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const [showPostSaveModal, setShowPostSaveModal] = useState(false);
  const [lastCalculatedCabFare, setLastCalculatedCabFare] = useState<number | null>(null);
  const [lastTotalPayable, setLastTotalPayable] = useState<number | null>(null);
  const [highlightSaveDraft, setHighlightSaveDraft] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const trigger = params.get('triggerCheckout');
      if (trigger === 'true') {
        if (!isDraftSaved) {
          showToast("💾 Please save your draft first! Please click 'Save Draft' first to lock in transit estimates and calculate real-time cab pricing before booking.", "warning");
          setHighlightSaveDraft(true);
          setTimeout(() => setHighlightSaveDraft(false), 5000);
          const saveBtn = document.getElementById("save-draft-button");
          if (saveBtn) {
            saveBtn.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        } else {
          scrollToStep5();
        }
        
        // Clean up parameter
        const url = new URL(window.location.href);
        url.searchParams.delete('triggerCheckout');
        window.history.replaceState({}, '', url.pathname + url.search);
      }
    }
  }, [isDraftSaved]);

  useEffect(() => {
    setIsDraftSaved(false);
  }, [contextItems]);

  const [validationError, setValidationError] = useState<string | null>(null);

  const scrollToStep5 = () => {
    const step5El = document.getElementById('step-5-registration');
    if (step5El) {
      step5El.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Step selections (NO pre-selected defaults as requested)
  const [selectedCab, setSelectedCab] = useState<'sedan' | 'suv' | null>(null);
  const [selectedHotelId, setSelectedHotelId] = useState<string | null>(null);
  const [selectedDiningId, setSelectedDiningId] = useState<string | null>(null);
  
  // Step 4 Experience Tab State
  const [expTab, setExpTab] = useState<'tours' | 'spa' | 'gaming'>('tours');
  const [selectedTourId, setSelectedTourId] = useState<string | null>(null);
  const [selectedSpaId, setSelectedSpaId] = useState<string | null>(null);
  const [selectedGamingId, setSelectedGamingId] = useState<string | null>(null);

  // Step 5 Registration Inputs & Pillar 7 Hyper-Local Add-ons
  const [leadPassengerName, setLeadPassengerName] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [flightIn, setFlightIn] = useState('');
  const [pnr, setPnr] = useState('');
  const [flightOut, setFlightOut] = useState('');
  const [uploadedDocument, setUploadedDocument] = useState<File | null>(null);
  const [isDpdpConsented, setIsDpdpConsented] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [emergencyContact, setEmergencyContact] = useState('');
  const [currency, setCurrency] = useState<'INR' | 'USD' | 'EUR' | 'GBP'>('INR');

  // Pillar 7: Terminal Mismatch & Hyper-Local Services State
  const [onwardTerminal, setOnwardTerminal] = useState<'T2' | 'T1'>('T2');
  const [interTerminalCabAddon, setInterTerminalCabAddon] = useState(true);
  const [selectedEsim, setSelectedEsim] = useState(false);
  const [selectedVipBuggy, setSelectedVipBuggy] = useState(false);

  // Bi-Directional Synchronization Engine: Sync selection highlights when contextItems updates
  useEffect(() => {
    // Hotel
    const hotelItem = contextItems.find((i) => i.badge === 'Hotel');
    if (hotelItem) {
      const match = hotelsList.find(
        (h) =>
          h.name.toLowerCase() === hotelItem.title.toLowerCase() ||
          hotelItem.title.toLowerCase().includes(h.name.toLowerCase()) ||
          h.name.toLowerCase().includes(hotelItem.title.toLowerCase())
      );
      setSelectedHotelId(match ? match.id : null);
    } else {
      setSelectedHotelId(null);
    }

    // Dining
    const diningItem = contextItems.find((i) => i.badge === 'Dining');
    if (diningItem) {
      const match = diningList.find(
        (r) =>
          r.name.toLowerCase() === diningItem.title.toLowerCase() ||
          diningItem.title.toLowerCase().includes(r.name.toLowerCase()) ||
          r.name.toLowerCase().includes(diningItem.title.toLowerCase())
      );
      setSelectedDiningId(match ? match.id : null);
    } else {
      setSelectedDiningId(null);
    }

    // Tour
    const tourItem = contextItems.find((i) => i.badge === 'Tour');
    if (tourItem) {
      const match = toursList.find(
        (t) =>
          t.name.toLowerCase() === tourItem.title.toLowerCase() ||
          tourItem.title.toLowerCase().includes(t.name.toLowerCase()) ||
          t.name.toLowerCase().includes(tourItem.title.toLowerCase())
      );
      setSelectedTourId(match ? match.id : null);
    } else {
      setSelectedTourId(null);
    }

    // Spa
    const spaItem = contextItems.find((i) => i.badge === 'Spa');
    if (spaItem) {
      const match = spasList.find(
        (s) =>
          s.name.toLowerCase() === spaItem.title.toLowerCase() ||
          spaItem.title.toLowerCase().includes(s.name.toLowerCase()) ||
          s.name.toLowerCase().includes(spaItem.title.toLowerCase())
      );
      setSelectedSpaId(match ? match.id : null);
    } else {
      setSelectedSpaId(null);
    }

    // Gaming
    const gamingItem = contextItems.find((i) => i.badge === 'Gaming');
    if (gamingItem) {
      const match = gamingList.find(
        (g) =>
          g.name.toLowerCase() === gamingItem.title.toLowerCase() ||
          gamingItem.title.toLowerCase().includes(g.name.toLowerCase()) ||
          g.name.toLowerCase().includes(gamingItem.title.toLowerCase())
      );
      setSelectedGamingId(match ? match.id : null);
    } else {
      setSelectedGamingId(null);
    }

    // Cab
    if (selectedCar) {
      if (selectedCar.id === 'cab_suv' || selectedCar.title.toLowerCase().includes('suv')) {
        setSelectedCab('suv');
      } else {
        setSelectedCab('sedan');
      }
    } else {
      setSelectedCab(null);
    }
  }, [contextItems, selectedCar]);

  // Click handlers that mutate contextItems to ensure simultaneous 2-way sync
  const handleCabClick = (type: 'sedan' | 'suv') => {
    const targetId = type === 'sedan' ? 'cab_sedan' : 'cab_suv';
    const isCurrentlySelected = selectedCar?.id === targetId;
    if (isCurrentlySelected) return; // Strict Radio: already selected cab cannot be deselected by clicking again

    contextItems.filter((i) => i.badge === 'Cab' || i.type === 'transfer').forEach((i) => removeItem(i.id));

    addItem({
      id: targetId,
      badge: 'Cab',
      type: 'transfer',
      title: type === 'sedan' ? 'AC Sedan Transfer (Toyota Etios)' : 'AC SUV Transfer (Innova Crysta)',
      detail: type === 'sedan' ? 'Fits 4 Passengers, 2 Standard Bags. Verified Driver.' : 'Fits 6 Passengers, 4 Standard Bags. Extra comfort.',
      cost: type === 'sedan' ? '₹899' : '₹1,499',
      durationHours: 0.75,
    });
  };

  const handleHotelClick = (hotel: HotelItem) => {
    const existing = contextItems.find((i) => i.title.toLowerCase() === hotel.name.toLowerCase());
    if (existing) {
      removeItem(existing.id);
    } else {
      addItem({
        badge: 'Hotel',
        title: hotel.name,
        detail: `${hotel.terminal} • 6h slot`,
        cost: hotel.price6h,
        durationHours: 6.0,
      });
    }
  };

  const handleDiningClick = (restaurant: Restaurant) => {
    const existing = contextItems.find((i) => i.title.toLowerCase() === restaurant.name.toLowerCase());
    if (existing) {
      removeItem(existing.id);
    } else {
      addItem({
        badge: 'Dining',
        title: restaurant.name,
        detail: `${restaurant.cuisine} • ${restaurant.location}`,
        cost: restaurant.avgCost,
        durationHours: 1.5,
      });
    }
  };

  const handleTourClick = (tour: Tour) => {
    const existing = contextItems.find((i) => i.title.toLowerCase() === tour.name.toLowerCase());
    if (existing) {
      removeItem(existing.id);
    } else {
      addItem({
        badge: 'Tour',
        title: tour.name,
        detail: tour.duration,
        cost: tour.price,
        durationHours: 4.0,
      });
    }
  };

  const handleSpaClick = (spa: Spa) => {
    const existing = contextItems.find((i) => i.title.toLowerCase() === spa.name.toLowerCase());
    if (existing) {
      removeItem(existing.id);
    } else {
      addItem({
        badge: 'Spa',
        title: spa.name,
        detail: spa.treatment,
        cost: spa.price,
        durationHours: 1.0,
      });
    }
  };

  const handleGamingClick = (gaming: GamingLounge) => {
    const existing = contextItems.find((i) => i.title.toLowerCase() === gaming.name.toLowerCase());
    if (existing) {
      removeItem(existing.id);
    } else {
      addItem({
        badge: 'Gaming',
        title: gaming.name,
        detail: gaming.location,
        cost: gaming.price,
        durationHours: 2.0,
      });
    }
  };

  // Currency & Cost calculations & 18% GST Engine
  const currencyRates = {
    INR: 1,
    USD: 0.012,
    EUR: 0.011,
    GBP: 0.0094,
  };

  const currencySymbols = {
    INR: '₹',
    USD: '$',
    EUR: '€',
    GBP: '£',
  };

  const formatPrice = (val: number) => {
    const rate = currencyRates[currency];
    const symbol = currencySymbols[currency];
    return `${symbol}${Math.round(val * rate).toLocaleString()}`;
  };

  const esimPrice = selectedEsim ? 400 : 0;
  const vipBuggyPrice = selectedVipBuggy ? 1999 : 0;
  const interTerminalCabPrice = onwardTerminal === 'T1' && interTerminalCabAddon ? 699 : 0;

  const baseSubtotalINR =
    contextItems
      .filter((item) => isDraftSaved || (item.badge !== 'Cab' && item.type !== 'transfer'))
      .reduce((sum, item) => {
        const numCost = parseInt((item.cost || '0').replace(/[^0-9]/g, '')) || 0;
        return sum + numCost;
      }, 0) +
    esimPrice +
    vipBuggyPrice +
    interTerminalCabPrice;

  const pricingBreakdown = calculateBookingTotal(baseSubtotalINR, currency);
  const totalPrice = pricingBreakdown.grandTotalINR;


  // Pillar 5: Country Selection & Visa Smart Guardrails State
  const [passportCountry, setPassportCountry] = useState('India');
  const [showVisaModal, setShowVisaModal] = useState(false);
  const [visaAffirmed, setVisaAffirmed] = useState(false);
  const [visaBlocked, setVisaBlocked] = useState(false);

  const PASSPORT_COUNTRIES = [
    'India',
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
    'Germany',
    'France',
    'Singapore',
    'United Arab Emirates',
    'Japan',
    'China',
    'Brazil',
    'South Africa',
    'Other',
  ];

  // Service classification into AIRSIDE vs LANDSIDE
  const isLandsideServiceSelected = !!(selectedCab || selectedTourId || selectedDiningId);
  const isAirsideOnlyService = !isLandsideServiceSelected && !!(selectedHotelId || selectedSpaId || selectedGamingId);
  const selectedServiceCategory: 'AIRSIDE' | 'LANDSIDE' = isLandsideServiceSelected ? 'LANDSIDE' : 'AIRSIDE';

  const handleCountryChange = (country: string) => {
    setPassportCountry(country);
    if (country === 'United States') setCurrency('USD');
    else if (country === 'United Kingdom') setCurrency('GBP');
    else if (['Germany', 'France'].includes(country)) setCurrency('EUR');
    else if (country === 'India') setCurrency('INR');
    
    setVisaAffirmed(false);
    setVisaBlocked(false);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      validateAndSetFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      validateAndSetFile(file);
    }
  };

  const validateAndSetFile = (file: File) => {
    const validTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    if (!validTypes.includes(file.type)) {
      showToast("Invalid file type. Only PDF, PNG, JPG, and JPEG are accepted.", "warning");
      return;
    }
    
    if (file.size > maxSize) {
      showToast("File is too large. Maximum size allowed is 10MB.", "warning");
      return;
    }
    
    setUploadedDocument(file);
    showToast("File Attached successfully!", "success");
  };

  const launchRazorpay = (checkoutRes: any, parsedAmount: number, contactPhone: string, selectedEsim: boolean, selectedVipBuggy: boolean) => {
    const options = {
      key: checkoutRes.keyId,
      amount: checkoutRes.amount,
      currency: checkoutRes.currency,
      name: 'LayoverX',
      description: 'Mumbai Airport Layover Package',
      order_id: checkoutRes.orderId,
      prefill: {
        contact: contactPhone,
      },
      theme: {
        color: '#0284c7',
      },
      handler: async function (razorpayRes: any) {
        try {
          // Call Backend Verification
          const verifyRes = await verifyPayment({
            razorpay_order_id: razorpayRes.razorpay_order_id,
            razorpay_payment_id: razorpayRes.razorpay_payment_id,
            razorpay_signature: razorpayRes.razorpay_signature,
            bookingId: checkoutRes.bookingId,
          });

          if (verifyRes.success) {
            if (selectedEsim) {
              console.log(`[ACTION REQUIRED - eSIM]: Order #${checkoutRes.bookingId} purchased India eSIM for passenger. Phone: ${contactPhone}`);
            }
            if (selectedVipBuggy) {
              console.log(`[ACTION REQUIRED - VIP BUGGY]: Passenger booking landing at T2. Call Adani Pranaam Desk to confirm buggy.`);
            }
            // Redirect to booking-confirmation
            window.location.href = `/booking-confirmation?bookingId=${checkoutRes.bookingId}`;
          } else {
            showToast('Payment verification failed. Please contact support.', 'warning');
          }
        } catch (err: any) {
          console.error('Payment Verification error:', err);
          showToast(err.message || 'Payment verification failed. Please contact support.', 'warning');
        }
      },
      modal: {
        ondismiss: function () {
          setIsHolding(false);
        },
      },
    };

    // Ensure body, main and all parent wrappers do not have any CSS blur filters applied
    try {
      document.body.style.filter = 'none';
      const mainEl = document.querySelector('main');
      if (mainEl) mainEl.style.filter = 'none';
      const rootEl = document.getElementById('root');
      if (rootEl) rootEl.style.filter = 'none';
      const bodyChildren = document.querySelectorAll('body > div');
      bodyChildren.forEach((el: any) => {
        el.style.filter = 'none';
      });
    } catch (e) {
      console.warn('⚠️ Clear blur filters warning:', e);
    }

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  const performHoldSlot = async () => {
    setValidationError(null);
    setIsHolding(true);

    try {
      if (!uploadedDocument) {
        throw new Error('Please upload your e-ticket or boarding pass first.');
      }

      const activeUserId = 
        user?.id || 
        user?.usernamePrefix || 
        user?.email || 
        (typeof window !== 'undefined' && localStorage.getItem('username')) || 
        'testuser01';

      // Capture selected service details or default to mock if none selected
      const serviceId = selectedHotelId === 'h1' ? 'db01ad18-d911-4cdb-b73c-2518f2eee46a' : (selectedHotelId || 'srv-pod-mumbai-t2');
      const slotId = 'slot-1400';
      const parsedAmount = totalPrice || 1499;

      // 1. Upload ticket & create Razorpay order in a single request
      const checkoutRes = await createCheckoutOrder(
        uploadedDocument,
        emergencyContact,
        isDpdpConsented,
        activeUserId,
        parsedAmount,
        slotId,
        serviceId,
        contextItems
      );

      const draftData = {
        destinationArea,
        arrivalTime,
        departureTime,
        travelers,
        selectedCab,
        selectedHotelId,
        selectedDiningId,
        selectedTourId,
        selectedSpaId,
        selectedGamingId,
        totalPrice: parsedAmount,
        bookingId: checkoutRes.bookingId,
        paymentStatus: 'PENDING',
        expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
        leadPassengerName: checkoutRes.extracted?.pnr ? `Passenger (${checkoutRes.extracted.pnr})` : 'Passenger',
        passportNumber,
        passportCountry,
        flightIn: checkoutRes.extracted?.flights?.[0] || '',
        flightOut: checkoutRes.extracted?.flights?.[1] || '',
        pnr: checkoutRes.extracted?.pnr || '',
        emergencyContact,
        serviceCategory: selectedServiceCategory,
        visaAffirmed,
        currency,
        onwardTerminal,
        selectedEsim,
        selectedVipBuggy,
        interTerminalCabAddon,
        isDpdpConsented,
      };

      localStorage.setItem('layoverx_draft', JSON.stringify(draftData));

      // 2. Open Razorpay Checkout overlay
      if (typeof (window as any).Razorpay === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => {
          launchRazorpay(checkoutRes, parsedAmount, emergencyContact, !!selectedEsim, !!selectedVipBuggy);
        };
        document.body.appendChild(script);
      } else {
        launchRazorpay(checkoutRes, parsedAmount, emergencyContact, !!selectedEsim, !!selectedVipBuggy);
      }

    } catch (err: any) {
      console.warn('[Checkout Error]', err);
      let errMsg = err.message || 'Failed to initiate checkout. Please try again.';
      if (errMsg.startsWith('⚠️ ')) {
        errMsg = errMsg.replace('⚠️ ', '');
      }
      setValidationError(errMsg);
      setIsHolding(false);
    }
  };

  const handleProceedCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedDocument) {
      showToast('Please upload your e-ticket or boarding pass to proceed.', 'warning');
      return;
    }
    if (emergencyContact.trim().length < 8) {
      showToast('WhatsApp / Contact Phone is required (at least 8 characters).', 'warning');
      return;
    }
    if (!isDpdpConsented) {
      showToast('Please agree to allow LayoverX to process your e-ticket.', 'warning');
      return;
    }

    // Check available time limit vs activities duration
    if (availableWindowHours < 0 && contextItems.length > 0) {
      setValidationError(`⚠️ Time Limit Exceeded! Selected activities exceed the available stopover window. Please unselect an activity or select fewer hours.`);
      return;
    }

    // Visa Smart Guardrail: Non-Indian passport & Landside service
    if (passportCountry !== 'India' && selectedServiceCategory === 'LANDSIDE' && !visaAffirmed) {
      setShowVisaModal(true);
      return;
    }

    await performHoldSlot();
  };

  const isFormValid = !!(
    uploadedDocument &&
    emergencyContact.trim().length >= 8 &&
    isDpdpConsented
  );

  return (

    <div className="min-h-screen pb-24 bg-[#F8FAFC] text-[#0F172A]">
      
      {/* SEARCH INPUT & HERO SECTION */}
      <section className="bg-gray-900 text-white pt-20 sm:pt-24 pb-10 border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <nav className="flex items-center gap-2 text-xs text-gray-400" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-gray-600">/</span>
            <span className="text-white font-medium">Plan Layover</span>
          </nav>

          <LayoverCalculatorForm
            hideHeader
            hideSubmit
            initialValues={{ destinationArea, arrivalTime, departureTime, travelers }}
            onChange={(data) => {
              setDestinationArea(data.destinationArea);
              setArrivalTime(data.arrivalTime);
              setDepartureTime(data.departureTime);
              setTravelers(data.travelers);
            }}
            onSearch={(data) => {
              setDestinationArea(data.destinationArea);
              setArrivalTime(data.arrivalTime);
              setDepartureTime(data.departureTime);
              setTravelers(data.travelers);
            }}
          />

          {/* Quick-fill Templates */}

          <div className="flex items-center gap-2 flex-wrap text-xs text-gray-400 pt-1">
            <span className="font-semibold text-gray-300">⚡ Quick Transit Templates:</span>
            <button
              type="button"
              onClick={() => {
                setDestinationArea('near-airport');
                setTravelers('1');
              }}
              className="px-2.5 py-1 bg-gray-800 hover:bg-gray-700 text-white rounded-lg border border-gray-700 transition"
            >
              Short Airport Layover
            </button>
            <button
              type="button"
              onClick={() => {
                setDestinationArea('colaba');
                setTravelers('2');
              }}
              className="px-2.5 py-1 bg-gray-800 hover:bg-gray-700 text-white rounded-lg border border-gray-700 transition"
            >
              Colaba Heritage Tour
            </button>
            <button
              type="button"
              onClick={() => {
                setDestinationArea('bandra');
                setTravelers('3');
              }}
              className="px-2.5 py-1 bg-gray-800 hover:bg-gray-700 text-white rounded-lg border border-gray-700 transition"
            >
              Bandra Sea Link Day
            </button>
          </div>

        </div>
      </section>

      {/* PREMIUM SERVICE MARKETPLACE CAROUSEL */}
      <section className="bg-white border-b border-gray-100 py-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">Premium Service Marketplace</h2>
              <p className="text-gray-700 text-sm">Add luxury to your transit window</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition">
                <ChevronLeft size={16} className="text-gray-900" />
              </button>
              <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition">
                <ChevronRight size={16} className="text-gray-900" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pt-2">
            
            {/* Transit Hotels */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 hover:border-sky-300 transition duration-300 group flex flex-col justify-between">
              <div className="h-40 relative rounded-xl overflow-hidden mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=75"
                  alt="Hotels"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Transit Hotels</h3>
                <p className="text-gray-700 text-xs mb-4">Luxury day-rooms inside T2 or minutes away.</p>
              </div>
              <Link href="/hotels" className="text-sky-700 text-xs font-bold flex items-center gap-1 hover:underline">
                Explore Hotels &rarr;
              </Link>
            </div>

            {/* Transit Dining */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 hover:border-sky-300 transition duration-300 group flex flex-col justify-between">
              <div className="h-40 relative rounded-xl overflow-hidden mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=75"
                  alt="Dining"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Transit Dining</h3>
                <p className="text-gray-700 text-xs mb-4">Gourmet seafood and local fine dining guides.</p>
              </div>
              <Link href="/restaurants" className="text-sky-700 text-xs font-bold flex items-center gap-1 hover:underline">
                Explore Dining &rarr;
              </Link>
            </div>

            {/* Spa & Wellness */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 hover:border-sky-300 transition duration-300 group flex flex-col justify-between">
              <div className="h-40 relative rounded-xl overflow-hidden mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=75"
                  alt="Spa"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Spa & Wellness</h3>
                <p className="text-gray-700 text-xs mb-4">Express massages to melt away travel fatigue.</p>
              </div>
              <Link href="/spa-wellness" className="text-sky-700 text-xs font-bold flex items-center gap-1 hover:underline">
                Explore Spa &rarr;
              </Link>
            </div>

            {/* Gaming & Fun */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 hover:border-sky-300 transition duration-300 group flex flex-col justify-between">
              <div className="h-40 relative rounded-xl overflow-hidden mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=75"
                  alt="Gaming"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Gaming & Fun</h3>
                <p className="text-gray-700 text-xs mb-4">VR zones and entertainment hubs near terminal.</p>
              </div>
              <Link href="/gaming-entertainment" className="text-sky-700 text-xs font-bold flex items-center gap-1 hover:underline">
                Explore Gaming &rarr;
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* MAIN PLANNER WORKSPACE */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <TimelineHeader />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT COLUMN: BUILDER STEPS */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Step 1: Airport Cabs */}
              <div id="step-1-cabs" className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-xs">1</span>
                    <h2 className="text-lg font-bold text-gray-900">Choose Airport Transfer Cab</h2>
                  </div>
                  <span className="text-xs text-gray-700 font-semibold uppercase">SURGE PROOF FLAT RATES</span>
                </div>

                <div className="space-y-4">
                  <div
                    onClick={() => handleCabClick('sedan')}
                    className={`relative border rounded-xl p-4 flex items-center justify-between hover:border-sky-300 transition cursor-pointer select-card block ${
                      selectedCar?.id === 'cab_sedan' ? 'border-2 border-sky-600 bg-sky-50/20 ring-1 ring-sky-600' : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedCar?.id === 'cab_sedan' ? 'border-sky-600 bg-sky-600' : 'border-slate-300 bg-white'
                      }`}>
                        {selectedCar?.id === 'cab_sedan' && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 text-sm">AC Sedan Transfer (Toyota Etios)</h3>
                        <p className="text-gray-700 text-xs mt-0.5">Fits 4 Passengers, 2 Standard Bags. Verified Driver.</p>
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => handleCabClick('suv')}
                    className={`relative border rounded-xl p-4 flex items-center justify-between hover:border-sky-300 transition cursor-pointer select-card block ${
                      selectedCar?.id === 'cab_suv' ? 'border-2 border-sky-600 bg-sky-50/20 ring-1 ring-sky-600' : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedCar?.id === 'cab_suv' ? 'border-sky-600 bg-sky-600' : 'border-slate-300 bg-white'
                      }`}>
                        {selectedCar?.id === 'cab_suv' && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 text-sm">AC SUV Transfer (Innova Crysta)</h3>
                        <p className="text-gray-700 text-xs mt-0.5">Fits 6 Passengers, 4 Standard Bags. Extra comfort.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Transit Hotel */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-xs">2</span>
                    <h2 className="text-lg font-bold text-gray-900">Add Transit Hotel (Optional)</h2>
                  </div>
                  <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-lg">Hourly check-in</span>
                </div>

                <div className="space-y-4">
                  {hotelsList.slice(0, 2).map((h) => {
                    const isSelected = contextItems.some((item) => item.title.toLowerCase() === h.name.toLowerCase());
                    return (
                      <div
                        key={h.id}
                        onClick={() => handleHotelClick(h)}
                        className={`relative border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between hover:border-sky-300 transition cursor-pointer select-card block ${
                          isSelected ? 'border-[#0284C7] bg-sky-50/40' : 'border-gray-200 bg-white'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <input type="checkbox" checked={isSelected} readOnly className="rounded border-gray-300 text-sky-700 focus:ring-sky-500 mt-1 h-4 w-4 pointer-events-none" />
                          <div>
                            <h3 className="font-bold text-gray-800 text-sm flex items-center gap-2">
                              {h.name}
                              <span className="bg-sky-100 text-sky-700 text-xs font-bold px-1.5 py-0.5 rounded">
                                {h.locationCategory === 'in-terminal' ? 'Inside T2' : h.distance}
                              </span>
                            </h3>
                            <p className="text-gray-700 text-xs mt-0.5">⭐ {h.rating} | {h.description}</p>
                          </div>
                        </div>
                        <div className="text-right mt-2 sm:mt-0 flex-shrink-0">
                          <strong className="text-sky-700 text-sm block">{h.price6h} <span className="text-gray-700 text-xs font-normal">/6h</span></strong>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Dining */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-xs">3</span>
                    <h2 className="text-lg font-bold text-gray-900">Add Dining Reservation (Optional)</h2>
                  </div>
                  <span className="text-xs text-gray-700 font-semibold uppercase">PRE-BOOKED TABLES</span>
                </div>

                <div className="space-y-4">
                  {diningList.slice(0, 2).map((r) => {
                    const isSelected = contextItems.some((item) => item.title.toLowerCase() === r.name.toLowerCase());
                    return (
                      <div
                        key={r.id}
                        onClick={() => handleDiningClick(r)}
                        className={`relative border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between hover:border-sky-300 transition cursor-pointer select-card block ${
                          isSelected ? 'border-[#0284C7] bg-sky-50/40' : 'border-gray-200 bg-white'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <input type="checkbox" checked={isSelected} readOnly className="rounded border-gray-300 text-sky-700 focus:ring-sky-500 mt-1 h-4 w-4 pointer-events-none" />
                          <div>
                            <h3 className="font-bold text-gray-800 text-sm">{r.name}</h3>
                            <p className="text-gray-700 text-xs mt-0.5">⭐ {r.rating} | {r.location}. {r.description}</p>
                          </div>
                        </div>
                        <div className="text-right mt-2 sm:mt-0 flex-shrink-0">
                          <strong className="text-sky-700 text-sm block">{r.avgCost} <span className="text-gray-700 text-xs font-normal">for 2</span></strong>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Add Experiences with Tab Switcher */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 mb-6 gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-xs">4</span>
                    <h2 className="text-lg font-bold text-gray-900">Add Experiences (Optional)</h2>
                  </div>

                  <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200">
                    <button
                      type="button"
                      onClick={() => setExpTab('tours')}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                        expTab === 'tours' ? 'bg-white text-sky-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Tours
                    </button>
                    <button
                      type="button"
                      onClick={() => setExpTab('spa')}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                        expTab === 'spa' ? 'bg-white text-sky-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Spa & Wellness
                    </button>
                    <button
                      type="button"
                      onClick={() => setExpTab('gaming')}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                        expTab === 'gaming' ? 'bg-white text-sky-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Gaming
                    </button>
                  </div>
                </div>

                {/* Tab Content: Tours */}
                {expTab === 'tours' && (
                  <div className="space-y-4">
                    {toursList.slice(0, 2).map((t) => {
                      const isSelected = contextItems.some((item) => item.title.toLowerCase() === t.name.toLowerCase());
                      return (
                        <div
                          key={t.id}
                          onClick={() => handleTourClick(t)}
                          className={`relative border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between hover:border-sky-300 transition cursor-pointer select-card block ${
                            isSelected ? 'border-[#0284C7] bg-sky-50/40' : 'border-gray-200 bg-white'
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <input type="checkbox" checked={isSelected} readOnly className="rounded border-gray-300 text-sky-700 focus:ring-sky-500 mt-1 h-4 w-4 pointer-events-none" />
                            <div>
                              <h3 className="font-bold text-gray-800 text-sm">{t.name}</h3>
                              <p className="text-gray-700 text-xs mt-0.5">⭐ {t.rating} | ⏱️ {t.duration} duration. {t.highlights.join(', ')}</p>
                            </div>
                          </div>
                          <div className="text-right mt-2 sm:mt-0 flex-shrink-0">
                            <strong className="text-sky-700 text-sm block">{t.price} <span className="text-gray-700 text-xs font-normal">/ traveler</span></strong>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Tab Content: Spa */}
                {expTab === 'spa' && (
                  <div className="space-y-4">
                    {spasList.slice(0, 2).map((s) => {
                      const isSelected = contextItems.some((item) => item.title.toLowerCase() === s.name.toLowerCase());
                      return (
                        <div
                          key={s.id}
                          onClick={() => handleSpaClick(s)}
                          className={`relative border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between hover:border-sky-300 transition cursor-pointer select-card block ${
                            isSelected ? 'border-[#0284C7] bg-sky-50/40' : 'border-gray-200 bg-white'
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <input type="checkbox" checked={isSelected} readOnly className="rounded border-gray-300 text-sky-700 focus:ring-sky-500 mt-1 h-4 w-4 pointer-events-none" />
                            <div>
                              <h3 className="font-bold text-gray-800 text-sm">{s.name}</h3>
                              <p className="text-gray-700 text-xs mt-0.5">⭐ {s.rating} | {s.treatment}. ({s.duration})</p>
                            </div>
                          </div>
                          <div className="text-right mt-2 sm:mt-0 flex-shrink-0">
                            <strong className="text-sky-700 text-sm block">{s.price} <span className="text-gray-700 text-xs font-normal">/ session</span></strong>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Tab Content: Gaming */}
                {expTab === 'gaming' && (
                  <div className="space-y-4">
                    {gamingList.slice(0, 2).map((g) => {
                      const isSelected = contextItems.some((item) => item.title.toLowerCase() === g.name.toLowerCase());
                      return (
                        <div
                          key={g.id}
                          onClick={() => handleGamingClick(g)}
                          className={`relative border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between hover:border-sky-300 transition cursor-pointer select-card block ${
                            isSelected ? 'border-[#0284C7] bg-sky-50/40' : 'border-gray-200 bg-white'
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <input type="checkbox" checked={isSelected} readOnly className="rounded border-gray-300 text-sky-700 focus:ring-sky-500 mt-1 h-4 w-4 pointer-events-none" />
                            <div>
                              <h3 className="font-bold text-gray-800 text-sm">{g.name}</h3>
                              <p className="text-gray-700 text-xs mt-0.5">⭐ {g.rating} | {g.description}</p>
                            </div>
                          </div>
                          <div className="text-right mt-2 sm:mt-0 flex-shrink-0">
                            <strong className="text-sky-700 text-sm block">{g.price} <span className="text-gray-700 text-xs font-normal">/ person</span></strong>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Step 5: Passenger Registration */}
              <div id="review-and-passenger-registration">
                <div id="step-5-registration" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 text-slate-900">
                  
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-100 text-sky-700 font-bold text-sm">
                        5
                      </span>
                      <h3 className="text-xl font-bold text-slate-900">Review &amp; Passenger Verification</h3>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600"/>
                      Verified Safe
                    </span>
                  </div>

                  {!user ? (
                    <div className="p-8 border border-slate-200 rounded-xl bg-slate-50 text-center space-y-4">
                      <p className="text-sm font-semibold text-slate-800">
                        🔒 Authentication Required: You must be logged in to upload your e-ticket and complete your layover verification.
                      </p>
                      <button
                        type="button"
                        onClick={() => openAuthModal()}
                        className="py-3 px-6 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl text-xs shadow-md transition-all cursor-pointer active:scale-95"
                      >
                        Log In / Sign Up to Continue
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* 1. PRIMARY E-TICKET UPLOAD ZONE */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-800">
                      Upload E-Ticket or Boarding Pass <span className="text-sky-600">*</span>
                      <span className="block text-xs font-normal text-slate-500 mt-0.5">
                        Upload your PDF or ticket screenshot. Your flight numbers, PNR, and connection schedule will be synced automatically.
                      </span>
                    </label>

                    {!uploadedDocument ? (
                      <div
                        onDragOver={(e) => {
                          e.preventDefault();
                          setDragActive(true);
                        }}
                        onDragLeave={() => setDragActive(false)}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all group ${
                          dragActive 
                            ? 'border-sky-500 bg-sky-50/50' 
                            : 'border-slate-300 bg-slate-50 hover:bg-sky-50/40'
                        }`}
                        onClick={() => document.getElementById('ticket-upload-input')?.click()}
                      >
                        <input
                          type="file"
                          accept=".pdf,image/*"
                          className="hidden"
                          id="ticket-upload-input"
                          onChange={handleFileChange}
                        />
                        <label htmlFor="ticket-upload-input" className="cursor-pointer space-y-2 block" onClick={(e) => e.stopPropagation()}>
                          <div className="w-12 h-12 bg-white border border-slate-200 rounded-full flex items-center justify-center mx-auto shadow-sm group-hover:scale-105 transition-transform text-sky-600">
                            <Upload className="w-5 h-5"/>
                          </div>
                          <p className="text-sm font-medium text-slate-800">
                            <span className="text-sky-600 font-semibold underline">Click to upload</span> or drag &amp; drop your ticket PDF or image
                          </p>
                          <p className="text-xs text-slate-400">Supports PDF, PNG, JPG, JPEG (Max 10MB)</p>
                        </label>
                      </div>
                    ) : (
                      <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="w-8 h-8 text-emerald-600"/>
                          <div>
                            <p className="text-sm font-semibold text-emerald-900">{uploadedDocument.name}</p>
                            <p className="text-xs text-emerald-700">{(uploadedDocument.size / (1024 * 1024)).toFixed(2)} MB • Attached</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setUploadedDocument(null)}
                          className="text-xs text-rose-600 hover:text-rose-700 font-semibold underline px-2 py-1"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>

                  {/* 2. WHATSAPP / EMERGENCY CONTACT */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-1">
                      WhatsApp / Contact Phone <span className="text-sky-600">*</span>
                      <span className="block text-xs font-normal text-slate-500">
                        Used strictly by your driver &amp; concierge for airport arrival coordination.
                      </span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={emergencyContact}
                      onChange={(e) => setEmergencyContact(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all"
                    />
                  </div>

                  {/* 3. REASSURING PRIVACY & CONSENT BOX */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                    <div className="flex items-start gap-2.5">
                      <ShieldCheck className="w-5 h-5 text-sky-600 shrink-0 mt-0.5"/>
                      <div className="text-xs text-slate-600 leading-relaxed space-y-1">
                        <p className="font-semibold text-slate-800">Your privacy is fully protected</p>
                        <p>
                          We process your e-ticket strictly to verify flight timing and arrange your airport pickup. Uploaded documents are encrypted at rest and automatically deleted 48 hours after your trip.{' '}
                          <a href="/privacy" target="_blank" className="text-sky-600 underline font-medium hover:text-sky-700">
                            Privacy Policy
                          </a>
                        </p>
                      </div>
                    </div>

                    <label className="flex items-center gap-3 pt-2 border-t border-slate-200 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isDpdpConsented}
                        onChange={(e) => setIsDpdpConsented(e.target.checked)}
                        className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 border-slate-300 cursor-pointer"
                      />
                      <span className="text-xs font-medium text-slate-800">
                        I agree to allow LayoverX to process my e-ticket for trip coordination.
                      </span>
                    </label>
                  </div>

                  {/* 4. LANDSIDE VISA WARNING */}
                  <div className="bg-sky-50 border border-sky-200 rounded-xl p-3.5 flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-sky-700 shrink-0 mt-0.5"/>
                    <p className="text-xs text-sky-900 leading-relaxed">
                      <strong>Landside Notice:</strong> Exiting CSMIA terminals requires valid Indian immigration permission (e-Visa, Tourist Visa, Transit Visa, or OCI Card).
                    </p>
                  </div>

                  {validationError && (
                    <div className="p-3 text-xs font-bold text-rose-800 bg-rose-50 border border-rose-100 rounded-xl">
                      ⚠️ {validationError}
                    </div>
                  )}

                  {/* 5. SUBMIT / CHECKOUT BUTTON */}
                  <button
                    type="button"
                    disabled={!isFormValid || isHolding || availableWindowHours < 0}
                    onClick={(e) => {
                      if (!isDraftSaved) {
                        showToast("💾 Please save your draft first! Please click 'Save Draft' first to lock in transit estimates and calculate real-time cab pricing before booking.", "warning");
                        setHighlightSaveDraft(true);
                        setTimeout(() => setHighlightSaveDraft(false), 5000);
                        const btn = document.getElementById('save-draft-button');
                        if (btn) {
                          btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                        return;
                      }
                      handleProceedCheckout(e);
                    }}
                    className={`w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md ${
                      isFormValid && !isHolding && availableWindowHours >= 0
                        ? 'bg-sky-600 hover:bg-sky-700 text-white cursor-pointer active:scale-[0.99]'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {isHolding ? (
                      <>
                        <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                        Holding Slot...
                      </>
                    ) : (
                      '🚀 Proceed to Secure Checkout'
                    )}
                  </button>

                  {!isFormValid && (
                    <p className="text-center text-xs text-slate-400">
                      Please attach your e-ticket, enter your contact number, and check the privacy box to continue.
                    </p>
                  )}
                    </>
                  )}
                </div>
              </div>

            </div>

            {/* RIGHT SIDEBAR: BOOKING SUMMARY, TIMELINE, MAP */}
            <aside className="w-full lg:col-span-4 space-y-8 lg:sticky lg:top-24">
              
              {/* Booking Summary Card */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col space-y-4">
                {/* High-Trust Launch Badge */}
                <div className="bg-sky-50 border border-sky-200 rounded-xl p-2.5 text-center text-xs font-bold text-sky-900 flex items-center justify-center gap-1.5 shadow-sm">
                  <span>🚀 CSMIA T2 Launch Special — 24/7 Gate 2 Airport Concierge Included</span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest">BOOKING SUMMARY</h2>

                  <div className="flex gap-1 items-center">
                    {(['INR', 'USD', 'EUR', 'GBP'] as const).map((curr) => (
                      <button
                        key={curr}
                        type="button"
                        onClick={() => setCurrency(curr)}
                        className={`px-1.5 py-0.5 text-[9px] font-bold rounded transition border ${currency === curr ? 'bg-sky-500/10 border-sky-400 text-sky-700 font-extrabold' : 'bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100'}`}
                      >
                        {curr}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2.5 text-xs text-gray-800">
                  {contextItems.length === 0 ? (
                    <div className="text-slate-400 text-xs italic py-1 text-center">
                      No items selected. Choose options from steps on left.
                    </div>
                  ) : (
                    contextItems.map((item) => {
                      const numCost = parseInt((item.cost || '0').replace(/[^0-9]/g, '')) || 0;
                      const badgeIcon =
                        item.badge === 'Cab' ? '🚗' :
                        item.badge === 'Hotel' ? '🏨' :
                        item.badge === 'Dining' ? '🍽️' :
                        item.badge === 'Spa' ? '💆' :
                        item.badge === 'Gaming' ? '🎮' :
                        item.badge === 'Tour' ? '🌆' : '📌';

                      return (
                        <div key={item.id} className="flex justify-between items-center text-slate-800 font-medium">
                          <span className="truncate max-w-[190px]">
                            {badgeIcon} {item.title}
                          </span>
                          <strong className="text-slate-900">
                            {(item.badge === 'Cab' || item.type === 'transfer') && !isDraftSaved ? 'Calculated at Final Booking' : formatPrice(numCost)}
                          </strong>
                        </div>
                      );
                    })
                  )}

                  {selectedEsim && (
                    <div className="flex justify-between items-center text-sky-700 font-medium">
                      <span className="truncate max-w-[190px]">🇮🇳 Indian Tourist eSIM</span>
                      <strong>{formatPrice(400)}</strong>
                    </div>
                  )}

                  {selectedVipBuggy && (
                    <div className="flex justify-between items-center text-amber-700 font-medium">
                      <span className="truncate max-w-[190px]">⚡ VIP Aerobridge Escort &amp; Buggy</span>
                      <strong>{formatPrice(1999)}</strong>
                    </div>
                  )}

                  {onwardTerminal === 'T1' && interTerminalCabAddon && (
                    <div className="flex justify-between items-center text-indigo-700 font-medium">
                      <span className="truncate max-w-[190px]">🚕 T2 to T1 Private Transfer</span>
                      <strong>{formatPrice(699)}</strong>
                    </div>
                  )}
                </div>
                  <div className="border-t border-gray-100 pt-2 space-y-1.5 text-xs text-gray-600">
                    <div className="flex justify-between items-center">
                      <span>Subtotal (Base Price):</span>
                      <strong className="text-gray-900">{formatPrice(pricingBreakdown.basePriceINR)}</strong>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>GST (18% Tax):</span>
                      <strong className="text-gray-900">{formatPrice(pricingBreakdown.gstAmountINR)}</strong>
                    </div>
                  </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-end justify-between mb-1">
                    <div>
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">TOTAL PAYABLE</span>
                      <span className="text-[10px] text-gray-400">Inclusive of 18% GST</span>
                    </div>
                    <div className="text-2xl font-black text-[#0284C7] leading-none">{formatPrice(pricingBreakdown.grandTotalINR)}</div>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={isHolding || availableWindowHours < 0}
                  title={availableWindowHours < 0 ? "Please adjust your itinerary so available time is positive before proceeding." : ""}
                  onClick={() => {
                    if (!isDraftSaved) {
                      showToast("💾 Please save your draft first! Please click 'Save Draft' first to lock in transit estimates and calculate real-time cab pricing before booking.", "warning");
                      setHighlightSaveDraft(true);
                      setTimeout(() => setHighlightSaveDraft(false), 5000);
                      const btn = document.getElementById('save-draft-button');
                      if (btn) {
                        btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                      return;
                    }
                    scrollToStep5();
                  }}
                  className="h-12 flex items-center justify-center bg-[#0284C7] hover:bg-[#027ab1] disabled:bg-gray-400 text-white font-bold text-sm rounded-xl shadow-md transition w-full"
                >
                  {isHolding ? (
                    <>
                      <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                      Holding Slot...
                    </>
                  ) : (
                    'Continue to Book'
                  )}
                </button>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button 
                    id="save-draft-button"
                    onClick={() => handleSaveDraft()}
                    type="button"
                    className={`h-10 flex items-center justify-center font-bold text-xs rounded-xl shadow-sm transition gap-1.5 ${
                      highlightSaveDraft 
                        ? 'bg-amber-600 text-white ring-4 ring-amber-400 animate-bounce' 
                        : 'bg-gray-900 hover:bg-black text-white'
                    }`}
                  >
                    <Bookmark size={14} /> Save Draft
                  </button>
                  <button 
                    onClick={handleSharePlan}
                    type="button"
                    className="h-10 flex items-center justify-center bg-white hover:bg-gray-50 text-gray-900 font-bold text-xs rounded-xl border border-gray-200 shadow-sm transition gap-1.5"
                  >
                    <Share2 size={14} /> Share Plan
                  </button>
                </div>
                
                {saveStatus && (
                  <div className="p-2.5 text-center text-xs font-bold text-emerald-800 bg-emerald-50 rounded-xl border border-emerald-100 animate-pulse">
                    {saveStatus}
                  </div>
                )}
              </div>

              {/* Your Calculated Layover Timeline (Renamed from Smart AI Timeline as requested) */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <h2 className="text-sm font-bold text-gray-900">Your Calculated Layover Timeline</h2>
                  <span className="bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                    CHECKED
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  {(() => {
                    const arrDate = new Date(arrivalTime || Date.now());
                    const depDate = new Date(departureTime || Date.now() + 8 * 60 * 60 * 1000);
                    const formatT = (d: Date) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

                    const tLanding = formatT(arrDate);
                    const tPickup = formatT(new Date(arrDate.getTime() + 90 * 60 * 1000));
                    const tDropoff = formatT(new Date(depDate.getTime() - 120 * 60 * 1000));
                    const tTakeoff = formatT(depDate);

                    return (
                      <>
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-0.5">
                          <div className="font-bold text-slate-900">{tLanding} • 🛫 Landing & Customs Exit</div>
                          <div className="text-slate-500 text-[11px]">De-board and pass immigration (calculated wait buffer: 1.5h).</div>
                        </div>

                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-0.5">
                          <div className="font-bold text-slate-900">
                            {tPickup} • {selectedCab ? '🚖 Chauffeur Pickup' : contextItems.length > 0 ? `⭐ ${contextItems[0].title}` : '⭐ Transit Activity'}
                          </div>
                          <div className="text-slate-500 text-[11px]">
                            {selectedCab ? `Meet driver at Exit Gate 2 (${selectedCab.toUpperCase()}).` : contextItems.length > 0 ? `Enjoy ${contextItems[0].title}.` : 'Enjoy your scheduled transit window.'}
                          </div>
                        </div>

                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-0.5">
                          <div className="font-bold text-slate-900">{tDropoff} • 🚖 Airport Dropoff</div>
                          <div className="text-slate-500 text-[11px]">Driver drops you directly at departure ramp T2.</div>
                        </div>

                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-0.5">
                          <div className="font-bold text-slate-900">{tTakeoff} • 🛫 Takeoff & Departure</div>
                          <div className="text-slate-500 text-[11px]">Security cleared. Boarding at assigned gate. Safe travels!</div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* Estimated Travel Route Map */}
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-bold text-sm text-gray-900">Estimated Travel Route Map</h3>
                </div>
                <div className="h-44 relative">
                  <Image
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=400&q=75"
                    alt="Route Map"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* My Saved Itineraries */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <h2 className="text-sm font-bold text-gray-900">My Saved Itineraries</h2>
                  <span className="w-5 h-5 bg-sky-50 text-sky-700 rounded-full flex items-center justify-center text-xs font-bold">
                    {savedPlans.length}
                  </span>
                </div>
                {savedPlans.length === 0 ? (
                  <p className="text-xs text-gray-500 italic text-center py-2">
                    No saved itineraries. Build a plan and click "Save Plan" above.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {savedPlans.map((plan) => (
                      <div key={plan.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 pb-2 border-b border-slate-200/60">
                          <strong className="text-xs font-black text-slate-900 truncate max-w-[200px]">{plan.name}</strong>
                          <span className="text-[9px] text-slate-500 font-bold">{plan.createdAt}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-100">
                            {plan.itemsCount || plan.items.length} items included
                          </span>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-100">
                            ₹{(plan.totalPayable || plan.totalCost).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => loadSavedPlan(plan)}
                            className="flex-1 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-[10px] font-bold transition text-center"
                          >
                            Load Draft
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              loadSavedPlan(plan);
                              if (typeof window !== 'undefined') {
                                const step5El = document.getElementById('step-5-registration');
                                if (step5El) {
                                  step5El.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                              }
                            }}
                            className="flex-1 py-1.5 bg-[#0284C7] hover:bg-[#027ab1] text-white rounded-lg text-[10px] font-bold transition text-center"
                          >
                            Proceed to Checkout
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteSavedPlan(plan.id)}
                            className="p-1.5 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg transition"
                            title="Delete draft"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </aside>

          </div>
        </div>
      </section>

      {/* VISA AFFIRMATION MODAL */}
      {showVisaModal && (

        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
              <span className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-xl font-bold">
                🛂
              </span>
              <div>
                <h3 className="font-extrabold text-gray-900 text-base">Visa Smart Guardrail — CSMIA T2</h3>
                <p className="text-xs text-slate-500">Immigration Entry Verification Required</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 leading-relaxed font-medium">
                <p className="font-bold text-amber-950 mb-1">
                  Confirm you hold a valid Indian Tourist Visa, e-Visa, Transit Visa, or OCI Card to pass through CSMIA T2 Immigration.
                </p>
                <p>
                  You have selected <strong>Landside Services</strong> (Airport Cabs / City Tours / External Dining). Passengers with passport issuing country <strong>{passportCountry}</strong> must pass through Indian Immigration control at Terminal 2.
                </p>
              </div>

              {visaBlocked ? (
                <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-xs text-rose-900 space-y-3">
                  <div className="font-bold flex items-center gap-2 text-rose-950 text-sm">
                    <span>🚫 Landside Checkout Blocked</span>
                  </div>
                  <p>
                    Without a valid Indian visa, you cannot clear immigration to access landside transport or city tours.
                  </p>
                  <div className="bg-white p-3 rounded-xl border border-rose-200 space-y-1">
                    <span className="font-bold text-slate-900 block">Apply for official Indian e-Visa:</span>
                    <a
                      href="https://indianvisaonline.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-600 font-bold underline hover:text-sky-700 break-all block"
                    >
                      https://indianvisaonline.gov.in
                    </a>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-emerald-900 space-y-1">
                    <span className="font-bold block">🟢 Airside Transit Pod Alternative Offered:</span>
                    <p>
                      Switched your booking to <strong>In-Terminal Airside Transit Pods</strong>. No Indian Visa required as you remain in international transit!
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setShowVisaModal(false);
                      setVisaBlocked(false);
                      performHoldSlot();
                    }}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow transition"
                  >
                    Continue with Airside Transit Pods 🟢
                  </button>
                </div>
              ) : (
                <>
                  <label className="flex items-start gap-3 bg-slate-50 border border-slate-200 p-4 rounded-2xl cursor-pointer hover:bg-slate-100 transition">
                    <input
                      type="checkbox"
                      checked={visaAffirmed}
                      onChange={(e) => setVisaAffirmed(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                    />
                    <span className="text-xs text-slate-800 font-semibold leading-snug">
                      I confirm all passengers hold valid Indian Immigration clearance (Tourist Visa, e-Visa, Transit Visa, or OCI Card) required to exit Terminal 2.
                    </span>
                  </label>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="button"
                      disabled={!visaAffirmed}
                      onClick={() => {
                        setShowVisaModal(false);
                        performHoldSlot();
                      }}
                      className="flex-1 py-3.5 bg-sky-600 hover:bg-sky-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-xs rounded-xl shadow-md transition"
                    >
                      Confirm &amp; Continue Checkout
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setVisaBlocked(true);
                        // Deselect landside items, switch to airside transit pod
                        setSelectedTourId(null);
                        setSelectedDiningId(null);
                        setSelectedHotelId('h1'); // Airside Pod
                      }}
                      className="py-3.5 px-4 bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold text-xs rounded-xl transition border border-rose-200"
                    >
                      No Visa / Switch to Airside Pods
                    </button>
                  </div>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                setShowVisaModal(false);
                setVisaBlocked(false);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {showPostSaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full mx-4 shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 mb-2">
              <span>Itinerary Draft Saved Successfully!</span>
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              Your stopover path and transit buffers have been locked in.
            </p>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    const step5El = document.getElementById('step-5-registration');
                    if (step5El) {
                      step5El.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }
                  setShowPostSaveModal(false);
                }}
                className="w-full py-3 bg-[#0284C7] hover:bg-[#027ab1] text-white font-bold text-sm rounded-xl transition shadow-md"
              >
                Continue to Passenger Registration →
              </button>
              <button
                type="button"
                onClick={() => setShowPostSaveModal(false)}
                className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl transition"
              >
                Keep Editing
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

