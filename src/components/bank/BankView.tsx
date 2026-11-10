import React, { useState } from 'react';
import { LoanApplication, Merchant, Transaction } from '../../types';
import {
  Building2,
  ShieldCheck,
  TrendingUp,
  Leaf,
  FileCheck,
  CheckCircle2,
  Clock,
  Printer,
  Coins,
  Scale,
  Award,
  Download,
  AlertCircle,
  QrCode,
  DollarSign
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface BankViewProps {
  merchants: Merchant[];
  loanApplications: LoanApplication[];
  transactions: Transaction[];
  onApproveLoan: (applicationId: string) => void;
}

export const BankView: React.FC<BankViewProps> = ({
  merchants,
  loanApplications,
  transactions,
  onApproveLoan,
}) => {
  const [selectedAppId, setSelectedAppId] = useState<string>(
    loanApplications[0]?.id || 'app-01'
  );
  const [statusFilter, setStatusFilter] = useState<'all' | 'review' | 'approved'>('all');
  const [showApprovalNotice, setShowApprovalNotice] = useState(false);

  const selectedApp = loanApplications.find(a => a.id === selectedAppId) || loanApplications[0];
  const selectedMerchant = merchants.find(m => m.id === selectedApp?.merchantId) || merchants[0];

  const filteredApps = statusFilter === 'all'
    ? loanApplications
    : loanApplications.filter(a => a.status === statusFilter);

  const handleApprove = (id: string) => {
    onApproveLoan(id);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#2563eb', '#10b981', '#f59e0b']
    });
    setShowApprovalNotice(true);
    setTimeout(() => setShowApprovalNotice(false), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 animate-fade-in">
      
      {/* Top Banner / Bank Identity */}
      <div className="bg-gradient-to-r from-blue-950/80 via-slate-900 to-emerald-950/50 border border-blue-500/30 rounded-3xl p-5 md:p-6 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <Building2 className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
              Portal Analis Kredit & Impact Investment
            </span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-semibold border border-emerald-500/30">
              KUR Hijau 2026
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            Underwriting & Verifikasi Kelayakan Debitur VERA
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Penyaluran fasilitas Kredit Usaha Rakyat (KUR) Mikro Hijau berbasis skor perilaku keberlanjutan dan pembukuan standar <strong>SAK EMKM</strong> di Pasar Jambu Dua.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-950/80 px-4 py-3 rounded-2xl border border-slate-800">
          <img src="/logo.jpg" alt="VERA" className="w-9 h-9 rounded-xl object-contain bg-slate-900 p-0.5" />
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block font-medium">Metonimia Audit:</span>
            <span className="text-xs font-bold text-emerald-400">
              "Coba lihat VERA-nya"
            </span>
          </div>
        </div>
      </div>

      {/* KPI Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-1">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span>Total Pengajuan Aktif</span>
            <Coins className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-xl font-black text-white">
            Rp 105.000.000
          </p>
          <span className="text-[10px] text-blue-400 font-medium">
            3 Debitur Pasar Jambu Dua
          </span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-1">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span>Rata-Rata Skor VERA</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-xl font-black text-emerald-400">
            85.2 <span className="text-xs font-normal text-slate-400">/ 100</span>
          </p>
          <span className="text-[10px] text-emerald-400 font-medium">
            Tier Hijau Emas (Risiko Rendah)
          </span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-1">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span>Proyeksi NPL (Default)</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-xl font-black text-white">
            0.28%
          </p>
          <span className="text-[10px] text-emerald-400 font-medium">
            ↓ 72% lebih aman dari kredit konvensional
          </span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-1">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span>Pengalihan Sampah Organik</span>
            <Leaf className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-xl font-black text-emerald-400">
            429.5 <span className="text-xs font-normal text-slate-400">kg/bln</span>
          </p>
          <span className="text-[10px] text-slate-400 font-medium">
            Mitra DLH & Kompos Pasar
          </span>
        </div>
      </div>

      {/* Main Workbench Layout: Application Queue + Detailed Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Application Pipeline List (4 cols) */}
        <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-3xl p-4 space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-blue-400" />
              Antrean Pengajuan KUR
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
              {filteredApps.length}
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex gap-1.5 text-xs bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setStatusFilter('all')}
              className={`flex-1 py-1 rounded-lg font-medium transition ${
                statusFilter === 'all' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setStatusFilter('review')}
              className={`flex-1 py-1 rounded-lg font-medium transition ${
                statusFilter === 'review' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Review
            </button>
            <button
              onClick={() => setStatusFilter('approved')}
              className={`flex-1 py-1 rounded-lg font-medium transition ${
                statusFilter === 'approved' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Disetujui
            </button>
          </div>

          {/* Cards List */}
          <div className="space-y-2.5">
            {filteredApps.map((app) => {
              const isSelected = app.id === selectedAppId;
              return (
                <div
                  key={app.id}
                  onClick={() => setSelectedAppId(app.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-800 border-blue-500 shadow-md shadow-blue-950/40'
                      : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-xs text-white">{app.merchantName}</h4>
                      <p className="text-[11px] text-slate-400">{app.stallName}</p>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        app.status === 'approved'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {app.status === 'approved' ? '✓ Disetujui' : '⏳ Dalam Evaluasi'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/80">
                    <div>
                      <span className="text-[10px] text-slate-500">Permohonan:</span>
                      <p className="font-bold text-white">
                        Rp {app.requestedAmount.toLocaleString('id-ID')}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-500">Skor VERA:</span>
                      <p className="font-black text-emerald-400 flex items-center justify-end gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {app.veraScore}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Credit Dossier ("Coba lihat VERA-nya") (8 cols) */}
        {selectedApp && selectedMerchant ? (
          <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-3xl p-5 md:p-6 space-y-6 shadow-xl">
            
            {/* Dossier Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <img
                  src={selectedMerchant.avatarUrl}
                  alt={selectedMerchant.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500/40 shadow-md"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">{selectedMerchant.name}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Tier {selectedApp.tier}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    {selectedMerchant.stallName} • {selectedMerchant.stallLocation}
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                    {selectedMerchant.qrisId} • Terdaftar sejak {selectedMerchant.joinDate}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert(`Laporan Audit VERA untuk ${selectedMerchant.name} berhasil diunduh (PDF).\nDokumen ini tervalidasi dengan tanda tangan digital SAK EMKM dan DLH Kota Bogor.`)}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-1.5 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>

                {selectedApp.status !== 'approved' && (
                  <button
                    onClick={() => handleApprove(selectedApp.id)}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-950 flex items-center gap-1.5 transition hover:scale-105 active:scale-95"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Setujui KUR Hijau</span>
                  </button>
                )}
              </div>
            </div>

            {/* Approval Notification Banner */}
            {showApprovalNotice && (
              <div className="p-3 bg-emerald-500/20 border border-emerald-500/50 rounded-2xl flex items-center gap-2 text-xs text-emerald-300 animate-bounce">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Pengajuan pinjaman <strong>{selectedMerchant.name}</strong> berhasil disetujui! Surat Persetujuan Kredit telah diterbitkan ke aplikasi mobile pedagang.</span>
              </div>
            )}

            {/* 3 Pillars of VERA Scoring */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  Struktur Penilaian VERA Scorecard (Skor Total: {selectedMerchant.score.total}/100)
                </h4>
                <span className="text-[10px] text-emerald-400 font-semibold">
                  Rekomendasi: Bunga 3.0% (Diskon Subsidi Hijau)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Pilar 1: Finansial */}
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-semibold">1. Finansial (50%)</span>
                    <span className="text-emerald-400 font-bold">{selectedMerchant.score.financialScore}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${selectedMerchant.score.financialScore}%` }}></div>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight">
                    DSCR <strong>{selectedMerchant.score.dscrRatio}x</strong> (Kemampuan bayar angsuran 240% di atas pokok & bunga).
                  </p>
                </div>

                {/* Pilar 2: Aksi Hijau */}
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-semibold">2. Aksi Hijau (30%)</span>
                    <span className="text-emerald-400 font-bold">{selectedMerchant.score.greenScore}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-teal-400 h-full rounded-full" style={{ width: `${selectedMerchant.score.greenScore}%` }}></div>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight">
                    <strong>{selectedMerchant.organicWasteKgMonth} kg</strong> sampah sayur disetor ke Rumah Kompos; zero kresek hitam.
                  </p>
                </div>

                {/* Pilar 3: Digital Footprint */}
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-semibold">3. Jejak Digital (20%)</span>
                    <span className="text-blue-400 font-bold">{selectedMerchant.score.digitalScore}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: `${selectedMerchant.score.digitalScore}%` }}></div>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight">
                    Rutin catat di kasir VERA setiap hari; adopsi QRIS 65% total transaksi harian.
                  </p>
                </div>
              </div>
            </div>

            {/* SAK EMKM Financial Statements Audit Table */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-emerald-400" />
                  Audit Laporan Keuangan SAK EMKM Resmi (Terverifikasi Sistem)
                </h4>
                <span className="text-[10px] text-slate-400 font-mono">
                  Periode: Bulan Berjalan (Nov 2026)
                </span>
              </div>

              <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800 text-[11px]">
                    <tr>
                      <th className="py-2.5 px-3">Komponen Laporan SAK EMKM</th>
                      <th className="py-2.5 px-3 text-right">Nilai Tercatat</th>
                      <th className="py-2.5 px-3">Status Verifikasi VERA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    <tr>
                      <td className="py-2.5 px-3 font-medium text-white">Pendapatan Usaha (Penjualan Bersih)</td>
                      <td className="py-2.5 px-3 text-right font-bold text-emerald-400">
                        Rp {selectedMerchant.monthlyRevenue.toLocaleString('id-ID')}
                      </td>
                      <td className="py-2.5 px-3 text-slate-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Valid (Jejak QRIS & Kasir)</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 text-slate-300">Beban Pokok Penjualan (HPP Bahan)</td>
                      <td className="py-2.5 px-3 text-right text-slate-300">
                        -Rp {Math.round(selectedMerchant.monthlyRevenue * 0.58).toLocaleString('id-ID')}
                      </td>
                      <td className="py-2.5 px-3 text-slate-400">Struk Kulakan Pasar Induk</td>
                    </tr>
                    <tr className="bg-slate-900/40">
                      <td className="py-2.5 px-3 font-semibold text-slate-200">Laba Bruto (Kotor)</td>
                      <td className="py-2.5 px-3 text-right font-bold text-white">
                        Rp {Math.round(selectedMerchant.monthlyRevenue * 0.42).toLocaleString('id-ID')}
                      </td>
                      <td className="py-2.5 px-3 text-emerald-400 font-semibold">Margin 42.0%</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 text-slate-300">Beban Operasional & Retribusi Pasar</td>
                      <td className="py-2.5 px-3 text-right text-slate-300">
                        -Rp {Math.round(selectedMerchant.monthlyRevenue * 0.08).toLocaleString('id-ID')}
                      </td>
                      <td className="py-2.5 px-3 text-slate-400">Retribusi Kebersihan Jambu 2</td>
                    </tr>
                    <tr className="bg-emerald-950/20 font-bold border-t border-emerald-900/40">
                      <td className="py-3 px-3 text-white">Laba Bersih Sebelum Pajak</td>
                      <td className="py-3 px-3 text-right text-emerald-400 text-sm">
                        Rp {Math.round(selectedMerchant.monthlyRevenue * 0.34).toLocaleString('id-ID')}
                      </td>
                      <td className="py-3 px-3 text-emerald-400">
                        Sangat Memadai untuk Cicilan
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Loan Recommendation Box */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-blue-500/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">
                  Rekomendasi Keputusan Kredit Sistem VERA:
                </span>
                <p className="text-sm font-bold text-white mt-0.5">
                  Layak Disetujui (Plafon Rp {selectedApp.requestedAmount.toLocaleString('id-ID')} • Tenor {selectedApp.tenorMonths} Bulan • Bunga 3.0%)
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Tujuan: {selectedApp.purpose}
                </p>
              </div>

              {selectedApp.status === 'approved' ? (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-xs whitespace-nowrap">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Kredit Disetujui Bank</span>
                </div>
              ) : (
                <button
                  onClick={() => handleApprove(selectedApp.id)}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-950 whitespace-nowrap transition"
                >
                  Eksekusi Persetujuan
                </button>
              )}
            </div>

          </div>
        ) : (
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-400">
            Pilih salah satu aplikasi kredit di sebelah kiri untuk melihat rincian VERA.
          </div>
        )}

      </div>

    </div>
  );
};

