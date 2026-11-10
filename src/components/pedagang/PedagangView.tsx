import React, { useState } from 'react';
import {
  Product,
  CartItem,
  Transaction,
  GreenAction,
  Merchant,
  ProductCategory,
  LoanApplication
} from '../../types';
import {
  Store,
  QrCode,
  Wallet,
  Leaf,
  Sparkles,
  TrendingUp,
  Receipt,
  Plus,
  Minus,
  CheckCircle2,
  Share2,
  Clock,
  ShieldCheck,
  ChevronRight,
  Bell,
  Coins,
  Scale,
  Send,
  Building,
  Award,
  ChevronDown
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PedagangViewProps {
  merchant: Merchant;
  products: Product[];
  transactions: Transaction[];
  greenActions: GreenAction[];
  loanApplications: LoanApplication[];
  onAddTransaction: (tx: Omit<Transaction, 'id' | 'invoiceNo' | 'date' | 'time' | 'isVeraVerified'>) => void;
  onAddGreenAction: (action: Omit<GreenAction, 'id' | 'status' | 'timestamp'>) => void;
  onSubmitLoan: (app: Omit<LoanApplication, 'id' | 'status' | 'submissionDate' | 'veraScore' | 'tier'>) => void;
  onOpenVeraAssistant: () => void;
}

type TabType = 'home' | 'pos' | 'sak_emkm' | 'green' | 'kur';

export const PedagangView: React.FC<PedagangViewProps> = ({
  merchant,
  products,
  transactions,
  greenActions,
  loanApplications,
  onAddTransaction,
  onAddGreenAction,
  onSubmitLoan,
  onOpenVeraAssistant,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('home');

  // POS State
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('Semua');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'tunai'>('qris');
  const [lastCompletedTx, setLastCompletedTx] = useState<Transaction | null>(null);

  // Manual Numpad Quick POS state
  const [manualAmount, setManualAmount] = useState('');
  const [manualNote, setManualNote] = useState('');

  // Green Action Form State
  const [isGreenModalOpen, setIsGreenModalOpen] = useState(false);
  const [greenTitle, setGreenTitle] = useState('Pilah Sampah Sayuran Organik');
  const [greenWeight, setGreenWeight] = useState('4.8');
  const [greenNote, setGreenNote] = useState('Disetor ke Rumah Kompos Blok A');

  // SAK EMKM Expense Form
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDesc, setExpenseDesc] = useState('');

  // KUR Loan Simulator State
  const [loanPlafon, setLoanPlafon] = useState(25000000);
  const [loanTenor, setLoanTenor] = useState(18);
  const [loanSuccessMessage, setLoanSuccessMessage] = useState(false);

  // Cart operations
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1, subtotal: (item.quantity + 1) * product.price }
            : item
        );
      }
      return [...prev, { product, quantity: 1, subtotal: product.price }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === productId);
      if (!existing) return prev;
      if (existing.quantity === 1) {
        return prev.filter((item) => item.product.id !== productId);
      }
      return prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity - 1, subtotal: (item.quantity - 1) * item.product.price }
          : item
      );
    });
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.subtotal, 0);

  const handleCheckout = () => {
    if (cart.length === 0 && !manualAmount) return;

    const items = cart.length > 0
      ? cart.map((i) => ({
          name: i.product.name,
          quantity: i.quantity,
          price: i.product.price,
          subtotal: i.subtotal,
        }))
      : [{
          name: manualNote || 'Penjualan Campur Kasir Cepat',
          quantity: 1,
          price: parseInt(manualAmount),
          subtotal: parseInt(manualAmount),
        }];

    const total = cart.length > 0 ? cartTotal : parseInt(manualAmount);

    onAddTransaction({
      items,
      total,
      paymentMethod,
      customerType: 'umum',
      sakEmkmCategory: 'pendapatan_usaha',
    });

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#84cc16', '#10b981', '#f59e0b']
    });

    const mockInvoice: Transaction = {
      id: 'tx-new',
      invoiceNo: `VERA-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(100 + Math.random() * 900)}`,
      date: 'Hari ini',
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      items,
      total,
      paymentMethod,
      customerType: 'umum',
      isVeraVerified: true,
      sakEmkmCategory: 'pendapatan_usaha'
    };

    setLastCompletedTx(mockInvoice);
    setCart([]);
    setManualAmount('');
    setManualNote('');
    setIsCheckoutOpen(false);
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expenseAmount) return;

    onAddTransaction({
      items: [{
        name: expenseDesc || 'Pengeluaran Kulakan / Belanja Stok',
        quantity: 1,
        price: -Math.abs(parseInt(expenseAmount)),
        subtotal: -Math.abs(parseInt(expenseAmount))
      }],
      total: -Math.abs(parseInt(expenseAmount)),
      paymentMethod: 'tunai',
      customerType: 'umum',
      sakEmkmCategory: 'beban_operasional'
    });

    setIsExpenseModalOpen(false);
    setExpenseAmount('');
    setExpenseDesc('');
  };

  const handleCreateGreenAction = (e: React.FormEvent) => {
    e.preventDefault();
    onAddGreenAction({
      title: greenTitle,
      description: `${greenTitle} sebesar ${greenWeight} kg di Pasar Jambu Dua.`,
      category: 'pilah_organik',
      impactPoints: 15,
      proofNote: greenNote,
      weightKg: parseFloat(greenWeight) || 4.5
    });

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#84cc16', '#10b981']
    });

    setIsGreenModalOpen(false);
  };

  const handleApplyLoan = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitLoan({
      merchantId: merchant.id,
      merchantName: merchant.name,
      stallName: merchant.stallName,
      stallLocation: merchant.stallLocation,
      category: merchant.category,
      requestedAmount: loanPlafon,
      tenorMonths: loanTenor,
      bankPartner: 'BSI Green Micro / Bank Mandiri Hijau',
      purpose: 'Modal kerja stok sayur organik & pengadaan kotak pendingin ramah lingkungan',
      dscr: merchant.score.dscrRatio,
    });
    setLoanSuccessMessage(true);
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#0d3b23', '#84cc16', '#3b82f6']
    });
  };

  // Calculations for SAK EMKM
  const todayRevenue = transactions
    .filter(t => t.total > 0)
    .reduce((sum, t) => sum + t.total, 0);

  const todayExpenses = Math.abs(
    transactions
      .filter(t => t.total < 0)
      .reduce((sum, t) => sum + t.total, 0)
  );

  const grossProfit = Math.round(todayRevenue * 0.42);
  const netProfit = grossProfit - todayExpenses;

  const filteredProducts = selectedCategory === 'Semua'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="w-full flex justify-center py-4 px-2 sm:px-4">
      {/* Phone Mockup Frame - Light Clean Device Case */}
      <div className="relative w-full max-w-md bg-[#F4F7F4] rounded-[48px] border-[10px] border-slate-300/80 shadow-2xl shadow-emerald-950/10 overflow-hidden flex flex-col min-h-[840px] max-h-[920px]">
        
        {/* Status Bar */}
        <div className="bg-[#F4F7F4] px-6 pt-3 pb-2 flex items-center justify-between text-[11px] text-slate-600 select-none z-30">
          <span className="font-bold">06:30</span>
          <div className="w-20 h-4 bg-slate-900 rounded-full flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-lime-400 animate-pulse"></span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            <span>5G</span>
            <span>100%</span>
          </div>
        </div>

        {/* Friendly Top Header with Profile Avatar (Inspired by Image 2 & 3) */}
        <div className="bg-[#F4F7F4] px-4 py-2.5 flex items-center justify-between border-b border-emerald-100/60">
          <div className="flex items-center gap-2.5">
            <img
              src={merchant.avatarUrl}
              alt={merchant.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-1">
                <span className="font-extrabold text-sm text-slate-900">Hai, Bu Siti!</span>
                <span className="text-sm">👋</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                {merchant.stallName} • Blok A-14
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenVeraAssistant}
              className="p-2 rounded-full bg-lime-400 text-[#0D3B23] shadow-sm hover:scale-105 active:scale-95 transition"
              title="Tanya VERA"
            >
              <Sparkles className="w-4 h-4 fill-[#0D3B23]" />
            </button>
            <div className="p-2 rounded-full bg-white border border-slate-200 text-slate-600 shadow-xs">
              <Bell className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Scrollable Main Content Area */}
        <div className="flex-1 overflow-y-auto pb-28 p-4 space-y-4">
          
          {/* TAB 1: BERANDA */}
          {activeTab === 'home' && (
            <div className="space-y-4 animate-fade-in">
              
              {/* Metonymy Banner: "Udah di-Vera-kan belum hari ini?" */}
              <div className="bg-white border border-emerald-200/80 p-3.5 rounded-3xl shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#EBF5ED] text-[#0D3B23] flex items-center justify-center font-black">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                      "Udah di-Vera-kan hari ini?"
                      <span className="w-2 h-2 rounded-full bg-lime-500 animate-ping"></span>
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Data transaksi Anda siap untuk verifikasi bank!
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('pos')}
                  className="px-3 py-1.5 bg-[#0D3B23] text-lime-300 text-xs font-bold rounded-xl shadow-xs hover:bg-emerald-900 transition"
                >
                  Catat
                </button>
              </div>

              {/* Hero Deep Green Card with Circular Gauge (Inspired by Image 1 & 3) */}
              <div className="bg-[#0D3B23] text-white rounded-[32px] p-5 shadow-xl relative overflow-hidden">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-lime-400 text-slate-950 px-2.5 py-1 rounded-full">
                      ★ Skor VERA Lapak
                    </span>
                    <h3 className="text-xl font-black mt-2 tracking-tight">
                      Tier {merchant.score.tier}
                    </h3>
                    <p className="text-xs text-emerald-200/90 mt-0.5">
                      TOP 5% Pedagang Hijau Jambu Dua
                    </p>
                  </div>

                  {/* Circular Donut Gauge Progress Ring */}
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-emerald-900"
                        strokeWidth="3.8"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-lime-400 transition-all duration-1000 ease-out"
                        strokeDasharray={`${merchant.score.total}, 100`}
                        strokeWidth="3.8"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xl font-black text-white">{merchant.score.total}</span>
                      <span className="text-[8px] font-bold text-lime-300">/ 100</span>
                    </div>
                  </div>
                </div>

                {/* Score Breakdown Pills */}
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-emerald-800/80 text-center text-xs">
                  <div className="bg-emerald-950/60 p-2 rounded-2xl border border-emerald-800/50">
                    <span className="text-[9px] text-emerald-300 font-semibold block">Finansial</span>
                    <span className="font-extrabold text-white text-xs">{merchant.score.financialScore}%</span>
                  </div>
                  <div className="bg-emerald-950/60 p-2 rounded-2xl border border-emerald-800/50">
                    <span className="text-[9px] text-lime-300 font-semibold block">Aksi Hijau</span>
                    <span className="font-extrabold text-lime-400 text-xs">{merchant.score.greenScore}%</span>
                  </div>
                  <div className="bg-emerald-950/60 p-2 rounded-2xl border border-emerald-800/50">
                    <span className="text-[9px] text-emerald-300 font-semibold block">Digital</span>
                    <span className="font-extrabold text-white text-xs">{merchant.score.digitalScore}%</span>
                  </div>
                </div>

                {/* Claim Promo Button */}
                <button
                  onClick={() => setActiveTab('kur')}
                  className="w-full mt-3.5 py-2.5 bg-lime-400 hover:bg-lime-300 text-[#0D3B23] text-xs font-black rounded-2xl flex items-center justify-center gap-1.5 transition shadow-md shadow-lime-950/30"
                >
                  <Coins className="w-4 h-4" />
                  <span>Klaim Bunga Subsidi KUR Hijau (3%)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Total Kontribusimu Hari Ini (Inspired by Image 3) */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                    Total Kontribusimu Hari Ini
                  </h4>
                  <span className="text-[10px] text-emerald-700 font-bold">Pasar Jambu Dua</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {/* Card 1: Omzet */}
                  <div className="bg-white border border-emerald-100 p-3 rounded-2xl shadow-xs text-center">
                    <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-1.5">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] text-slate-500 font-semibold block">Omzet POS</span>
                    <p className="text-xs font-extrabold text-slate-900 mt-0.5">
                      Rp {(todayRevenue / 1000).toFixed(0)}rb
                    </p>
                  </div>

                  {/* Card 2: Sampah Terpilah */}
                  <div className="bg-white border border-emerald-100 p-3 rounded-2xl shadow-xs text-center">
                    <div className="w-7 h-7 rounded-xl bg-lime-100 text-[#0D3B23] flex items-center justify-center mx-auto mb-1.5">
                      <Scale className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] text-slate-500 font-semibold block">Sampah Hijau</span>
                    <p className="text-xs font-extrabold text-emerald-700 mt-0.5">
                      {merchant.organicWasteKgMonth} kg
                    </p>
                  </div>

                  {/* Card 3: Untung SAK EMKM */}
                  <div className="bg-white border border-emerald-100 p-3 rounded-2xl shadow-xs text-center">
                    <div className="w-7 h-7 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-1.5">
                      <Receipt className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] text-slate-500 font-semibold block">Laba Bersih</span>
                    <p className="text-xs font-extrabold text-blue-800 mt-0.5">
                      Rp {(netProfit / 1000).toFixed(0)}rb
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Action Navigation Grid (Inspired by Image 2) */}
              <div className="grid grid-cols-4 gap-2 pt-1">
                <button
                  onClick={() => setActiveTab('pos')}
                  className="p-3 bg-white hover:bg-emerald-50/60 border border-slate-200/80 rounded-2xl flex flex-col items-center gap-1 transition text-center shadow-xs"
                >
                  <div className="p-2 rounded-xl bg-lime-100 text-[#0D3B23]">
                    <QrCode className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800">Kasir POS</span>
                </button>

                <button
                  onClick={() => setActiveTab('green')}
                  className="p-3 bg-white hover:bg-emerald-50/60 border border-slate-200/80 rounded-2xl flex flex-col items-center gap-1 transition text-center shadow-xs"
                >
                  <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800">Aksi Hijau</span>
                </button>

                <button
                  onClick={() => setActiveTab('sak_emkm')}
                  className="p-3 bg-white hover:bg-emerald-50/60 border border-slate-200/80 rounded-2xl flex flex-col items-center gap-1 transition text-center shadow-xs"
                >
                  <div className="p-2 rounded-xl bg-blue-100 text-blue-800">
                    <Receipt className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800">Buku Kas</span>
                </button>

                <button
                  onClick={() => setActiveTab('kur')}
                  className="p-3 bg-white hover:bg-emerald-50/60 border border-slate-200/80 rounded-2xl flex flex-col items-center gap-1 transition text-center shadow-xs"
                >
                  <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                    <Building className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800">KUR Hijau</span>
                </button>
              </div>

              {/* Recent Transactions List */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-4 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    Transaksi Kasir Terakhir
                  </h4>
                  <button
                    onClick={() => setActiveTab('sak_emkm')}
                    className="text-[11px] text-emerald-700 font-bold hover:underline"
                  >
                    Lihat Semua
                  </button>
                </div>

                <div className="space-y-2">
                  {transactions.slice(0, 3).map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between p-2.5 rounded-2xl bg-[#F8FAF8] border border-slate-100 text-xs"
                    >
                      <div>
                        <p className="font-bold text-slate-900">
                          {tx.items[0]?.name}
                          {tx.items.length > 1 && ` (+${tx.items.length - 1} item)`}
                        </p>
                        <span className="text-[10px] text-slate-500">
                          {tx.time} • <strong className="uppercase">{tx.paymentMethod}</strong>
                        </span>
                      </div>
                      <div className="text-right">
                        <span
                          className={`font-black ${
                            tx.total > 0 ? 'text-emerald-700' : 'text-rose-600'
                          }`}
                        >
                          {tx.total > 0 ? '+' : ''}Rp {Math.abs(tx.total).toLocaleString('id-ID')}
                        </span>
                        <div className="flex items-center justify-end gap-1 text-[9px] text-emerald-600 font-bold">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          <span>Di-Vera-kan</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: KASIR DIGITAL (POS) */}
          {activeTab === 'pos' && (
            <div className="space-y-3.5 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-slate-900">Kasir Cepat Pasar</h3>
                  <p className="text-[11px] text-slate-500">Ketik nominal langsung atau pilih komoditas</p>
                </div>
                {cart.length > 0 && (
                  <button
                    onClick={() => setCart([])}
                    className="text-[11px] text-rose-600 font-bold hover:underline"
                  >
                    Kosongkan Keranjang
                  </button>
                )}
              </div>

              {/* Numpad Input Box */}
              <div className="bg-white border-2 border-emerald-200 rounded-3xl p-3.5 space-y-2 shadow-xs">
                <span className="text-[10px] font-extrabold text-slate-600 uppercase tracking-wide">
                  Input Cepat Manual (Numpad)
                </span>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-bold">Rp</span>
                    <input
                      type="number"
                      placeholder="Contoh: 25000"
                      value={manualAmount}
                      onChange={(e) => setManualAmount(e.target.value)}
                      className="w-full bg-[#F4F7F4] border border-slate-200 rounded-2xl pl-9 pr-3 py-2 text-sm text-slate-900 font-extrabold outline-none focus:border-emerald-500"
                    />
                  </div>
                  <button
                    onClick={() => {
                      if (manualAmount) {
                        setIsCheckoutOpen(true);
                      }
                    }}
                    disabled={!manualAmount}
                    className="px-4 py-2 bg-[#0D3B23] hover:bg-emerald-900 disabled:opacity-40 text-lime-300 text-xs font-black rounded-2xl transition shadow-xs"
                  >
                    Bayar
                  </button>
                </div>
              </div>

              {/* Category Filter Pills (Inspired by Image 1 & 2) */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs">
                {(['Semua', 'Sayur', 'Bumbu', 'Sembako'] as ProductCategory[]).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition ${
                      selectedCategory === cat
                        ? 'bg-[#0D3B23] text-lime-300 shadow-xs'
                        : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                {filteredProducts.map((p) => {
                  const cartItem = cart.find(i => i.product.id === p.id);
                  return (
                    <div
                      key={p.id}
                      className="bg-white border border-slate-200/90 hover:border-emerald-400 p-3 rounded-3xl flex flex-col justify-between transition shadow-xs"
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-3xl">{p.emoji}</span>
                        <span className="text-[10px] text-slate-500 font-semibold bg-[#F4F7F4] px-2 py-0.5 rounded-full">
                          stok {p.stock}
                        </span>
                      </div>

                      <div className="my-2.5">
                        <p className="text-xs font-bold text-slate-900 line-clamp-1">{p.name}</p>
                        <p className="text-xs text-emerald-700 font-extrabold mt-0.5">
                          Rp {p.price.toLocaleString('id-ID')}
                          <span className="text-slate-400 text-[10px] font-normal">/{p.unit}</span>
                        </p>
                      </div>

                      {cartItem ? (
                        <div className="flex items-center justify-between bg-[#F4F7F4] rounded-2xl p-1 border border-emerald-300">
                          <button
                            onClick={() => removeFromCart(p.id)}
                            className="p-1 hover:bg-white rounded-xl text-rose-600"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-black text-slate-900 px-2">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() => addToCart(p)}
                            className="p-1 hover:bg-white rounded-xl text-emerald-700"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(p)}
                          className="w-full py-2 bg-[#F4F7F4] hover:bg-[#0D3B23] hover:text-white text-slate-700 text-xs font-bold rounded-2xl flex items-center justify-center gap-1 transition"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Pilih</span>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Floating Bottom Cart Bar */}
              {cart.length > 0 && (
                <div className="sticky bottom-0 bg-white/95 backdrop-blur border border-emerald-200 p-3.5 rounded-3xl shadow-xl flex items-center justify-between mt-3">
                  <div>
                    <span className="text-[10px] text-slate-500 font-medium">Total {cart.reduce((s, i) => s + i.quantity, 0)} Item</span>
                    <p className="text-base font-black text-[#0D3B23]">
                      Rp {cartTotal.toLocaleString('id-ID')}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsCheckoutOpen(true)}
                    className="px-5 py-2.5 bg-lime-400 hover:bg-lime-300 text-[#0D3B23] text-xs font-black rounded-2xl shadow-md transition flex items-center gap-1.5"
                  >
                    <span>Lanjut Bayar</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SAK EMKM FINANCIAL REPORT */}
          {activeTab === 'sak_emkm' && (
            <div className="space-y-3.5 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-slate-900">Pembukuan SAK EMKM</h3>
                  <p className="text-[11px] text-slate-500">Standar Akuntansi Resmi untuk Usaha Mikro</p>
                </div>
                <button
                  onClick={() => setIsExpenseModalOpen(true)}
                  className="px-3 py-1.5 bg-rose-50 text-rose-700 border border-rose-200 rounded-2xl text-xs font-bold hover:bg-rose-100 transition flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Catat Beban</span>
                </button>
              </div>

              {/* Laporan Laba Rugi Sederhana */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-4 space-y-3 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <span className="text-xs font-black text-slate-800">
                    Laporan Laba Rugi Hari Ini
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                    SAK-EMKM
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-600">
                    <span>1. Penjualan Masuk (Omzet)</span>
                    <span className="font-extrabold text-slate-900">
                      Rp {todayRevenue.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-slate-500">
                    <span>2. Beban Kulakan (HPP Est. 58%)</span>
                    <span className="font-medium text-slate-600">
                      -Rp {(todayRevenue - grossProfit).toLocaleString('id-ID')}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-t border-slate-100 font-bold text-slate-800">
                    <span>Laba Kotor</span>
                    <span className="text-emerald-700">
                      Rp {grossProfit.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-slate-500">
                    <span>3. Beban Operasional (Es & Retribusi)</span>
                    <span className="font-medium text-rose-600">
                      -Rp {todayExpenses.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t-2 border-slate-100 font-black text-sm">
                    <span className="text-slate-900">Uang Untung Bersih</span>
                    <span className="text-emerald-700 text-base">
                      Rp {netProfit.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                <div className="bg-[#F4F7F4] p-3 rounded-2xl border border-emerald-100 text-[11px] text-slate-600 flex items-center justify-between">
                  <span>Margin Keuntungan:</span>
                  <span className="text-emerald-700 font-extrabold">
                    {todayRevenue > 0 ? Math.round((netProfit / todayRevenue) * 100) : 0}% (Sangat Sehat)
                  </span>
                </div>
              </div>

              {/* Posisi Keuangan Ringkas */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-4 space-y-2.5 text-xs shadow-xs">
                <h4 className="font-black text-slate-900">Posisi Keuangan Lapak</h4>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-[#F8FAF8] p-2.5 rounded-2xl border border-slate-100">
                    <span className="text-slate-500">Kas & Rekening:</span>
                    <p className="font-extrabold text-slate-900 text-xs mt-0.5">Rp 12.450.000</p>
                  </div>
                  <div className="bg-[#F8FAF8] p-2.5 rounded-2xl border border-slate-100">
                    <span className="text-slate-500">Persediaan Stok:</span>
                    <p className="font-extrabold text-slate-900 text-xs mt-0.5">Rp 3.800.000</p>
                  </div>
                  <div className="bg-[#F8FAF8] p-2.5 rounded-2xl border border-slate-100">
                    <span className="text-slate-500">Utang Kulakan:</span>
                    <p className="font-extrabold text-emerald-700 text-xs mt-0.5">Rp 0 (Lunas)</p>
                  </div>
                  <div className="bg-[#F8FAF8] p-2.5 rounded-2xl border border-slate-100">
                    <span className="text-slate-500">Rasio DSCR Bank:</span>
                    <p className="font-extrabold text-amber-700 text-xs mt-0.5">{merchant.score.dscrRatio}x (Aman)</p>
                  </div>
                </div>
              </div>

              {/* Histori Transaksi Lengkap */}
              <div className="space-y-2">
                <span className="text-xs font-black text-slate-800">Buku Kas Harian Terverifikasi</span>
                {transactions.map((t) => (
                  <div
                    key={t.id}
                    className="p-3 bg-white border border-slate-200/90 rounded-2xl flex items-center justify-between text-xs shadow-xs"
                  >
                    <div>
                      <p className="font-bold text-slate-900">{t.items[0]?.name}</p>
                      <p className="text-[10px] text-slate-500">{t.invoiceNo} • {t.time}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-black ${t.total > 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                        {t.total > 0 ? '+' : ''}Rp {Math.abs(t.total).toLocaleString('id-ID')}
                      </p>
                      <span className="text-[9px] text-slate-500 uppercase font-semibold">{t.paymentMethod}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: AKSI HIJAU (GREEN LOGGER) */}
          {activeTab === 'green' && (
            <div className="space-y-3.5 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-slate-900">Misi Pasar Bersih</h3>
                  <p className="text-[11px] text-emerald-700 font-semibold">Tukar aksi hijau jadi poin bunga murah!</p>
                </div>
                <button
                  onClick={() => setIsGreenModalOpen(true)}
                  className="px-3.5 py-1.5 bg-[#0D3B23] hover:bg-emerald-900 text-lime-300 rounded-2xl text-xs font-bold transition flex items-center gap-1 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Catat Aksi</span>
                </button>
              </div>

              {/* Impact Banner */}
              <div className="bg-gradient-to-br from-[#0D3B23] to-[#124b2d] text-white p-5 rounded-[32px] space-y-2 shadow-lg">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-xl bg-lime-400 text-[#0D3B23]">
                    <Leaf className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-bold text-emerald-100">Dampak Hijau Lapak Bu Siti</span>
                </div>
                <p className="text-3xl font-black text-lime-400">
                  {merchant.organicWasteKgMonth} <span className="text-sm font-normal text-white">kg sampah</span>
                </p>
                <p className="text-[11px] text-emerald-100/90 leading-relaxed">
                  Teralihkan dari TPA Galuga ke Rumah Kompos Pasar Jambu Dua. Nilai keberlanjutan Anda mendongkrak skor kredit <strong>+18%</strong>!
                </p>
              </div>

              {/* Green Action Checklist */}
              <div className="space-y-2.5">
                <span className="text-xs font-black text-slate-800">Validasi Fasilitator Lapangan</span>
                {greenActions.map((ga) => (
                  <div
                    key={ga.id}
                    className="p-3.5 bg-white border border-slate-200/90 rounded-2xl space-y-2 shadow-xs"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{ga.title}</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">{ga.description}</p>
                      </div>
                      <span className="text-xs font-extrabold text-emerald-800 bg-lime-100 border border-lime-300 px-2 py-0.5 rounded-xl whitespace-nowrap">
                        +{ga.impactPoints} Poin
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px]">
                      <span className="text-slate-500">{ga.timestamp}</span>
                      <span
                        className={`font-bold px-2 py-0.5 rounded-full ${
                          ga.status === 'verified'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {ga.status === 'verified' ? '✓ Diverifikasi Fasilitator' : '⏳ Menunggu Timbang'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: KUR HIJAU (BANKABILITY & LOAN SIMULATOR) */}
          {activeTab === 'kur' && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <h3 className="text-sm font-black text-slate-900">Akses KUR Mikro Hijau</h3>
                <p className="text-[11px] text-slate-500">Pembiayaan bersubsidi langsung ke Bank Mitra</p>
              </div>

              {/* Bankability Status Card */}
              <div className="bg-white border-2 border-emerald-300 rounded-[32px] p-4 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Kesiapan Kredit Bank
                  </span>
                  <span className="text-[10px] bg-lime-300 text-slate-950 font-black px-2.5 py-0.5 rounded-full">
                    BANKABLE ✓
                  </span>
                </div>

                <div>
                  <span className="text-xs text-slate-500">Plafon Maksimal Rekomendasi VERA:</span>
                  <p className="text-2xl font-black text-[#0D3B23] mt-0.5">
                    Rp {merchant.score.eligiblePlafon.toLocaleString('id-ID')}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
                  <div className="bg-[#F8FAF8] p-2.5 rounded-2xl">
                    <span className="text-[10px] text-slate-500">Suku Bunga Khusus:</span>
                    <p className="text-xs font-black text-emerald-700 mt-0.5">
                      {merchant.score.interestRatePromo}% eff. p.a.
                    </p>
                    <span className="text-[9px] text-slate-400 font-semibold">(Normal 6%)</span>
                  </div>
                  <div className="bg-[#F8FAF8] p-2.5 rounded-2xl">
                    <span className="text-[10px] text-slate-500">Kemampuan Bayar:</span>
                    <p className="text-xs font-black text-blue-700 mt-0.5">
                      DSCR {merchant.score.dscrRatio}x (Aman)
                    </p>
                  </div>
                </div>
              </div>

              {/* Loan Simulation Form */}
              <div className="bg-white border border-slate-200/90 rounded-[32px] p-4 space-y-3 shadow-xs">
                <h4 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                  <Coins className="w-4 h-4 text-amber-500" />
                  Simulasi Pengajuan Pinjaman
                </h4>

                <div>
                  <div className="flex justify-between text-xs text-slate-600 mb-1">
                    <span>Jumlah Pengajuan:</span>
                    <span className="font-black text-[#0D3B23]">
                      Rp {loanPlafon.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5000000"
                    max={merchant.score.eligiblePlafon}
                    step="5000000"
                    value={loanPlafon}
                    onChange={(e) => setLoanPlafon(parseInt(e.target.value))}
                    className="w-full accent-emerald-600 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                    <span>Rp 5 Juta</span>
                    <span>Rp {merchant.score.eligiblePlafon / 1000000} Juta</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-600 font-bold block mb-1">Pilihan Tenor:</label>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {[12, 18, 24].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setLoanTenor(t)}
                        className={`py-2 rounded-2xl font-black transition ${
                          loanTenor === t
                            ? 'bg-[#0D3B23] text-lime-300 shadow-xs'
                            : 'bg-[#F4F7F4] text-slate-600 border border-slate-200'
                        }`}
                      >
                        {t} Bulan
                      </button>
                    ))}
                  </div>
                </div>

                {/* Monthly Installment Calculation */}
                <div className="bg-[#F8FAF8] p-3 rounded-2xl border border-slate-200 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 font-medium">Estimasi Cicilan per Bulan:</span>
                    <p className="text-base font-black text-slate-900 mt-0.5">
                      Rp {Math.round((loanPlafon / loanTenor) + (loanPlafon * 0.03 / 12)).toLocaleString('id-ID')}
                    </p>
                  </div>
                  <span className="text-[10px] font-black text-emerald-800 bg-lime-200 px-2.5 py-1 rounded-full">
                    Bunga Subsidi 3%
                  </span>
                </div>

                {loanSuccessMessage ? (
                  <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-2xl text-center space-y-1">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                    <p className="text-xs font-black text-slate-900">Pengajuan Terkirim ke Analis Bank!</p>
                    <p className="text-[11px] text-slate-600">
                      Analis Bank BSI & BRI sedang mengecek data SAK EMKM Anda di portal bank.
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={handleApplyLoan}
                    className="w-full py-3 bg-[#0D3B23] hover:bg-emerald-900 text-lime-300 text-xs font-black rounded-2xl transition shadow-lg flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-4 h-4" />
                    <span>Kirim Pengajuan ke Analis Bank</span>
                  </button>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Floating Capsule Bottom Dock (Inspired by Image 2 & 3) */}
        <div className="absolute bottom-3 inset-x-3 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-full py-1.5 px-2 flex items-center justify-around shadow-lg z-20">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex items-center gap-1 py-1.5 px-3 rounded-full transition ${
              activeTab === 'home'
                ? 'bg-[#0D3B23] text-lime-300 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Store className="w-4 h-4" />
            {activeTab === 'home' && <span className="text-xs font-black">Beranda</span>}
          </button>

          <button
            onClick={() => setActiveTab('pos')}
            className={`flex items-center gap-1 py-1.5 px-3 rounded-full transition ${
              activeTab === 'pos'
                ? 'bg-[#0D3B23] text-lime-300 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <QrCode className="w-4 h-4" />
            {activeTab === 'pos' && <span className="text-xs font-black">Kasir</span>}
          </button>

          <button
            onClick={() => setActiveTab('sak_emkm')}
            className={`flex items-center gap-1 py-1.5 px-3 rounded-full transition ${
              activeTab === 'sak_emkm'
                ? 'bg-[#0D3B23] text-lime-300 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Receipt className="w-4 h-4" />
            {activeTab === 'sak_emkm' && <span className="text-xs font-black">Buku Kas</span>}
          </button>

          <button
            onClick={() => setActiveTab('green')}
            className={`flex items-center gap-1 py-1.5 px-3 rounded-full transition ${
              activeTab === 'green'
                ? 'bg-[#0D3B23] text-lime-300 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Leaf className="w-4 h-4" />
            {activeTab === 'green' && <span className="text-xs font-black">Aksi Hijau</span>}
          </button>

          <button
            onClick={() => setActiveTab('kur')}
            className={`flex items-center gap-1 py-1.5 px-3 rounded-full transition ${
              activeTab === 'kur'
                ? 'bg-[#0D3B23] text-lime-300 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Building className="w-4 h-4" />
            {activeTab === 'kur' && <span className="text-xs font-black">KUR Hijau</span>}
          </button>
        </div>

      </div>

      {/* MODAL CHECKOUT & QRIS SIMULATOR */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-white border border-emerald-200 rounded-[36px] p-5 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="font-black text-slate-900 text-base">Pembayaran & Di-Vera-kan</h3>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="text-slate-400 hover:text-slate-800 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="bg-[#F4F7F4] p-4 rounded-3xl border border-emerald-100 text-center">
              <span className="text-xs text-slate-500 font-semibold">Total Pembayaran:</span>
              <p className="text-2xl font-black text-[#0D3B23] mt-0.5">
                Rp {(cart.length > 0 ? cartTotal : parseInt(manualAmount || '0')).toLocaleString('id-ID')}
              </p>
            </div>

            {/* Payment Method Switch */}
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <button
                onClick={() => setPaymentMethod('qris')}
                className={`p-3 rounded-2xl border flex flex-col items-center gap-1 transition ${
                  paymentMethod === 'qris'
                    ? 'bg-[#0D3B23] text-lime-300 border-[#0D3B23]'
                    : 'bg-[#F8FAF8] border-slate-200 text-slate-600'
                }`}
              >
                <QrCode className="w-5 h-5" />
                <span>QRIS Dinamis</span>
              </button>

              <button
                onClick={() => setPaymentMethod('tunai')}
                className={`p-3 rounded-2xl border flex flex-col items-center gap-1 transition ${
                  paymentMethod === 'tunai'
                    ? 'bg-[#0D3B23] text-lime-300 border-[#0D3B23]'
                    : 'bg-[#F8FAF8] border-slate-200 text-slate-600'
                }`}
              >
                <Wallet className="w-5 h-5" />
                <span>Uang Tunai</span>
              </button>
            </div>

            {/* QRIS Code Mockup */}
            {paymentMethod === 'qris' ? (
              <div className="bg-[#FAFCFA] border-2 border-slate-900 p-4 rounded-3xl text-center space-y-2 shadow-xs">
                <div className="flex items-center justify-between text-slate-900 text-[10px] font-extrabold border-b pb-1">
                  <span>QRIS STANDAR NASIONAL</span>
                  <span className="text-emerald-700 font-black">VERA PAY</span>
                </div>
                {/* Simulated QR Code Canvas */}
                <div className="w-36 h-36 mx-auto bg-white border-2 border-slate-900 p-2 flex items-center justify-center rounded-2xl">
                  <div className="grid grid-cols-6 gap-1 w-full h-full">
                    {Array.from({ length: 36 }).map((_, i) => (
                      <div
                        key={i}
                        className={`rounded-xs ${
                          (i % 2 === 0 || i % 7 === 0) ? 'bg-slate-900' : 'bg-transparent'
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
                <p className="text-[11px] font-bold text-slate-900">
                  {merchant.stallName} • {merchant.qrisId}
                </p>
              </div>
            ) : (
              <div className="p-3.5 bg-[#F8FAF8] border border-slate-200 rounded-2xl text-xs text-slate-600 text-center font-medium">
                Terima uang tunai fisik dari pembeli, simpan di laci kasir, lalu klik konfirmasi di bawah.
              </div>
            )}

            <button
              onClick={handleCheckout}
              className="w-full py-3 bg-[#0D3B23] hover:bg-emerald-900 text-lime-300 font-black text-sm rounded-2xl shadow-lg transition"
            >
              ✓ Konfirmasi Sudah Bayar & Di-Vera-kan
            </button>
          </div>
        </div>
      )}

      {/* MODAL STRUK DIGITAL / NOTA WA */}
      {lastCompletedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-white border border-emerald-200 rounded-[36px] p-5 space-y-3.5 shadow-2xl">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 bg-lime-100 text-[#0D3B23] rounded-full flex items-center justify-center mx-auto border-2 border-lime-300">
                <CheckCircle2 className="w-7 h-7 text-[#0D3B23]" />
              </div>
              <h3 className="font-black text-slate-900 text-base">Transaksi Berhasil Di-Vera-kan!</h3>
              <p className="text-xs text-emerald-700 font-bold">Otomatis masuk Laporan SAK EMKM & Skor Hijau</p>
            </div>

            <div className="bg-[#F8FAF8] p-3.5 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>No. Nota:</span>
                <span className="font-mono text-slate-900 font-bold">{lastCompletedTx.invoiceNo}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Waktu:</span>
                <span className="text-slate-800 font-medium">{lastCompletedTx.time}</span>
              </div>
              <div className="border-t border-slate-200 pt-2 space-y-1">
                {lastCompletedTx.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span className="text-slate-700">{it.name} x{it.quantity}</span>
                    <span className="text-slate-900 font-bold">Rp {it.subtotal.toLocaleString('id-ID')}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-200 pt-2 flex justify-between font-black text-sm">
                <span className="text-slate-900">Total:</span>
                <span className="text-emerald-700">Rp {lastCompletedTx.total.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setLastCompletedTx(null)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-2xl"
              >
                Selesai
              </button>
              <button
                onClick={() => {
                  alert(`Struk VERA terkirim via WhatsApp!\n\nNota: ${lastCompletedTx.invoiceNo}\nTotal: Rp ${lastCompletedTx.total.toLocaleString('id-ID')}\nTerima kasih telah berbelanja ramah lingkungan di ${merchant.stallName}`);
                  setLastCompletedTx(null);
                }}
                className="flex-1 py-2.5 bg-[#0D3B23] hover:bg-emerald-900 text-lime-300 text-xs font-black rounded-2xl flex items-center justify-center gap-1.5 shadow-md"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Kirim WA</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL CATAT AKSI HIJAU */}
      {isGreenModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <form
            onSubmit={handleCreateGreenAction}
            className="w-full max-w-sm bg-white border border-emerald-200 rounded-[36px] p-5 space-y-3.5 shadow-2xl"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-black text-slate-900 text-sm flex items-center gap-1.5">
                <Leaf className="w-4 h-4 text-emerald-600" />
                Catat Aksi Pasar Bersih
              </h3>
              <button
                type="button"
                onClick={() => setIsGreenModalOpen(false)}
                className="text-slate-400 hover:text-slate-800 font-bold"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="text-xs text-slate-700 font-bold block mb-1">Jenis Aksi Hijau:</label>
              <select
                value={greenTitle}
                onChange={(e) => setGreenTitle(e.target.value)}
                className="w-full bg-[#F4F7F4] border border-slate-200 rounded-2xl px-3 py-2 text-xs text-slate-900 font-semibold outline-none focus:border-emerald-500"
              >
                <option value="Pilah Sampah Sayuran Organik">Pilah Sampah Sayuran (Rumah Kompos)</option>
                <option value="Penggunaan Besek Bambu & Daun">Gunakan Besek Bambu / Daun Pisang</option>
                <option value="Efisiensi Rantai Pasok Petani">Stok Langsung Petani (Anti Food Waste)</option>
                <option value="Setor Minyak Jelantah / Residu">Setor Residu ke Bank Sampah</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-700 font-bold block mb-1">Timbangan / Jumlah (Kg):</label>
              <input
                type="number"
                step="0.1"
                value={greenWeight}
                onChange={(e) => setGreenWeight(e.target.value)}
                className="w-full bg-[#F4F7F4] border border-slate-200 rounded-2xl px-3 py-2 text-xs text-slate-900 font-extrabold outline-none focus:border-emerald-500"
                placeholder="Misal 4.8"
                required
              />
            </div>

            <div>
              <label className="text-xs text-slate-700 font-bold block mb-1">Lokasi Setor / Catatan:</label>
              <input
                type="text"
                value={greenNote}
                onChange={(e) => setGreenNote(e.target.value)}
                className="w-full bg-[#F4F7F4] border border-slate-200 rounded-2xl px-3 py-2 text-xs text-slate-900 outline-none focus:border-emerald-500"
                placeholder="Misal: Ditimbang di pos pantau Blok A"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#0D3B23] hover:bg-emerald-900 text-lime-300 font-black text-xs rounded-2xl shadow-md"
            >
              Kirim ke Fasilitator & Tambah Poin VERA
            </button>
          </form>
        </div>
      )}

      {/* MODAL CATAT BEBAN SAK EMKM */}
      {isExpenseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <form
            onSubmit={handleAddExpense}
            className="w-full max-w-sm bg-white border border-rose-200 rounded-[36px] p-5 space-y-3.5 shadow-2xl"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-black text-slate-900 text-sm">Catat Beban Kulakan/Operasional</h3>
              <button
                type="button"
                onClick={() => setIsExpenseModalOpen(false)}
                className="text-slate-400 hover:text-slate-800 font-bold"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="text-xs text-slate-700 font-bold block mb-1">Nominal Beban (Rp):</label>
              <input
                type="number"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                className="w-full bg-[#F4F7F4] border border-slate-200 rounded-2xl px-3 py-2 text-xs text-slate-900 font-extrabold outline-none focus:border-rose-500"
                placeholder="Contoh: 35000"
                required
              />
            </div>

            <div>
              <label className="text-xs text-slate-700 font-bold block mb-1">Keterangan:</label>
              <input
                type="text"
                value={expenseDesc}
                onChange={(e) => setExpenseDesc(e.target.value)}
                className="w-full bg-[#F4F7F4] border border-slate-200 rounded-2xl px-3 py-2 text-xs text-slate-900 outline-none focus:border-rose-500"
                placeholder="Misal: Es batu pendingin atau retribusi"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-black text-xs rounded-2xl shadow-md"
            >
              Simpan ke Buku Kas SAK EMKM
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
