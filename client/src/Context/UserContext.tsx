import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import type { User, UserContextType } from "../types/User";

const UserContext = createContext<UserContextType | null>(null);

type Props = {
  children: ReactNode;
};
export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData: User) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "useUser doit être utilisé à l'intérieur d'un UserProvider",
    );
  }
  return context;
};
