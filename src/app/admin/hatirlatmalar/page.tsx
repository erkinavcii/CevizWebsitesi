import { prisma } from "@/lib/prisma";
import CrmList from "./CrmList";

export const dynamic = "force-dynamic";

export default async function HatirlatmalarPage() {
  const allConsents = await prisma.order.findMany({
    where: { marketingConsent: true, status: { not: "CANCELLED" } },
    orderBy: { createdAt: "desc" },
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

  // Group by phone to get unique customers and their latest order
  const uniqueCustomersMap = new Map();
  for (const order of allConsents) {
    if (!order.customerPhone) continue;
    
    // Only keep the most recent order (since they are ordered by desc)
    if (!uniqueCustomersMap.has(order.customerPhone)) {
      // Calculate total weight for this order
      const totalWeight = order.items.reduce((sum: number, item: any) => {
        // approximate weight from quantity and variant weight. 
        // We know quantity = weightKg * 2 for 500g, but we can just use item.variant.weightG
        return sum + ((item.variant.weightG / 1000) * item.quantity);
      }, 0);

      uniqueCustomersMap.set(order.customerPhone, {
        id: order.id,
        name: order.customerName,
        phone: order.customerPhone,
        email: order.customerEmail,
        lastOrderDate: order.createdAt,
        consentDate: order.consentDate || order.createdAt,
        totalWeightKg: totalWeight,
      });
    }
  }

  const customers = Array.from(uniqueCustomersMap.values());

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-zinc-900">Müşteri Hatırlatmaları (CRM)</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Kampanya ve e-ileti izni veren müşterilerinizi burada görebilir, alışveriş üzerinden geçen süreye göre yeni teklifler sunabilirsiniz.
        </p>
      </div>

      <CrmList customers={customers} />
    </div>
  );
}
