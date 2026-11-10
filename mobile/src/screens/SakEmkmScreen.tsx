import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Transaction, Merchant } from '../types';

interface SakEmkmScreenProps {
  merchant: Merchant;
  transactions: Transaction[];
  onAddExpense: (amount: number, desc: string) => void;
  todayRevenue: number;
  todayExpenses: number;
  grossProfit: number;
  netProfit: number;
}

export const SakEmkmScreen: React.FC<SakEmkmScreenProps> = ({
  merchant,
  transactions,
  onAddExpense,
  todayRevenue,
  todayExpenses,
  grossProfit,
  netProfit,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [desc, setDesc] = useState('');

  const handleSave = () => {
    const val = parseInt(amount);
    if (val > 0) {
      onAddExpense(val, desc || 'Pengeluaran Lapak');
      setAmount('');
      setDesc('');
      setModalOpen(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.topRow}>
          <View>
            <Text style={styles.screenTitle}>Pembukuan SAK EMKM</Text>
            <Text style={styles.screenSub}>Standar Akuntansi Resmi Usaha Mikro</Text>
          </View>
          <TouchableOpacity style={styles.addExpenseBtn} onPress={() => setModalOpen(true)}>
            <Ionicons name="add" size={14} color="#BE123C" />
            <Text style={styles.addExpenseText}>Catat Beban</Text>
          </TouchableOpacity>
        </View>

        {/* Laba Rugi Card */}
        <View style={styles.reportCard}>
          <View style={styles.reportHeader}>
            <Text style={styles.reportTitle}>Laporan Laba Rugi Hari Ini</Text>
            <View style={styles.tagBadge}>
              <Text style={styles.tagText}>SAK-EMKM</Text>
            </View>
          </View>

          <View style={styles.reportRow}>
            <Text style={styles.rowLabel}>1. Penjualan Masuk (Omzet)</Text>
            <Text style={styles.rowValBold}>Rp {todayRevenue.toLocaleString('id-ID')}</Text>
          </View>

          <View style={styles.reportRow}>
            <Text style={styles.rowLabelMuted}>2. Beban Kulakan (HPP Est. 58%)</Text>
            <Text style={styles.rowValMuted}>-Rp {(todayRevenue - grossProfit).toLocaleString('id-ID')}</Text>
          </View>

          <View style={[styles.reportRow, styles.subtotalRow]}>
            <Text style={styles.subtotalLabel}>Laba Kotor</Text>
            <Text style={styles.subtotalVal}>Rp {grossProfit.toLocaleString('id-ID')}</Text>
          </View>

          <View style={styles.reportRow}>
            <Text style={styles.rowLabelMuted}>3. Beban Operasional (Es & Retribusi)</Text>
            <Text style={[styles.rowValMuted, { color: '#E11D48' }]}>-Rp {todayExpenses.toLocaleString('id-ID')}</Text>
          </View>

          <View style={[styles.reportRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Uang Untung Bersih</Text>
            <Text style={styles.totalVal}>Rp {netProfit.toLocaleString('id-ID')}</Text>
          </View>

          <View style={styles.marginBox}>
            <Text style={styles.marginText}>Margin Keuntungan:</Text>
            <Text style={styles.marginVal}>
              {todayRevenue > 0 ? Math.round((netProfit / todayRevenue) * 100) : 0}% (Sangat Sehat)
            </Text>
          </View>
        </View>

        {/* Posisi Keuangan */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceTitle}>Posisi Keuangan Ringkas</Text>
          <View style={styles.balanceGrid}>
            <View style={styles.balanceItem}>
              <Text style={styles.bLabel}>Kas & Rekening:</Text>
              <Text style={styles.bVal}>Rp 12.450.000</Text>
            </View>
            <View style={styles.balanceItem}>
              <Text style={styles.bLabel}>Persediaan Stok:</Text>
              <Text style={styles.bVal}>Rp 3.800.000</Text>
            </View>
            <View style={styles.balanceItem}>
              <Text style={styles.bLabel}>Utang Dagang:</Text>
              <Text style={[styles.bVal, { color: '#059669' }]}>Rp 0 (Lunas)</Text>
            </View>
            <View style={styles.balanceItem}>
              <Text style={styles.bLabel}>Rasio DSCR Bank:</Text>
              <Text style={[styles.bVal, { color: '#B45309' }]}>{merchant.score.dscrRatio}x (Aman)</Text>
            </View>
          </View>
        </View>

        {/* Transaction History */}
        <Text style={styles.historyTitle}>Buku Kas Harian Terverifikasi</Text>
        <View style={styles.historyList}>
          {transactions.map((t) => (
            <View key={t.id} style={styles.historyItem}>
              <View>
                <Text style={styles.hName}>{t.items[0]?.name || 'Transaksi'}</Text>
                <Text style={styles.hMeta}>{t.invoiceNo} • {t.time}</Text>
              </View>
              <View style={styles.hRight}>
                <Text style={[styles.hAmount, t.total > 0 ? styles.hPlus : styles.hMinus]}>
                  {t.total > 0 ? '+' : ''}Rp {Math.abs(t.total).toLocaleString('id-ID')}
                </Text>
                <Text style={styles.hMethod}>{t.paymentMethod.toUpperCase()}</Text>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>

      {/* Modal Add Expense */}
      <Modal visible={modalOpen} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalTop}>
              <Text style={styles.modalTitle}>Catat Beban Lapak</Text>
              <TouchableOpacity onPress={() => setModalOpen(false)}>
                <Ionicons name="close" size={20} color="#64748B" />
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>Nominal Pengeluaran (Rp):</Text>
            <TextInput
              style={styles.modalInput}
              keyboardType="numeric"
              placeholder="Contoh: 35000"
              placeholderTextColor="#94A3B8"
              value={amount}
              onChangeText={setAmount}
            />

            <Text style={styles.inputLabel}>Keterangan:</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Misal: Es batu pendingin atau retribusi"
              placeholderTextColor="#94A3B8"
              value={desc}
              onChangeText={setDesc}
            />

            <TouchableOpacity style={styles.saveExpenseBtn} onPress={handleSave}>
              <Text style={styles.saveExpenseText}>Simpan ke Buku Kas SAK EMKM</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    paddingBottom: 110,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
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
  addExpenseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE4E6',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    gap: 4,
  },
  addExpenseText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#BE123C',
  },
  reportCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
    gap: 10,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 10,
  },
  reportTitle: {
    fontSize: 13,
    fontWeight: '900',
    color: '#0F172A',
  },
  tagBadge: {
    backgroundColor: '#EBF5ED',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#059669',
  },
  reportRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowLabel: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
  },
  rowValBold: {
    fontSize: 13,
    fontWeight: '900',
    color: '#0F172A',
  },
  rowLabelMuted: {
    fontSize: 11,
    color: '#64748B',
  },
  rowValMuted: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  subtotalRow: {
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 8,
  },
  subtotalLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
  },
  subtotalVal: {
    fontSize: 13,
    fontWeight: '900',
    color: '#059669',
  },
  totalRow: {
    borderTopWidth: 2,
    borderTopColor: '#E2E8F0',
    paddingTop: 10,
  },
  totalLabel: {
    fontSize: 13,
    fontWeight: '900',
    color: '#0F172A',
  },
  totalVal: {
    fontSize: 16,
    fontWeight: '900',
    color: '#059669',
  },
  marginBox: {
    backgroundColor: '#F8FAF8',
    padding: 10,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  marginText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  marginVal: {
    fontSize: 11,
    color: '#059669',
    fontWeight: '800',
  },
  balanceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  balanceTitle: {
    fontSize: 13,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 10,
  },
  balanceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  balanceItem: {
    backgroundColor: '#F8FAF8',
    borderRadius: 14,
    padding: 10,
    width: '48%',
  },
  bLabel: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
  },
  bVal: {
    fontSize: 12,
    fontWeight: '900',
    color: '#0F172A',
    marginTop: 3,
  },
  historyTitle: {
    fontSize: 12,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  historyList: {
    gap: 8,
  },
  historyItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  hName: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
  },
  hMeta: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
  },
  hRight: {
    alignItems: 'flex-end',
  },
  hAmount: {
    fontSize: 12,
    fontWeight: '900',
  },
  hPlus: {
    color: '#059669',
  },
  hMinus: {
    color: '#E11D48',
  },
  hMethod: {
    fontSize: 9,
    color: '#94A3B8',
    fontWeight: '700',
    marginTop: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 20,
  },
  modalTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  modalTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#0F172A',
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 4,
  },
  modalInput: {
    backgroundColor: '#F8FAF8',
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 42,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  saveExpenseBtn: {
    backgroundColor: '#BE123C',
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 4,
  },
  saveExpenseText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },
});
