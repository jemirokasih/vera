import React, { useState } from 'react';
import { AdminViewType, GreenValidationItem, Merchant } from './types';
import {
  INITIAL_MERCHANTS,
  INITIAL_VALIDATION_ITEMS,
  INITIAL_MARKET_BLOCKS,
  INITIAL_ECO_PARTNERS,
} from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { DashboardView } from './components/DashboardView';
import { ValidationView } from './components/ValidationView';
import { MerchantsView } from './components/MerchantsView';
import { PartnersView } from './components/PartnersView';
import { EsgReportView } from './components/EsgReportView';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AdminViewType>('dashboard');
  const [merchants, setMerchants] = useState<Merchant[]>(INITIAL_MERCHANTS);
  const [validationItems, setValidationItems] = useState<GreenValidationItem[]>(INITIAL_VALIDATION_ITEMS);
  const [marketBlocks, setMarketBlocks] = useState(INITIAL_MARKET_BLOCKS);
  const [partners] = useState(INITIAL_ECO_PARTNERS);
  const [searchQuery, setSearchQuery] = useState('');

  const pendingValidationCount = validationItems.filter((v) => v.status === 'pending').length;

  const handleVerifyItem = (id: string, isApproved: boolean) => {
    setValidationItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: isApproved ? 'verified' : 'rejected',
              verifiedBy: isApproved ? 'Iwan Setiawan (Admin Pasar)' : 'Ditolak Admin',
            }
          : item
      )
    );

    if (isApproved) {
      const targetItem = validationItems.find((v) => v.id === id);
      if (targetItem) {
        setMerchants((prev) =>
          prev.map((m) => {
            if (m.id === targetItem.merchantId) {
              const newGreenScore = Math.min(100, m.score.greenScore + 4);
              const newTotal = Math.min(
                99,
                Math.round(
                  m.score.financialScore * 0.5 + newGreenScore * 0.3 + m.score.digitalScore * 0.2
                )
              );
              return {
                ...m,
                organicWasteKgMonth: targetItem.weightKg
                  ? parseFloat((m.organicWasteKgMonth + targetItem.weightKg).toFixed(1))
                  : m.organicWasteKgMonth,
                score: {
                  ...m.score,
                  total: newTotal,
                  greenScore: newGreenScore,
                },
              };
            }
            return m;
          })
        );
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7F4] flex font-sans text-slate-900 selection:bg-emerald-500 selection:text-white">
      {/* Sidebar */}
      <Sidebar
        currentView={currentView}
        onSelectView={setCurrentView}
        pendingValidationCount={pendingValidationCount}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          pendingCount={pendingValidationCount}
        />

        <main className="flex-1 p-6 overflow-y-auto">
          {currentView === 'dashboard' && (
            <DashboardView
              merchants={merchants}
              validationItems={validationItems}
              marketBlocks={marketBlocks}
              onNavigate={(v) => setCurrentView(v)}
              onQuickVerify={(id) => handleVerifyItem(id, true)}
            />
          )}

          {currentView === 'validation' && (
            <ValidationView
              validationItems={validationItems}
              onVerify={handleVerifyItem}
            />
          )}

          {currentView === 'merchants' && (
            <MerchantsView
              merchants={merchants}
              searchQuery={searchQuery}
            />
          )}

          {currentView === 'partners' && (
            <PartnersView partners={partners} />
          )}

          {currentView === 'esg_report' && (
            <EsgReportView />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
