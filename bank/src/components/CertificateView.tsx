import React, { useState } from 'react';
import { LoanApplication } from '../types';
import veraLogo from '../assets/logo.jpg';
import {
  Printer,
  Download,
  ShieldCheck,
  Award,
  CheckCircle2,
  Calendar,
  Building2,
  QrCode,
  ArrowLeft,
  Leaf,
  Coins
} from 'lucide-react';

interface CertificateViewProps {
  applications: LoanApplication[];
  selectedAppId: string;
  onSelectApplication: (id: string) => void;
  onBackToPipeline: () => void;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  applications,
  selectedAppId,
  onSelectApplication,
  onBackToPipeline,
}) => {
  const currentApp = applications.find((a) => a.id === selectedAppId) || applications[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      
      {/* Top Action Bar (hidden during print) */}
      <div className="bg-white border border-slate-200/90 rounded-[28px] p-4 px-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToPipeline}
            className="p-2 rounded-2xl hover:bg-slate-100 text-slate-600 transition"
            title="Kembali ke Pipeline"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base font-black text-slate-900">
              Sertifikat Penilaian Kelayakan VERA
            </h2>
            <p className="text-xs text-slate-500">
              Dokumen resmi dossier uji kelayakan KUR Mikro Hijau 2026
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          {/* Select Debitur */}
          <select
            value={currentApp.id}
            onChange={(e) => onSelectApplication(e.target.value)}
            className="bg-[#F4F7F4] border border-slate-200 rounded-2xl px-3 py-2 text-xs font-bold text-slate-800 outline-none"
          >
            {applications.map((app) => (
              <option key={app.id} value={app.id}>
                {app.merchantName} ({app.stallName}) - Skor {app.veraScore.total}
              </option>
            ))}
          </select>

          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-[#0D3B23] hover:bg-[#14532D] text-white px-4 py-2 rounded-2xl text-xs font-bold transition shadow-md"
          >
            <Printer className="w-4 h-4 text-lime-400" />
            Cetak Sertifikat
          </button>
        </div>
      </div>

      {/* Printable Certificate Document Card */}
      <div className="bg-white border-2 border-slate-200 rounded-[32px] p-8 sm:p-12 shadow-xl relative overflow-hidden print:border-none print:shadow-none print:p-0">
        
        {/* Certificate Decorative Guilloche / Border */}
        <div className="absolute inset-2 border-2 border-emerald-900/10 rounded-[26px] pointer-events-none print:inset-0" />
        <div className="absolute inset-3 border border-emerald-900/5 rounded-[22px] pointer-events-none print:hidden" />

        {/* Certificate Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
          <img src={veraLogo} alt="Watermark" className="w-96 h-96 object-contain" />
        </div>

        {/* Document Header */}
        <div className="relative flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-slate-200 gap-4">
          <div className="flex items-center gap-3">
            <img
              src={veraLogo}
              alt="VERA"
              className="w-14 h-14 rounded-2xl object-contain border border-emerald-200 p-1 bg-white shadow-xs"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-[#0D3B23] tracking-tight">VERA</h1>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Official Verification
                </span>
              </div>
              <p className="text-[11px] font-bold text-slate-500 tracking-wide">
                Verified Eco-Financial & Readiness Assessment
              </p>
              <p className="text-[10px] text-slate-400">
                Ekosistem Pasar Jambu Dua • Kota Bogor
              </p>
            </div>
          </div>

          <div className="text-right text-xs">
            <p className="font-mono text-slate-400 text-[10px]">NO. DOKUMEN RESMI</p>
            <p className="font-mono font-black text-slate-900 text-sm">
              VERA/CERT/2026/PJB2/{currentApp.id.replace('app-', '00')}
            </p>
            <p className="text-[10px] text-slate-500 mt-1">
              Tanggal Terbit: {currentApp.approvalDate || currentApp.submissionDate}
            </p>
          </div>
        </div>

        {/* Certificate Title */}
        <div className="relative text-center my-8">
          <span className="text-[11px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            SURAT KEPUTUSAN KELAYAKAN KREDIT HIJAU
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-3 tracking-tight">
            SERTIFIKAT KESIAPAN PERBANKAN & IMPACT SCORING
          </h2>
          <p className="text-xs text-slate-600 max-w-xl mx-auto mt-2 leading-relaxed">
            Diberikan sebagai bukti sah atas kelayakan pembukuan keuangan berbasis SAK EMKM dan kepatuhan indikator lingkungan hidup (Taksonomi Hijau Indonesia 2026) kepada:
          </p>
        </div>

        {/* Subject Details */}
        <div className="relative bg-[#F8FAF8] border border-slate-200 rounded-3xl p-6 mb-8 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={currentApp.avatarUrl}
                alt={currentApp.ownerName}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 shadow-sm"
              />
              <div>
                <p className="text-xs text-slate-500 font-medium">Nama Pedagang / Pelaku Usaha</p>
                <h3 className="text-lg font-black text-slate-900">{currentApp.merchantName}</h3>
                <p className="text-xs font-bold text-emerald-800">{currentApp.stallName}</p>
                <p className="text-[11px] text-slate-500">{currentApp.stallLocation}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-left border-t sm:border-t-0 sm:border-l border-slate-200 pt-4 sm:pt-0 sm:pl-6">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Kategori Komoditas</p>
                <p className="text-xs font-black text-slate-800">{currentApp.category}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold">QRIS ID Terdaftar</p>
                <p className="text-xs font-mono font-bold text-slate-800">{currentApp.qrisId}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Penyalur Pembiayaan</p>
                <p className="text-xs font-bold text-emerald-800">{currentApp.bankPartner}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Status Verifikasi</p>
                <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> TERVERIFIKASI
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scoring Breakdown & Underwriting Decision */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* VERA Score Summary Box */}
          <div className="bg-[#0D3B23] text-white rounded-3xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold text-lime-300 uppercase tracking-wider">
                Hasil Penilaian Algoritmik
              </span>
              <span className="text-xs font-black px-2 py-0.5 rounded-full bg-lime-400 text-[#0D3B23]">
                {currentApp.veraScore.tier}
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl font-black text-lime-400">{currentApp.veraScore.total}</span>
              <span className="text-xs text-emerald-200">/ 100 Poin Kesiapan Kredit</span>
            </div>

            <div className="space-y-2.5 text-xs border-t border-emerald-800/80 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-emerald-200">Kapasitas Finansial (SAK EMKM)</span>
                <span className="font-bold text-white">{currentApp.veraScore.financialScore} / 100</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-emerald-200">Kepatuhan Keberlanjutan (ESG)</span>
                <span className="font-bold text-lime-300">{currentApp.veraScore.greenScore} / 100</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-emerald-200">Jejak Transaksi Digital (POS/QRIS)</span>
                <span className="font-bold text-white">{currentApp.veraScore.digitalScore} / 100</span>
              </div>
            </div>
          </div>

          {/* Approved Credit Package Box */}
          <div className="bg-[#F4F7F4] border border-slate-200 rounded-3xl p-6">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Paket Pembiayaan Disetujui
            </span>

            <div className="mb-4">
              <p className="text-xs text-slate-500">Plafon Kredit KUR Mikro Hijau</p>
              <p className="text-2xl font-black text-emerald-800">
                Rp {currentApp.requestedAmount.toLocaleString('id-ID')}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs border-t border-slate-200 pt-3">
              <div>
                <p className="text-[10px] text-slate-500">Suku Bunga Subsidi</p>
                <p className="text-base font-black text-[#0D3B23]">{currentApp.subsidizedRate}% eff. p.a.</p>
                <p className="text-[9px] text-emerald-700">(Hemat 300 bps dari 6.0%)</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500">Jangka Waktu (Tenor)</p>
                <p className="text-base font-black text-slate-900">{currentApp.tenorMonths} Bulan</p>
                <p className="text-[9px] text-slate-500">Angsuran Flat Bulanan</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500">Coverage Rasio (DSCR)</p>
                <p className="text-xs font-black text-emerald-700">{currentApp.financials.dscrRatio}x (Sangat Aman)</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500">Sampah Terkelola/Bln</p>
                <p className="text-xs font-black text-slate-900">{currentApp.greenImpact.organicWasteKgMonth} kg</p>
              </div>
            </div>
          </div>
        </div>

        {/* Signatures & Seal Section */}
        <div className="relative pt-6 border-t border-slate-200">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest text-center mb-6 font-bold">
            PENGESAHAN TRI-PARTIT EKOSISTEM PASAR HIJAU
          </p>

          <div className="grid grid-cols-3 gap-6 text-center">
            
            {/* Signature 1: Bank Underwriter */}
            <div className="flex flex-col items-center">
              <div className="h-16 flex items-center justify-center">
                <span className="font-serif italic text-lg text-blue-900 font-bold opacity-80 select-none">
                  Hendra Wijaya, SE
                </span>
              </div>
              <div className="w-36 border-b-2 border-slate-300 mb-1" />
              <p className="text-xs font-bold text-slate-800">Hendra Wijaya, SE</p>
              <p className="text-[10px] text-slate-500">Lead Credit Underwriter</p>
              <p className="text-[9px] text-slate-400">BSI Green Micro / Bank Partner</p>
            </div>

            {/* Seal / QR Verification in Center */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 border-2 border-dashed border-emerald-400 rounded-2xl flex flex-col items-center justify-center bg-emerald-50/50 p-1 mb-1">
                <QrCode className="w-9 h-9 text-emerald-800" />
                <span className="text-[7px] font-black text-emerald-900 uppercase">SCAN VERIFY</span>
              </div>
              <p className="text-[10px] font-mono font-bold text-emerald-800">ID: VERA-SEC-2026</p>
              <p className="text-[8px] text-slate-400">Blockchain-anchored hash</p>
            </div>

            {/* Signature 2: Market Facilitator */}
            <div className="flex flex-col items-center">
              <div className="h-16 flex items-center justify-center">
                <span className="font-serif italic text-lg text-emerald-900 font-bold opacity-80 select-none">
                  Dani Saputra, SP
                </span>
              </div>
              <div className="w-36 border-b-2 border-slate-300 mb-1" />
              <p className="text-xs font-bold text-slate-800">Dani Saputra, SP</p>
              <p className="text-[10px] text-slate-500">Koordinator Fasilitator Lapangan</p>
              <p className="text-[9px] text-slate-400">Ngariung Hub Pasar Jambu Dua</p>
            </div>
          </div>
        </div>

        {/* Certificate Footer Notes */}
        <div className="relative mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-400 gap-2">
          <p>© 2026 VERA Technology Ecosystem • Sub-Tema CIA 2026: Green Fintech & Impact Investment</p>
          <p className="font-medium">Standar Kepatuhan: SAK EMKM IAI & POJK No. 51/POJK.03/2017</p>
        </div>
      </div>
    </div>
  );
};

