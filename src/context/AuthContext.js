import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null means logged out

  const login = (email, password) => {
    // Mock authentication
    if (email && password) {
      setUser({
        email,
        name: email.split("@")[0] || "Store Manager",
        storeName: "SmartStore Branch #1",
        role: "Store Admin",
      });
      return { success: true };
    }
    return { success: false, message: "Vui lòng nhập Email và Mật khẩu" };
  };

  const register = (name, email, password, storeName) => {
    if (name && email && password) {
      setUser({
        email,
        name,
        storeName: storeName || "SmartStore Main Branch",
        role: "Store Owner",
      });
      return { success: true };
    }
    return { success: false, message: "Vui lòng điền đầy đủ thông tin" };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
