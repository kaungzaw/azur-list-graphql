import * as React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.loading}>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 80 }} spin />} />
    </div>
  );
};

export default Loading;
