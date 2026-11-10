export type ProductCategory = 'Semua' | 'Sayur' | 'Bumbu' | 'Sembako';

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
  time: string;
  items: {
    name: string;
    quantity: number;
    price: number;
    subtotal: number;
  }[];
  total: number;
  paymentMethod: 'qris' | 'tunai';
  isVeraVerified: boolean;
}

export interface GreenAction {
  id: string;
  title: string;
  description: string;
  impactPoints: number;
  status: 'verified' | 'pending';
  timestamp: string;
  weightKg?: number;
  proofNote: string;
}

export interface Merchant {
  id: string;
  name: string;
  stallName: string;
  stallLocation: string;
  avatarUrl: string;
  qrisId: string;
  dailyRevenue: number;
  organicWasteKgMonth: number;
  score: {
    total: number;
    tier: string;
    financialScore: number;
    greenScore: number;
    digitalScore: number;
    dscrRatio: number;
    eligiblePlafon: number;
    interestRatePromo: number;
  };
}
