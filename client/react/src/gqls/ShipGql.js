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

const GetOneShip = gql`
  query GetOneShip($id: String!) {
    ship(id: $id) {
      id
      name
      rarity
      type
    }
  }
`;

const CreateShip = gql`
  mutation CreateShip($ship: ShipInput!) {
    createShip(ship: $ship) {
      id
      name
      rarity
      type
    }
  }
`;

const UpdateShip = gql`
  mutation UpdateShip($update: ShipUpdate!) {
    updateShip(update: $update) {
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

export { GetAllShips, GetOneShip, CreateShip, UpdateShip, DeleteShip };
