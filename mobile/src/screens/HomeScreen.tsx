import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Merchant, Transaction } from '../types';
import { TabType } from '../components/BottomNav';

interface HomeScreenProps {
  merchant: Merchant;
  transactions: Transaction[];
  onNavigate: (tab: TabType) => void;
  todayRevenue: number;
  todayNetProfit: number;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  merchant,
  transactions,
  onNavigate,
  todayRevenue,
  todayNetProfit,
}) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      
      {/* Metonymy Banner */}
      <View style={styles.metonymyCard}>
        <View style={styles.metonymyLeft}>
          <View style={styles.shieldIconBox}>
            <Ionicons name="shield-checkmark" size={20} color="#059669" />
          </View>
          <View style={styles.metonymyText}>
            <View style={styles.metonymyTitleRow}>
              <Text style={styles.metonymyTitle}>"Udah di-Vera-kan hari ini?"</Text>
              <View style={styles.livePulse} />
            </View>
            <Text style={styles.metonymySub}>
              Data transaksi tervalidasi langsung untuk skor bank!
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.catatBtn} onPress={() => onNavigate('pos')} activeOpacity={0.8}>
          <Text style={styles.catatBtnText}>Catat</Text>
        </TouchableOpacity>
      </View>

      {/* Hero Eco-Fintech Card (Green Card from Reference Images) */}
      <View style={styles.heroCard}>
        <View style={styles.heroHeader}>
          <View style={styles.heroLeft}>
            <View style={styles.scoreBadge}>
              <Text style={styles.scoreBadgeText}>★ Skor VERA Lapak</Text>
            </View>
            <Text style={styles.heroTier}>Tier {merchant.score.tier}</Text>
            <Text style={styles.heroRank}>TOP 5% Pedagang Hijau Jambu Dua</Text>
          </View>

          {/* Donut Score Visual */}
          <View style={styles.donutCircle}>
            <Text style={styles.donutScore}>{merchant.score.total}</Text>
            <Text style={styles.donutMax}>/ 100</Text>
          </View>
        </View>

        {/* Pillars */}
        <View style={styles.pillarsRow}>
          <View style={styles.pillarBox}>
            <Text style={styles.pillarLabel}>Finansial</Text>
            <Text style={styles.pillarValue}>{merchant.score.financialScore}%</Text>
          </View>
          <View style={styles.pillarBox}>
            <Text style={[styles.pillarLabel, { color: '#D4F82A' }]}>Aksi Hijau</Text>
            <Text style={[styles.pillarValue, { color: '#D4F82A' }]}>{merchant.score.greenScore}%</Text>
          </View>
          <View style={styles.pillarBox}>
            <Text style={styles.pillarLabel}>Digital</Text>
            <Text style={styles.pillarValue}>{merchant.score.digitalScore}%</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.claimBtn} onPress={() => onNavigate('kur')} activeOpacity={0.85}>
          <Ionicons name="cash" size={16} color="#0D3B23" />
          <Text style={styles.claimBtnText}>Klaim Bunga Subsidi KUR Hijau (3%)</Text>
          <Ionicons name="chevron-forward" size={16} color="#0D3B23" />
        </TouchableOpacity>
      </View>

      {/* Total Kontribusimu Hari Ini (From Image 3 Reference) */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Total Kontribusimu Hari Ini</Text>
        <Text style={styles.sectionSubtitle}>Pasar Jambu Dua</Text>
      </View>

      <View style={styles.statsRow}>
        {/* Card 1: Omzet */}
        <View style={styles.statCard}>
          <View style={[styles.statIconBox, { backgroundColor: '#EBF5ED' }]}>
            <Ionicons name="trending-up" size={16} color="#059669" />
          </View>
          <Text style={styles.statLabel}>Omzet Kasir</Text>
          <Text style={styles.statValue}>Rp {(todayRevenue / 1000).toFixed(0)}rb</Text>
        </View>

        {/* Card 2: Sampah Terpilah */}
        <View style={styles.statCard}>
          <View style={[styles.statIconBox, { backgroundColor: '#F7FEE7' }]}>
            <Ionicons name="leaf" size={16} color="#4D7C0F" />
          </View>
          <Text style={styles.statLabel}>Sampah Hijau</Text>
          <Text style={[styles.statValue, { color: '#15803D' }]}>{merchant.organicWasteKgMonth} kg</Text>
        </View>

        {/* Card 3: Untung SAK EMKM */}
        <View style={styles.statCard}>
          <View style={[styles.statIconBox, { backgroundColor: '#EFF6FF' }]}>
            <Ionicons name="receipt" size={16} color="#1D4ED8" />
          </View>
          <Text style={styles.statLabel}>Laba Bersih</Text>
          <Text style={[styles.statValue, { color: '#1D4ED8' }]}>Rp {(todayNetProfit / 1000).toFixed(0)}rb</Text>
        </View>
      </View>

      {/* Quick Action Navigation Grid (From Image 2 Reference) */}
      <View style={styles.quickGrid}>
        <TouchableOpacity style={styles.quickBtn} onPress={() => onNavigate('pos')} activeOpacity={0.8}>
          <View style={[styles.quickIconCircle, { backgroundColor: '#F7FEE7' }]}>
            <Ionicons name="qr-code" size={18} color="#0D3B23" />
          </View>
          <Text style={styles.quickBtnText}>Kasir POS</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickBtn} onPress={() => onNavigate('green')} activeOpacity={0.8}>
          <View style={[styles.quickIconCircle, { backgroundColor: '#EBF5ED' }]}>
            <Ionicons name="leaf" size={18} color="#059669" />
          </View>
          <Text style={styles.quickBtnText}>Aksi Hijau</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickBtn} onPress={() => onNavigate('sak_emkm')} activeOpacity={0.8}>
          <View style={[styles.quickIconCircle, { backgroundColor: '#EFF6FF' }]}>
            <Ionicons name="receipt" size={18} color="#1D4ED8" />
          </View>
          <Text style={styles.quickBtnText}>Buku Kas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickBtn} onPress={() => onNavigate('kur')} activeOpacity={0.8}>
          <View style={[styles.quickIconCircle, { backgroundColor: '#FEF3C7' }]}>
            <Ionicons name="business" size={18} color="#B45309" />
          </View>
          <Text style={styles.quickBtnText}>KUR Hijau</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Transactions Card */}
      <View style={styles.recentCard}>
        <View style={styles.recentHeader}>
          <View style={styles.recentTitleRow}>
            <Ionicons name="time" size={16} color="#64748B" />
            <Text style={styles.recentTitle}>Transaksi Kasir Terakhir</Text>
          </View>
          <TouchableOpacity onPress={() => onNavigate('sak_emkm')}>
            <Text style={styles.viewAllText}>Lihat Semua</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.recentList}>
          {transactions.slice(0, 3).map((tx) => (
            <View key={tx.id} style={styles.txRow}>
              <View>
                <Text style={styles.txItemName}>{tx.items[0]?.name || 'Transaksi'}</Text>
                <Text style={styles.txMeta}>{tx.time} • {tx.paymentMethod.toUpperCase()}</Text>
              </View>
              <View style={styles.txRight}>
                <Text style={[styles.txAmount, tx.total > 0 ? styles.txPlus : styles.txMinus]}>
                  {tx.total > 0 ? '+' : ''}Rp {Math.abs(tx.total).toLocaleString('id-ID')}
                </Text>
                <View style={styles.veraBadge}>
                  <Ionicons name="checkmark-circle" size={10} color="#059669" />
                  <Text style={styles.veraBadgeText}>Di-Vera-kan</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
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
    paddingBottom: 100,
  },
  metonymyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  metonymyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  shieldIconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#EBF5ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  metonymyText: {
    marginLeft: 10,
    flex: 1,
  },
  metonymyTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metonymyTitle: {
    fontSize: 12,
    fontWeight: '900',
    color: '#0F172A',
  },
  livePulse: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#84CC16',
    marginLeft: 6,
  },
  metonymySub: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
  },
  catatBtn: {
    backgroundColor: '#0D3B23',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
  },
  catatBtnText: {
    color: '#D4F82A',
    fontSize: 11,
    fontWeight: '900',
  },
  heroCard: {
    backgroundColor: '#0D3B23',
    borderRadius: 30,
    padding: 20,
    marginBottom: 18,
    shadowColor: '#0D3B23',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  heroLeft: {
    flex: 1,
  },
  scoreBadge: {
    backgroundColor: '#D4F82A',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  scoreBadgeText: {
    color: '#0D3B23',
    fontSize: 10,
    fontWeight: '900',
  },
  heroTier: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 8,
  },
  heroRank: {
    fontSize: 11,
    color: '#A7F3D0',
    marginTop: 2,
    fontWeight: '500',
  },
  donutCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: '#D4F82A',
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  donutScore: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
  },
  donutMax: {
    color: '#D4F82A',
    fontSize: 9,
    fontWeight: '700',
  },
  pillarsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.15)',
    marginBottom: 14,
  },
  pillarBox: {
    backgroundColor: 'rgba(0,0,0,0.25)',
    flex: 1,
    marginHorizontal: 3,
    paddingVertical: 8,
    borderRadius: 14,
    alignItems: 'center',
  },
  pillarLabel: {
    fontSize: 9,
    color: '#A7F3D0',
    fontWeight: '700',
  },
  pillarValue: {
    fontSize: 13,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 2,
  },
  claimBtn: {
    backgroundColor: '#D4F82A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 18,
  },
  claimBtnText: {
    color: '#0D3B23',
    fontSize: 12,
    fontWeight: '900',
    marginHorizontal: 6,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '900',
    color: '#0F172A',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionSubtitle: {
    fontSize: 10,
    fontWeight: '700',
    color: '#059669',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 12,
    flex: 1,
    marginHorizontal: 3,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statIconBox: {
    width: 32,
    height: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '700',
  },
  statValue: {
    fontSize: 13,
    fontWeight: '900',
    color: '#0F172A',
    marginTop: 2,
  },
  quickGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  quickBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 12,
    flex: 1,
    marginHorizontal: 3,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  quickIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  quickBtnText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0F172A',
  },
  recentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  recentTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recentTitle: {
    fontSize: 12,
    fontWeight: '900',
    color: '#0F172A',
    marginLeft: 6,
  },
  viewAllText: {
    fontSize: 11,
    color: '#059669',
    fontWeight: '800',
  },
  recentList: {
    gap: 8,
  },
  txRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FAF8',
    padding: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  txItemName: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
  },
  txMeta: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
  },
  txRight: {
    alignItems: 'flex-end',
  },
  txAmount: {
    fontSize: 12,
    fontWeight: '900',
  },
  txPlus: {
    color: '#059669',
  },
  txMinus: {
    color: '#E11D48',
  },
  veraBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  veraBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#059669',
    marginLeft: 3,
  },
});
