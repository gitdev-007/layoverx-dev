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

  const addItem = (itemData: Omit<ItineraryItem, 'id'>, usableHoursLimit = 10.5) => {
    // Check total duration limit
    const currentTotalHours = items.reduce((sum, item) => sum + (item.durationHours || 2), 0);
    const newItemHours = itemData.durationHours || 2;

    if (currentTotalHours + newItemHours > usableHoursLimit) {
      showToast(
        `⚠️ Time limit warning! Total itinerary duration (${(currentTotalHours + newItemHours).toFixed(1)}h) exceeds your safe usable transit window (${usableHoursLimit}h).`,
        'warning'
      );
    } else {
      showToast(`Added "${itemData.title}" to your itinerary!`, 'success');
    }

    const newItem: ItineraryItem = {
      ...itemData,
      id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    };

    saveItemsToStorage([...items, newItem]);
  };

  const removeItem = (id: string) => {
    const updated = items.filter((item) => item.id !== id);
    saveItemsToStorage(updated);
    showToast('Removed item from itinerary', 'info');
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
    showToast('Deleted saved itinerary plan', 'info');
  };

  const loadSavedPlan = (plan: SavedPlan) => {
    saveItemsToStorage(plan.items);
    showToast(`Loaded saved plan "${plan.name}"`, 'success');
  };

  return (
    <ItineraryContext.Provider
      value={{
        items,
        savedPlans,
        toast,
        addItem,
        removeItem,
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
