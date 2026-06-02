import { Hero } from "@/components/home/Hero";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { StorySummary } from "@/components/home/StorySummary";
import { Testimonials } from "@/components/home/Testimonials";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Leaf, ShieldCheck, Truck } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <FeaturedProducts />
      <WhyChooseUs />
      <StorySummary />
      <Testimonials />

      {/* ─── Premium Bottom CTA ─── */}
      <section className="relative py-32 overflow-hidden" style={{ background: "#080604" }}>
        {/* Dekoratif arka plan */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Büyük amber merkez ışığı */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full bg-primary/10 blur-[120px]" />
          {/* Köşe aksentler */}
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-accent/5 blur-[80px]" />
          <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-primary/5 blur-[80px]" />
          {/* İnce çizgi deseni */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(212,160,23,0.8) 80px, rgba(212,160,23,0.8) 81px)",
            }}
          />
        </div>

        <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center space-y-10">

          {/* Üst rozet */}
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold border border-primary/30 bg-primary/10 text-primary animate-glow-amber">
              <Leaf className="h-3.5 w-3.5" />
              Sınırlı Stok — 2026 Yeni Sezon
            </span>
          </div>

          {/* Başlık */}
          <div className="space-y-4">
            <h2 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.1]">
              Taptaze Bahçe Lezzetini
            </h2>
            <h2 className="font-heading font-bold italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl gradient-text-amber">
              Kaçırmayın.
            </h2>
          </div>

          {/* Açıklama */}
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Ekim 2026 hasadı cevizlerimizin satışı devam ediyor. Siparişiniz üzerine 
            taze kırılan iç cevizlerimizi veya dolgun kabuklu cevizlerimizi hemen sepete ekleyin.
          </p>

          {/* CTA Butonları */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/urunler"
              className="group relative inline-flex items-center justify-center gap-2.5 px-10 py-4 rounded-2xl font-bold text-sm text-background bg-primary overflow-hidden transition-all duration-300 glow-amber hover:glow-amber"
            >
              <span className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <ShoppingBag className="relative z-10 h-5 w-5" />
              <span className="relative z-10">Şimdi Sipariş Ver</span>
            </Link>

            <Link
              href="/iletisim"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-2xl font-semibold text-sm text-muted-foreground border border-border/40 glass-dark hover:text-foreground hover:border-primary/30 transition-all duration-300"
            >
              Bize Ulaşın
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Alt güven simgeleri */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
            {[
              { Icon: ShieldCheck, label: "Güvenli Ödeme" },
              { Icon: Truck, label: "Hızlı Kargo" },
              { Icon: Leaf, label: "100% Doğal" },
            ].map(({ Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
                <Icon className="h-3.5 w-3.5 text-primary/60" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

