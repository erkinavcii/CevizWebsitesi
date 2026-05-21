import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      orderNo,
      name,
      email,
      phone,
      address,
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
    } = body as {
      orderNo: string;
      name: string;
      email: string;
      phone: string;
      address: string;
      cart: Array<{
        id: string;
        productId: string;
        name: string;
        weightKg: number;
        pricePerKg: number;
        totalPrice: number;
        image: string;
      }>;
      wantsInvoice: boolean;
      invoiceType?: "bireysel" | "kurumsal";
      companyName?: string;
      taxOffice?: string;
      taxNumber?: string;
      tckn?: string;
      cargoFee: number;
      grandTotal: number;
      marketingConsent?: boolean;
    };

    // Validate required fields
    if (!name || !email || !phone || !address || !cart || cart.length === 0) {
      return NextResponse.json(
        { error: "Lütfen tüm zorunlu alanları doldurun ve sepetinizin boş olmadığından emin olun." },
        { status: 400 }
      );
    }

    // Process and map order items
    const orderItemsData: Array<{
      variantId: string;
      quantity: number;
      unitPrice: number;
    }> = [];
    
    for (const item of cart) {
      // Map "prod-1" and "prod-2" to their database slugs
      const slug = item.productId === "prod-1" ? "kemah-kabuklu-ceviz" : "kemah-ic-ceviz";
      
      const product = await prisma.product.findUnique({
        where: { slug },
        include: { variants: true },
      });

      if (!product || product.variants.length === 0) {
        return NextResponse.json(
          { error: `Ürün veritabanında bulunamadı: ${item.name}` },
          { status: 404 }
        );
      }

      // The base variant is 0.5 Kg
      const variant = product.variants[0];
      
      // Map quantity: 0.5 kg variants. 3.5 kg -> 7 items.
      const quantity = Math.round(item.weightKg * 2);
      
      orderItemsData.push({
        variantId: variant.id,
        quantity,
        unitPrice: variant.price, // e.g. 120 TL for 0.5kg
      });
    }

    // Create the order in the database inside a transaction
    const order = await prisma.$transaction(async (tx) => {
      // 1. Create the order
      const newOrder = await tx.order.create({
        data: {
          orderNo,
          status: "PENDING",
          total: grandTotal,
          cargoFee,
          customerName: name,
          customerPhone: phone,
          customerEmail: email,
          shippingAddress: address,
          wantsInvoice: !!wantsInvoice,
          invoiceType: wantsInvoice ? invoiceType : null,
          companyName: wantsInvoice && invoiceType === "kurumsal" ? companyName : null,
          taxOffice: wantsInvoice && invoiceType === "kurumsal" ? taxOffice : null,
          taxNumber: wantsInvoice && invoiceType === "kurumsal" ? taxNumber : null,
          tckn: wantsInvoice && invoiceType === "bireysel" ? tckn : null,
          marketingConsent: !!marketingConsent,
          consentDate: marketingConsent ? new Date() : null,
          items: {
            create: orderItemsData,
          },
        },
        include: {
          items: {
            include: {
              variant: {
                include: {
                  product: true,
                },
              },
            },
          },
        },
      });

      // 2. Update variant stocks (reduce stockKg by weight ordered)
      for (const item of cart) {
        const slug = item.productId === "prod-1" ? "kemah-kabuklu-ceviz" : "kemah-ic-ceviz";
        const product = await tx.product.findUnique({
          where: { slug },
          include: { variants: true },
        });
        
        if (product && product.variants.length > 0) {
          const variant = product.variants[0];
          const newStock = Math.max(0, variant.stockKg - item.weightKg);
          
          await tx.productVariant.update({
            where: { id: variant.id },
            data: { stockKg: newStock },
          });
        }
      }

      return newOrder;
    });

    console.log(`🎉 Sipariş başarıyla veritabanına kaydedildi: ${order.orderNo} (ID: ${order.id})`);

    // Return the created order
    return NextResponse.json({
      success: true,
      message: "Siparişiniz başarıyla alındı.",
      orderId: order.id,
      orderNo: order.orderNo,
    }, { status: 201 });

  } catch (error: any) {
    console.error("Sipariş oluşturulurken hata:", error);
    return NextResponse.json(
      { error: "Sipariş oluşturulurken sistemsel bir hata meydana geldi.", details: error.message },
      { status: 500 }
    );
  }
}
