"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateOrderStatus(orderId: string, newStatus: string) {
  try {
    const updateData: any = { status: newStatus };
    
    if (newStatus === "SHIPPED") {
      // Simulate Aras Cargo integration by auto-generating a 12-digit tracking number
      const randomTracking = "40" + Math.floor(1000000000 + Math.random() * 9000000000);
      updateData.cargoTrackingNo = randomTracking;
    }

    const updated = await prisma.order.update({
      where: { id: orderId },
      data: updateData,
    });

    revalidatePath("/admin/siparisler");
    revalidatePath("/admin");
    return { success: true, trackingNo: updated.cargoTrackingNo };
  } catch (error) {
    console.error("Sipariş güncellenemedi:", error);
    return { error: "Sipariş güncellenirken bir hata oluştu." };
  }
}

