import React, { useState } from 'react';
import { LoanApplication, Merchant, Transaction } from '../../types';
import veraLogo from '../../assets/logo.jpg';
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
  DollarSign,
  X
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
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

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
      colors: ['#0d3b23', '#84cc16', '#10b981']
    });
    setShowApprovalNotice(true);
    setTimeout(() => setShowApprovalNotice(false), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 animate-fade-in">
      
      {/* Top Banner / Bank Identity */}
      <div className="bg-[#0D3B23] text-white rounded-[32px] p-6 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1 rounded-lg bg-lime-400 text-[#0D3B23] font-bold">
              <Building2 className="w-4 h-4" />
            </span>
            <span className="text-xs font-black text-lime-300 uppercase tracking-widest">
              Portal Analis Bank & Impact Underwriting
            </span>
            <span className="text-[10px] bg-emerald-800 text-lime-300 px-2 py-0.5 rounded-full font-bold">
              KUR Hijau 2026
            </span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Verifikasi Kelayakan Kredit & Skor Keberlanjutan VERA
          </h2>
          <p className="text-xs text-emerald-100/90 mt-1 max-w-2xl leading-relaxed">
            Penyaluran fasilitas Kredit Usaha Rakyat (KUR) Mikro Hijau berbasis data riil <strong>SAK EMKM</strong> dan perilaku ramah lingkungan Pasar Jambu Dua.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-emerald-950/80 px-4 py-3 rounded-2xl border border-emerald-800/80">
          <img src={veraLogo} alt="VERA" className="w-9 h-9 rounded-xl object-contain bg-white p-0.5" />
          <div className="text-right">
            <span className="text-[10px] text-emerald-300 block font-medium">Metonimia Analis:</span>
            <span className="text-xs font-black text-lime-400">
              "Coba lihat VERA-nya"
            </span>
          </div>
        </div>
      </div>

      {/* KPI Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/90 p-4 rounded-3xl shadow-xs space-y-1">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold">
            <span>Total Pengajuan Aktif</span>
            <Coins className="w-4 h-4 text-[#0D3B23]" />
          </div>
          <p className="text-2xl font-black text-[#0D3B23]">
            Rp 105.000.000
          </p>
          <span className="text-[11px] text-emerald-700 font-bold">
            3 Debitur Pasar Jambu Dua
          </span>
        </div>

        <div className="bg-white border border-slate-200/90 p-4 rounded-3xl shadow-xs space-y-1">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold">
            <span>Rata-Rata Skor VERA</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-emerald-700">
            85.2 <span className="text-xs font-normal text-slate-400">/ 100</span>
          </p>
          <span className="text-[11px] text-lime-700 font-bold bg-lime-100 px-2 py-0.5 rounded-full">
            Tier Hijau Emas (Risiko Rendah)
          </span>
        </div>

        <div className="bg-white border border-slate-200/90 p-4 rounded-3xl shadow-xs space-y-1">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold">
            <span>Proyeksi NPL (Gagal Bayar)</span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">
            0.28%
          </p>
          <span className="text-[11px] text-emerald-700 font-bold">
            ↓ 72% lebih aman dari kredit umum
          </span>
        </div>

        <div className="bg-white border border-slate-200/90 p-4 rounded-3xl shadow-xs space-y-1">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold">
            <span>Sampah Teralihkan</span>
            <Leaf className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-emerald-700">
            429.5 <span className="text-xs font-normal text-slate-400">kg/bln</span>
          </p>
          <span className="text-[11px] text-slate-500 font-medium">
            Verifikasi Rumah Kompos
          </span>
        </div>
      </div>

      {/* Main Workbench: Application Queue + Detailed Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Application Pipeline List (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-slate-200/90 rounded-[32px] p-4 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-sm text-slate-900 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-700" />
              Antrean Pengajuan KUR
            </h3>
            <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-[#F4F7F4] text-[#0D3B23]">
              {filteredApps.length} Debitur
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex gap-1 text-xs bg-[#F4F7F4] p-1 rounded-2xl border border-slate-200">
            <button
              onClick={() => setStatusFilter('all')}
              className={`flex-1 py-1.5 rounded-xl font-bold transition ${
                statusFilter === 'all' ? 'bg-[#0D3B23] text-lime-300 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setStatusFilter('review')}
              className={`flex-1 py-1.5 rounded-xl font-bold transition ${
                statusFilter === 'review' ? 'bg-[#0D3B23] text-lime-300 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Review
            </button>
            <button
              onClick={() => setStatusFilter('approved')}
              className={`flex-1 py-1.5 rounded-xl font-bold transition ${
                statusFilter === 'approved' ? 'bg-[#0D3B23] text-lime-300 shadow-xs' : 'text-slate-600 hover:text-slate-900'
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
                      ? 'bg-[#F0F7F1] border-emerald-500 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-extrabold text-xs text-slate-900">{app.merchantName}</h4>
                      <p className="text-[11px] text-slate-500">{app.stallName}</p>
                    </div>
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        app.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {app.status === 'approved' ? '✓ Disetujui' : '⏳ Review'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Permohonan:</span>
                      <p className="font-black text-slate-900">
                        Rp {app.requestedAmount.toLocaleString('id-ID')}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block font-medium">Skor VERA:</span>
                      <p className="font-black text-emerald-700 flex items-center justify-end gap-1">
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
          <div className="lg:col-span-8 bg-white border border-slate-200/90 rounded-[32px] p-6 space-y-6 shadow-xs">
            
            {/* Dossier Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <img
                  src={selectedMerchant.avatarUrl}
                  alt={selectedMerchant.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500 shadow-sm"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black text-slate-900">{selectedMerchant.name}</h3>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-lime-300 text-[#0D3B23]">
                      Tier {selectedApp.tier}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">
                    {selectedMerchant.stallName} • {selectedMerchant.stallLocation}
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                    {selectedMerchant.qrisId} • Terdaftar sejak {selectedMerchant.joinDate}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsCertModalOpen(true)}
                  className="px-3.5 py-2 bg-[#F4F7F4] hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-2xl border border-slate-200 flex items-center gap-1.5 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Cetak Sertifikat VERA</span>
                </button>

                {selectedApp.status !== 'approved' && (
                  <button
                    onClick={() => handleApprove(selectedApp.id)}
                    className="px-4 py-2 bg-[#0D3B23] hover:bg-emerald-900 text-lime-300 text-xs font-black rounded-2xl shadow-md flex items-center gap-1.5 transition hover:scale-105 active:scale-95"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Setujui KUR Hijau</span>
                  </button>
                )}
              </div>
            </div>

            {/* Approval Notification Banner */}
            {showApprovalNotice && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center gap-2 text-xs text-emerald-800 font-bold animate-bounce">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Pengajuan pinjaman <strong>{selectedMerchant.name}</strong> berhasil disetujui! Surat Keputusan Kredit telah diterbitkan ke aplikasi pedagang.</span>
              </div>
            )}

            {/* 3 Pillars of VERA Scoring */}
            <div className="bg-[#F8FAF8] border border-emerald-100 rounded-3xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-500" />
                  Matriks Skor VERA (Total: {selectedMerchant.score.total}/100)
                </h4>
                <span className="text-[11px] text-emerald-800 font-extrabold bg-lime-200 px-2.5 py-0.5 rounded-full">
                  Rekomendasi Bunga: 3.0% eff. p.a.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Pilar 1: Finansial */}
                <div className="bg-white p-3 rounded-2xl border border-slate-200/80 space-y-1.5 shadow-xs">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-600 font-bold">1. Finansial (50%)</span>
                    <span className="text-[#0D3B23] font-black">{selectedMerchant.score.financialScore}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#0D3B23] h-full rounded-full" style={{ width: `${selectedMerchant.score.financialScore}%` }}></div>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    DSCR <strong>{selectedMerchant.score.dscrRatio}x</strong> (Kemampuan bayar 240% di atas pokok & bunga).
                  </p>
                </div>

                {/* Pilar 2: Aksi Hijau */}
                <div className="bg-white p-3 rounded-2xl border border-slate-200/80 space-y-1.5 shadow-xs">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-600 font-bold">2. Aksi Hijau (30%)</span>
                    <span className="text-emerald-700 font-black">{selectedMerchant.score.greenScore}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${selectedMerchant.score.greenScore}%` }}></div>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    <strong>{selectedMerchant.organicWasteKgMonth} kg</strong> sampah sayur disetor ke Rumah Kompos; bebas kresek hitam.
                  </p>
                </div>

                {/* Pilar 3: Digital Footprint */}
                <div className="bg-white p-3 rounded-2xl border border-slate-200/80 space-y-1.5 shadow-xs">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-600 font-bold">3. Digital (20%)</span>
                    <span className="text-blue-700 font-black">{selectedMerchant.score.digitalScore}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: `${selectedMerchant.score.digitalScore}%` }}></div>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    Rutin catat di kasir VERA setiap hari; adopsi QRIS 65% total transaksi harian.
                  </p>
                </div>
              </div>
            </div>

            {/* SAK EMKM Financial Statements Audit Table */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-emerald-600" />
                  Audit Laporan Keuangan SAK EMKM Resmi (Terverifikasi Sistem)
                </h4>
                <span className="text-[10px] text-slate-500 font-mono">
                  Periode: Bulan Berjalan (Nov 2026)
                </span>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden text-xs shadow-xs">
                <table className="w-full text-left">
                  <thead className="bg-[#F8FAF8] text-slate-600 border-b border-slate-200 text-[11px] font-bold">
                    <tr>
                      <th className="py-2.5 px-3">Komponen Laporan SAK EMKM</th>
                      <th className="py-2.5 px-3 text-right">Nilai Tercatat</th>
                      <th className="py-2.5 px-3">Status Verifikasi VERA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-slate-900">Pendapatan Usaha (Penjualan Bersih)</td>
                      <td className="py-2.5 px-3 text-right font-black text-emerald-700">
                        Rp {selectedMerchant.monthlyRevenue.toLocaleString('id-ID')}
                      </td>
                      <td className="py-2.5 px-3 text-emerald-800 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Valid (Jejak QRIS & Kasir)</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 text-slate-600">Beban Pokok Penjualan (HPP Bahan)</td>
                      <td className="py-2.5 px-3 text-right text-slate-600">
                        -Rp {Math.round(selectedMerchant.monthlyRevenue * 0.58).toLocaleString('id-ID')}
                      </td>
                      <td className="py-2.5 px-3 text-slate-500">Struk Kulakan Pasar Induk</td>
                    </tr>
                    <tr className="bg-[#F8FAF8]">
                      <td className="py-2.5 px-3 font-bold text-slate-800">Laba Bruto (Kotor)</td>
                      <td className="py-2.5 px-3 text-right font-black text-slate-900">
                        Rp {Math.round(selectedMerchant.monthlyRevenue * 0.42).toLocaleString('id-ID')}
                      </td>
                      <td className="py-2.5 px-3 text-emerald-700 font-bold">Margin 42.0%</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 text-slate-600">Beban Operasional & Retribusi Pasar</td>
                      <td className="py-2.5 px-3 text-right text-slate-600">
                        -Rp {Math.round(selectedMerchant.monthlyRevenue * 0.08).toLocaleString('id-ID')}
                      </td>
                      <td className="py-2.5 px-3 text-slate-500">Retribusi Kebersihan Jambu 2</td>
                    </tr>
                    <tr className="bg-emerald-50/70 font-black border-t border-emerald-200">
                      <td className="py-3 px-3 text-[#0D3B23]">Laba Bersih Sebelum Pajak</td>
                      <td className="py-3 px-3 text-right text-emerald-800 text-sm">
                        Rp {Math.round(selectedMerchant.monthlyRevenue * 0.34).toLocaleString('id-ID')}
                      </td>
                      <td className="py-3 px-3 text-emerald-800">
                        Sangat Memadai untuk Cicilan
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Loan Decision Footer */}
            <div className="bg-[#F4F7F4] p-4 rounded-3xl border border-emerald-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold">
                  Rekomendasi Keputusan Kredit Sistem VERA:
                </span>
                <p className="text-sm font-black text-[#0D3B23] mt-0.5">
                  Layak Disetujui (Plafon Rp {selectedApp.requestedAmount.toLocaleString('id-ID')} • Tenor {selectedApp.tenorMonths} Bulan • Bunga 3.0%)
                </p>
                <p className="text-xs text-slate-600 mt-0.5">
                  Tujuan: {selectedApp.purpose}
                </p>
              </div>

              {selectedApp.status === 'approved' ? (
                <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-emerald-100 text-emerald-900 font-black text-xs whitespace-nowrap">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Kredit Disetujui Bank</span>
                </div>
              ) : (
                <button
                  onClick={() => handleApprove(selectedApp.id)}
                  className="px-5 py-2.5 bg-[#0D3B23] hover:bg-emerald-900 text-lime-300 font-black text-xs rounded-2xl shadow-md whitespace-nowrap transition"
                >
                  Eksekusi Persetujuan
                </button>
              )}
            </div>

          </div>
        ) : (
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-[32px] p-12 text-center text-slate-400">
            Pilih salah satu aplikasi kredit di sebelah kiri untuk melihat rincian VERA.
          </div>
        )}

      </div>

      {/* MODAL SERTIFIKAT KELAYAKAN KREDIT VERA (PRINTABLE) */}
      {isCertModalOpen && selectedMerchant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-2xl bg-white border-4 border-[#0D3B23] rounded-[40px] p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsCertModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-500 font-bold"
            >
              ✕
            </button>

            {/* Certificate Header */}
            <div className="text-center pb-4 border-b-2 border-[#0D3B23]">
              <div className="flex items-center justify-center gap-3 mb-2">
                <img src={veraLogo} alt="VERA" className="w-12 h-12 object-contain" />
                <h1 className="text-2xl font-black text-[#0D3B23] tracking-wider">
                  VERA READINESS ASSESSMENT
                </h1>
              </div>
              <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                Surat Keterangan Kelayakan Kredit Usaha Rakyat (KUR) Mikro Hijau
              </p>
              <p className="text-[11px] text-slate-400 font-mono mt-1">
                No. Sertifikat: VERA/SKK/2026/XI/0842 • Pilot Project: Pasar Jambu Dua, Kota Bogor
              </p>
            </div>

            {/* Merchant Details */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-[#F8FAF8] p-3 rounded-2xl border border-slate-200">
                <span className="text-slate-500 font-semibold block">Nama Pemilik Usaha:</span>
                <p className="font-black text-slate-900 text-sm mt-0.5">{selectedMerchant.name}</p>
                <span className="text-[11px] text-slate-500">{selectedMerchant.stallName}</span>
              </div>
              <div className="bg-[#F8FAF8] p-3 rounded-2xl border border-slate-200">
                <span className="text-slate-500 font-semibold block">Lokasi Lapak Pasar:</span>
                <p className="font-bold text-slate-900 mt-0.5">{selectedMerchant.stallLocation}</p>
                <span className="text-[11px] text-slate-500 font-mono">{selectedMerchant.qrisId}</span>
              </div>
            </div>

            {/* VERA Score Summary */}
            <div className="bg-[#0D3B23] text-white p-5 rounded-3xl text-center space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-lime-300">
                Tingkat Kesiapan Bankabilitas & Keberlanjutan
              </span>
              <div className="flex justify-center items-baseline gap-2">
                <span className="text-5xl font-black text-lime-400">{selectedMerchant.score.total}</span>
                <span className="text-base font-bold text-emerald-200">/ 100</span>
              </div>
              <p className="text-xs font-bold text-emerald-100">
                Kategori: Tier {selectedMerchant.score.tier} (Sangat Bankable - Rekomendasi Suku Bunga Subsidi 3.0%)
              </p>
            </div>

            {/* Signatures */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200 text-center text-xs">
              <div>
                <p className="text-slate-400 text-[10px]">Verifikasi Sistem:</p>
                <p className="font-black text-[#0D3B23] mt-8">VERA AI Engine</p>
                <span className="text-[9px] text-slate-400">SAK EMKM Algorithm</span>
              </div>
              <div>
                <p className="text-slate-400 text-[10px]">Fasilitator Lapangan:</p>
                <p className="font-black text-slate-900 mt-8">Dani Saputra</p>
                <span className="text-[9px] text-slate-400">Agen Ngariung Hub Jambu 2</span>
              </div>
              <div>
                <p className="text-slate-400 text-[10px]">Analis Kredit Bank:</p>
                <p className="font-black text-slate-900 mt-8">Bank Mitra BSI/BRI</p>
                <span className="text-[9px] text-slate-400">Green Microfinance Dept</span>
              </div>
            </div>

            {/* Print Button */}
            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => window.print()}
                className="px-6 py-2.5 bg-[#0D3B23] hover:bg-emerald-900 text-lime-300 text-xs font-black rounded-2xl flex items-center gap-2 shadow-md"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak Dokumen Resmi</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
