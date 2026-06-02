import { Hero } from "@/components/home/Hero";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { StorySummary } from "@/components/home/StorySummary";
import { Testimonials } from "@/components/home/Testimonials";
import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <FeaturedProducts />
      <WhyChooseUs />
      <StorySummary />
      <Testimonials />

      {/* Bottom Call to Action (CTA) */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 -z-10 h-[300px] w-[300px] rounded-full bg-white/5 blur-3xl" />

        <div className="container mx-auto px-4 text-center max-w-4xl space-y-8">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl font-heading text-white">
            Taptaze Bahçe Lezzetini Kaçırmayın
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Ekim 2026 hasadı cevizlerimizin satışı devam ediyor. Siparişiniz üzerine taze kırılan iç cevizlerimizi veya dolgun kabuklu cevizlerimizi hemen sepete ekleyin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/urunler"
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                "bg-white text-primary hover:bg-zinc-100 font-bold px-8 h-14 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-white/5"
              )}
            >
              <ShoppingBag className="h-5 w-5" />
              Şimdi Sipariş Ver
            </Link>
            <Link
              href="/iletisim"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-white/30 hover:bg-white/10 text-white font-bold px-8 h-14 rounded-xl flex items-center justify-center gap-2"
              )}
            >
              Bize Ulaşın
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

