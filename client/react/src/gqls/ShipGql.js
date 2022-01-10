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

const DeleteShip = gql`
  mutation DeleteShip($id: String!) {
    deleteShip(id: $id) {
      id
      name
      rarity
      type
    }
  }
`;

export { GetAllShips, DeleteShip };
