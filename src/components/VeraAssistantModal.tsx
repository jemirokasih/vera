import React, { useState } from 'react';
import { Mic, MicOff, Sparkles, X, ArrowRight, CheckCircle2, Volume2 } from 'lucide-react';
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
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'vera',
      text: 'Halo Bu Siti! Saya VERA, asisten pintar lapak Anda. Ada transaksi atau aksi hijau yang mau di-Vera-kan hari ini?',
      time: '06:30',
    },
  ]);

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

    // Natural Language Command Processing
    if (lower.includes('catat') && (lower.includes('cabai') || lower.includes('jual') || lower.includes('transaksi'))) {
      onAddTransaction({
        items: [{ name: 'Cabai Rawit Merah (via VERA Voice)', quantity: 3, price: 55000, subtotal: 165000 }],
        total: 165000,
        paymentMethod: lower.includes('tunai') ? 'tunai' : 'qris',
        customerType: 'umum',
        sakEmkmCategory: 'pendapatan_usaha',
      });
      replyText = 'Beres Bu Siti! Transaksi Cabai Rawit 3kg Rp 165.000 sudah saya catat otomatis ke pembukuan SAK EMKM dan QRIS. Omzet bertambah!';
      actionDone = '✓ Penjualan Rp 165.000 Di-Vera-kan';
    } else if (lower.includes('keuntungan') || lower.includes('laba') || lower.includes('omzet') || lower.includes('lihat vera')) {
      replyText = `Coba lihat VERA-nya: Hari ini omzet masuk Rp ${(todayRevenue + 165000).toLocaleString('id-ID')}, dengan perkiraan laba bersih Rp ${(todayNetProfit + 65000).toLocaleString('id-ID')}. Margin sehat di kisaran 41%!`;
    } else if (lower.includes('skor') || lower.includes('kur') || lower.includes('pinjaman') || lower.includes('bank')) {
      replyText = `Skor VERA Ibu saat ini ${greenScore}/100 (Tier Hijau Emas). Sudah SANGAT LAYAK (Bankable) untuk mengajukan KUR Hijau hingga Rp 35.000.000 dengan bunga subsidi 3%!`;
    } else if (lower.includes('sampah') || lower.includes('pilah') || lower.includes('organik')) {
      onAddGreenAction({
        title: 'Setoran Sampah Sayur ke Rumah Kompos',
        description: 'Penyetoran 5.0 kg sisa tangkai sayuran dan daun afkir ke bank kompos pasar',
        category: 'pilah_organik',
        impactPoints: 15,
        proofNote: 'Diinput melalui Perintah Suara Asisten VERA',
        weightKg: 5.0,
      });
      replyText = 'Hebat Bu Siti! 5 kg sampah organik tercatat untuk disetor ke Rumah Kompos. Skor hijau naik +15 poin!';
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
  };

  const samplePrompts = [
    'Catat penjualan cabai rawit 3kg Rp 165.000 tunai',
    'Coba lihat VERA-nya: Berapa keuntungan bersih hari ini?',
    'Skor hijau saya sudah cukup buat KUR Hijau?',
    'Catat setoran 5 kg sampah sayur organik',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-emerald-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header with Glowing Siri/Alexa-like orb */}
        <div className="relative p-5 bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-950 border-b border-emerald-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Visual Waveform Orb */}
            <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-400/40 overflow-hidden shadow-lg shadow-emerald-500/20">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/30 to-amber-400/30 animate-pulse-glow"></div>
              <Sparkles className="w-6 h-6 text-emerald-400 relative z-10" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-white">Tanya VERA</h3>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  AI Human-Tech
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Asisten pribadi pedagang Pasar Jambu Dua
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Ambient Wave Animation when "Listening" */}
        {isListening && (
          <div className="bg-emerald-950/40 border-b border-emerald-500/30 px-4 py-2 flex items-center justify-between text-xs text-emerald-300 animate-pulse">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-emerald-400 animate-bounce" />
              <span>Mendengarkan suara Bu Siti... (Katakan: "Vera, catat...")</span>
            </div>
            <div className="flex gap-1">
              <span className="w-1.5 h-4 bg-emerald-400 rounded-full animate-pulse"></span>
              <span className="w-1.5 h-6 bg-emerald-300 rounded-full animate-pulse delay-75"></span>
              <span className="w-1.5 h-3 bg-emerald-500 rounded-full animate-pulse delay-150"></span>
            </div>
          </div>
        )}

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-md ${
                  m.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-xs'
                    : 'bg-slate-800/90 text-slate-100 border border-emerald-500/20 rounded-bl-xs'
                }`}
              >
                <p>{m.text}</p>
                {m.actionTaken && (
                  <div className="mt-2 pt-2 border-t border-emerald-500/30 flex items-center gap-1.5 text-xs text-emerald-300 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{m.actionTaken}</span>
                  </div>
                )}
              </div>
              <span className="text-[10px] text-slate-500 mt-1 px-1">{m.time}</span>
            </div>
          ))}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-3 bg-slate-950/60 border-t border-slate-800">
          <p className="text-[11px] text-slate-400 mb-2 font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            Coba klik perintah cepat ini:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {samplePrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="text-xs bg-slate-800 hover:bg-emerald-950/70 hover:border-emerald-500/50 hover:text-emerald-300 text-slate-300 px-2.5 py-1.5 rounded-lg border border-slate-700/60 transition text-left"
              >
                "{prompt}"
              </button>
            ))}
          </div>
        </div>

        {/* Input & Microphone Bar */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
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
            className={`p-3 rounded-xl transition shadow-md ${
              isListening
                ? 'bg-rose-600 text-white animate-pulse'
                : 'bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white border border-emerald-500/30'
            }`}
            title={isListening ? 'Hentikan Mendengar' : 'Tekan & Bicara ke VERA'}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <input
            type="text"
            placeholder="Tulis pesan atau tanya ke VERA..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition"
          />

          <button
            onClick={() => handleSend()}
            disabled={!inputText.trim()}
            className="p-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:hover:bg-emerald-600 text-white rounded-xl transition shadow-md shadow-emerald-950"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
};
