import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Message {
  id: string;
  sender: 'user' | 'vera';
  text: string;
  actionTaken?: string;
}

interface VeraAssistantModalProps {
  visible: boolean;
  onClose: () => void;
  onRecordSale: (amount: number, note: string) => void;
  onRecordGreenAction: (weight: number) => void;
  todayRevenue: number;
  todayNetProfit: number;
  greenScore: number;
}

export const VeraAssistantModal: React.FC<VeraAssistantModalProps> = ({
  visible,
  onClose,
  onRecordSale,
  onRecordGreenAction,
  todayRevenue,
  todayNetProfit,
  greenScore,
}) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'vera',
      text: 'Halo Bu Siti! Saya VERA, asisten pintar lapak Anda. Ada transaksi atau aksi hijau yang mau di-Vera-kan hari ini?',
    },
  ]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text };
    let reply = '';
    let actionDone = '';

    const lower = text.toLowerCase();
    if (lower.includes('cabai') || lower.includes('catat') || lower.includes('jual')) {
      onRecordSale(165000, 'Cabai Rawit 3kg (via Voice VERA)');
      reply = 'Beres Bu Siti! Penjualan Cabai Rawit 3kg Rp 165.000 sudah saya catat otomatis ke pembukuan SAK EMKM dan QRIS!';
      actionDone = '✓ Penjualan Rp 165.000 Di-Vera-kan';
    } else if (lower.includes('untung') || lower.includes('laba') || lower.includes('lihat vera')) {
      reply = `Coba lihat VERA-nya: Omzet hari ini Rp ${(todayRevenue + 165000).toLocaleString('id-ID')}, perkiraan laba bersih Rp ${(todayNetProfit + 65000).toLocaleString('id-ID')}. Margin sehat 41%!`;
    } else if (lower.includes('skor') || lower.includes('kur')) {
      reply = `Skor VERA Ibu saat ini ${greenScore}/100 (Tier Hijau Emas). Sudah SANGAT LAYAK (Bankable) untuk mengajukan KUR Hijau bunga 3%!`;
    } else if (lower.includes('sampah') || lower.includes('pilah')) {
      onRecordGreenAction(4.8);
      reply = 'Hebat Bu Siti! 4.8 kg sampah organik sayur tercatat disetor ke Rumah Kompos. Skor hijau naik +15 poin!';
      actionDone = '✓ Aksi Hijau +15 Poin Dicatat';
    } else {
      reply = `Data "${text}" sudah saya rekam dalam catatan harian lapak Bu Siti. Transaksi makin sahih siap audit bank!`;
    }

    const veraMsg: Message = { id: (Date.now() + 1).toString(), sender: 'vera', text: reply, actionTaken: actionDone };
    setMessages((prev) => [...prev, userMsg, veraMsg]);
    setInput('');
  };

  const prompts = [
    'Catat penjualan cabai rawit 3kg Rp 165.000 tunai',
    'Coba lihat VERA-nya: Berapa keuntungan hari ini?',
    'Skor hijau saya sudah cukup buat KUR?',
    'Catat setoran 4.8 kg sampah sayur organik',
  ];

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          
          {/* Header with concentric circles */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.botCircleOuter}>
                <View style={styles.botCircleInner}>
                  <Ionicons name="sparkles" size={16} color="#0D3B23" />
                </View>
              </View>
              <View style={styles.headerTitles}>
                <View style={styles.titleRow}>
                  <Text style={styles.titleText}>Tanya VERA</Text>
                  <View style={styles.aiTag}>
                    <Text style={styles.aiTagText}>AI Asisten</Text>
                  </View>
                </View>
                <Text style={styles.subText}>Asisten pintar pedagang Pasar Jambu Dua</Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          {/* Messages List */}
          <ScrollView style={styles.msgScroll} contentContainerStyle={styles.msgContainer}>
            {messages.map((m) => (
              <View key={m.id} style={[styles.bubbleWrap, m.sender === 'user' ? styles.bubbleUserWrap : styles.bubbleVeraWrap]}>
                <View style={[styles.bubble, m.sender === 'user' ? styles.bubbleUser : styles.bubbleVera]}>
                  <Text style={[styles.bubbleText, m.sender === 'user' ? styles.bubbleTextUser : styles.bubbleTextVera]}>
                    {m.text}
                  </Text>
                  {m.actionTaken && (
                    <View style={styles.actionBanner}>
                      <Ionicons name="checkmark-circle" size={12} color="#059669" />
                      <Text style={styles.actionText}>{m.actionTaken}</Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Prompt Chips */}
          <View style={styles.chipsRow}>
            <Text style={styles.chipsLabel}>Perintah Cepat:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsScroll}>
              {prompts.map((p, i) => (
                <TouchableOpacity key={i} style={styles.promptChip} onPress={() => handleSend(p)}>
                  <Text style={styles.promptChipText}>"{p}"</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Input Bar */}
          <View style={styles.inputBar}>
            <TouchableOpacity style={styles.micBtn} onPress={() => handleSend('Catat penjualan cabai rawit 3kg Rp 165.000 tunai')}>
              <Ionicons name="mic" size={18} color="#0D3B23" />
            </TouchableOpacity>
            <TextInput
              style={styles.chatInput}
              placeholder="Tulis pesan atau tanya VERA..."
              placeholderTextColor="#94A3B8"
              value={input}
              onChangeText={setInput}
              onSubmitEditing={() => handleSend()}
            />
            <TouchableOpacity style={styles.sendBtn} onPress={() => handleSend()}>
              <Ionicons name="arrow-forward" size={16} color="#D4F82A" />
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
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingTop: 16,
    paddingBottom: 24,
    maxHeight: '85%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  botCircleOuter: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F7FEE7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botCircleInner: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#D4F82A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitles: {
    gap: 2,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  titleText: {
    fontSize: 15,
    fontWeight: '900',
    color: '#0F172A',
  },
  aiTag: {
    backgroundColor: '#D4F82A',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  aiTagText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#0D3B23',
  },
  subText: {
    fontSize: 10,
    color: '#64748B',
  },
  closeBtn: {
    padding: 6,
  },
  msgScroll: {
    maxHeight: 280,
    paddingHorizontal: 16,
  },
  msgContainer: {
    paddingVertical: 12,
    gap: 10,
  },
  bubbleWrap: {
    width: '100%',
  },
  bubbleUserWrap: {
    alignItems: 'flex-end',
  },
  bubbleVeraWrap: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '85%',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  bubbleUser: {
    backgroundColor: '#0D3B23',
    borderBottomRightRadius: 4,
  },
  bubbleVera: {
    backgroundColor: '#F8FAF8',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderBottomLeftRadius: 4,
  },
  bubbleText: {
    fontSize: 12,
    lineHeight: 18,
  },
  bubbleTextUser: {
    color: '#D4F82A',
    fontWeight: '700',
  },
  bubbleTextVera: {
    color: '#0F172A',
    fontWeight: '500',
  },
  actionBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  actionText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#059669',
  },
  chipsRow: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  chipsLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748B',
    marginBottom: 6,
  },
  chipsScroll: {
    gap: 6,
  },
  promptChip: {
    backgroundColor: '#F8FAF8',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  promptChipText: {
    fontSize: 11,
    color: '#0F172A',
    fontWeight: '600',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 8,
  },
  micBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D4F82A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#F8FAF8',
    borderRadius: 20,
    paddingHorizontal: 14,
    fontSize: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    color: '#0F172A',
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0D3B23',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

