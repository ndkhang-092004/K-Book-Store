import { Outlet } from "react-router";
import ProtectedRoute from "components/auth/ProtectedRoute";
import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import "./LayoutAdmin.scss";
import HeaderUser from "../layout/HeaderUser";
import SiderAdmin from "./SiderAdmin";

export default function LayoutAdmin() {
  return (
    <ProtectedRoute>
      <main>
        <Layout hasSider>
          <SiderAdmin />
          <Layout style={{ marginInlineStart: "20rem" }}>
            <Header
              style={{
                background: "rgb(0, 148, 181)",
                display: "flex",
                justifyContent: "right",
              }}
            >
              <HeaderUser />
            </Header>
            <Content style={{ padding: "0 2rem" }}>
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </main>
    </ProtectedRoute>
  );
}
