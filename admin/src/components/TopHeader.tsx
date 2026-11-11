import React from 'react';
import { Search, Bell, ShieldCheck, Leaf, Calendar } from 'lucide-react';

interface TopHeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  pendingCount: number;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  searchQuery,
  onSearchChange,
  pendingCount,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-6 py-3 shadow-xs">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Search Bar */}
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Cari pedagang, lapak, nomor kios, atau transaksi..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-[#F4F7F4] border border-slate-200 rounded-2xl pl-10 pr-4 py-2 text-xs text-slate-900 font-medium outline-none focus:border-emerald-500 transition"
          />
        </div>

        {/* Status Indicators */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 bg-[#F8FAF8] px-3.5 py-1.5 rounded-2xl border border-slate-200 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-lime-500 animate-pulse"></span>
            <span className="text-slate-500 font-medium">Rumah Kompos:</span>
            <span className="font-extrabold text-[#0D3B23]">Aktif (Blok A)</span>
          </div>

          <div className="flex items-center gap-2 bg-[#F8FAF8] px-3.5 py-1.5 rounded-2xl border border-slate-200 text-xs text-slate-600">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold">Rabu, 11 Nov 2026</span>
          </div>

          <div className="relative p-2 rounded-2xl bg-white border border-slate-200 text-slate-600 shadow-xs">
            <Bell className="w-4 h-4" />
            {pendingCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center">
                {pendingCount}
              </span>
            )}
          </div>
        </div>

      </div>
    </header>
  );
};

