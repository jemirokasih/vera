import { Product, Merchant, Transaction, GreenAction } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Cabai Rawit Merah', price: 55000, unit: 'kg', category: 'Bumbu', emoji: '🌶️', stock: 25 },
  { id: 'p2', name: 'Cabai Merah Keriting', price: 42000, unit: 'kg', category: 'Bumbu', emoji: '🌶️', stock: 30 },
  { id: 'p3', name: 'Bawang Merah Brebes', price: 38000, unit: 'kg', category: 'Bumbu', emoji: '🧅', stock: 40 },
  { id: 'p4', name: 'Bawang Putih Honan', price: 36000, unit: 'kg', category: 'Bumbu', emoji: '🧄', stock: 35 },
  { id: 'p5', name: 'Bayam Hijau Segar', price: 4000, unit: 'ikat', category: 'Sayur', emoji: '🥬', stock: 50 },
  { id: 'p6', name: 'Kangkung Hidroponik', price: 3500, unit: 'ikat', category: 'Sayur', emoji: '🥗', stock: 45 },
  { id: 'p7', name: 'Tomat Buah Segar', price: 14000, unit: 'kg', category: 'Sayur', emoji: '🍅', stock: 30 },
  { id: 'p8', name: 'Tempe Daun Pisang', price: 5000, unit: 'papan', category: 'Sembako', emoji: '🧈', stock: 40 },
  { id: 'p9', name: 'Tahu Kuning Sutra', price: 8000, unit: 'bks', category: 'Sembako', emoji: '🍢', stock: 25 },
  { id: 'p10', name: 'Kentang Dieng Super', price: 18000, unit: 'kg', category: 'Sayur', emoji: '🥔', stock: 60 },
  { id: 'p11', name: 'Wortel Brastagi', price: 15000, unit: 'kg', category: 'Sayur', emoji: '🥕', stock: 35 },
  { id: 'p12', name: 'Telur Ayam Negeri', price: 28000, unit: 'kg', category: 'Sembako', emoji: '🥚', stock: 50 },
];

export const INITIAL_MERCHANT: Merchant = {
  id: 'm1',
  name: 'Ibu Siti Rohmah',
  stallName: 'Lapak Sayur Berkah Bu Siti',
  stallLocation: 'Blok A-14, Pasar Jambu Dua',
  avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  qrisId: 'NMID: ID202611094821',
  dailyRevenue: 1450000,
  organicWasteKgMonth: 124.5,
  score: {
    total: 86,
    tier: 'Hijau Emas',
    financialScore: 88,
    greenScore: 92,
    digitalScore: 75,
    dscrRatio: 2.4,
    eligiblePlafon: 35000000,
    interestRatePromo: 3.0,
  }
};

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    invoiceNo: 'VERA-20261111-001',
    time: '06:15 WIB',
    items: [
      { name: 'Cabai Rawit Merah', quantity: 2, price: 55000, subtotal: 110000 },
      { name: 'Bawang Merah Brebes', quantity: 1, price: 38000, subtotal: 38000 }
    ],
    total: 148000,
    paymentMethod: 'qris',
    isVeraVerified: true,
  },
  {
    id: 'tx-2',
    invoiceNo: 'VERA-20261111-002',
    time: '06:42 WIB',
    items: [
      { name: 'Bayam Hijau Segar', quantity: 3, price: 4000, subtotal: 12000 },
      { name: 'Tempe Daun Pisang', quantity: 2, price: 5000, subtotal: 10000 }
    ],
    total: 22000,
    paymentMethod: 'tunai',
    isVeraVerified: true,
  }
];

export const INITIAL_GREEN_ACTIONS: GreenAction[] = [
  {
    id: 'ga-1',
    title: 'Pilah Sampah Sayur Organik',
    description: 'Setoran 4.8 kg sisa tangkai sayuran ke Rumah Kompos Blok A',
    impactPoints: 15,
    status: 'verified',
    timestamp: '06:30 WIB',
    weightKg: 4.8,
    proofNote: 'Ditimbang oleh Agen Fasilitator Ngariung Hub'
  },
  {
    id: 'ga-2',
    title: 'Kemasan Besek & Daun Pisang',
    description: '18 transaksi tanpa kantong plastik kresek',
    impactPoints: 12,
    status: 'verified',
    timestamp: '07:00 WIB',
    proofNote: 'Audit visual lapak hijau'
  }
];
