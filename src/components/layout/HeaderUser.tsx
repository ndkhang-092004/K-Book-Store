import { Divider, Dropdown, Space } from "antd";
import { FaRegCircleUser } from "react-icons/fa6";
import type { MenuProps } from "antd";
import { Link, useLocation } from "react-router";
import { logoutAPI } from "@/services/api";
import { useAppContext } from "../context/app.context";

export default function HeaderUser() {
  const { pathname } = useLocation();
  const { user, setUser, setIsAuthenticated } = useAppContext();
  const handleLogout = async () => {
    const res = await logoutAPI();
    if (res.data) {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("access_token");
    }
  };

  const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
    user?.avatar
  }`;

  const items: MenuProps["items"] = [
    {
      label: <Link to='/account'>My account</Link>,
      key: "account",
    },
    {
      label: "Log out",
      onClick: () => handleLogout(),
      key: "logout",
    },
  ];

  if (pathname !== "/")
    items.unshift({
      label: <Link to='/'>Home page</Link>,
      key: "home",
    });

  if (user?.role === "ADMIN" && !pathname.includes("admin"))
    items.unshift({
      label: <Link to='/admin'>Administrators page</Link>,
      key: "admin",
    });

  return (
    <div className='user'>
      {user?.avatar ? (
        <div
          style={{
            display: "flex",
            background: "#fff",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "999px",
            width: "2.4rem",
            height: "2.4rem",
          }}
        >
          <img width='34px' height='34px' src={urlAvatar} />
        </div>
      ) : (
        <FaRegCircleUser style={{ width: "22px", height: "22px" }} />
      )}
      <Divider
        type='vertical'
        style={{
          borderInlineStart: "2px solid rgb(0,0,0,0.2)",
          height: "2rem",
          top: 0,
        }}
      />
      {user ? (
        <Dropdown menu={{ items }} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()}>
            <Space style={{ color: "#fff" }}>{user.fullName}</Space>
          </a>
        </Dropdown>
      ) : (
        <Link to='/login'>
          <p style={{ color: "#fff" }}>Login</p>
        </Link>
      )}
    </div>
  );
}
