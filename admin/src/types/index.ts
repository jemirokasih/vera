export type AdminViewType = 'dashboard' | 'validation' | 'merchants' | 'partners' | 'esg_report';

export interface Merchant {
  id: string;
  name: string;
  ownerName: string;
  stallName: string;
  stallLocation: string; // e.g. "Blok A No. 14, Pasar Jambu Dua"
  phone: string;
  category: string;
  joinDate: string;
  avatarUrl: string;
  qrisId: string;
  dailyRevenue: number;
  monthlyRevenue: number;
  organicWasteKgMonth: number;
  dscrRatio: number;
  score: {
    total: number;
    tier: string;
    financialScore: number;
    greenScore: number;
    digitalScore: number;
    kurEligible: boolean;
    eligiblePlafon: number;
    interestRatePromo: number;
  };
}

export interface GreenValidationItem {
  id: string;
  merchantId: string;
  merchantName: string;
  stallName: string;
  stallLocation: string;
  title: string;
  description: string;
  category: 'pilah_organik' | 'bebas_plastik' | 'efisiensi_stok' | 'biopori_kompos';
  impactPoints: number;
  status: 'verified' | 'pending' | 'rejected';
  timestamp: string;
  proofNote: string;
  weightKg?: number;
  verifiedBy?: string;
  facilitatorName?: string;
  photoUrl?: string;
}

export interface EcoPartner {
  id: string;
  name: string;
  role: string;
  contactPerson: string;
  phone: string;
  status: 'active' | 'scheduled' | 'pending';
  contribution: string;
  iconType: 'leaf' | 'bank' | 'recycle' | 'gov';
}

export interface MarketBlock {
  id: string;
  name: string;
  commodityType: string;
  totalStalls: number;
  activeVeraStalls: number;
  monthlyOrganicWasteKg: number;
  complianceRate: number;
}
