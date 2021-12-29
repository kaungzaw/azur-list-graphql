const { gql } = require("apollo-server-express");

module.exports = gql`
  enum Rarity {
    NORMAL
    RARE
    ELITE
    SUPER_RARE
    ULTRA_RARE
  }

  type Equipment {
    name: String!
    rarity: Rarity!
  }

  type Query {
    equipments: [Equipment!]
  }
`;
