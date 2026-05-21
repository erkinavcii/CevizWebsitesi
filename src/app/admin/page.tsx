import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PackageOpen, TrendingUp, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  // Fetch data
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const [
    totalRevenueData,
    todaysOrdersCount,
    pendingOrdersCount,
    lowStockVariants
  ] = await Promise.all([
    prisma.order.aggregate({
      _sum: { total: true },
      where: { status: { not: "CANCELLED" } }
    }),
    prisma.order.count({
      where: { createdAt: { gte: todayStart } }
    }),
    prisma.order.count({
      where: { status: "PENDING" }
    }),
    prisma.productVariant.findMany({
      where: { stockKg: { lte: 20 } },
      include: { product: true }
    })
  ]);

  const totalRevenue = totalRevenueData._sum.total || 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-zinc-900">Hoş Geldin, Patron! 👋</h1>
        <p className="text-sm text-zinc-500 mt-1">İşte bahçenin bugünkü özeti.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-primary/5 border-primary/20 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-primary">Bekleyen Sipariş</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{pendingOrdersCount}</div>
            <p className="text-[10px] text-primary/70 font-medium mt-1">Kargolanmayı bekliyor</p>
          </CardContent>
        </Card>

        <Card className="shadow-none border-zinc-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-zinc-500">Bugünkü Siparişler</CardTitle>
            <PackageOpen className="h-4 w-4 text-zinc-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-900">{todaysOrdersCount}</div>
          </CardContent>
        </Card>

        <Card className="shadow-none border-zinc-200 col-span-2 md:col-span-2 bg-gradient-to-br from-zinc-900 to-zinc-800 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-zinc-400">Toplam Ciro</CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-white">{totalRevenue.toLocaleString("tr-TR")} ₺</div>
            <p className="text-[10px] text-zinc-400 font-medium mt-1">İptaller hariç toplam tutar</p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {lowStockVariants.length > 0 && (
        <div className="space-y-3 mt-8">
          <h2 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500" /> Kritik Stok Uyarıları
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {lowStockVariants.map((variant) => (
              <div key={variant.id} className="flex items-center justify-between p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <div>
                  <p className="text-sm font-bold text-amber-900">{variant.product.name}</p>
                  <p className="text-xs text-amber-700">{variant.label} Paket</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-amber-600">{variant.stockKg} kg</p>
                  <p className="text-[9px] font-bold text-amber-700/70 uppercase tracking-wider">Kaldı</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="pt-6">
        <h2 className="text-sm font-bold text-zinc-900 mb-3">Hızlı İşlemler</h2>
        <div className="grid grid-cols-2 gap-3">
          <Link href="/admin/siparisler" className="flex items-center gap-3 p-4 bg-white border border-zinc-200 rounded-xl hover:border-primary hover:shadow-sm transition-all group">
            <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <PackageOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900">Siparişler</p>
              <p className="text-[10px] text-zinc-500">Kargo durumu güncelle</p>
            </div>
          </Link>

          <Link href="/admin/stok" className="flex items-center gap-3 p-4 bg-white border border-zinc-200 rounded-xl hover:border-primary hover:shadow-sm transition-all group">
            <div className="h-10 w-10 bg-accent/10 rounded-full flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900">Stoklar</p>
              <p className="text-[10px] text-zinc-500">Yeni ürün girişi yap</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
