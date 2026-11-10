import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Sparkles, X, ArrowRight, CheckCircle2, Volume2, VolumeX, Bot } from 'lucide-react';
import { Transaction, GreenAction } from '../types';

interface VeraAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTransaction: (tx: Omit<Transaction, 'id' | 'invoiceNo' | 'date' | 'time' | 'isVeraVerified'>) => void;
  onAddGreenAction: (action: Omit<GreenAction, 'id' | 'status' | 'timestamp'>) => void;
  todayRevenue: number;
  todayNetProfit: number;
  greenScore: number;
}

interface Message {
  id: string;
  sender: 'user' | 'vera';
  text: string;
  time: string;
  actionTaken?: string;
}

export const VeraAssistantModal: React.FC<VeraAssistantModalProps> = ({
  isOpen,
  onClose,
  onAddTransaction,
  onAddGreenAction,
  todayRevenue,
  todayNetProfit,
  greenScore,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'vera',
      text: 'Halo Bu Siti! Saya VERA, asisten pintar lapak Anda. Ada transaksi atau aksi hijau yang mau di-Vera-kan hari ini?',
      time: '06:30',
    },
  ]);

  const speakText = (text: string) => {
    if (!speechEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 1.05;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Graceful fallback
    }
  };

  useEffect(() => {
    if (isOpen && messages.length === 1 && speechEnabled) {
      speakText(messages[0].text);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    let replyText = '';
    let actionDone = '';

    const lower = text.toLowerCase();

    if (lower.includes('catat') && (lower.includes('cabai') || lower.includes('jual') || lower.includes('transaksi'))) {
      onAddTransaction({
        items: [{ name: 'Cabai Rawit Merah (via VERA Suara)', quantity: 3, price: 55000, subtotal: 165000 }],
        total: 165000,
        paymentMethod: lower.includes('tunai') ? 'tunai' : 'qris',
        customerType: 'umum',
        sakEmkmCategory: 'pendapatan_usaha',
      });
      replyText = 'Beres Bu Siti! Transaksi Cabai Rawit 3kg Rp 165.000 sudah saya catat otomatis ke pembukuan SAK EMKM dan QRIS. Omzet bertambah!';
      actionDone = '✓ Penjualan Rp 165.000 Berhasil Di-Vera-kan';
    } else if (lower.includes('keuntungan') || lower.includes('laba') || lower.includes('omzet') || lower.includes('lihat vera')) {
      replyText = `Coba lihat VERA-nya: Hari ini omzet masuk Rp ${(todayRevenue + 165000).toLocaleString('id-ID')}, dengan laba bersih Rp ${(todayNetProfit + 65000).toLocaleString('id-ID')}. Margin sangat sehat di kisaran 41%!`;
    } else if (lower.includes('skor') || lower.includes('kur') || lower.includes('pinjaman') || lower.includes('bank')) {
      replyText = `Skor VERA Ibu saat ini ${greenScore}/100 (Tier Hijau Emas). Sudah SANGAT LAYAK (Bankable) untuk mengajukan KUR Hijau hingga Rp 35.000.000 dengan bunga subsidi 3%!`;
    } else if (lower.includes('sampah') || lower.includes('pilah') || lower.includes('organik')) {
      onAddGreenAction({
        title: 'Setoran Sampah Sayur ke Rumah Kompos',
        description: 'Penyetoran 4.8 kg sisa tangkai sayuran ke bank kompos pasar',
        category: 'pilah_organik',
        impactPoints: 15,
        proofNote: 'Diinput melalui Perintah Suara Asisten VERA',
        weightKg: 4.8,
      });
      replyText = 'Hebat Bu Siti! 4.8 kg sampah organik tercatat untuk disetor ke Rumah Kompos. Skor hijau naik +15 poin!';
      actionDone = '✓ Aksi Hijau +15 Poin Dicatat';
    } else {
      replyText = `Data "${text}" sudah saya rekam dalam catatan harian lapak Bu Siti. Transaksi hari ini makin sahih dan siap untuk audit bank!`;
    }

    const veraMsg: Message = {
      id: (Date.now() + 1).toString(),
      sender: 'vera',
      text: replyText,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      actionTaken: actionDone,
    };

    setMessages((prev) => [...prev, userMsg, veraMsg]);
    setInputText('');
    speakText(replyText);
  };

  const samplePrompts = [
    'Catat penjualan cabai rawit 3kg Rp 165.000 tunai',
    'Coba lihat VERA-nya: Berapa keuntungan bersih hari ini?',
    'Skor hijau saya sudah cukup buat KUR Hijau?',
    'Catat setoran 4.8 kg sampah sayur organik',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white border border-emerald-200 rounded-[44px] shadow-2xl overflow-hidden flex flex-col max-h-[88vh]">
        
        {/* Header - AI Buddy Vibe (Inspired by Image 2) */}
        <div className="p-5 bg-gradient-to-b from-[#F0F7F1] to-white border-b border-emerald-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Concentric Green Glowing Rings */}
            <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-lime-300 text-[#0D3B23] shadow-md">
              <span className="absolute inset-0 rounded-full bg-lime-400 opacity-40 animate-ping"></span>
              <Bot className="w-6 h-6 relative z-10" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-black text-base text-slate-900">Tanya VERA</h3>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-lime-300 text-[#0D3B23]">
                  AI Asisten
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Asisten pribadi pedagang Pasar Jambu Dua
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                const next = !speechEnabled;
                setSpeechEnabled(next);
                if (!next && typeof window !== 'undefined' && 'speechSynthesis' in window) {
                  window.speechSynthesis.cancel();
                }
              }}
              className={`p-2 rounded-full transition ${
                speechEnabled ? 'text-emerald-700 bg-emerald-100' : 'text-slate-400 bg-slate-100'
              }`}
              title={speechEnabled ? 'Suara Aktif' : 'Suara Mati'}
            >
              {speechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition font-bold"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Listening banner */}
        {isListening && (
          <div className="bg-lime-100/90 border-b border-lime-300 px-4 py-2 flex items-center justify-between text-xs text-[#0D3B23] font-bold animate-pulse">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 animate-bounce" />
              <span>Mendengarkan suara Bu Siti...</span>
            </div>
            <div className="flex gap-1">
              <span className="w-1.5 h-4 bg-[#0D3B23] rounded-full animate-pulse"></span>
              <span className="w-1.5 h-6 bg-lime-600 rounded-full animate-pulse delay-75"></span>
              <span className="w-1.5 h-3 bg-emerald-700 rounded-full animate-pulse delay-150"></span>
            </div>
          </div>
        )}

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F8FAF8]">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-[24px] px-4 py-3 text-xs leading-relaxed shadow-xs ${
                  m.sender === 'user'
                    ? 'bg-[#0D3B23] text-lime-300 font-semibold rounded-br-xs'
                    : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-xs font-medium'
                }`}
              >
                <p>{m.text}</p>
                {m.actionTaken && (
                  <div className="mt-2 pt-2 border-t border-emerald-200 flex items-center gap-1.5 text-[11px] text-emerald-800 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{m.actionTaken}</span>
                  </div>
                )}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 px-1 font-medium">{m.time}</span>
            </div>
          ))}
        </div>

        {/* Quick Suggestion Chips (Inspired by Image 2 bottom category bar) */}
        <div className="p-3 bg-white border-t border-slate-100">
          <p className="text-[11px] text-slate-500 mb-2 font-bold flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Coba klik perintah cepat ini:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {samplePrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="text-[11px] bg-[#F4F7F4] hover:bg-[#0D3B23] hover:text-lime-300 text-slate-700 px-3 py-1.5 rounded-full border border-emerald-100 font-semibold transition text-left"
              >
                "{prompt}"
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar with Microphone & Send */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setIsListening(!isListening);
              if (!isListening) {
                setTimeout(() => {
                  handleSend('Catat penjualan cabai rawit 3kg Rp 165.000 tunai');
                  setIsListening(false);
                }, 1600);
              }
            }}
            className={`p-3 rounded-2xl transition shadow-xs ${
              isListening
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-lime-300 text-[#0D3B23] hover:bg-lime-400'
            }`}
            title={isListening ? 'Hentikan' : 'Bicara'}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 font-black" />}
          </button>

          <input
            type="text"
            placeholder="Tulis pesan atau tanya VERA..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-[#F4F7F4] border border-slate-200 focus:border-emerald-500 rounded-2xl px-4 py-2.5 text-xs text-slate-900 font-medium outline-none transition"
          />

          <button
            onClick={() => handleSend()}
            disabled={!inputText.trim()}
            className="p-2.5 bg-[#0D3B23] hover:bg-emerald-900 disabled:opacity-40 text-lime-300 rounded-2xl transition shadow-md"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
};
