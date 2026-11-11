import React, { useState } from 'react';
import { LoanApplication } from '../types';
import {
  FileText,
  Download,
  Printer,
  ShieldCheck,
  Leaf,
  Coins,
  TrendingUp,
  CheckCircle2,
  Building2,
  Calendar,
  Filter,
  BarChart3,
  Award
} from 'lucide-react';

interface PortfolioReportViewProps {
  applications: LoanApplication[];
}

export const PortfolioReportView: React.FC<PortfolioReportViewProps> = ({ applications }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('Q4 2026 (Nov 2026)');

  // Portfolio calculations
  const totalDisbursedOrApproved = applications
    .filter((a) => a.status === 'approved' || a.status === 'disbursed')
    .reduce((sum, a) => sum + (a.approvedAmount || a.requestedAmount), 0);

  const totalPipeline = applications.reduce((sum, a) => sum + a.requestedAmount, 0);

  const totalWasteKg = applications.reduce(
    (sum, a) => sum + a.greenImpact.organicWasteKgMonth,
    0
  );

  const totalPlasticBags = applications.reduce(
    (sum, a) => sum + a.greenImpact.plasticBagsReducedMonthly,
    0
  );

  const avgVeraScore = Math.round(
    applications.reduce((sum, a) => sum + a.veraScore.total, 0) / applications.length
  );

  const avgDscr = (
    applications.reduce((sum, a) => sum + a.financials.dscrRatio, 0) / applications.length
  ).toFixed(2);

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
      
      {/* Top Banner & Actions */}
      <div className="bg-white border border-slate-200/90 rounded-[32px] p-6 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-lg bg-blue-100 text-blue-800">
              <FileText className="w-4 h-4" />
            </span>
            <span className="text-xs font-black text-blue-900 uppercase tracking-wider">
              Laporan Portofolio Berkelanjutan (ESG)
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-500">
              Kepatuhan Taksonomi Hijau Indonesia 2026
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Audit Dossier & Laporan Portofolio Pembiayaan Hijau
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Konsolidasi debitur KUR Mikro Hijau Pasar Jambu Dua berbasis standar POJK 51/POJK.03/2017 & SAK EMKM.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="bg-[#F4F7F4] border border-slate-200 rounded-2xl px-3 py-2 text-xs font-bold text-slate-800 outline-none"
          >
            <option value="Q4 2026 (Nov 2026)">Periode: Q4 2026 (Nov 2026)</option>
            <option value="Q3 2026">Periode: Q3 2026</option>
            <option value="Tahunan 2026">Tahun Buku 2026</option>
          </select>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 bg-[#0D3B23] hover:bg-[#14532D] text-white px-4 py-2 rounded-2xl text-xs font-bold transition shadow-md"
          >
            <Printer className="w-4 h-4 text-lime-400" />
            Cetak Laporan
          </button>
        </div>
      </div>

      {/* Aggregate ESG Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Card 1: Total Plafon Disbursed / Approved */}
        <div className="bg-[#0D3B23] text-white p-5 rounded-3xl shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-lime-300 uppercase tracking-wider">
              Plafon Terkomitmen
            </span>
            <Coins className="w-4 h-4 text-lime-400" />
          </div>
          <p className="text-2xl font-black text-white">
            Rp {(totalDisbursedOrApproved / 1000000).toFixed(0)} Jt
          </p>
          <p className="text-[10px] text-emerald-200 mt-1">
            Dari total pipeline Rp {(totalPipeline / 1000000).toFixed(0)} Jt ({applications.length} debitur)
          </p>
        </div>

        {/* Card 2: Waste Diverted */}
        <div className="bg-white border border-slate-200/90 p-5 rounded-3xl shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Sampah Organik Tervalidasi
            </span>
            <Leaf className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-emerald-800">
            {totalWasteKg.toLocaleString('id-ID')} <span className="text-sm font-bold text-slate-500">kg/bln</span>
          </p>
          <p className="text-[10px] text-slate-500 mt-1">
            Terkirim ke Rumah Kompos DLH Kota Bogor
          </p>
        </div>

        {/* Card 3: Plastic Reduced */}
        <div className="bg-white border border-slate-200/90 p-5 rounded-3xl shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Reduksi Kresek Pasar
            </span>
            <ShieldCheck className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-black text-blue-900">
            {totalPlasticBags.toLocaleString('id-ID')} <span className="text-sm font-bold text-slate-500">kantong/bln</span>
          </p>
          <p className="text-[10px] text-slate-500 mt-1">
            Digantikan besek bambu & daun pisang
          </p>
        </div>

        {/* Card 4: NPL & Risk Quality */}
        <div className="bg-white border border-slate-200/90 p-5 rounded-3xl shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Kualitas Kredit (NPL)
            </span>
            <TrendingUp className="w-4 h-4 text-lime-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">
            0.00% <span className="text-xs font-semibold text-emerald-600">(0 Debitur Lalai)</span>
          </p>
          <p className="text-[10px] text-slate-500 mt-1">
            Rerata DSCR Portofolio: <strong>{avgDscr}x</strong> (Coverage Prima)
          </p>
        </div>
      </div>

      {/* Taksonomi Hijau Indonesia 2026 Categorization Box */}
      <div className="bg-white border border-slate-200/90 rounded-[32px] p-6 shadow-xs">
        <h3 className="text-base font-black text-slate-900 mb-2">
          Penyelarasan Taksonomi Hijau Indonesia 2026 (OJK Sector Breakdown)
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          Kategori pemanfaatan dana pembiayaan mikro yang memenuhi kriteria aktivitas hijau berinsentif (POJK 51/2017).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Category 1 */}
          <div className="bg-[#F8FAF8] border border-emerald-100 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                Sektor Sirkular
              </span>
              <span className="text-xs font-bold text-slate-700">45% Portofolio</span>
            </div>
            <h4 className="text-xs font-bold text-slate-900">Pengolahan Limbah & Kompos Pasar</h4>
            <p className="text-[11px] text-slate-500 mt-1">
              Pemilahan limbah sayuran dan buah busuk harian untuk pasokan pupuk kompos perkotaan.
            </p>
            <div className="mt-3 text-xs font-black text-emerald-700">
              Target: 1.5 Ton/Bulan
            </div>
          </div>

          {/* Category 2 */}
          <div className="bg-[#F8FAF8] border border-blue-100 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black uppercase text-blue-800 bg-blue-100 px-2 py-0.5 rounded-full">
                Efisiensi Energi
              </span>
              <span className="text-xs font-bold text-slate-700">30% Portofolio</span>
            </div>
            <h4 className="text-xs font-bold text-slate-900">Cold Storage Solar Mini & Efisiensi Bahan</h4>
            <p className="text-[11px] text-slate-500 mt-1">
              Investasi showcase pendingin hemat energi untuk menjaga kesegaran daging dan ayam potong.
            </p>
            <div className="mt-3 text-xs font-black text-blue-700">
              Hemat Listrik 35%
            </div>
          </div>

          {/* Category 3 */}
          <div className="bg-[#F8FAF8] border border-lime-200 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black uppercase text-[#0D3B23] bg-lime-300 px-2 py-0.5 rounded-full">
                Bebas Plastik
              </span>
              <span className="text-xs font-bold text-slate-700">25% Portofolio</span>
            </div>
            <h4 className="text-xs font-bold text-slate-900">Kemasan Alami Ramah Lingkungan</h4>
            <p className="text-[11px] text-slate-500 mt-1">
              Substitusi total kantong plastik kresek sekali pakai dengan besek anyaman bambu dan besek daun.
            </p>
            <div className="mt-3 text-xs font-black text-emerald-900">
              Nol Residu Mikroplastik
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Portfolio Table */}
      <div className="bg-white border border-slate-200/90 rounded-[32px] overflow-hidden shadow-xs">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h3 className="text-base font-black text-slate-900">
              Daftar Debitur Portofolio KUR Mikro Hijau
            </h3>
            <p className="text-xs text-slate-500">
              Rekapitulasi status SAK EMKM, skor VERA, dan indikator ESG tiap pedagang
            </p>
          </div>

          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Total {applications.length} Debitur Terdata
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAF8] text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-6">Debitur & Kios</th>
                <th className="py-3 px-4">Plafon & Tenor</th>
                <th className="py-3 px-4">Suku Bunga</th>
                <th className="py-3 px-4">Skor VERA</th>
                <th className="py-3 px-4">Laba Bersih & DSCR</th>
                <th className="py-3 px-4">Dampak Hijau</th>
                <th className="py-3 px-6">Status Pinjaman</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/80 transition">
                  {/* Debitur */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={app.avatarUrl}
                        alt={app.ownerName}
                        className="w-9 h-9 rounded-xl object-cover border border-slate-200"
                      />
                      <div>
                        <p className="font-black text-slate-900 text-xs">{app.merchantName}</p>
                        <p className="text-[11px] text-slate-500">{app.stallName}</p>
                        <span className="text-[10px] text-slate-400 font-mono">{app.stallLocation}</span>
                      </div>
                    </div>
                  </td>

                  {/* Plafon */}
                  <td className="py-4 px-4">
                    <p className="font-bold text-slate-900">
                      Rp {app.requestedAmount.toLocaleString('id-ID')}
                    </p>
                    <p className="text-[10px] text-slate-500">{app.tenorMonths} Bulan</p>
                  </td>

                  {/* Rate */}
                  <td className="py-4 px-4">
                    <span className="font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 text-[11px]">
                      {app.subsidizedRate}%
                    </span>
                    <p className="text-[9px] text-slate-400 mt-0.5 line-through">6.0%</p>
                  </td>

                  {/* VERA Score */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className="font-black text-sm text-[#0D3B23]">{app.veraScore.total}</span>
                      <span className="text-[10px] font-bold text-slate-500">({app.veraScore.tier})</span>
                    </div>
                    <div className="w-16 bg-slate-200 h-1.5 rounded-full mt-1 overflow-hidden">
                      <div
                        className="bg-emerald-600 h-full rounded-full"
                        style={{ width: `${app.veraScore.total}%` }}
                      />
                    </div>
                  </td>

                  {/* SAK EMKM Financials */}
                  <td className="py-4 px-4">
                    <p className="font-bold text-slate-800">
                      Rp {(app.financials.netProfit / 1000000).toFixed(1)} Jt/bln
                    </p>
                    <p className="text-[10px] text-emerald-700 font-bold">
                      DSCR: {app.financials.dscrRatio}x
                    </p>
                  </td>

                  {/* Green Impact */}
                  <td className="py-4 px-4">
                    <p className="font-bold text-emerald-800">
                      {app.greenImpact.organicWasteKgMonth} kg sampah/bln
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {app.greenImpact.plasticBagsReducedMonthly} kresek dihemat
                    </p>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-6">
                    {app.status === 'approved' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> DISETUJUI
                      </span>
                    )}
                    {app.status === 'review' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-amber-100 text-amber-800">
                        PENDING AUDIT
                      </span>
                    )}
                    {app.status === 'disbursed' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-blue-100 text-blue-800">
                        TERCAIRKAN
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Regulatory Compliance Footer */}
      <div className="bg-[#F4F7F4] border border-slate-200 rounded-3xl p-6 text-xs text-slate-600 leading-relaxed flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-slate-900 mb-1">Pernyataan Standar Kepatuhan OJK & SAK EMKM</h4>
          <p className="text-[11px] text-slate-500 max-w-2xl">
            Laporan ini disusun menggunakan mesin penilaian risiko VERA versi 2.4. Seluruh data keuangan ditranslasikan dari buku kas digital harian pedagang ke format SAK EMKM yang diaudit secara silang dengan mutasi QRIS dan log timbangan sampah organik Ngariung Hub.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 shadow-2xs">
            POJK No. 51/2017
          </span>
          <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 shadow-2xs">
            SAK EMKM IAI
          </span>
        </div>
      </div>
    </div>
  );
};

