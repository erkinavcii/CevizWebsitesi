"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ShoppingBag,
  Star,
  ArrowRight,
  ShieldCheck,
  Scale,
  Sparkles,
  Leaf,
  Award,
  CheckCircle2,
} from "lucide-react";
import { useRef, useState } from "react";

const FEATURED_PRODUCTS = [
  {
    id: "prod-1",
    name: "Kemah Kabuklu Çiftçi Cevizi",
    slug: "kemah-kabuklu-ceviz",
    description:
      "Kemah Vadisi'nin yüksek rakımlı bahçelerinden, ince kabuklu, dolgun iç oranına sahip, tamamen doğal gübreyle yetiştirilmiş yeni mahsul kabuklu ceviz.",
    price: 240,
    image: "/images/hero-walnuts.png",
    tag: "Yeni Sezon Hasadı",
    badge: "Çiftçiden Sofranıza",
    rating: 4.9,
    reviewsCount: 124,
    features: [
      { icon: Leaf, label: "İnce Kabuklu" },
      { icon: Award, label: "Dolgun Doluluk Oranı" },
      { icon: CheckCircle2, label: "100% Doğal Kurutulmuş" },
    ],
    accentColor: "#5AA469",
    glowRGB: "90,164,105",
    tagClass: "text-accent border-accent/30 bg-accent/10",
    priceClass: "gradient-text-amber",
    ctaClass:
      "bg-accent hover:bg-accent/90 text-white glow-green-sm hover:glow-green",
  },
  {
    id: "prod-2",
    name: "Kemah Beyaz Kelebek İç Ceviz",
    slug: "kemah-ic-ceviz",
    description:
      "El kırması yöntemiyle kabuğundan özenle ayrılmış, %90'ın üzerinde 'Kelebek' bütünlüğünde, acılık barındırmayan, ekstra beyaz birinci kalite iç ceviz.",
    price: 490,
    image: "/images/shelled-walnuts.png",
    tag: "En Çok Satan",
    badge: "Premium Seçim",
    rating: 5.0,
    reviewsCount: 86,
    features: [
      { icon: Award, label: "%90+ Kelebek Bütünlük" },
      { icon: CheckCircle2, label: "Acı Tat İçermez" },
      { icon: ShieldCheck, label: "Ekstra Beyaz Sınıfı" },
    ],
    accentColor: "#D4A017",
    glowRGB: "212,160,23",
    tagClass: "text-primary border-primary/30 bg-primary/10",
    priceClass: "gradient-text-amber",
    ctaClass:
      "bg-primary hover:bg-primary/90 text-background glow-amber-sm hover:glow-amber",
  },
];

/* ── ui-ux-pro-max: Liquid Glass + 3D Tilt Card ── */
function TiltCard({
  children,
  glowRGB,
}: {
  children: React.ReactNode;
  glowRGB: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 400,
    damping: 40,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 400,
    damping: 40,
  });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1200,
      }}
      onMouseMove={handleMouse}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleLeave}
      whileHover={{ scale: 1.015, y: -6 }}
      /* ui-ux-pro-max §7: exit faster than enter */
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="relative h-full cursor-pointer"
    >
      {/* Liquid Glass iridescent glow — morphs on hover (400-600ms) */}
      <motion.div
        className="absolute -inset-2 rounded-[2.6rem] pointer-events-none blur-2xl"
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8,
        }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        style={{
          background: `radial-gradient(ellipse at 50% 50%, rgba(${glowRGB},0.35) 0%, transparent 70%)`,
        }}
      />
      {children}
    </motion.div>
  );
}

/* ── Feature pill with icon ── */
function FeaturePill({
  Icon,
  label,
}: {
  Icon: React.ElementType;
  label: string;
}) {
  return (
    <li className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 border border-primary/20 shrink-0">
        <Icon className="h-3 w-3 text-primary" aria-hidden="true" />
      </span>
      {label}
    </li>
  );
}

export function FeaturedProducts() {
  return (
    <section
      className="relative py-32 bg-background overflow-hidden"
      aria-labelledby="featured-products-heading"
    >
      {/* Dekoratif: iridescent ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px] opacity-40"
          style={{
            background:
              "radial-gradient(ellipse, rgba(90,164,105,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full blur-[140px] opacity-30"
          style={{
            background:
              "radial-gradient(ellipse, rgba(212,160,23,0.10) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">

        {/* ── Bölüm Başlığı ── */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-5">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold border border-accent/30 bg-accent/10 text-accent"
          >
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Özenle Seçilmiş Mahsuller
          </motion.span>

          <motion.h2
            id="featured-products-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl text-foreground"
          >
            Bahçemizin En{" "}
            <span className="gradient-text-amber italic">Seçkin</span> Ürünleri
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Kemah&apos;ın yüksek yaylalarında, temiz kaynak sularıyla beslenen
            ağaçlarımızdan elde ettiğimiz, besin değerleri en üst düzeydeki
            cevizlerimiz.
          </motion.p>
        </div>

        {/* ── Ürün Grid ── */}
        {/* ui-ux-pro-max §5: grid responsive, staggered entrance (§7) */}
        <div className="grid gap-8 md:grid-cols-2 lg:max-w-5xl lg:mx-auto">
          {FEATURED_PRODUCTS.map((product, idx) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              /* ui-ux-pro-max §7: stagger-sequence 30-50ms */
              transition={{ duration: 0.65, delay: idx * 0.14, ease: "easeOut" }}
              className="group flex"
              aria-label={product.name}
            >
              <TiltCard glowRGB={product.glowRGB}>
                {/* Liquid Glass card surface */}
                <div className="relative glass-card rounded-[2.5rem] overflow-hidden flex flex-col w-full h-full border border-white/5">

                  {/* ── Görsel Alanı ── */}
                  <div className="relative overflow-hidden aspect-[4/3] bg-background/40">
                    {/* Badge — product tag */}
                    <span
                      className={`absolute top-4 left-4 z-10 inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-bold backdrop-blur-sm ${product.tagClass}`}
                    >
                      <Sparkles className="h-3 w-3" aria-hidden="true" />
                      {product.tag}
                    </span>

                    {/* Premium badge — top right */}
                    <span className="absolute top-4 right-4 z-10 inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-semibold text-white/70 backdrop-blur-sm">
                      {product.badge}
                    </span>

                    <Image
                      src={product.image}
                      alt={`${product.name} — ürün görseli`}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />

                    {/* Gradient overlay — Liquid Glass style */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent"
                      aria-hidden="true"
                    />

                    {/* Shimmer on hover (400-600ms — ui-ux-pro-max Liquid Glass) */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: `linear-gradient(135deg, transparent 40%, rgba(${product.glowRGB},0.12) 60%, transparent 80%)`,
                        backgroundSize: "200% 200%",
                      }}
                      animate={{
                        backgroundPosition: ["0% 0%", "100% 100%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "linear",
                      }}
                      aria-hidden="true"
                    />
                  </div>

                  {/* ── İçerik Alanı ── */}
                  <div className="p-7 flex flex-col flex-1 space-y-5">

                    {/* Rating + Min alım */}
                    <div className="flex items-center justify-between">
                      <div
                        className="flex items-center gap-1.5 bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full"
                        aria-label={`${product.rating} yıldız, ${product.reviewsCount} değerlendirme`}
                      >
                        <Star
                          className="h-3.5 w-3.5 fill-primary text-primary"
                          aria-hidden="true"
                        />
                        <span className="text-xs font-bold text-primary">
                          {product.rating}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({product.reviewsCount})
                        </span>
                      </div>

                      <span className="text-xs font-semibold text-muted-foreground border border-border/50 px-3 py-1.5 rounded-full flex items-center gap-1.5 bg-background/40 backdrop-blur-sm">
                        <Scale className="h-3 w-3" aria-hidden="true" />
                        Min. 1 Kg
                      </span>
                    </div>

                    {/* Ürün Adı */}
                    <h3 className="font-heading font-bold text-xl sm:text-2xl text-foreground leading-tight">
                      {product.name}
                    </h3>

                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                      {product.description}
                    </p>

                    {/* Özellikler — icon pills (ui-ux-pro-max: no emoji as icons) */}
                    <ul
                      className="space-y-2"
                      aria-label="Ürün özellikleri"
                    >
                      {product.features.map((f, i) => (
                        <FeaturePill key={i} Icon={f.icon} label={f.label} />
                      ))}
                    </ul>

                    {/* Fiyat + CTA — mt-auto pushes to bottom */}
                    <div className="pt-5 border-t border-white/6 flex items-center justify-between mt-auto">
                      <div>
                        <span className="text-xs text-muted-foreground block mb-0.5">
                          Kilogram Fiyatı
                        </span>
                        <span
                          className={`text-3xl font-black font-heading leading-none ${product.priceClass}`}
                        >
                          {product.price} ₺
                        </span>
                      </div>

                      {/* ui-ux-pro-max §4: primary CTA + secondary outlined */}
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/urunler/${product.slug}`}
                          className="px-4 py-2.5 rounded-xl text-xs font-bold border border-white/10 text-muted-foreground hover:text-foreground hover:border-primary/30 glass-dark transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          aria-label={`${product.name} ürün detayı`}
                        >
                          İncele
                        </Link>
                        <Link
                          href="/urunler"
                          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${product.ctaClass}`}
                          aria-label={`${product.name} satın al`}
                        >
                          <ShoppingBag className="h-3.5 w-3.5" aria-hidden="true" />
                          Satın Al
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.article>
          ))}
        </div>

        {/* ── Alt CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Link
            href="/urunler"
            className="group inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            aria-label="Tüm ürün kataloğunu incele"
          >
            Tüm Ürün Kataloğumuzu İnceleyin
            {/* ui-ux-pro-max §7: transform only (no width/height anim) */}
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1.5"
              aria-hidden="true"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
