'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ItineraryItem {
  id: string;
  title: string;
  detail: string;
  badge: 'Arrival' | 'Security' | 'Cab' | 'Hotel' | 'Dining' | 'Tour' | 'Spa' | 'Gaming' | 'Departure' | string;
  cost: string;
  time?: string;
  durationHours?: number;
}

export interface SavedPlan {
  id: string;
  name: string;
  createdAt: string;
  items: ItineraryItem[];
  totalCost: number;
}

export interface ToastNotice {
  id: string;
  message: string;
  type: 'success' | 'warning' | 'info';
}

interface ItineraryContextType {
  items: ItineraryItem[];
  savedPlans: SavedPlan[];
  toast: ToastNotice | null;
  addItem: (item: Omit<ItineraryItem, 'id'>, usableHoursLimit?: number) => void;
  removeItem: (id: string) => void;
  updateItemDuration: (id: string, durationHours: number, cost: string) => void;
  moveItemUp: (index: number) => void;
  moveItemDown: (index: number) => void;
  clearAllItems: () => void;
  saveCurrentPlan: (planName?: string) => void;
  deleteSavedPlan: (id: string) => void;
  loadSavedPlan: (plan: SavedPlan) => void;
  showToast: (message: string, type?: 'success' | 'warning' | 'info') => void;
}

const ItineraryContext = createContext<ItineraryContextType | undefined>(undefined);

export function ItineraryProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ItineraryItem[]>([]);
  const [savedPlans, setSavedPlans] = useState<SavedPlan[]>([]);
  const [toast, setToast] = useState<ToastNotice | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedItems = localStorage.getItem('layoverx_itinerary_items');
      if (storedItems) {
        setItems(JSON.parse(storedItems));
      }
      const storedPlans = localStorage.getItem('layoverx_saved_plans');
      if (storedPlans) {
        setSavedPlans(JSON.parse(storedPlans));
      }
    } catch (e) {
      console.warn('[ItineraryContext] Failed to load local storage:', e);
    }
  }, []);

  const saveItemsToStorage = (newItems: ItineraryItem[]) => {
    setItems(newItems);
    try {
      localStorage.setItem('layoverx_itinerary_items', JSON.stringify(newItems));
    } catch {}
  };

  const savePlansToStorage = (newPlans: SavedPlan[]) => {
    setSavedPlans(newPlans);
    try {
      localStorage.setItem('layoverx_saved_plans', JSON.stringify(newPlans));
    } catch {}
  };

  const showToast = (message: string, type: 'success' | 'warning' | 'info' = 'success') => {
    const id = String(Date.now());
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((curr) => (curr?.id === id ? null : curr));
    }, 4500);
  };

  const addItem = (itemData: Omit<ItineraryItem, 'id'>, totalLayoverHours = 8.0) => {
    // Check for duplicate booking
    const isDuplicate = items.some(
      (item) => item.title.trim().toLowerCase() === itemData.title.trim().toLowerCase()
    );
    if (isDuplicate) {
      showToast(`⚠️ "${itemData.title}" is already in your itinerary!`, 'warning');
      return;
    }

    let updatedList = [...items];

    // REQUIREMENT: Check if vehicle/cab is added first. If not present and adding an activity, auto-insert vehicle
    const hasCab = updatedList.some((item) => item.badge === 'Cab');
    if (!hasCab && itemData.badge !== 'Cab') {
      const defaultCab: ItineraryItem = {
        id: `cab_auto_${Date.now()}`,
        title: 'Executive Sedan Airport Pickup & Return',
        detail: 'Toyota Innova Crysta / Camry • Fixed rate transfer',
        badge: 'Cab',
        cost: '₹1,499',
        durationHours: 0.75,
      };
      updatedList.push(defaultCab);
    }

    const newItem: ItineraryItem = {
      ...itemData,
      id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    };
    updatedList.push(newItem);

    // TIME FORMULA: Total Layover - 2.5h Transit - Cab Driving Time - 0.17h (10m extra) = Available Time
    const landsideCount = updatedList.filter((i) => i.badge === 'Dining' || i.badge === 'Tour' || (i.badge === 'Hotel' && !i.title.toLowerCase().includes('pod'))).length;
    const cabDrivingTime = landsideCount <= 1 ? 0.75 : landsideCount === 2 ? 1.5 : 2.0;
    const transitBuffer = 2.5;
    const extraTenMin = 0.17;
    
    const availableTime = Math.max(0, totalLayoverHours - transitBuffer - cabDrivingTime - extraTenMin);
    const activitiesHours = updatedList.reduce((sum, item) => sum + (item.badge === 'Cab' ? 0 : (item.durationHours || 2)), 0);

    if (activitiesHours > availableTime) {
      showToast(
        `⚠️ Time limit warning! Total activities (${activitiesHours.toFixed(1)}h) exceeds available stopover window (${availableTime.toFixed(1)}h).`,
        'warning'
      );
    } else {
      if (!hasCab && itemData.badge !== 'Cab') {
        showToast(`🚗 Added Airport Cab & "${itemData.title}" to itinerary!`, 'success');
      } else {
        showToast(`Added "${itemData.title}" to your itinerary!`, 'success');
      }
    }

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
    if (index <= 0) return;
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[index - 1];
    newItems[index - 1] = temp;
    saveItemsToStorage(newItems);
  };

  const moveItemDown = (index: number) => {
    if (index >= items.length - 1) return;
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[index + 1];
    newItems[index + 1] = temp;
    saveItemsToStorage(newItems);
  };

  const clearAllItems = () => {
    saveItemsToStorage([]);
  };

  const saveCurrentPlan = (name?: string) => {
    const planName = name || `Mumbai Stopover Plan #${savedPlans.length + 1}`;
    const totalCost = items.reduce((acc, item) => {
      const num = parseInt(item.cost.replace(/[^0-9]/g, '')) || 0;
      return acc + num;
    }, 0);

    const newPlan: SavedPlan = {
      id: `plan_${Date.now()}`,
      name: planName,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      items: [...items],
      totalCost,
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
        savedPlans,
        toast,
        addItem,
        removeItem,
        updateItemDuration,
        moveItemUp,
        moveItemDown,
        clearAllItems,
        saveCurrentPlan,
        deleteSavedPlan,
        loadSavedPlan,
        showToast,
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
