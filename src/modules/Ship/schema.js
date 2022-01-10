const { gql } = require("apollo-server-express");

const ShipAttributes = `
  id: String!
  name: String!
  rarity: Rarity!
  type: Type!
`;

module.exports = gql`
  enum Rarity {
    NORMAL
    RARE
    ELITE
    SUPER_RARE
    ULTRA_RARE
  }

  enum Type {
    DESTROYER
    LIGHT_CRUISER
    HEAVY_CRUISER
    LARGE_CRUISER
    MONITOR
    BATTLECRUISER
    BATTLESHIP
    AVIATION_BATTLESHIP
    LIGHT_AIRCRAFT_CARRIER
    AIRCRAFT_CARRIER
    SUBMARINE
    SUBMARINE_CARRIER
    REPAIR_SHIP
    MUNITION_SHIP
  }

  type Ship {
    ${ShipAttributes}
  }

  input ShipInput {
    ${ShipAttributes}
  }

  input ShipUpdate {
    id: String!
    name: String
    rarity: Rarity
    type: Type
  }

  type Query {
    ships: [Ship!]
    ship(id: String!): Ship!
  }

  type Mutation {
    createShip(ship: ShipInput!): Ship!
    deleteShip(id: String!): Ship!
    updateShip(update: ShipUpdate!): Ship!
  }
`;
