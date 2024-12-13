import { Layout as LayOutApp } from "antd";
import { Outlet } from "react-router";
import HeaderApp from "./HeaderApp";

function Layout() {
  return (
    <main>
      <LayOutApp>
        <HeaderApp />
        <Outlet />
      </LayOutApp>
    </main>
  );
}

export default Layout;
