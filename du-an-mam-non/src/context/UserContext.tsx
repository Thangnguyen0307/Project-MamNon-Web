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
  setLoading: (loading: boolean) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

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
    if (user) return;
    let isMounted = true;

    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get<User>(
          API_PATHS.USER.GET_USER_INFO
        );
        if (isMounted && response.data) {
          updateUser(response.data);
        }
      } catch (err) {
        console.error("Failed to fetch user info", err);
        if (isMounted) {
          clearUser();
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, [user]);

  return (
    <UserContext.Provider
      value={{ user, updateUser, clearUser, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
