'use client';

import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';

export default function WhatsAppConcierge() {
  const [showTooltip, setShowTooltip] = useState(false);
  const whatsappNumber = '919820098200'; // Official CSMIA T2 Support Concierge
  const defaultMessage = encodeURIComponent('Hi LayoverX team, I have a question about my upcoming layover at CSMIA Terminal 2.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Hover/Focus Tooltip */}
      {showTooltip && (
        <div className="bg-slate-900 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-xl border border-slate-800 animate-in fade-in slide-in-from-right-2 duration-150 flex items-center gap-1.5 whitespace-nowrap">
          <span>Questions about T2? Chat live</span>
          <span className="text-emerald-400">●</span>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="Chat live on WhatsApp with LayoverX T2 Concierge"
        className="w-14 h-14 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-200 border-2 border-white/20 relative group"
      >
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full border-2 border-white animate-pulse"></span>
        <MessageSquare className="w-6 h-6 fill-current" />
      </a>
    </div>
  );
}
