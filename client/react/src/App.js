import * as React from "react";
import { useQuery } from "@apollo/client";
import { GetAllShips } from "./gqls/ShipGql";

function App() {
  const { loading, error, data } = useQuery(GetAllShips);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :(</div>;
  return data.ships.map(({ id, name, rarity, type }) => (
    <div key={id}>
      {id}, {name}, {rarity}, {type}
    </div>
  ));
}

export default App;
