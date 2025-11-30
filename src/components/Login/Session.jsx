import React, { createContext, useContext, useState } from "react";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  // 👇 CAMBIO CLAVE: Leemos la memoria AL INICIO, no esperamos al useEffect
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("usuario");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem("usuario", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
    window.location.href = "/login";
  };

  // Calculamos permisos
  const isLogged = !!user;
  const isAdmin = user?.rol === "admin";

  return (
    <SessionContext.Provider value={{ user, login, logout, isLogged, isAdmin }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  return useContext(SessionContext);
};