import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ArrowLeft, Star, ShieldCheck, Scale, Leaf, Truck, ShoppingCart, Percent, AlertCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Static details that might not be fully in the database
const STATIC_PRODUCT_DETAILS: Record<string, any> = {
  "kemah-kabuklu-ceviz": {
    tag: "Yeni Sezon",
    rating: 4.9,
    reviewsCount: 124,
    image: "/images/hero-walnuts.png",
    features: [
      "Munzur Dağları kaynak suyuyla beslenmiş ağaçlar",
      "Sıfır kimyasal kalıntı garantisi (Pestisit Analizli)",
      "Kolay kırılan ekstra ince kabuk yapısı",
      "Dolgun, açık renkli iç oranı"
    ],
    nutrition: [
      { label: "Enerji", value: "654 kcal" },
      { label: "Protein", value: "15.2 g" },
      { label: "Toplam Yağ (Omega-3 zengin)", value: "65.2 g" },
      { label: "Karbonhidrat", value: "13.7 g" },
      { label: "Diyet Lifi", value: "6.7 g" }
    ],
    specs: [
      { label: "Menşei", value: "Kemah, Erzincan" },
      { label: "Hasat Yılı", value: "Ekim 2026 (Yeni Sezon)" },
      { label: "Kurutma Şekli", value: "Geleneksel Güneşte Kurutma" },
      { label: "Kabuk Türü", value: "İnce Kabuklu (Kağıt Kabuk)" }
    ]
  },
  "kemah-ic-ceviz": {
    tag: "En Çok Satan",
    rating: 5.0,
    reviewsCount: 86,
    image: "/images/shelled-walnuts.png",
    features: [
      "El kırması yöntemiyle özenle ayıklanmıştır",
      "%90'ın üzerinde 'Kelebek' (bütün) iç oranı",
      "Acılık ve burukluk içermeyen tatlı aroma",
      "Tazeliği koruyan yüksek kalınlıkta vakumlu paket"
    ],
    nutrition: [
      { label: "Enerji", value: "687 kcal" },
      { label: "Protein", value: "16.1 g" },
      { label: "Toplam Yağ (Doymamış Yağ Asitleri)", value: "68.9 g" },
      { label: "Karbonhidrat", value: "12.1 g" },
      { label: "Diyet Lifi", value: "5.9 g" }
    ],
    specs: [
      { label: "Menşei", value: "Kemah, Erzincan" },
      { label: "Hasat Yılı", value: "Ekim 2026 (Taze Hasat)" },
      { label: "İşleme Türü", value: "El Kırması Ayıklanmış" },
      { label: "Paketleme", value: "Vakumlu Koruyucu Paket" }
    ]
  }
};

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  
  // Fallback check first to see if slug is valid
  const staticDetails = STATIC_PRODUCT_DETAILS[slug];
  if (!staticDetails) {
    notFound();
  }

  // Fetch product from prisma with variant data
  let dbProduct = null;
  try {
    dbProduct = await prisma.product.findUnique({
      where: { slug },
      include: { variants: true }
    });
  } catch (error) {
    console.error("Database connection error in ProductDetailPage:", error);
    // Continue with static fallback so page doesn't crash if database is down
  }

  const name = dbProduct?.name || (slug === "kemah-kabuklu-ceviz" ? "Kemah Kabuklu Çiftçi Cevizi" : "Kemah Beyaz Kelebek İç Ceviz");
  const description = dbProduct?.description || (slug === "kemah-kabuklu-ceviz" 
    ? "Kemah Vadisi'nin yüksek rakımlı bahçelerinden, ince kabuklu, dolgun iç oranına sahip, tamamen doğal gübreyle yetiştirilmiş yeni mahsul kabuklu ceviz."
    : "El kırması yöntemiyle kabuğundan özenle ayrılmış, %90'ın üzerinde 'Kelebek' bütünlüğünde, acılık barındırmayan, ekstra beyaz birinci kalite iç ceviz.");
  
  const basePrice = dbProduct?.variants?.[0]?.price || (slug === "kemah-kabuklu-ceviz" ? 120.0 : 245.0); // 0.5 Kg price
  const pricePerKg = basePrice * 2;

  return (
    <div className="bg-background min-h-screen py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back Link */}
        <div className="mb-8">
          <Link href="/urunler" className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Ürün Kataloğuna Geri Dön
          </Link>
        </div>

        {/* Main Grid */}
        <div className="grid gap-12 lg:grid-cols-12 items-start bg-card border rounded-[2.5rem] p-6 md:p-12 shadow-xl">
          {/* Image Gallery (Left - 5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative overflow-hidden rounded-[2rem] border-4 border-muted aspect-square bg-muted shadow-lg">
              <span className="absolute top-4 left-4 z-10 inline-flex items-center rounded-full bg-secondary px-3.5 py-1.5 text-xs font-extrabold text-white shadow-md">
                {staticDetails.tag}
              </span>
              <Image
                src={staticDetails.image}
                alt={name}
                fill
                priority
                className="object-cover transition-transform duration-500 hover:scale-102"
              />
            </div>

            {/* Micro badges */}
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-accent/5 border border-accent/10 text-center">
                <Leaf className="h-5 w-5 text-accent mb-1" />
                <span className="text-[9px] font-black text-zinc-800 uppercase tracking-wide">100% Organik</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-secondary/5 border border-secondary/10 text-center">
                <ShieldCheck className="h-5 w-5 text-secondary mb-1" />
                <span className="text-[9px] font-black text-zinc-800 uppercase tracking-wide">Analiz Raporlu</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-primary/5 border border-primary/10 text-center">
                <Truck className="h-5 w-5 text-primary mb-1" />
                <span className="text-[9px] font-black text-zinc-800 uppercase tracking-wide">Doğrudan Kapıya</span>
              </div>
            </div>
          </div>

          {/* Product Details (Right - 7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-secondary/15 px-3 py-1 rounded-full text-xs font-bold text-secondary">
                  <Star className="h-3.5 w-3.5 fill-secondary" />
                  <span>{staticDetails.rating}</span>
                  <span className="text-secondary/70 font-medium">({staticDetails.reviewsCount} Değerlendirme)</span>
                </div>
                <span className="text-xs font-bold text-accent bg-accent/15 px-3 py-1 rounded-full">
                  Stokta Hazır
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-heading">
                {name}
              </h1>

              <p className="text-lg text-zinc-900 leading-relaxed font-bold text-secondary">
                Kilogram Fiyatı: {pricePerKg.toFixed(2)} TL
              </p>

              <p className="text-muted-foreground text-sm leading-relaxed">
                {description}
              </p>
            </div>

            {/* Features Bullet List */}
            <div className="space-y-3">
              <h3 className="text-xs font-extrabold text-foreground uppercase tracking-widest">Öne Çıkan Özellikler</h3>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {staticDetails.features.map((feat: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 text-xs font-bold text-zinc-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Buy Widget Box */}
            <div className="p-6 rounded-3xl bg-muted/40 border border-dashed border-border space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-muted-foreground block font-bold">Minimum Alım Limiti</span>
                  <span className="text-sm font-bold text-foreground">1 Kilogram (veya katları)</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-muted-foreground block font-bold">Kargo Ücreti</span>
                  <span className="text-sm font-bold text-accent">2000 TL Üzeri Ücretsiz</span>
                </div>
              </div>

              <Link
                href="/urunler"
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "w-full bg-primary hover:bg-primary/95 text-white font-bold h-12 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/10 transition-transform active:scale-[0.98]"
                )}
              >
                <ShoppingCart className="h-5 w-5" />
                Sepet Simülatöründe Satın Al
              </Link>
              <p className="text-[10px] text-muted-foreground text-center leading-tight">
                💡 Tıklayarak interaktif sepet hesaplayıcısına ve kargo baremi simülatörüne gidebilirsiniz.
              </p>
            </div>

            {/* Technical specs & nutritional info tab */}
            <div className="grid gap-6 sm:grid-cols-2 pt-6 border-t border-border">
              {/* Product Specifications */}
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold text-foreground uppercase tracking-widest">Ürün Bilgileri</h4>
                <div className="border rounded-2xl overflow-hidden bg-card text-xs">
                  {staticDetails.specs.map((spec: any, idx: number) => (
                    <div key={idx} className="flex justify-between p-3 border-b last:border-0 border-border">
                      <span className="text-muted-foreground font-semibold">{spec.label}</span>
                      <span className="font-bold text-foreground">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nutritional Values */}
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold text-foreground uppercase tracking-widest">Besin Değerleri (100g)</h4>
                <div className="border rounded-2xl overflow-hidden bg-card text-xs">
                  {staticDetails.nutrition.map((nut: any, idx: number) => (
                    <div key={idx} className="flex justify-between p-3 border-b last:border-0 border-border">
                      <span className="text-muted-foreground font-semibold">{nut.label}</span>
                      <span className="font-bold text-foreground">{nut.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Trust note */}
            <div className="flex gap-2.5 p-4 rounded-2xl bg-accent/5 border border-accent/15 items-start">
              <AlertCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                <span className="font-bold text-accent">Laboratuvar Onaylı Temiz Gıda:</span> Cevizlerimiz her yıl hasat sonrasında akredite gıda analiz laboratuvarlarında test edilir. Ağır metal ve tarım ilacı (pestisit) kalıntısı içermediği onaylanmaktadır.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
