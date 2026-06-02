"use client";

import { motion } from "framer-motion";
import { Leaf, ShieldCheck, Heart, Users, Truck, Snowflake } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const VALUE_PROPOSITIONS = [
  {
    icon: Leaf,
    title: "100% Doğal & İlaçsız",
    description: "Bahçemizde hiçbir kimyasal pestisit, suni hormon ve koruyucu kullanmıyoruz. Sadece organik gübre ve kaynak suyu.",
    color: "text-accent bg-accent/10 border-accent/20"
  },
  {
    icon: ShieldCheck,
    title: "Analizli ve Sertifikalı",
    description: "Cevizlerimizin her hasat döneminde laboratuvar testleri ve ilaç kalıntısı (pestisit) analizleri yapılmakta ve belgelenmektedir.",
    color: "text-secondary bg-secondary/10 border-secondary/20"
  },
  {
    icon: Users,
    title: "Aracısız, Doğrudan Üreticiden",
    description: "Büyük aracılar, kabzımallar ve komisyoncular yok. Aile bahçemizden doğrudan sizin kapınıza ulaştırarak uygun fiyat sunuyoruz.",
    color: "text-primary bg-primary/10 border-primary/20"
  },
  {
    icon: Snowflake,
    title: "Taze Hasat ve Taze Kırım",
    description: "Ekim ayındaki hasattan sonra cevizleri kabuklu saklıyoruz. İç ceviz siparişiniz geldiğinde el kırmasıyla taze kırım yapıyoruz.",
    color: "text-blue-600 bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800/20"
  },
  {
    icon: Truck,
    title: "Özel Korumalı Kargo",
    description: "Cevizlerinizin tazeliğini ve aromasını korumak için kalın vakumlu poşetlerde veya bez torbalarda, kırılmaya karşı korumalı paketliyoruz.",
    color: "text-amber-600 bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800/20"
  },
  {
    icon: Heart,
    title: "Sağlıklı ve Besleyici",
    description: "Omega-3 yağ asitleri, antioksidanlar ve lif bakımından zengin Kemah cevizleri, beyin ve kalp sağlığınız için en doğal destektir.",
    color: "text-rose-600 bg-rose-50 dark:bg-rose-900/10 border-rose-200 dark:border-rose-800/20"
  }
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative Blur Background elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -z-10 h-[500px] w-[500px] rounded-full bg-accent/5 blur-3xl" />
      <div className="absolute bottom-0 right-0 -z-10 h-[300px] w-[300px] rounded-full bg-secondary/5 blur-3xl" />

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-bold text-primary dark:bg-primary/20"
          >
            Neden Biz?
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl font-heading text-zinc-900 dark:text-zinc-50"
          >
            Doğallığın ve Kalitenin Farkı
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-base"
          >
            Market raflarında aylarca bekleyen, ithal ve kimyasal işlem görmüş cevizler yerine, Erzincan Kemah'taki bahçemizden gelen dürüst ve temiz gıda.
          </motion.p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {VALUE_PROPOSITIONS.map((prop, index) => {
            const Icon = prop.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="flex"
              >
                <Card className="border bg-card shadow-sm hover:shadow-md transition-all duration-300 rounded-[2rem] overflow-hidden flex flex-col w-full group hover:border-primary/30">
                  <CardContent className="p-8 space-y-6 flex flex-col justify-between h-full">
                    <div className="space-y-4">
                      {/* Icon container */}
                      <div className={`h-12 w-12 rounded-2xl flex items-center justify-center border shrink-0 transition-transform group-hover:scale-110 duration-300 ${prop.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 font-heading">
                        {prop.title}
                      </h3>
                      
                      <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                        {prop.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
