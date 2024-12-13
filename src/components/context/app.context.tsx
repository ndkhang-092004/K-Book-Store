/* eslint-disable react-refresh/only-export-components */
import { fetchAccountAPI } from "@/services/api";
import { delay } from "@/utils/delay";
import { createContext, useContext, useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";

interface IAppContext {
  isAuthenticated: boolean;
  setIsAuthenticated: (prop: boolean) => void;
  isLoading: boolean;
  setIsLoading: (prop: boolean) => void;
  user: IUser | null;
  setUser: (prop: IUser | null) => void;
}

const userContext = createContext<IAppContext | null>(null);

type AppContextProps = {
  children: React.ReactNode;
};

export function ContextProvider({ children }: AppContextProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchAccount = async () => {
      const res = await fetchAccountAPI();
      await delay(1000); //Add some delay
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
      {!isLoading ? (
        <userContext.Provider
          value={{
            isAuthenticated,
            user,
            setIsAuthenticated,
            setUser,
            isLoading,
            setIsLoading,
          }}
        >
          {children}
        </userContext.Provider>
      ) : (
        <>
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
        </>
      )}
    </>
  );
}

export const useAppContext = () => {
  const appContext = useContext(userContext);

  if (!appContext) {
    throw new Error("userContext must use in it provider!");
  }

  return appContext;
};
