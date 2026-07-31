'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { HOTELS_DATA, RESTAURANTS_DATA, SPAS_DATA, GAMING_DATA, TOURS_DATA, Hotel as HotelItem, Restaurant, Spa, GamingLounge, Tour } from '@/data/layover-data';
import { holdSlot, fetchServices } from '@/lib/api';
import { calculateBookingTotal } from '@/lib/pricing';
import LayoverCalculatorForm from '@/components/LayoverCalculatorForm';
import { useItinerary } from '@/context/itinerary-context';

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
            setHotelsList(hotelPods.map(item => ({
              id: item.id,
              slotId: item.slotId || `slot_${item.id}_101`,
              name: item.name,
              terminal: item.terminal || 'CSMIA Terminal 2',
              distance: item.distance || '0 km',
              rating: item.rating || 4.8,
              reviews: item.reviews || 1200,
              stars: 5,
              price3h: `₹${item.price || 3499}`,
              price6h: `₹${Math.round((item.price || 3499) * 1.4)}`,
              priceFullNight: `₹${Math.round((item.price || 3499) * 1.8)}`,
              locationCategory: 'in-terminal',
              badge: item.badge || 'Inside T2',
              amenities: item.amenities || ['🚿 Shower Facility', '⚡ Fast WiFi', '🛌 24/7 Check-in'],
              description: item.description || 'Hourly micro-stay transit accommodations.',
              image: item.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
            })));
          }

          const spas = data.filter(item => item.category === 'SPA');
          if (spas.length > 0) {
            setSpasList(spas.map(item => ({
              id: item.id,
              slotId: item.slotId || `slot_${item.id}_101`,
              name: item.name,
              location: item.terminal || 'Inside T2',
              distance: item.distance || '0 km',
              rating: item.rating || 4.8,
              reviews: item.reviews || 230,
              price: `₹${item.price || 1999}`,
              duration: '45 Mins',
              treatment: item.description || 'Express Foot Reflexology & Back Relief',
              badge: item.badge || 'In-Terminal',
              amenities: item.amenities || ['🚿 Hot Rain Shower', '💆 Deep Tissue', '☕ Herbal Tea'],
              description: item.description || 'Express reflexology therapy inside Terminal 2.',
              image: item.image || 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
            })));
          }

          const gaming = data.filter(item => item.category === 'GAMING');
          if (gaming.length > 0) {
            setGamingList(gaming.map(item => ({
              id: item.id,
              slotId: item.slotId || `slot_${item.id}_101`,
              name: item.name,
              location: item.terminal || 'Terminal 2 Departures',
              distance: item.distance || '0 km',
              rating: item.rating || 4.7,
              reviews: item.reviews || 140,
              price: `₹${item.price || 1499} / 3 Hours`,
              features: item.amenities || ['PS5 Pro Gaming Stations', 'High-Speed Fiber Wi-Fi'],
              description: item.description || 'High-tech gaming setup.',
              image: item.image || 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
            })));
          }

          const tours = data.filter(item => item.category === 'TOURS');
          if (tours.length > 0) {
            setToursList(tours.map(item => ({
              id: item.id,
              name: item.name,
              duration: '5 Hours',
              safeWindow: '6+ Hr Layover Required',
              rating: item.rating || 4.9,
              reviews: item.reviews || 480,
              price: `₹${item.price || 3999} per car`,
              badge: item.badge || 'Most Popular',
              highlights: item.amenities || ['Gateway of India', 'Taj Mahal Palace'],
              description: item.description || 'Explore Mumbai with private air-conditioned cars.',
              image: item.image || 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
            })));
          }

          const dining = data.filter(item => item.category === 'DINING' || item.category === 'dining');
          if (dining.length > 0) {
            setDiningList(dining.map(item => ({
              id: item.id,
              name: item.name,
              cuisine: 'Coastal Seafood',
              category: 'seafood',
              location: item.terminal || 'Vile Parle East',
              distance: item.distance || '3.5 km',
              rating: item.rating || 4.8,
              reviews: item.reviews || 940,
              avgCost: `₹${item.price || 1800}`,
              transitTime: '15 mins taxi',
              badge: item.badge || '🦀 Seafood',
              amenities: item.amenities || ['🦀 Fresh Coastal', '🍷 Premium Lounge'],
              description: item.description || 'Authentic dining near airport.',
              image: item.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
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
    }
  }, []);

  const handleSaveDraft = () => {
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
      totalPrice
    };
    localStorage.setItem('layoverx_draft', JSON.stringify(draftData));
    saveCurrentPlan(`Mumbai Plan (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`);
    setSaveStatus('Plan saved to My Saved Itineraries!');
    setTimeout(() => setSaveStatus(null), 3000);
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
  const { items: contextItems, savedPlans, saveCurrentPlan, deleteSavedPlan, loadSavedPlan, showToast } = useItinerary();
  const [validationError, setValidationError] = useState<string | null>(null);

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
  const [emergencyContact, setEmergencyContact] = useState('');
  const [currency, setCurrency] = useState<'INR' | 'USD' | 'EUR' | 'GBP'>('INR');

  // Pillar 7: Terminal Mismatch & Hyper-Local Services State
  const [onwardTerminal, setOnwardTerminal] = useState<'T2' | 'T1'>('T2');
  const [interTerminalCabAddon, setInterTerminalCabAddon] = useState(true);
  const [selectedEsim, setSelectedEsim] = useState(false);
  const [selectedVipBuggy, setSelectedVipBuggy] = useState(false);

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

  const cabPrice = selectedCab === 'sedan' ? 899 : selectedCab === 'suv' ? 1499 : 0;
  const hotelObj = hotelsList.find((h) => h.id === selectedHotelId);
  const hotelPrice = hotelObj ? parseInt(hotelObj.price6h.replace(/[^0-9]/g, '')) || 3499 : 0;
  
  const diningObj = diningList.find((r) => r.id === selectedDiningId);
  const diningPrice = diningObj ? parseInt(diningObj.avgCost.replace(/[^0-9]/g, '')) || 1800 : 0;

  const tourObj = toursList.find((t) => t.id === selectedTourId);
  const tourPrice = tourObj ? parseInt(tourObj.price.replace(/[^0-9]/g, '')) || 2899 : 0;

  const spaObj = spasList.find((s) => s.id === selectedSpaId);
  const spaPrice = spaObj ? parseInt(spaObj.price.replace(/[^0-9]/g, '')) || 1800 : 0;

  const gamingObj = gamingList.find((g) => g.id === selectedGamingId);
  const gamingPrice = gamingObj ? parseInt(gamingObj.price.replace(/[^0-9]/g, '')) || 1200 : 0;

  const esimPrice = selectedEsim ? 400 : 0;
  const vipBuggyPrice = selectedVipBuggy ? 1999 : 0;
  const interTerminalCabPrice = (onwardTerminal === 'T1' && interTerminalCabAddon) ? 699 : 0;

  const baseSubtotalINR = cabPrice + hotelPrice + diningPrice + tourPrice + spaPrice + gamingPrice + esimPrice + vipBuggyPrice + interTerminalCabPrice;
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

  const performHoldSlot = async () => {
    setValidationError(null);
    setIsHolding(true);

    try {
      // Capture selected service details or default to mock if none selected
      const serviceId = selectedHotelId === 'h1' ? 'db01ad18-d911-4cdb-b73c-2518f2eee46a' : 'srv-pod-mumbai-t2';
      const slotId = 'slot-1400';
      const userId = 'test-dev-user-01';

      const holdRes = await holdSlot({ userId, serviceId, slotId });
      
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
        totalPrice,
        bookingId: holdRes.bookingId || `bk_${Date.now()}`,
        paymentStatus: 'HELD',
        expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
        leadPassengerName,
        passportNumber,
        passportCountry,
        flightIn,
        emergencyContact,
        serviceCategory: selectedServiceCategory,
        visaAffirmed,
        currency,
        onwardTerminal,
        selectedEsim,
        selectedVipBuggy,
        interTerminalCabAddon,
      };

      if (selectedEsim) {
        console.log(`[ACTION REQUIRED - eSIM]: Order #${holdRes.bookingId || 'bk_draft'} purchased India eSIM for passenger ${leadPassengerName}. Passport: ${passportNumber}`);
      }
      if (selectedVipBuggy) {
        console.log(`[ACTION REQUIRED - VIP BUGGY]: Passenger ${leadPassengerName} flight ${flightIn} landing at T2. Call Adani Pranaam Desk to confirm buggy.`);
      }

      localStorage.setItem('layoverx_draft', JSON.stringify(draftData));
      
      router.push('/my-itinerary');

    } catch (err: any) {
      console.warn('[Checkout Hold Error]', err);
      let errMsg = err.message || 'This slot is currently held or booked by another traveler. Please select another time slot.';
      if (errMsg.startsWith('⚠️ ')) {
        errMsg = errMsg.replace('⚠️ ', '');
      }
      setValidationError(errMsg);
    } finally {
      setIsHolding(false);
    }
  };

  const handleProceedCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadPassengerName.trim()) {
      setValidationError('Lead Passenger Name is required.');
      return;
    }
    if (!passportNumber.trim()) {
      setValidationError('Passport / ID Number is required.');
      return;
    }
    if (!passportCountry.trim()) {
      setValidationError('Passport Issuing Country is required.');
      return;
    }
    if (!flightIn.trim()) {
      setValidationError('Incoming Flight Number is required.');
      return;
    }
    if (!emergencyContact.trim()) {
      setValidationError('Emergency Contact is required.');
      return;
    }

    // Visa Smart Guardrail: Non-Indian passport & Landside service
    if (passportCountry !== 'India' && selectedServiceCategory === 'LANDSIDE' && !visaAffirmed) {
      setShowVisaModal(true);
      return;
    }

    await performHoldSlot();
  };

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT COLUMN: BUILDER STEPS */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Step 1: Airport Cabs */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-xs">1</span>
                    <h2 className="text-lg font-bold text-gray-900">Choose Airport Transfer Cab</h2>
                  </div>
                  <span className="text-xs text-gray-700 font-semibold uppercase">SURGE PROOF FLAT RATES</span>
                </div>

                <div className="space-y-4">
                  <label
                    onClick={() => setSelectedCab('sedan')}
                    className={`relative border rounded-xl p-4 flex items-center justify-between hover:border-sky-300 transition cursor-pointer select-card block ${
                      selectedCab === 'sedan' ? 'border-[#0284C7] bg-sky-50/40' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <input type="radio" checked={selectedCab === 'sedan'} readOnly className="text-sky-700 focus:ring-sky-500 h-4 w-4 border-gray-300" />
                      <div>
                        <h3 className="font-bold text-gray-800 text-sm">AC Sedan Transfer (Toyota Etios)</h3>
                        <p className="text-gray-700 text-xs mt-0.5">Fits 4 Passengers, 2 Standard Bags. Verified Driver.</p>
                      </div>
                    </div>
                    <strong className="text-gray-900 text-sm">₹899 <span className="text-gray-700 text-xs font-normal">flat</span></strong>
                  </label>

                  <label
                    onClick={() => setSelectedCab('suv')}
                    className={`relative border rounded-xl p-4 flex items-center justify-between hover:border-sky-300 transition cursor-pointer select-card block ${
                      selectedCab === 'suv' ? 'border-[#0284C7] bg-sky-50/40' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <input type="radio" checked={selectedCab === 'suv'} readOnly className="text-sky-700 focus:ring-sky-500 h-4 w-4 border-gray-300" />
                      <div>
                        <h3 className="font-bold text-gray-800 text-sm">AC SUV Transfer (Innova Crysta)</h3>
                        <p className="text-gray-700 text-xs mt-0.5">Fits 6 Passengers, 4 Standard Bags. Extra comfort.</p>
                      </div>
                    </div>
                    <strong className="text-gray-900 text-sm">₹1,499 <span className="text-gray-700 text-xs font-normal">flat</span></strong>
                  </label>
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
                  {hotelsList.slice(0, 2).map((h) => (
                    <div
                      key={h.id}
                      onClick={() => setSelectedHotelId(selectedHotelId === h.id ? null : h.id)}
                      className={`relative border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between hover:border-sky-300 transition cursor-pointer select-card block ${
                        selectedHotelId === h.id ? 'border-[#0284C7] bg-sky-50/40' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <input type="checkbox" checked={selectedHotelId === h.id} readOnly className="rounded border-gray-300 text-sky-700 focus:ring-sky-500 mt-1 h-4 w-4 pointer-events-none" />
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
                  ))}
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
                  {diningList.slice(0, 2).map((r) => (
                    <div
                      key={r.id}
                      onClick={() => setSelectedDiningId(selectedDiningId === r.id ? null : r.id)}
                      className={`relative border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between hover:border-sky-300 transition cursor-pointer select-card block ${
                        selectedDiningId === r.id ? 'border-[#0284C7] bg-sky-50/40' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <input type="checkbox" checked={selectedDiningId === r.id} readOnly className="rounded border-gray-300 text-sky-700 focus:ring-sky-500 mt-1 h-4 w-4 pointer-events-none" />
                        <div>
                          <h3 className="font-bold text-gray-800 text-sm">{r.name}</h3>
                          <p className="text-gray-700 text-xs mt-0.5">⭐ {r.rating} | {r.location}. {r.description}</p>
                        </div>
                      </div>
                      <div className="text-right mt-2 sm:mt-0 flex-shrink-0">
                        <strong className="text-sky-700 text-sm block">{r.avgCost} <span className="text-gray-700 text-xs font-normal">for 2</span></strong>
                      </div>
                    </div>
                  ))}
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
                    {toursList.slice(0, 2).map((t) => (
                      <div
                        key={t.id}
                        onClick={() => setSelectedTourId(selectedTourId === t.id ? null : t.id)}
                        className={`relative border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between hover:border-sky-300 transition cursor-pointer select-card block ${
                          selectedTourId === t.id ? 'border-[#0284C7] bg-sky-50/40' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <input type="checkbox" checked={selectedTourId === t.id} readOnly className="rounded border-gray-300 text-sky-700 focus:ring-sky-500 mt-1 h-4 w-4 pointer-events-none" />
                          <div>
                            <h3 className="font-bold text-gray-800 text-sm">{t.name}</h3>
                            <p className="text-gray-700 text-xs mt-0.5">⭐ {t.rating} | ⏱️ {t.duration} duration. {t.highlights.join(', ')}</p>
                          </div>
                        </div>
                        <div className="text-right mt-2 sm:mt-0 flex-shrink-0">
                          <strong className="text-sky-700 text-sm block">{t.price} <span className="text-gray-700 text-xs font-normal">/ traveler</span></strong>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tab Content: Spa */}
                {expTab === 'spa' && (
                  <div className="space-y-4">
                    {spasList.slice(0, 2).map((s) => (
                      <div
                        key={s.id}
                        onClick={() => setSelectedSpaId(selectedSpaId === s.id ? null : s.id)}
                        className={`relative border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between hover:border-sky-300 transition cursor-pointer select-card block ${
                          selectedSpaId === s.id ? 'border-[#0284C7] bg-sky-50/40' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <input type="checkbox" checked={selectedSpaId === s.id} readOnly className="rounded border-gray-300 text-sky-700 focus:ring-sky-500 mt-1 h-4 w-4 pointer-events-none" />
                          <div>
                            <h3 className="font-bold text-gray-800 text-sm">{s.name}</h3>
                            <p className="text-gray-700 text-xs mt-0.5">⭐ {s.rating} | {s.treatment}. ({s.duration})</p>
                          </div>
                        </div>
                        <div className="text-right mt-2 sm:mt-0 flex-shrink-0">
                          <strong className="text-sky-700 text-sm block">{s.price} <span className="text-gray-700 text-xs font-normal">/ session</span></strong>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tab Content: Gaming */}
                {expTab === 'gaming' && (
                  <div className="space-y-4">
                    {gamingList.slice(0, 2).map((g) => (
                      <div
                        key={g.id}
                        onClick={() => setSelectedGamingId(selectedGamingId === g.id ? null : g.id)}
                        className={`relative border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between hover:border-sky-300 transition cursor-pointer select-card block ${
                          selectedGamingId === g.id ? 'border-[#0284C7] bg-sky-50/40' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <input type="checkbox" checked={selectedGamingId === g.id} readOnly className="rounded border-gray-300 text-sky-700 focus:ring-sky-500 mt-1 h-4 w-4 pointer-events-none" />
                          <div>
                            <h3 className="font-bold text-gray-800 text-sm">{g.name}</h3>
                            <p className="text-gray-700 text-xs mt-0.5">⭐ {g.rating} | {g.description}</p>
                          </div>
                        </div>
                        <div className="text-right mt-2 sm:mt-0 flex-shrink-0">
                          <strong className="text-sky-700 text-sm block">{g.price} <span className="text-gray-700 text-xs font-normal">/ person</span></strong>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Step 5: Passenger Registration */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-xs">5</span>
                    <h2 className="text-lg font-bold text-gray-900">Review & Passenger Registration</h2>
                  </div>
                  <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-lg">Instant Sync</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Lead Passenger Name</label>
                    <input
                      type="text"
                      value={leadPassengerName}
                      onChange={(e) => setLeadPassengerName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm font-semibold text-gray-800 focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Passport / ID Number</label>
                    <input
                      type="text"
                      value={passportNumber}
                      onChange={(e) => setPassportNumber(e.target.value)}
                      placeholder="Enter passport number"
                      className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm font-semibold text-gray-800 focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Passport Issuing Country <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={passportCountry}
                      onChange={(e) => handleCountryChange(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm font-semibold text-gray-800 focus:ring-2 focus:ring-sky-500"
                    >
                      {PASSPORT_COUNTRIES.map((c) => (
                        <option key={c} value={c}>
                          {c} {c === 'India' ? '(Domestic)' : '(International)'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Incoming Flight Number</label>
                    <input
                      type="text"
                      value={flightIn}
                      onChange={(e) => setFlightIn(e.target.value)}
                      placeholder="e.g. EK-504"
                      className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm font-semibold text-gray-800 focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Onward Flight Terminal <span className="text-sky-500">*</span>
                    </label>
                    <select
                      value={onwardTerminal}
                      onChange={(e) => setOnwardTerminal(e.target.value as 'T2' | 'T1')}
                      className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm font-semibold text-gray-800 focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="T2">Terminal 2 (CSMIA International &amp; Premium Domestic)</option>
                      <option value="T1">Terminal 1 (Santacruz - Budget Domestic: IndiGo/Akasa)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Emergency Contact</label>
                    <input
                      type="text"
                      value={emergencyContact}
                      onChange={(e) => setEmergencyContact(e.target.value)}
                      placeholder="+1-xxx-xxx-xxxx"
                      className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm font-semibold text-gray-800 focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                {/* Terminal Mismatch Warning Card */}
                {onwardTerminal === 'T1' && (
                  <div className="bg-amber-50 border border-amber-300 p-4 rounded-xl space-y-2 text-xs text-amber-950">
                    <div className="font-extrabold flex items-center gap-1.5 text-amber-900 text-sm">
                      <span>⚠️ TERMINAL CHANGE DETECTED</span>
                    </div>
                    <p className="leading-relaxed">
                      Your onward flight departs from <strong>Terminal 1 (Santacruz - 5 km from T2)</strong>. A 45-minute inter-terminal road transfer buffer is required.
                    </p>
                    <label className="flex items-center gap-2 pt-1 cursor-pointer font-bold text-amber-900">
                      <input
                        type="checkbox"
                        checked={interTerminalCabAddon}
                        onChange={(e) => setInterTerminalCabAddon(e.target.checked)}
                        className="rounded border-amber-400 text-amber-700 focus:ring-amber-500"
                      />
                      <span>T2 to T1 Private Inter-Terminal Transfer (Cab) — ₹699</span>
                    </label>
                  </div>
                )}

                {/* VIP Services & Connectivity Add-ons */}
                <div className="bg-slate-50 border border-gray-200 p-4 rounded-xl space-y-3 text-xs">
                  <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                    <span>⚡ Hyper-Local VIP Services &amp; Connectivity Add-ons</span>
                  </h3>

                  <label className="flex items-start gap-3 bg-white p-3 rounded-xl border border-gray-200 cursor-pointer hover:border-sky-300 transition">
                    <input
                      type="checkbox"
                      checked={selectedEsim}
                      onChange={(e) => setSelectedEsim(e.target.checked)}
                      className="mt-0.5 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                    />
                    <div className="space-y-0.5">
                      <span className="font-extrabold text-slate-900 block">🇮🇳 Indian Tourist eSIM (1GB / High-Speed 5G) — ₹400 / $5 USD</span>
                      <p className="text-slate-500 text-[11px]">Instant digital activation. QR code delivered before flight landing.</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 bg-white p-3 rounded-xl border border-gray-200 cursor-pointer hover:border-sky-300 transition">
                    <input
                      type="checkbox"
                      checked={selectedVipBuggy}
                      onChange={(e) => setSelectedVipBuggy(e.target.checked)}
                      className="mt-0.5 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                    />
                    <div className="space-y-0.5">
                      <span className="font-extrabold text-slate-900 block">⚡ VIP Aerobridge Escort &amp; Fast-Track Golf Buggy (Adani Pranaam) — ₹1,999</span>
                      <p className="text-slate-500 text-[11px]">Met directly at aerobridge by dedicated agent with electric cart to fast-track customs.</p>
                    </div>
                  </label>
                </div>

                {/* Service Classification Badges */}
                <div className="pt-2">
                  {selectedServiceCategory === 'AIRSIDE' ? (
                    <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl flex items-center gap-2 text-emerald-800 text-xs font-bold">
                      <span>🟢 AIRSIDE SERVICE: No Indian Visa required. You remain in the international transit area.</span>
                    </div>
                  ) : (
                    <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl flex items-center gap-2 text-amber-900 text-xs font-bold">
                      <span>🛂 LANDSIDE SERVICE: Requires valid Indian Immigration entry permission (Tourist Visa, e-Visa, Transit Visa, or OCI Card).</span>
                    </div>
                  )}
                </div>



                <div className="bg-slate-50 border border-gray-200 p-4 rounded-xl text-xs text-gray-700 space-y-2">
                  <p className="font-bold text-gray-900">🛡️ LayoverX Delay Protection & Visa Guarantee Included</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Free reschedule if your incoming flight is delayed.</li>
                    <li>Full refund on activities if immigration queue exceeds 2 hours.</li>
                    <li>Chauffeur pickup scheduled automatically for 30 minutes after actual landing time.</li>
                  </ul>
                </div>

                {validationError && (
                  <div className="p-3 text-xs font-bold text-rose-800 bg-rose-50 border border-rose-100 rounded-xl">
                    ⚠️ {validationError}
                  </div>
                )}

                <button
                  type="button"
                  disabled={isHolding}
                  onClick={handleProceedCheckout}
                  className="w-full py-4 bg-[#0284C7] hover:bg-[#027ab1] disabled:bg-gray-400 text-white font-bold text-sm rounded-xl shadow-lg transition flex items-center justify-center gap-2"
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

                <div className="space-y-3 text-xs text-gray-800">
                  <div className="flex justify-between items-center">
                    <span>🚗 Airport Cabs (Return)</span>
                    <strong className="text-gray-900">{formatPrice(cabPrice)}</strong>
                  </div>

                  {hotelObj && (
                    <div className="flex justify-between items-center text-sky-800 font-medium">
                      <span className="truncate max-w-[180px]">🏨 {hotelObj.name}</span>
                      <strong>{formatPrice(hotelPrice)}</strong>
                    </div>
                  )}

                  {diningObj && (
                    <div className="flex justify-between items-center text-orange-800 font-medium">
                      <span className="truncate max-w-[180px]">🍽️ {diningObj.name}</span>
                      <strong>{formatPrice(diningPrice)}</strong>
                    </div>
                  )}

                  {tourObj && (
                    <div className="flex justify-between items-center text-rose-800 font-medium">
                      <span className="truncate max-w-[180px]">🌆 {tourObj.name}</span>
                      <strong>{formatPrice(tourPrice)}</strong>
                    </div>
                  )}

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
                  disabled={isHolding}
                  onClick={handleProceedCheckout}
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
                    onClick={handleSaveDraft}
                    type="button"
                    className="h-10 flex items-center justify-center bg-gray-900 hover:bg-black text-white font-bold text-xs rounded-xl shadow-sm transition gap-1.5"
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
                          <div className="font-bold text-slate-900">{tPickup} • {selectedCab ? '🚖 Chauffeur Pickup' : hotelObj ? '🏨 Hotel Check-In' : '⭐ Transit Activity'}</div>
                          <div className="text-slate-500 text-[11px]">{selectedCab ? `Meet driver at Exit Gate 2 (${selectedCab.toUpperCase()}).` : hotelObj ? `Check-in at ${hotelObj.name}.` : 'Enjoy your scheduled transit window.'}</div>
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
                      <div key={plan.id} className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900">{plan.name}</span>
                          <span className="text-[10px] text-slate-500">{plan.createdAt}</span>
                        </div>
                        <div className="text-[11px] text-slate-600 font-semibold">
                          {plan.items.length} items • Total: ₹{plan.totalCost.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-2 pt-1 border-t border-slate-200">
                          <button
                            type="button"
                            onClick={() => loadSavedPlan(plan)}
                            className="px-2.5 py-1 bg-[#0284C7] hover:bg-[#027ab1] text-white rounded-lg text-[11px] font-bold transition"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard?.writeText(window.location.href);
                              showToast(`Share link for "${plan.name}" copied!`, 'success');
                            }}
                            className="px-2.5 py-1 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-[11px] font-bold transition"
                          >
                            🔗 Share
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteSavedPlan(plan.id)}
                            className="px-2.5 py-1 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg text-[11px] font-bold transition ml-auto"
                          >
                            🗑️ Delete
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

    </div>
  );
}

