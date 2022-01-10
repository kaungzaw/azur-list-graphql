const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  Query: {
    ships: async () => {
      const ships = await prisma.ship.findMany();
      return ships;
    },
    ship: async (_, { id }) => {
      const ship = await prisma.ship.findUnique({
        where: { id },
        rejectOnNotFound: true,
      });
      return ship;
    },
  },
  Mutation: {
    createShip: async (_parent, { ship }) => {
      const createdShip = await prisma.ship.create({ data: ship });
      return createdShip;
    },
    deleteShip: async (_parent, { id }) => {
      const deletedShip = await prisma.ship.delete({
        where: { id },
      });
      return deletedShip;
    },
    updateShip: async (_parent, { update }) => {
      const updatedShip = await prisma.ship.update({
        where: { id: update.id },
        data: update,
      });
      return updatedShip;
    },
  },
};
