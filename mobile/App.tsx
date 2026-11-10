import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Platform, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  INITIAL_PRODUCTS,
  INITIAL_MERCHANT,
  INITIAL_TRANSACTIONS,
  INITIAL_GREEN_ACTIONS,
} from './src/data/mockData';
import { Product, CartItem, Transaction, GreenAction } from './src/types';
import { Header } from './src/components/Header';
import { BottomNav, TabType } from './src/components/BottomNav';
import { HomeScreen } from './src/screens/HomeScreen';
import { PosScreen } from './src/screens/PosScreen';
import { SakEmkmScreen } from './src/screens/SakEmkmScreen';
import { GreenScreen } from './src/screens/GreenScreen';
import { KurScreen } from './src/screens/KurScreen';
import { VeraAssistantModal } from './src/components/VeraAssistantModal';
import { CheckoutModal } from './src/components/CheckoutModal';
import { ReceiptModal } from './src/components/ReceiptModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [merchant, setMerchant] = useState(INITIAL_MERCHANT);
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [greenActions, setGreenActions] = useState<GreenAction[]>(INITIAL_GREEN_ACTIONS);

  // Modals state
  const [assistantVisible, setAssistantVisible] = useState(false);
  const [checkoutVisible, setCheckoutVisible] = useState(false);
  const [manualCheckoutTotal, setManualCheckoutTotal] = useState<number | null>(null);
  const [lastTx, setLastTx] = useState<Transaction | null>(null);

  // Cart operations
  const handleAddToCart = (product: Product) => {
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

  const handleRemoveFromCart = (productId: string) => {
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

  const handleClearCart = () => setCart([]);

  const handleOpenCheckout = (manualTotal?: number) => {
    setManualCheckoutTotal(manualTotal || null);
    setCheckoutVisible(true);
  };

  const handleConfirmPayment = (method: 'qris' | 'tunai') => {
    const total = manualCheckoutTotal !== null
      ? manualCheckoutTotal
      : cart.reduce((s, i) => s + i.subtotal, 0);

    const items = cart.length > 0
      ? cart.map((i) => ({
          name: i.product.name,
          quantity: i.quantity,
          price: i.product.price,
          subtotal: i.subtotal,
        }))
      : [{
          name: 'Penjualan Kasir Cepat',
          quantity: 1,
          price: total,
          subtotal: total,
        }];

    const now = new Date();
    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      invoiceNo: `VERA-${now.toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(100 + Math.random() * 900)}`,
      time: timeStr,
      items,
      total,
      paymentMethod: method,
      isVeraVerified: true,
    };

    setTransactions((prev) => [newTx, ...prev]);
    setMerchant((prev) => ({
      ...prev,
      dailyRevenue: prev.dailyRevenue + total,
      score: {
        ...prev.score,
        total: Math.min(99, prev.score.total + 1),
        financialScore: Math.min(100, prev.score.financialScore + 1),
        digitalScore: method === 'qris' ? Math.min(100, prev.score.digitalScore + 2) : prev.score.digitalScore,
      },
    }));

    setCart([]);
    setCheckoutVisible(false);
    setManualCheckoutTotal(null);
    setLastTx(newTx);
  };

  const handleAddExpense = (amount: number, desc: string) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      invoiceNo: `VERA-EXP-${Math.floor(100 + Math.random() * 900)}`,
      time: timeStr,
      items: [{ name: desc, quantity: 1, price: -amount, subtotal: -amount }],
      total: -amount,
      paymentMethod: 'tunai',
      isVeraVerified: true,
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const handleAddGreenAction = (title: string, weightKg: number, note: string) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
    const newAction: GreenAction = {
      id: `ga-${Date.now()}`,
      title,
      description: `${title} sebesar ${weightKg} kg di Pasar Jambu Dua.`,
      impactPoints: 15,
      status: 'verified',
      timestamp: timeStr,
      weightKg,
      proofNote: note,
    };
    setGreenActions((prev) => [newAction, ...prev]);
    setMerchant((prev) => {
      const newGreenScore = Math.min(100, prev.score.greenScore + 4);
      return {
        ...prev,
        organicWasteKgMonth: parseFloat((prev.organicWasteKgMonth + weightKg).toFixed(1)),
        score: {
          ...prev.score,
          total: Math.min(99, prev.score.total + 1),
          greenScore: newGreenScore,
        },
      };
    });
  };

  const handleVoiceRecordSale = (amount: number, note: string) => {
    handleOpenCheckout(amount);
  };

  const handleVoiceRecordGreenAction = (weight: number) => {
    handleAddGreenAction('Pilah Sampah Sayur Organik', weight, 'Input Perintah Suara VERA');
  };

  // Calculations
  const todayRevenue = transactions.filter((t) => t.total > 0).reduce((s, t) => s + t.total, 0);
  const todayExpenses = Math.abs(transactions.filter((t) => t.total < 0).reduce((s, t) => s + t.total, 0));
  const grossProfit = Math.round(todayRevenue * 0.42);
  const netProfit = grossProfit - todayExpenses;

  const currentCheckoutTotal = manualCheckoutTotal !== null
    ? manualCheckoutTotal
    : cart.reduce((s, i) => s + i.subtotal, 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        
        {/* Top Header */}
        <Header merchant={merchant} onOpenAssistant={() => setAssistantVisible(true)} />

        {/* Current Active Tab Screen */}
        <View style={styles.screenArea}>
          {activeTab === 'home' && (
            <HomeScreen
              merchant={merchant}
              transactions={transactions}
              onNavigate={setActiveTab}
              todayRevenue={todayRevenue}
              todayNetProfit={netProfit}
            />
          )}

          {activeTab === 'pos' && (
            <PosScreen
              products={products}
              cart={cart}
              onAddToCart={handleAddToCart}
              onRemoveFromCart={handleRemoveFromCart}
              onClearCart={handleClearCart}
              onOpenCheckout={handleOpenCheckout}
            />
          )}

          {activeTab === 'sak_emkm' && (
            <SakEmkmScreen
              merchant={merchant}
              transactions={transactions}
              onAddExpense={handleAddExpense}
              todayRevenue={todayRevenue}
              todayExpenses={todayExpenses}
              grossProfit={grossProfit}
              netProfit={netProfit}
            />
          )}

          {activeTab === 'green' && (
            <GreenScreen
              merchant={merchant}
              greenActions={greenActions}
              onAddAction={handleAddGreenAction}
            />
          )}

          {activeTab === 'kur' && (
            <KurScreen
              merchant={merchant}
              onSubmitLoan={(amount, tenor) => {
                // Handled in screen
              }}
            />
          )}
        </View>

        {/* Floating Capsule Bottom Dock */}
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tanya VERA AI Assistant Sheet Modal */}
        <VeraAssistantModal
          visible={assistantVisible}
          onClose={() => setAssistantVisible(false)}
          onRecordSale={handleVoiceRecordSale}
          onRecordGreenAction={handleVoiceRecordGreenAction}
          todayRevenue={todayRevenue}
          todayNetProfit={netProfit}
          greenScore={merchant.score.total}
        />

        {/* Checkout Modal */}
        <CheckoutModal
          visible={checkoutVisible}
          total={currentCheckoutTotal}
          merchant={merchant}
          onClose={() => setCheckoutVisible(false)}
          onConfirm={handleConfirmPayment}
        />

        {/* Receipt Modal */}
        <ReceiptModal
          transaction={lastTx}
          merchant={merchant}
          onClose={() => setLastTx(null)}
        />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F7F4',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#F4F7F4',
  },
  screenArea: {
    flex: 1,
  },
});
