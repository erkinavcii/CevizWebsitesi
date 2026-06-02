import Link from "next/link";
import { XCircle, ArrowLeft } from "lucide-react";

export default function OdemeBasarisizPage({
  searchParams
}: {
  searchParams: { error?: string }
}) {
  const errorMsg = searchParams.error || "Ödeme işlemi sırasında bir hata oluştu.";

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-zinc-50 px-4">
      <div className="bg-white p-8 md:p-12 rounded-3xl border border-zinc-200 shadow-2xl max-w-lg w-full text-center space-y-6">
        <div className="mx-auto w-24 h-24 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6">
          <XCircle className="w-12 h-12" />
        </div>
        
        <h1 className="text-3xl font-black font-heading text-zinc-900 tracking-tight">Ödeme Başarısız</h1>
        <p className="text-zinc-600 leading-relaxed">
          Maalesef işleminiz gerçekleştirilemedi. Bankanız veya kartınız kaynaklı bir sorun olabilir.
        </p>

        <div className="bg-red-50 border border-red-200 p-4 rounded-xl mt-4">
          <p className="text-xs text-red-800 font-medium">Hata Mesajı: {decodeURIComponent(errorMsg)}</p>
        </div>

        <div className="pt-8 space-y-3">
          <Link href="/urunler" className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold h-12 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-zinc-900/20">
            <ArrowLeft className="w-4 h-4" /> Sepete Dön ve Tekrar Dene
          </Link>
          <p className="text-[10px] text-zinc-400">Sorun devam ederse lütfen bizimle iletişime geçin.</p>
        </div>
      </div>
    </div>
  );
}
