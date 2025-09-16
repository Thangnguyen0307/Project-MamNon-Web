import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { axiosInstance } from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export interface User {
  id: string;
  fullName: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  updateUser: (userData: User) => void;
  clearUser: () => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const updateUser = useCallback((userData: User) => {
    setUser(userData);
  }, []);

  const clearUser = useCallback(() => {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }, []);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    const fetchUser = async () => {
      // ❗ Không có token thì không gọi /my-account
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        if (active) {
          setUser(null);
          setLoading(false);
        }
        return;
      }

      try {
        const res = await axiosInstance.get(API_PATHS.USER.GET_USER_INFO, {
          signal: controller.signal as any, // tránh TS warning nếu cần
        });

        const payload: any = res?.data;
        const userData: User | null = payload?.data ?? payload ?? null;

        if (active && userData) setUser(userData);
      } catch (err) {
        if (active) setUser(null);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchUser();

    return () => {
      active = false;
      controller.abort();
    };
  }, []); // chạy 1 lần khi mount; sau login bạn đã gọi updateUser() rồi

  return (
    <UserContext.Provider
      value={{ user, updateUser, clearUser, loading, setLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
