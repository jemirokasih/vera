import React, { useState } from 'react';
import { UserRole, Transaction, GreenAction, LoanApplication } from './types';
import {
  INITIAL_PRODUCTS,
  CURRENT_MERCHANT,
  INITIAL_MERCHANTS_LIST,
  INITIAL_TRANSACTIONS,
  INITIAL_GREEN_ACTIONS,
  INITIAL_LOAN_APPLICATIONS,
} from './data/mockData';
import { TopNavbar } from './components/TopNavbar';
import { PedagangView } from './components/pedagang/PedagangView';
import { BankView } from './components/bank/BankView';
import { AdminView } from './components/admin/AdminView';
import { VeraAssistantModal } from './components/VeraAssistantModal';
import { Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<UserRole>('pedagang');
  const [merchant, setMerchant] = useState(CURRENT_MERCHANT);
  const [merchantsList, setMerchantsList] = useState(INITIAL_MERCHANTS_LIST);
  const [products] = useState(INITIAL_PRODUCTS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [greenActions, setGreenActions] = useState<GreenAction[]>(INITIAL_GREEN_ACTIONS);
  const [loanApplications, setLoanApplications] = useState<LoanApplication[]>(INITIAL_LOAN_APPLICATIONS);
  const [isVeraAssistantOpen, setIsVeraAssistantOpen] = useState(false);

  // Handlers for state updates
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

    // Recalculate merchant financial metrics & score
    if (newTx.total > 0) {
      setMerchant((prev) => {
        const newDaily = prev.dailyRevenue + newTx.total;
        const newScoreVal = Math.min(99, prev.score.total + 1);
        return {
          ...prev,
          dailyRevenue: newDaily,
          score: {
            ...prev.score,
            total: newScoreVal,
            financialScore: Math.min(100, prev.score.financialScore + 1),
            digitalScore: newTx.paymentMethod === 'qris' ? Math.min(100, prev.score.digitalScore + 2) : prev.score.digitalScore,
          },
        };
      });
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

  const handleVerifyGreenAction = (actionId: string, isApproved: boolean) => {
    setGreenActions((prev) =>
      prev.map((a) =>
        a.id === actionId
          ? {
              ...a,
              status: isApproved ? 'verified' : 'rejected',
              verifiedBy: isApproved ? 'Dani - Fasilitator Ngariung Hub' : 'Ditolak Fasilitator',
            }
          : a
      )
    );

    if (isApproved) {
      setMerchant((prev) => {
        const newGreenScore = Math.min(100, prev.score.greenScore + 4);
        const newTotal = Math.min(99, Math.round(prev.score.financialScore * 0.5 + newGreenScore * 0.3 + prev.score.digitalScore * 0.2));
        return {
          ...prev,
          score: {
            ...prev.score,
            total: newTotal,
            greenScore: newGreenScore,
          },
        };
      });
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

  const handleApproveLoan = (applicationId: string) => {
    setLoanApplications((prev) =>
      prev.map((a) => (a.id === applicationId ? { ...a, status: 'approved' } : a))
    );
  };

  const todayRevenue = transactions
    .filter((t) => t.total > 0)
    .reduce((sum, t) => sum + t.total, 0);

  const todayExpenses = Math.abs(
    transactions
      .filter((t) => t.total < 0)
      .reduce((sum, t) => sum + t.total, 0)
  );
  const todayNetProfit = Math.round(todayRevenue * 0.42) - todayExpenses;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Universal Navbar with Role Switcher */}
      <TopNavbar
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        todayRevenue={todayRevenue}
        greenScore={merchant.score.total}
      />

      {/* Main Role Content Views */}
      <main className="flex-1 pb-10">
        {currentRole === 'pedagang' && (
          <PedagangView
            merchant={merchant}
            products={products}
            transactions={transactions}
            greenActions={greenActions}
            loanApplications={loanApplications}
            onAddTransaction={handleAddTransaction}
            onAddGreenAction={handleAddGreenAction}
            onSubmitLoan={handleSubmitLoan}
            onOpenVeraAssistant={() => setIsVeraAssistantOpen(true)}
          />
        )}

        {currentRole === 'bank' && (
          <BankView
            merchants={merchantsList}
            loanApplications={loanApplications}
            transactions={transactions}
            onApproveLoan={handleApproveLoan}
          />
        )}

        {currentRole === 'admin' && (
          <AdminView
            merchants={merchantsList}
            greenActions={greenActions}
            onVerifyGreenAction={handleVerifyGreenAction}
          />
        )}
      </main>

      {/* Global Floating AI Assistant Bubble (Desktop & Mobile accessible) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsVeraAssistantOpen(true)}
          className="group relative flex items-center gap-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-slate-950 px-4 py-3 rounded-full shadow-2xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all duration-300 font-bold text-xs"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 fill-slate-950 animate-pulse" />
          </div>
          <span className="hidden sm:inline">Tanya VERA</span>
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
        </button>
      </div>

      {/* Interactive Tanya VERA AI Assistant Modal */}
      <VeraAssistantModal
        isOpen={isVeraAssistantOpen}
        onClose={() => setIsVeraAssistantOpen(false)}
        onAddTransaction={handleAddTransaction}
        onAddGreenAction={handleAddGreenAction}
        todayRevenue={todayRevenue}
        todayNetProfit={todayNetProfit}
        greenScore={merchant.score.total}
      />

      {/* Global Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-4 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 VERA — Verified Eco-Financial & Readiness Assessment. Sub-Tema CIA 2026: Green Fintech & Impact Investment.</p>
          <p className="text-[11px] text-slate-400 italic">"Verified today, bankable tomorrow"</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
