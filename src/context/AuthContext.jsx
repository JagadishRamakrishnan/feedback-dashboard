import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored =
        localStorage.getItem("efms_user") ||
        sessionStorage.getItem("efms_user");

      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      // Keep the current user in state and storage
      const localUser = localStorage.getItem("efms_user");
      const sessionUser = sessionStorage.getItem("efms_user");

      if (localUser) {
        localStorage.setItem("efms_user", JSON.stringify(user));
      } else if (sessionUser) {
        sessionStorage.setItem("efms_user", JSON.stringify(user));
      }
    }
  }, [user]);

  const login = (userData, remember = true) => {
    if (remember) {
      localStorage.setItem("efms_user", JSON.stringify(userData));
      sessionStorage.removeItem("efms_user");
    } else {
      sessionStorage.setItem("efms_user", JSON.stringify(userData));
      localStorage.removeItem("efms_user");
    }

    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("efms_user");
    sessionStorage.removeItem("efms_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return ctx;
}
