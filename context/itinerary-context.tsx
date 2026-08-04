'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './auth-context';
import { calculateRouteDuration } from '@/utils/routeCalculator';

export interface ItineraryItem {
  id: string;
  title: string;
  detail: string;
  badge: 'Arrival' | 'Security' | 'Cab' | 'Hotel' | 'Dining' | 'Tour' | 'Spa' | 'Gaming' | 'Departure' | string;
  cost: string;
  time?: string;
  durationHours?: number;
  price?: string;
  type?: string;
  image?: string;
  location?: string;
}

export interface SavedPlan {
  id: string;
  name: string;
  createdAt: string;
  items: ItineraryItem[];
  totalCost: number;
  cabFare?: number;
  subtotal?: number;
  gst?: number;
  totalPayable?: number;
  itemsCount?: number;
}

export interface ToastNotice {
  id: string;
  message: string;
  type: 'success' | 'warning' | 'info';
}

interface ItineraryContextType {
  items: ItineraryItem[];
  itineraryItems: ItineraryItem[];
  savedPlans: SavedPlan[];
  toast: ToastNotice | null;
  totalLayoverHours: number;
  setTotalLayoverHours: (hours: number) => void;
  selectedCar: any;
  setSelectedCar: (car: any) => void;
  addItem: (item: Omit<ItineraryItem, 'id'> & { id?: string }, usableHoursLimit?: number) => void;
  addToItinerary: (item: Omit<ItineraryItem, 'id'> & { id?: string }, usableHoursLimit?: number) => void;
  removeItem: (id: string) => void;
  removeFromItinerary: (id: string) => void;
  updateItemDuration: (id: string, durationHours: number, cost: string) => void;
  moveItemUp: (index: number) => void;
  moveItemDown: (index: number) => void;
  clearAllItems: () => void;
  saveCurrentPlan: (planName?: string, extraFields?: any) => void;
  deleteSavedPlan: (id: string) => void;
  loadSavedPlan: (plan: SavedPlan) => void;
  showToast: (message: string, type?: 'success' | 'warning' | 'info') => void;
  driveTimeHours: number;
  totalBufferHours: number;
  usedActivitiesHours: number;
  availableWindowHours: number;
}

const ItineraryContext = createContext<ItineraryContextType | undefined>(undefined);

export function calculateDynamicCabDriveTime(itemsList: ItineraryItem[]): number {
  const activities = itemsList.filter((i) => i.badge !== 'Cab' && i.badge !== 'Arrival' && i.badge !== 'Security' && i.badge !== 'Departure');
  
  if (activities.length === 0) {
    return 0.0; // When empty, 0 driving time -> buffer is strictly 2.5h
  }

  // Check if all activities are in-terminal / airside
  const allInTerminal = activities.every((i) => 
    i.title.toLowerCase().includes('niranta') || 
    i.title.toLowerCase().includes('pod') || 
    i.title.toLowerCase().includes('airside') || 
    i.detail.toLowerCase().includes('airside') ||
    i.detail.toLowerCase().includes('inside t2')
  );

  if (allInTerminal) {
    return 0.0; // In-terminal, 0 cab driving time
  }

  // Inspect location distance factors
  let maxDriveTime = 0.5; // default 30 min roundtrip for near airport (Sahar/Andheri East)

  for (const item of activities) {
    const text = (item.title + ' ' + item.detail).toLowerCase();
    if (text.includes('gateway') || text.includes('colaba') || text.includes('south mumbai') || text.includes('marine drive') || text.includes('highlights') || text.includes('city tour')) {
      maxDriveTime = Math.max(maxDriveTime, 1.5); // 90 min roundtrip for South Mumbai
    } else if (text.includes('bkc') || text.includes('bandra') || text.includes('juhu') || text.includes('maratha') || text.includes('peshawri')) {
      maxDriveTime = Math.max(maxDriveTime, 0.75); // 45 min roundtrip for BKC/Juhu/Maratha
    }
  }

  if (activities.length >= 2) {
    maxDriveTime += 0.5; // add multi-stop transfer buffer if visiting multiple spots
  }

  return Math.min(maxDriveTime, 2.5);
}

export function ItineraryProvider({ children }: { children: React.ReactNode }) {
  const { user, openAuthModal } = useAuth();
  const [items, setItems] = useState<ItineraryItem[]>([]);
  const [savedPlans, setSavedPlans] = useState<SavedPlan[]>([]);
  const [toast, setToast] = useState<ToastNotice | null>(null);

  const [totalLayoverHours, setTotalLayoverHours] = useState<number>(17.0);
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [driveTimeHours, setDriveTimeHours] = useState<number>(0.0);

  const itineraryItems = items;

  useEffect(() => {
    const cabItem = items.find((i) => i.badge === 'Cab' || i.type === 'transfer');
    setSelectedCar(cabItem || null);
  }, [items]);

  useEffect(() => {
    let active = true;
    async function updateRouteDuration() {
      const duration = await calculateRouteDuration(items);
      if (active) {
        setDriveTimeHours(duration);
      }
    }
    updateRouteDuration();
    return () => {
      active = false;
    };
  }, [items]);

  const totalBufferHours = 2.5 + driveTimeHours;
  const usedActivitiesHours = items
    .filter((item) => item.badge !== 'Cab' && item.badge !== 'Arrival' && item.badge !== 'Security' && item.badge !== 'Departure')
    .reduce((sum, item) => sum + (item.durationHours || 0), 0);
  
  const availableWindowHours = totalLayoverHours - totalBufferHours - usedActivitiesHours;

  const getStorageKeys = (email: string | undefined | null) => {
    if (email) {
      const cleanEmail = email.toLowerCase().trim();
      return {
        itemsKey: `layoverx_itinerary_items_${cleanEmail}`,
        plansKey: `layoverx_saved_plans_${cleanEmail}`,
      };
    }
    return {
      itemsKey: 'layoverx_itinerary_items_anon',
      plansKey: 'layoverx_saved_plans_anon',
    };
  };

  // Sync with User Session State
  useEffect(() => {
    const { itemsKey, plansKey } = getStorageKeys(user?.email);
    try {
      if (!user) {
        // Clear active display on log out as requested
        setItems([]);
        setSavedPlans([]);
      } else {
        // Load user-specific itinerary
        const storedItems = localStorage.getItem(itemsKey);
        setItems(storedItems ? JSON.parse(storedItems) : []);

        const storedPlans = localStorage.getItem(plansKey);
        setSavedPlans(storedPlans ? JSON.parse(storedPlans) : []);
      }
    } catch (e) {
      console.warn('[ItineraryContext] Failed to load local storage:', e);
    }

    const handleClear = () => {
      setItems([]);
      try {
        localStorage.setItem(itemsKey, JSON.stringify([]));
      } catch {}
    };

    window.addEventListener('layoverx_clear_itinerary', handleClear);
    return () => {
      window.removeEventListener('layoverx_clear_itinerary', handleClear);
    };
  }, [user]);

  const saveItemsToStorage = (newItems: ItineraryItem[]) => {
    const cabIndex = newItems.findIndex((item) => item.badge === 'Cab' || item.type === 'transfer');
    let pinnedList = [...newItems];
    if (cabIndex !== -1) {
      const [cabItem] = pinnedList.splice(cabIndex, 1);
      pinnedList = [cabItem, ...pinnedList];
    }
    setItems(pinnedList);
    const { itemsKey } = getStorageKeys(user?.email);
    try {
      localStorage.setItem(itemsKey, JSON.stringify(pinnedList));
    } catch {}
  };

  const savePlansToStorage = (newPlans: SavedPlan[]) => {
    setSavedPlans(newPlans);
    const { plansKey } = getStorageKeys(user?.email);
    try {
      localStorage.setItem(plansKey, JSON.stringify(newPlans));
    } catch {}
  };

  const showToast = (message: string, type: 'success' | 'warning' | 'info' = 'success') => {
    const id = String(Date.now());
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((curr) => (curr?.id === id ? null : curr));
    }, 4500);
  };


  const addItem = (itemData: Omit<ItineraryItem, 'id'> & { id?: string }, totalLayoverHours = 8.0) => {
    const isAddingCab = itemData.badge === 'Cab' || itemData.type === 'transfer';

    if (!user && !isAddingCab) {
      openAuthModal();
      showToast('Please sign in or create an account to build your itinerary.', 'warning');
      return;
    }

    if (!isAddingCab && !selectedCar) {
      showToast('Please select an Airport Transfer Cab first', 'warning');
      if (typeof window !== 'undefined') {
        window.location.href = '/airport-transfers';
      }
      return;
    }

    if (!isAddingCab && (itemData.durationHours || 0) > availableWindowHours) {
      showToast('⚠️ Adding this activity exceeds your available layover window.', 'warning');
      return;
    }

    // Check for duplicate booking
    const isDuplicate = items.some(
      (item) => item.title.trim().toLowerCase() === itemData.title.trim().toLowerCase()
    );
    if (isDuplicate) {
      showToast(`⚠️ "${itemData.title}" is already in your itinerary!`, 'warning');
      return;
    }

    let updatedList = [...items];

    if (isAddingCab) {
      updatedList = updatedList.filter((item) => item.badge !== 'Cab' && item.type !== 'transfer');
    }

    const newItem: ItineraryItem = {
      ...itemData,
      id: itemData.id || `item_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    };
    updatedList.push(newItem);

    showToast(`Added "${itemData.title}" to your itinerary!`, 'success');

    saveItemsToStorage(updatedList);
  };

  const updateItemDuration = (id: string, durationHours: number, cost: string) => {
    const updated = items.map((item) => (item.id === id ? { ...item, durationHours, cost } : item));
    saveItemsToStorage(updated);
  };

  const removeItem = (id: string) => {
    const updated = items.filter((item) => item.id !== id);
    saveItemsToStorage(updated);
    // No popup on removal as requested
  };

  const moveItemUp = (index: number) => {
    if (index <= 1) return;
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[index - 1];
    newItems[index - 1] = temp;
    saveItemsToStorage(newItems);
  };

  const moveItemDown = (index: number) => {
    if (index === 0 || index >= items.length - 1) return;
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[index + 1];
    newItems[index + 1] = temp;
    saveItemsToStorage(newItems);
  };

  const clearAllItems = () => {
    saveItemsToStorage([]);
  };

  const saveCurrentPlan = (name?: string, extraFields?: any) => {
    const planName = name || `Mumbai Stopover Plan #${savedPlans.length + 1}`;
    const totalCost = items.reduce((acc, item) => {
      const num = parseInt((item.cost || '').toString().replace(/[^0-9]/g, '')) || 0;
      return acc + num;
    }, 0);

    const newPlan: SavedPlan = {
      id: `plan_${Date.now()}`,
      name: planName,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      items: [...items],
      totalCost: extraFields?.totalPayable || totalCost,
      itemsCount: items.length,
      ...extraFields,
    };

    savePlansToStorage([newPlan, ...savedPlans]);
    showToast(`Saved plan "${planName}" to My Saved Itineraries!`, 'success');
  };

  const deleteSavedPlan = (id: string) => {
    const updated = savedPlans.filter((p) => p.id !== id);
    savePlansToStorage(updated);
    // No popup on removal as requested
  };

  const loadSavedPlan = (plan: SavedPlan) => {
    // REPLACES all existing active itinerary items with the saved itinerary
    saveItemsToStorage([...plan.items]);
    showToast(`🔄 Replaced active itinerary with saved plan "${plan.name}"!`, 'success');
  };

  return (
    <ItineraryContext.Provider
      value={{
        items,
        itineraryItems,
        savedPlans,
        toast,
        totalLayoverHours,
        setTotalLayoverHours,
        selectedCar,
        setSelectedCar,
        addItem,
        addToItinerary: addItem,
        removeItem,
        removeFromItinerary: removeItem,
        updateItemDuration,
        moveItemUp,
        moveItemDown,
        clearAllItems,
        saveCurrentPlan,
        deleteSavedPlan,
        loadSavedPlan,
        showToast,
        driveTimeHours,
        totalBufferHours,
        usedActivitiesHours,
        availableWindowHours,
      }}
    >
      {children}
    </ItineraryContext.Provider>
  );
}

export function useItinerary() {
  const ctx = useContext(ItineraryContext);
  if (!ctx) {
    throw new Error('useItinerary must be used within an ItineraryProvider');
  }
  return ctx;
}
