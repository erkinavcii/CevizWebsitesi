import { prisma } from "@/lib/prisma";
import StockList from "./StockList";

export const dynamic = "force-dynamic";

export default async function StokPage() {
  const products = await prisma.product.findMany({
    include: {
      variants: true,
    },
    orderBy: { createdAt: "asc" }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-zinc-900">Stok Yönetimi</h1>
        <p className="text-sm text-zinc-500 mt-1">Ürünlerin anlık kilogram bazında stoklarını buradan güncelleyebilirsiniz.</p>
      </div>

      <StockList initialProducts={products} />
    </div>
  );
}
