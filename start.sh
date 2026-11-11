#!/bin/bash

# VERA: Verified Eco-Financial & Readiness Assessment
# Script untuk menjalankan ketiga platform web sekaligus:
# 1. Unified Simulator   -> http://localhost:3000
# 2. Admin Portal Pasar  -> http://localhost:3001
# 3. Bank Terminal       -> http://localhost:3002

echo ""
echo "=========================================================="
echo "  🌿 VERA ECOSYSTEM: Menjalankan 3 Platform Sekaligus"
echo "=========================================================="
echo "  [1] UNIFIED SIMULATOR : http://localhost:3000"
echo "  [2] ADMIN PASAR       : http://localhost:3001"
echo "  [3] BANK TERMINAL     : http://localhost:3002"
echo "=========================================================="
echo "  Tekan Ctrl+C untuk menghentikan semua server."
echo ""

# Bersihkan port jika ada proses gantung sebelumnya (opsional safe check)
for port in 3000 3001 3002; do
  pid=$(lsof -ti :$port 2>/dev/null)
  if [ -n "$pid" ]; then
    echo "⚠️  Membersihkan proses lama di port $port (PID: $pid)..."
    kill -9 $pid 2>/dev/null
  fi
done

# Jalankan ketiga server secara paralel dengan concurrently
npm run dev:all

