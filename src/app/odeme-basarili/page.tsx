import Link from "next/link";
import { CheckCircle2, Package, ArrowRight } from "lucide-react";

export default function OdemeBasariliPage({
  searchParams
}: {
  searchParams: { orderNo?: string }
}) {
  const orderNo = searchParams.orderNo;

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-zinc-50 px-4">
      <div className="bg-white p-8 md:p-12 rounded-3xl border border-zinc-200 shadow-2xl max-w-lg w-full text-center space-y-6">
        <div className="mx-auto w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        
        <h1 className="text-3xl font-black font-heading text-zinc-900 tracking-tight">Siparişiniz Alındı!</h1>
        <p className="text-zinc-600 leading-relaxed">
          Ödemeniz başarıyla gerçekleşti. Siparişiniz hazırlanmak üzere işleme alınmıştır.
        </p>

        {orderNo && (
          <div className="bg-zinc-50 border border-zinc-200 p-4 rounded-xl inline-block mt-4">
            <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-1">Sipariş Numaranız</p>
            <p className="font-mono text-xl font-bold text-zinc-900">{orderNo}</p>
          </div>
        )}

        <div className="pt-8 space-y-3">
          <Link href="/" className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-primary/20">
            Ana Sayfaya Dön <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-[10px] text-zinc-400">Siparişinizle ilgili detaylar e-posta adresinize gönderilecektir.</p>
        </div>
      </div>
    </div>
  );
}
