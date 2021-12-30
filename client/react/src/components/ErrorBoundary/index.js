import * as React from "react";
import { Result } from "antd";
import styles from "./ErrorBoundary.module.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: undefined, errorInfo: undefined };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    const { error, errorInfo } = this.state;

    if (errorInfo) {
      const errorDetails =
        !process.env.NODE_ENV || process.env.NODE_ENV === "development" ? (
          <details className={styles.preserve_space}>
            {error && error.toString()}
            {errorInfo.componentStack}
          </details>
        ) : undefined;

      return (
        <Result
          status="error"
          title="An unexpected error has occurred."
          extra={errorDetails}
        />
        // <div>
        //   <div>An unexpected error has occurred.</div>
        //   {errorDetails}
        // </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
