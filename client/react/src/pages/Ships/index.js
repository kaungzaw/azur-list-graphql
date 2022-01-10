import * as React from "react";
import { Typography, Table, Button, Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useQuery, useMutation, gql } from "@apollo/client";
import { GetAllShips, DeleteShip } from "gqls/ShipGql";
import ErrorDisplay from "components/ErrorDisplay";
import { Rarity, Type } from "configs/constants";
import { Link } from "react-router-dom";

const { Title } = Typography;

const Ships = () => {
  const { loading, error, data } = useQuery(GetAllShips);
  const [
    deleteShip,
    {
      loading: deleteShipLoading,
      error: deleteShipError,
      data: deleteShipData,
    },
  ] = useMutation(DeleteShip, {
    update(cache, { data: { deleteShip } }) {
      cache.modify({
        fields: {
          ships(existingShipRefs, { readField }) {
            const deletedShipRef = cache.writeFragment({
              data: deleteShip,
              fragment: gql`
                fragment NewShip on Ship {
                  id
                  type
                }
              `,
            });
            return existingShipRefs.filter(
              (shipRef) =>
                readField("id", deletedShipRef) !== readField("id", shipRef)
            );
          },
        },
      });
    },
  });

  const handleDelete = ({ id, name }) => {
    Modal.confirm({
      title: "Do you want to delete this ship?",
      icon: <ExclamationCircleOutlined />,
      content: (
        <>
          <div>{`Id: ${id}`}</div>
          <div>{`Name: ${name}`}</div>
        </>
      ),
      onOk() {
        return new Promise(async (resolve, reject) => {
          try {
            await deleteShip({ variables: { id } });
            resolve();
          } catch (error) {
            message.error(error.toString());
            reject();
          }
        });
      },
      onCancel() {},
    });
  };

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
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <>
          <Button type="danger" onClick={() => handleDelete(record)}>
            Delete
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Link to={`/ships/update/${record.id}`}>
            <Button type="primary">Update</Button>
          </Link>
        </>
      ),
    },
  ];

  return (
    <>
      <Title level={4}>List of Ships</Title>
      <Button type="primary">
        <Link to="/ships/create">Create Ship</Link>
      </Button>
      <br />
      <br />
      {error ? (
        <ErrorDisplay error={error} />
      ) : (
        <Table
          columns={columns}
          dataSource={data && data.ships}
          rowKey="id"
          loading={loading || deleteShipLoading}
          size="middle"
          bordered
        />
      )}
    </>
  );
};

export default Ships;
