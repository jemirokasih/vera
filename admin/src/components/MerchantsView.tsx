import React, { useState } from 'react';
import { Merchant } from '../types';
import {
  Store,
  ShieldCheck,
  TrendingUp,
  Leaf,
  Scale,
  Award,
  Search,
  ExternalLink,
  X,
  Printer,
  Coins
} from 'lucide-react';

interface MerchantsViewProps {
  merchants: Merchant[];
  searchQuery: string;
}

export const MerchantsView: React.FC<MerchantsViewProps> = ({
  merchants,
  searchQuery,
}) => {
  const [selectedBlock, setSelectedBlock] = useState<string>('Semua');
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null);

  const filtered = merchants.filter((m) => {
    const matchBlock = selectedBlock === 'Semua' || m.stallLocation.includes(selectedBlock);
    const matchSearch = !searchQuery ||
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.stallName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.stallLocation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchBlock && matchSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header & Block Tabs */}
      <div className="bg-white border border-slate-200/90 rounded-[32px] p-6 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900">
            Direktori Pedagang & Peta Blok Pasar Jambu Dua
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitoring digitalisasi SAK EMKM, skor keberlanjutan, dan kelayakan pembiayaan mikro.
          </p>
        </div>

        {/* Block Filter Pills */}
        <div className="flex gap-1.5 bg-[#F4F7F4] p-1 rounded-2xl border border-slate-200 text-xs">
          {['Semua', 'Blok A', 'Blok B', 'Blok C'].map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBlock(b)}
              className={`px-3 py-1.5 rounded-xl font-bold transition ${
                selectedBlock === b
                  ? 'bg-[#0D3B23] text-lime-300 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Merchants Table Card */}
      <div className="bg-white border border-slate-200/90 rounded-[32px] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAF8] text-slate-600 border-b border-slate-200 text-[11px] font-bold">
              <tr>
                <th className="py-3.5 px-4">Pedagang & Kios</th>
                <th className="py-3.5 px-4">Lokasi Blok</th>
                <th className="py-3.5 px-4 text-center">Skor VERA</th>
                <th className="py-3.5 px-4 text-right">Omzet / Bln (SAK EMKM)</th>
                <th className="py-3.5 px-4 text-right">Sampah Hijau</th>
                <th className="py-3.5 px-4 text-center">Status Bank</th>
                <th className="py-3.5 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((m) => (
                <tr key={m.id} className="hover:bg-[#F4F7F4]/60 transition">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={m.avatarUrl}
                        alt={m.name}
                        className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                      />
                      <div>
                        <p className="font-extrabold text-slate-900">{m.name}</p>
                        <p className="text-[11px] text-slate-500">{m.stallName}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4 text-slate-700 font-medium font-mono text-[11px]">
                    {m.stallLocation.split(',')[0]}
                  </td>

                  <td className="py-3 px-4 text-center">
                    <span className="inline-flex items-center gap-1 font-black text-emerald-800 bg-lime-200 px-2.5 py-0.5 rounded-full text-xs">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {m.score.total}
                    </span>
                    <span className="block text-[10px] text-slate-400 font-semibold mt-0.5">
                      Tier {m.score.tier}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right font-black text-slate-900">
                    Rp {m.monthlyRevenue.toLocaleString('id-ID')}
                  </td>

                  <td className="py-3 px-4 text-right font-black text-emerald-700">
                    {m.organicWasteKgMonth} kg
                  </td>

                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block font-black px-2.5 py-1 rounded-full text-[10px] ${
                        m.score.kurEligible
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {m.score.kurEligible ? 'Bankable ✓ (3%)' : 'Pembinaan'}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => setSelectedMerchant(m)}
                      className="px-3 py-1.5 bg-[#0D3B23] hover:bg-emerald-900 text-lime-300 font-bold rounded-xl text-xs transition"
                    >
                      Buka Profil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Merchant Detail Modal */}
      {selectedMerchant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-2xl bg-white border-2 border-emerald-300 rounded-[36px] p-6 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedMerchant(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-500 font-bold"
            >
              ✕
            </button>

            {/* Profile Header */}
            <div className="flex items-center gap-4 pb-4 border-b border-slate-200">
              <img
                src={selectedMerchant.avatarUrl}
                alt={selectedMerchant.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 shadow-sm"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-black text-slate-900">{selectedMerchant.name}</h3>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-lime-300 text-[#0D3B23]">
                    Tier {selectedMerchant.score.tier}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium">
                  {selectedMerchant.stallName} • {selectedMerchant.stallLocation}
                </p>
                <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                  {selectedMerchant.qrisId} • Bergabung sejak {selectedMerchant.joinDate}
                </p>
              </div>
            </div>

            {/* 3 Pillars Score Breakdown */}
            <div className="bg-[#F8FAF8] border border-slate-200 rounded-2xl p-4 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-black text-slate-900">
                  Rincian 3 Pilar Green Credit Score VERA:
                </span>
                <span className="font-black text-emerald-700 bg-lime-200 px-2 py-0.5 rounded-full">
                  Total: {selectedMerchant.score.total}/100
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                  <span className="text-slate-500 text-[10px] block font-medium">Finansial (50%)</span>
                  <p className="text-lg font-black text-[#0D3B23] mt-1">{selectedMerchant.score.financialScore}%</p>
                  <span className="text-[9px] text-slate-400">DSCR {selectedMerchant.dscrRatio}x</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                  <span className="text-slate-500 text-[10px] block font-medium">Aksi Hijau (30%)</span>
                  <p className="text-lg font-black text-emerald-700 mt-1">{selectedMerchant.score.greenScore}%</p>
                  <span className="text-[9px] text-slate-400">{selectedMerchant.organicWasteKgMonth} kg sampah</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                  <span className="text-slate-500 text-[10px] block font-medium">Digital (20%)</span>
                  <p className="text-lg font-black text-blue-700 mt-1">{selectedMerchant.score.digitalScore}%</p>
                  <span className="text-[9px] text-slate-400">Disiplin POS & QRIS</span>
                </div>
              </div>
            </div>

            {/* SAK EMKM Snapshot */}
            <div className="space-y-2 text-xs">
              <h4 className="font-black text-slate-900">Ringkasan SAK EMKM Terverifikasi</h4>
              <div className="bg-[#F8FAF8] p-3 rounded-2xl border border-slate-200 grid grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-400 text-[10px]">Pendapatan Usaha Bulanan:</span>
                  <p className="font-black text-slate-900 text-sm mt-0.5">
                    Rp {selectedMerchant.monthlyRevenue.toLocaleString('id-ID')}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px]">Rekomendasi Plafon KUR:</span>
                  <p className="font-black text-emerald-700 text-sm mt-0.5">
                    Rp {selectedMerchant.score.eligiblePlafon.toLocaleString('id-ID')} (Bunga {selectedMerchant.score.interestRatePromo}%)
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedMerchant(null)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-2xl"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
