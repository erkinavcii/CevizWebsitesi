"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, ShieldCheck, Truck } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-32">
      {/* Background soft decoration */}
      <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-secondary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-accent/5 blur-3xl" />

      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-8">
            {/* Badges / Micro interactions */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap gap-3"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent dark:bg-accent/20">
                <Leaf className="h-3.5 w-3.5" />
                100% Doğal ve İlaçsız
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary dark:bg-secondary/20">
                <ShieldCheck className="h-3.5 w-3.5" />
                Sertifikalı Bahçe
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary dark:bg-primary/20">
                <Truck className="h-3.5 w-3.5" />
                Doğrudan Kapınıza
              </span>
            </motion.div>

            {/* Headline */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl font-heading"
              >
                Toprağın En Saf Lezzeti,{" "}
                <span className="text-secondary block lg:inline">Doğrudan Bahçeden.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-2xl text-lg text-muted-foreground leading-relaxed"
              >
                Kemah Vadisi&apos;nin eşsiz ikliminde, hiçbir kimyasal ilaç ve koruyucu kullanmadan özenle yetiştirdiğimiz taptaze, ince kabuklu, dolgun cevizlerimizi doğrudan bahçemizden sofranıza ulaştırıyoruz.
              </motion.p>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/urunler"
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "bg-primary hover:bg-primary/95 text-primary-foreground font-semibold px-8 h-14 rounded-xl shadow-lg shadow-primary/20 group flex items-center justify-center gap-2"
                )}
              >
                Alışverişe Başla
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/hikayemiz"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-border hover:bg-muted font-semibold px-8 h-14 rounded-xl flex items-center justify-center"
                )}
              >
                Hikayemiz
              </Link>
            </motion.div>

            {/* Statistics / Trust Builders */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-6 border-t pt-8 border-border"
            >
              <div>
                <span className="block text-3xl font-extrabold text-secondary">0%</span>
                <span className="text-xs text-muted-foreground font-medium">Katkı Maddesi</span>
              </div>
              <div>
                <span className="block text-3xl font-extrabold text-secondary">24 Saat</span>
                <span className="text-xs text-muted-foreground font-medium">Tazelik Garantisi</span>
              </div>
              <div>
                <span className="block text-3xl font-extrabold text-secondary">4.9/5</span>
                <span className="text-xs text-muted-foreground font-medium">Müşteri Puanı</span>
              </div>
            </motion.div>
          </div>

          {/* Visual Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Geometric shadow background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 to-accent/20 rounded-[2.5rem] rotate-3 blur-sm" />
            
            {/* The main image card */}
            <div className="relative overflow-hidden rounded-[2.5rem] border-4 border-card bg-card shadow-2xl transition-transform duration-500 hover:scale-[1.01]">
              <Image
                src="/images/hero-walnuts.png"
                alt="Taze Ceviz Bahçesi Cevizleri"
                width={600}
                height={600}
                className="w-full object-cover aspect-square"
                priority
              />
              
              {/* Overlay highlight badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-background/90 backdrop-blur-md rounded-2xl p-4 border border-border flex items-center justify-between shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                    <Leaf className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm leading-tight">Yeni Sezon Hasadı</h4>
                    <p className="text-xs text-muted-foreground">Sınırlı Stok, Taze Kırım</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-muted-foreground line-through block">299 TL</span>
                  <span className="font-extrabold text-accent text-lg">249 TL</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
