"use client";

import { motion } from "framer-motion";
import { Leaf, ShieldCheck, Heart, Users, Truck, Snowflake } from "lucide-react";

const VALUE_PROPOSITIONS = [
  {
    Icon: Leaf,
    title: "100% Doğal & İlaçsız",
    description: "Bahçemizde hiçbir kimyasal pestisit, suni hormon ve koruyucu kullanmıyoruz. Sadece organik gübre ve kaynak suyu.",
    glowClass: "glow-green-sm",
    borderHover: "hover:border-accent/40",
    iconBg: "bg-accent/15 border-accent/20 text-accent",
    accentColor: "#5AA469",
  },
  {
    Icon: ShieldCheck,
    title: "Analizli ve Sertifikalı",
    description: "Cevizlerimizin her hasat döneminde laboratuvar testleri ve ilaç kalıntısı (pestisit) analizleri yapılmakta ve belgelenmektedir.",
    glowClass: "glow-amber-sm",
    borderHover: "hover:border-primary/40",
    iconBg: "bg-primary/15 border-primary/20 text-primary",
    accentColor: "#D4A017",
  },
  {
    Icon: Users,
    title: "Aracısız, Doğrudan Üreticiden",
    description: "Büyük aracılar, kabzımallar ve komisyoncular yok. Aile bahçemizden doğrudan sizin kapınıza ulaştırarak uygun fiyat sunuyoruz.",
    glowClass: "glow-brown-sm",
    borderHover: "hover:border-secondary/40",
    iconBg: "bg-secondary/15 border-secondary/20 text-secondary",
    accentColor: "#8B6F54",
  },
  {
    Icon: Snowflake,
    title: "Taze Hasat ve Taze Kırım",
    description: "Ekim ayındaki hasattan sonra cevizleri kabuklu saklıyoruz. İç ceviz siparişiniz geldiğinde el kırmasıyla taze kırım yapıyoruz.",
    glowClass: "glow-green-sm",
    borderHover: "hover:border-accent/40",
    iconBg: "bg-accent/15 border-accent/20 text-accent",
    accentColor: "#5AA469",
  },
  {
    Icon: Truck,
    title: "Özel Korumalı Kargo",
    description: "Cevizlerinizin tazeliğini ve aromasını korumak için kalın vakumlu poşetlerde veya bez torbalarda, kırılmaya karşı korumalı paketliyoruz.",
    glowClass: "glow-amber-sm",
    borderHover: "hover:border-primary/40",
    iconBg: "bg-primary/15 border-primary/20 text-primary",
    accentColor: "#D4A017",
  },
  {
    Icon: Heart,
    title: "Sağlıklı ve Besleyici",
    description: "Omega-3 yağ asitleri, antioksidanlar ve lif bakımından zengin Kemah cevizleri, beyin ve kalp sağlığınız için en doğal destektir.",
    glowClass: "glow-green-sm",
    borderHover: "hover:border-accent/40",
    iconBg: "bg-accent/15 border-accent/20 text-accent",
    accentColor: "#5AA469",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-32 bg-background-alt relative overflow-hidden" style={{ background: "#100D0B" }}>
      {/* Dekoratif arka plan */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/4 blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/3 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">

        {/* Bölüm Başlığı */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-5">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold border border-primary/30 bg-primary/10 text-primary"
          >
            Neden Biz?
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl text-foreground"
          >
            Doğallığın ve{" "}
            <span className="gradient-text-amber italic">Kalitenin</span> Farkı
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-base sm:text-lg leading-relaxed"
          >
            Market raflarında aylarca bekleyen, ithal ve kimyasal işlem görmüş cevizler yerine,
            Erzincan Kemah&apos;taki bahçemizden gelen dürüst ve temiz gıda.
          </motion.p>
        </div>

        {/* Kart Grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {VALUE_PROPOSITIONS.map((prop, index) => {
            const Icon = prop.Icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                whileHover={{ y: -4 }}
                className={`group glass-card rounded-[2rem] p-7 space-y-5 border border-border/30 ${prop.borderHover} transition-all duration-400 cursor-default`}
              >
                {/* İkon */}
                <div
                  className={`h-12 w-12 rounded-2xl flex items-center justify-center border shrink-0 transition-all duration-300 ${prop.iconBg} group-hover:${prop.glowClass} group-hover:scale-110`}
                  style={{
                    transition: "box-shadow 0.3s ease, transform 0.3s ease",
                  }}
                >
                  <Icon className="h-5.5 w-5.5 transition-transform duration-300 group-hover:rotate-12" />
                </div>

                {/* Başlık */}
                <h3 className="font-heading font-bold text-lg text-foreground leading-snug">
                  {prop.title}
                </h3>

                {/* Açıklama */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {prop.description}
                </p>

                {/* Alt çizgi — hover'da beliren amber şerit */}
                <div
                  className="h-px w-0 group-hover:w-full transition-all duration-500 rounded-full"
                  style={{ background: prop.accentColor + "40" }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
