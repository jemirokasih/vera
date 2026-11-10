import React, { useState } from 'react';
import { GreenAction, Merchant } from '../../types';
import {
  Store,
  Leaf,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Users,
  Building,
  Scale,
  Sparkles,
  MapPin,
  TrendingUp,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AdminViewProps {
  merchants: Merchant[];
  greenActions: GreenAction[];
  onVerifyGreenAction: (actionId: string, isApproved: boolean) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  merchants,
  greenActions,
  onVerifyGreenAction,
}) => {
  const [selectedBlock, setSelectedBlock] = useState<string>('Semua');

  const pendingActions = greenActions.filter(a => a.status === 'pending');
  const verifiedActions = greenActions.filter(a => a.status === 'verified');

  const handleVerify = (id: string, approve: boolean) => {
    onVerifyGreenAction(id, approve);
    if (approve) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#0d3b23', '#84cc16', '#10b981']
      });
    }
  };

  const filteredMerchants = selectedBlock === 'Semua'
    ? merchants
    : merchants.filter(m => m.stallLocation.includes(selectedBlock));

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 animate-fade-in">
      
      {/* Top Banner / Admin Identity */}
      <div className="bg-[#0D3B23] text-white rounded-[32px] p-6 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1 rounded-lg bg-lime-400 text-[#0D3B23] font-bold">
              <Store className="w-4 h-4" />
            </span>
            <span className="text-xs font-black text-lime-300 uppercase tracking-widest">
              Pusat Kendali Pengelola Pasar & Fasilitator Lapangan
            </span>
            <span className="text-[10px] bg-emerald-800 text-lime-300 px-2 py-0.5 rounded-full font-bold">
              Pasar Jambu Dua, Bogor
            </span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Dashboard Ekosistem Pasar Hijau & Validasi Lapangan
          </h2>
          <p className="text-xs text-emerald-100/90 mt-1 max-w-2xl leading-relaxed">
            Kolaborasi Perumda Pasar Pakuan Jaya, Dinas Koperasi & UMKM Kota Bogor, dan Jaringan Agen Fasilitator <strong>Ngariung Hub</strong> dalam memvalidasi aksi nyata keberlanjutan pedagang.
          </p>
        </div>

        <div className="bg-emerald-950/80 px-4 py-3 rounded-2xl border border-emerald-800/80 text-right">
          <span className="text-[10px] text-emerald-300 block font-medium">Status Kompos Pasar:</span>
          <span className="text-xs font-black text-lime-400 flex items-center justify-end gap-1.5">
            <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse"></span>
            Aktif (Rumah Kompos Blok A)
          </span>
        </div>
      </div>

      {/* Aggregate Ecosystem Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/90 p-4 rounded-3xl shadow-xs space-y-1">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold">
            <span>Sampah Organik Teralihkan</span>
            <Scale className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-emerald-700">
            1.428 <span className="text-xs font-normal text-slate-400">kg</span>
          </p>
          <span className="text-[11px] text-slate-500 font-medium">
            Teralihkan dari TPA Galuga bulan ini
          </span>
        </div>

        <div className="bg-white border border-slate-200/90 p-4 rounded-3xl shadow-xs space-y-1">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold">
            <span>Reduksi Kantong Plastik</span>
            <Leaf className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-[#0D3B23]">
            12.850 <span className="text-xs font-normal text-slate-400">pcs</span>
          </p>
          <span className="text-[11px] text-emerald-700 font-bold">
            Adopsi besek bambu & daun pisang
          </span>
        </div>

        <div className="bg-white border border-slate-200/90 p-4 rounded-3xl shadow-xs space-y-1">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold">
            <span>Pedagang Bersertifikasi VERA</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">
            42 <span className="text-xs font-normal text-slate-400">/ 185 Kios</span>
          </p>
          <span className="text-[11px] text-blue-700 font-bold">
            Target 100% digitalisasi pada Q3 2026
          </span>
        </div>

        <div className="bg-white border border-slate-200/90 p-4 rounded-3xl shadow-xs space-y-1">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold">
            <span>Fasilitas KUR Tersalurkan</span>
            <TrendingUp className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-amber-600">
            Rp 340 Juta
          </p>
          <span className="text-[11px] text-slate-500 font-medium">
            Mitra BSI, BRI, Mandiri Micro
          </span>
        </div>
      </div>

      {/* Two Column Layout: Field Verification Queue & Merchant Directory */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Field Facilitator Verification Queue (Ngariung Hub) (6 cols) */}
        <div className="lg:col-span-6 bg-white border border-slate-200/90 rounded-[32px] p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-lime-100 text-[#0D3B23]">
                <CheckCircle2 className="w-4 h-4" />
              </span>
              <div>
                <h3 className="font-black text-sm text-slate-900">
                  Antrean Validasi Fasilitator Lapangan
                </h3>
                <p className="text-[11px] text-slate-500">Agen Ngariung Hub Pasar Jambu Dua</p>
              </div>
            </div>
            <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
              {pendingActions.length} Menunggu
            </span>
          </div>

          <div className="space-y-3">
            {pendingActions.length === 0 ? (
              <div className="p-8 text-center bg-[#F8FAF8] rounded-2xl border border-slate-200 text-slate-500 text-xs space-y-1">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                <p className="font-bold text-slate-900">Semua Setoran Telah Diverifikasi!</p>
                <p>Tidak ada aksi hijau yang tertunda.</p>
              </div>
            ) : (
              pendingActions.map((action) => (
                <div
                  key={action.id}
                  className="bg-[#F8FAF8] border border-slate-200 rounded-2xl p-4 space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">{action.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">{action.description}</p>
                    </div>
                    <span className="text-xs font-black text-emerald-800 bg-lime-200 px-2 py-0.5 rounded-xl">
                      +{action.impactPoints} Poin
                    </span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1 shadow-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-medium">Catatan Timbangan:</span>
                      <span className="font-bold text-slate-800">{action.proofNote}</span>
                    </div>
                    {action.weightKg && (
                      <div className="flex justify-between">
                        <span className="text-slate-400 font-medium">Berat Fisik:</span>
                        <span className="font-black text-emerald-700">{action.weightKg} kg</span>
                      </div>
                    )}
                    <div className="flex justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                      <span>Waktu Input:</span>
                      <span>{action.timestamp}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => handleVerify(action.id, false)}
                      className="flex-1 py-2 bg-slate-100 hover:bg-rose-100 text-slate-600 hover:text-rose-700 text-xs font-bold rounded-2xl transition flex items-center justify-center gap-1"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Tolak</span>
                    </button>

                    <button
                      onClick={() => handleVerify(action.id, true)}
                      className="flex-1 py-2 bg-[#0D3B23] hover:bg-emerald-900 text-lime-300 text-xs font-black rounded-2xl shadow-sm transition flex items-center justify-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Validasi & Beri Poin</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Riwayat Validasi Terakhir */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <span className="text-xs font-bold text-slate-500">Setoran Terverifikasi Terkini</span>
            {verifiedActions.slice(0, 2).map((va) => (
              <div
                key={va.id}
                className="p-2.5 bg-[#F4F7F4] rounded-2xl border border-slate-200/80 flex items-center justify-between text-xs"
              >
                <div>
                  <p className="font-bold text-slate-900">{va.title}</p>
                  <p className="text-[10px] text-slate-500">{va.verifiedBy || 'Diverifikasi Fasilitator'}</p>
                </div>
                <span className="text-[10px] font-black text-emerald-800 bg-lime-100 px-2 py-0.5 rounded-full">
                  ✓ Valid ({va.impactPoints} Poin)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Pasar Jambu Dua Merchant Directory & Blocks (6 cols) */}
        <div className="lg:col-span-6 bg-white border border-slate-200/90 rounded-[32px] p-5 space-y-4 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-black text-sm text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-700" />
                Direktori Pedagang & Peta Blok Pasar
              </h3>
              <p className="text-[11px] text-slate-500">Monitoring kepatuhan & skor per blok kios</p>
            </div>

            {/* Block Filter */}
            <div className="flex gap-1 text-xs bg-[#F4F7F4] p-1 rounded-2xl border border-slate-200">
              {['Semua', 'Blok A', 'Blok B', 'Blok C'].map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBlock(b)}
                  className={`px-2.5 py-1 rounded-xl font-bold transition ${
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

          {/* Merchants List */}
          <div className="space-y-3">
            {filteredMerchants.map((m) => (
              <div
                key={m.id}
                className="bg-[#F8FAF8] border border-slate-200/90 hover:border-emerald-400 rounded-2xl p-4 transition space-y-2.5 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={m.avatarUrl}
                      alt={m.name}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                    />
                    <div>
                      <h4 className="font-black text-xs text-slate-900">{m.name}</h4>
                      <p className="text-[11px] text-slate-500">{m.stallName}</p>
                      <span className="text-[10px] text-emerald-700 font-mono font-bold">{m.stallLocation}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-black text-emerald-800 bg-lime-200 px-2.5 py-1 rounded-xl flex items-center gap-1 justify-end">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {m.score.total}/100
                    </span>
                    <span className="text-[10px] text-slate-500 block mt-1 font-semibold">Tier {m.score.tier}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200/80 text-[11px] text-center">
                  <div className="bg-white p-1.5 rounded-xl border border-slate-100">
                    <span className="text-slate-400 text-[10px] font-medium">Omzet Bln:</span>
                    <p className="font-black text-slate-900 text-[11px] mt-0.5">
                      Rp {(m.monthlyRevenue / 1000000).toFixed(1)} Jt
                    </p>
                  </div>
                  <div className="bg-white p-1.5 rounded-xl border border-slate-100">
                    <span className="text-slate-400 text-[10px] font-medium">Sampah Hijau:</span>
                    <p className="font-black text-emerald-700 text-[11px] mt-0.5">
                      {m.organicWasteKgMonth} kg
                    </p>
                  </div>
                  <div className="bg-white p-1.5 rounded-xl border border-slate-100">
                    <span className="text-slate-400 text-[10px] font-medium">Status Bank:</span>
                    <p className="font-black text-blue-700 text-[11px] mt-0.5">
                      {m.score.kurEligible ? 'Bankable ✓' : 'Bina'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Eco-Partner Integration Note */}
          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl flex items-start gap-2.5 text-xs text-slate-600">
            <Leaf className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-emerald-900">Integrasi Bank Sampah & Rumah Kompos Kota Bogor</p>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Setiap 10 kg sampah sayuran pasar yang difermentasikan di Rumah Kompos Jambu Dua otomatis menghasilkan kredit subsidi pupuk bagi kelompok tani penyalur sayur.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
