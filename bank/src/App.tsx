import React, { useState } from 'react';
import { BankViewType, LoanApplication } from './types';
import { INITIAL_APPLICATIONS } from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { DashboardView } from './components/DashboardView';
import { PipelineView } from './components/PipelineView';
import { InterestPricingView } from './components/InterestPricingView';
import { CertificateView } from './components/CertificateView';
import { PortfolioReportView } from './components/PortfolioReportView';
import confetti from 'canvas-confetti';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<BankViewType>('dashboard');
  const [applications, setApplications] = useState<LoanApplication[]>(INITIAL_APPLICATIONS);
  const [selectedAppId, setSelectedAppId] = useState<string>(INITIAL_APPLICATIONS[0].id);
  const [selectedBank, setSelectedBank] = useState<string>('BSI Green KUR Mikro');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const reviewCount = applications.filter((a) => a.status === 'review').length;

  const handleApprove = (id: string) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === id) {
          return {
            ...app,
            status: 'approved',
            approvedAmount: app.requestedAmount,
            approvalDate: '11 Nov 2026',
          };
        }
        return app;
      })
    );

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#0D3B23', '#D4F82A', '#10B981', '#3B82F6'],
      });
    } catch {
      // ignore
    }
  };

  const handleOpenCertificate = (app: LoanApplication) => {
    setSelectedAppId(app.id);
    setCurrentView('certificate');
  };

  return (
    <div className="min-h-screen bg-[#F4F7F4] flex flex-row font-sans text-slate-800 antialiased selection:bg-lime-300 selection:text-emerald-950">
      
      {/* Desktop Navigation Sidebar */}
      <Sidebar
        currentView={currentView}
        onSelectView={setCurrentView}
        reviewCount={reviewCount}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        
        {/* Top Header */}
        <TopHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedBank={selectedBank}
          onSelectBank={setSelectedBank}
          reviewCount={reviewCount}
        />

        {/* View Switcher Routing */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {currentView === 'dashboard' && (
            <DashboardView
              applications={applications}
              onNavigate={(view) => setCurrentView(view)}
              onSelectApplication={(id) => {
                setSelectedAppId(id);
                setCurrentView('pipeline');
              }}
            />
          )}

          {currentView === 'pipeline' && (
            <PipelineView
              applications={applications}
              selectedAppId={selectedAppId}
              onSelectApplication={setSelectedAppId}
              onApprove={handleApprove}
              onOpenCertificate={handleOpenCertificate}
              searchQuery={searchQuery}
            />
          )}

          {currentView === 'pricing' && <InterestPricingView />}

          {currentView === 'certificate' && (
            <CertificateView
              applications={applications}
              selectedAppId={selectedAppId}
              onSelectApplication={setSelectedAppId}
              onBackToPipeline={() => setCurrentView('pipeline')}
            />
          )}

          {currentView === 'esg_portfolio' && (
            <PortfolioReportView applications={applications} />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;

