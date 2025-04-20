import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: string | null;
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const SESSION_TIMEOUT = Number(import.meta.env.VITE_SESSION_TIMEOUT);

// ⬇️ Helper function to fetch and parse credentials.txt
const fetchCredentials = async (): Promise<Record<string, string>> => {
  const res = await fetch('/credentials.txt');
  const text = await res.text();

  const credentials: Record<string, string> = {};
  const lines = text.trim().split('\n');

  lines.forEach(line => {
    const [user, pass] = line.split(':');
    if (user && pass) {
      credentials[user.trim()] = pass.trim();
    }
  });

  return credentials;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const expiresAt = localStorage.getItem("expiresAt");

    if (storedUser && expiresAt) {
      const isExpired = new Date().getTime() > parseInt(expiresAt);
      if (!isExpired) {
        setUser(storedUser);
      } else {
        handleLogout(); // session expired
      }
    }
  }, []);

  const handleLogin = async (username: string, password: string): Promise<boolean> => {
    const credentials = await fetchCredentials();
    if (credentials[username] === password) {
      const expiresAt = new Date().getTime() + SESSION_TIMEOUT;
      localStorage.setItem("user", username);
      localStorage.setItem("expiresAt", expiresAt.toString());
      setUser(username);
      return true;
    } else {
      return false;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("expiresAt");
    setUser(null);
  };

  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => {
        handleLogout();
      }, SESSION_TIMEOUT);
      return () => clearTimeout(timer);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
