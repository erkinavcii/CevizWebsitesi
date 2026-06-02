"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, Shield } from "lucide-react";

export function StorySummary() {
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      {/* Dekoratif arka plan */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 -translate-y-1/2 -left-40 w-[600px] h-[600px] rounded-full bg-accent/4 blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/4 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center">

          {/* ─── SOL: Görsel ─── */}
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-5 relative order-last lg:order-first"
          >
            {/* Dekoratif glow çerçeve */}
            <div className="absolute -inset-3 rounded-[3.5rem] glow-amber opacity-30 blur-xl" />
            <div className="absolute -inset-6 rounded-[4rem] border border-primary/10 animate-slow-spin" />

            {/* Ana görsel */}
            <div className="relative overflow-hidden rounded-[3rem] border border-primary/20 animate-float-reverse">
              <Image
                src="/images/hero-walnuts.png"
                alt="Kemah Ceviz Bahçesi Aile Hikayemiz"
                width={600}
                height={600}
                className="w-full object-cover aspect-square"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-background/40 via-transparent to-transparent" />
            </div>

            {/* Yıl rozeti — sağ üst */}
            <div className="absolute top-6 -right-4 glass-card rounded-2xl px-4 py-3 border border-primary/20 animate-glow-amber shadow-xl">
              <span className="block font-heading font-black text-3xl text-primary leading-tight">30+</span>
              <span className="block text-[10px] uppercase font-bold tracking-wider text-muted-foreground leading-tight">Yıl Deneyim</span>
            </div>

            {/* Alt sol rozet */}
            <div className="absolute bottom-6 -left-4 glass-card rounded-2xl px-4 py-3 border border-accent/20 animate-glow-green shadow-xl">
              <span className="flex items-center gap-1.5 text-accent text-xs font-bold">
                <Leaf className="h-4 w-4" />
                Sertifikalı Bahçe
              </span>
            </div>
          </motion.div>

          {/* ─── SAĞ: Metin ─── */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-5"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold border border-accent/30 bg-accent/10 text-accent">
                <Leaf className="h-3.5 w-3.5" />
                Kemah&apos;ın Eşsiz Coğrafyası
              </span>

              <h2 className="font-heading font-bold text-4xl sm:text-5xl md:text-[3.25rem] leading-[1.1] text-foreground">
                Kemah Vadisi&apos;nden{" "}
                <span className="gradient-text-amber italic">Sofranıza</span>
                {" "}Aile Hikayemiz
              </h2>

              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                Erzincan&apos;ın tarihi Kemah ilçesinde, Munzur Dağları&apos;nın eteklerinde yer alan aile bahçemizde
                30 yılı aşkın süredir geleneksel yöntemlerle tarım yapıyoruz. Vadinin 1.200 metreyi aşan
                yüksek rakımı, bol güneşli gün sayısı ve serin gece esintileri, cevizlerimizin yağ oranını
                artırarak onlara o benzersiz dolgunluğu ve aromayı kazandırıyor.
              </p>

              <p className="text-muted-foreground text-base leading-relaxed">
                Babamızın elleriyle diktiği ağaçlarımızdan elde ettiğimiz her bir cevizi; araya hiçbir 
                komisyoncu sokmadan doğrudan sofranıza ulaştırıyoruz.
              </p>
            </motion.div>

            {/* Micro özellikler */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-border/30"
            >
              <div className="glass-card rounded-2xl p-4 flex gap-3 border border-border/30 hover:border-accent/30 transition-colors duration-300">
                <div className="h-10 w-10 rounded-xl bg-accent/15 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                  <Leaf className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-foreground">Sürdürülebilir Tarım</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                    Toprağı yormayan, doğal ekosistemi koruyan geleneksel gübreleme.
                  </p>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-4 flex gap-3 border border-border/30 hover:border-primary/30 transition-colors duration-300">
                <div className="h-10 w-10 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-foreground">Hasat Tazeliği</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                    Kabuğunda bekletilen cevizlerin sipariş geldikçe el kırması yapılması.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <Link
                href="/hikayemiz"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-bold text-background bg-primary hover:bg-primary/90 transition-all duration-300 glow-amber-sm hover:glow-amber"
              >
                Hikayemizin Tamamını Oku
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
