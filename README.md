# VERA: Verified Eco-Financial & Readiness Assessment
> **"Verified today, bankable tomorrow"**  
> Sub-Tema CIA 2026: **Green Fintech & Impact Investment**  
> Pilot Ecosystem: **Pasar Jambu Dua, Kota Bogor**

---

## 📌 Ringkasan Proyek

**VERA** (*Verified Eco-Financial & Readiness Assessment*) adalah platform SaaS ekosistem tri-partit yang dirancang khusus untuk pedagang pasar tradisional (studi kasus: Pasar Jambu Dua, Kota Bogor).

VERA mentransformasikan pedagang pasar yang sebelumnya *unbankable* dan mengandalkan rentenir menjadi debitur prima yang memenuhi kriteria **KUR Mikro Hijau (Bunga Subsidi 3.0% eff. p.a.)** melalui integrasi:
1. **Pencatatan Keuangan Sederhana SAK EMKM & Kasir Digital POS/QRIS**.
2. **Indikator Keberlanjutan Pasar (ESG)**: Setoran sampah organik harian ke fasilitas kompos dan substitusi kantong kresek sekali pakai dengan besek bambu/daun.
3. **Green Credit Scoring Engine**: Menghubungkan UMKM secara langsung dengan bank penyalur KUR Mikro Hijau (BSI, BRI, Bank Mandiri).

---

## 🏛️ Arsitektur Ekosistem Tri-Partit

Aplikasi diorganisasikan ke dalam 3 modul peran independen dan 1 prototipe unified:

```
Vera/
├── mobile/      # Aplikasi Mobile Pedagang (React Native + Expo SDK 58 TypeScript)
├── admin/       # Portal Web Pengelola Pasar Jambu Dua (React 19 + Vite + Tailwind v4)
├── bank/        # Terminal Underwriting Analis Bank (React 19 + Vite + Tailwind v4)
└── src/         # Unified Web Simulator (Mockup All-in-One untuk Presentasi/Demo)
```

### 1. Pedagang Mobile App (`mobile/`)
* **Target Pengguna**: Pedagang mikro lapak sayur, daging, ayam, dan sembako.
* **Fitur Utama**:
  - **Kasir POS & QRIS Dinamis**: Input transaksi cepat dengan numpad, katalog produk, dan kalkulator kembalian.
  - **Laporan Keuangan Otomatis SAK EMKM**: Laporan Laba Rugi dan Neraca instan dari buku kas harian.
  - **Timbangan Sampah Organik (Eco-Logger)**: Catat setoran sampah sayur/buah ke Rumah Kompos Blok A dengan verifikasi QR fasilitator.
  - **Simulasi KUR Mikro Hijau**: Pengajuan plafon s/d Rp 50 Jt dengan bunga subsidi 3.0%.
  - **Asisten Suara "Tanya VERA"**: Panduan interaktif audio ramah pedagang pasar tradisional.

### 2. Admin Pengelola Pasar (`admin/`)
* **Target Pengguna**: Pengelola Pasar Jambu Dua & Koordinator Lapangan *Ngariung Hub*.
* **Fitur Utama**:
  - **Antrean Validasi Lapangan**: Konfirmasi fisik setoran sampah organik dan audit kemasan ramah lingkungan pedagang.
  - **Peta Blok Pasar**: Direktori kios pedagang Blok A, B, dan C beserta status keaktifan.
  - **Integrasi Mitra**: Koneksi data ke DLH Kota Bogor, Rumah Kompos, dan Bank Mitra.
  - **Laporan Dampak ESG**: Ekspor laporan reduksi emisi karbon dan pemilahan limbah pasar.

### 3. Bank Underwriting Terminal (`bank/`)
* **Target Pengguna**: Credit Analyst & Account Officer Bank Penyalur KUR Mikro Hijau.
* **Fitur Utama**:
  - **Dossier Audit Debitur**: Verifikasi rasio DSCR (*Debt Service Coverage Ratio* > 1.3x) dan jejak mutasi QRIS.
  - **Pricing Engine Bunga Hijau**: Penentuan suku bunga subsidi 3.0% (hemat 300 bps dari KUR umum 6.0%).
  - **Penerbitan Sertifikat VERA**: Surat keputusan kelayakan kredit berstandar POJK No. 51/POJK.03/2017 siap cetak dengan tanda tangan tri-partit dan kode verifikasi QR.
  - **Kepatuhan Taksonomi Hijau Indonesia 2026**: Portofolio agregat risiko NPL 0.00%.

---

## ⚡ Cara Cepat: Jalankan 3 Platform Sekaligus (1 Perintah)

Untuk menjalankan **Unified Simulator**, **Admin Portal**, dan **Bank Terminal** sekaligus dalam 1 perintah:

```bash
# Opsi 1: Menggunakan bash script
./start.sh

# Opsi 2: Menggunakan npm
npm run dev:all
```

Server otomatis aktif di 3 port:
- 📱 **Unified Web Simulator**: [`http://localhost:3000`](http://localhost:3000)
- 🏢 **Admin Portal Pasar**: [`http://localhost:3001`](http://localhost:3001)
- 🏦 **Bank Underwriting Terminal**: [`http://localhost:3002`](http://localhost:3002)

*(Tekan `Ctrl+C` di terminal untuk menghentikan ketiga server secara bersamaan).*

---

## ⚙️ Panduan Menjalankan Per Modul (Manual)

### Prasyarat
- Node.js versi 18+ atau 20+
- npm versi 9+

---

### Opsi A: Menjalankan Unified Web Simulator (Port 3000)
Untuk demo presentasi juri/penguji dengan mockup ponsel interaktif:

```bash
# 1. Masuk root direktori
cd Vera

# 2. Install dependencies (jika belum)
npm install

# 3. Jalankan server
npm run dev
```
> Buka browser: **`http://localhost:3000`**

---

### Opsi B: Menjalankan Admin Portal Pasar (Port 3001)

```bash
cd admin
npm install
npm run dev -- --port 3001
```
> Buka browser: **`http://localhost:3001`**

---

### Opsi C: Menjalankan Bank Underwriting Terminal (Port 3002)

```bash
cd bank
npm install
npm run dev -- --port 3002
```
> Buka browser: **`http://localhost:3002`**

---

### Opsi D: Menjalankan Mobile App Pedagang (`mobile/`)

Aplikasi mobile dibangun dengan **Expo SDK 58**:

```bash
cd mobile
npm install

# Menjalankan di browser (React Native Web)
npx expo start --web

# Atau menjalankan di ponsel fisik via Expo Go (Scan QR Code)
npx expo start
```

---

## 🧮 Formula Green Credit Score VERA

Skor kredit dihitung secara algoritmik dari skala **0 s/d 100 poin**:

$$\text{Skor VERA} = (0.50 \times \text{Finansial}) + (0.30 \times \text{ESG}) + (0.20 \times \text{Digital})$$

1. **Kapasitas Finansial SAK EMKM (Bobot 50%)**:
   - Konsistensi laba operasional bulanan.
   - Rasio kemampuan membayar cicilan: $\text{DSCR} \ge 1.3\times$.
2. **Indikator Keberlanjutan / ESG (Bobot 30%)**:
   - Volume timbangan sampah organik harian tervalidasi (> 3 kg/hari).
   - Penggunaan kemasan alami (besek bambu/daun pisang) pengganti kresek.
3. **Jejak Transaksi Digital (Bobot 20%)**:
   - Rasio volume transaksi menggunakan QRIS vs tunai.
   - Kedisiplinan tutup kasir harian di aplikasi VERA.

### Matriks Insentif Bunga KUR Mikro Hijau

| Tier Skor | Rentang Skor | Suku Bunga Subsidi | Diskon Bunga | Maks. Plafon | Kategori Risiko |
|---|---|---|---|---|---|
| **Hijau Emas** | 80 – 100 | **3.0% eff. p.a.** | -300 bps | Rp 50.000.000 | Sangat Rendah |
| **Rindang** | 70 – 79 | **4.5% eff. p.a.** | -150 bps | Rp 25.000.000 | Rendah |
| **Daun** | 60 – 69 | **6.0% eff. p.a.** | 0 bps | Rp 15.000.000 | Sedang |
| **Tunas** | < 60 | Non-Eligible | Pendampingan | - | Perlu Edukasi |

---

## 👥 Persona & TOMA (*Top of Mind Awareness*)

- **Pedagang**: *"Udah di-Vera-kan transaksi hari ini?"*  
  (Menjadikan VERA kata kerja pencatatan kasir dan setoran sampah harian).
- **Analis Bank**: *"Coba lihat VERA-nya."*  
  (Menggantikan berkas fotokopi pembukuan konvensional dengan dossier digital VERA).

---

## 📜 Lisensi & Pengesahan
Dikembangkan untuk **CIA 2026** (Sub-Tema: *Green Fintech & Impact Investment*).  
Standar Kepatuhan: **SAK EMKM IAI** & **POJK No. 51/POJK.03/2017**.

