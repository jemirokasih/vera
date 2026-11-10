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
        colors: ['#10b981', '#f59e0b']
      });
    }
  };

  const filteredMerchants = selectedBlock === 'Semua'
    ? merchants
    : merchants.filter(m => m.stallLocation.includes(selectedBlock));

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 animate-fade-in">
      
      {/* Top Banner / Admin Identity */}
      <div className="bg-gradient-to-r from-amber-950/70 via-slate-900 to-emerald-950/60 border border-amber-500/30 rounded-3xl p-5 md:p-6 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Store className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              Pusat Kendali Pengelola Pasar & Fasilitator Lapangan
            </span>
            <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono border border-slate-700">
              Pasar Jambu Dua, Bogor
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            Dashboard Ekosistem Pasar Hijau & Validasi Lapangan
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Kolaborasi Perumda Pasar Pakuan Jaya, Dinas Koperasi & UMKM Kota Bogor, dan Jaringan Agen Fasilitator <strong>Ngariung Hub</strong> dalam memvalidasi aksi nyata keberlanjutan pedagang.
          </p>
        </div>

        <div className="bg-slate-950/80 px-4 py-3 rounded-2xl border border-slate-800 text-right">
          <span className="text-[10px] text-slate-400 block font-medium">Status Kompos Pasar:</span>
          <span className="text-xs font-bold text-emerald-400 flex items-center justify-end gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Operasional Aktif (Rumah Kompos Blok A)
          </span>
        </div>
      </div>

      {/* Aggregate Ecosystem Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-1">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span>Sampah Organik Teralihkan</span>
            <Scale className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-xl font-black text-emerald-400">
            1.428 <span className="text-xs font-normal text-slate-400">kg</span>
          </p>
          <span className="text-[10px] text-slate-400 font-medium">
            Teralihkan dari TPA Galuga bulan ini
          </span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-1">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span>Reduksi Kantong Plastik</span>
            <Leaf className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-xl font-black text-white">
            12.850 <span className="text-xs font-normal text-slate-400">pcs</span>
          </p>
          <span className="text-[10px] text-emerald-400 font-medium">
            Adopsi besek & tas kain ramah lingkungan
          </span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-1">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span>Pedagang Bersertifikasi VERA</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-xl font-black text-white">
            42 <span className="text-xs font-normal text-slate-400">/ 185 Kios</span>
          </p>
          <span className="text-[10px] text-blue-400 font-medium">
            Target 100% digitalisasi pada Q3 2026
          </span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-1">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span>Fasilitas KUR Hijau Tersalurkan</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-xl font-black text-amber-400">
            Rp 340 Juta
          </p>
          <span className="text-[10px] text-slate-400 font-medium">
            Mitra BSI, BRI, Mandiri Micro
          </span>
        </div>
      </div>

      {/* Two Column Layout: Field Verification Queue & Merchant Directory */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Field Facilitator Verification Queue (Ngariung Hub) (6 cols) */}
        <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
              </span>
              <div>
                <h3 className="font-bold text-sm text-white">
                  Antrean Validasi Fasilitator Lapangan
                </h3>
                <p className="text-[11px] text-slate-400">Agen Ngariung Hub Pasar Jambu Dua</p>
              </div>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
              {pendingActions.length} Menunggu
            </span>
          </div>

          <div className="space-y-3">
            {pendingActions.length === 0 ? (
              <div className="p-8 text-center bg-slate-950/60 rounded-2xl border border-slate-800 text-slate-400 text-xs space-y-1">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                <p className="font-semibold text-white">Semua Setoran Telah Diverifikasi!</p>
                <p>Tidak ada aksi hijau yang tertunda.</p>
              </div>
            ) : (
              pendingActions.map((action) => (
                <div
                  key={action.id}
                  className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-xs text-white">{action.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">{action.description}</p>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950 border border-emerald-500/30 px-2 py-0.5 rounded-lg">
                      +{action.impactPoints} Poin
                    </span>
                  </div>

                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800/80 text-[11px] text-slate-300 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Catatan Timbangan:</span>
                      <span className="font-medium text-white">{action.proofNote}</span>
                    </div>
                    {action.weightKg && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Berat Fisik:</span>
                        <span className="font-bold text-emerald-400">{action.weightKg} kg</span>
                      </div>
                    )}
                    <div className="flex justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-800">
                      <span>Waktu:</span>
                      <span>{action.timestamp}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => handleVerify(action.id, false)}
                      className="flex-1 py-2 bg-slate-800 hover:bg-rose-950 hover:text-rose-400 text-slate-400 text-xs font-semibold rounded-xl border border-slate-700 transition flex items-center justify-center gap-1"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Tolak</span>
                    </button>

                    <button
                      onClick={() => handleVerify(action.id, true)}
                      className="flex-1 py-2 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-950 transition flex items-center justify-center gap-1"
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
          <div className="pt-3 border-t border-slate-800 space-y-2">
            <span className="text-xs font-bold text-slate-400">Setoran Terverifikasi Terkini</span>
            {verifiedActions.slice(0, 2).map((va) => (
              <div
                key={va.id}
                className="p-2.5 bg-slate-950/50 rounded-xl border border-slate-800/60 flex items-center justify-between text-xs"
              >
                <div>
                  <p className="font-medium text-white">{va.title}</p>
                  <p className="text-[10px] text-slate-500">{va.verifiedBy || 'Diverifikasi Fasilitator'}</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  ✓ Valid ({va.impactPoints} Poin)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Pasar Jambu Dua Merchant Directory & Blocks (6 cols) */}
        <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                Direktori Pedagang & Peta Blok Pasar
              </h3>
              <p className="text-[11px] text-slate-400">Monitoring kepatuhan & skor per blok kios</p>
            </div>

            {/* Block Filter */}
            <div className="flex gap-1 text-xs bg-slate-950 p-1 rounded-xl border border-slate-800">
              {['Semua', 'Blok A', 'Blok B', 'Blok C'].map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBlock(b)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition ${
                    selectedBlock === b
                      ? 'bg-amber-600 text-white'
                      : 'text-slate-400 hover:text-white'
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
                className="bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-4 transition space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={m.avatarUrl}
                      alt={m.name}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-700"
                    />
                    <div>
                      <h4 className="font-bold text-xs text-white">{m.name}</h4>
                      <p className="text-[11px] text-slate-400">{m.stallName}</p>
                      <span className="text-[10px] text-amber-400 font-mono">{m.stallLocation}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-black text-emerald-400 bg-emerald-950 px-2 py-1 rounded-lg border border-emerald-500/30 flex items-center gap-1 justify-end">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {m.score.total}/100
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-1">Tier {m.score.tier}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-[11px] text-center">
                  <div className="bg-slate-900 p-1.5 rounded-lg">
                    <span className="text-slate-400 text-[10px]">Omzet Bln:</span>
                    <p className="font-bold text-white text-[11px] mt-0.5">
                      Rp {(m.monthlyRevenue / 1000000).toFixed(1)} Jt
                    </p>
                  </div>
                  <div className="bg-slate-900 p-1.5 rounded-lg">
                    <span className="text-slate-400 text-[10px]">Sampah Terpilah:</span>
                    <p className="font-bold text-emerald-400 text-[11px] mt-0.5">
                      {m.organicWasteKgMonth} kg
                    </p>
                  </div>
                  <div className="bg-slate-900 p-1.5 rounded-lg">
                    <span className="text-slate-400 text-[10px]">Status Bank:</span>
                    <p className="font-bold text-blue-400 text-[11px] mt-0.5">
                      {m.score.kurEligible ? 'Bankable ✓' : 'Bina'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Eco-Partner Integration Note */}
          <div className="bg-emerald-950/30 border border-emerald-500/30 p-3 rounded-2xl flex items-start gap-2.5 text-xs text-slate-300">
            <Leaf className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-emerald-300">Integrasi Bank Sampah & Rumah Kompos Kota Bogor</p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Setiap 10 kg sampah sayuran pasar yang berhasil difermentasikan di Rumah Kompos Jambu Dua otomatis menghasilkan kredit subsidi pupuk bagi kelompok tani penyalur sayur.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

