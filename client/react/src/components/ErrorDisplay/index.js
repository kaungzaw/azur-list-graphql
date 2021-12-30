import * as React from "react";
import { Result } from "antd";

const ErrorDisplay = ({ error }) => {
  return (
    <Result
      status="error"
      title="There are some problems with your operation."
      extra={<details>{error && error.message}</details>}
    />
  );
};

export default ErrorDisplay;
