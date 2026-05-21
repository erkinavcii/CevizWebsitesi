"use client";

import { useState } from "react";
import { format, differenceInDays } from "date-fns";
import { tr } from "date-fns/locale";
import { Users, Phone, Mail, Clock, MessageSquare, CheckCircle2 } from "lucide-react";

export default function CrmList({ customers }: { customers: any[] }) {
  const [markedAsContacted, setMarkedAsContacted] = useState<string[]>([]);

  const handleContactClick = (phone: string) => {
    // Clean phone number for WhatsApp link
    const cleanPhone = phone.replace(/\D/g, "");
    const formattedPhone = cleanPhone.startsWith("90") ? cleanPhone : `90${cleanPhone}`;
    const message = encodeURIComponent("Merhaba, Ceviz Bahçesi'nden ulaşıyoruz. Daha önceki siparişinizden memnun kalmış mıydınız? Yeni hasat cevizlerimiz stoklarda!");
    window.open(`https://wa.me/${formattedPhone}?text=${message}`, "_blank");
    
    // Geçici olarak "iletişime geçildi" olarak işaretle (ileride veritabanına yazılabilir)
    if (!markedAsContacted.includes(phone)) {
      setMarkedAsContacted([...markedAsContacted, phone]);
    }
  };

  return (
    <div className="space-y-4">
      {customers.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-zinc-200">
          <Users className="h-12 w-12 text-zinc-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-zinc-900">Henüz İzin Veren Müşteri Yok</h3>
          <p className="text-sm text-zinc-500">Müşterileriniz alışveriş sırasında onay verdikçe burada listelenecektir.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {customers.map((customer) => {
            const daysSince = differenceInDays(new Date(), new Date(customer.lastOrderDate));
            const isContacted = markedAsContacted.includes(customer.phone);
            
            // Tahmini tüketim hesaplaması (örn: 5kg ceviz ortalama 3-4 ay gider = 90 gün)
            // Basit bir eşik: 2 aydan eski siparişler "Hatırlatma Zamanı Gelmiş" sayılır.
            const needsReminder = daysSince > 60;

            return (
              <div key={customer.phone} className={`bg-white rounded-2xl border overflow-hidden shadow-sm transition-all ${needsReminder ? 'border-amber-300' : 'border-zinc-200'}`}>
                <div className={`px-4 py-3 border-b flex justify-between items-center ${needsReminder ? 'bg-amber-50 border-amber-200' : 'bg-zinc-50 border-zinc-200'}`}>
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${needsReminder ? 'bg-amber-500 animate-pulse' : 'bg-zinc-300'}`} />
                    <p className={`text-xs font-bold ${needsReminder ? 'text-amber-700' : 'text-zinc-600'}`}>
                      {needsReminder ? "Hatırlatma Zamanı Gelmiş" : "Yakın Zamanda Alışveriş Yaptı"}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-zinc-500">
                    <Clock className="h-3 w-3" /> {daysSince} gün önce
                  </div>
                </div>

                <div className="p-4 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900">{customer.name || "İsimsiz Müşteri"}</h3>
                    <p className="text-xs text-zinc-500 mt-1">Son Sipariş: {format(new Date(customer.lastOrderDate), "d MMMM yyyy", { locale: tr })} ({customer.totalWeightKg} kg)</p>
                  </div>

                  <div className="space-y-2">
                    <a href={`tel:${customer.phone}`} className="flex items-center gap-3 p-2 hover:bg-zinc-50 rounded-lg transition-colors group">
                      <div className="h-8 w-8 bg-zinc-100 text-zinc-600 rounded-full flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <Phone className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium text-zinc-700">{customer.phone}</span>
                    </a>
                    
                    {customer.email && (
                      <a href={`mailto:${customer.email}`} className="flex items-center gap-3 p-2 hover:bg-zinc-50 rounded-lg transition-colors group">
                        <div className="h-8 w-8 bg-zinc-100 text-zinc-600 rounded-full flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                          <Mail className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-medium text-zinc-700">{customer.email}</span>
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => handleContactClick(customer.phone)}
                    className={`w-full h-10 rounded-xl flex items-center justify-center gap-2 font-bold text-sm transition-all ${
                      isContacted 
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-green-500 hover:bg-green-600 text-white shadow-sm shadow-green-500/20"
                    }`}
                  >
                    {isContacted ? (
                      <><CheckCircle2 className="h-4 w-4" /> WhatsApp'tan Ulaşıldı</>
                    ) : (
                      <><MessageSquare className="h-4 w-4" /> WhatsApp'tan Yaz</>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
