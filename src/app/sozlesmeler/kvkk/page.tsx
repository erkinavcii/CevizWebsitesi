import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni | Ceviz Bahçesi",
  description: "Ceviz Bahçesi Kişisel Verilerin Korunması Kanunu (KVKK) aydınlatma metni ve aydınlatma politikası.",
};

export default function KvkkPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8 font-serif">
        KVKK Aydınlatma Metni
      </h1>

      <div className="prose prose-stone max-w-none text-foreground/80 space-y-6">
        <p className="text-sm text-muted-foreground">Son Güncelleme Tarihi: 21 Mayıs 2026</p>

        <section>
          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. Veri Sorumlusunun Kimliği</h2>
          <p>
            6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, "Ceviz Bahçesi" olarak ("Şirket" veya "Veri Sorumlusu"), kişisel verileriniz işbu Aydınlatma Metni kapsamında işlenebilecektir.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. Kişisel Verilerin Hangi Amaçla İşleneceği</h2>
          <p>
            Toplanan kişisel verileriniz (Ad, Soyad, TCKN, İletişim Bilgileri, Teslimat/Fatura Adresleri, Müşteri İşlem ve Ödeme Bilgileri), aşağıdaki amaçlar dahilinde işlenmektedir:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Sipariş süreçlerinin yürütülmesi, ürün teslimatı ve kargo işlemlerinin gerçekleştirilmesi,</li>
            <li>Fatura düzenlenmesi ve yasal muhasebe/finans yükümlülüklerinin yerine getirilmesi,</li>
            <li>Müşteri ilişkileri yönetimi, talep ve şikayetlerin takibi,</li>
            <li>Mesafeli Satış Sözleşmesi ve ilgili mevzuat uyarınca yasal yükümlülüklerimizin ifası,</li>
            <li><strong>Ticari iletişim izni vermiş (açık rızası bulunan) kullanıcılarımız için:</strong> Yeni hasat dönemleri, stok güncellemeleri, özel teklif ve indirim kampanyaları hakkında SMS, E-posta veya Telefon ile bilgilendirme yapılması.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. İşlenen Kişisel Verilerin Kimlere ve Hangi Amaçla Aktarılabileceği</h2>
          <p>
            Kişisel verileriniz, yukarıda belirtilen amaçların gerçekleştirilmesi doğrultusunda; tedarikçilerimize (kargo firmaları vb.), iş ortaklarımıza (ödeme altyapısı sağlayıcıları - örn. Iyzico), kanunen yetkili kamu kurumlarına ve özel kişilere KVKK'nın 8. ve 9. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları çerçevesinde aktarılabilecektir.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi</h2>
          <p>
            Kişisel verileriniz, internet sitemiz üzerinden yapılan alışverişler, üyelik kayıtları, doldurulan formlar ve çerezler (cookies) aracılığıyla elektronik ortamda otomatik veya otomatik olmayan yöntemlerle toplanmaktadır. 
          </p>
          <p>Hukuki sebeplerimiz:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Bir sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması kaydıyla sözleşmenin taraflarına ait kişisel verilerin işlenmesinin gerekli olması (Sipariş Yönetimi),</li>
            <li>Veri sorumlusunun hukuki yükümlülüğünü yerine getirebilmesi için zorunlu olması (Fatura, ETBİS vb. yasal gereklilikler),</li>
            <li>Açık rızanızın bulunması (Pazarlama ve ticari iletişim faaliyetleri için).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">5. İlgili Kişinin KVKK Madde 11 Kapsamındaki Hakları</h2>
          <p>
            KVKK'nın 11. maddesi uyarınca veri sahipleri; kişisel verilerinin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme, yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme, eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme haklarına sahiptir.
          </p>
        </section>

        <div className="mt-12 p-4 bg-muted rounded-lg border border-border">
          <p className="text-sm font-medium">
            Kişisel verilerinizin işlenmesiyle ilgili haklarınızı kullanmak veya ticari iletişim izninizi iptal etmek için info@cevizbahcesi.com (örnek) adresine e-posta gönderebilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
}
