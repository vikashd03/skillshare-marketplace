"use client";

import { API_URL } from "@/utils/config";
import {
  clearTokenCookie,
  getTokenFromCookie,
  storeTokenInCookie,
} from "@/utils/helper";
import { User } from "@/utils/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";

type AppContextType = {
  user: User | null;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setUser: Dispatch<SetStateAction<User | null>>;
  handleSession: (token: string) => void;
  fetchUser: () => void;
  logout: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const fetchUser = () => {
    setLoading(true);
    axios
      .get(`${API_URL}/user/me`, {
        headers: {
          Authorization: `Basic ${getTokenFromCookie()}`,
        },
      })
      .then((res) => setUser(res.data))
      .catch(() => {
        setUser(null);
        logout();
      })
      .finally(() => setLoading(false));
  };

  const logout = () => {
    clearTokenCookie();
    router.push("/login");
  };

  const handleSession = (token: string) => {
    storeTokenInCookie(token, 7);
    router.push("/dashboard");
    fetchUser();
  };

  return (
    <AppContext.Provider
      value={{
        user,
        loading,
        setLoading,
        setUser,
        handleSession,
        fetchUser,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
