"use client";

import { motion } from "framer-motion";
import { Star, Quote, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TESTIMONIALS = [
  {
    name: "Merve Şahin",
    city: "İstanbul",
    rating: 5,
    text: "Cevizler tek kelimeyle harika! İncecik kabuğu var, elle bile rahatça kırılıyor. En önemlisi içi dolup taşmış, bembeyaz ve taptaze. Paketlenmesi de çok özenliydi, vakumlu poşette hiç ezilmeden geldi. Teşekkürler!",
    product: "Kemah Kabuklu Çiftçi Cevizi",
    date: "12 Nisan 2026"
  },
  {
    name: "Hakan Yılmaz",
    city: "Ankara",
    rating: 5,
    text: "İç ceviz aldım, böylesini uzun zamandır yememiştim. Gerçekten 'kelebek' dedikleri gibi neredeyse tamamı bütün ve firesiz. En önemlisi o acı, bayat market cevizlerinin tadı yok, taptaze bahçe kokuyor. Kesinlikle tekrar alacağım.",
    product: "Kemah Beyaz Kelebek İç Ceviz",
    date: "28 Mart 2026"
  },
  {
    name: "Ayşe Demir",
    city: "İzmir",
    rating: 5,
    text: "İlaçsız ve doğal olması benim için çok önemliydi, çocuklarıma güvenle yediriyorum. Pestisit analiz raporunu sitede görmek de ayrıca güven verdi. Kargo çok hızlıydı, 1 günde kapıma geldi. Hayırlı kazançlar dilerim.",
    product: "Kemah Kabuklu Çiftçi Cevizi",
    date: "5 Mayıs 2026"
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 rounded-full bg-secondary/10 px-3.5 py-1.5 text-xs font-bold text-secondary dark:bg-secondary/20"
          >
            Müşteri Yorumları
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl font-heading text-zinc-900 dark:text-zinc-50"
          >
            Sofralardan Gelen Mutluluk
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-base"
          >
            Bahçemizden ceviz ulaştırdığımız yüzlerce bilinçli tüketicinin dürüst yorumları ve deneyimleri.
          </motion.p>
        </div>

        {/* Grid of Testimonials */}
        <div className="grid gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex"
            >
              <Card className="border bg-card shadow-sm hover:shadow-md transition-all duration-300 rounded-[2rem] flex flex-col justify-between w-full h-full relative group overflow-hidden">
                {/* Visual Quote mark */}
                <div className="absolute -top-4 -right-4 h-16 w-16 text-zinc-100 dark:text-zinc-800 -z-10 group-hover:scale-110 transition-transform duration-300">
                  <Quote className="h-full w-full rotate-180" />
                </div>
                
                <CardContent className="p-8 space-y-6 flex flex-col justify-between h-full">
                  <div className="space-y-4">
                    {/* Stars */}
                    <div className="flex items-center gap-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                      ))}
                    </div>

                    {/* Text */}
                    <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed italic">
                      "{t.text}"
                    </p>
                  </div>

                  {/* Customer details */}
                  <div className="pt-6 border-t border-border flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-50">{t.name}</h4>
                      <p className="text-[10px] text-muted-foreground font-semibold">{t.city} • {t.date}</p>
                    </div>

                    <div className="text-right flex flex-col items-end">
                      <span className="inline-flex items-center gap-1 rounded bg-accent/10 px-2 py-0.5 text-[9px] font-bold text-accent dark:bg-accent/20">
                        <CheckCircle2 className="h-3 w-3 shrink-0" />
                        Doğrulanmış Alıcı
                      </span>
                      <span className="text-[9px] text-muted-foreground font-medium mt-1 truncate max-w-[130px]">{t.product}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
