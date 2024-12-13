import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { useNavigate } from "react-router";

enum selected {
  DASHBOARD = "dashboard",
  USERS = "users",
  BOOKS = "books",
  ORDERS = "orders",
}

export default function SiderAdmin() {
  const navigate = useNavigate();
  const [selection, setSelection] = useState(selected.DASHBOARD);

  const handleSelected = (s: selected, to: string) => {
    setSelection(s);
    navigate(to);
  };

  return (
    <Sider
      width='20rem'
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        insetInlineStart: 0,
        background: "rgb(247, 247, 247)",
        top: 0,
        bottom: 0,
      }}
    >
      <h1 className='sider-title'>administrator</h1>
      <div className='sider-content'>
        <button
          onClick={() => handleSelected(selected.DASHBOARD, "/admin")}
          className={`sider-item ${
            selection === selected.DASHBOARD ? "active" : ""
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => handleSelected(selected.USERS, "/admin/users")}
          className={`sider-item ${
            selection === selected.USERS ? "active" : ""
          }`}
        >
          Manage Users
        </button>
        <button
          onClick={() => handleSelected(selected.BOOKS, "/admin/books")}
          className={`sider-item ${
            selection === selected.BOOKS ? "active" : ""
          }`}
        >
          Manage Books
        </button>
        <button
          onClick={() => handleSelected(selected.ORDERS, "/admin/orders")}
          className={`sider-item ${
            selection === selected.ORDERS ? "active" : ""
          }`}
        >
          Manage Orders
        </button>
      </div>
    </Sider>
  );
}
