# 👶 Makanan Bayi & MPASI Mamachy - Website Blog Profesional

Selamat datang di repository resmi **Makanan Bayi & MPASI Mamachy**! Website ini dibangun dari NOL menggunakan teknologi modern super cepat (**Astro v4 + Tailwind CSS + Notion CMS + TypeScript**).

---

## 🚀 Panduan Setup Notion CMS (Untuk Pemula / Non-IT)

Website ini menggunakan Notion sebagai Headless CMS (Content Management System). Kamu bisa menulis artikel langsung dari aplikasi Notion, dan artikel akan otomatis tampil di website!

### Langkah 1: Buat Database di Notion

1. Buka aplikasi Notion atau [notion.so](https://notion.so).
2. Buat halaman baru, lalu pilih **Full page database** (atau `/table`).
3. Beri nama Database kamu, contoh: `Blog Makanan Bayi`.
4. Tambahkan properti dengan nama & tipe data berikut (WAJIB PERSIS):

| Nama Properti | Tipe Properti di Notion | Keterangan |
| :--- | :--- | :--- |
| **Title** | `Title` | Judul Artikel (Contoh: Panduan MPASI 6 Bulan) |
| **Slug** | `Text` | URL unik artikel (Contoh: `panduan-mpasi-6-bulan`) |
| **Status** | `Select` | Pilihan: `Draft` atau `Published` |
| **Date** | `Date` | Tanggal publikasi artikel |
| **Tags** | `Multi-select` | Kategori (Contoh: `MPASI 6 Bulan`, `Nutrisi Bayi`, `Zat Besi`) |
| **Excerpt** | `Text` | Ringkasan singkat artikel (150-160 karakter untuk SEO) |
| **Cover** | `Files & media` | Gambar sampul utama artikel |

---

### Langkah 2: Cara Mendapatkan `NOTION_TOKEN` (Integration Secret)

1. Buka link [Notion Integrations](https://www.notion.so/my-integrations).
2. Klik tombol **"+ New integration"**.
3. Isi nama integrasi, contoh: `Integrasi Website Makanan Bayi`.
4. Pilih Workspace kamu, lalu klik **Submit**.
5. Salin **Internal Integration Secret** (Kodenya diawali `secret_xxxxxxxx...`). Simpan ini sebagai `NOTION_TOKEN`.

---

### Langkah 3: Cara Mendapatkan `NOTION_DATABASE_ID`

1. Buka halaman Database Notion yang sudah kamu buat di Langkah 1 melalui browser.
2. Lihat link URL di browser. Format URL Notion adalah:
   `https://www.notion.so/myworkspace/a8b2c3d4e5f67890a8b2c3d4e5f67890?v=...`
3. Salin 32 karakter unik di antara nama workspace dan tanda tanya `?` (Contoh: `a8b2c3d4e5f67890a8b2c3d4e5f67890`). Ini adalah `NOTION_DATABASE_ID` kamu.
4. **Penting:** Hubungkan integrasi ke database:
   - Di kanan atas halaman Database Notion, klik ikon titik tiga `...` -> **Connections** / **Hubungkan**.
   - Cari nama integrasi yang kamu buat di Langkah 2, lalu klik **Confirm**.

---

## 💻 Cara Jalankan Website di Lokal (Komputer Sendiri)

### 1. Install Dependencies
Buka Terminal / Command Prompt di folder project, lalu jalankan:
```bash
npm install
```

### 2. Konfigurasi File `.env`
Duplikasi file `.env.example` menjadi file `.env`:
```bash
cp .env.example .env
```
Isi variabel di file `.env` dengan token kamu:
```env
NOTION_TOKEN=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=a8b2c3d4e5f67890a8b2c3d4e5f67890
```

> **Catatan:** Jika `.env` belum diisi, website secara otomatis menggunakan **Mock Fallback Data** sehingga kamu tetap bisa mencoba & melihat tampilan website dengan lancar!

### 3. Jalankan Server Lokal
```bash
npm run dev
```
Buka browser dan akses: `http://localhost:4321` 🎉

---

## 📤 Cara Push ke GitHub

1. Buat repository baru di [GitHub](https://github.com/new) dengan nama `makanan-bayi`.
2. Jalankan perintah berikut di terminal komputer kamu:
```bash
git init
git add .
git commit -m "Initial commit Website Makanan Bayi MPASI Mamachy"
git branch -M main
git remote add origin https://github.com/USERNAME_KAMU/makanan-bayi.git
git push -u origin main
```

---

## 🌐 Cara Deploy ke Vercel

1. Login / buat akun di [Vercel](https://vercel.com).
2. Klik **"Add New..."** -> **"Project"**.
3. Hubungkan akun GitHub kamu dan pilih repository `makanan-bayi`.
4. Pada bagian **Environment Variables**, tambahkan 2 variabel berikut:
   - **Key:** `NOTION_TOKEN` | **Value:** `secret_xxxxxxxx...`
   - **Key:** `NOTION_DATABASE_ID` | **Value:** `a8b2c3d4e5f67890...`
5. Klik **"Deploy"**. Dalam hitungan detik, website kamu siap online!

---

## 🏆 Fitur & SEO Super Lengkap yang Diterapkan

- **Technical SEO**: Sitemap XML otomatis (`@astrojs/sitemap`), Robots.txt dinamis, Canonical tag, Preconnect Google Fonts.
- **On-Page SEO**: H1 tunggal teroptimasi di homepage, JSON-LD Structured Data (`Article`, `BreadcrumbList`, `Organization`), Meta Description 160 karakter.
- **Performance & CWV**: Alt text otomatis & `loading="lazy"` pada gambar Notion, swap font display, tanpa render-blocking scripts.
- **Desain & UX**: Estetika modern pink & putih untuk mama muda, 100% responsive mobile-first, Dark & Light mode toggle.
- **Internal Linking**: Modul 3 Artikel Terkait otomatis berdasarkan kesamaan Tag dari Notion CMS.
