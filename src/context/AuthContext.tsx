// src/context/AuthContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getItem, removeItem, setItem } from "@/helpers/localStorage";
import { loginService } from "@/services/auth";
import { env } from "@/config/env";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  // outros campos se necessário
}

interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = getItem(env.USER_KEY);
    if (storedUser) setUser(storedUser);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await loginService({ email, password });
      const storedUser = getItem(env.USER_KEY);
      setUser(storedUser);
      router.push("/dashboard");
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };

  const logout = () => {
    removeItem(env.AUTH_KEY);
    removeItem(env.USER_KEY);
    setUser(null);
    router.push("/");
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
