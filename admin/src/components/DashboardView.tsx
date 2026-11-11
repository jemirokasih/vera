import React from 'react';
import { Merchant, GreenValidationItem, MarketBlock } from '../types';
import {
  Scale,
  Leaf,
  Users,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MapPin,
  QrCode
} from 'lucide-react';

interface DashboardViewProps {
  merchants: Merchant[];
  validationItems: GreenValidationItem[];
  marketBlocks: MarketBlock[];
  onNavigate: (view: 'validation' | 'merchants') => void;
  onQuickVerify: (id: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  merchants,
  validationItems,
  marketBlocks,
  onNavigate,
  onQuickVerify,
}) => {
  const pendingItems = validationItems.filter(v => v.status === 'pending');
  const totalWaste = marketBlocks.reduce((s, b) => s + b.monthlyOrganicWasteKg, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Hero Banner (Inspired by Deep Forest Green & Lime Reference) */}
      <div className="bg-[#0D3B23] text-white rounded-[32px] p-6 shadow-xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-black uppercase tracking-wider bg-lime-300 text-[#0D3B23] px-2.5 py-0.5 rounded-full">
              ★ Ekosistem Pasar Hijau 2026
            </span>
            <span className="text-xs text-emerald-200">•</span>
            <span className="text-xs font-semibold text-emerald-200">
              Pilot Project Pasar Jambu Dua, Kota Bogor
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Monitoring Dampak Keberlanjutan & Kesiapan Bank Pedagang
          </h2>
          <p className="text-xs text-emerald-100/90 mt-2 leading-relaxed">
            Platform SaaS pencatatan keuangan berbasis <strong>SAK EMKM</strong> dan <strong>Green Credit Scoring</strong>. Menghubungkan pedagang tradisional dengan bank penyalur KUR Hijau dan fasilitas pengelolaan limbah organik.
          </p>
        </div>

        {/* Quick Summary Pill */}
        <div className="bg-emerald-950/80 border border-emerald-800 rounded-3xl p-5 text-right shrink-0">
          <span className="text-[10px] text-emerald-300 font-bold block uppercase tracking-wider">
            Total Sampah Teralihkan
          </span>
          <p className="text-3xl font-black text-lime-400 mt-1">
            {totalWaste.toLocaleString('id-ID')} <span className="text-sm font-normal text-white">kg</span>
          </p>
          <span className="text-[11px] text-emerald-200 font-medium block mt-0.5">
            ~1.4 Ton CO₂e Tereduksi dari TPA Galuga
          </span>
        </div>
      </div>

      {/* 4 Main KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Sampah Organik */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-4 shadow-xs space-y-1">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold">
            <span>Sampah Organik Terpilah</span>
            <Scale className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-emerald-700">
            1.428 <span className="text-xs font-normal text-slate-400">kg/bln</span>
          </p>
          <div className="flex items-center justify-between text-[11px] pt-1">
            <span className="text-slate-500">Target Bulan Ini: 2.000 kg</span>
            <span className="font-extrabold text-emerald-700">71.4%</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: '71.4%' }}></div>
          </div>
        </div>

        {/* Card 2: Reduksi Plastik */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-4 shadow-xs space-y-1">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold">
            <span>Reduksi Kantong Plastik</span>
            <Leaf className="w-4 h-4 text-lime-600" />
          </div>
          <p className="text-2xl font-black text-[#0D3B23]">
            12.850 <span className="text-xs font-normal text-slate-400">pcs</span>
          </p>
          <span className="text-[11px] text-emerald-700 font-bold block pt-1">
            Adopsi besek bambu & daun pisang
          </span>
        </div>

        {/* Card 3: Pedagang VERA */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-4 shadow-xs space-y-1">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold">
            <span>Pedagang Bersertifikasi VERA</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">
            42 <span className="text-xs font-normal text-slate-400">/ 185 Kios</span>
          </p>
          <div className="flex items-center justify-between text-[11px] pt-1">
            <span className="text-slate-500">Tingkat Penetrasi:</span>
            <span className="font-extrabold text-blue-700">22.7% (Fase 1)</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
            <div className="bg-blue-600 h-full rounded-full" style={{ width: '22.7%' }}></div>
          </div>
        </div>

        {/* Card 4: Penyaluran KUR Hijau */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-4 shadow-xs space-y-1">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold">
            <span>Penyaluran KUR Mikro Hijau</span>
            <TrendingUp className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-amber-600">
            Rp 340 Juta
          </p>
          <span className="text-[11px] text-emerald-700 font-bold block pt-1">
            NPL 0.28% • Bunga Subsidi 3%
          </span>
        </div>

      </div>

      {/* Two Column Layout: Block Waste Breakdown + Field Verification Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Market Blocks Breakdown (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-[32px] p-6 space-y-5 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-black text-sm text-slate-900">
                Kinerja Keberlanjutan per Blok Pasar
              </h3>
              <p className="text-[11px] text-slate-500">Volume sampah organik dan tingkat kepatuhan pedagang</p>
            </div>
            <button
              onClick={() => onNavigate('merchants')}
              className="text-xs text-emerald-800 font-bold hover:underline flex items-center gap-1"
            >
              <span>Lihat Detail Kios</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4">
            {marketBlocks.map((block) => (
              <div
                key={block.id}
                className="bg-[#F8FAF8] border border-slate-200/80 rounded-2xl p-4 space-y-2.5"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-extrabold text-xs text-slate-900">{block.name}</h4>
                    <p className="text-[11px] text-slate-500">{block.commodityType}</p>
                  </div>
                  <span className="text-xs font-black text-emerald-800 bg-lime-200 px-2.5 py-0.5 rounded-full">
                    {block.complianceRate}% Patuh
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200/70 text-center text-xs">
                  <div className="bg-white p-2 rounded-xl">
                    <span className="text-[10px] text-slate-400 block font-medium">Kios VERA:</span>
                    <span className="font-extrabold text-slate-900 text-xs">
                      {block.activeVeraStalls} / {block.totalStalls}
                    </span>
                  </div>

                  <div className="bg-white p-2 rounded-xl">
                    <span className="text-[10px] text-slate-400 block font-medium">Sampah Hijau:</span>
                    <span className="font-extrabold text-emerald-700 text-xs">
                      {block.monthlyOrganicWasteKg} kg
                    </span>
                  </div>

                  <div className="bg-white p-2 rounded-xl">
                    <span className="text-[10px] text-slate-400 block font-medium">Status Kompos:</span>
                    <span className="font-extrabold text-[#0D3B23] text-xs">
                      Terkoneksi ✓
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#0D3B23] h-full rounded-full transition-all duration-500"
                    style={{ width: `${block.complianceRate}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Cashless Digital Adoption Progress */}
          <div className="bg-[#F0F7F1] border border-emerald-200 p-4 rounded-2xl space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-[#0D3B23] flex items-center gap-1.5">
                <QrCode className="w-4 h-4 text-emerald-600" />
                Adopsi Transaksi Digital (QRIS vs Tunai)
              </span>
              <span className="font-black text-emerald-800">68% QRIS</span>
            </div>
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden flex">
              <div className="bg-[#0D3B23] h-full" style={{ width: '68%' }} title="QRIS 68%"></div>
              <div className="bg-amber-400 h-full" style={{ width: '32%' }} title="Tunai 32%"></div>
            </div>
            <div className="flex justify-between text-[10px] text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#0D3B23]"></span>
                QRIS Dinamis Pasar (Rp 842 Juta/Bln)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                Uang Tunai Fisik (Rp 395 Juta/Bln)
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Pending Field Verification Queue (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-[32px] p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-black text-sm text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Validasi Fasilitator Lapangan
              </h3>
              <p className="text-[11px] text-slate-500">Agen Ngariung Hub Pasar Jambu Dua</p>
            </div>
            <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
              {pendingItems.length} Menunggu
            </span>
          </div>

          <div className="space-y-3">
            {pendingItems.length === 0 ? (
              <div className="p-8 text-center bg-[#F8FAF8] rounded-2xl border border-slate-200 text-slate-500 text-xs">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <p className="font-bold text-slate-900">Semua Setoran Telah Diverifikasi!</p>
                <p className="text-[11px] mt-0.5">Tidak ada antrean timbangan tertunda.</p>
              </div>
            ) : (
              pendingItems.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="bg-[#F8FAF8] border border-slate-200/80 rounded-2xl p-4 space-y-2.5"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-extrabold text-xs text-slate-900">{item.merchantName}</h4>
                      <p className="text-[11px] text-slate-500">{item.stallName} • {item.stallLocation}</p>
                    </div>
                    <span className="text-xs font-black text-emerald-800 bg-lime-200 px-2.5 py-0.5 rounded-xl">
                      +{item.impactPoints} Poin
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 font-medium">{item.title}</p>
                  
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 text-[11px] text-slate-600 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Timbangan Fisik:</span>
                      <span className="font-black text-emerald-700">{item.weightKg} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Petugas Timbang:</span>
                      <span className="font-bold text-slate-800">{item.facilitatorName || 'Fasilitator'}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onQuickVerify(item.id)}
                    className="w-full py-2 bg-[#0D3B23] hover:bg-emerald-900 text-lime-300 text-xs font-black rounded-xl shadow-xs transition flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Validasi & Beri Poin Skor</span>
                  </button>
                </div>
              ))
            )}
          </div>

          <button
            onClick={() => onNavigate('validation')}
            className="w-full py-2.5 bg-[#F4F7F4] hover:bg-slate-200 text-slate-700 text-xs font-extrabold rounded-2xl transition flex items-center justify-center gap-1"
          >
            <span>Buka Seluruh Antrean Validasi</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
