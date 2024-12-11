import { useEffect } from "react";
import { Outlet } from "react-router";
import { fetchAccountAPI } from "./services/api";
import { useAppContext } from "./components/context/app.context";
import { delay } from "utils/delay";
import { SyncLoader } from "react-spinners";

function Layout() {
  const { isLoading, setUser, setIsLoading, setIsAuthenticated } =
    useAppContext();

  useEffect(() => {
    const fetchAccount = async () => {
      const res = await fetchAccountAPI();
      await delay(3000); //Add some delay
      if (res.data?.user) {
        setUser(res.data.user);
        setIsAuthenticated(true);
      }

      setIsLoading(false);
    };

    fetchAccount();
  }, [setUser, setIsLoading, setIsAuthenticated]);

  return (
    <>
      {isLoading ? (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <SyncLoader color='rgb(9, 137, 184)' loading={isLoading} />
        </div>
      ) : (
        <main className='layout'>
          <Outlet />
        </main>
      )}
    </>
  );
}

export default Layout;
