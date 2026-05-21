import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mesafeli Satış Sözleşmesi | Ceviz Bahçesi",
  description: "Ceviz Bahçesi mesafeli satış sözleşmesi ve kullanım koşulları.",
};

export default function MesafeliSatisPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8 font-serif">
        Mesafeli Satış Sözleşmesi
      </h1>

      <div className="prose prose-stone max-w-none text-foreground/80 space-y-6">
        <p className="text-sm text-muted-foreground">Son Güncelleme Tarihi: 21 Mayıs 2026</p>

        <section>
          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. TARAFLAR</h2>
          <p>
            İşbu Sözleşme aşağıdaki taraflar arasında aşağıda belirtilen hüküm ve şartlar çerçevesinde imzalanmıştır.
          </p>
          <p>
            <strong>A. ALICI:</strong> Siparişi veren müşteri.
            <br />
            <strong>B. SATICI:</strong> Ceviz Bahçesi (Bundan sonra SATICI olarak anılacaktır)
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. KONU</h2>
          <p>
            İşbu sözleşmenin konusu, ALICI'nın SATICI'ya ait cevizbahcesi.com (örnek alan adı) internet sitesinden elektronik ortamda siparişini yaptığı aşağıda nitelikleri ve satış fiyatı belirtilen ürünün satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri gereğince tarafların hak ve yükümlülüklerinin saptanmasıdır.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. SÖZLEŞME KONUSU ÜRÜN BİLGİLERİ</h2>
          <p>
            Malın/Ürünün/Hizmetin türü, miktarı, marka/modeli, rengi, adedi, satış bedeli, ödeme şekli, siparişin sonlandığı andaki bilgilerden oluşmaktadır. Alınan ürünlerin nitelikleri gıda (doğal ceviz) kategorisinde olup, Tüketici Kanunu kapsamında gıda ürünlerinde iade koşulları özel şartlara tabidir.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. GENEL HÜKÜMLER</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              ALICI, internet sitesinde sözleşme konusu ürünün temel nitelikleri, tüm vergiler dâhil satış fiyatı ve ödeme şekli ile teslimata ilişkin ön bilgileri okuyup bilgi sahibi olduğunu ve elektronik ortamda gerekli teyidi verdiğini beyan eder.
            </li>
            <li>
              Sözleşme konusu ürün, yasal 30 günlük süreyi aşmamak koşulu ile her bir ürün için ALICI'nın yerleşim yerinin uzaklığına bağlı olarak internet sitesinde ön bilgiler içinde açıklanan süre zarfında ALICI veya gösterdiği adresteki kişi/kuruluşa teslim edilir.
            </li>
            <li>
              Kargo firmasından kaynaklanan gecikmelerden SATICI sorumlu tutulamaz.
            </li>
            <li>
              Sipariş konusu ürünün teslimatı için işbu sözleşmenin elektronik ortamda onaylanmış olması ve bedelinin ALICI'nın tercih ettiği ödeme şekli ile ödenmiş olması şarttır.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">5. CAYMA HAKKI VE İADE KOŞULLARI</h2>
          <p>
            Alıcı, satın aldığı ürünün kendisine veya gösterdiği adresteki kişi/kuruluşa teslim tarihinden itibaren 14 (on dört) gün içerisinde, SATICI'ya aşağıdaki iletişim bilgileri üzerinden bildirimde bulunmak şartıyla hiçbir hukuki ve cezai sorumluluk üstlenmeksizin ve hiçbir gerekçe göstermeksizin malı reddederek sözleşmeden cayma hakkını kullanabilir.
          </p>
          <p>
            <strong>ÖNEMLİ İSTİSNA (GIDA ÜRÜNLERİ):</strong> Mesafeli Sözleşmeler Yönetmeliği madde 15/1-c gereğince; çabuk bozulabilen veya son kullanma tarihi geçebilecek malların teslimine ilişkin sözleşmelerde <strong>cayma hakkı KULLANILAMAZ.</strong> Ürünlerimiz ambalajlı doğal gıda (ceviz) olduğu için, ambalajı açılmış, denenmiş, tahrip edilmiş ürünlerin iadesi sağlık ve hijyen kuralları gereği mümkün değildir. Ancak ürünün nakliye sırasında zarar görmesi veya yanlış ürün gönderilmesi durumunda iade ve değişim hakkı saklıdır.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">6. YETKİLİ MAHKEME</h2>
          <p>
            İşbu sözleşmenin uygulanmasında, Ticaret Bakanlığınca ilan edilen değere kadar Tüketici Hakem Heyetleri ile ALICI'nın veya SATICI'nın yerleşim yerindeki Tüketici Mahkemeleri yetkilidir.
          </p>
        </section>

        <div className="mt-12 p-4 bg-muted rounded-lg border border-border">
          <p className="text-sm font-medium">
            Siparişi onaylamanız durumunda, işbu "Mesafeli Satış Sözleşmesi" şartlarını kabul etmiş sayılırsınız.
          </p>
        </div>
      </div>
    </div>
  );
}
