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
  BadgePercent,
  Coins,
  Scale,
  RefreshCw,
  Send,
  Building
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
  const [greenWeight, setGreenWeight] = useState('4.5');
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
      colors: ['#10b981', '#34d399', '#f59e0b']
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
        name: expenseDesc || 'Pengeluaran Operasional / Belanja Stok',
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
      weightKg: parseFloat(greenWeight) || 3.5
    });

    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.6 },
      colors: ['#10b981', '#22c55e']
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
      colors: ['#3b82f6', '#10b981', '#f59e0b']
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

  const grossProfit = Math.round(todayRevenue * 0.42); // Estimasi margin kotor pedagang pasar ~42%
  const netProfit = grossProfit - todayExpenses;

  const filteredProducts = selectedCategory === 'Semua'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="w-full flex justify-center py-4 px-2 sm:px-4">
      {/* Phone Mockup Frame */}
      <div className="relative w-full max-w-md bg-slate-950 rounded-[44px] border-[10px] border-slate-800 shadow-2xl shadow-emerald-950/40 overflow-hidden flex flex-col min-h-[820px] max-h-[920px]">
        
        {/* Phone Dynamic Island / Speaker Notch & Status Bar */}
        <div className="bg-slate-900/90 backdrop-blur px-6 pt-3 pb-2 flex items-center justify-between text-[11px] text-slate-300 select-none z-30 border-b border-slate-800/80">
          <span className="font-semibold tracking-tight">06:30 WIB</span>
          <div className="w-20 h-4 bg-slate-950 rounded-full flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 animate-pulse"></span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <span>5G</span>
            <span>100%</span>
          </div>
        </div>

        {/* Top App Header with VERA Metonymy Badge */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 px-4 py-3 border-b border-emerald-900/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src="/logo.jpg"
              alt="VERA"
              className="w-8 h-8 rounded-lg object-contain bg-slate-950 p-0.5 border border-emerald-500/40"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-white tracking-wide">VERA</span>
                <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded font-medium border border-emerald-500/30">
                  Pedagang
                </span>
              </div>
              <p className="text-[10px] text-slate-400 truncate max-w-[170px]">
                {merchant.stallName}
              </p>
            </div>
          </div>

          <button
            onClick={onOpenVeraAssistant}
            className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition"
          >
            <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
            <span>Tanya VERA</span>
          </button>
        </div>

        {/* Scrollable Main Content Area */}
        <div className="flex-1 overflow-y-auto pb-24 p-4 space-y-4">
          
          {/* TAB 1: BERANDA */}
          {activeTab === 'home' && (
            <div className="space-y-4 animate-fade-in">
              {/* Daily Metonymy Alert */}
              <div className="bg-gradient-to-r from-emerald-950/70 via-slate-900 to-slate-900 border border-emerald-500/40 p-3.5 rounded-2xl shadow-sm relative overflow-hidden">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                      "Udah di-Vera-kan transaksi hari ini?"
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    </h4>
                    <p className="text-[11px] text-emerald-300/90 mt-0.5">
                      Data Anda terverifikasi SAK EMKM dan langsung membangun skor KUR Hijau bank!
                    </p>
                  </div>
                </div>
              </div>

              {/* Green Credit Score Card */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Green Credit Score
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                    ★ Tier {merchant.score.tier}
                  </span>
                </div>

                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-extrabold text-white tracking-tight">
                    {merchant.score.total}
                  </span>
                  <span className="text-sm font-semibold text-slate-400">/ 100</span>
                  <span className="text-xs font-semibold text-emerald-400 ml-auto bg-emerald-950/80 px-2 py-1 rounded-lg border border-emerald-500/30">
                    Bankable Ready ✓
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden mb-3">
                  <div
                    className="bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 h-full rounded-full transition-all duration-700"
                    style={{ width: `${merchant.score.total}%` }}
                  ></div>
                </div>

                {/* Score Pillars */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-center">
                  <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800/50">
                    <p className="text-[10px] text-slate-400">Finansial (50%)</p>
                    <p className="text-xs font-bold text-white mt-0.5">{merchant.score.financialScore}%</p>
                  </div>
                  <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800/50">
                    <p className="text-[10px] text-slate-400">Aksi Hijau (30%)</p>
                    <p className="text-xs font-bold text-emerald-400 mt-0.5">{merchant.score.greenScore}%</p>
                  </div>
                  <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800/50">
                    <p className="text-[10px] text-slate-400">Digital (20%)</p>
                    <p className="text-xs font-bold text-blue-400 mt-0.5">{merchant.score.digitalScore}%</p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('kur')}
                  className="w-full mt-3 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition shadow-md shadow-emerald-950"
                >
                  <Coins className="w-3.5 h-3.5" />
                  <span>Klaim Bunga Subsidi KUR Hijau (3%)</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Financial Snapshot */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-2xl">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Omzet Hari Ini</span>
                  </div>
                  <p className="text-lg font-bold text-white">
                    Rp {todayRevenue.toLocaleString('id-ID')}
                  </p>
                  <span className="text-[10px] text-emerald-400">
                    {transactions.filter(t => t.total > 0).length} transaksi dicatat
                  </span>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-2xl">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                    <Scale className="w-3.5 h-3.5 text-amber-400" />
                    <span>Sampah Terpilah</span>
                  </div>
                  <p className="text-lg font-bold text-white">
                    {merchant.organicWasteKgMonth} <span className="text-xs font-normal text-slate-400">kg</span>
                  </p>
                  <span className="text-[10px] text-amber-400">
                    Zero Waste Jambu 2
                  </span>
                </div>
              </div>

              {/* Quick Action Shortcuts */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setActiveTab('pos')}
                  className="p-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-2xl flex flex-col items-center gap-1.5 transition text-center group"
                >
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium text-slate-200">Kasir Cepat</span>
                </button>

                <button
                  onClick={() => setActiveTab('green')}
                  className="p-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-2xl flex flex-col items-center gap-1.5 transition text-center group"
                >
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium text-slate-200">Aksi Hijau</span>
                </button>

                <button
                  onClick={() => setActiveTab('sak_emkm')}
                  className="p-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-2xl flex flex-col items-center gap-1.5 transition text-center group"
                >
                  <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition">
                    <Receipt className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium text-slate-200">SAK EMKM</span>
                </button>
              </div>

              {/* Recent Transactions List */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    Transaksi Terakhir
                  </h4>
                  <button
                    onClick={() => setActiveTab('sak_emkm')}
                    className="text-[11px] text-emerald-400 hover:underline"
                  >
                    Lihat Semua
                  </button>
                </div>

                <div className="space-y-2">
                  {transactions.slice(0, 3).map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between p-2 rounded-xl bg-slate-950/60 border border-slate-800/70 text-xs"
                    >
                      <div>
                        <p className="font-semibold text-white">
                          {tx.items[0]?.name}
                          {tx.items.length > 1 && ` (+${tx.items.length - 1} item)`}
                        </p>
                        <span className="text-[10px] text-slate-400">
                          {tx.time} • {tx.paymentMethod.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-right">
                        <span
                          className={`font-bold ${
                            tx.total > 0 ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {tx.total > 0 ? '+' : ''}Rp {Math.abs(tx.total).toLocaleString('id-ID')}
                        </span>
                        <div className="flex items-center justify-end gap-1 text-[9px] text-emerald-400">
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
            <div className="space-y-3 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Kasir Cepat Pasar</h3>
                  <p className="text-[11px] text-slate-400">Ketik harga langsung atau pilih komoditas</p>
                </div>
                {cart.length > 0 && (
                  <button
                    onClick={() => setCart([])}
                    className="text-[11px] text-rose-400 hover:underline"
                  >
                    Kosongkan
                  </button>
                )}
              </div>

              {/* Manual Input Numpad Box */}
              <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-3 space-y-2">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
                  Input Cepat Manual (Numpad)
                </span>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-semibold">Rp</span>
                    <input
                      type="number"
                      placeholder="Contoh: 25000"
                      value={manualAmount}
                      onChange={(e) => setManualAmount(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-sm text-white font-bold outline-none focus:border-emerald-500"
                    />
                  </div>
                  <button
                    onClick={() => {
                      if (manualAmount) {
                        setIsCheckoutOpen(true);
                      }
                    }}
                    disabled={!manualAmount}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-xs font-bold rounded-xl transition"
                  >
                    Bayar
                  </button>
                </div>
              </div>

              {/* Commodity Categories */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs">
                {(['Semua', 'Sayur', 'Bumbu', 'Sembako'] as ProductCategory[]).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition ${
                      selectedCategory === cat
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
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
                      className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 p-2.5 rounded-2xl flex flex-col justify-between transition"
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-2xl">{p.emoji}</span>
                        <span className="text-[10px] text-slate-400 font-medium bg-slate-950 px-1.5 py-0.5 rounded">
                          stok {p.stock}
                        </span>
                      </div>

                      <div className="my-2">
                        <p className="text-xs font-bold text-white line-clamp-1">{p.name}</p>
                        <p className="text-[11px] text-emerald-400 font-semibold">
                          Rp {p.price.toLocaleString('id-ID')}
                          <span className="text-slate-400 text-[10px]">/{p.unit}</span>
                        </p>
                      </div>

                      {cartItem ? (
                        <div className="flex items-center justify-between bg-slate-950 rounded-xl p-1 border border-emerald-500/40">
                          <button
                            onClick={() => removeFromCart(p.id)}
                            className="p-1 hover:bg-slate-800 rounded text-rose-400"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-bold text-white px-2">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() => addToCart(p)}
                            className="p-1 hover:bg-slate-800 rounded text-emerald-400"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(p)}
                          className="w-full py-1.5 bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-300 text-xs font-medium rounded-xl flex items-center justify-center gap-1 transition"
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
                <div className="sticky bottom-0 bg-slate-900/95 backdrop-blur border border-emerald-500/40 p-3 rounded-2xl shadow-xl flex items-center justify-between mt-3">
                  <div>
                    <span className="text-[10px] text-slate-400">Total {cart.reduce((s, i) => s + i.quantity, 0)} Item</span>
                    <p className="text-base font-bold text-emerald-400">
                      Rp {cartTotal.toLocaleString('id-ID')}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsCheckoutOpen(true)}
                    className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-950 transition flex items-center gap-1.5"
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
                  <h3 className="text-sm font-bold text-white">Pembukuan SAK EMKM</h3>
                  <p className="text-[11px] text-slate-400">Standar Akuntansi Keuangan Entitas Mikro</p>
                </div>
                <button
                  onClick={() => setIsExpenseModalOpen(true)}
                  className="px-2.5 py-1.5 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-semibold hover:bg-rose-500/30 transition flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Catat Beban</span>
                </button>
              </div>

              {/* Laporan Laba Rugi Sederhana */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-3 shadow-lg">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                  <span className="text-xs font-bold text-slate-200">
                    Laporan Laba Rugi (Hari Ini)
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono">
                    SAK-EMKM
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-300">
                    <span>1. Pendapatan Usaha (Penjualan)</span>
                    <span className="font-bold text-white">
                      Rp {todayRevenue.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-slate-400">
                    <span>2. Beban Pokok Penjualan (HPP Est. 58%)</span>
                    <span className="font-medium text-slate-300">
                      -Rp {(todayRevenue - grossProfit).toLocaleString('id-ID')}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-t border-slate-800 font-semibold text-slate-200">
                    <span>Laba Kotor</span>
                    <span className="text-emerald-400">
                      Rp {grossProfit.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-slate-400">
                    <span>3. Beban Operasional (Retribusi & Es)</span>
                    <span className="font-medium text-rose-400">
                      -Rp {todayExpenses.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t-2 border-slate-800 font-bold text-sm">
                    <span className="text-white">Laba Bersih Usaha</span>
                    <span className="text-emerald-400 text-base">
                      Rp {netProfit.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Margin Keuntungan:</span>
                  <span className="text-emerald-400 font-bold">
                    {todayRevenue > 0 ? Math.round((netProfit / todayRevenue) * 100) : 0}% (Sangat Sehat)
                  </span>
                </div>
              </div>

              {/* Neraca Ringkas / Posisi Keuangan */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-2.5 text-xs">
                <h4 className="font-bold text-white">Posisi Keuangan Ringkas</h4>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400">Kas & Rekening QRIS:</span>
                    <p className="font-bold text-white text-xs mt-0.5">Rp 12.450.000</p>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400">Persediaan Stok Sayur:</span>
                    <p className="font-bold text-white text-xs mt-0.5">Rp 3.800.000</p>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400">Utang Kulakan:</span>
                    <p className="font-bold text-emerald-400 text-xs mt-0.5">Rp 0 (Lunas)</p>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400">Rasio DSCR Bank:</span>
                    <p className="font-bold text-amber-400 text-xs mt-0.5">{merchant.score.dscrRatio}x (Aman)</p>
                  </div>
                </div>
              </div>

              {/* Histori Transaksi Lengkap */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-300">Buku Kas Harian Terverifikasi</span>
                {transactions.map((t) => (
                  <div
                    key={t.id}
                    className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-bold text-white">{t.items[0]?.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{t.invoiceNo} • {t.time}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${t.total > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {t.total > 0 ? '+' : ''}Rp {Math.abs(t.total).toLocaleString('id-ID')}
                      </p>
                      <span className="text-[9px] text-slate-400 capitalize">{t.paymentMethod}</span>
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
                  <h3 className="text-sm font-bold text-white">Misi Keberlanjutan Pasar</h3>
                  <p className="text-[11px] text-emerald-400">Ubah aksi hijau jadi poin bunga murah!</p>
                </div>
                <button
                  onClick={() => setIsGreenModalOpen(true)}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-md shadow-emerald-950"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Catat Aksi</span>
                </button>
              </div>

              {/* Impact Banner */}
              <div className="bg-gradient-to-br from-emerald-900/60 to-slate-900 border border-emerald-500/40 p-4 rounded-3xl space-y-2">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                    <Leaf className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-bold text-white">Dampak Hijau Lapak Bu Siti</span>
                </div>
                <p className="text-2xl font-black text-emerald-400">
                  {merchant.organicWasteKgMonth} <span className="text-sm font-normal text-slate-300">kg sampah</span>
                </p>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Teralihkan dari TPA Galuga menjadi kompos organik di Rumah Kompos Pasar Jambu Dua. Nilai ESG Anda mendongkrak skor kredit <strong>+18%</strong>!
                </p>
              </div>

              {/* Green Action Checklist */}
              <div className="space-y-2.5">
                <span className="text-xs font-bold text-slate-300">Riwayat & Validasi Fasilitator Lapangan</span>
                {greenActions.map((ga) => (
                  <div
                    key={ga.id}
                    className="p-3.5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-white">{ga.title}</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">{ga.description}</p>
                      </div>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded-lg whitespace-nowrap">
                        +{ga.impactPoints} Poin
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px]">
                      <span className="text-slate-400">{ga.timestamp}</span>
                      <span
                        className={`font-semibold px-2 py-0.5 rounded-full ${
                          ga.status === 'verified'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {ga.status === 'verified' ? '✓ Diverifikasi Fasilitator' : '⏳ Menunggu Validasi'}
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
                <h3 className="text-sm font-bold text-white">Akses KUR Mikro Hijau</h3>
                <p className="text-[11px] text-slate-400">Pembiayaan bersubsidi langsung ke Bank Mitra</p>
              </div>

              {/* Bankability Status Card */}
              <div className="bg-gradient-to-br from-blue-950/70 via-slate-900 to-emerald-950/40 border border-blue-500/40 rounded-3xl p-4 space-y-3 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Kesiapan Kredit Bank
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-500/40">
                    BANKABLE ✓
                  </span>
                </div>

                <div>
                  <span className="text-xs text-slate-400">Plafon Maksimal Rekomendasi VERA:</span>
                  <p className="text-2xl font-extrabold text-white mt-0.5">
                    Rp {merchant.score.eligiblePlafon.toLocaleString('id-ID')}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800">
                  <div className="bg-slate-950/60 p-2 rounded-xl">
                    <span className="text-[10px] text-slate-400">Suku Bunga Khusus:</span>
                    <p className="text-xs font-bold text-emerald-400 mt-0.5">
                      {merchant.score.interestRatePromo}% eff. p.a.
                    </p>
                    <span className="text-[9px] text-slate-500">(Reguler 6%)</span>
                  </div>
                  <div className="bg-slate-950/60 p-2 rounded-xl">
                    <span className="text-[10px] text-slate-400">Kemampuan Bayar:</span>
                    <p className="text-xs font-bold text-blue-400 mt-0.5">
                      DSCR {merchant.score.dscrRatio}x (Sangat Kuat)
                    </p>
                  </div>
                </div>
              </div>

              {/* Loan Simulation Form */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-3">
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Coins className="w-4 h-4 text-amber-400" />
                  Simulasi Pengajuan Pinjaman
                </h4>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Jumlah Pengajuan:</span>
                    <span className="font-bold text-emerald-400">
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
                    className="w-full accent-emerald-500 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>Rp 5 Juta</span>
                    <span>Rp {merchant.score.eligiblePlafon / 1000000} Juta</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">Pilihan Tenor:</label>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {[12, 18, 24].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setLoanTenor(t)}
                        className={`py-2 rounded-xl font-bold transition ${
                          loanTenor === t
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-950 text-slate-400 border border-slate-800'
                        }`}
                      >
                        {t} Bulan
                      </button>
                    ))}
                  </div>
                </div>

                {/* Monthly Installment Calculation */}
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400">Estimasi Cicilan per Bulan:</span>
                    <p className="text-base font-extrabold text-white mt-0.5">
                      Rp {Math.round((loanPlafon / loanTenor) + (loanPlafon * 0.03 / 12)).toLocaleString('id-ID')}
                    </p>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950 px-2 py-1 rounded border border-emerald-500/30">
                    Bunga Subsidi 3%
                  </span>
                </div>

                {loanSuccessMessage ? (
                  <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 rounded-2xl text-center space-y-1">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                    <p className="text-xs font-bold text-white">Pengajuan Berhasil Dikirim!</p>
                    <p className="text-[11px] text-emerald-300">
                      Analis Bank BSI & BRI sedang meninjau dokumen SAK EMKM dan Skor VERA Anda di Portal Bank.
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={handleApplyLoan}
                    className="w-full py-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white text-xs font-bold rounded-2xl transition shadow-xl shadow-emerald-950 flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-4 h-4" />
                    <span>Kirim Pengajuan ke Analis Bank</span>
                  </button>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Bottom Tab Navigation Bar */}
        <div className="absolute bottom-0 inset-x-0 bg-slate-950/95 backdrop-blur-md border-t border-slate-800/80 px-2 py-2 flex items-center justify-around z-20">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition ${
              activeTab === 'home' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Store className="w-4 h-4" />
            <span className="text-[10px] font-medium">Beranda</span>
          </button>

          <button
            onClick={() => setActiveTab('pos')}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition ${
              activeTab === 'pos' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span className="text-[10px] font-medium">Kasir POS</span>
          </button>

          <button
            onClick={() => setActiveTab('sak_emkm')}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition ${
              activeTab === 'sak_emkm' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Receipt className="w-4 h-4" />
            <span className="text-[10px] font-medium">SAK EMKM</span>
          </button>

          <button
            onClick={() => setActiveTab('green')}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition ${
              activeTab === 'green' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Leaf className="w-4 h-4" />
            <span className="text-[10px] font-medium">Aksi Hijau</span>
          </button>

          <button
            onClick={() => setActiveTab('kur')}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition ${
              activeTab === 'kur' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Building className="w-4 h-4" />
            <span className="text-[10px] font-medium">KUR Hijau</span>
          </button>
        </div>

      </div>

      {/* MODAL CHECKOUT & QRIS SIMULATOR */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-slate-900 border border-emerald-500/40 rounded-3xl p-5 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-white text-base">Pembayaran & Di-Vera-kan</h3>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
              <span className="text-xs text-slate-400">Total Pembayaran:</span>
              <p className="text-2xl font-black text-emerald-400 mt-0.5">
                Rp {(cart.length > 0 ? cartTotal : parseInt(manualAmount || '0')).toLocaleString('id-ID')}
              </p>
            </div>

            {/* Payment Method Switch */}
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              <button
                onClick={() => setPaymentMethod('qris')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition ${
                  paymentMethod === 'qris'
                    ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <QrCode className="w-5 h-5" />
                <span>QRIS Dinamis</span>
              </button>

              <button
                onClick={() => setPaymentMethod('tunai')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition ${
                  paymentMethod === 'tunai'
                    ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <Wallet className="w-5 h-5" />
                <span>Uang Tunai</span>
              </button>
            </div>

            {/* QRIS Code Mockup */}
            {paymentMethod === 'qris' ? (
              <div className="bg-white p-4 rounded-2xl text-center space-y-2 shadow-inner">
                <div className="flex items-center justify-between text-slate-900 text-[10px] font-bold border-b pb-1">
                  <span>QRIS STANDAR PEMBAYARAN NASIONAL</span>
                  <span className="text-emerald-700">VERA PAY</span>
                </div>
                {/* Simulated QR Code Canvas */}
                <div className="w-36 h-36 mx-auto bg-slate-100 border-2 border-slate-900 p-2 flex items-center justify-center rounded-lg">
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
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-slate-300 text-center">
                Terima uang tunai fisik dari pembeli, simpan di laci kasir, lalu konfirmasi pencatatan SAK EMKM.
              </div>
            )}

            <button
              onClick={handleCheckout}
              className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-950 transition hover:brightness-110"
            >
              ✓ Konfirmasi Sudah Bayar & Di-Vera-kan
            </button>
          </div>
        </div>
      )}

      {/* MODAL STRUK DIGITAL / NOTA WA */}
      {lastCompletedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-slate-900 border border-emerald-500/40 rounded-3xl p-5 space-y-3.5 shadow-2xl">
            <div className="text-center space-y-1">
              <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-base">Transaksi Berhasil Di-Vera-kan!</h3>
              <p className="text-xs text-emerald-400">Data otomatis masuk Laporan SAK EMKM & Skor Hijau</p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>No. Nota:</span>
                <span className="font-mono text-white">{lastCompletedTx.invoiceNo}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Waktu:</span>
                <span className="text-white">{lastCompletedTx.time}</span>
              </div>
              <div className="border-t border-slate-800 pt-2 space-y-1">
                {lastCompletedTx.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span className="text-slate-300">{it.name} x{it.quantity}</span>
                    <span className="text-white font-semibold">Rp {it.subtotal.toLocaleString('id-ID')}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-800 pt-2 flex justify-between font-bold text-sm">
                <span className="text-white">Total:</span>
                <span className="text-emerald-400">Rp {lastCompletedTx.total.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setLastCompletedTx(null)}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
              >
                Selesai
              </button>
              <button
                onClick={() => {
                  alert(`Struk VERA berhasil dikirim via WhatsApp ke pelanggan!\n\nNota: ${lastCompletedTx.invoiceNo}\nTotal: Rp ${lastCompletedTx.total.toLocaleString('id-ID')}\nTerima kasih telah berbelanja ramah lingkungan di ${merchant.stallName}`);
                  setLastCompletedTx(null);
                }}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <form
            onSubmit={handleCreateGreenAction}
            className="w-full max-w-sm bg-slate-900 border border-emerald-500/40 rounded-3xl p-5 space-y-3.5 shadow-2xl"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                <Leaf className="w-4 h-4 text-emerald-400" />
                Catat Aksi Keberlanjutan Baru
              </h3>
              <button
                type="button"
                onClick={() => setIsGreenModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="text-xs text-slate-300 block mb-1">Jenis Aksi Hijau:</label>
              <select
                value={greenTitle}
                onChange={(e) => setGreenTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-emerald-500"
              >
                <option value="Pilah Sampah Sayuran Organik">Pilah Sampah Sayuran Organik (Rumah Kompos)</option>
                <option value="Penggunaan Besek Bambu & Daun">Penggunaan Besek Bambu / Tas Ramah Lingkungan</option>
                <option value="Efisiensi Rantai Pasok Petani">Efisiensi Rantai Pasok (Anti Food Waste)</option>
                <option value="Setor Minyak Jelantah / Residu">Setor Residu ke Bank Sampah Pasar</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-300 block mb-1">Berat / Jumlah (Kg / Unit):</label>
              <input
                type="number"
                step="0.1"
                value={greenWeight}
                onChange={(e) => setGreenWeight(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-bold outline-none focus:border-emerald-500"
                placeholder="Misal 5.2"
                required
              />
            </div>

            <div>
              <label className="text-xs text-slate-300 block mb-1">Catatan Bukti / Lokasi Setor:</label>
              <input
                type="text"
                value={greenNote}
                onChange={(e) => setGreenNote(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-emerald-500"
                placeholder="Misal: Ditimbang di pos pantau Blok A"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-950"
            >
              Kirim ke Fasilitator & Tambah Poin VERA
            </button>
          </form>
        </div>
      )}

      {/* MODAL CATAT BEBAN SAK EMKM */}
      {isExpenseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <form
            onSubmit={handleAddExpense}
            className="w-full max-w-sm bg-slate-900 border border-rose-500/40 rounded-3xl p-5 space-y-3.5 shadow-2xl"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-white text-sm">Catat Pengeluaran Lapak</h3>
              <button
                type="button"
                onClick={() => setIsExpenseModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="text-xs text-slate-300 block mb-1">Nominal Beban (Rp):</label>
              <input
                type="number"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-bold outline-none focus:border-rose-500"
                placeholder="Contoh: 35000"
                required
              />
            </div>

            <div>
              <label className="text-xs text-slate-300 block mb-1">Keterangan Pengeluaran:</label>
              <input
                type="text"
                value={expenseDesc}
                onChange={(e) => setExpenseDesc(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-rose-500"
                placeholder="Misal: Beli es batu pendingin atau retribusi"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-rose-950"
            >
              Simpan ke Buku Kas SAK EMKM
            </button>
          </form>
        </div>
      )}

    </div>
  );
};

