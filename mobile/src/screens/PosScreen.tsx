import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Product, CartItem, ProductCategory } from '../types';

interface PosScreenProps {
  products: Product[];
  cart: CartItem[];
  onAddToCart: (p: Product) => void;
  onRemoveFromCart: (id: string) => void;
  onClearCart: () => void;
  onOpenCheckout: (manualTotal?: number) => void;
}

export const PosScreen: React.FC<PosScreenProps> = ({
  products,
  cart,
  onAddToCart,
  onRemoveFromCart,
  onClearCart,
  onOpenCheckout,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('Semua');
  const [manualAmount, setManualAmount] = useState('');

  const cartTotal = cart.reduce((acc, i) => acc + i.subtotal, 0);

  const filtered = selectedCategory === 'Semua'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.topRow}>
          <View>
            <Text style={styles.screenTitle}>Kasir Cepat Pasar</Text>
            <Text style={styles.screenSub}>Ketik harga atau pilih komoditas</Text>
          </View>
          {cart.length > 0 && (
            <TouchableOpacity onPress={onClearCart}>
              <Text style={styles.clearText}>Kosongkan</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Manual Numpad Input Box */}
        <View style={styles.numpadBox}>
          <Text style={styles.numpadLabel}>Input Cepat Manual (Numpad)</Text>
          <View style={styles.inputRow}>
            <View style={styles.inputWrapper}>
              <Text style={styles.rpText}>Rp</Text>
              <TextInput
                style={styles.textInput}
                keyboardType="numeric"
                placeholder="Misal 25000"
                placeholderTextColor="#94A3B8"
                value={manualAmount}
                onChangeText={setManualAmount}
              />
            </View>
            <TouchableOpacity
              style={[styles.payManualBtn, !manualAmount && styles.btnDisabled]}
              disabled={!manualAmount}
              onPress={() => {
                const val = parseInt(manualAmount);
                if (val > 0) onOpenCheckout(val);
              }}
            >
              <Text style={styles.payManualText}>Bayar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Category Pills */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll} contentContainerStyle={styles.catContainer}>
          {(['Semua', 'Sayur', 'Bumbu', 'Sembako'] as ProductCategory[]).map((c) => {
            const active = selectedCategory === c;
            return (
              <TouchableOpacity
                key={c}
                style={[styles.catPill, active && styles.catPillActive]}
                onPress={() => setSelectedCategory(c)}
              >
                <Text style={[styles.catText, active && styles.catTextActive]}>{c}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Product Grid */}
        <View style={styles.grid}>
          {filtered.map((item) => {
            const inCart = cart.find(ci => ci.product.id === item.id);
            return (
              <View key={item.id} style={styles.productCard}>
                <View style={styles.productTop}>
                  <Text style={styles.emoji}>{item.emoji}</Text>
                  <Text style={styles.stockText}>stok {item.stock}</Text>
                </View>

                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.productPrice}>
                    Rp {item.price.toLocaleString('id-ID')}
                    <Text style={styles.productUnit}>/{item.unit}</Text>
                  </Text>
                </View>

                {inCart ? (
                  <View style={styles.counterRow}>
                    <TouchableOpacity style={styles.counterBtn} onPress={() => onRemoveFromCart(item.id)}>
                      <Ionicons name="remove" size={14} color="#E11D48" />
                    </TouchableOpacity>
                    <Text style={styles.counterQty}>{inCart.quantity}</Text>
                    <TouchableOpacity style={styles.counterBtn} onPress={() => onAddToCart(item)}>
                      <Ionicons name="add" size={14} color="#059669" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity style={styles.addBtn} onPress={() => onAddToCart(item)}>
                    <Ionicons name="add" size={14} color="#0D3B23" />
                    <Text style={styles.addBtnText}>Pilih</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>

      </ScrollView>

      {/* Floating Bottom Cart Bar */}
      {cart.length > 0 && (
        <View style={styles.cartBar}>
          <View>
            <Text style={styles.cartCount}>
              Total {cart.reduce((s, i) => s + i.quantity, 0)} Item
            </Text>
            <Text style={styles.cartAmount}>Rp {cartTotal.toLocaleString('id-ID')}</Text>
          </View>
          <TouchableOpacity style={styles.checkoutBtn} onPress={() => onOpenCheckout()} activeOpacity={0.85}>
            <Text style={styles.checkoutText}>Lanjut Bayar</Text>
            <Ionicons name="chevron-forward" size={16} color="#0D3B23" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7F4',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 120,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  screenTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0F172A',
  },
  screenSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  clearText: {
    fontSize: 11,
    color: '#E11D48',
    fontWeight: '700',
  },
  numpadBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 14,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: '#D4F82A',
  },
  numpadLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: '#64748B',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAF8',
    borderRadius: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  rpText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#64748B',
    marginRight: 4,
  },
  textInput: {
    flex: 1,
    height: 40,
    fontSize: 15,
    fontWeight: '900',
    color: '#0F172A',
  },
  payManualBtn: {
    backgroundColor: '#0D3B23',
    paddingHorizontal: 18,
    height: 40,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnDisabled: {
    opacity: 0.4,
  },
  payManualText: {
    color: '#D4F82A',
    fontSize: 12,
    fontWeight: '900',
  },
  catScroll: {
    marginBottom: 14,
  },
  catContainer: {
    gap: 8,
  },
  catPill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  catPillActive: {
    backgroundColor: '#0D3B23',
    borderColor: '#0D3B23',
  },
  catText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  catTextActive: {
    color: '#D4F82A',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 12,
    width: '48%',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'space-between',
  },
  productTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 26,
  },
  stockText: {
    fontSize: 9,
    color: '#64748B',
    backgroundColor: '#F8FAF8',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    fontWeight: '600',
  },
  productInfo: {
    marginVertical: 8,
  },
  productName: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
  },
  productPrice: {
    fontSize: 12,
    fontWeight: '900',
    color: '#059669',
    marginTop: 2,
  },
  productUnit: {
    fontSize: 9,
    fontWeight: '500',
    color: '#64748B',
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAF8',
    paddingVertical: 8,
    borderRadius: 14,
    gap: 4,
  },
  addBtnText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0D3B23',
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAF8',
    borderRadius: 14,
    padding: 4,
  },
  counterBtn: {
    width: 26,
    height: 26,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterQty: {
    fontSize: 12,
    fontWeight: '900',
    color: '#0F172A',
  },
  cartBar: {
    position: 'absolute',
    bottom: 84,
    left: 16,
    right: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#D4F82A',
  },
  cartCount: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
  },
  cartAmount: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0D3B23',
  },
  checkoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D4F82A',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    gap: 4,
  },
  checkoutText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#0D3B23',
  },
});
