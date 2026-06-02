import Link from "next/link";
import { Leaf, Share2, MessageCircle, Mail, Phone, MapPin, ShieldCheck, Truck, RefreshCw } from "lucide-react";

const FOOTER_LINKS = {
  urunler: [
    { href: "/urunler", label: "Kabuklu Ceviz" },
    { href: "/urunler", label: "İç Ceviz" },
    { href: "/urunler", label: "Toplu Sipariş" },
    { href: "/urunler", label: "Hediye Paketi" },
  ],
  kurumsal: [
    { href: "/hikayemiz", label: "Hikayemiz" },
    { href: "/blog", label: "Blog" },
    { href: "/iletisim", label: "İletişim" },
    { href: "/admin", label: "Bayi Girişi" },
  ],
  destek: [
    { href: "/iletisim", label: "Sipariş Takibi" },
    { href: "/iletisim", label: "İade & Değişim" },
    { href: "/iletisim", label: "SSS" },
    { href: "/iletisim", label: "Gizlilik Politikası" },
  ],
};

const TRUST_BADGES = [
  { Icon: ShieldCheck, label: "Güvenli Ödeme" },
  { Icon: Truck, label: "Hızlı Kargo" },
  { Icon: RefreshCw, label: "İade Garantisi" },
  { Icon: Leaf, label: "100% Doğal" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/20" style={{ background: "#080604" }}>
      {/* Dekoratif arka plan */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] rounded-full bg-primary/4 blur-[120px]" />
        <div className="absolute top-0 right-1/4 w-[300px] h-[200px] rounded-full bg-accent/3 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">

        {/* Güven rozetleri şeridi */}
        <div className="py-8 border-b border-border/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TRUST_BADGES.map(({ Icon, label }) => (
              <div key={label} className="flex items-center gap-3 glass-card rounded-2xl px-4 py-3 border border-border/20">
                <div className="h-8 w-8 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-xs font-semibold text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Ana Footer İçeriği */}
        <div className="py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-5">

          {/* Marka */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="h-8 w-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center animate-glow-amber">
                <Leaf className="h-4 w-4 text-primary" />
              </div>
              <span className="text-xl font-heading font-bold">
                <span className="text-foreground">Ceviz</span>
                <span className="text-primary text-glow-amber">Bahçesi</span>
              </span>
            </Link>

            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Kemah Vadisi&apos;nin eşsiz ikliminde, 30+ yıllık geleneksel tarım deneyimiyle 
              yetiştirilen, ilaçsız ve taze cevizler. Doğrudan bahçeden, doğrudan sofranıza.
            </p>

            {/* İletişim */}
            <div className="space-y-3">
              <a href="tel:+905001234567" className="flex items-center gap-2.5 text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 group">
                <Phone className="h-3.5 w-3.5 text-primary group-hover:text-primary" />
                0500 123 45 67
              </a>
              <a href="mailto:info@cevizbahcesi.com" className="flex items-center gap-2.5 text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 group">
                <Mail className="h-3.5 w-3.5 text-primary" />
                info@cevizbahcesi.com
              </a>
              <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                Kemah, Erzincan, Türkiye
              </div>
            </div>

            {/* Sosyal medya */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-full glass-card border border-border/30 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:glow-amber-sm transition-all duration-300"
              >
              <Share2 className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/905001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-full glass-card border border-border/30 flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/40 hover:glow-green-sm transition-all duration-300"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Linkler */}
          <div className="space-y-5">
            <h3 className="font-heading font-bold text-sm text-foreground">Ürünlerimiz</h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.urunler.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1.5 group">
                    <span className="h-px w-3 bg-primary/40 group-hover:w-5 group-hover:bg-primary transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5">
            <h3 className="font-heading font-bold text-sm text-foreground">Kurumsal</h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.kurumsal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1.5 group">
                    <span className="h-px w-3 bg-primary/40 group-hover:w-5 group-hover:bg-primary transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5">
            <h3 className="font-heading font-bold text-sm text-foreground">Destek</h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.destek.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1.5 group">
                    <span className="h-px w-3 bg-primary/40 group-hover:w-5 group-hover:bg-primary transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Alt Çizgi */}
        <div className="py-6 border-t border-border/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-muted-foreground/60">
            © {new Date().getFullYear()} CevizBahçesi. Tüm hakları saklıdır. Kemah, Erzincan — Türkiye
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-muted-foreground/40">Güvenli ödeme:</span>
            <span className="text-[11px] font-bold text-muted-foreground/60 border border-border/20 px-2 py-0.5 rounded glass-dark">VISA</span>
            <span className="text-[11px] font-bold text-muted-foreground/60 border border-border/20 px-2 py-0.5 rounded glass-dark">Mastercard</span>
            <span className="text-[11px] font-bold text-muted-foreground/60 border border-border/20 px-2 py-0.5 rounded glass-dark">iyzico</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
