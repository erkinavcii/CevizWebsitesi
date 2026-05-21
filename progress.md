# 🌰 Ceviz Bahçesi E-Ticaret Projesi — Kurşun Geçirmez İlerleme Planı

> **Son Güncelleme:** 21 Mayıs 2026  
> **Vizyon:** "Bahçemizden Sofranıza" — Aracısız, şeffaf, sürdürülebilir bir üretici-tüketici köprüsü.

---

## 📌 Proje Özeti

| Alan | Detay |
|------|-------|
| **İş Modeli** | D2C (Direct-to-Consumer / Üreticiden Tüketiciye) |
| **Hedef Kitle** | Organik/doğal gıdaya ilgi duyan, 25-55 yaş, şehirli, bilinçli tüketici |
| **Temel Değer Önerisi** | Aracı yok → daha ucuz; üretici belli → güven; taze hasat → kalite |
| **Kısa Vade Hedef** | 6 ayda 500+ aktif müşteri, ortalama sepet 350₺ |
| **Uzun Vade Hedef** | Tekrar satın alma oranını artırmak, bahçe deneyim turları, yeni ürün kategorileri |

---

## 🛠 Mimari ve Teknoloji Yığını

```
┌─────────────────────────────────────────────────┐
│                   FRONTEND                       │
│  Next.js 14 (App Router) + TypeScript            │
│  Tailwind CSS + shadcn/ui + Framer Motion        │
│  next/image (WebP/AVIF) + PWA (next-pwa)        │
└──────────────────┬──────────────────────────────┘
                   │ HTTPS / REST + WebSockets
┌──────────────────▼──────────────────────────────┐
│                   BACKEND                        │
│  FastAPI (Python) — async, yüksek performans     │
│  PostgreSQL + Redis (cache/session)              │
│  SQLAlchemy ORM + Alembic (migrasyon)            │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│              ÜÇÜNCÜ TARAF SERVİSLER              │
│  Ödeme: Iyzico (TR) / Stripe (uluslararası)      │
│  Kargo: Aras/Yurtiçi/MNG API                     │
│  Muhasebe: Paraşüt veya Logo İşbaşı API          │
│  SMS: Netgsm veya Twilio                         │
│  Email: Resend veya SendGrid                     │
│  Otomasyon: n8n (self-hosted, Render üzerinde)   │
│  AI: Gemini API (içerik + müşteri botu)          │
└─────────────────────────────────────────────────┘
```

**Hosting Stratejisi (Sıfır Maliyetli / En Ucuz Yaklaşım):**
- **Web App (Frontend + Backend):** Vercel — **Tamamen Ücretsiz**. Next.js API Route'ları Serverless Functions olarak Vercel üzerinde ek ücret ödemeden çalışır. Cold start (soğuk başlama) sorunu neredeyse yoktur.
- **Veritabanı:** Neon.tech (Serverless PostgreSQL) — **Ücretsiz Tier**. 0.5gb depolama ve sınırsız veritabanı bağlantısı sunar, bizim ölçeğimiz için fazlasıyla yeterlidir.
- **n8n:** Railway.app üzerinde Docker (~5$/ay) veya Render'da starter paket.
- **Medya/Görseller:** Next.js `/public` klasörü veya ücretsiz bir görsel CDN'i.

> 💡 **Maliyet Notu:** Bu mimari sayesinde aylık sabit sunucu giderimiz **0 TL** (n8n'i lokalde veya en ucuz Railway paketinde çalıştırırsak maksimum 150-200 TL) olacaktır. Agır ve pahalı sunucu altyapılarına hiç gerek yoktur.

---

## ✅ FAZ 0: Ön Koşul — Hızlı Durum Tespiti

> Kodlamaya başlamadan önce bunlar netleşmeli.

- [ ] **Ürün envanteri belirlenmesi:**
  - Kaç çeşit ürün? (Kabuklu, iç, vakumlu, karışık paket, çerezlik vb.)
  - Sezonluk stok miktarı (tahmini kg cinsinden)
  - Hasat ayı ve stok tükenme takvimi (hangi ay ne kadar ürün kalır?)
- [ ] **Ticari durum netleştirilmesi:**
  - Şahıs şirketi mi var, yoksa kurulacak mı?
  - Banka hesabı / IBAN ticari mi?
- [ ] **Marka kararı:**
  - İsim, slogan ve renk paleti üzerine beyin fırtınası
  - Domain adı araştırması ve tescil (örn: `cevizim.com.tr`, `bahceceviz.com`)
- [ ] **Fotoğraf/video varlıkları:**
  - Bahçe fotoğrafları (ham/yüksek çözünürlük) temin edilmesi
  - Kısa tanıtım videosu (telefon kamerası yeterli, sonra düzenlenecek)

---

## ⚖️ FAZ 1: Yasal ve Finansal Hazırlık

> **⚠️ Bu faz atlanırsa Iyzico canlıya almaz ve yasal risk doğar.**

### 1.1 Şirket ve Vergi Dairesi
- [ ] **Önce araştırılacak:** Çiftçi belgesi (Tarım İl Müdürlüğü) ile e-ticaret yapılıp yapılamayacağını, vergi muafiyeti imkânlarını danışmana sor
- [ ] Eğer çiftçi belgesiyle yeterli değilse → şahıs şirketi kurulumu (e-devlet üzerinden kolay)
- [ ] Vergi dairesi kaydı, basit usul mükellefiyet (düşük ciro için uygun)
- [ ] ~~Limitet şirket~~ — **gerek yok**, şahıs/çiftçi yeterli

### 1.2 E-Ticaret Yasal Kayıtları (Türkiye Spesifik)
- [ ] **ETBİS Kaydı:** Ticaret Bakanlığı ETBIS sistemine kayıt (`etbis.eticaret.gov.tr`)
- [ ] Yıllık beyanname yükümlülüğünün takvime işlenmesi

### 1.3 Yasal Metinler (Sitede Zorunlu)
- [ ] **Mesafeli Satış Sözleşmesi** — hukukçu/danışman onaylı
- [ ] **İptal ve İade Koşulları** — 14 günlük cayma hakkı dahil
- [ ] **KVKK Aydınlatma Metni** — kişisel veri işleme gerekçeleri
- [ ] **Çerez (Cookie) Politikası** — banner ve onay mekanizması
- [ ] **Gizlilik Politikası**

### 1.4 Finansal Altyapı
- [ ] Ticari banka hesabı açılması
- [ ] Iyzico başvurusu ve doküman teslimi (yukarıdaki metinler olmadan onay gelmez)
- [ ] Muhasebe yazılımı seçimi (Paraşüt tavsiye edilir — API'si iyi)
- [ ] E-fatura / e-arşiv fatura aktivasyonu (GİB üzerinden)

---

## 🎨 FAZ 2: Marka Kimliği ve Tasarım Sistemi

### 2.1 Marka Kimliği
- [ ] **Logo tasarımı:** Ceviz yapraklı, toprak tonlarında, sade ve organik his
- [ ] **Renk paleti:**
  ```
  Birincil:  #5C4033 (Koyu Kahve — ceviz kabuğu)
  İkincil:   #8B6914 (Altın Amber — iç ceviz)
  Nötr:      #F5F0E8 (Krem Beyaz — doğal kağıt)
  Vurgu:     #4A7C59 (Yaprak Yeşili — organik)
  Koyu:      #1C1410 (Gece — tipografi)
  ```
- [ ] **Tipografi:** `Playfair Display` (başlıklar, premium his) + `Inter` (gövde metni)
- [ ] **Fotoğraf stili:** Doğal ışık, ahşap yüzeyler, eller, toprak

### 2.2 Figma Prototipleri
- [ ] Ana sayfa wireframe'i
- [ ] Ürün detay sayfası wireframe'i
- [ ] Checkout akışı (3 adım: Sepet → Teslimat → Ödeme)
- [ ] Admin dashboard wireframe'i (baba için sade mobil görünüm)
- [ ] Mobile-first tasarım kontrolü (360px, 390px, 430px)

### 2.3 Sayfa Haritası (Sitemap)
```
/ (Ana Sayfa)
├── /urunler (Ürün Kataloğu)
│   └── /urunler/[slug] (Ürün Detayı)
├── /hikayemiz (Hakkımızda / Bahçe Hikayesi)
├── /blog
│   ├── /blog/cevizli-tarifler
│   └── /blog/ceviz-nasil-saklanir
├── /sepet
├── /odeme (Checkout — /odeme/teslimat, /odeme/odeme, /odeme/onay)
├── /hesabim
│   ├── /hesabim/siparislerim
│   └── /hesabim/adreslerim
├── /iletisim
└── (Yasal)
    ├── /kvkk
    ├── /mesafeli-satis-sozlesmesi
    ├── /iade-politikasi
    └── /cerez-politikasi
```

---

## 🔧 FAZ 3: Proje Kurulumu ve DevOps

### 3.1 Repository ve CI/CD
- [ ] GitHub single repository (`ceviz-website` — monorepo'ya gerek yok!)
- [ ] `.env.example` dosyası (Vercel ve local geliştirme için şablon)
- [ ] GitHub Actions veya direkt Vercel Git Entegrasyonu (Push edildikçe otomatik canlıya alma)
- [ ] Pre-commit hooks (ESLint, Prettier)

### 3.2 Proje Kurulumu (Next.js + Prisma/Drizzle)
```bash
npx create-next-app@latest ceviz-website --typescript --tailwind --app --src-dir
```
- [ ] Tailwind config → özel marka renkleri, fontlar
- [ ] shadcn/ui kurulumu ve temel bileşenler
- [ ] Framer Motion entegrasyonu
- [ ] next-pwa entegrasyonu (PWA desteği)
- [ ] Prisma veya Drizzle ORM kurulumu (Neon.tech PostgreSQL bağlantısı için)
- [ ] `next-sitemap` paketi

### 3.3 Database Kurulumu (Neon.tech)
- [ ] Neon.tech hesabı açılması ve ücretsiz PostgreSQL projesi oluşturulması
- [ ] Connection String alınması (Serverless driver veya normal pooling URL'i)
- [ ] Prisma/Drizzle schema dosyasının oluşturulması ve Neon'a push edilmesi (`npx prisma db push`)
- [ ] Local test verilerinin (seed data) yüklenmesi

---

## 💻 FAZ 4: Frontend Geliştirme

### 4.1 Tasarım Sistemi ve Ortak Bileşenler
- [ ] `Button`, `Card`, `Badge`, `Input`, `Modal`, `Toast` bileşenleri
- [ ] `Navbar` (mobil hamburger + masaüstü) ve `Footer`
- [ ] `ProductCard` — fiyat, ağırlık seçimi, sepete ekle
- [ ] `QuantitySelector`, `StarRating`, `ReviewCard`
- [ ] Sayfa geçiş animasyonları (Framer Motion layout transitions)

### 4.2 Ana Sayfa (`/`)
- [ ] **Hero Section:**
  - Tam ekran video veya parallax fotoğraf (bahçeden)
  - Yazı animasyonu: "Bahçemizden Sofranıza, Aracısız"
  - CTA butonu: "Ürünleri İncele" + "Hikayemizi Oku"
- [ ] **Öne Çıkan Ürünler** — en çok satan 3-4 ürün kartı
- [ ] **Hikaye Özeti** — babanın fotoğrafı, kısa metin, güven unsurları
- [ ] **Neden Biz?** — ikonlu 4-6 özellik (Doğal, Taze, Aracısız, Garantili)
- [ ] **Sosyal Kanıt** — müşteri yorumları carousel (fotoğraflı)
- [ ] **Analiz Sertifikaları** — PDF görüntüleme/indirme (ilaçsız tarım kanıtı)
- [ ] **Hasat Takvimi Widget'ı** — "Bu yılın hasadı: Ekim 2026, ön sipariş açık"
- [ ] **Instagram Feed** — bahçenin son 6 gönderisi (Meta Graph API)
- [ ] **Blog/Tarif Önizlemesi** — son 3 blog yazısı
- [ ] **Haber Bülteni (Newsletter)** — e-posta abone formu

### 4.3 Ürün Sayfaları
- [ ] **Katalog (`/urunler`):**
  - Filtreleme: çeşit, fiyat aralığı, stok durumu
  - Sıralama: fiyat, popülerlik, yenilik
  - Grid/Liste görünümü geçişi
- [ ] **Ürün Detayı (`/urunler/[slug]`):**
  - Çoklu ürün görseli + zoom
  - **Varyasyon seçimi:** "500g / 1kg / 2.5kg / 5kg" (fiyat dinamik değişir)
  - Paketleme türü: "Vakumlu / Bez Torba / Standart"
  - Besin değerleri tablosu
  - Saklama koşulları (accordion)
  - Hasat tarihi ve köken bilgisi
  - Müşteri yorumları (fotoğraflı, doğrulanmış alım rozeti)
  - İlgili ürünler / çapraz satış

### 4.4 Sepet ve Checkout
- [ ] **Sepet:** Zustand ile global state, localStorage persist
- [ ] **Checkout Akışı (3 adım, single-page):**
  1. Teslimat adresi (kayıtlı kullanıcı için otomatik doldurma)
  2. Kargo seçimi (dinamik hesaplama — desi/ağırlık bazlı, 500₺ üstü ücretsiz)
  3. Ödeme (Iyzico iFrame veya redirect)
- [ ] Sipariş onay sayfası (`/odeme/onay/[orderId]`) — özet ve takip linki

### 4.5 Kullanıcı Hesabı ve Kimlik Doğrulama

> 💡 **Temel İlke:** Ceviz almak isteyen biri hesap oluşturmak zorunda kalmamalı. Sürtünmeyi minimize et.

- [ ] **Misafir (Guest) Checkout** — hesap olmadan da sipariş verilebilmeli; sadece ad, telefon, adres yeterli
- [ ] **Telefon ile Doğrulama** — kayıt/giriş için SMS OTP (Netgsm ile) veya WhatsApp OTP
- [ ] **Sosyal Giriş:**
  - Google ile Giriş (NextAuth.js — en kolay entegrasyon)
  - Apple ile Giriş (iOS kullanıcılar için önemli)
- [ ] **Klasik Kayıt/Giriş** — email + şifre (opsiyonel, yukarıdakiler zaten yeterli)
- [ ] **WhatsApp Yönlendirmesi** — giriş sayfasında "Sorun mu var? WhatsApp'tan yazın" linki
- [ ] Sipariş geçmişi ve takip (kayıtlı kullanıcılar için)
- [ ] Adres defteri yönetimi

### 4.6 SEO ve Performans
- [ ] Her sayfa için dinamik `<title>` ve `<meta description>`
- [ ] Open Graph ve Twitter Card meta etiketleri
- [ ] JSON-LD Schema Markup (Product, Organization, BreadcrumbList, Review)
- [ ] `next/image` ile tüm görseller WebP/AVIF + lazy loading
- [ ] `next-sitemap` ile otomatik sitemap.xml ve robots.txt
- [ ] Core Web Vitals hedefi: LCP < 2.5s, CLS < 0.1, FID < 100ms

### 4.7 PWA
- [ ] `manifest.json` — uygulama adı, ikonlar, tema rengi
- [ ] Service Worker — offline cache stratejisi
- [ ] "Ana ekrana ekle" promtu

---

## ⚙️ FAZ 5: Backend & API Geliştirme (Next.js Route Handlers)

> 💡 **Not:** Ayrı bir sunucuda backend çalıştırmak yerine, Next.js'in `/src/app/api/...` altındaki **Route Handler** yapısını kullanacağız. Bu servisler serverless olarak çalışacağı için hem sıfır maliyetlidir hem de Neon.tech'in serverless yapısıyla mükemmel uyumludur.

### 5.1 Veritabanı Şeması (Prisma / Drizzle ORM)
```sql
-- Temel tablolar
users          (id, email, phone, name, hashed_password, provider, role, created_at)
               -- provider: 'local' | 'google' | 'apple' | 'guest'
addresses      (id, user_id, title, full_address, city, district, postal_code)
products       (id, slug, name, description, is_active, created_at)
product_variants (id, product_id, label, weight_g, price, sku, stock_kg)
               -- stok variant bazında tutulur
orders         (id, user_id, status, total, cargo_fee, cargo_tracking_no, created_at)
               -- user_id NULL olabilir (misafir siparişler için)
order_items    (id, order_id, variant_id, quantity, unit_price)
payments       (id, order_id, provider, status, provider_ref, amount)
reviews        (id, user_id, product_id, rating, body, photo_url, is_verified)
blog_posts     (id, slug, title, content, category, published_at)
stock_alerts   (id, variant_id, threshold_kg, notified_at)
               -- stok alarmı için
```

### 5.2 API Uçları (Endpoints)
```
AUTH
  POST /auth/register              (email+şifre)
  POST /auth/login
  POST /auth/otp/send              (telefon OTP)
  POST /auth/otp/verify
  GET  /auth/google                (OAuth redirect)
  GET  /auth/apple                 (OAuth redirect)
  POST /auth/guest                 (misafir token oluştur)
  POST /auth/refresh

PRODUCTS
  GET  /products                   (filtre, sıralama, sayfalama)
  GET  /products/{slug}
  GET  /products/{id}/variants

ORDERS
  POST /orders                     (sipariş oluştur — hem kayıtlı hem misafir)
  GET  /orders/{id}
  GET  /orders/{id}/track          (misafir takip — telefon + sipariş no ile)
  GET  /orders/me                  (kullanıcının siparişleri)
  PUT  /orders/{id}/status         (admin)

PAYMENTS
  POST /payments/iyzico/init       (ödeme başlat)
  POST /payments/iyzico/callback   (webhook)

REVIEWS
  POST /reviews
  GET  /reviews/product/{id}

CARGO
  POST /cargo/create-shipment      (kargo barkodu oluştur)
  GET  /cargo/track/{tracking_no}

ADMIN
  GET  /admin/dashboard            (özet istatistikler)
  GET  /admin/orders               (tüm siparişler)
  PUT  /admin/orders/{id}/ship     (kargoya ver)
  PUT  /admin/stock                (stok güncelle)
  GET  /admin/stock/alerts         (düşük stok uyarıları)
```

### 5.3 Ödeme Entegrasyonu (Iyzico)
- [ ] Iyzico sandbox ortamında test
- [ ] 3D Secure akışı
- [ ] Webhook ile ödeme durumu güncelleme
- [ ] Başarısız ödeme yeniden deneme mantığı

### 5.4 Kargo Entegrasyonu
- [ ] Kargo firması API seçimi (Aras Kargo önerilir — yaygın API)
- [ ] Desi bazlı kargo ücreti hesaplama (ağırlık + hacim)
- [ ] Otomatik barkod oluşturma
- [ ] Takip numarası kaydetme ve müşteriye iletme

### 5.5 Admin Paneli
- [ ] Next.js içinde `/admin` route (middleware ile koruma)
- [ ] **Dashboard:** bugünkü sipariş sayısı, gelir, stok uyarıları
- [ ] **Sipariş listesi:** filtre (durum, tarih), detay, durum güncelleme
- [ ] **Stok yönetimi:** her varyantın kg cinsinden stok girişi
- [ ] **Baba için Mobil Görünüm:** sadece "Bekleyen Siparişler" + "Kargoya Verdim" butonu

---

## 📦 FAZ 5.5: Lojistik ve Stok Yönetimi

- [ ] **Stok Yönetimi (Öncelikli):**
  - Her varyant için gerçek zamanlı stok takibi (kg bazında)
  - Stok sıfırlandığında ürün otomatik "Tükendi" görünümüne geçer
  - "Tükendi" ürünlere "Beni Haberdar Et" e-posta formu
  - Admin panelinden kolayca stok güncelleme
- [ ] **Stok Alarmı (Otomatik):**
  - Her varyant için minimum stok eşiği tanımlanabilir (örn: 20 kg altına düşünce)
  - n8n → Telegram bildirimi babaya: "⚠️ İç Ceviz 1kg stok azalıyor: 18 kg kaldı"
- [ ] **Kargo Baremi:**
  - 0–10 kg: ağırlığa göre kademeli ücret (desi hesaplaması)
  - 500₺ üzeri sipariş → ücretsiz kargo (dinamik hesaplama)
  - Belirli şehirlere kampanya fiyatı (ileride eklenebilir)
- [ ] **Paketleme Görselleri:**
  - Vakumlu poşet, bez torba, kutu içi paketleme adım adım fotoğraflar (müşteri hijyen güvencesi için kritik)

---

## 🤖 FAZ 6: Otomasyon ve Yapay Zeka (n8n + Gemini)

### 6.1 n8n Workflow'ları

#### 🔔 Sipariş Bildirim Workflow'u
```
Tetikleyici: Webhook (yeni sipariş API'sinden)
    ↓
Telegram'a Mesaj Gönder:
"🆕 YENİ SİPARİŞ #1042
👤 Müşteri: Ahmet Yılmaz
📦 Ürün: 5kg Kabuklu Ceviz
📍 Adres: Kadıköy, İstanbul
💰 Toplam: 485₺
[✅ Kargoya Verdim]  [📋 Detayları Gör]"
    ↓
"Kargoya Verdim" butonuna basılınca:
    → API'ye PUT /orders/{id}/ship
    → Kargo barkodu oluştur (Aras API)
    → Müşteriye SMS: "Siparişiniz kargoya verildi. Takip: XXXX"
    → Müşteriye Email: kargo takip linki ile
```

#### 📧 Email Otomasyon Workflow'ları
- [ ] Sipariş onay emaili (anında)
- [ ] Kargo bildirimi emaili (kargoya verilince)
- [ ] Teslimat sonrası yorum isteme emaili (3 gün sonra)
- [ ] Terk edilmiş sepet emaili (24 saat sonra, abone kullanıcılara)
- [ ] Hasat sezonu açılış emaili (tüm bültene)

#### 🧾 Muhasebe Otomasyonu
- [ ] Ödeme onaylanınca → Paraşüt API → e-fatura oluştur
- [ ] Fatura PDF'ini müşteriye email ile gönder
- [ ] Aylık satış özeti raporu babaya Telegram üzerinden

#### 🔁 Tekrar Satın Alma Teşvik Workflow'u
- [ ] Teslimat tamamlandıktan 10 gün sonra → "Cevizler nasıldı?" emaili + yorum isteği
- [ ] İlk siparişten 30 gün sonra → "Tekrar sipariş zamanı geldi mi?" hatırlatma emaili
- [ ] "Tükendi" formuna yazan müşterilere stok gelince otomatik bildirim

### 6.2 Yapay Zeka Entegrasyonları (Gemini API)

#### 🤖 Müşteri Destek Chatbot'u (RAG)
```python
# Bilgi tabanı:
- SSS (kargo süresi, saklama koşulları, iade)
- Ürün bilgileri
- Sipariş durumu sorgulama (API entegrasyonu)

# Akış:
Kullanıcı soru sorar
    → Embedding similarity search (pgvector)
    → İlgili bağlam bulunur
    → Gemini Pro ile yanıt üretilir
    → Cevap verilir; anlaşılamazsa "Bizi Arayın" yönlendirmesi
```

#### ✍️ İçerik Üretim Yardımcısı (Admin Paneli İçinde)
- [ ] Blog yazısı taslağı oluşturma (başlık + anahtar kelime gir → taslak çık)
- [ ] Ürün açıklaması SEO optimizasyonu önerisi
- [ ] Müşteri yorumu duygu analizi ve özeti (haftalık rapor)

---

## 🥗 FAZ 6.5: İçerik ve Blog Stratejisi (SEO Sosu)

> Bu faz, organik trafik için kritiktir. Reklam bütçesi sıfırken bile müşteri getirir.

### Hedef Anahtar Kelimeler
| Kelime | Aylık Hacim (tahmini) | Zorluk |
|--------|----------------------|--------|
| ceviz satın al | 2,400 | Orta |
| taze ceviz fiyatı | 1,900 | Düşük |
| iç ceviz | 8,100 | Orta |
| kabuklu ceviz | 3,600 | Düşük |
| ceviz nasıl saklanır | 5,400 | Düşük |
| cevizli tarif | 12,000 | Düşük |

### İçerik Takvimi (İlk 3 Ay)
- [ ] **Ay 1:** "Ceviz Nasıl Saklanır? Ev Koşullarında Tazeliği Koruma Rehberi"
- [ ] **Ay 1:** "Cevizin 10 Sağlık Faydası (Bilimsel Kaynaklı)"
- [ ] **Ay 2:** "Cevizli Baklava Tarifi — Pastaneden Daha İyi"
- [ ] **Ay 2:** "Çekirdeksiz Beslenme Neden Yanlış? Cevizin Yeri"
- [ ] **Ay 3:** "Bir Cevizin Yolculuğu: Bahçeden Sofranıza"
- [ ] **Ay 3:** "Kabuklu mu, İç Ceviz mi? Hangisini Almalısınız?"

---

## 🧪 FAZ 7: Test ve Kalite Güvencesi

### 7.1 Fonksiyonel Testler
- [ ] Tüm checkout akışı (test kartı ile)
  - Başarılı ödeme senaryosu
  - Başarısız ödeme senaryosu (3D hata)
  - İptal/iade senaryosu
- [ ] Kargo barkodu oluşturma testi (sandbox)
- [ ] Email/SMS gönderim testleri
- [ ] Misafir checkout akışı testi
- [ ] OTP (telefon doğrulama) akışı testi
- [ ] Google/Apple OAuth akışı testi

### 7.2 Performans ve SEO
- [ ] Google Lighthouse: **Tüm skorlar > 90**
  - Performance, Accessibility, Best Practices, SEO
- [ ] Core Web Vitals (PageSpeed Insights ile)
- [ ] Mobil uyumluluk testi (Google Mobile-Friendly Test)
- [ ] Farklı ekran boyutları: 320px, 375px, 390px, 768px, 1280px, 1920px

### 7.3 Güvenlik
- [ ] Rate limiting (login, sipariş oluşturma)
- [ ] Input validation ve SQL injection koruması
- [ ] XSS koruması (Content Security Policy header)
- [ ] HTTPS zorunluluğu (HSTS)
- [ ] Hassas veriler için environment variable kontrolü
- [ ] Ödeme sayfasında PCI-DSS uyumlu akış (Iyzico iFrame)

### 7.4 Kullanıcı Kabul Testi (UAT)
- [ ] Gerçek kullanıcılarla 5 kişilik test grubu (aile/arkadaş)
- [ ] Mobil cihazda gerçek deneyim testi
- [ ] "Satın alma niyetiyle girip takılma noktası" analizi
- [ ] Baba için admin panel ve Telegram bot kullanım testi

---

## 🚀 FAZ 8: Canlıya Alma

### 8.1 Teknik Hazırlık
- [ ] Production environment variable'larının Vercel/Render'a girilmesi
- [ ] Iyzico canlı (production) key geçişi
- [ ] Kargo API production key geçişi
- [ ] Custom domain bağlama ve SSL sertifikası kontrolü
- [ ] Cloudflare DNS ve CDN yapılandırması

### 8.2 Analitik ve İzleme
- [ ] Google Analytics 4 entegrasyonu (ecommerce events dahil)
- [ ] Meta (Facebook) Pixel kurulumu
- [ ] Google Search Console kaydı + sitemap gönderimi
- [ ] Sentry (hata izleme — frontend ve backend)
- [ ] Uptime monitoring (UptimeRobot — ücretsiz)

### 8.3 Arama Motoru
- [ ] Google'a site gönderimi (Search Console)
- [ ] Yandex Webmaster kaydı (Türkiye'de anlamlı trafik)
- [ ] Bing Webmaster Tools
- [ ] Google My Business kaydı (yerel SEO için)

---

## 📣 FAZ 9: Pazarlama ve Büyüme

> 💡 **Strateji Notu:** Sitenin birincil amacı — Instagram ve WhatsApp üzerinden gelen müşterilere **profesyonel bir yüz** sunmak ve **güvenli ödeme altyapısı** sağlamak. Hedef, komisyon ödemeden ve aracısız çalışmak. Reklam bütçesi değil, **içerik ve güven** önce gelir.

### 9.1 Ana Kanal: Instagram Pazarlaması
- [ ] Instagram Business hesabı kurulumu ve profil optimizasyonu
  - Bio'ya site linki + WhatsApp linki
  - Highlight'lar: "Ürünler", "Müşteri Yorumları", "Bahçemiz", "Nasıl Sipariş?"
- [ ] İçerik takvimi: haftada 3–4 post (reel öncelikli)
  - Bahçe videoları, hasat anları, paketleme süreci
  - Tarif videoları, müşteri referansları (izin alınarak)
  - "Bahçeden sofranıza" story formatı
- [ ] Instagram Reel'leri → en ucuz ve etkili reklam kanalı
- [ ] Yakın çevreden ilk 10 müşteri → yorum ve story paylaşımı teşviki
- [ ] Doğal gıda/organik ürün Instagram gruplarına katılım

### 9.2 Direkt Pazarlama Kanalları
- [ ] **WhatsApp Business** hesabı + ürün kataloğu oluşturma
  - Sitenin alternatifi değil, **tamamlayıcısı** olarak kullan
  - Otomatik karşılama mesajı: "Merhaba! Siparişiniz için sitemizi ziyaret edin: [link]"
- [ ] **Facebook Grupları:** Organik gıda, doğal beslenme, köy ürünleri grupları
- [ ] Yakın çevre ağı — arkadaş, komşu, tanıdık üzerinden yayılma
- [ ] TikTok (opsiyonel, ilgi çekerse): "Bahçeden masa" formatında kısa videolar

### 9.3 Ücretli Reklam (Organik Büyüme Sonrası)
> ⚠️ Organik kanallar oturursa (200+ takipçi, 10+ sipariş) ücretli reklama geçmek değerlendirilebilir.
- [ ] Instagram Story Reklamları — mevcut organik içerikten boost et (en ucuz yöntem)
- [ ] Hedefleme: 30–55 yaş, "organik gıda", "sağlıklı yaşam" ilgi alanları
- [ ] ~~Google Ads~~ — şimdilik gerek yok, SEO blog içerikleri ücretsiz trafik sağlar

### 9.4 Müşteri Sadakati
- [ ] İlk sipariş sonrası %10 indirim kuponu (email veya WhatsApp)
- [ ] Arkadaşa öner → her ikisine de indirim (basit referral kodu sistemi)
- [ ] Hasat sezonu "önce sen al" listesi (bülten abonelerine önce duyuru)
- [ ] Tekrar sipariş verenlere özel paketleme sürprizi (el yazısı not, tarif kartı)

---

## 📊 Başarı Metrikleri (KPI'lar)

| Metrik | 3. Ay Hedef | 6. Ay Hedef |
|--------|-------------|-------------|
| Aylık site ziyaretçisi | 500 | 3,000 |
| Instagram takipçi sayısı | 300 | 1,500 |
| Dönüşüm oranı | %2 | %3 |
| Ortalama sepet tutarı | 250₺ | 350₺ |
| Aylık sipariş sayısı | 15 | 100 |
| Tekrar satın alma oranı | %20 | %40 |
| Misafir checkout oranı | %40 | — |
| Google Lighthouse skoru | 90+ | 95+ |
| NPS (Müşteri Memnuniyeti) | 50+ | 70+ |

---

## 🗓 Tahmini Zaman Çizelgesi

| Faz | Süre | Öncelik |
|-----|------|---------|
| Faz 0 — Ön Koşul | 1 hafta | 🔴 Kritik |
| Faz 1 — Yasal | 2–4 hafta (paralel yürütülür) | 🔴 Kritik |
| Faz 2 — Marka & Tasarım | 1 hafta | 🟠 Yüksek |
| Faz 3 — Kurulum & DevOps | 3 gün | 🟠 Yüksek |
| Faz 4 — Frontend | 3 hafta | 🟠 Yüksek |
| Faz 5 — Backend | 3 hafta | 🟠 Yüksek |
| Faz 5.5 — Lojistik | 1 hafta | 🟡 Orta |
| Faz 6 — Otomasyon & AI | 2 hafta | 🟡 Orta |
| Faz 6.5 — İçerik | Sürekli (paralel) | 🟡 Orta |
| Faz 7 — Test | 1 hafta | 🔴 Kritik |
| Faz 8 — Canlıya Alma | 3 gün | 🔴 Kritik |
| Faz 9 — Pazarlama | Sürekli | 🟢 Uzun Vade |

**Toplam Tahmini Süre (Faz 0'dan Faz 8'e):** ~10–12 hafta

---

## 💡 Kritik Başarı Faktörleri

> [!IMPORTANT]
> **En Önemli 5 Şey:**
> 1. **Babanın Operasyonel Kolaylığı** — Telegram botu olmadan sistem sürdürülemez.
> 2. **Yasal Metinler** — Iyzico onayı için zorunlu, es geçme.
> 3. **Gerçek Fotoğraflar** — Stok fotoğraf değil, gerçek bahçe görselleri güven verir.
> 4. **Mobil Deneyim** — Alıcıların %80'i telefondan gelir.
> 5. **İlk 10 Müşteri** — Gerçek yorum almak için aile/arkadaşlara hediye/indirim ver.

> [!TIP]
> **Hızlı Kazanım (Quick Win):** Projeyi kurarken bir WhatsApp numarası açarak manuel sipariş almaya başlayabilirsiniz. Bu, hem ilk müşteri geri bildirimlerini toplar hem de teknik sistem hazır olana kadar gelir üretir.

> [!WARNING]
> **Dikkat Edilmesi Gereken Riskler:**
> - Hasat sezonu dışında stok sorunu (dondurulmuş veya geçen yıl ürünü?)
> - Kargo hasarı — paketleme kalitesi kritik; müşteri görseli de görmeli.
> - Rekabet — fiyat değil, hikaye ve güvenle farklılaş.

---

*Bu plan yaşayan bir belge olarak sürekli güncellenmelidir.*
