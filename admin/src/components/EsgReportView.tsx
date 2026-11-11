import React from 'react';
import { Printer, Download, Leaf, ShieldCheck, Scale, Award } from 'lucide-react';

export const EsgReportView: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      
      {/* Action Bar */}
      <div className="flex justify-between items-center bg-white border border-slate-200/90 rounded-[28px] p-4 shadow-xs">
        <div>
          <h2 className="text-base font-black text-slate-900">
            Laporan Kinerja Dampak Keberlanjutan & Inklusi Keuangan (ESG)
          </h2>
          <p className="text-xs text-slate-500">
            Dokumen audit berkala untuk Dinas Koperasi & UMKM Kota Bogor dan Konsorsium Bank Penyalur KUR
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-[#0D3B23] hover:bg-emerald-900 text-lime-300 text-xs font-black rounded-2xl flex items-center gap-1.5 shadow-md transition"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak Laporan Resmi</span>
        </button>
      </div>

      {/* Official Report Document */}
      <div className="bg-white border-2 border-[#0D3B23] rounded-[36px] p-8 space-y-6 shadow-sm">
        
        {/* Document Header */}
        <div className="text-center pb-5 border-b-2 border-[#0D3B23] space-y-2">
          <div className="flex items-center justify-center gap-3">
            <img src="/logo.jpg" alt="VERA" className="w-12 h-12 object-contain" />
            <div>
              <h1 className="text-xl font-black text-[#0D3B23] tracking-tight">
                PERUMDA PASAR PAKUAN JAYA — UNIT PASAR JAMBU DUA
              </h1>
              <p className="text-xs font-extrabold text-slate-600 tracking-wider">
                PROGRAM GREEN-FINTECH & IMPACT CREDIT SCORING (VERA)
              </p>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 font-mono">
            Nomor: 420/VERA-ESG/PJK-BOGOR/XI/2026 • Periode Evaluasi: November 2026
          </p>
        </div>

        {/* Executive Summary */}
        <div className="space-y-2 text-xs text-slate-700 leading-relaxed">
          <h3 className="font-black text-sm text-[#0D3B23]">1. Ringkasan Eksekutif Dampak</h3>
          <p>
            Melalui implementasi sistem SaaS VERA (Verified Eco-Financial & Readiness Assessment), ekosistem Pasar Jambu Dua telah mentransformasikan pencatatan keuangan pedagang mikro ke standar <strong>SAK EMKM</strong> sekaligus mengukur indikator keberlanjutan secara real-time.
          </p>
        </div>

        {/* KPI Grid in Document */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
          <div className="bg-[#F8FAF8] border border-slate-200 rounded-2xl p-3">
            <span className="text-slate-500 text-[10px] block font-medium">Sampah Teralihkan:</span>
            <p className="text-lg font-black text-emerald-700 mt-0.5">1.428 kg</p>
            <span className="text-[9px] text-slate-400">Dari TPA Galuga</span>
          </div>

          <div className="bg-[#F8FAF8] border border-slate-200 rounded-2xl p-3">
            <span className="text-slate-500 text-[10px] block font-medium">Plastik Dikurangi:</span>
            <p className="text-lg font-black text-[#0D3B23] mt-0.5">12.850 pcs</p>
            <span className="text-[9px] text-slate-400">Kantong kresek hitam</span>
          </div>

          <div className="bg-[#F8FAF8] border border-slate-200 rounded-2xl p-3">
            <span className="text-slate-500 text-[10px] block font-medium">Kios Bersertifikasi:</span>
            <p className="text-lg font-black text-blue-700 mt-0.5">42 Kios</p>
            <span className="text-[9px] text-slate-400">Standar SAK EMKM</span>
          </div>

          <div className="bg-[#F8FAF8] border border-slate-200 rounded-2xl p-3">
            <span className="text-slate-500 text-[10px] block font-medium">Penyaluran KUR:</span>
            <p className="text-lg font-black text-amber-600 mt-0.5">Rp 340 Jt</p>
            <span className="text-[9px] text-slate-400">NPL 0.28%</span>
          </div>
        </div>

        {/* Circular Economy Flow */}
        <div className="space-y-2 text-xs">
          <h3 className="font-black text-sm text-[#0D3B23]">2. Siklus Sirkular Ekonomi Pasar Tradisional</h3>
          <div className="bg-[#F4F7F4] p-4 rounded-2xl border border-emerald-200 space-y-2 text-slate-700 leading-relaxed text-[11px]">
            <p>
              • <strong>Hulu (Petani):</strong> Sayuran dipasok langsung dari kelompok tani Sukabumi/Cianjur dengan kemasan besek bambu dan daun pisang.
            </p>
            <p>
              • <strong>Tengah (Pasar):</strong> Pedagang mencatat penjualan kasir SAK EMKM & memilah sampah sisa sayur setiap hari ke pos timbang Ngariung Hub.
            </p>
            <p>
              • <strong>Hilir (Rumah Kompos):</strong> 1.428 kg sampah difermentasikan menjadi pupuk kompos yang dikirim kembali ke kelompok tani pemasok sayuran.
            </p>
          </div>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-2 gap-8 pt-6 border-t-2 border-slate-200 text-center text-xs">
          <div>
            <p className="text-slate-500 text-[11px]">Disetujui oleh Pengelola:</p>
            <p className="font-black text-slate-900 mt-14">Iwan Setiawan, S.E.</p>
            <p className="text-[10px] text-slate-500">Kepala Unit Pasar Jambu Dua — Perumda PPJ</p>
          </div>

          <div>
            <p className="text-slate-500 text-[11px]">Mengetahui Pemerintah Daerah:</p>
            <p className="font-black text-slate-900 mt-14">Drs. H. Mulyadi, M.Si.</p>
            <p className="text-[10px] text-slate-500">Dinas Koperasi, UMKM, Perdagangan & Perindustrian</p>
          </div>
        </div>

      </div>

    </div>
  );
};
