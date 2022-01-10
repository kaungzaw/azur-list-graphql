import * as React from "react";
import { Layout, Menu, Breadcrumb, Typography } from "antd";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import Loading from "components/Loading";
import ErrorBoundary from "components/ErrorBoundary";
import { delayLazy } from "utils/delay";
import styles from "./App.module.css";

const { Header, Content } = Layout;
const { Title } = Typography;

const Home = delayLazy(import("pages/Home"));
const Ships = delayLazy(import("pages/Ships"));
const CreateShip = delayLazy(import("pages/Ships/CreateShip"));

const App = () => {
  const location = useLocation();

  return (
    <Layout>
      <Header style={{ padding: "0px 20px" }}>
        <Title level={3} className={styles.logo}>
          Azur List
        </Title>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[location.pathname]}
        >
          <Menu.Item key="/">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/ships">
            <Link to="/ships">Ships</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 20px" }}>
        <Breadcrumb style={{ margin: "10px 0" }}>
          {location.pathname.split("/").map(
            (i, index) =>
              index !== 0 && (
                <Breadcrumb.Item>
                  <Link to={`/${i}`}>{i || "home"}</Link>
                </Breadcrumb.Item>
              )
          )}
          {/* <Routes>
            <Route path="/" element={<Breadcrumb.Item>Home</Breadcrumb.Item>} />
            <Route
              path="/ships/*"
              element={<Breadcrumb.Item>Ships</Breadcrumb.Item>}
            />
          </Routes> */}
        </Breadcrumb>
        <div className={styles.site_layout_content}>
          <React.Suspense fallback={<Loading />}>
            <Routes>
              <Route
                path="/"
                element={
                  <ErrorBoundary>
                    <Home />
                  </ErrorBoundary>
                }
              />
              <Route
                path="/ships"
                element={
                  <ErrorBoundary>
                    <Ships />
                  </ErrorBoundary>
                }
              />
              <Route
                path="/ships/create"
                element={
                  <ErrorBoundary>
                    <CreateShip />
                  </ErrorBoundary>
                }
              />
            </Routes>
          </React.Suspense>
        </div>
      </Content>
    </Layout>
  );
};

export default App;
