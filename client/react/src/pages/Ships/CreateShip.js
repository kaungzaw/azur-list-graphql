import * as React from "react";
import { Typography, Form, Input, Button, Select, message } from "antd";
import { useMutation, gql } from "@apollo/client";
import { CreateShip } from "gqls/ShipGql";
import { Rarity, Type } from "../../configs/constants";

const { Title } = Typography;

const CreateShipPage = () => {
  const [form] = Form.useForm();
  const [createShip, { loading: createShipLoading }] = useMutation(CreateShip, {
    refetchQueries: ["GetAllShips"],
  });

  const onFinish = async (values) => {
    try {
      const ship = await createShip({ variables: { ship: values } });
      form.resetFields();
      message.success("Ship Created.");
    } catch (error) {
      message.error(error.toString());
    }
  };

  return (
    <>
      <Title level={4}>Create Ship</Title>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item label="Id" name="id" rules={[{ required: true }]}>
          <Input disabled={createShipLoading} />
        </Form.Item>

        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input disabled={createShipLoading} />
        </Form.Item>

        <Form.Item label="Rarity" name="rarity" rules={[{ required: true }]}>
          <Select disabled={createShipLoading}>
            {Object.entries(Rarity).map(([key, value]) => (
              <Select.Option key={key} value={key}>
                {value}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Type" name="type" rules={[{ required: true }]}>
          <Select disabled={createShipLoading}>
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
            loading={createShipLoading}
            disabled={createShipLoading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateShipPage;
