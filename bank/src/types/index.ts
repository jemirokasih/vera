export type BankViewType = 'dashboard' | 'pipeline' | 'pricing' | 'certificate' | 'esg_portfolio';

export interface LoanApplication {
  id: string;
  merchantId: string;
  merchantName: string;
  ownerName: string;
  stallName: string;
  stallLocation: string;
  category: string;
  avatarUrl: string;
  qrisId: string;
  phone: string;
  joinDate: string;
  
  // Loan details
  requestedAmount: number;
  approvedAmount?: number;
  tenorMonths: number;
  subsidizedRate: number; // e.g. 3.0%
  regularRate: number;    // e.g. 6.0%
  status: 'review' | 'approved' | 'disbursed' | 'rejected';
  submissionDate: string;
  approvalDate?: string;
  bankPartner: string;
  purpose: string;

  // VERA Scoring
  veraScore: {
    total: number;
    tier: string;
    financialScore: number;
    greenScore: number;
    digitalScore: number;
    kurEligible: boolean;
  };

  // SAK EMKM Financials
  financials: {
    monthlyRevenue: number;
    cogs: number;
    grossProfit: number;
    operatingExpenses: number;
    netProfit: number;
    dscrRatio: number;
    qrisSharePercent: number;
    cashBalance: number;
    inventoryValue: number;
    debtBalance: number;
  };

  // Green / ESG Indicators
  greenImpact: {
    organicWasteKgMonth: number;
    plasticBagsReducedMonthly: number;
    wasteStatus: 'verified' | 'pending';
    facilitatorName: string;
    ecoActionsList: string[];
  };

  // Underwriting notes
  analystNotes?: string;
}

export interface InterestTierRule {
  tierName: string;
  minScore: number;
  maxScore: number;
  subsidizedRate: number;
  regularRate: number;
  discountBps: number;
  maxPlafon: number;
  riskRating: 'Sangat Rendah' | 'Rendah' | 'Sedang' | 'Tinggi';
}

