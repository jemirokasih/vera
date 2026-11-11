import React from 'react';
import { EcoPartner } from '../types';
import { Building2, Leaf, Recycle, Landmark, Phone, CheckCircle2 } from 'lucide-react';

interface PartnersViewProps {
  partners: EcoPartner[];
}

export const PartnersView: React.FC<PartnersViewProps> = ({ partners }) => {
  const getIcon = (type: EcoPartner['iconType']) => {
    switch (type) {
      case 'gov':
        return <Landmark className="w-5 h-5 text-blue-700" />;
      case 'recycle':
        return <Recycle className="w-5 h-5 text-emerald-700" />;
      case 'bank':
        return <Building2 className="w-5 h-5 text-amber-600" />;
      case 'leaf':
        return <Leaf className="w-5 h-5 text-lime-700" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="bg-white border border-slate-200/90 rounded-[32px] p-6 shadow-xs">
        <h2 className="text-xl font-black text-slate-900">
          Kemitraan Daur Ulang, Perbankan & Pemerintah Kota Bogor
        </h2>
        <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Ekosistem VERA menghubungkan pengelola pasar, regulator kebersihan lingkungan, lembaga keuangan syariah/konvensional, dan kelompok tani dalam satu rantai nilai sirkular tertutup.
        </p>
      </div>

      {/* Grid of Partners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="bg-white border border-slate-200/90 rounded-[28px] p-5 space-y-4 shadow-xs"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#F4F7F4] flex items-center justify-center border border-slate-200">
                  {getIcon(partner.iconType)}
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">{partner.name}</h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">{partner.role}</p>
                </div>
              </div>

              <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                Aktif Terintegrasi ✓
              </span>
            </div>

            <div className="bg-[#F8FAF8] rounded-2xl p-3.5 border border-slate-200/80 text-xs space-y-2">
              <span className="text-slate-400 text-[10px] block font-bold uppercase tracking-wider">
                Kontribusi Ekosistem Pasar:
              </span>
              <p className="text-slate-700 font-medium leading-relaxed">
                {partner.contribution}
              </p>

              <div className="pt-2 border-t border-slate-200/70 flex justify-between items-center text-[11px] text-slate-500">
                <span>Kontak: <strong className="text-slate-800">{partner.contactPerson}</strong></span>
                <span className="flex items-center gap-1 font-mono text-emerald-700 font-bold">
                  <Phone className="w-3 h-3" />
                  {partner.phone}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
