import { Header } from "antd/es/layout/layout";
import "./HeaderApp.scss";
import SearchBar from "./SearchBar";
import HeaderUser from "./HeaderUser";
import { Link } from "react-router";
import Drawer from "./Drawer";

export default function HeaderApp() {
  return (
    <Header className='header'>
      <Drawer />
      <Link to='/'>
        <div className='logo'>
          <img src='logo.png' width='80px' />
        </div>
      </Link>
      <SearchBar />
      <HeaderUser />
    </Header>
  );
}
