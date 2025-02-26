import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserRole(decoded.accountType);
        setUser({ id: decoded.userId, accountType: decoded.accountType });
      } catch (error) {
        console.error("Invalid Token:", error);
        logout();
      }
    }
  }, []);

  const login = (token) => {
    try {
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      setUserRole(decoded.accountType);
      setUser({ id: decoded.userId, accountType: decoded.accountType });
    } catch (error) {
      console.error("Token Decode Error:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUserRole(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ userRole, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
