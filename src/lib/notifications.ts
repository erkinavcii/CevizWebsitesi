/**
 * Notification Service for Ceviz Bahçesi Website
 * Integrates with Telegram Bot API and n8n webhooks for order notifications
 */

export async function sendTelegramNotification(order: any) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.log("⚠️ Telegram notifications skipped: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not configured.");
    return false;
  }

  try {
    const orderNo = order.orderNo || "CB-" + new Date().getFullYear() + "-" + order.id.slice(0, 4).toUpperCase();
    const itemsText = order.items
      ?.map((item: any) => `• ${item.variant?.product?.name || "Ceviz"} (${item.variant?.label || item.quantity}) - x${item.quantity}`)
      .join("\n") || "Ürün detayı bulunamadı";

    const text = 
      `🔔 *YENİ CEVİZ SİPARİŞİ ÖDENDİ!*\n\n` +
      `🆔 *Sipariş No:* ${orderNo}\n` +
      `👤 *Müşteri:* ${order.customerName || "İsimsiz"}\n` +
      `📞 *Telefon:* ${order.customerPhone || "N/A"}\n` +
      `📍 *Adres:* ${order.shippingAddress || "N/A"}\n` +
      `🚚 *Kargo Ücreti:* ${order.cargoFee === 0 ? "BEDAVA" : `${order.cargoFee.toFixed(2)} TL`}\n` +
      `💵 *Toplam Tutar:* ${order.total.toFixed(2)} TL\n\n` +
      `📦 *Ürünler:*\n${itemsText}\n\n` +
      `🧾 *Fatura:* ${order.wantsInvoice ? "Kurumsal/TCKN İsteniyor" : "Perakende Fişi"}\n\n` +
      `🛒 _Bahçe Admin Paneline git ve siparişi kargola!_`;

    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: "Markdown"
      })
    });

    const data = await response.json();
    if (data.ok) {
      console.log(`✅ Telegram order notification successfully sent for ${orderNo}`);
      return true;
    } else {
      console.error("❌ Telegram API returned error:", data);
      return false;
    }
  } catch (error) {
    console.error("❌ Error sending Telegram notification:", error);
    return false;
  }
}

export async function sendN8nNotification(order: any) {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;

  if (!webhookUrl) {
    console.log("⚠️ n8n webhook notifications skipped: N8N_WEBHOOK_URL not configured.");
    return false;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        event: "order.paid",
        timestamp: new Date().toISOString(),
        order: {
          id: order.id,
          orderNo: order.orderNo,
          customerName: order.customerName,
          customerPhone: order.customerPhone,
          customerEmail: order.customerEmail,
          shippingAddress: order.shippingAddress,
          total: order.total,
          cargoFee: order.cargoFee,
          wantsInvoice: order.wantsInvoice,
          invoiceType: order.invoiceType,
          companyName: order.companyName,
          taxOffice: order.taxOffice,
          taxNumber: order.taxNumber,
          tckn: order.tckn,
          items: order.items?.map((item: any) => ({
            id: item.id,
            productName: item.variant?.product?.name,
            variantLabel: item.variant?.label,
            quantity: item.quantity,
            unitPrice: item.unitPrice
          }))
        }
      })
    });

    if (response.ok) {
      console.log(`✅ n8n webhook successfully triggered for order ${order.orderNo}`);
      return true;
    } else {
      console.error("❌ n8n webhook returned status:", response.status);
      return false;
    }
  } catch (error) {
    console.error("❌ Error triggering n8n webhook:", error);
    return false;
  }
}
