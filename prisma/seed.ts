import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });


async function main() {
  console.log("🌱 Database seeding started...");

  // Clear existing data to avoid conflicts
  // Note: Delete child items first
  await prisma.stockAlert.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();

  console.log("🧹 Cleared old products and variants...");

  // Seed Product 1: Kemah Kabuklu Çiftçi Cevizi
  const product1 = await prisma.product.create({
    data: {
      slug: "kemah-kabuklu-ceviz",
      name: "Kemah Kabuklu Çiftçi Cevizi",
      description: "Kemah Vadisi'nin yüksek rakımlı bahçelerinden, ince kabuklu, dolgun iç oranına sahip, tamamen doğal gübreyle yetiştirilmiş yeni mahsul kabuklu ceviz.",
      variants: {
        create: [
          {
            label: "0.5 Kg",
            weightG: 500,
            price: 120.0,
            sku: "KEMAH-KABUK-05",
            stockKg: 1000.0,
          }
        ]
      }
    },
    include: {
      variants: true
    }
  });

  console.log(`✅ Seeded Product 1: ${product1.name} with variant:`, product1.variants[0].id);

  // Seed Product 2: Kemah Beyaz Kelebek İç Ceviz
  const product2 = await prisma.product.create({
    data: {
      slug: "kemah-ic-ceviz",
      name: "Kemah Beyaz Kelebek İç Ceviz",
      description: "El kırması yöntemiyle kabuğundan özenle ayrılmış, %90'ın üzerinde 'Kelebek' bütünlüğünde, acılık barındırmayan, ekstra beyaz birinci kalite iç ceviz.",
      variants: {
        create: [
          {
            label: "0.5 Kg",
            weightG: 500,
            price: 245.0,
            sku: "KEMAH-IC-05",
            stockKg: 500.0,
          }
        ]
      }
    },
    include: {
      variants: true
    }
  });

  console.log(`✅ Seeded Product 2: ${product2.name} with variant:`, product2.variants[0].id);

  console.log("🌱 Seeding successfully completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
