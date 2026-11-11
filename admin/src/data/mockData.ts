import { Merchant, GreenValidationItem, EcoPartner, MarketBlock } from '../types';

export const INITIAL_MERCHANTS: Merchant[] = [
  {
    id: 'm1',
    name: 'Ibu Siti Rohmah',
    ownerName: 'Siti Rohmah',
    stallName: 'Lapak Sayur Berkah Bu Siti',
    stallLocation: 'Blok A No. 14, Pasar Jambu Dua',
    phone: '0812-8921-4321',
    category: 'Sayuran & Bumbu Basah',
    joinDate: '14 Jan 2025',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    qrisId: 'NMID: ID202611094821',
    dailyRevenue: 1450000,
    monthlyRevenue: 38200000,
    organicWasteKgMonth: 124.5,
    dscrRatio: 2.4,
    score: {
      total: 86,
      tier: 'Hijau Emas',
      financialScore: 88,
      greenScore: 92,
      digitalScore: 75,
      kurEligible: true,
      eligiblePlafon: 35000000,
      interestRatePromo: 3.0,
    }
  },
  {
    id: 'm2',
    name: 'Pak Ujang Kosasih',
    ownerName: 'Ujang Kosasih',
    stallName: 'Kios Daging Sapi Segar Barokah',
    stallLocation: 'Blok B No. 03, Pasar Jambu Dua',
    phone: '0813-1122-3344',
    category: 'Daging Segar',
    joinDate: '02 Feb 2025',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    qrisId: 'NMID: ID202611094822',
    dailyRevenue: 4200000,
    monthlyRevenue: 98000000,
    organicWasteKgMonth: 185.0,
    dscrRatio: 3.1,
    score: {
      total: 91,
      tier: 'Hijau Emas',
      financialScore: 94,
      greenScore: 89,
      digitalScore: 88,
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
    stallLocation: 'Blok C No. 08, Pasar Jambu Dua',
    phone: '0817-4455-6677',
    category: 'Sembako & Beras',
    joinDate: '20 Des 2024',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    qrisId: 'NMID: ID202611094823',
    dailyRevenue: 2850000,
    monthlyRevenue: 64000000,
    organicWasteKgMonth: 42.0,
    dscrRatio: 1.9,
    score: {
      total: 78,
      tier: 'Rindang',
      financialScore: 80,
      greenScore: 72,
      digitalScore: 82,
      kurEligible: true,
      eligiblePlafon: 25000000,
      interestRatePromo: 4.5
    }
  },
  {
    id: 'm4',
    name: 'Pak Asep Sunandar',
    ownerName: 'Asep Sunandar',
    stallName: 'Kios Bumbu Giling Parahyangan',
    stallLocation: 'Blok A No. 22, Pasar Jambu Dua',
    phone: '0856-7890-1234',
    category: 'Bumbu & Rempah',
    joinDate: '10 Mar 2025',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    qrisId: 'NMID: ID202611094824',
    dailyRevenue: 980000,
    monthlyRevenue: 23500000,
    organicWasteKgMonth: 78.0,
    dscrRatio: 1.4,
    score: {
      total: 68,
      tier: 'Daun',
      financialScore: 65,
      greenScore: 74,
      digitalScore: 66,
      kurEligible: false,
      eligiblePlafon: 15000000,
      interestRatePromo: 6.0
    }
  },
  {
    id: 'm5',
    name: 'Ibu Enok Komariah',
    ownerName: 'Enok Komariah',
    stallName: 'Kios Ayam Potong Berkah',
    stallLocation: 'Blok B No. 11, Pasar Jambu Dua',
    phone: '0878-9900-1122',
    category: 'Unggas & Ayam',
    joinDate: '15 Jan 2025',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    qrisId: 'NMID: ID202611094825',
    dailyRevenue: 3100000,
    monthlyRevenue: 72000000,
    organicWasteKgMonth: 142.0,
    dscrRatio: 2.2,
    score: {
      total: 82,
      tier: 'Hijau Emas',
      financialScore: 84,
      greenScore: 86,
      digitalScore: 76,
      kurEligible: true,
      eligiblePlafon: 30000000,
      interestRatePromo: 3.5
    }
  }
];

export const INITIAL_VALIDATION_ITEMS: GreenValidationItem[] = [
  {
    id: 'val-1',
    merchantId: 'm1',
    merchantName: 'Ibu Siti Rohmah',
    stallName: 'Lapak Sayur Berkah Bu Siti',
    stallLocation: 'Blok A No. 14',
    title: 'Pilah Sampah Sayur Organik',
    description: 'Setoran 4.8 kg sisa tangkai sayur & kulit bawang ke Rumah Kompos Blok A',
    category: 'pilah_organik',
    impactPoints: 15,
    status: 'pending',
    timestamp: '11 Nov 2026, 07:15 WIB',
    proofNote: 'Ditimbang di pos timbang timur oleh Kang Dani (Agen Ngariung Hub)',
    weightKg: 4.8,
    facilitatorName: 'Dani Saputra'
  },
  {
    id: 'val-2',
    merchantId: 'm4',
    merchantName: 'Pak Asep Sunandar',
    stallName: 'Kios Bumbu Giling Parahyangan',
    stallLocation: 'Blok A No. 22',
    title: 'Setor Kulit Bawang & Jahe Residu',
    description: 'Setoran 3.2 kg ampas bumbu giling untuk bahan bio-pestisida',
    category: 'pilah_organik',
    impactPoints: 12,
    status: 'pending',
    timestamp: '11 Nov 2026, 06:50 WIB',
    proofNote: 'Struk timbangan No. 048 Rumah Kompos Jambu Dua',
    weightKg: 3.2,
    facilitatorName: 'Teh Lilis'
  },
  {
    id: 'val-3',
    merchantId: 'm2',
    merchantName: 'Pak Ujang Kosasih',
    stallName: 'Kios Daging Sapi Segar Barokah',
    stallLocation: 'Blok B No. 03',
    title: 'Pengolahan Lemak & Tulang Sisa (Bio-Diesel Hub)',
    description: 'Setoran 12.0 kg sisa lemak hewani ke mitra pengolah biodiesel Kota Bogor',
    category: 'pilah_organik',
    impactPoints: 20,
    status: 'pending',
    timestamp: '11 Nov 2026, 06:10 WIB',
    proofNote: 'Berita acara serah terima limbah organik hewan tervalidasi',
    weightKg: 12.0,
    facilitatorName: 'Dani Saputra'
  },
  {
    id: 'val-4',
    merchantId: 'm1',
    merchantName: 'Ibu Siti Rohmah',
    stallName: 'Lapak Sayur Berkah Bu Siti',
    stallLocation: 'Blok A No. 14',
    title: 'Penggunaan Besek Bambu & Daun Pisang',
    description: '18 transaksi pembeli menggunakan wadah ramah lingkungan bebas kresek sekali pakai',
    category: 'bebas_plastik',
    impactPoints: 12,
    status: 'verified',
    timestamp: '10 Nov 2026, 08:30 WIB',
    proofNote: 'Audit visual pos pantau Blok A',
    verifiedBy: 'Iwan Setiawan (Kepala Lapangan Pasar Jambu Dua)'
  },
  {
    id: 'val-5',
    merchantId: 'm3',
    merchantName: 'Ibu Dewi Lestari',
    stallName: 'Toko Sembako Makmur Jaya',
    stallLocation: 'Blok C No. 08',
    title: 'Pemberian Diskon Konsumen Bawa Tas Sendiri',
    description: 'Potongan Rp 1.000 bagi 25 pelanggan yang membawa totebag belanja mandiri',
    category: 'bebas_plastik',
    impactPoints: 15,
    status: 'verified',
    timestamp: '10 Nov 2026, 10:15 WIB',
    proofNote: 'Struk kasir VERA tercatat kode promo #TasSendiri',
    verifiedBy: 'Sistem Audit Otomatis VERA'
  }
];

export const INITIAL_MARKET_BLOCKS: MarketBlock[] = [
  {
    id: 'b-a',
    name: 'Blok A (Basah - Sayuran & Bumbu)',
    commodityType: 'Sayuran, Bumbu Giling, Cabai, Tomat',
    totalStalls: 68,
    activeVeraStalls: 26,
    monthlyOrganicWasteKg: 840,
    complianceRate: 88,
  },
  {
    id: 'b-b',
    name: 'Blok B (Basah - Daging & Unggas)',
    commodityType: 'Daging Sapi, Kambing, Ayam Potong, Ikan Basah',
    totalStalls: 45,
    activeVeraStalls: 18,
    monthlyOrganicWasteKg: 420,
    complianceRate: 79,
  },
  {
    id: 'b-c',
    name: 'Blok C (Kering - Sembako & Beras)',
    commodityType: 'Beras, Minyak, Telur, Gula, Bumbu Kering',
    totalStalls: 72,
    activeVeraStalls: 14,
    monthlyOrganicWasteKg: 168,
    complianceRate: 65,
  }
];

export const INITIAL_ECO_PARTNERS: EcoPartner[] = [
  {
    id: 'ep-1',
    name: 'Dinas Lingkungan Hidup (DLH) Kota Bogor',
    role: 'Regulator & Pengangkut Residu TPA Galuga',
    contactPerson: 'Ir. Hendra Gunawan',
    phone: '0251-8321098',
    status: 'active',
    contribution: 'Pengurangan biaya retribusi sampah pasar sebesar 30% berkat reduksi limbah organik VERA.',
    iconType: 'gov'
  },
  {
    id: 'ep-2',
    name: 'Rumah Kompos Pasar Jambu Dua & Bank Sampah',
    role: 'Pengolahan Kompos & Biokonversi Maggot BSF',
    contactPerson: 'Kang Acep Rahmat',
    phone: '0812-3456-7890',
    status: 'active',
    contribution: 'Mengolah rata-rata 50-70 kg limbah sayuran segar per hari menjadi pupuk organik cair & padat.',
    iconType: 'recycle'
  },
  {
    id: 'ep-3',
    name: 'Bank BSI & BRI Micro Green Fund',
    role: 'Penyalur KUR Mikro Hijau Bunga Subsidi 3%',
    contactPerson: 'Aditia Pratama (Account Officer Green)',
    phone: '0813-9876-5432',
    status: 'active',
    contribution: 'Menyalurkan Rp 340.000.000 pembiayaan modal kerja hijau bagi pedagang bersertifikasi VERA.',
    iconType: 'bank'
  },
  {
    id: 'ep-4',
    name: 'Kelompok Tani Organik Sukabumi & Cianjur',
    role: 'Pemasok Rantai Pasok Petani ke Pedagang (Direct Farm)',
    contactPerson: 'H. Suryadi',
    phone: '0857-1122-3344',
    status: 'active',
    contribution: 'Memasok komoditas bebas pestisida dan menerima kembali pupuk kompos dari Pasar Jambu Dua.',
    iconType: 'leaf'
  }
];
