import { prisma } from "@/lib/prisma";
import OrderList from "./OrderList";

export const dynamic = "force-dynamic";

export default async function SiparislerPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: {
          variant: {
            include: { product: true },
          },
        },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-zinc-900">Sipariş Yönetimi</h1>
        <p className="text-sm text-zinc-500 mt-1">Tüm siparişlerinizi buradan takip edebilir ve kargo durumlarını güncelleyebilirsiniz.</p>
      </div>

      <OrderList initialOrders={orders} />
    </div>
  );
}
