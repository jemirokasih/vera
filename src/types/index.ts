export type UserRole = 'pedagang' | 'bank' | 'admin';

export type ProductCategory = 'Semua' | 'Sayur' | 'Bumbu' | 'Sembako' | 'Daging' | 'Buah';

export interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  category: ProductCategory;
  emoji: string;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  subtotal: number;
}

export interface Transaction {
  id: string;
  invoiceNo: string;
  date: string;
  time: string;
  items: {
    name: string;
    quantity: number;
    price: number;
    subtotal: number;
  }[];
  total: number;
  paymentMethod: 'qris' | 'tunai';
  customerType: 'langganan' | 'umum';
  isVeraVerified: boolean;
  sakEmkmCategory: 'pendapatan_usaha' | 'beban_pokok' | 'beban_operasional';
}

export interface GreenAction {
  id: string;
  title: string;
  description: string;
  category: 'pilah_organik' | 'bebas_plastik' | 'efisiensi_stok' | 'biopori_kompos';
  impactPoints: number;
  status: 'verified' | 'pending' | 'rejected';
  timestamp: string;
  proofNote: string;
  weightKg?: number;
  verifiedBy?: string;
}

export interface GreenCreditScore {
  total: number; // 0 - 100
  tier: 'Bibit' | 'Tunas' | 'Daun' | 'Rindang' | 'Hijau Emas';
  financialScore: number; // 50%
  greenScore: number; // 30%
  digitalScore: number; // 20%
  dscrRatio: number; // Debt Service Coverage Ratio
  kurEligible: boolean;
  eligiblePlafon: number;
  interestRatePromo: number;
}

export interface Merchant {
  id: string;
  name: string;
  ownerName: string;
  stallName: string;
  stallLocation: string; // e.g. "Blok A No. 14, Pasar Jambu Dua"
  phone: string;
  category: string;
  joinDate: string;
  score: GreenCreditScore;
  avatarUrl: string;
  qrisId: string;
  dailyRevenue: number;
  monthlyRevenue: number;
  organicWasteKgMonth: number;
}

export interface LoanApplication {
  id: string;
  merchantId: string;
  merchantName: string;
  stallName: string;
  stallLocation: string;
  category: string;
  requestedAmount: number;
  tenorMonths: number;
  veraScore: number;
  tier: string;
  status: 'review' | 'approved' | 'disbursed';
  submissionDate: string;
  bankPartner: string;
  purpose: string;
  dscr: number;
}
