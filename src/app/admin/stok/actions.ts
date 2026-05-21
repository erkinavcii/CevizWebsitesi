"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateStock(variantId: string, newStock: number) {
  try {
    await prisma.productVariant.update({
      where: { id: variantId },
      data: { stockKg: newStock },
    });
    revalidatePath("/admin/stok");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Stok güncellenemedi:", error);
    return { error: "Stok güncellenirken bir hata oluştu." };
  }
}
