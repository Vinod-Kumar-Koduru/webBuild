import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { getMe } from "../services/authService.js";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get("token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const userData = await getMe();
        setUser(userData);
      } catch (error) {
        Cookies.remove("token");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = (token, userData) => {
    Cookies.set("token", token, { expires: 1 });
    setUser(userData);
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
