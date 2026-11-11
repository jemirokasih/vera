import React from 'react';
import { Search, Bell, Building2, Calendar, ShieldCheck, ChevronDown } from 'lucide-react';

interface TopHeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedBank: string;
  onSelectBank: (b: string) => void;
  reviewCount: number;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  searchQuery,
  onSearchChange,
  selectedBank,
  onSelectBank,
  reviewCount,
}) => {
  const bankOptions = [
    'BSI Green KUR Mikro',
    'BRI Micro Green Fund',
    'Mandiri Micro ESG',
    'BNI Green SME',
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-6 py-3 shadow-xs">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Cari nama debitur, kios, atau nomor invoice..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-[#F4F7F4] border border-slate-200 rounded-2xl pl-10 pr-4 py-2 text-xs text-slate-900 font-medium outline-none focus:border-emerald-500 transition"
          />
        </div>

        {/* Status Indicators & Bank Switcher */}
        <div className="flex items-center gap-3">
          
          {/* Bank Partner Selector */}
          <div className="flex items-center gap-2 bg-[#F8FAF8] px-3.5 py-1.5 rounded-2xl border border-slate-200 text-xs">
            <Building2 className="w-4 h-4 text-blue-700" />
            <select
              value={selectedBank}
              onChange={(e) => onSelectBank(e.target.value)}
              className="bg-transparent font-extrabold text-slate-900 outline-none cursor-pointer pr-1"
            >
              {bankOptions.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Metonymy Banner Pill */}
          <div className="hidden lg:flex items-center gap-2 bg-[#F0F7F1] border border-emerald-200 px-3 py-1.5 rounded-2xl text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span className="text-[11px] font-bold text-emerald-800">"Coba lihat VERA-nya"</span>
          </div>

          <div className="hidden md:flex items-center gap-2 bg-[#F8FAF8] px-3.5 py-1.5 rounded-2xl border border-slate-200 text-xs text-slate-600">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold">Rabu, 11 Nov 2026</span>
          </div>

          <div className="relative p-2 rounded-2xl bg-white border border-slate-200 text-slate-600 shadow-xs">
            <Bell className="w-4 h-4" />
            {reviewCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center">
                {reviewCount}
              </span>
            )}
          </div>
        </div>

      </div>
    </header>
  );
};
