const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const { delayPromise } = require("../../utils/delay");

module.exports = {
  Query: {
    ships: async () => {
      return await delayPromise(prisma.ship.findMany());
    },
  },
};
