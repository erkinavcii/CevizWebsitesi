"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Trash2, ArrowRight, ShieldCheck, Scale, Truck, Percent, Sparkles, Send, CheckCircle2, Copy } from "lucide-react";
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
    "prod-1": 1, // Default 1kg
    "prod-2": 1
  });
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((p: any) => {
            const baseVariant = p.variants?.[0];
            const pricePerKg = baseVariant ? (baseVariant.price * 2) : (p.slug === "kemah-kabuklu-ceviz" ? 240 : 490);
            return {
              id: p.slug === "kemah-kabuklu-ceviz" ? "prod-1" : "prod-2",
              name: p.name,
              slug: p.slug,
              description: p.description,
              pricePerKg,
              image: p.slug === "kemah-kabuklu-ceviz" ? "/images/hero-walnuts.png" : "/images/shelled-walnuts.png",
              tag: p.slug === "kemah-kabuklu-ceviz" ? "Yeni Sezon" : "En Çok Satan",
              rating: p.slug === "kemah-kabuklu-ceviz" ? "4.9 (124 Değerlendirme)" : "5.0 (86 Değerlendirme)",
            };
          });
          setProducts(mapped);
        }
      })
      .catch((err) => console.error("Error loading products:", err));
  }, []);
  
  // Checkout simulation modal/state
  const [showSimModal, setShowSimModal] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [citiesData, setCitiesData] = useState<any[]>([]);

  // Invoice States
  const [wantsInvoice, setWantsInvoice] = useState(false);
  const [invoiceType, setInvoiceType] = useState<"bireysel" | "kurumsal">("bireysel");
  const [companyName, setCompanyName] = useState("");
  const [taxOffice, setTaxOffice] = useState("");
  const [taxNumber, setTaxNumber] = useState("");
  const [tckn, setTckn] = useState("");

  // Consent States
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [contractConsent, setContractConsent] = useState(false);

  // SMS verification states
  const [smsSent, setSmsSent] = useState(false);
  const [smsCode, setSmsCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [smsError, setSmsError] = useState("");
  const [smsCountdown, setSmsCountdown] = useState(0);
  const [generatedSmsCode, setGeneratedSmsCode] = useState("");
  const [showSmsNotification, setShowSmsNotification] = useState(false);
  
  // Generate random order number when modal opens
  const [simulatedOrderNo, setSimulatedOrderNo] = useState("");

  // Weight options: 1kg minimum, presets 3, 5, 20 as requested by user
  const weightOptions = [1, 3, 5, 20];

  // SMS Countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (smsCountdown > 0) {
      timer = setTimeout(() => {
        setSmsCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [smsCountdown]);

  useEffect(() => {
    fetch("https://turkiyeapi.dev/api/v1/provinces")
      .then(res => res.json())
      .then(data => {
        if (data && data.data) {
          const sorted = data.data.sort((a: any, b: any) => a.name.localeCompare(b.name, "tr-TR"));
          setCitiesData(sorted);
        }
      })
      .catch(err => console.error("City fetch error:", err));
  }, []);

  const availableDistricts = citiesData.find(c => c.name === city)?.districts?.sort((a: any, b: any) => a.name.localeCompare(b.name, "tr-TR")) || [];

  const handleOpenModal = () => {
    const orderNo = "CB-" + new Date().getFullYear() + "-" + Math.floor(1000 + Math.random() * 9000);
    setSimulatedOrderNo(orderNo);
    setSmsSent(false);
    setIsVerified(false);
    setSmsCode("");
    setSmsError("");
    setSmsCountdown(0);
    setShowSmsNotification(false);
    setWantsInvoice(false);
    setCompanyName("");
    setTaxOffice("");
    setTaxNumber("");
    setTckn("");
    setMarketingConsent(false);
    setContractConsent(false);
    setCity("");
    setDistrict("");
    setShowSimModal(true);
  };

  // Add to cart logic
  const handleAddToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
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

  // Simulator submit (sends Telegram bot body simulation and saves to database)
  const handleSimulateCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !city || !district || !address) return;
    if (!isVerified) {
      setSmsError("Lütfen önce telefon numaranızı SMS kodu ile doğrulayın!");
      return;
    }
    if (!contractConsent) {
      setSmsError("Siparişi tamamlamak için Mesafeli Satış Sözleşmesi ve KVKK Aydınlatma Metni'ni onaylamanız gerekmektedir.");
      return;
    }
    
    setIsSubmitting(true);
    setSmsError("");

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderNo: simulatedOrderNo,
          name,
          email,
          phone,
          address: `${address}\n${district} / ${city}`,
          cart,
          wantsInvoice,
          invoiceType,
          companyName,
          taxOffice,
          taxNumber,
          tckn,
          cargoFee,
          grandTotal,
          marketingConsent,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Sipariş oluşturulurken bir hata meydana geldi.");
      }

      console.log("Sipariş başarıyla oluşturuldu, Iyzico'ya yönlendiriliyor:", result);
      
      if (result.paymentPageUrl) {
        // Iyzico ödeme sayfasına yönlendir
        window.location.href = result.paymentPageUrl;
        return;
      }

      // Fallback (eğer URL gelmezse)
      setOrderSuccess(true);
      
      setTimeout(() => {
        setOrderSuccess(false);
        setShowSimModal(false);
        setCart([]);
        setName("");
        setEmail("");
        setPhone("");
        setCity("");
        setDistrict("");
        setAddress("");
        setMarketingConsent(false);
        setContractConsent(false);
        setSmsSent(false);
        setIsVerified(false);
        setIsSubmitting(false);
      }, 5500);

    } catch (err: any) {
      console.error("Order submission error:", err);
      setSmsError(err.message || "Sipariş veritabanına kaydedilirken sistemsel bir hata oluştu.");
      setIsSubmitting(false);
    }
  };

  // Simulated SMS Verification trigger with custom countdown & dynamic push notification toast
  const handleSendSms = () => {
    if (!phone || phone.replace(/\D/g, "").length < 10) {
      setSmsError("Lütfen önce geçerli bir telefon numarası girin!");
      return;
    }
    setSmsError("");
    
    // Generate a random 4-digit code
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedSmsCode(code);
    setSmsSent(true);
    setSmsCountdown(60);
    setShowSmsNotification(true);
    
    // Auto-hide push notification toast after 10s
    setTimeout(() => {
      setShowSmsNotification(false);
    }, 10000);
  };

  const handleVerifySms = () => {
    if (smsCode === generatedSmsCode || smsCode === "1234") {
      setIsVerified(true);
      setSmsError("");
      setShowSmsNotification(false);
    } else {
      setSmsError(`Hatalı doğrulama kodu! (Simülasyon kodu: ${generatedSmsCode})`);
    }
  };

  // Telegram simulation payload
  const telegramPayload = {
    chat_id: "TELEGRAM_ALICI_ID",
    text: `🔔 *YENİ SİPARİŞ ALINDI!*\n\n` +
          `🆔 *Sipariş No:* ${simulatedOrderNo}\n` +
          `👤 *Müşteri:* ${name}\n` +
          `📧 *E-posta:* ${email}\n` +
          `📞 *Telefon:* ${phone} (Doğrulandı: ${isVerified ? "Evet" : "Hayır"})\n` +
          `📍 *Adres:* ${address}\n` +
          `🏙️ *İl/İlçe:* ${district} / ${city}\n\n` +
          (wantsInvoice ? 
            `🧾 *Fatura Bilgileri:* İsteniyor\n` +
            `• *Fatura Tipi:* ${invoiceType === "bireysel" ? "Bireysel" : "Kurumsal"}\n` +
            (invoiceType === "bireysel" ? 
              `• *TCKN:* ${tckn}\n` : 
              `• *Şirket:* ${companyName}\n• *V.D.:* ${taxOffice}\n• *Vergi No:* ${taxNumber}\n`) + "\n"
            : `🧾 *Fatura Bilgileri:* İsteniyor (Perakende Fişi)\n\n`
          ) +
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
            {products.map((product) => {
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
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-muted-foreground flex items-center justify-between">
                          <span className="flex items-center gap-1">
                            <Scale className="h-3.5 w-3.5" /> Ağırlık Seçimi (Minimum 1 Kg)
                          </span>
                          <span className="text-accent font-extrabold text-sm bg-accent/10 px-2 py-0.5 rounded">{currentWeight} Kg</span>
                        </label>
                        
                        {/* Presets */}
                        <div className="grid grid-cols-4 gap-1.5">
                          {weightOptions.map((w) => (
                            <button
                              key={w}
                              onClick={() => setSelectedWeights(prev => ({ ...prev, [product.id]: w }))}
                              className={cn(
                                "py-1.5 px-0.5 text-xs font-extrabold rounded-lg border transition-all",
                                currentWeight === w
                                  ? "bg-primary text-primary-foreground border-primary shadow-sm scale-[1.03]"
                                  : "bg-background hover:bg-muted border-border text-foreground"
                              )}
                            >
                              {w} Kg
                            </button>
                          ))}
                        </div>

                        {/* Slider */}
                        <div className="space-y-2 pt-2 bg-muted/30 p-3 rounded-2xl border border-dashed border-border">
                          <div className="flex justify-between items-center text-[10px] font-bold text-muted-foreground">
                            <span className="flex items-center gap-1">🎛️ Özel Ağırlık Seçimi (Sürükle):</span>
                            <span className="bg-accent/15 text-accent px-1.5 py-0.2 rounded font-mono">{currentWeight} Kg</span>
                          </div>
                          <div className="relative pt-1 flex items-center">
                            <input
                              type="range"
                              min="1"
                              max="25"
                              step="0.5"
                              value={currentWeight}
                              onChange={(e) => setSelectedWeights(prev => ({ ...prev, [product.id]: parseFloat(e.target.value) }))}
                              className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-accent transition-all hover:bg-zinc-300 dark:hover:bg-zinc-700
                              [&::-webkit-slider-runnable-track]:h-2
                              [&::-webkit-slider-runnable-track]:rounded-lg
                              [&::-webkit-slider-thumb]:w-5
                              [&::-webkit-slider-thumb]:h-5
                              [&::-webkit-slider-thumb]:appearance-none
                              [&::-webkit-slider-thumb]:bg-accent
                              [&::-webkit-slider-thumb]:border-2
                              [&::-webkit-slider-thumb]:border-white
                              [&::-webkit-slider-thumb]:rounded-full
                              [&::-webkit-slider-thumb]:shadow-lg
                              [&::-webkit-slider-thumb]:transition-transform
                              [&::-webkit-slider-thumb]:hover:scale-125
                              [&::-webkit-slider-thumb]:active:scale-110"
                            />
                          </div>
                          <div className="flex justify-between text-[8px] text-muted-foreground px-1 font-bold">
                            <span>1 Kg (Min)</span>
                            <span>5 Kg</span>
                            <span>10 Kg</span>
                            <span>15 Kg</span>
                            <span>20 Kg</span>
                            <span>25 Kg (Maks)</span>
                          </div>
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
                    onClick={handleOpenModal}
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
                        Simülasyon başarılı! <span className="font-bold text-accent font-mono">{simulatedOrderNo}</span> numaralı sipariş paketiniz n8n webhook üzerinden Telegram botuna iletildi.
                      </p>
                      <div className="flex flex-col gap-2 max-w-sm mx-auto p-4 rounded-2xl bg-accent/10 border border-accent/25 text-left text-xs font-semibold text-accent mt-3">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="h-4.5 w-4.5 shrink-0" />
                          <span>Fatura Alıcısı: {wantsInvoice ? (invoiceType === "kurumsal" ? companyName : name) : name}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="h-4.5 w-4.5 shrink-0" />
                          <span>Gönderim E-postası: {email}</span>
                        </div>
                        {wantsInvoice && (
                          <div className="flex items-center gap-1.5 border-t border-accent/20 pt-2 mt-1">
                            <span>🧾 Fatura Durumu: E-Arşiv olarak kuyruğa alındı.</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Success Animation Payload View */}
                    <div className="bg-black/90 p-4 rounded-2xl text-left border border-border">
                      <span className="text-[10px] text-accent font-bold block mb-1">🤖 Telegram Sunucusundan Dönen Yanıt (Simüle):</span>
                      <pre className="text-[10px] font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap leading-relaxed">
{JSON.stringify({ ok: true, order_no: simulatedOrderNo, message_id: 8547, text: "Sipariş Bildirimi ve Fatura Kaydı Başarıyla Gönderildi" }, null, 2)}
                      </pre>
                    </div>
                  </motion.div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Left: Input fields */}
                    <form onSubmit={handleSimulateCheckout} className="space-y-4">
                      <div className="flex items-center justify-between border-b pb-2 mb-2">
                        <h4 className="font-bold text-sm text-foreground">1. Müşteri Bilgileri</h4>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] bg-secondary/15 text-secondary font-extrabold px-2.5 py-1 rounded-lg flex items-center gap-1">
                            Sipariş No: <span className="font-mono">{simulatedOrderNo}</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(simulatedOrderNo);
                              const copyBtn = document.getElementById("copy-btn");
                              if (copyBtn) {
                                copyBtn.innerText = "Kopyalandı!";
                                setTimeout(() => { copyBtn.innerText = "Kopyala"; }, 1500);
                              }
                            }}
                            id="copy-btn"
                            className="text-[9px] font-bold text-muted-foreground hover:text-foreground bg-muted px-2 py-1 rounded border transition-all flex items-center gap-1"
                          >
                            <Copy className="h-2.5 w-2.5" /> Kopyala
                          </button>
                        </div>
                      </div>
                      
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
                        <label className="text-xs font-bold text-muted-foreground">E-posta (Fatura İletimi İçin)</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="ahmet@example.com"
                          className="w-full h-10 px-3 border border-border bg-background rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                        <p className="text-[9px] text-muted-foreground leading-none">🧾 E-faturanız bu e-posta adresine otomatik olarak gönderilecektir.</p>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground">Telefon No</label>
                        <div className="flex gap-2">
                          <input
                            type="tel"
                            required
                            disabled={isVerified}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="0555 123 45 67"
                            className="flex-1 h-10 px-3 border border-border bg-background rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
                          />
                          {!isVerified && (
                            <button
                              type="button"
                              disabled={smsCountdown > 0}
                              onClick={handleSendSms}
                              className={cn(
                                "bg-primary hover:bg-primary/95 text-primary-foreground text-xs font-bold px-3 rounded-lg whitespace-nowrap active:scale-95 transition-all disabled:opacity-60"
                              )}
                            >
                              {smsCountdown > 0 ? `${smsCountdown}s` : smsSent ? "Tekrar Gönder" : "Kod Gönder"}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* SMS Verification input */}
                      {smsSent && !isVerified && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="space-y-1.5 p-3 rounded-xl bg-secondary/5 border border-secondary/15"
                        >
                          <label className="text-xs font-bold text-secondary flex items-center justify-between">
                            <span>🔑 SMS Doğrulama Kodu:</span>
                            <span className="text-[9px] opacity-80">(Simülasyon Kodu: {generatedSmsCode})</span>
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              maxLength={4}
                              value={smsCode}
                              onChange={(e) => setSmsCode(e.target.value)}
                              placeholder={generatedSmsCode}
                              className="w-24 text-center h-9 border border-border bg-background rounded-lg text-sm font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                            <button
                              type="button"
                              onClick={handleVerifySms}
                              className="bg-accent hover:bg-accent/90 text-white text-xs font-bold px-4 rounded-lg active:scale-95 transition-all"
                            >
                              Doğrula
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {/* Phone Verified Badge */}
                      {isVerified && (
                        <div className="flex items-center gap-1.5 text-xs text-accent font-bold bg-accent/10 px-3 py-2 rounded-lg border border-accent/25">
                          <CheckCircle2 className="h-4 w-4" /> Telefon Doğrulandı (Güvenli İşlem)
                        </div>
                      )}

                      {/* Invoice Toggle Checkbox */}
                      <div className="pt-2 border-t border-border">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={wantsInvoice}
                            onChange={(e) => setWantsInvoice(e.target.checked)}
                            className="h-4 w-4 rounded border-border text-primary focus:ring-primary/20 accent-primary"
                          />
                          <span className="text-xs font-extrabold text-foreground flex items-center gap-1">
                            🧾 Kurumsal / TCKN Faturası İstiyorum
                          </span>
                        </label>
                        <p className="text-[9px] text-muted-foreground ml-6 mt-0.5 leading-normal">
                          Faturanız sipariş sonrası e-posta adresinize dijital e-arşiv olarak iletilecektir.
                        </p>
                      </div>

                      {/* Invoice Fields Expandable */}
                      <AnimatePresence>
                        {wantsInvoice && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden space-y-3 p-3 rounded-xl bg-muted/60 border border-border mt-2"
                          >
                            <div className="flex gap-4 border-b pb-2 mb-1">
                              <label className="flex items-center gap-1.5 cursor-pointer text-xs font-bold text-foreground">
                                <input
                                  type="radio"
                                  name="invoiceType"
                                  checked={invoiceType === "bireysel"}
                                  onChange={() => setInvoiceType("bireysel")}
                                  className="accent-primary"
                                />
                                Bireysel (TCKN)
                              </label>
                              <label className="flex items-center gap-1.5 cursor-pointer text-xs font-bold text-foreground">
                                <input
                                  type="radio"
                                  name="invoiceType"
                                  checked={invoiceType === "kurumsal"}
                                  onChange={() => setInvoiceType("kurumsal")}
                                  className="accent-primary"
                                />
                                Kurumsal (Şirket)
                              </label>
                            </div>

                            {invoiceType === "bireysel" ? (
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-muted-foreground">T.C. Kimlik Numarası (TCKN)</label>
                                <input
                                  type="text"
                                  maxLength={11}
                                  value={tckn}
                                  onChange={(e) => setTckn(e.target.value.replace(/\D/g, ""))}
                                  placeholder="11 Haneli T.C. No"
                                  required={wantsInvoice && invoiceType === "bireysel"}
                                  className="w-full h-9 px-3 border border-border bg-background rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-muted-foreground">Şirket Ünvanı</label>
                                  <input
                                    type="text"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    placeholder="Ceviz Tarım Ltd. Şti."
                                    required={wantsInvoice && invoiceType === "kurumsal"}
                                    className="w-full h-9 px-3 border border-border bg-background rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-muted-foreground">Vergi Dairesi</label>
                                    <input
                                      type="text"
                                      value={taxOffice}
                                      onChange={(e) => setTaxOffice(e.target.value)}
                                      placeholder="Erenköy"
                                      required={wantsInvoice && invoiceType === "kurumsal"}
                                      className="w-full h-9 px-3 border border-border bg-background rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-muted-foreground">Vergi Numarası</label>
                                    <input
                                      type="text"
                                      maxLength={10}
                                      value={taxNumber}
                                      onChange={(e) => setTaxNumber(e.target.value.replace(/\D/g, ""))}
                                      placeholder="10 Haneli Vergi No"
                                      required={wantsInvoice && invoiceType === "kurumsal"}
                                      className="w-full h-9 px-3 border border-border bg-background rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                  </div>
                                </div>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-muted-foreground">İl</label>
                          <select
                            required
                            value={city}
                            onChange={(e) => {
                              setCity(e.target.value);
                              setDistrict(""); // reset district when city changes
                            }}
                            className="w-full h-10 px-3 border border-border bg-background rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
                          >
                            <option value="">İl Seçiniz</option>
                            {citiesData.map((c) => (
                              <option key={c.id} value={c.name}>{c.name}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-muted-foreground">İlçe</label>
                          <select
                            required
                            disabled={!city}
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                            className="w-full h-10 px-3 border border-border bg-background rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none disabled:opacity-60"
                          >
                            <option value="">İlçe Seçiniz</option>
                            {availableDistricts.map((d: any) => (
                              <option key={d.id} value={d.name}>{d.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground">Açık Teslimat Adresi</label>
                        <textarea
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Fatih Mah. Atatürk Cad. No: 12 Kat: 3 Daire: 5 Kemah / Erzincan"
                          rows={2}
                          className="w-full p-3 border border-border bg-background rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                        />
                      </div>

                      {/* Consent Checkboxes */}
                      <div className="pt-2 border-t border-border space-y-3">
                        <label className="flex items-start gap-2 cursor-pointer select-none group">
                          <input
                            type="checkbox"
                            checked={marketingConsent}
                            onChange={(e) => setMarketingConsent(e.target.checked)}
                            className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-primary/20 accent-primary shrink-0"
                          />
                          <span className="text-[10px] font-semibold text-foreground group-hover:text-primary transition-colors leading-relaxed">
                            Ceviz Bahçesi'nin kampanya, indirim ve hatırlatma bildirimleri hakkında tarafıma E-posta veya SMS ile <span className="font-bold">ticari elektronik ileti</span> gönderilmesine onay veriyorum.
                          </span>
                        </label>
                        
                        <label className="flex items-start gap-2 cursor-pointer select-none group">
                          <input
                            type="checkbox"
                            checked={contractConsent}
                            onChange={(e) => setContractConsent(e.target.checked)}
                            className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-primary/20 accent-primary shrink-0"
                          />
                          <span className="text-[10px] font-semibold text-foreground group-hover:text-primary transition-colors leading-relaxed">
                            <a href="/sozlesmeler/mesafeli-satis" target="_blank" className="text-accent underline font-bold hover:text-accent/80">Mesafeli Satış Sözleşmesi</a>'ni ve <a href="/sozlesmeler/kvkk" target="_blank" className="text-accent underline font-bold hover:text-accent/80">KVKK Aydınlatma Metni</a>'ni okudum, anladım ve kabul ediyorum. <span className="text-destructive font-bold">*</span>
                          </span>
                        </label>
                      </div>

                      {smsError && (
                        <p className="text-xs text-destructive font-bold bg-destructive/10 p-2 rounded border border-destructive/20">{smsError}</p>
                      )}

                      <button
                        type="submit"
                        disabled={!isVerified || isSubmitting}
                        className={cn(
                          buttonVariants({ variant: "default", size: "lg" }),
                          "w-full bg-accent hover:bg-accent/90 text-white font-bold h-12 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-accent/15 pt-1 disabled:opacity-50 disabled:pointer-events-none"
                        )}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <span className="h-4.5 w-4.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            İşleniyor...
                          </span>
                        ) : (
                          <>
                            <Send className="h-4 w-4" /> Siparişi Tamamla & Bildir
                          </>
                        )}
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
                        <pre className="text-[9px] font-mono text-amber-300 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-[300px] flex-1">
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

      {/* Floating Simulated SMS Notification */}
      <AnimatePresence>
        {showSmsNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm bg-zinc-950 border border-zinc-800 text-white rounded-2xl shadow-2xl p-4 flex gap-3 backdrop-blur-md bg-opacity-95 items-start"
          >
            <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-white shrink-0 mt-0.5">
              <ShieldCheck className="h-4.5 w-4.5" />
            </div>
            <div className="flex-1 space-y-1 text-left">
              <div className="flex justify-between items-center">
                <span className="text-xs font-black tracking-wide text-zinc-400 font-mono">SMS: CEVİZ BAHÇESİ</span>
                <span className="text-[10px] text-zinc-500 font-medium">Şimdi</span>
              </div>
              <p className="text-xs text-zinc-200 leading-relaxed font-semibold">
                Sayın Müşterimiz, siparişinizi doğrulamak için SMS şifreniz: <span className="text-accent font-black tracking-widest text-sm bg-accent/25 px-2 py-0.5 rounded font-mono select-all">{generatedSmsCode}</span>.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
