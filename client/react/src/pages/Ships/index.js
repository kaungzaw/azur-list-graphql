import * as React from "react";
import { Typography, Table } from "antd";
import { useQuery } from "@apollo/client";
import { GetAllShips } from "gqls/ShipGql";
import ErrorDisplay from "components/ErrorDisplay";
import { Rarity, Type } from "configs/constants";

const { Title } = Typography;

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Rarity",
    dataIndex: "rarity",
    key: "rarity",
    render: (rarity) => Rarity[rarity],
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    render: (type) => Type[type],
  },
];

const Ships = () => {
  const { loading, error, data } = useQuery(GetAllShips);

  return (
    <>
      <Title level={4}>List of Ships</Title>
      {error ? (
        <ErrorDisplay error={error} />
      ) : (
        <Table
          columns={columns}
          dataSource={data && data.ships}
          rowKey="id"
          loading={loading}
          size="middle"
          bordered
        />
      )}
    </>
  );
};

export default Ships;
