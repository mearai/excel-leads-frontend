import React, { createContext, useContext } from "react";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children, user, hasRole }) => (
  <AuthContext.Provider value={{ user, hasRole }}>
    {children}
  </AuthContext.Provider>
);
