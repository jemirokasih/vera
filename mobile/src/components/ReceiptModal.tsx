import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Transaction, Merchant } from '../types';

interface ReceiptModalProps {
  transaction: Transaction | null;
  merchant: Merchant;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  transaction,
  merchant,
  onClose,
}) => {
  if (!transaction) return null;

  const handleShareWa = () => {
    Alert.alert(
      'Struk Terkirim via WhatsApp',
      `Nota ${transaction.invoiceNo}\nTotal: Rp ${transaction.total.toLocaleString('id-ID')}\nTerima kasih telah berbelanja ramah lingkungan di ${merchant.stallName}!`
    );
    onClose();
  };

  return (
    <Modal visible={!!transaction} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.iconCircle}>
            <Ionicons name="checkmark-circle" size={32} color="#059669" />
          </View>

          <Text style={styles.title}>Transaksi Berhasil Di-Vera-kan!</Text>
          <Text style={styles.subtitle}>Otomatis masuk Laporan SAK EMKM & Skor Hijau</Text>

          <View style={styles.receiptBox}>
            <View style={styles.row}>
              <Text style={styles.label}>No. Nota:</Text>
              <Text style={styles.valMono}>{transaction.invoiceNo}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Waktu:</Text>
              <Text style={styles.val}>{transaction.time}</Text>
            </View>

            <View style={styles.divider} />

            {transaction.items.map((it, idx) => (
              <View key={idx} style={styles.row}>
                <Text style={styles.itemName}>{it.name} x{it.quantity}</Text>
                <Text style={styles.itemPrice}>Rp {it.subtotal.toLocaleString('id-ID')}</Text>
              </View>
            ))}

            <View style={styles.divider} />

            <View style={styles.rowTotal}>
              <Text style={styles.totalLabel}>Total Bayar:</Text>
              <Text style={styles.totalVal}>Rp {transaction.total.toLocaleString('id-ID')}</Text>
            </View>
          </View>

          <View style={styles.btnRow}>
            <TouchableOpacity style={styles.doneBtn} onPress={onClose}>
              <Text style={styles.doneText}>Selesai</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.waBtn} onPress={handleShareWa}>
              <Ionicons name="share-social" size={14} color="#0D3B23" />
              <Text style={styles.waText}>Kirim WA</Text>
            </TouchableOpacity>
          </View>
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
    padding: 22,
    alignItems: 'center',
    gap: 8,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#EBF5ED',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: '900',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 11,
    color: '#059669',
    fontWeight: '700',
    textAlign: 'center',
  },
  receiptBox: {
    width: '100%',
    backgroundColor: '#F8FAF8',
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginVertical: 10,
    gap: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 10,
    color: '#64748B',
  },
  val: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0F172A',
  },
  valMono: {
    fontSize: 10,
    fontFamily: 'monospace',
    fontWeight: '700',
    color: '#0F172A',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 4,
  },
  itemName: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },
  itemPrice: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0F172A',
  },
  rowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 2,
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: '900',
    color: '#0F172A',
  },
  totalVal: {
    fontSize: 14,
    fontWeight: '900',
    color: '#059669',
  },
  btnRow: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
    marginTop: 4,
  },
  doneBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
  },
  doneText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#475569',
  },
  waBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: '#D4F82A',
    gap: 6,
  },
  waText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#0D3B23',
  },
});

