import React from 'react';
import { BankViewType } from '../types';
import {
  LayoutDashboard,
  FileCheck,
  Calculator,
  Award,
  FileText,
  Building2,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface SidebarProps {
  currentView: BankViewType;
  onSelectView: (view: BankViewType) => void;
  reviewCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  reviewCount,
}) => {
  const menuItems = [
    { id: 'dashboard' as BankViewType, label: 'Dashboard Portofolio', icon: LayoutDashboard },
    { id: 'pipeline' as BankViewType, label: 'Pipeline Pengajuan KUR', icon: FileCheck, badge: reviewCount },
    { id: 'pricing' as BankViewType, label: 'Kalkulator Bunga Subsidi', icon: Calculator },
    { id: 'certificate' as BankViewType, label: 'Sertifikat Kelayakan VERA', icon: Award },
    { id: 'esg_portfolio' as BankViewType, label: 'Laporan OJK & Taksonomi ESG', icon: FileText },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between shrink-0 min-h-screen">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-100 flex items-center gap-3">
          <div className="relative">
            <img
              src="/logo.jpg"
              alt="VERA"
              className="w-10 h-10 rounded-2xl object-contain border border-emerald-200 bg-white p-0.5 shadow-xs"
            />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-lime-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-black text-lg text-[#0D3B23] tracking-tight">VERA</h1>
              <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                BANK
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Underwriting Terminal</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectView(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#0D3B23] text-lime-300 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-[#F4F7F4]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-lime-300' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-lime-400 text-[#0D3B23]' : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Analyst Profile Footer */}
      <div className="p-4 border-t border-slate-100 bg-[#F8FAF8] m-3 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#0D3B23] text-lime-300 flex items-center justify-center font-black text-sm">
            AP
          </div>
          <div className="flex-1 truncate">
            <p className="text-xs font-black text-slate-900">Aditia Pratama</p>
            <p className="text-[10px] text-slate-500 truncate">Senior Credit Analyst Green</p>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-slate-200/70 flex items-center justify-between text-[11px]">
          <span className="text-emerald-700 font-bold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-lime-500 animate-pulse"></span>
            Online • BSI & BRI
          </span>
          <span className="text-slate-400 text-[10px]">v1.0.0</span>
        </div>
      </div>
    </aside>
  );
};
