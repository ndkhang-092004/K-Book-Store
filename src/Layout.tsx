import { Outlet } from "react-router";

function Layout() {
  return (
    <>
      <main className='layout'>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
