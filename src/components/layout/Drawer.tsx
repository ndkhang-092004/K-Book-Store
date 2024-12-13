import { useState } from "react";
import { Button, Drawer as MobileDrawer } from "antd";
import { HiOutlineBars3 } from "react-icons/hi2";
import { logoutAPI } from "@/services/api";
import { useAppContext } from "../context/app.context";
import { Link } from "react-router";

export default function Drawer() {
  const [open, setOpen] = useState(false);
  const { setUser, user, setIsAuthenticated, isAuthenticated } =
    useAppContext();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    if (user && isAuthenticated) {
      const res = await logoutAPI();
      if (res.data) {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("access_token");
      }
    }
  };

  return (
    <>
      <Button
        className='drawer-button'
        style={{ background: "none", border: "none" }}
        onClick={showDrawer}
      >
        <HiOutlineBars3
          style={{ width: "28px", height: "28px", color: "#fff" }}
        />
      </Button>
      <MobileDrawer
        title='Selection Menu'
        placement='left'
        closable={false}
        onClose={onClose}
        open={open}
        width={"240px"}
      >
        {user && isAuthenticated ? (
          <div className='drawer-items' onClick={handleLogout}>
            <p>Log out</p>
          </div>
        ) : (
          <Link to={"/login"} style={{ color: "black" }}>
            <div className='drawer-items'>
              <p>Login</p>
            </div>
          </Link>
        )}
      </MobileDrawer>
    </>
  );
}
