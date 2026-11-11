import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  CURRENT_MERCHANT,
  INITIAL_MERCHANTS_LIST,
  INITIAL_PRODUCTS,
  INITIAL_TRANSACTIONS,
  INITIAL_GREEN_ACTIONS,
  INITIAL_LOAN_APPLICATIONS
} from './data/mockData';
import { Transaction, GreenAction, LoanApplication } from './types';
import { PedagangView } from './components/pedagang/PedagangView';
import { VeraAssistantModal } from './components/VeraAssistantModal';
import veraLogo from './assets/logo.jpg';
import { Sparkles, Smartphone, Monitor } from 'lucide-react';
import './index.css';

const StandalonePedagangApp: React.FC = () => {
  const [merchant, setMerchant] = useState(CURRENT_MERCHANT);
  const [merchantsList] = useState(INITIAL_MERCHANTS_LIST);
  const [products] = useState(INITIAL_PRODUCTS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [greenActions, setGreenActions] = useState<GreenAction[]>(INITIAL_GREEN_ACTIONS);
  const [loanApplications, setLoanApplications] = useState<LoanApplication[]>(INITIAL_LOAN_APPLICATIONS);
  const [isVeraAssistantOpen, setIsVeraAssistantOpen] = useState(false);
  const [isPhoneFrame, setIsPhoneFrame] = useState(true);

  const handleAddTransaction = (
    txData: Omit<Transaction, 'id' | 'invoiceNo' | 'date' | 'time' | 'isVeraVerified'>
  ) => {
    const newTx: Transaction = {
      ...txData,
      id: `tx-${Date.now()}`,
      invoiceNo: `VERA-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(100 + Math.random() * 900)}`,
      date: '11 Nov 2026',
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      isVeraVerified: true,
    };
    setTransactions((prev) => [newTx, ...prev]);

    if (newTx.total > 0) {
      setMerchant((prev) => ({
        ...prev,
        dailyRevenue: prev.dailyRevenue + newTx.total,
        score: {
          ...prev.score,
          total: Math.min(99, prev.score.total + 1),
          financialScore: Math.min(100, prev.score.financialScore + 1),
          digitalScore: newTx.paymentMethod === 'qris' ? Math.min(100, prev.score.digitalScore + 2) : prev.score.digitalScore,
        },
      }));
    }
  };

  const handleAddGreenAction = (
    actionData: Omit<GreenAction, 'id' | 'status' | 'timestamp'>
  ) => {
    const newAction: GreenAction = {
      ...actionData,
      id: `ga-${Date.now()}`,
      status: 'pending',
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
    };
    setGreenActions((prev) => [newAction, ...prev]);

    if (actionData.weightKg) {
      setMerchant((prev) => ({
        ...prev,
        organicWasteKgMonth: parseFloat((prev.organicWasteKgMonth + (actionData.weightKg || 0)).toFixed(1)),
      }));
    }
  };

  const handleSubmitLoan = (
    appData: Omit<LoanApplication, 'id' | 'status' | 'submissionDate' | 'veraScore' | 'tier'>
  ) => {
    const newApp: LoanApplication = {
      ...appData,
      id: `app-${Date.now()}`,
      status: 'review',
      submissionDate: '11 Nov 2026',
      veraScore: merchant.score.total,
      tier: merchant.score.tier,
    };
    setLoanApplications((prev) => [newApp, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#F4F7F4] flex flex-col font-sans text-slate-800 antialiased selection:bg-lime-300 selection:text-emerald-950">
      
      {/* Top Banner with Frame Mode Switcher */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 py-2.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src={veraLogo}
              alt="VERA"
              className="w-10 h-10 rounded-2xl object-contain border border-emerald-200 bg-white p-0.5 shadow-xs"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-black text-lg text-[#0D3B23] tracking-tight">VERA PEDAGANG</h1>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Mobile Day-to-Day App
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Kasir POS SAK EMKM, Timbangan Sampah Organik & KUR Mikro Hijau
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 hidden sm:inline">Mode Tampilan:</span>
            <button
              onClick={() => setIsPhoneFrame(!isPhoneFrame)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-bold transition shadow-xs ${
                isPhoneFrame
                  ? 'bg-[#0D3B23] text-white'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-lime-400" />
              <span>Simulasi Ponsel</span>
            </button>
            <button
              onClick={() => setIsPhoneFrame(false)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-bold transition shadow-xs ${
                !isPhoneFrame
                  ? 'bg-[#0D3B23] text-white'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Layar Penuh</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Pedagang View */}
      <main className="flex-1 py-6 px-3 sm:px-6">
        <div className={isPhoneFrame ? 'max-w-md mx-auto shadow-2xl rounded-[40px] overflow-hidden border-8 border-slate-900 bg-white' : 'max-w-5xl mx-auto'}>
          <PedagangView
            merchant={merchant}
            allMerchants={merchantsList}
            onSelectMerchant={(id) => {
              const found = merchantsList.find((m) => m.id === id);
              if (found) setMerchant(found);
            }}
            products={products}
            transactions={transactions}
            greenActions={greenActions}
            loanApplications={loanApplications}
            onAddTransaction={handleAddTransaction}
            onAddGreenAction={handleAddGreenAction}
            onSubmitLoan={handleSubmitLoan}
            onOpenVeraAssistant={() => setIsVeraAssistantOpen(true)}
          />
        </div>
      </main>

      {/* Floating Tanya VERA voice assistant */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsVeraAssistantOpen(true)}
          className="group flex items-center gap-2.5 bg-[#0D3B23] hover:bg-[#154d2e] text-white pl-4 pr-5 py-3 rounded-full shadow-2xl border-2 border-lime-400 transition-all transform hover:scale-105 active:scale-95"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-lime-400"></span>
          </span>
          <Sparkles className="w-4 h-4 text-lime-300 animate-pulse" />
          <span className="text-xs font-black tracking-wide">Tanya VERA</span>
        </button>
      </div>

      {/* Vera Assistant Modal */}
      <VeraAssistantModal
        isOpen={isVeraAssistantOpen}
        onClose={() => setIsVeraAssistantOpen(false)}
        onAddTransaction={handleAddTransaction}
        onAddGreenAction={handleAddGreenAction}
        todayRevenue={merchant.dailyRevenue}
        todayNetProfit={Math.round(merchant.dailyRevenue * 0.42)}
        greenScore={merchant.score.total}
      />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StandalonePedagangApp />
  </React.StrictMode>
);
