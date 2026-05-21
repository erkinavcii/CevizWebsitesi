"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateOrderStatus(orderId: string, newStatus: string) {
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { status: newStatus },
    });
    revalidatePath("/admin/siparisler");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Sipariş güncellenemedi:", error);
    return { error: "Sipariş güncellenirken bir hata oluştu." };
  }
}
