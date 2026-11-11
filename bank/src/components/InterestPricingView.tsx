import React, { useState } from 'react';
import { TIER_RULES } from '../data/mockData';
import { Calculator, ShieldCheck, Award, ArrowRight, Percent, Coins } from 'lucide-react';

export const InterestPricingView: React.FC = () => {
  const [selectedPlafon, setSelectedPlafon] = useState(30000000);
  const [selectedTenor, setSelectedTenor] = useState(18);
  const [selectedTierIndex, setSelectedTierIndex] = useState(0);

  const activeTier = TIER_RULES[selectedTierIndex];
  const rate = activeTier.subsidizedRate;

  const monthlyPrincipal = Math.round(selectedPlafon / selectedTenor);
  const monthlyInterest = Math.round((selectedPlafon * (rate / 100)) / 12);
  const monthlyTotal = monthlyPrincipal + monthlyInterest;

  const normalMonthlyInterest = Math.round((selectedPlafon * 0.06) / 12);
  const monthlySubsidySavings = normalMonthlyInterest - monthlyInterest;

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="bg-white border border-slate-200/90 rounded-[32px] p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1 rounded-lg bg-lime-400 text-[#0D3B23] font-bold">
            <Percent className="w-4 h-4" />
          </span>
          <span className="text-xs font-black text-[#0D3B23] uppercase tracking-wider">
            Pricing Engine & Insentif Bunga Hijau
          </span>
        </div>
        <h2 className="text-xl font-black text-slate-900">
          Struktur Penentuan Suku Bunga Berdasarkan Skor VERA
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Pedagang dengan aksi keberlanjutan terverifikasi (memilah sampah & bebas plastik) berhak menerima subsidi bunga hingga 300 bps (3.0% eff. p.a.).
        </p>
      </div>

      {/* Tier Matrix Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {TIER_RULES.map((tier, idx) => {
          const isSelected = selectedTierIndex === idx;
          return (
            <div
              key={tier.tierName}
              onClick={() => setSelectedTierIndex(idx)}
              className={`p-5 rounded-3xl border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-[#0D3B23] text-white border-[#0D3B23] shadow-lg scale-102'
                  : 'bg-white border-slate-200/90 hover:border-slate-300'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span
                  className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-lime-400 text-[#0D3B23]' : 'bg-[#F4F7F4] text-slate-700'
                  }`}
                >
                  Skor {tier.minScore} - {tier.maxScore}
                </span>
                <span className={`text-[10px] font-bold ${isSelected ? 'text-lime-300' : 'text-emerald-700'}`}>
                  {tier.riskRating}
                </span>
              </div>

              <h3 className={`text-base font-black ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                Tier {tier.tierName}
              </h3>

              <div className="my-3">
                <span className={`text-[10px] font-medium block ${isSelected ? 'text-emerald-200' : 'text-slate-500'}`}>
                  Suku Bunga Khusus:
                </span>
                <p className={`text-2xl font-black ${isSelected ? 'text-lime-400' : 'text-[#0D3B23]'}`}>
                  {tier.subsidizedRate}% <span className="text-xs font-normal">eff. p.a.</span>
                </p>
              </div>

              <div className={`pt-3 border-t text-[11px] space-y-1 ${isSelected ? 'border-emerald-800 text-emerald-200' : 'border-slate-100 text-slate-500'}`}>
                <p>Diskon: <strong>{tier.discountBps} bps</strong></p>
                <p>Maks Plafon: <strong>Rp {tier.maxPlafon / 1000000} Juta</strong></p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Simulator */}
      <div className="bg-white border border-slate-200/90 rounded-[32px] p-6 space-y-5 shadow-xs">
        <div className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-emerald-700" />
          <h3 className="text-base font-black text-slate-900">
            Kalkulator Simulasi Angsuran & Margin Bank
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs text-slate-700 font-bold mb-1">
                <span>Plafon Pinjaman:</span>
                <span className="text-base font-black text-[#0D3B23]">
                  Rp {selectedPlafon.toLocaleString('id-ID')}
                </span>
              </div>
              <input
                type="range"
                min="5000000"
                max={activeTier.maxPlafon}
                step="5000000"
                value={selectedPlafon}
                onChange={(e) => setSelectedPlafon(parseInt(e.target.value))}
                className="w-full accent-emerald-600 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                <span>Rp 5 Jt</span>
                <span>Rp {activeTier.maxPlafon / 1000000} Jt (Maks Tier)</span>
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-700 font-bold block mb-1">Pilihan Tenor:</label>
              <div className="grid grid-cols-4 gap-2 text-xs">
                {[12, 18, 24, 36].map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTenor(t)}
                    className={`py-2 rounded-xl font-black transition ${
                      selectedTenor === t
                        ? 'bg-[#0D3B23] text-lime-300 shadow-xs'
                        : 'bg-[#F4F7F4] text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {t} Bln
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Card */}
          <div className="bg-[#F8FAF8] rounded-2xl p-5 border border-slate-200 space-y-3">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
              Rincian Perhitungan (Tier {activeTier.tierName} • Bunga {rate}%):
            </span>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Cicilan Pokok / Bln:</span>
                <span className="font-bold text-slate-900">Rp {monthlyPrincipal.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Bunga Bersubsidi ({rate}%):</span>
                <span className="font-bold text-emerald-700">Rp {monthlyInterest.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>Penghematan Bunga Pedagang:</span>
                <span className="font-bold text-emerald-700">-Rp {monthlySubsidySavings.toLocaleString('id-ID')}/bln</span>
              </div>
              <div className="pt-2 border-t-2 border-slate-200 flex justify-between items-center text-sm font-black">
                <span className="text-slate-900">Total Angsuran Debitur:</span>
                <span className="text-base text-[#0D3B23]">Rp {monthlyTotal.toLocaleString('id-ID')}/bln</span>
              </div>
            </div>

            <div className="p-2.5 bg-lime-100 rounded-xl text-[11px] text-[#0D3B23] font-semibold">
              ✓ Bunga 3% disubsidi oleh Program Green Fintech CIA 2026 & Insentif OJK Taksonomi Hijau.
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

