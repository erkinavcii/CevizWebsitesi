"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ShoppingBag, Star, ArrowRight, ShieldCheck, Scale, Sparkles } from "lucide-react";
import { useRef } from "react";

const FEATURED_PRODUCTS = [
  {
    id: "prod-1",
    name: "Kemah Kabuklu Çiftçi Cevizi",
    slug: "kemah-kabuklu-ceviz",
    description: "Kemah Vadisi'nin yüksek rakımlı bahçelerinden, ince kabuklu, dolgun iç oranına sahip, tamamen doğal gübreyle yetiştirilmiş yeni mahsul kabuklu ceviz.",
    price: 240,
    image: "/images/hero-walnuts.png",
    tag: "Yeni Sezon Hasadı",
    tagColor: "text-accent border-accent/30 bg-accent/10",
    rating: 4.9,
    reviewsCount: 124,
    features: ["İnce Kabuklu", "Dolgun Doluluk Oranı", "100% Doğal Kurutulmuş"],
    glowColor: "rgba(90,164,105,0.2)",
  },
  {
    id: "prod-2",
    name: "Kemah Beyaz Kelebek İç Ceviz",
    slug: "kemah-ic-ceviz",
    description: "El kırması yöntemiyle kabuğundan özenle ayrılmış, %90'ın üzerinde 'Kelebek' bütünlüğünde, acılık barındırmayan, ekstra beyaz birinci kalite iç ceviz.",
    price: 490,
    image: "/images/shelled-walnuts.png",
    tag: "En Çok Satan",
    tagColor: "text-primary border-primary/30 bg-primary/10",
    rating: 5.0,
    reviewsCount: 86,
    features: ["%90+ Kelebek Bütünlük", "Acı Tat İçermez", "Ekstra Beyaz Sınıfı"],
    glowColor: "rgba(212,160,23,0.2)",
  },
];

/* 3D tilt kartı */
function TiltCard({ children, glowColor }: { children: React.ReactNode; glowColor: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", transformPerspective: 1000 }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="relative h-full cursor-pointer"
    >
      {/* Hover glow arka planı */}
      <div
        className="absolute -inset-1 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none"
        style={{ background: glowColor }}
      />
      {children}
    </motion.div>
  );
}

export function FeaturedProducts() {
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      {/* Dekoratif arka plan */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-primary/4 blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">

        {/* Bölüm Başlığı */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-5">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold border border-accent/30 bg-accent/10 text-accent"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            Özenle Seçilmiş Mahsuller
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl text-foreground"
          >
            Bahçemizin En{" "}
            <span className="gradient-text-amber italic">Seçkin</span> Ürünleri
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-base sm:text-lg leading-relaxed"
          >
            Kemah&apos;ın yüksek yaylalarında, temiz kaynak sularıyla beslenen ağaçlarımızdan elde ettiğimiz,
            besin değerleri en üst düzeydeki cevizlerimiz.
          </motion.p>
        </div>

        {/* Ürün Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:max-w-5xl lg:mx-auto">
          {FEATURED_PRODUCTS.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              className="group flex"
            >
              <TiltCard glowColor={product.glowColor}>
                <div className="relative glass-card rounded-[2.5rem] overflow-hidden flex flex-col w-full h-full border border-border/30">

                  {/* Görsel Alanı */}
                  <div className="relative overflow-hidden aspect-[4/3] bg-background/50">
                    <span className={`absolute top-4 left-4 z-10 inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold ${product.tagColor}`}>
                      <Sparkles className="h-3 w-3 mr-1" />
                      {product.tag}
                    </span>

                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  </div>

                  {/* İçerik */}
                  <div className="p-7 flex flex-col flex-1 space-y-5">
                    {/* Rating + Min alım */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
                        <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                        <span className="text-xs font-bold text-primary">{product.rating}</span>
                        <span className="text-xs text-muted-foreground">({product.reviewsCount})</span>
                      </div>
                      <span className="text-xs font-semibold text-muted-foreground border border-border/50 px-3 py-1 rounded-full flex items-center gap-1">
                        <Scale className="h-3 w-3" />
                        Min. 1 Kg
                      </span>
                    </div>

                    {/* Ürün Adı */}
                    <h3 className="font-heading font-bold text-xl sm:text-2xl text-foreground leading-tight">
                      {product.name}
                    </h3>

                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {product.description}
                    </p>

                    {/* Özellikler */}
                    <ul className="space-y-1.5">
                      {product.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* Fiyat + Aksiyonlar */}
                    <div className="pt-5 border-t border-border/30 flex items-center justify-between mt-auto">
                      <div>
                        <span className="text-xs text-muted-foreground block">Kilogram Fiyatı</span>
                        <span className="text-3xl font-black gradient-text-amber font-heading leading-tight">
                          {product.price} ₺
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href={`/urunler/${product.slug}`}
                          className="px-4 py-2.5 rounded-xl text-xs font-bold border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30 glass-dark transition-all duration-300"
                        >
                          İncele
                        </Link>
                        <Link
                          href="/urunler"
                          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-background bg-primary hover:bg-primary/90 transition-all duration-300 glow-amber-sm hover:glow-amber"
                        >
                          <ShoppingBag className="h-3.5 w-3.5" />
                          Satın Al
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Alt CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link
            href="/urunler"
            className="group inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            Tüm Ürün Kataloğumuzu İnceleyin
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
