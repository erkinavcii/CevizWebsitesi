"use client";

import { motion } from "framer-motion";
import { Star, Quote, CheckCircle2 } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Merve Şahin",
    city: "İstanbul",
    initial: "M",
    rating: 5,
    text: "Cevizler tek kelimeyle harika! İncecik kabuğu var, elle bile rahatça kırılıyor. En önemlisi içi dolup taşmış, bembeyaz ve taptaze. Paketlenmesi de çok özenliydi, vakumlu poşette hiç ezilmeden geldi. Teşekkürler!",
    product: "Kemah Kabuklu Çiftçi Cevizi",
    date: "12 Nisan 2026",
  },
  {
    name: "Hakan Yılmaz",
    city: "Ankara",
    initial: "H",
    rating: 5,
    text: "İç ceviz aldım, böylesini uzun zamandır yememiştim. Gerçekten 'kelebek' dedikleri gibi neredeyse tamamı bütün ve firesiz. En önemlisi o acı, bayat market cevizlerinin tadı yok, taptaze bahçe kokuyor. Kesinlikle tekrar alacağım.",
    product: "Kemah Beyaz Kelebek İç Ceviz",
    date: "28 Mart 2026",
  },
  {
    name: "Ayşe Demir",
    city: "İzmir",
    initial: "A",
    rating: 5,
    text: "İlaçsız ve doğal olması benim için çok önemliydi, çocuklarıma güvenle yediriyorum. Pestisit analiz raporunu sitede görmek de ayrıca güven verdi. Kargo çok hızlıydı, 1 günde kapıma geldi. Hayırlı kazançlar dilerim.",
    product: "Kemah Kabuklu Çiftçi Cevizi",
    date: "5 Mayıs 2026",
  },
  {
    name: "Cemil Kaya",
    city: "Bursa",
    initial: "C",
    rating: 5,
    text: "Her yıl kış öncesi alıyorum, bu sene de kalite düşmemiş aksine daha iyi gibi. Fındık gibi dolgun cevizler, 20 kg aldım hemencecik bitti. Çocuklar çiğ çiğ yiyor, sağolasınız.",
    product: "Kemah Kabuklu Çiftçi Cevizi",
    date: "3 Haziran 2026",
  },
  {
    name: "Fatma Eroğlu",
    city: "Konya",
    initial: "F",
    rating: 5,
    text: "İç cevizin rengi gerçekten bambaşka, bembeyaz. Markettekilerle hiç kıyaslanamaz. Kelebek bütünlüğü de neredeyse yüzde yüz, bayıldım. Pastam için harika oldu.",
    product: "Kemah Beyaz Kelebek İç Ceviz",
    date: "18 Nisan 2026",
  },
  {
    name: "Osman Tunç",
    city: "Trabzon",
    initial: "O",
    rating: 5,
    text: "Fiyat-kalite dengesi mükemmel. Aynı kaliteyi markette bulmak imkansız. Doğrudan üreticiden alışverişin önemi böyle anlıyorsunuz. Bir daha sipariş verdim bile.",
    product: "Kemah Kabuklu Çiftçi Cevizi",
    date: "30 Mayıs 2026",
  },
];

export function Testimonials() {
  return (
    <section className="py-32 overflow-hidden" style={{ background: "#100D0B" }}>
      <div className="container mx-auto px-4 max-w-7xl">

        {/* Bölüm Başlığı */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-5">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold border border-primary/30 bg-primary/10 text-primary"
          >
            Müşteri Yorumları
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl text-foreground"
          >
            Sofralardan Gelen{" "}
            <span className="gradient-text-amber italic">Mutluluk</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-base sm:text-lg leading-relaxed"
          >
            Bahçemizden ceviz ulaştırdığımız yüzlerce bilinçli tüketicinin dürüst yorumları.
          </motion.p>
        </div>

        {/* Marquee Slider — Otomatik Kaydırma */}
        <div className="relative">
          {/* Sol fade maskesi */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#100D0B] to-transparent z-10 pointer-events-none" />
          {/* Sağ fade maskesi */}
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#100D0B] to-transparent z-10 pointer-events-none" />

          {/* Kaydırma şeridi */}
          <div className="flex gap-6 animate-marquee w-max">
            {/* İlk set */}
            {TESTIMONIALS.map((t, idx) => (
              <TestimonialCard key={`a-${idx}`} t={t} />
            ))}
            {/* Kopya set — seamless loop için */}
            {TESTIMONIALS.map((t, idx) => (
              <TestimonialCard key={`b-${idx}`} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div className="glass-card rounded-[2rem] p-7 w-80 shrink-0 flex flex-col justify-between border border-border/30 hover:border-primary/30 transition-colors duration-300 relative overflow-hidden group">
      {/* Büyük tırnak işareti */}
      <div className="absolute -top-3 -right-3 h-16 w-16 text-primary/10 group-hover:text-primary/20 transition-colors duration-300 pointer-events-none">
        <Quote className="h-full w-full rotate-180" />
      </div>

      <div className="space-y-4 relative z-10">
        {/* Yıldızlar */}
        <div className="flex items-center gap-0.5">
          {[...Array(t.rating)].map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
          ))}
        </div>

        {/* Yorum metni */}
        <p className="text-muted-foreground text-sm leading-relaxed">
          &ldquo;{t.text}&rdquo;
        </p>
      </div>

      {/* Müşteri bilgisi */}
      <div className="pt-5 mt-auto border-t border-border/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold text-sm font-heading shrink-0">
            {t.initial}
          </div>
          <div>
            <h4 className="font-bold text-xs text-foreground">{t.name}</h4>
            <p className="text-[10px] text-muted-foreground">{t.city} • {t.date}</p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 border border-accent/20 px-2 py-0.5 text-[9px] font-bold text-accent">
            <CheckCircle2 className="h-2.5 w-2.5 shrink-0" />
            Doğrulanmış
          </span>
        </div>
      </div>
    </div>
  );
}
