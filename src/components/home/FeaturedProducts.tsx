"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Star, ArrowRight, ShieldCheck, Scale } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const FEATURED_PRODUCTS = [
  {
    id: "prod-1",
    name: "Kemah Kabuklu Çiftçi Cevizi",
    slug: "kemah-kabuklu-ceviz",
    description: "Kemah Vadisi'nin yüksek rakımlı bahçelerinden, ince kabuklu, dolgun iç oranına sahip, tamamen doğal gübreyle yetiştirilmiş yeni mahsul kabuklu ceviz.",
    price: 240, // TL per kg
    image: "/images/hero-walnuts.png",
    tag: "Yeni Sezon Hasadı",
    rating: 4.9,
    reviewsCount: 124,
    features: ["İnce Kabuklu", "Dolgun Doluluk Oranı", "100% Doğal Kurutulmuş"]
  },
  {
    id: "prod-2",
    name: "Kemah Beyaz Kelebek İç Ceviz",
    slug: "kemah-ic-ceviz",
    description: "El kırması yöntemiyle kabuğundan özenle ayrılmış, %90'ın üzerinde 'Kelebek' bütünlüğünde, acılık barındırmayan, ekstra beyaz birinci kalite iç ceviz.",
    price: 490, // TL per kg
    image: "/images/shelled-walnuts.png",
    tag: "En Çok Satan",
    rating: 5.0,
    reviewsCount: 86,
    features: ["%90+ Kelebek Bütünlük", "Acı Tat İçermez", "Ekstra Beyaz Sınıfı"]
  }
];

export function FeaturedProducts() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3.5 py-1.5 text-xs font-bold text-accent dark:bg-accent/20"
          >
            <ShieldCheck className="h-4 w-4" />
            Özenle Seçilmiş Mahsuller
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl font-heading text-foreground"
          >
            Bahçemizin En Seçkin Ürünleri
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            Kemah'ın yüksek yaylalarında, temiz kaynak sularıyla beslenen ağaçlarımızdan elde ettiğimiz, besin değerleri en üst düzeydeki cevizlerimiz.
          </motion.p>
        </div>

        {/* Products Grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:max-w-5xl lg:mx-auto">
          {FEATURED_PRODUCTS.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="flex"
            >
              <Card className="group relative overflow-hidden rounded-[2.5rem] border bg-card text-card-foreground shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between w-full h-full">
                {/* Visual Media */}
                <div className="relative overflow-hidden aspect-[4/3] bg-muted w-full">
                  <span className="absolute top-4 left-4 z-10 inline-flex items-center rounded-full bg-secondary px-3.5 py-1.5 text-xs font-extrabold text-white shadow-md">
                    {product.tag}
                  </span>
                  
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <CardContent className="p-8 flex flex-col flex-1 justify-between space-y-6">
                  <div className="space-y-4">
                    {/* Stars and Rating */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 bg-secondary/10 px-3 py-1 rounded-full text-xs font-bold text-secondary">
                        <Star className="h-3.5 w-3.5 fill-secondary" />
                        <span>{product.rating}</span>
                        <span className="text-secondary/70 font-medium">({product.reviewsCount} Yorum)</span>
                      </div>
                      <span className="text-xs font-bold text-accent bg-accent/10 px-3 py-1 rounded-full flex items-center gap-1">
                        <Scale className="h-3 w-3" />
                        Min. 1 Kg Alım
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold tracking-tight text-foreground font-heading">
                      {product.name}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {product.description}
                    </p>

                    {/* Product Features List */}
                    <ul className="space-y-2 pt-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-xs font-bold text-zinc-700 dark:text-zinc-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing and Actions */}
                  <div className="pt-6 border-t border-border flex items-center justify-between">
                    <div>
                      <span className="text-xs text-muted-foreground block font-medium">Kilogram Fiyatı</span>
                      <span className="text-3xl font-black text-secondary tracking-tight">
                        {product.price} TL
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link
                        href="/urunler"
                        className={cn(
                          buttonVariants({ variant: "outline", size: "sm" }),
                          "h-11 px-4 rounded-xl font-bold border-zinc-300 text-foreground hover:bg-muted"
                        )}
                      >
                        İncele
                      </Link>
                      <Link
                        href="/urunler"
                        className={cn(
                          buttonVariants({ variant: "default", size: "sm" }),
                          "bg-primary hover:bg-primary/95 text-white font-bold h-11 px-5 rounded-xl flex items-center gap-1.5 shadow-md shadow-primary/10 active:scale-95"
                        )}
                      >
                        <ShoppingBag className="h-4 w-4" />
                        Satın Al
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Link
            href="/urunler"
            className={cn(
              buttonVariants({ variant: "ghost", size: "lg" }),
              "text-primary hover:text-primary/90 font-bold flex items-center justify-center gap-2 group text-base"
            )}
          >
            Tüm Ürün Kataloğumuzu İnceleyin
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
