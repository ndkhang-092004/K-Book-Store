/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

interface IAppContext {
  isAuthenticated: boolean;
  setIsAuthenticated: (prop: boolean) => void;
  isLoading: boolean;
  setIsLoading: (prop: boolean) => void;
  user: IUser | null;
  setUser: (prop: IUser) => void;
}

const userContext = createContext<IAppContext | null>(null);

type AppContextProps = {
  children: React.ReactNode;
};

export function ContextProvider({ children }: AppContextProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);

  return (
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
  );
}

export const useAppContext = () => {
  const appContext = useContext(userContext);

  if (!appContext) {
    throw new Error("userContext must use in it provider!");
  }

  return appContext;
};
