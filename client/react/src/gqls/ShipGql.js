import { gql } from "@apollo/client";

const GetAllShips = gql`
  query GetAllShips {
    ships {
      id
      name
      rarity
      type
    }
  }
`;

export { GetAllShips };
