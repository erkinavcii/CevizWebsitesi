"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, Shield, Heart } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function StorySummary() {
  return (
    <section className="py-24 bg-muted/20 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Visual media container (Left) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative order-last lg:order-first"
          >
            {/* Geometric shadow background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/25 to-secondary/25 rounded-[3rem] rotate-3 blur-sm" />
            
            {/* Image card wrapper */}
            <div className="relative overflow-hidden rounded-[3rem] border-4 border-card bg-card shadow-2xl transition-transform duration-500 hover:scale-[1.01]">
              <Image
                src="/images/hero-walnuts.png"
                alt="Kemah Ceviz Bahçesi Aile Hikayemiz"
                width={600}
                height={600}
                className="w-full object-cover aspect-square"
              />
              
              {/* Overlapping small visual card inside */}
              <div className="absolute top-6 right-6 bg-accent text-white rounded-2xl p-4 shadow-xl max-w-[200px] border border-white/10 hidden sm:block">
                <span className="block font-black text-3xl font-heading leading-tight">30+ Yıl</span>
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-90 leading-tight">Ata Tohumu ve Geleneksel Deneyim</span>
              </div>
            </div>
          </motion.div>

          {/* Text Content (Right) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3.5 py-1.5 text-xs font-bold text-accent dark:bg-accent/20">
                <Leaf className="h-4 w-4" />
                Kemah'ın Eşsiz Coğrafyası
              </span>
              
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl font-heading text-zinc-900 dark:text-zinc-50">
                Kemah Vadisi'nden Sofranıza Aile Hikayemiz
              </h2>
              
              <p className="text-muted-foreground text-base leading-relaxed">
                Erzincan'ın tarihi Kemah ilçesinde, Munzur Dağları'nın eteklerinde yer alan aile bahçemizde 30 yılı aşkın süredir geleneksel yöntemlerle tarım yapıyoruz. Vadinin 1.200 metreyi aşan yüksek rakımı, bol güneşli gün sayısı ve serin gece esintileri, cevizlerimizin yağ oranını artırarak onlara o benzersiz dolgunluğu ve aromayı kazandırıyor.
              </p>
              
              <p className="text-muted-foreground text-base leading-relaxed">
                Babamızın elleriyle diktiği, evladımız gibi bakıp büyüttüğümüz ağaçlarımızdan elde ettiğimiz her bir cevizi; araya hiçbir komisyoncu, kabzımal veya toptancı sokmadan doğrudan sofranıza ulaştırıyoruz. Bu hem bizim emeğimizin karşılık bulmasını sağlıyor hem de sizin en taze mahsule en dürüst fiyatla ulaşmanıza vesile oluyor.
              </p>
            </motion.div>

            {/* Micro Highlights Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border"
            >
              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <Leaf className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-50">Sürdürülebilir Tarım</h4>
                  <p className="text-xs text-muted-foreground leading-normal mt-0.5">Toprağı yormayan, doğal ekosistemi koruyan geleneksel gübreleme.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-50">Hasat Tazeliği</h4>
                  <p className="text-xs text-muted-foreground leading-normal mt-0.5">Kabuğunda bekletilen cevizlerin sipariş geldikçe el kırması yapılması.</p>
                </div>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <Link
                href="/hikayemiz"
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "bg-primary hover:bg-primary/95 text-primary-foreground font-semibold px-8 h-13 rounded-xl flex items-center justify-center gap-2"
                )}
              >
                Hikayemizin Tamamını Oku
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
