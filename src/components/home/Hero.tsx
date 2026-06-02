"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, ShieldCheck, Truck, Star } from "lucide-react";

/* ─────────────────────────────────────────────────────────
   Sayaç hook — hedef sayıya kadar animasyonlu sayım
───────────────────────────────────────────────────────── */
function useCounter(target: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

/* ─────────────────────────────────────────────────────────
   Dekoratif parçacık (yavaş yüzen arka plan halkası)
───────────────────────────────────────────────────────── */
function FloatingRing({ className }: { className?: string }) {
  return (
    <div
      className={`absolute rounded-full border border-primary/10 animate-slow-spin pointer-events-none ${className}`}
    />
  );
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show:  { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export function Hero() {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const orders   = useCounter(850,  2200, statsVisible);
  const rating   = useCounter(49,   1800, statsVisible); // 49 → "4.9"
  const freshDays = useCounter(1,   1000, statsVisible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.5 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background pt-16">

      {/* ── Dekoratif radyal arka plan ── */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {/* Büyük amber spot sol üst */}
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-primary/8 blur-[120px]" />
        {/* Yeşil spot sağ alt */}
        <div className="absolute -bottom-40 -right-20 w-[500px] h-[500px] rounded-full bg-accent/6 blur-[100px]" />
        {/* İnce yatay çizgiler (grid deseni) */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(212,160,23,0.5) 60px, rgba(212,160,23,0.5) 61px)",
          }}
        />
        {/* Dönen halkalar */}
        <FloatingRing className="w-[300px] h-[300px] top-1/4 right-[5%]" />
        <FloatingRing className="w-[500px] h-[500px] top-1/3 right-[2%] opacity-50 [animation-duration:30s]" />
        <FloatingRing className="w-[150px] h-[150px] bottom-1/4 left-[8%] [animation-direction:reverse]" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center min-h-[calc(100vh-4rem)] py-16">

          {/* ─── SOL: Metin İçeriği ─── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center space-y-8"
          >
            {/* Üst Rozetler */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold border border-accent/30 bg-accent/10 text-accent animate-glow-green">
                <Leaf className="h-3.5 w-3.5" />
                100% Doğal & İlaçsız
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold border border-primary/30 bg-primary/10 text-primary">
                <ShieldCheck className="h-3.5 w-3.5" />
                Sertifikalı Bahçe
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold border border-border/50 bg-white/5 text-muted-foreground">
                <Truck className="h-3.5 w-3.5" />
                Doğrudan Kapınıza
              </span>
            </motion.div>

            {/* Ana Başlık */}
            <motion.div variants={itemVariants} className="space-y-3">
              <h1 className="font-heading font-bold leading-[1.1] tracking-tight">
                <span className="block text-5xl sm:text-6xl md:text-7xl text-foreground text-glow-white">
                  Toprağın
                </span>
                <span className="block text-5xl sm:text-6xl md:text-7xl gradient-text-amber">
                  En Saf Lezzeti,
                </span>
                <span className="block text-4xl sm:text-5xl md:text-6xl text-muted-foreground font-normal italic mt-1">
                  doğrudan bahçeden.
                </span>
              </h1>
            </motion.div>

            {/* Açıklama */}
            <motion.p
              variants={itemVariants}
              className="max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed"
            >
              Kemah Vadisi&apos;nin eşsiz ikliminde, hiçbir kimyasal ilaç ve koruyucu kullanmadan 
              özenle yetiştirdiğimiz taptaze, ince kabuklu, dolgun cevizlerimizi doğrudan 
              bahçemizden sofranıza ulaştırıyoruz.
            </motion.p>

            {/* CTA Butonları */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/urunler"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm text-background bg-primary overflow-hidden transition-all duration-300 glow-amber hover:glow-amber"
              >
                {/* Shimmer efekti */}
                <span className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">Alışverişe Başla</span>
                <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/hikayemiz"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-sm text-muted-foreground border border-border/50 glass-dark hover:text-foreground hover:border-primary/30 transition-all duration-300"
              >
                Hikayemiz
              </Link>
            </motion.div>

            {/* İstatistikler */}
            <motion.div
              variants={itemVariants}
              ref={statsRef}
              className="grid grid-cols-3 gap-6 pt-6 border-t border-border/30"
            >
              <div>
                <span className="block text-2xl sm:text-3xl font-bold font-heading gradient-text-amber">
                  {orders}+
                </span>
                <span className="text-xs text-muted-foreground font-medium">Mutlu Sipariş</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-bold font-heading gradient-text-amber">
                  {(rating / 10).toFixed(1)}/5
                </span>
                <span className="text-xs text-muted-foreground font-medium">Müşteri Puanı</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-bold font-heading gradient-text-amber">
                  {freshDays === 0 ? "0" : "<24"} Saat
                </span>
                <span className="text-xs text-muted-foreground font-medium">Tazelik Garantisi</span>
              </div>
            </motion.div>
          </motion.div>

          {/* ─── SAĞ: Görsel ─── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-6 xl:col-span-5 relative flex items-center justify-center"
          >
            {/* Büyük amber radyal arka plan */}
            <div className="absolute inset-0 radial-amber opacity-60 blur-xl scale-90" />

            {/* Görsel kabı */}
            <div className="relative w-full max-w-lg mx-auto">

              {/* Dönen dış halka dekorasyonu */}
              <div className="absolute inset-[-20px] rounded-full border border-primary/10 animate-slow-spin" />
              <div className="absolute inset-[-50px] rounded-full border border-primary/5 animate-slow-spin [animation-duration:35s] [animation-direction:reverse]" />

              {/* Ana görsel — yüzen animasyon */}
              <div className="relative animate-float">
                <div className="relative overflow-hidden rounded-[2.5rem] glow-amber">
                  <Image
                    src="/images/hero-walnuts.png"
                    alt="Taze Kemah Cevizleri"
                    width={560}
                    height={560}
                    className="w-full object-cover aspect-square"
                    priority
                  />
                  {/* İç gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                </div>

                {/* Alt bilgi rozeti — glassmorphism */}
                <div className="absolute bottom-4 left-4 right-4 glass-card rounded-2xl p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0 animate-glow-amber">
                      <Leaf className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-xs leading-tight">Yeni Sezon Hasadı</h4>
                      <p className="text-[10px] text-muted-foreground">Sınırlı Stok • Taze Kırım</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="block text-[10px] text-muted-foreground line-through">299 TL</span>
                    <span className="font-extrabold text-primary text-base leading-tight">240 TL</span>
                  </div>
                </div>
              </div>

              {/* Yıldız rozeti — sağ üst köşe */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
                className="absolute -top-4 -right-4 glass-card rounded-2xl px-3 py-2 flex items-center gap-1.5 glow-amber-sm"
              >
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-xs font-bold text-foreground">4.9</span>
              </motion.div>

              {/* "Organik" rozeti — sol üst */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
                className="absolute -top-2 -left-4 glass-card rounded-2xl px-3 py-2 glow-green-sm"
              >
                <span className="text-xs font-bold text-accent flex items-center gap-1">
                  <Leaf className="h-3 w-3" />
                  Organik & İlaçsız
                </span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Alt kaydırma göstergesi */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-semibold text-muted-foreground/50 uppercase tracking-widest">
          Keşfet
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-primary/50 to-transparent animate-float" />
      </motion.div>
    </section>
  );
}
