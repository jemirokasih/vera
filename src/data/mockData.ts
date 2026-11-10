import { Product, Merchant, Transaction, GreenAction, LoanApplication } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Cabai Rawit Merah', price: 55000, unit: 'kg', category: 'Bumbu', emoji: '🌶️', stock: 25 },
  { id: 'p2', name: 'Cabai Merah Keriting', price: 42000, unit: 'kg', category: 'Bumbu', emoji: '🌶️', stock: 30 },
  { id: 'p3', name: 'Bawang Merah Brebes', price: 38000, unit: 'kg', category: 'Bumbu', emoji: '🧅', stock: 40 },
  { id: 'p4', name: 'Bawang Putih Honan', price: 36000, unit: 'kg', category: 'Bumbu', emoji: '🧄', stock: 35 },
  { id: 'p5', name: 'Bayam Hijau Segar', price: 4000, unit: 'ikat', category: 'Sayur', emoji: '🥬', stock: 50 },
  { id: 'p6', name: 'Kangkung Hidroponik Lokal', price: 3500, unit: 'ikat', category: 'Sayur', emoji: '🥗', stock: 45 },
  { id: 'p7', name: 'Tomat Buah Segar', price: 14000, unit: 'kg', category: 'Sayur', emoji: '🍅', stock: 30 },
  { id: 'p8', name: 'Tempe Daun Pisang', price: 5000, unit: 'papan', category: 'Sembako', emoji: '🧈', stock: 40 },
  { id: 'p9', name: 'Tahu Sutra Kuning', price: 8000, unit: 'bks', category: 'Sembako', emoji: '🍢', stock: 25 },
  { id: 'p10', name: 'Kentang Dieng Super', price: 18000, unit: 'kg', category: 'Sayur', emoji: '🥔', stock: 60 },
  { id: 'p11', name: 'Wortel Brastagi', price: 15000, unit: 'kg', category: 'Sayur', emoji: '🥕', stock: 35 },
  { id: 'p12', name: 'Telur Ayam Negeri', price: 28000, unit: 'kg', category: 'Sembako', emoji: '🥚', stock: 50 },
];

export const CURRENT_MERCHANT: Merchant = {
  id: 'm1',
  name: 'Ibu Siti Rohmah',
  ownerName: 'Siti Rohmah',
  stallName: 'Lapak Sayur Berkah Bu Siti',
  stallLocation: 'Blok A-14, Pasar Jambu Dua, Bogor',
  phone: '0812-8921-4321',
  category: 'Sayuran & Bumbu Basah',
  joinDate: '14 Jan 2025',
  avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  qrisId: 'NMID: ID202611094821',
  dailyRevenue: 1450000,
  monthlyRevenue: 38200000,
  organicWasteKgMonth: 124.5,
  score: {
    total: 86,
    tier: 'Hijau Emas',
    financialScore: 88, // 50%
    greenScore: 92,     // 30%
    digitalScore: 75,   // 20%
    dscrRatio: 2.4,     // Kemampuan bayar aman (> 1.3x)
    kurEligible: true,
    eligiblePlafon: 35000000,
    interestRatePromo: 3.0, // Subsidi bunga hijau
  }
};

export const INITIAL_MERCHANTS_LIST: Merchant[] = [
  CURRENT_MERCHANT,
  {
    id: 'm2',
    name: 'Pak Ujang Kosasih',
    ownerName: 'Ujang Kosasih',
    stallName: 'Kios Daging Sapi Segar Barokah',
    stallLocation: 'Blok B-03, Pasar Jambu Dua',
    phone: '0813-1122-3344',
    category: 'Daging Segar',
    joinDate: '02 Feb 2025',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    qrisId: 'NMID: ID202611094822',
    dailyRevenue: 4200000,
    monthlyRevenue: 98000000,
    organicWasteKgMonth: 185.0,
    score: {
      total: 91,
      tier: 'Hijau Emas',
      financialScore: 94,
      greenScore: 89,
      digitalScore: 88,
      dscrRatio: 3.1,
      kurEligible: true,
      eligiblePlafon: 50000000,
      interestRatePromo: 3.0
    }
  },
  {
    id: 'm3',
    name: 'Ibu Dewi Lestari',
    ownerName: 'Dewi Lestari',
    stallName: 'Toko Sembako Makmur Jaya',
    stallLocation: 'Blok C-08, Pasar Jambu Dua',
    phone: '0817-4455-6677',
    category: 'Sembako & Minyak',
    joinDate: '20 Des 2024',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    qrisId: 'NMID: ID202611094823',
    dailyRevenue: 2850000,
    monthlyRevenue: 64000000,
    organicWasteKgMonth: 42.0,
    score: {
      total: 78,
      tier: 'Rindang',
      financialScore: 80,
      greenScore: 72,
      digitalScore: 82,
      dscrRatio: 1.9,
      kurEligible: true,
      eligiblePlafon: 25000000,
      interestRatePromo: 4.5
    }
  },
  {
    id: 'm4',
    name: 'Pak Asep Sunandar',
    ownerName: 'Asep Sunandar',
    stallName: 'Bumbu Giling Khas Priangan',
    stallLocation: 'Blok A-22, Pasar Jambu Dua',
    phone: '0856-7890-1234',
    category: 'Bumbu & Rempah',
    joinDate: '10 Mar 2025',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    qrisId: 'NMID: ID202611094824',
    dailyRevenue: 980000,
    monthlyRevenue: 23500000,
    organicWasteKgMonth: 78.0,
    score: {
      total: 68,
      tier: 'Daun',
      financialScore: 65,
      greenScore: 74,
      digitalScore: 66,
      dscrRatio: 1.4,
      kurEligible: false,
      eligiblePlafon: 15000000,
      interestRatePromo: 6.0
    }
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    invoiceNo: 'VERA-20261111-001',
    date: '11 Nov 2026',
    time: '06:15 WIB',
    items: [
      { name: 'Cabai Rawit Merah', quantity: 2, price: 55000, subtotal: 110000 },
      { name: 'Bawang Merah Brebes', quantity: 1, price: 38000, subtotal: 38000 }
    ],
    total: 148000,
    paymentMethod: 'qris',
    customerType: 'langganan',
    isVeraVerified: true,
    sakEmkmCategory: 'pendapatan_usaha'
  },
  {
    id: 'tx-2',
    invoiceNo: 'VERA-20261111-002',
    date: '11 Nov 2026',
    time: '06:42 WIB',
    items: [
      { name: 'Bayam Hijau Segar', quantity: 3, price: 4000, subtotal: 12000 },
      { name: 'Tempe Daun Pisang', quantity: 2, price: 5000, subtotal: 10000 },
      { name: 'Tomat Buah Segar', quantity: 1, price: 14000, subtotal: 14000 }
    ],
    total: 36000,
    paymentMethod: 'tunai',
    customerType: 'umum',
    isVeraVerified: true,
    sakEmkmCategory: 'pendapatan_usaha'
  },
  {
    id: 'tx-3',
    invoiceNo: 'VERA-20261111-003',
    date: '11 Nov 2026',
    time: '07:18 WIB',
    items: [
      { name: 'Kentang Dieng Super', quantity: 3, price: 18000, subtotal: 54000 },
      { name: 'Wortel Brastagi', quantity: 2, price: 15000, subtotal: 30000 },
      { name: 'Telur Ayam Negeri', quantity: 2, price: 28000, subtotal: 56000 }
    ],
    total: 140000,
    paymentMethod: 'qris',
    customerType: 'langganan',
    isVeraVerified: true,
    sakEmkmCategory: 'pendapatan_usaha'
  }
];

export const INITIAL_GREEN_ACTIONS: GreenAction[] = [
  {
    id: 'ga-1',
    title: 'Pilah Sampah Organik Sayur',
    description: 'Setoran 4.8 kg sisa batang sayur & kulit bawang ke Rumah Kompos Blok A Pasar Jambu Dua',
    category: 'pilah_organik',
    impactPoints: 15,
    status: 'verified',
    timestamp: '11 Nov 2026, 06:30 WIB',
    proofNote: 'Ditimbang oleh Agen Fasilitator Ngariung Hub (Kang Dani)',
    weightKg: 4.8,
    verifiedBy: 'Dani - Fasilitator Ngariung Hub'
  },
  {
    id: 'ga-2',
    title: 'Kemasan Bebas Plastik Sekali Pakai',
    description: 'Menggunakan besek bambu dan daun pisang untuk 18 pelanggan pagi ini',
    category: 'bebas_plastik',
    impactPoints: 12,
    status: 'verified',
    timestamp: '11 Nov 2026, 07:00 WIB',
    proofNote: 'Verifikasi checklist harian pos pantau pasar hijau',
    verifiedBy: 'Sistem Audit Visual VERA'
  },
  {
    id: 'ga-3',
    title: 'Efisiensi Stok & Anti Food Waste',
    description: 'Pembelian stok tepat guna langsung dari Kelompok Tani Sukabumi tanpa susut busuk',
    category: 'efisiensi_stok',
    impactPoints: 10,
    status: 'pending',
    timestamp: '10 Nov 2026, 17:15 WIB',
    proofNote: 'Struk timbang masuk barang menunggu validasi admin pasar'
  }
];

export const INITIAL_LOAN_APPLICATIONS: LoanApplication[] = [
  {
    id: 'app-01',
    merchantId: 'm1',
    merchantName: 'Ibu Siti Rohmah',
    stallName: 'Lapak Sayur Berkah Bu Siti',
    stallLocation: 'Blok A-14, Pasar Jambu Dua',
    category: 'Sayur & Bumbu',
    requestedAmount: 30000000,
    tenorMonths: 18,
    veraScore: 86,
    tier: 'Hijau Emas',
    status: 'review',
    submissionDate: '10 Nov 2026',
    bankPartner: 'Bank Mandiri Micro / BSI Green KUR',
    purpose: 'Ekspansi etalase pendingin ramah lingkungan & tambah stok organik',
    dscr: 2.4
  },
  {
    id: 'app-02',
    merchantId: 'm2',
    merchantName: 'Pak Ujang Kosasih',
    stallName: 'Kios Daging Sapi Segar Barokah',
    stallLocation: 'Blok B-03, Pasar Jambu Dua',
    category: 'Daging Segar',
    requestedAmount: 50000000,
    tenorMonths: 24,
    veraScore: 91,
    tier: 'Hijau Emas',
    status: 'approved',
    submissionDate: '08 Nov 2026',
    bankPartner: 'BRI Micro Green Fund',
    purpose: 'Pengadaan cold storage tenaga surya mini kios',
    dscr: 3.1
  },
  {
    id: 'app-03',
    merchantId: 'm3',
    merchantName: 'Ibu Dewi Lestari',
    stallName: 'Toko Sembako Makmur Jaya',
    stallLocation: 'Blok C-08, Pasar Jambu Dua',
    category: 'Sembako',
    requestedAmount: 25000000,
    tenorMonths: 12,
    veraScore: 78,
    tier: 'Rindang',
    status: 'review',
    submissionDate: '09 Nov 2026',
    bankPartner: 'BNI Green SME',
    purpose: 'Modal kerja pengadaan beras organik lokal & minyak kemasan curah higienis',
    dscr: 1.9
  }
];

