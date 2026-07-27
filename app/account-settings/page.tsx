'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { Settings, Shield, Bell, Lock } from 'lucide-react';

export default function AccountSettingsPage() {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);

  return (
    <div className="min-h-screen pb-20 space-y-8 p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-bold text-sky-400 uppercase">Preferences</span>
          <h1 className="text-2xl font-extrabold text-white">Account Settings</h1>
        </div>
      </div>

      <div className="bg-slate-800/80 border border-slate-700/60 p-6 sm:p-8 rounded-3xl space-y-6">
        {saved && (
          <div className="p-3 bg-emerald-950/40 border border-emerald-800 text-emerald-300 rounded-xl text-xs font-bold">
            ✓ Settings updated successfully!
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Email Address</label>
            <input
              type="text"
              disabled
              defaultValue={user?.email || 'traveler@layoverx.com'}
              className="w-full text-xs font-semibold rounded-xl border border-slate-700 bg-slate-900/60 text-slate-400 px-3 py-2.5"
            />
          </div>

          <div className="pt-2">
            <h3 className="text-sm font-bold text-white mb-3">Notification Preferences</h3>
            <div className="space-y-2 text-xs text-slate-300">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded accent-sky-500" />
                Flight Delay & AeroAPI Radar Alerts
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded accent-sky-500" />
                CSMIA Terminal Gate Exit Notifications
              </label>
            </div>
          </div>
        </div>

        <button
          onClick={() => setSaved(true)}
          className="px-6 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs rounded-xl"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
}
