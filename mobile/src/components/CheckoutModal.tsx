import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Merchant } from '../types';

interface CheckoutModalProps {
  visible: boolean;
  total: number;
  merchant: Merchant;
  onClose: () => void;
  onConfirm: (method: 'qris' | 'tunai') => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  visible,
  total,
  merchant,
  onClose,
  onConfirm,
}) => {
  const [method, setMethod] = useState<'qris' | 'tunai'>('qris');

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.topRow}>
            <Text style={styles.title}>Pembayaran & Di-Vera-kan</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          <View style={styles.totalBox}>
            <Text style={styles.totalLabel}>Total Pembayaran:</Text>
            <Text style={styles.totalVal}>Rp {total.toLocaleString('id-ID')}</Text>
          </View>

          {/* Payment Method Switch */}
          <View style={styles.methodRow}>
            <TouchableOpacity
              style={[styles.methodBtn, method === 'qris' && styles.methodBtnActive]}
              onPress={() => setMethod('qris')}
            >
              <Ionicons name="qr-code" size={18} color={method === 'qris' ? '#D4F82A' : '#64748B'} />
              <Text style={[styles.methodText, method === 'qris' && styles.methodTextActive]}>
                QRIS Dinamis
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.methodBtn, method === 'tunai' && styles.methodBtnActive]}
              onPress={() => setMethod('tunai')}
            >
              <Ionicons name="cash" size={18} color={method === 'tunai' ? '#D4F82A' : '#64748B'} />
              <Text style={[styles.methodText, method === 'tunai' && styles.methodTextActive]}>
                Uang Tunai
              </Text>
            </TouchableOpacity>
          </View>

          {/* QRIS / Cash Simulator View */}
          {method === 'qris' ? (
            <View style={styles.qrisBox}>
              <View style={styles.qrisHeader}>
                <Text style={styles.qrisHeaderText}>QRIS STANDAR NASIONAL</Text>
                <Text style={styles.qrisBrand}>VERA PAY</Text>
              </View>

              <View style={styles.qrGrid}>
                {Array.from({ length: 36 }).map((_, i) => (
                  <View
                    key={i}
                    style={[
                      styles.qrDot,
                      (i % 2 === 0 || i % 7 === 0) ? styles.qrDotDark : styles.qrDotLight,
                    ]}
                  />
                ))}
              </View>

              <Text style={styles.stallQr}>{merchant.stallName}</Text>
              <Text style={styles.qrisId}>{merchant.qrisId}</Text>
            </View>
          ) : (
            <View style={styles.cashBox}>
              <Ionicons name="wallet-outline" size={32} color="#059669" />
              <Text style={styles.cashText}>
                Terima uang tunai fisik dari pembeli, simpan di laci kasir, lalu klik konfirmasi.
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.confirmBtn}
            onPress={() => onConfirm(method)}
            activeOpacity={0.85}
          >
            <Text style={styles.confirmBtnText}>✓ Konfirmasi Sudah Bayar & Di-Vera-kan</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    padding: 20,
    gap: 14,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '900',
    color: '#0F172A',
  },
  totalBox: {
    backgroundColor: '#F8FAF8',
    borderRadius: 20,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  totalLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  totalVal: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0D3B23',
    marginTop: 2,
  },
  methodRow: {
    flexDirection: 'row',
    gap: 8,
  },
  methodBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 16,
    backgroundColor: '#F8FAF8',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 6,
  },
  methodBtnActive: {
    backgroundColor: '#0D3B23',
    borderColor: '#0D3B23',
  },
  methodText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748B',
  },
  methodTextActive: {
    color: '#D4F82A',
  },
  qrisBox: {
    backgroundColor: '#FAFCFA',
    borderRadius: 22,
    padding: 14,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#0F172A',
    gap: 6,
  },
  qrisHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingBottom: 4,
  },
  qrisHeaderText: {
    fontSize: 8,
    fontWeight: '900',
    color: '#0F172A',
  },
  qrisBrand: {
    fontSize: 9,
    fontWeight: '900',
    color: '#059669',
  },
  qrGrid: {
    width: 120,
    height: 120,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 3,
    padding: 4,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#0F172A',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrDot: {
    width: 15,
    height: 15,
    borderRadius: 2,
  },
  qrDotDark: {
    backgroundColor: '#0F172A',
  },
  qrDotLight: {
    backgroundColor: 'transparent',
  },
  stallQr: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 4,
  },
  qrisId: {
    fontSize: 9,
    fontFamily: 'monospace',
    color: '#64748B',
  },
  cashBox: {
    backgroundColor: '#F8FAF8',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    gap: 8,
  },
  cashText: {
    fontSize: 11,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 16,
  },
  confirmBtn: {
    backgroundColor: '#0D3B23',
    paddingVertical: 14,
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 6,
  },
  confirmBtnText: {
    color: '#D4F82A',
    fontSize: 12,
    fontWeight: '900',
  },
});
