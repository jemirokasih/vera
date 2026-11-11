import React from 'react';
import { LoanApplication } from '../types';
import {
  Coins,
  ShieldCheck,
  TrendingUp,
  Leaf,
  CheckCircle2,
  ArrowRight,
  FileCheck,
  Award,
  AlertCircle
} from 'lucide-react';

interface DashboardViewProps {
  applications: LoanApplication[];
  onNavigate: (view: 'pipeline' | 'pricing' | 'certificate') => void;
  onSelectApplication: (id: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  applications,
  onNavigate,
  onSelectApplication,
}) => {
  const pendingApps = applications.filter((a) => a.status === 'review');
  const totalPipeline = applications.reduce((sum, a) => sum + a.requestedAmount, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Hero Banner (Deep Forest Green & Lime Reference) */}
      <div className="bg-[#0D3B23] text-white rounded-[32px] p-6 shadow-xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-black uppercase tracking-wider bg-lime-300 text-[#0D3B23] px-2.5 py-0.5 rounded-full">
              ★ Bank Underwriting Terminal 2026
            </span>
            <span className="text-xs text-emerald-200">•</span>
            <span className="text-xs font-semibold text-emerald-200">
              Fasilitas KUR Mikro Hijau Bunga Subsidi 3.0%
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Penilaian Kredit UMKM Pasar Tradisional Berbasis SAK EMKM & ESG
          </h2>
          <p className="text-xs text-emerald-100/90 mt-2 leading-relaxed">
            Mitigasi risiko kredit pedagang pasar melalui digital footprint kasir QRIS dan pemilahan sampah organik. Mengubah pedagang unbankable menjadi debitur prima dengan proyeksi NPL hanya <strong>0.28%</strong>.
          </p>
        </div>

        {/* Quick Summary Pill */}
        <div className="bg-emerald-950/80 border border-emerald-800 rounded-3xl p-5 text-right shrink-0">
          <span className="text-[10px] text-emerald-300 font-bold block uppercase tracking-wider">
            Total Pipeline Pengajuan
          </span>
          <p className="text-3xl font-black text-lime-400 mt-1">
            Rp {(totalPipeline / 1000000).toFixed(0)} <span className="text-sm font-normal text-white">Juta</span>
          </p>
          <span className="text-[11px] text-emerald-200 font-medium block mt-0.5">
            5 Calon Debitur Pasar Jambu Dua
          </span>
        </div>
      </div>

      {/* 4 Main KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Penyaluran Portofolio */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-4 shadow-xs space-y-1">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold">
            <span>Total Penyaluran Portofolio</span>
            <Coins className="w-4 h-4 text-[#0D3B23]" />
          </div>
          <p className="text-2xl font-black text-[#0D3B23]">
            Rp 340 Juta
          </p>
          <div className="flex items-center justify-between text-[11px] pt-1">
            <span className="text-slate-500">14 Debitur Terverifikasi</span>
            <span className="font-extrabold text-emerald-700">100% Lancar</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>

        {/* Card 2: Rata-Rata Skor VERA */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-4 shadow-xs space-y-1">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold">
            <span>Rata-Rata Skor VERA</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-emerald-700">
            81.4 <span className="text-xs font-normal text-slate-400">/ 100</span>
          </p>
          <span className="text-[11px] text-lime-700 font-bold bg-lime-100 px-2 py-0.5 rounded-full inline-block mt-1">
            Tier Hijau Emas (Risiko Rendah)
          </span>
        </div>

        {/* Card 3: NPL Proyeksi */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-4 shadow-xs space-y-1">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold">
            <span>Proyeksi Rasio NPL</span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">
            0.28%
          </p>
          <span className="text-[11px] text-emerald-700 font-bold block pt-1">
            ↓ 87% lebih rendah dari KUR mikro reguler (2.10%)
          </span>
        </div>

        {/* Card 4: Reduksi Karbon Portofolio */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-4 shadow-xs space-y-1">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold">
            <span>Dampak Lingkungan (ESG)</span>
            <Leaf className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-emerald-700">
            1.428 <span className="text-xs font-normal text-slate-400">kg/bln</span>
          </p>
          <span className="text-[11px] text-slate-500 font-medium block pt-1">
            Limbah organik terolah di Rumah Kompos
          </span>
        </div>

      </div>

      {/* Two Column Layout: Risk Matrix + Underwriting Queue Ticker */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Risk Matrix & VERA Distribution (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-[32px] p-6 space-y-5 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-black text-sm text-slate-900">
                Matriks Risiko & Distribusi Tier Skor VERA
              </h3>
              <p className="text-[11px] text-slate-500">Klasifikasi debitur berdasarkan algoritma 3 pilar VERA</p>
            </div>
            <button
              onClick={() => onNavigate('pricing')}
              className="text-xs text-emerald-800 font-bold hover:underline flex items-center gap-1"
            >
              <span>Aturan Bunga Subsidi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {/* Tier 1: Hijau Emas */}
            <div className="bg-[#F8FAF8] border border-slate-200/80 rounded-2xl p-4 space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-lime-400"></span>
                  <h4 className="font-extrabold text-xs text-slate-900">Tier Hijau Emas (Skor 80 - 100)</h4>
                </div>
                <span className="text-xs font-black text-emerald-800 bg-lime-200 px-2.5 py-0.5 rounded-full">
                  Bunga Subsidi 3.0%
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Risiko Sangat Rendah. Arus kas tervalidasi SAK EMKM harian, DSCR &gt; 2.0x, aksi hijau konsisten. Layak plafon s/d Rp 50 Juta.
              </p>
              <div className="flex justify-between items-center text-[11px] pt-1 border-t border-slate-200/70 text-slate-500 font-semibold">
                <span>3 Debitur Aktif (Bu Siti, Pak Ujang, Bu Enok)</span>
                <span className="font-bold text-[#0D3B23]">Plafon: Rp 115 Jt</span>
              </div>
            </div>

            {/* Tier 2: Rindang */}
            <div className="bg-[#F8FAF8] border border-slate-200/80 rounded-2xl p-4 space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  <h4 className="font-extrabold text-xs text-slate-900">Tier Rindang (Skor 70 - 79)</h4>
                </div>
                <span className="text-xs font-black text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded-full">
                  Bunga Subsidi 4.5%
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Risiko Rendah. DSCR 1.8x - 2.0x, kepatuhan pilah sampah baik. Layak plafon s/d Rp 25 Juta.
              </p>
              <div className="flex justify-between items-center text-[11px] pt-1 border-t border-slate-200/70 text-slate-500 font-semibold">
                <span>1 Debitur Aktif (Ibu Dewi Lestari)</span>
                <span className="font-bold text-[#0D3B23]">Plafon: Rp 25 Jt</span>
              </div>
            </div>

            {/* Tier 3: Daun */}
            <div className="bg-[#F8FAF8] border border-slate-200/80 rounded-2xl p-4 space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                  <h4 className="font-extrabold text-xs text-slate-900">Tier Daun (Skor 60 - 69)</h4>
                </div>
                <span className="text-xs font-black text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                  Bunga Normal 6.0% (Pendampingan)
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Risiko Sedang. Membutuhkan pendampingan fasilitator Ngariung Hub 2 minggu untuk naik tier. Layak plafon Rp 15 Juta.
              </p>
              <div className="flex justify-between items-center text-[11px] pt-1 border-t border-slate-200/70 text-slate-500 font-semibold">
                <span>1 Debitur Pembinaan (Pak Asep Sunandar)</span>
                <span className="font-bold text-amber-700">Plafon: Rp 15 Jt</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Underwriting Queue Ticker (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-[32px] p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-black text-sm text-slate-900 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-700" />
                Antrean Analisis Kredit
              </h3>
              <p className="text-[11px] text-slate-500">Aplikasi KUR Mikro Hijau masuk</p>
            </div>
            <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
              {pendingApps.length} Perlu Review
            </span>
          </div>

          <div className="space-y-3">
            {pendingApps.slice(0, 3).map((app) => (
              <div
                key={app.id}
                onClick={() => {
                  onSelectApplication(app.id);
                  onNavigate('pipeline');
                }}
                className="bg-[#F8FAF8] hover:bg-[#F0F7F1] border border-slate-200/80 rounded-2xl p-4 space-y-2 cursor-pointer transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-extrabold text-xs text-slate-900">{app.merchantName}</h4>
                    <p className="text-[11px] text-slate-500">{app.stallName} • {app.stallLocation.split(',')[0]}</p>
                  </div>
                  <span className="text-xs font-black text-emerald-800 bg-lime-200 px-2.5 py-0.5 rounded-full">
                    Skor {app.veraScore.total}
                  </span>
                </div>

                <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-xs flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Permohonan:</span>
                    <span className="font-black text-slate-900">
                      Rp {app.requestedAmount.toLocaleString('id-ID')} ({app.tenorMonths} Bln)
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block font-medium">Rekomendasi Bunga:</span>
                    <span className="font-extrabold text-emerald-700">
                      {app.subsidizedRate}% eff. p.a.
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[10px] text-slate-500 pt-1">
                  <span>DSCR: <strong className="text-slate-800">{app.financials.dscrRatio}x</strong></span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <span>Audit VERA-nya</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigate('pipeline')}
            className="w-full py-2.5 bg-[#F4F7F4] hover:bg-slate-200 text-slate-700 text-xs font-extrabold rounded-2xl transition flex items-center justify-center gap-1"
          >
            <span>Buka Seluruh Pipeline Pengajuan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};

