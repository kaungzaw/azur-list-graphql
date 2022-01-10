import * as React from "react";
import { Typography, Form, Input, Button, Select, message } from "antd";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { UpdateShip, GetOneShip } from "gqls/ShipGql";
import { Rarity, Type } from "configs/constants";
import Loading from "components/Loading";
import ErrorDisplay from "components/ErrorDisplay";

const { Title } = Typography;

const UpdateShipPage = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const { loading, error, data } = useQuery(GetOneShip, { variables: { id } });
  const [updateShip, { loading: updateShipLoading }] = useMutation(UpdateShip, {
    refetchQueries: ["GetAllShips", { query: GetOneShip, variables: { id } }],
  });

  const onFinish = async (values) => {
    try {
      const ship = await updateShip({ variables: { update: values } });
      form.resetFields();
      message.success("Ship Updated.");
    } catch (error) {
      message.error(error.toString());
    }
  };

  return (
    <>
      <Title level={4}>Update Ship</Title>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorDisplay error={error} />
      ) : (
        data && (
          <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            initialValues={data.ship}
          >
            <Form.Item label="Id" name="id" rules={[{ required: true }]}>
              <Input disabled={updateShipLoading} />
            </Form.Item>

            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
              <Input disabled={updateShipLoading} />
            </Form.Item>

            <Form.Item
              label="Rarity"
              name="rarity"
              rules={[{ required: true }]}
            >
              <Select disabled={updateShipLoading}>
                {Object.entries(Rarity).map(([key, value]) => (
                  <Select.Option key={key} value={key}>
                    {value}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Type" name="type" rules={[{ required: true }]}>
              <Select disabled={updateShipLoading}>
                {Object.entries(Type).map(([key, value]) => (
                  <Select.Option key={key} value={key}>
                    {value}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={updateShipLoading}
                disabled={updateShipLoading}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        )
      )}
    </>
  );
};

export default UpdateShipPage;
