import React, { useState } from 'react';
import { GreenValidationItem } from '../types';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Printer,
  Scale,
  Camera,
  Filter,
  UserCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ValidationViewProps {
  validationItems: GreenValidationItem[];
  onVerify: (id: string, isApproved: boolean) => void;
}

export const ValidationView: React.FC<ValidationViewProps> = ({
  validationItems,
  onVerify,
}) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'verified' | 'rejected'>('all');

  const filtered = filter === 'all'
    ? validationItems
    : validationItems.filter(v => v.status === filter);

  const handleApprove = (id: string) => {
    onVerify(id, true);
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#0d3b23', '#84cc16', '#10b981']
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="bg-white border border-slate-200/90 rounded-[32px] p-6 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-lg bg-lime-400 text-[#0D3B23] font-bold">
              <UserCheck className="w-4 h-4" />
            </span>
            <span className="text-xs font-black text-[#0D3B23] uppercase tracking-wider">
              Jaringan Fasilitator Lapangan Ngariung Hub
            </span>
          </div>
          <h2 className="text-xl font-black text-slate-900">
            Validasi Aksi Nyata & Penimbangan Sampah Organik
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Setiap data yang diverifikasi admin secara otomatis meningkatkan <strong>Green Credit Score</strong> pedagang di mata perbankan.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-1.5 bg-[#F4F7F4] p-1 rounded-2xl border border-slate-200 text-xs">
          {[
            { id: 'all', label: 'Semua' },
            { id: 'pending', label: 'Menunggu' },
            { id: 'verified', label: 'Valid' },
            { id: 'rejected', label: 'Ditolak' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as typeof filter)}
              className={`px-3 py-1.5 rounded-xl font-bold transition ${
                filter === tab.id
                  ? 'bg-[#0D3B23] text-lime-300 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-slate-200/90 rounded-[28px] p-5 space-y-4 shadow-xs"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-black text-emerald-800 bg-lime-200 px-2.5 py-0.5 rounded-full uppercase">
                  {item.stallLocation}
                </span>
                <h3 className="text-sm font-black text-slate-900 mt-1.5">{item.merchantName}</h3>
                <p className="text-xs text-slate-500">{item.stallName}</p>
              </div>

              <div className="text-right">
                <span
                  className={`text-[10px] font-black px-2.5 py-1 rounded-full ${
                    item.status === 'verified'
                      ? 'bg-emerald-100 text-emerald-800'
                      : item.status === 'rejected'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {item.status === 'verified'
                    ? '✓ Terverifikasi'
                    : item.status === 'rejected'
                    ? '✕ Ditolak'
                    : '⏳ Menunggu Validasi'}
                </span>
                <p className="text-xs font-black text-[#0D3B23] mt-1">+{item.impactPoints} Poin</p>
              </div>
            </div>

            <div className="bg-[#F8FAF8] rounded-2xl p-3 border border-slate-200/80 space-y-2 text-xs">
              <p className="font-bold text-slate-900">{item.title}</p>
              <p className="text-[11px] text-slate-600 leading-relaxed">{item.description}</p>
              
              <div className="pt-2 border-t border-slate-200/70 grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-slate-400 block font-medium">Timbangan Fisik:</span>
                  <span className="font-black text-emerald-700 text-xs">
                    {item.weightKg ? `${item.weightKg} kg` : 'Bukti Visual'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Fasilitator Penginput:</span>
                  <span className="font-bold text-slate-800">{item.facilitatorName || item.verifiedBy || 'Fasilitator'}</span>
                </div>
              </div>

              <div className="text-[10px] text-slate-400 font-mono pt-1">
                Bukti: {item.proofNote} • {item.timestamp}
              </div>
            </div>

            {/* Action Buttons */}
            {item.status === 'pending' ? (
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => onVerify(item.id, false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700 text-xs font-bold rounded-2xl transition flex items-center justify-center gap-1.5"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Tolak Bukti</span>
                </button>

                <button
                  onClick={() => handleApprove(item.id)}
                  className="flex-1 py-2.5 bg-[#0D3B23] hover:bg-emerald-900 text-lime-300 text-xs font-black rounded-2xl shadow-md transition flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Validasi & Beri Poin</span>
                </button>
              </div>
            ) : (
              <div className="text-center py-2 bg-[#F8FAF8] rounded-2xl text-xs text-slate-500 font-semibold">
                Status: {item.status === 'verified' ? 'Telah Disetujui & Masuk Skor Bank' : 'Setoran Ditolak'}
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

