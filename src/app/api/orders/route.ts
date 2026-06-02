import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import iyzipay from "@/lib/iyzico";

// Iyzico callback-based create method wrapped in Promise
const initializeCheckoutForm = (request: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    iyzipay.checkoutFormInitialize.create(request, (err: any, result: any) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

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
    } = body as any;

    if (!name || !email || !phone || !address || !cart || cart.length === 0) {
      return NextResponse.json({ error: "Lütfen tüm zorunlu alanları doldurun." }, { status: 400 });
    }

    const orderItemsData: any[] = [];
    let basketItemsForIyzico: any[] = [];
    
    for (const item of cart) {
      const slug = item.productId === "prod-1" ? "kemah-kabuklu-ceviz" : "kemah-ic-ceviz";
      const product = await prisma.product.findUnique({
        where: { slug },
        include: { variants: true },
      });

      if (!product || product.variants.length === 0) {
        return NextResponse.json({ error: `Ürün bulunamadı: ${item.name}` }, { status: 404 });
      }

      const variant = product.variants[0];
      const quantity = Math.round(item.weightKg * 2);
      
      orderItemsData.push({
        variantId: variant.id,
        quantity,
        unitPrice: variant.price,
      });

      basketItemsForIyzico.push({
        id: variant.id,
        name: product.name,
        category1: "Gıda",
        itemType: "PHYSICAL",
        price: (variant.price * quantity).toString()
      });
    }

    // Add Cargo as a basket item if there is a fee
    if (cargoFee > 0) {
      basketItemsForIyzico.push({
        id: "CARGO",
        name: "Kargo Ücreti",
        category1: "Kargo",
        itemType: "PHYSICAL",
        price: cargoFee.toString()
      });
    }

    // Create the order in DB with status PENDING_PAYMENT
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          orderNo,
          status: "PENDING_PAYMENT", // Changed from PENDING
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
          items: { create: orderItemsData },
        }
      });
      return newOrder;
    });

    // Initialize Iyzico
    const [firstName, ...lastNames] = name.split(" ");
    const surname = lastNames.join(" ") || "Bilinmiyor";
    const ip = request.headers.get("x-forwarded-for") || "85.34.78.112";

    const host = request.headers.get("host") || "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";
    const callbackUrl = `${protocol}://${host}/api/payment/callback`;

    const iyzicoRequest = {
      locale: "TR",
      conversationId: order.id,
      price: grandTotal.toString(),
      paidPrice: grandTotal.toString(),
      currency: "TRY",
      basketId: order.orderNo,
      paymentGroup: "PRODUCT",
      callbackUrl: callbackUrl,
      enabledInstallments: [2, 3, 6, 9],
      buyer: {
        id: order.id,
        name: firstName,
        surname: surname,
        gsmNumber: phone,
        email: email,
        identityNumber: tckn || "11111111111", // Dummy TCKN for sandbox
        lastLoginDate: "2026-05-21 15:12:09",
        registrationDate: "2026-05-21 15:12:09",
        registrationAddress: address,
        ip: ip,
        city: "Istanbul", // Hardcoded for simplicity or parsed from address
        country: "Turkey",
        zipCode: "34732"
      },
      shippingAddress: {
        contactName: name,
        city: "Istanbul",
        country: "Turkey",
        address: address,
        zipCode: "34732"
      },
      billingAddress: {
        contactName: companyName || name,
        city: "Istanbul",
        country: "Turkey",
        address: address,
        zipCode: "34732"
      },
      basketItems: basketItemsForIyzico
    };

    const iyzicoResult = await initializeCheckoutForm(iyzicoRequest);

    if (iyzicoResult.status === "success") {
      return NextResponse.json({
        success: true,
        paymentPageUrl: iyzicoResult.paymentPageUrl, // Redirect URL
        orderId: order.id
      }, { status: 200 });
    } else {
      console.error("Iyzico Error:", iyzicoResult);
      // Mark order as cancelled/failed
      await prisma.order.update({
        where: { id: order.id },
        data: { status: "CANCELLED" }
      });
      return NextResponse.json({ error: "Ödeme altyapısında bir sorun oluştu: " + iyzicoResult.errorMessage }, { status: 500 });
    }

  } catch (error: any) {
    console.error("Sipariş oluşturulurken hata:", error);
    return NextResponse.json(
      { error: "Sistemsel bir hata meydana geldi.", details: error.message },
      { status: 500 }
    );
  }
}
