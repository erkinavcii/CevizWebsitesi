"use client";

import { useState } from "react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Package, MapPin, Phone, User, CheckCircle2, Clock, XCircle, Truck } from "lucide-react";
import { updateOrderStatus } from "./actions";

type Order = any; // We can type this properly later

export default function OrderList({ initialOrders }: { initialOrders: Order[] }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return <span className="flex items-center gap-1 bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-bold"><Clock className="h-3 w-3"/> Bekliyor</span>;
      case "SHIPPED":
        return <span className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-bold"><Truck className="h-3 w-3"/> Kargolandı</span>;
      case "COMPLETED":
        return <span className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold"><CheckCircle2 className="h-3 w-3"/> Teslim Edildi</span>;
      case "CANCELLED":
        return <span className="flex items-center gap-1 bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-bold"><XCircle className="h-3 w-3"/> İptal</span>;
      default:
        return <span className="bg-zinc-100 text-zinc-800 px-2 py-1 rounded text-xs font-bold">{status}</span>;
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setLoadingId(orderId);
    const result = await updateOrderStatus(orderId, newStatus);
    if (result.success) {
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } else {
      alert("Durum güncellenemedi!");
    }
    setLoadingId(null);
  };

  return (
    <div className="space-y-4">
      {orders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-zinc-200">
          <Package className="h-12 w-12 text-zinc-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-zinc-900">Henüz Sipariş Yok</h3>
          <p className="text-sm text-zinc-500">Görünüşe göre henüz bir sipariş almadınız.</p>
        </div>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
            {/* Header */}
            <div className="bg-zinc-50 border-b border-zinc-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-xs text-zinc-500 font-medium">Sipariş No</p>
                <p className="text-sm font-bold font-mono text-zinc-900">{order.orderNo || "N/A"}</p>
                <p className="text-[10px] text-zinc-400 mt-0.5">
                  {format(new Date(order.createdAt), "d MMMM yyyy HH:mm", { locale: tr })}
                </p>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-3">
                {getStatusBadge(order.status)}
                
                {/* Status Actions */}
                <select
                  disabled={loadingId === order.id}
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  className="h-8 px-2 border border-zinc-200 rounded text-xs font-medium focus:ring-primary focus:border-primary bg-white disabled:opacity-50"
                >
                  <option value="PENDING">Bekliyor</option>
                  <option value="SHIPPED">Kargolandı</option>
                  <option value="COMPLETED">Teslim Edildi</option>
                  <option value="CANCELLED">İptal Edildi</option>
                </select>
              </div>
            </div>

            {/* Body */}
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer Info */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">Müşteri Bilgileri</h4>
                <div className="flex items-start gap-2 text-sm text-zinc-700">
                  <User className="h-4 w-4 text-zinc-400 shrink-0 mt-0.5" />
                  <span>{order.customerName} <br/><span className="text-xs text-zinc-500">{order.customerEmail}</span></span>
                </div>
                <div className="flex items-start gap-2 text-sm text-zinc-700">
                  <Phone className="h-4 w-4 text-zinc-400 shrink-0 mt-0.5" />
                  <span>{order.customerPhone}</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-zinc-700">
                  <MapPin className="h-4 w-4 text-zinc-400 shrink-0 mt-0.5" />
                  <span className="whitespace-pre-wrap">{order.shippingAddress}</span>
                </div>
                {order.cargoTrackingNo && (
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-800 bg-blue-50 border border-blue-200 px-3 py-2 rounded-xl mt-3 w-fit">
                    <Truck className="h-4 w-4 shrink-0 text-blue-600 animate-pulse" />
                    <span>Aras Kargo Takip No: <span className="font-mono font-black select-all">{order.cargoTrackingNo}</span></span>
                  </div>
                )}
              </div>

              {/* Order Items */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">Sipariş İçeriği</h4>
                <div className="space-y-2">
                  {order.items.map((item: any) => (
                    <div key={item.id} className="flex justify-between items-center bg-zinc-50 p-2 rounded-lg border border-zinc-100">
                      <div>
                        <p className="text-xs font-bold text-zinc-900">{item.variant.product.name}</p>
                        <p className="text-[10px] text-zinc-500">{item.quantity} x {item.variant.label}</p>
                      </div>
                      <p className="text-xs font-bold text-zinc-900">{(item.unitPrice * item.quantity).toLocaleString("tr-TR")} ₺</p>
                    </div>
                  ))}
                </div>
                
                <div className="pt-3 mt-3 border-t border-zinc-100 space-y-1">
                  <div className="flex justify-between text-xs text-zinc-500">
                    <span>Kargo Ücreti:</span>
                    <span>{order.cargoFee === 0 ? "Bedava" : `${order.cargoFee.toLocaleString("tr-TR")} ₺`}</span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-zinc-900">
                    <span>Toplam:</span>
                    <span>{order.total.toLocaleString("tr-TR")} ₺</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
