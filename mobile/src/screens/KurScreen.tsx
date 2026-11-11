import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Merchant } from '../types';

interface KurScreenProps {
  merchant: Merchant;
  onSubmitLoan: (amount: number, tenor: number) => void;
}

export const KurScreen: React.FC<KurScreenProps> = ({ merchant, onSubmitLoan }) => {
  const [selectedPlafon, setSelectedPlafon] = useState(25000000);
  const [selectedTenor, setSelectedTenor] = useState(18);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const monthlyInstallment = Math.round(
    selectedPlafon / selectedTenor + (selectedPlafon * 0.03) / 12
  );

  const handleApply = () => {
    onSubmitLoan(selectedPlafon, selectedTenor);
    setIsSubmitted(true);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      
      {/* Header */}
      <View style={styles.topRow}>
        <Text style={styles.screenTitle}>Akses KUR Mikro Hijau</Text>
        <Text style={styles.screenSub}>Pembiayaan bersubsidi langsung ke Bank Mitra</Text>
      </View>

      {/* Bankability Status Card */}
      <View style={styles.statusCard}>
        <View style={styles.statusTop}>
          <View style={styles.statusLabelRow}>
            <Ionicons name="shield-checkmark" size={16} color="#059669" />
            <Text style={styles.statusLabel}>Kesiapan Kredit Bank</Text>
          </View>
          <View style={styles.bankableBadge}>
            <Text style={styles.bankableBadgeText}>BANKABLE ✓</Text>
          </View>
        </View>

        <Text style={styles.plafonLabel}>Plafon Rekomendasi VERA:</Text>
        <Text style={styles.plafonValue}>
          Rp {merchant.score.eligiblePlafon.toLocaleString('id-ID')}
        </Text>

        <View style={styles.metricsRow}>
          <View style={styles.metricItem}>
            <Text style={styles.mLabel}>Suku Bunga Khusus:</Text>
            <Text style={styles.mVal}>{merchant.score.interestRatePromo}% eff. p.a.</Text>
            <Text style={styles.mSub}>(Normal 6%)</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={styles.mLabel}>Kemampuan Bayar:</Text>
            <Text style={[styles.mVal, { color: '#1D4ED8' }]}>DSCR {merchant.score.dscrRatio}x</Text>
            <Text style={styles.mSub}>(Sangat Kuat)</Text>
          </View>
        </View>
      </View>

      {/* Simulation Box */}
      <View style={styles.simCard}>
        <View style={styles.simHeader}>
          <Ionicons name="calculator" size={16} color="#D97706" />
          <Text style={styles.simTitle}>Simulasi Pengajuan Pinjaman</Text>
        </View>

        <Text style={styles.fieldLabel}>Pilih Plafon:</Text>
        <View style={styles.chipGrid}>
          {[10000000, 20000000, 25000000, 35000000].map((p) => {
            const active = selectedPlafon === p;
            return (
              <TouchableOpacity
                key={p}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => setSelectedPlafon(p)}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>
                  Rp {p / 1000000} Jt
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.fieldLabel}>Pilih Tenor:</Text>
        <View style={styles.tenorRow}>
          {[12, 18, 24].map((t) => {
            const active = selectedTenor === t;
            return (
              <TouchableOpacity
                key={t}
                style={[styles.tenorBtn, active && styles.tenorBtnActive]}
                onPress={() => setSelectedTenor(t)}
              >
                <Text style={[styles.tenorText, active && styles.tenorTextActive]}>
                  {t} Bulan
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Calculation */}
        <View style={styles.calcBox}>
          <View>
            <Text style={styles.calcLabel}>Estimasi Cicilan per Bulan:</Text>
            <Text style={styles.calcValue}>Rp {monthlyInstallment.toLocaleString('id-ID')}</Text>
          </View>
          <View style={styles.promoBadge}>
            <Text style={styles.promoText}>Bunga 3%</Text>
          </View>
        </View>

        {isSubmitted ? (
          <View style={styles.successBox}>
            <Ionicons name="checkmark-circle" size={24} color="#059669" />
            <Text style={styles.successTitle}>Pengajuan Terkirim ke Analis Bank!</Text>
            <Text style={styles.successSub}>
              Analis Bank BSI & BRI sedang mengecek data SAK EMKM dan Skor VERA Anda.
            </Text>
          </View>
        ) : (
          <TouchableOpacity style={styles.submitLoanBtn} onPress={handleApply}>
            <Ionicons name="send" size={14} color="#D4F82A" />
            <Text style={styles.submitLoanText}>Kirim Pengajuan ke Analis Bank</Text>
          </TouchableOpacity>
        )}
      </View>

    </ScrollView>
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
  statusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    padding: 16,
    borderWidth: 2,
    borderColor: '#D4F82A',
    marginBottom: 16,
  },
  statusTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusLabel: {
    fontSize: 11,
    fontWeight: '900',
    color: '#0D3B23',
    textTransform: 'uppercase',
  },
  bankableBadge: {
    backgroundColor: '#D4F82A',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  bankableBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#0D3B23',
  },
  plafonLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  plafonValue: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0D3B23',
    marginVertical: 4,
  },
  metricsRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 10,
    marginTop: 6,
    gap: 8,
  },
  metricItem: {
    flex: 1,
    backgroundColor: '#F8FAF8',
    borderRadius: 14,
    padding: 8,
  },
  mLabel: {
    fontSize: 9,
    color: '#64748B',
    fontWeight: '600',
  },
  mVal: {
    fontSize: 12,
    fontWeight: '900',
    color: '#059669',
    marginTop: 2,
  },
  mSub: {
    fontSize: 9,
    color: '#94A3B8',
  },
  simCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  simHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  simTitle: {
    fontSize: 13,
    fontWeight: '900',
    color: '#0F172A',
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 6,
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#F8FAF8',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  chipActive: {
    backgroundColor: '#0D3B23',
    borderColor: '#0D3B23',
  },
  chipText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#475569',
  },
  chipTextActive: {
    color: '#D4F82A',
  },
  tenorRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  tenorBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 16,
    backgroundColor: '#F8FAF8',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  tenorBtnActive: {
    backgroundColor: '#0D3B23',
    borderColor: '#0D3B23',
  },
  tenorText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#475569',
  },
  tenorTextActive: {
    color: '#D4F82A',
  },
  calcBox: {
    backgroundColor: '#F8FAF8',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  calcLabel: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
  },
  calcValue: {
    fontSize: 15,
    fontWeight: '900',
    color: '#0F172A',
    marginTop: 2,
  },
  promoBadge: {
    backgroundColor: '#F7FEE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D4F82A',
  },
  promoText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#0D3B23',
  },
  submitLoanBtn: {
    backgroundColor: '#0D3B23',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 18,
    gap: 6,
  },
  submitLoanText: {
    color: '#D4F82A',
    fontSize: 12,
    fontWeight: '900',
  },
  successBox: {
    backgroundColor: '#EBF5ED',
    borderRadius: 18,
    padding: 14,
    alignItems: 'center',
    gap: 4,
  },
  successTitle: {
    fontSize: 13,
    fontWeight: '900',
    color: '#059669',
  },
  successSub: {
    fontSize: 11,
    color: '#475569',
    textAlign: 'center',
  },
});

