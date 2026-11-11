import React, { useState } from 'react';
import { LoanApplication } from '../types';
import {
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  Download,
  Award,
  Leaf,
  Scale,
  TrendingUp,
  Coins,
  AlertCircle,
  Building2,
  Printer
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PipelineViewProps {
  applications: LoanApplication[];
  selectedAppId: string;
  onSelectApplication: (id: string) => void;
  onApprove: (id: string) => void;
  onOpenCertificate: (app: LoanApplication) => void;
  searchQuery: string;
}

export const PipelineView: React.FC<PipelineViewProps> = ({
  applications,
  selectedAppId,
  onSelectApplication,
  onApprove,
  onOpenCertificate,
  searchQuery,
}) => {
  const [filter, setFilter] = useState<'all' | 'review' | 'approved'>('all');
  const [showApprovalNotice, setShowApprovalNotice] = useState(false);

  const filtered = applications.filter((a) => {
    const matchStatus = filter === 'all' || a.status === filter;
    const matchSearch = !searchQuery ||
      a.merchantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.stallName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.stallLocation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  const selectedApp = applications.find((a) => a.id === selectedAppId) || filtered[0] || applications[0];

  const handleApproveClick = (id: string) => {
    onApprove(id);
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#0d3b23', '#84cc16', '#10b981']
    });
    setShowApprovalNotice(true);
    setTimeout(() => setShowApprovalNotice(false), 4000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Bar */}
      <div className="bg-white border border-slate-200/90 rounded-[32px] p-6 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-lg bg-lime-400 text-[#0D3B23] font-bold">
              <Building2 className="w-4 h-4" />
            </span>
            <span className="text-xs font-black text-[#0D3B23] uppercase tracking-wider">
              Underwriting Workbench
            </span>
          </div>
          <h2 className="text-xl font-black text-slate-900">
            Pipeline Aplikasi KUR Mikro Hijau Pasar Jambu Dua
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Metonimia evaluasi: <strong>"Coba lihat VERA-nya"</strong> untuk memvalidasi kelayakan kredit debitur.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-1.5 bg-[#F4F7F4] p-1 rounded-2xl border border-slate-200 text-xs">
          {[
            { id: 'all', label: 'Semua Aplikasi' },
            { id: 'review', label: 'Dalam Review' },
            { id: 'approved', label: 'Disetujui' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as typeof filter)}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition ${
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

      {/* Main Master-Detail Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Applicant List (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-slate-200/90 rounded-[32px] p-4 space-y-3 shadow-xs">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-black text-slate-900">
              Daftar Permohonan ({filtered.length})
            </span>
            <span className="text-[10px] text-slate-400 font-semibold">
              Terurut Berdasarkan Skor VERA
            </span>
          </div>

          <div className="space-y-2.5">
            {filtered.map((app) => {
              const isSelected = app.id === selectedApp?.id;
              return (
                <div
                  key={app.id}
                  onClick={() => onSelectApplication(app.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#F0F7F1] border-emerald-500 shadow-sm'
                      : 'bg-[#F8FAF8] border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-extrabold text-xs text-slate-900">{app.merchantName}</h4>
                      <p className="text-[11px] text-slate-500">{app.stallName}</p>
                    </div>
                    <span
                      className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                        app.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {app.status === 'approved' ? '✓ Disetujui' : '⏳ Review'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/70">
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
                        {app.veraScore.total}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Underwriting Dossier ("Coba lihat VERA-nya") (8 cols) */}
        {selectedApp ? (
          <div className="lg:col-span-8 bg-white border border-slate-200/90 rounded-[32px] p-6 space-y-6 shadow-xs">
            
            {/* Dossier Top Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <img
                  src={selectedApp.avatarUrl}
                  alt={selectedApp.merchantName}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500 shadow-sm"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black text-slate-900">{selectedApp.merchantName}</h3>
                    <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-lime-300 text-[#0D3B23]">
                      Tier {selectedApp.veraScore.tier}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">
                    {selectedApp.stallName} • {selectedApp.stallLocation}
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                    {selectedApp.qrisId} • Terdaftar sejak {selectedApp.joinDate}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenCertificate(selectedApp)}
                  className="px-3.5 py-2 bg-[#F4F7F4] hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-2xl border border-slate-200 flex items-center gap-1.5 transition"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak Sertifikat</span>
                </button>

                {selectedApp.status !== 'approved' && (
                  <button
                    onClick={() => handleApproveClick(selectedApp.id)}
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
                <span>Permohonan pinjaman <strong>{selectedApp.merchantName}</strong> berhasil disetujui! Surat Keputusan Kredit telah diterbitkan ke aplikasi pedagang.</span>
              </div>
            )}

            {/* VERA Scorecard 3-Pillar Breakdown */}
            <div className="bg-[#F8FAF8] border border-emerald-100 rounded-3xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-500" />
                  Struktur Penilaian VERA Scorecard (Total: {selectedApp.veraScore.total}/100)
                </h4>
                <span className="text-[11px] text-emerald-800 font-extrabold bg-lime-200 px-2.5 py-0.5 rounded-full">
                  Rekomendasi Bunga: {selectedApp.subsidizedRate}% eff. p.a.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Pilar 1: Finansial */}
                <div className="bg-white p-3 rounded-2xl border border-slate-200/80 space-y-1.5 shadow-xs">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-600 font-bold">1. Finansial (50%)</span>
                    <span className="text-[#0D3B23] font-black">{selectedApp.veraScore.financialScore}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#0D3B23] h-full rounded-full" style={{ width: `${selectedApp.veraScore.financialScore}%` }}></div>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    DSCR <strong>{selectedApp.financials.dscrRatio}x</strong> (Kemampuan bayar 240% di atas pokok & bunga).
                  </p>
                </div>

                {/* Pilar 2: Aksi Hijau */}
                <div className="bg-white p-3 rounded-2xl border border-slate-200/80 space-y-1.5 shadow-xs">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-600 font-bold">2. Aksi Hijau (30%)</span>
                    <span className="text-emerald-700 font-black">{selectedApp.veraScore.greenScore}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${selectedApp.veraScore.greenScore}%` }}></div>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    <strong>{selectedApp.greenImpact.organicWasteKgMonth} kg</strong> sampah sayur disetor ke Rumah Kompos.
                  </p>
                </div>

                {/* Pilar 3: Digital Footprint */}
                <div className="bg-white p-3 rounded-2xl border border-slate-200/80 space-y-1.5 shadow-xs">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-600 font-bold">3. Digital (20%)</span>
                    <span className="text-blue-700 font-black">{selectedApp.veraScore.digitalScore}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: `${selectedApp.veraScore.digitalScore}%` }}></div>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    Rutin catat di kasir VERA setiap hari; adopsi QRIS {selectedApp.financials.qrisSharePercent}%.
                  </p>
                </div>
              </div>
            </div>

            {/* SAK EMKM Financial Audit Table */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-emerald-600" />
                  Audit Laporan Keuangan SAK EMKM Resmi (Terverifikasi Sistem)
                </h4>
                <span className="text-[10px] text-slate-500 font-mono">
                  Bulan Berjalan (Nov 2026)
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
                        Rp {selectedApp.financials.monthlyRevenue.toLocaleString('id-ID')}
                      </td>
                      <td className="py-2.5 px-3 text-emerald-800 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Valid (Jejak QRIS & Kasir)</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 text-slate-600">Beban Pokok Penjualan (HPP Bahan)</td>
                      <td className="py-2.5 px-3 text-right text-slate-600">
                        -Rp {selectedApp.financials.cogs.toLocaleString('id-ID')}
                      </td>
                      <td className="py-2.5 px-3 text-slate-500">Struk Kulakan Pasar Induk</td>
                    </tr>
                    <tr className="bg-[#F8FAF8]">
                      <td className="py-2.5 px-3 font-bold text-slate-800">Laba Bruto (Kotor)</td>
                      <td className="py-2.5 px-3 text-right font-black text-slate-900">
                        Rp {selectedApp.financials.grossProfit.toLocaleString('id-ID')}
                      </td>
                      <td className="py-2.5 px-3 text-emerald-700 font-bold">
                        Margin {Math.round((selectedApp.financials.grossProfit / selectedApp.financials.monthlyRevenue) * 100)}%
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 text-slate-600">Beban Operasional & Retribusi Pasar</td>
                      <td className="py-2.5 px-3 text-right text-slate-600">
                        -Rp {selectedApp.financials.operatingExpenses.toLocaleString('id-ID')}
                      </td>
                      <td className="py-2.5 px-3 text-slate-500">Retribusi Kebersihan Jambu 2</td>
                    </tr>
                    <tr className="bg-emerald-50/70 font-black border-t border-emerald-200">
                      <td className="py-3 px-3 text-[#0D3B23]">Laba Bersih Sebelum Pajak</td>
                      <td className="py-3 px-3 text-right text-emerald-800 text-sm">
                        Rp {selectedApp.financials.netProfit.toLocaleString('id-ID')}
                      </td>
                      <td className="py-3 px-3 text-emerald-800">
                        Sangat Memadai untuk Cicilan
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Green Audit & Eco Actions List */}
            <div className="space-y-2 text-xs">
              <h4 className="font-black text-slate-900 flex items-center gap-1.5">
                <Leaf className="w-4 h-4 text-emerald-600" />
                Audit Kepatuhan Keberlanjutan Lapangan (Ngariung Hub)
              </h4>
              <div className="bg-[#F8FAF8] p-3.5 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-center text-[11px]">
                  <span>Fasilitator Verifikator: <strong>{selectedApp.greenImpact.facilitatorName}</strong></span>
                  <span className="font-bold text-emerald-700">Status: {selectedApp.greenImpact.wasteStatus === 'verified' ? '✓ Valid' : 'Pending'}</span>
                </div>
                <div className="space-y-1">
                  {selectedApp.greenImpact.ecoActionsList.map((action, i) => (
                    <p key={i} className="text-[11px] text-slate-600 flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{action}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Loan Decision Footer */}
            <div className="bg-[#F4F7F4] p-4 rounded-3xl border border-emerald-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold">
                  Rekomendasi Keputusan Kredit Sistem VERA:
                </span>
                <p className="text-sm font-black text-[#0D3B23] mt-0.5">
                  Layak Disetujui (Plafon Rp {selectedApp.requestedAmount.toLocaleString('id-ID')} • Tenor {selectedApp.tenorMonths} Bulan • Bunga {selectedApp.subsidizedRate}%)
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
                  onClick={() => handleApproveClick(selectedApp.id)}
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

    </div>
  );
};

