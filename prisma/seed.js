const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.ship.upsert({
    where: { id: "001" },
    update: {},
    create: {
      id: "001",
      name: "Univeral Bulin",
      rarity: "ELITE",
      type: "DESTROYER",
    },
  });
  await prisma.ship.upsert({
    where: { id: "002" },
    update: {},
    create: {
      id: "002",
      name: "Prototype Bulin MKII",
      rarity: "SUPER_RARE",
      type: "DESTROYER",
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
