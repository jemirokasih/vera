import React from 'react';
import { UserRole } from '../types';
import { Smartphone, Building2, Store, Sparkles, ShieldCheck } from 'lucide-react';

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
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-emerald-900/40 px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand & Subtitle */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src="/logo.jpg"
              alt="VERA Logo"
              className="w-10 h-10 rounded-xl object-contain shadow-md shadow-emerald-950 border border-emerald-500/30 bg-slate-950 p-0.5"
            />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                VERA
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  CIA 2026
                </span>
              </h1>
              <span className="text-xs text-slate-400 hidden sm:inline">|</span>
              <span className="text-xs font-medium text-emerald-400 hidden sm:inline">
                Green-Fintech & Impact Credit Scoring
              </span>
            </div>
            <p className="text-[11px] text-slate-400 italic">
              "Verified today, bankable tomorrow" • Pilot: Pasar Jambu Dua, Bogor
            </p>
          </div>
        </div>

        {/* Live Metrics Ticker */}
        <div className="hidden lg:flex items-center gap-4 text-xs bg-slate-950/70 px-3 py-1.5 rounded-lg border border-slate-800">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-400">Omzet Hari Ini:</span>
            <span className="font-semibold text-emerald-400">
              Rp {todayRevenue.toLocaleString('id-ID')}
            </span>
          </div>
          <div className="h-3 w-px bg-slate-800"></div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400">Vera Score:</span>
            <span className="font-semibold text-amber-400">{greenScore}/100</span>
          </div>
        </div>

        {/* Role Switcher Pills */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 shadow-inner">
          <button
            onClick={() => onRoleChange('pedagang')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
              currentRole === 'pedagang'
                ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-md shadow-emerald-900/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Pedagang (Mobile)</span>
          </button>

          <button
            onClick={() => onRoleChange('bank')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
              currentRole === 'bank'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-900/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Analis Bank (Desktop)</span>
          </button>

          <button
            onClick={() => onRoleChange('admin')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
              currentRole === 'admin'
                ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-white shadow-md shadow-amber-900/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>Admin Pasar (Desktop)</span>
          </button>
        </div>
      </div>
    </header>
  );
};

