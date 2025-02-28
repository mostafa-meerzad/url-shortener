import React, { createContext, useContext, useEffect, useState } from "react";
import { Url } from "../types";
import axios from "axios";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  urls: Url[];
  setUrls: React.Dispatch<React.SetStateAction<Url[]>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [urls, setUrls] = useState<Url[]>([]);

  const isLoggedIn = Boolean(token);

  const fetchUserUrls = async (userToken: string) => {
    console.log("fetching urls");
    try {
      const {data} = await axios.get("http://localhost:3000/api/urls", {
        headers: { authorization: `Bearer ${userToken}` },
      });
      console.log("server response ", data);
      setUrls(data.urls);
    } catch (error) {
      console.log("can't fetch user URLs, ", error);
    }
  };

  const login = (user: User, token: string) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    fetchUserUrls(token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUrls([])
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      login(JSON.parse(storedUser), storedToken);
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{ user, token, isLoggedIn, login, logout, urls, setUrls }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must only be used within an AuthProvider");
  }
  return context;
};
