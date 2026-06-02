import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import iyzipay from "@/lib/iyzico";
import { sendTelegramNotification, sendN8nNotification } from "@/lib/notifications";

const retrieveCheckoutFormResult = (request: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    iyzipay.checkoutForm.retrieve(request, (err: any, result: any) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

export async function POST(request: Request) {
  try {
    // Iyzico sends token via form data or urlencoded body
    const formData = await request.formData();
    const token = formData.get("token") as string;

    if (!token) {
      return NextResponse.redirect(new URL("/odeme-basarisiz?error=Token_bulunamadi", request.url));
    }

    const retrieveRequest = {
      locale: "TR",
      token: token
    };

    const result = await retrieveCheckoutFormResult(retrieveRequest);

    if (result.paymentStatus === "SUCCESS") {
      const orderId = result.basketId; // We sent orderNo as basketId but conversationId as orderId
      const conversationId = result.conversationId;

      // Find order
      const order = await prisma.order.findUnique({
        where: { id: conversationId },
        include: { items: true }
      });

      if (!order) {
        return NextResponse.redirect(new URL("/odeme-basarisiz?error=Siparis_bulunamadi", request.url));
      }

      if (order.status !== "PENDING_PAYMENT") {
        // Zaten islenmis
        return NextResponse.redirect(new URL(`/odeme-basarili?orderNo=${order.orderNo}`, request.url));
      }

      // 1. Update order status to PENDING (waiting for shipment)
      const updatedOrder = await prisma.order.update({
        where: { id: order.id },
        data: { status: "PENDING" },
        include: {
          items: {
            include: {
              variant: {
                include: { product: true }
              }
            }
          }
        }
      });

      // Send notifications (async, non-blocking)
      sendTelegramNotification(updatedOrder).catch(err => console.error("Telegram notify failed:", err));
      sendN8nNotification(updatedOrder).catch(err => console.error("n8n notify failed:", err));

      // 2. Reduce stocks
      for (const item of order.items) {
        await prisma.productVariant.update({
          where: { id: item.variantId },
          data: {
            stockKg: {
              decrement: item.quantity * 0.5 // Assuming base variant is 0.5 kg
            }
          }
        });
      }

      return NextResponse.redirect(new URL(`/odeme-basarili?orderNo=${order.orderNo}`, request.url));
    } else {
      console.error("Iyzico Payment Failed:", result);
      
      const conversationId = result.conversationId;
      if (conversationId) {
        await prisma.order.update({
          where: { id: conversationId },
          data: { status: "CANCELLED" }
        });
      }

      return NextResponse.redirect(new URL(`/odeme-basarisiz?error=${encodeURIComponent(result.errorMessage || "Odeme_basarisiz")}`, request.url));
    }

  } catch (error) {
    console.error("Callback error:", error);
    return NextResponse.redirect(new URL("/odeme-basarisiz?error=Sistemsel_hata", request.url));
  }
}
