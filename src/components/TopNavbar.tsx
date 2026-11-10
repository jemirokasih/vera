import React from 'react';
import { UserRole } from '../types';
import { Smartphone, Building2, Store, ShieldCheck, Sparkles } from 'lucide-react';

interface TopNavbarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  todayRevenue: number;
  greenScore: number;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  currentRole,
  onRoleChange,
  todayRevenue,
  greenScore,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-emerald-100/80 px-4 py-2.5 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand & Subtitle */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src="/logo.jpg"
              alt="VERA Logo"
              className="w-10 h-10 rounded-2xl object-contain shadow-sm border border-emerald-200 bg-white p-0.5"
            />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-lime-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black tracking-tight text-[#0D3B23] flex items-center gap-1.5">
                VERA
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-lime-300 text-slate-900 shadow-xs">
                  CIA 2026
                </span>
              </h1>
              <span className="text-xs text-slate-300 hidden sm:inline">•</span>
              <span className="text-xs font-semibold text-emerald-800 hidden sm:inline">
                Green-Fintech & Impact Credit Scoring
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium italic">
              "Verified today, bankable tomorrow" • Pasar Jambu Dua, Bogor
            </p>
          </div>
        </div>

        {/* Live Metrics Ticker */}
        <div className="hidden lg:flex items-center gap-4 text-xs bg-[#F4F7F4] px-4 py-1.5 rounded-2xl border border-emerald-100">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-lime-500 animate-pulse"></span>
            <span className="text-slate-600 font-medium">Omzet Hari Ini:</span>
            <span className="font-extrabold text-[#0D3B23]">
              Rp {todayRevenue.toLocaleString('id-ID')}
            </span>
          </div>
          <div className="h-3 w-px bg-slate-200"></div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-slate-600 font-medium">Skor VERA:</span>
            <span className="font-black text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
              {greenScore}/100
            </span>
          </div>
        </div>

        {/* Role Switcher Pills */}
        <div className="flex items-center bg-[#EBF2EC] p-1 rounded-2xl border border-emerald-100/80">
          <button
            onClick={() => onRoleChange('pedagang')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
              currentRole === 'pedagang'
                ? 'bg-[#0D3B23] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-lime-300" />
            <span>Pedagang UMKM (Mobile)</span>
          </button>

          <button
            onClick={() => onRoleChange('bank')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
              currentRole === 'bank'
                ? 'bg-[#0D3B23] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-lime-300" />
            <span>Analis Bank (Desktop)</span>
          </button>

          <button
            onClick={() => onRoleChange('admin')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
              currentRole === 'admin'
                ? 'bg-[#0D3B23] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Store className="w-3.5 h-3.5 text-lime-300" />
            <span>Pengelola Pasar (Desktop)</span>
          </button>
        </div>
      </div>
    </header>
  );
};
