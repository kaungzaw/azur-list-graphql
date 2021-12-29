const ships = [
  {
    id: "001",
    name: "Univeral Bulin",
    rarity: "ELITE",
    type: "DESTROYER",
  },
];

module.exports = {
  Query: {
    ships: () => ships,
  },
};
