"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Trash2, ArrowRight, ShieldCheck, Scale, Truck, Percent, Sparkles, Send, CheckCircle2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Mock Products
const MOCK_PRODUCTS = [
  {
    id: "prod-1",
    name: "Kemah Kabuklu Çiftçi Cevizi",
    slug: "kemah-kabuklu-ceviz",
    description: "Kemah Vadisi'nin yüksek rakımlı bahçelerinden, ince kabuklu, dolgun iç oranına sahip, tamamen doğal gübreyle yetiştirilmiş yeni mahsul kabuklu ceviz.",
    pricePerKg: 240, // TL per kg
    image: "/images/hero-walnuts.png",
    tag: "Yeni Sezon",
    rating: "4.9 (124 Değerlendirme)"
  },
  {
    id: "prod-2",
    name: "Kemah Beyaz Kelebek İç Ceviz",
    slug: "kemah-ic-ceviz",
    description: "El kırması yöntemiyle kabuğundan özenle ayrılmış, %90'ın üzerinde 'Kelebek' bütünlüğünde, acılık barındırmayan, ekstra beyaz birinci kalite iç ceviz.",
    pricePerKg: 490, // TL per kg
    image: "/images/shelled-walnuts.png",
    tag: "En Çok Satan",
    rating: "5.0 (86 Değerlendirme)"
  }
];

// Cart Item Type
interface CartItem {
  id: string; // combination of prodId and weight
  productId: string;
  name: string;
  weightKg: number;
  pricePerKg: number;
  totalPrice: number;
  image: string;
}

export default function UrunlerPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedWeights, setSelectedWeights] = useState<Record<string, number>>({
    "prod-1": 3, // Default 3kg (minimum requirement)
    "prod-2": 3
  });
  
  // Checkout simulation modal/state
  const [showSimModal, setShowSimModal] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Weight options (minimum 3 kg as requested)
  const weightOptions = [3, 5, 10, 20];

  // Add to cart logic
  const handleAddToCart = (productId: string) => {
    const product = MOCK_PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const selectedWeight = selectedWeights[productId];
    const cartItemId = `${productId}-${selectedWeight}`;

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === cartItemId);
      if (existingItem) {
        // If exact same product & weight exists, we don't duplicate, just notify
        return prevCart;
      }
      
      const newItem: CartItem = {
        id: cartItemId,
        productId: product.id,
        name: `${product.name} (${selectedWeight} Kg)`,
        weightKg: selectedWeight,
        pricePerKg: product.pricePerKg,
        totalPrice: product.pricePerKg * selectedWeight,
        image: product.image
      };
      
      return [...prevCart, newItem];
    });

    // Simple temporary toast trigger
    const toastElem = document.getElementById("custom-toast");
    if (toastElem) {
      toastElem.classList.remove("translate-y-24", "opacity-0");
      toastElem.classList.add("translate-y-0", "opacity-100");
      setTimeout(() => {
        toastElem.classList.remove("translate-y-0", "opacity-100");
        toastElem.classList.add("translate-y-24", "opacity-0");
      }, 3000);
    }
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  // Calculations
  const totalWeight = cart.reduce((sum, item) => sum + item.weightKg, 0);
  
  // In Turkey B2C food retail, shown catalog prices include VAT (KDV).
  // Ara Toplam (KDV Dahil) is the sum of items' totalPrice.
  const grossSubtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  
  // Legal VAT in Turkey for retail agricultural food products (generally 10% under recent updates, or 1% wholesale. We use 10% retail and show separately)
  const vatRate = 0.10;
  // Calculate VAT portion already included in the price: formula: price - (price / (1 + rate))
  const vatAmount = grossSubtotal - (grossSubtotal / (1 + vatRate));
  const netSubtotal = grossSubtotal - vatAmount;

  // Cargo Desi Calculation
  // 1 kg = 1 Desi in basic weighing terms
  const totalDesi = Math.max(totalWeight, 0); 
  
  // Cargo Fees:
  // Base cost for minimum 3 Desi is 95 TL.
  // Above 3 Desi, each additional Desi is +15 TL.
  // Free Shipping Threshold: 2000 TL
  const freeShippingThreshold = 2000;
  let cargoFee = 0;
  
  if (totalWeight > 0) {
    if (grossSubtotal >= freeShippingThreshold) {
      cargoFee = 0;
    } else {
      const baseDesiLimit = 3;
      const baseCargoFee = 95;
      const extraDesiRate = 15;
      
      if (totalDesi <= baseDesiLimit) {
        cargoFee = baseCargoFee;
      } else {
        cargoFee = baseCargoFee + (totalDesi - baseDesiLimit) * extraDesiRate;
      }
    }
  }

  const grandTotal = grossSubtotal + cargoFee;

  // Simulator submit (sends Telegram bot body simulation)
  const handleSimulateCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) return;
    
    setOrderSuccess(true);
    setTimeout(() => {
      setOrderSuccess(false);
      setShowSimModal(false);
      setCart([]);
      setName("");
      setPhone("");
      setAddress("");
    }, 4500);
  };

  // Telegram simulation payload
  const telegramPayload = {
    chat_id: "TELEGRAM_ALICI_ID",
    text: `🔔 *YENİ SİPARİŞ ALINDI!*\n\n` +
          `👤 *Müşteri:* ${name}\n` +
          `📞 *Telefon:* ${phone}\n` +
          `📍 *Adres:* ${address}\n\n` +
          `📦 *Ürünler:*\n` +
          cart.map(item => `• ${item.name} (${item.weightKg} kg) - ${item.totalPrice} TL`).join("\n") +
          `\n\n⚖️ *Toplam Ağırlık/Desi:* ${totalWeight} kg / Desi\n` +
          `💰 *Ara Toplam (KDV Dahil):* ${grossSubtotal.toFixed(2)} TL\n` +
          `🧾 *Hesaplanan KDV (%10):* ${vatAmount.toFixed(2)} TL\n` +
          `🚚 *Kargo Ücreti:* ${cargoFee === 0 ? "BEDAVA" : `${cargoFee.toFixed(2)} TL`}\n` +
          `💵 *GENEL TOPLAM:* ${grandTotal.toFixed(2)} TL\n\n` +
          `🛒 _Ceviz Bahçesi n8n Entegrasyon Simülatörü_`
  };

  return (
    <div className="flex-1 bg-background py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent dark:bg-accent/20">
            <Sparkles className="h-3.5 w-3.5" />
            İnteraktif Fiyat & Kargo Simülatörü
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl font-heading text-foreground">
            Doğal Lezzet Kataloğu
          </h1>
          <p className="text-muted-foreground text-base">
            Bahçemizin en seçkin mahsullerini sepetinize ekleyerek desiye göre değişen kargo ücretlerini, yasal KDV dilimlerini ve toplam sipariş tutarını anlık olarak izleyebilirsiniz.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          {/* Products List (Left side) */}
          <div className="lg:col-span-8 grid gap-8 md:grid-cols-2">
            {MOCK_PRODUCTS.map((product) => {
              const currentWeight = selectedWeights[product.id] || 3;
              const currentPrice = product.pricePerKg * currentWeight;

              return (
                <div key={product.id} className="group relative overflow-hidden rounded-[2rem] border bg-card text-card-foreground shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                  {/* Tag */}
                  <span className="absolute top-4 left-4 z-10 inline-flex items-center rounded-full bg-secondary/90 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
                    {product.tag}
                  </span>

                  {/* Image */}
                  <div className="relative overflow-hidden aspect-video bg-muted">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col flex-1 justify-between space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-muted-foreground">{product.rating}</span>
                        <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-0.5 rounded">100% Organik</span>
                      </div>
                      <h3 className="text-xl font-bold tracking-tight text-foreground font-heading">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-border">
                      {/* Weight Selector */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-muted-foreground flex items-center justify-between">
                          <span className="flex items-center gap-1">
                            <Scale className="h-3.5 w-3.5" /> Ağırlık Seçimi (Minimum 3 Kg)
                          </span>
                          <span className="text-accent font-semibold">{currentWeight} Kg</span>
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          {weightOptions.map((w) => (
                            <button
                              key={w}
                              onClick={() => setSelectedWeights(prev => ({ ...prev, [product.id]: w }))}
                              className={cn(
                                "py-2 px-1 text-xs font-bold rounded-lg border transition-all",
                                currentWeight === w
                                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                                  : "bg-background hover:bg-muted border-border text-foreground"
                              )}
                            >
                              {w} Kg
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Price Summary */}
                      <div className="flex items-end justify-between pt-2">
                        <div>
                          <span className="text-xs text-muted-foreground block font-medium">Birim Fiyat: {product.pricePerKg} TL / Kg</span>
                          <span className="text-2xl font-extrabold text-secondary tracking-tight">
                            {currentPrice} TL
                          </span>
                        </div>
                        
                        <button
                          onClick={() => handleAddToCart(product.id)}
                          className={cn(
                            buttonVariants({ variant: "default", size: "sm" }),
                            "bg-accent hover:bg-accent/90 text-white font-bold h-10 px-4 rounded-xl flex items-center gap-1.5 transition-all shadow-md shadow-accent/10 active:scale-95"
                          )}
                        >
                          <ShoppingBag className="h-4 w-4" />
                          Sepete Ekle
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dynamic Cart Panel (Right side) */}
          <div className="lg:col-span-4 lg:sticky lg:top-20 space-y-6">
            <div className="rounded-[2rem] border bg-card p-6 shadow-lg flex flex-col space-y-6">
              <div className="flex items-center justify-between border-b pb-4 border-border">
                <h3 className="text-lg font-extrabold font-heading text-foreground flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-primary" /> Alışveriş Sepetiniz
                </h3>
                <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full text-xs font-extrabold">
                  {cart.length} Ürün
                </span>
              </div>

              {cart.length === 0 ? (
                <div className="py-12 text-center space-y-4">
                  <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto text-muted-foreground">
                    <ShoppingBag className="h-8 w-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-foreground text-sm">Sepetiniz Boş</h4>
                    <p className="text-xs text-muted-foreground px-4">Soldaki ceviz ürünlerinden dilediğiniz ağırlığı (minimum 3 kg) seçip sepete ekleyin.</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col space-y-6">
                  {/* Cart Items List */}
                  <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 justify-between border-b pb-3 last:border-0 last:pb-0 border-border">
                        <div className="relative h-12 w-12 rounded-lg overflow-hidden border bg-muted shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-foreground truncate">{item.name}</h4>
                          <span className="text-[10px] text-muted-foreground font-semibold">{item.pricePerKg} TL / Kg • {item.weightKg} Kg</span>
                        </div>
                        <div className="text-right shrink-0 flex items-center gap-3">
                          <span className="text-sm font-bold text-foreground">{item.totalPrice} TL</span>
                          <button
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="border-t border-border pt-4 space-y-3">
                    {/* Weight (Desi) Info */}
                    <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground bg-muted/50 p-2.5 rounded-lg border">
                      <span className="flex items-center gap-1.5">
                        <Truck className="h-4 w-4 text-primary" /> Toplam Ağırlık (Desi):
                      </span>
                      <span className="text-foreground font-bold">{totalWeight} Kg / Desi</span>
                    </div>

                    {/* Pricing breakdown */}
                    <div className="space-y-2 text-sm pt-2">
                      <div className="flex justify-between text-muted-foreground">
                        <span>KDV Hariç Tutar:</span>
                        <span>{netSubtotal.toFixed(2)} TL</span>
                      </div>
                      
                      <div className="flex justify-between text-muted-foreground flex-wrap items-center">
                        <span className="flex items-center gap-1 text-xs">
                          <Percent className="h-3 w-3" /> Yasal KDV (%10 Dahil):
                        </span>
                        <span className="text-xs font-medium">{vatAmount.toFixed(2)} TL</span>
                      </div>

                      <div className="flex justify-between font-bold text-foreground">
                        <span>Ara Toplam (KDV Dahil):</span>
                        <span>{grossSubtotal.toFixed(2)} TL</span>
                      </div>

                      <div className="flex justify-between items-center text-muted-foreground">
                        <span className="flex items-center gap-1">
                          Kargo Bedeli:
                          {grossSubtotal >= freeShippingThreshold && (
                            <span className="text-[10px] bg-accent/20 text-accent font-bold px-1.5 py-0.5 rounded">2000 TL Üstü</span>
                          )}
                        </span>
                        <span className={cn(cargoFee === 0 && totalWeight > 0 ? "text-accent font-bold" : "")}>
                          {cargoFee === 0 && totalWeight > 0 ? "Ücretsiz" : `${cargoFee.toFixed(2)} TL`}
                        </span>
                      </div>

                      {/* Cargo logic explanation */}
                      {totalWeight > 0 && cargoFee > 0 && (
                        <p className="text-[10px] text-muted-foreground leading-tight bg-secondary/5 border border-secondary/15 p-2 rounded-lg">
                          💡 3 desi kargo 95 TL + sonraki her kg için 15 TL desi kargo bedeli eklenmiştir. 2000 TL üzeri kargo ücretsizdir.
                        </p>
                      )}
                    </div>

                    {/* Grand Total */}
                    <div className="border-t border-border pt-4 flex items-baseline justify-between">
                      <span className="text-sm font-extrabold text-foreground">Genel Toplam:</span>
                      <span className="text-2xl font-black text-secondary tracking-tight">
                        {grandTotal.toFixed(2)} TL
                      </span>
                    </div>
                  </div>

                  {/* Simulate Checkout Trigger */}
                  <button
                    onClick={() => setShowSimModal(true)}
                    className={cn(
                      buttonVariants({ variant: "default", size: "lg" }),
                      "w-full bg-primary hover:bg-primary/95 text-primary-foreground font-bold h-12 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/10 transition-transform active:scale-[0.98]"
                    )}
                  >
                    Simülatör ile Sipariş Ver
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Quality badge card */}
            <div className="border rounded-3xl p-5 bg-accent/5 border-accent/15 space-y-4">
              <h4 className="font-bold text-accent text-sm flex items-center gap-1.5">
                <ShieldCheck className="h-4.5 w-4.5" /> Doğal & İlaçsız Tarım Garantisi
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Kemah Bahçesi cevizlerimizde hiçbir pestisit ve suni koruyucu bulunmaz. Geleneksel tarım metotları ve temiz kaynak suyu ile yetiştirilen cevizlerimiz her sezon taze kırım olarak gönderilmektedir.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Toast Popup */}
      <div
        id="custom-toast"
        className="fixed bottom-6 left-6 z-50 bg-accent text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 transition-all duration-300 translate-y-24 opacity-0 border border-accent-foreground/10"
      >
        <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
          <CheckCircle2 className="h-4.5 w-4.5" />
        </div>
        <div>
          <h4 className="font-bold text-xs">Sepet Güncellendi!</h4>
          <p className="text-[10px] opacity-90">Ürün başarıyla sepete eklendi.</p>
        </div>
      </div>

      {/* Simulator Modal */}
      <AnimatePresence>
        {showSimModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-card border w-full max-w-xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-border bg-muted/30 flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-lg text-foreground font-heading">Sipariş & Entegrasyon Simülatörü</h3>
                  <p className="text-xs text-muted-foreground">n8n webhook ve Telegram bildirim şablonunu anlık görün.</p>
                </div>
                <button
                  onClick={() => { if (!orderSuccess) setShowSimModal(false); }}
                  className="text-muted-foreground hover:text-foreground text-sm font-bold bg-background border px-3 py-1 rounded-lg"
                >
                  Kapat
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 flex-1 overflow-y-auto max-h-[80vh] space-y-6">
                {orderSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-12 text-center space-y-4"
                  >
                    <div className="h-16 w-16 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto">
                      <Send className="h-8 w-8 animate-bounce" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-foreground">Sipariş Telegram&apos;a İletildi!</h3>
                      <p className="text-sm text-muted-foreground px-8 leading-relaxed">
                        Simülasyon başarılı! Sipariş paketiniz n8n webhook üzerinden Telegram botuna tetiklendi ve bildirim gönderildi.
                      </p>
                    </div>
                    {/* Success Animation Payload View */}
                    <div className="bg-black/90 p-4 rounded-2xl text-left border border-border">
                      <span className="text-[10px] text-accent font-bold block mb-1">🤖 Telegram Sunucusundan Dönen Yanıt (Simüle):</span>
                      <pre className="text-[10px] font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap leading-relaxed">
{JSON.stringify({ ok: true, result: { message_id: 8547, text: "Sipariş Bildirimi Başarıyla Gönderildi" } }, null, 2)}
                      </pre>
                    </div>
                  </motion.div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Left: Input fields */}
                    <form onSubmit={handleSimulateCheckout} className="space-y-4">
                      <h4 className="font-bold text-sm text-foreground">1. Müşteri Bilgileri</h4>
                      
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground">Ad Soyad</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Ahmet Yılmaz"
                          className="w-full h-10 px-3 border border-border bg-background rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground">Telefon</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="0555 123 45 67"
                          className="w-full h-10 px-3 border border-border bg-background rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground">Teslimat Adresi</label>
                        <textarea
                          required
                          rows={3}
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Kemalpaşa Mah. Fatih Cad. No:4 Daire:2 Beşiktaş / İstanbul"
                          className="w-full p-3 border border-border bg-background rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className={cn(
                          buttonVariants({ variant: "default", size: "lg" }),
                          "w-full bg-accent hover:bg-accent/90 text-white font-bold h-12 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-accent/15 pt-1"
                        )}
                      >
                        <Send className="h-4 w-4" /> Siparişi Tamamla & Bildir
                      </button>
                    </form>

                    {/* Right: Code payload view */}
                    <div className="space-y-3 flex flex-col justify-between">
                      <div className="space-y-2">
                        <h4 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                          <span className="h-2.5 w-2.5 rounded-full bg-secondary animate-pulse" /> 2. n8n / Telegram JSON Payload
                        </h4>
                        <p className="text-[10px] text-muted-foreground leading-normal">
                          Sipariş tamamlandığında backend route handler veya n8n webhook tetikleyicisinin göndereceği gerçek JSON veri formatı:
                        </p>
                      </div>

                      <div className="bg-black/95 border border-border p-4 rounded-2xl flex-1 flex flex-col">
                        <div className="flex justify-between items-center mb-2 pb-2 border-b border-zinc-800">
                          <span className="text-[9px] font-mono text-zinc-500 font-bold">METHOD: POST</span>
                          <span className="text-[9px] font-mono text-accent font-bold">Content-Type: application/json</span>
                        </div>
                        <pre className="text-[9px] font-mono text-amber-300 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-[220px] flex-1">
{JSON.stringify(telegramPayload, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
