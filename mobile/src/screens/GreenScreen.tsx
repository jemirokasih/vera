import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GreenAction, Merchant } from '../types';

interface GreenScreenProps {
  merchant: Merchant;
  greenActions: GreenAction[];
  onAddAction: (title: string, weight: number, note: string) => void;
}

export const GreenScreen: React.FC<GreenScreenProps> = ({
  merchant,
  greenActions,
  onAddAction,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('Pilah Sampah Sayuran Organik');
  const [weight, setWeight] = useState('4.8');
  const [note, setNote] = useState('Disetor ke Rumah Kompos Blok A');

  const handleSave = () => {
    const w = parseFloat(weight) || 4.5;
    onAddAction(title, w, note);
    setModalOpen(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.topRow}>
          <View>
            <Text style={styles.screenTitle}>Misi Pasar Bersih</Text>
            <Text style={styles.screenSub}>Tukar aksi hijau jadi poin bunga murah!</Text>
          </View>
          <TouchableOpacity style={styles.addBtn} onPress={() => setModalOpen(true)}>
            <Ionicons name="add" size={14} color="#D4F82A" />
            <Text style={styles.addBtnText}>Catat Aksi</Text>
          </TouchableOpacity>
        </View>

        {/* Impact Banner */}
        <View style={styles.impactCard}>
          <View style={styles.impactIconRow}>
            <View style={styles.impactIcon}>
              <Ionicons name="leaf" size={16} color="#0D3B23" />
            </View>
            <Text style={styles.impactTitle}>Dampak Hijau Lapak Bu Siti</Text>
          </View>
          <Text style={styles.impactNumber}>
            {merchant.organicWasteKgMonth} <Text style={styles.impactUnit}>kg sampah</Text>
          </Text>
          <Text style={styles.impactDesc}>
            Teralihkan dari TPA Galuga ke Rumah Kompos Jambu Dua. Nilai keberlanjutan mendongkrak skor kredit Anda!
          </Text>
        </View>

        {/* Checklist Riwayat */}
        <Text style={styles.sectionTitle}>Validasi Fasilitator Lapangan</Text>
        <View style={styles.actionList}>
          {greenActions.map((ga) => (
            <View key={ga.id} style={styles.actionCard}>
              <View style={styles.actionHeader}>
                <View style={styles.actionTitleBox}>
                  <Text style={styles.actionTitle}>{ga.title}</Text>
                  <Text style={styles.actionDesc}>{ga.description}</Text>
                </View>
                <View style={styles.pointsBadge}>
                  <Text style={styles.pointsText}>+{ga.impactPoints} Poin</Text>
                </View>
              </View>

              <View style={styles.actionFooter}>
                <Text style={styles.actionTime}>{ga.timestamp}</Text>
                <View style={[styles.statusBadge, ga.status === 'verified' ? styles.statusVerified : styles.statusPending]}>
                  <Text style={[styles.statusText, ga.status === 'verified' ? styles.statusTextVerified : styles.statusTextPending]}>
                    {ga.status === 'verified' ? '✓ Terverifikasi Fasilitator' : '⏳ Menunggu Timbang'}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>

      {/* Modal Catat Aksi Hijau */}
      <Modal visible={modalOpen} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalTop}>
              <Text style={styles.modalHeading}>Catat Aksi Pasar Bersih</Text>
              <TouchableOpacity onPress={() => setModalOpen(false)}>
                <Ionicons name="close" size={20} color="#64748B" />
              </TouchableOpacity>
            </View>

            <Text style={styles.fieldLabel}>Pilihan Aksi:</Text>
            <View style={styles.optionRow}>
              {['Pilah Sampah Sayur', 'Besek & Daun Pisang'].map((opt) => (
                <TouchableOpacity
                  key={opt}
                  style={[styles.optBtn, title.includes(opt.split(' ')[0]) && styles.optBtnActive]}
                  onPress={() => setTitle(opt)}
                >
                  <Text style={[styles.optText, title.includes(opt.split(' ')[0]) && styles.optTextActive]}>{opt}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.fieldLabel}>Timbangan / Jumlah (Kg):</Text>
            <TextInput
              style={styles.modalInput}
              keyboardType="numeric"
              placeholder="Contoh 4.8"
              placeholderTextColor="#94A3B8"
              value={weight}
              onChangeText={setWeight}
            />

            <Text style={styles.fieldLabel}>Catatan Lokasi Setor:</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Misal: Pos Timbang Blok A"
              placeholderTextColor="#94A3B8"
              value={note}
              onChangeText={setNote}
            />

            <TouchableOpacity style={styles.submitActionBtn} onPress={handleSave}>
              <Text style={styles.submitActionText}>Kirim ke Fasilitator & Tambah Poin</Text>
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
    color: '#059669',
    fontWeight: '700',
    marginTop: 1,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0D3B23',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 16,
    gap: 4,
  },
  addBtnText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#D4F82A',
  },
  impactCard: {
    backgroundColor: '#0D3B23',
    borderRadius: 28,
    padding: 18,
    marginBottom: 18,
  },
  impactIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  impactIcon: {
    backgroundColor: '#D4F82A',
    padding: 4,
    borderRadius: 8,
  },
  impactTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#D1FAE5',
  },
  impactNumber: {
    fontSize: 28,
    fontWeight: '900',
    color: '#D4F82A',
  },
  impactUnit: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  impactDesc: {
    fontSize: 11,
    color: '#A7F3D0',
    marginTop: 6,
    lineHeight: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  actionList: {
    gap: 10,
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  actionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  actionTitleBox: {
    flex: 1,
    marginRight: 10,
  },
  actionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  actionDesc: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  pointsBadge: {
    backgroundColor: '#F7FEE7',
    borderWidth: 1,
    borderColor: '#D4F82A',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  pointsText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#0D3B23',
  },
  actionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 8,
  },
  actionTime: {
    fontSize: 10,
    color: '#94A3B8',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  statusVerified: {
    backgroundColor: '#EBF5ED',
  },
  statusPending: {
    backgroundColor: '#FEF3C7',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
  },
  statusTextVerified: {
    color: '#059669',
  },
  statusTextPending: {
    color: '#B45309',
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
  modalHeading: {
    fontSize: 15,
    fontWeight: '900',
    color: '#0F172A',
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 6,
  },
  optionRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  optBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: '#F8FAF8',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  optBtnActive: {
    backgroundColor: '#0D3B23',
    borderColor: '#0D3B23',
  },
  optText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  optTextActive: {
    color: '#D4F82A',
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
  submitActionBtn: {
    backgroundColor: '#0D3B23',
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 4,
  },
  submitActionText: {
    color: '#D4F82A',
    fontSize: 12,
    fontWeight: '900',
  },
});
