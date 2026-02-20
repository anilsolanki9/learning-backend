import { createContext, useState, useEffect } from "react";
import { login, register, getMe } from "./services/auth.api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setlLoading] = useState(false);

  const handleLogin = async (username, password) => {
    setlLoading(true);
    try {
      const response = await login(username, password);
      setUser(response.user);
    } catch (err) {
      console.log(err);
    } finally {
      setlLoading(false);
    }
  };

  const handleRegister = async (username, email, password) => {
    setlLoading(true);
    try {
      const response = await register(username, email, password);

      setUser(response.user);
    } catch (err) {
      console.log(err);
    } finally {
      setlLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, handleLogin, handleRegister }}
    >
      {children}
    </AuthContext.Provider>
  );
}
