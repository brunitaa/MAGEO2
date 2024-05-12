import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  // clear errors after 5 seconds
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const signin = async (user) => {
    const cookies = Cookies.get();
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      console.log(res.data);

      // Verificar el token del usuario para obtener el rol
      const res2 = await verifyTokenRequest(cookies.token);
      console.log(res2.data.data.user.role);

      if (res2.data.data.user.role === "Admin") {
        setIsAdmin(true);
      }

      console.log(isAdmin);

      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      //setErrors(error.response.data.message);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        console.log(res.data);
        if (!res.data) return setIsAuthenticated(false);
        //if (res.data.data.user.role == "Admin") return setIsAdmin(true);
        setIsAuthenticated(true);
        const res2 = await verifyTokenRequest(cookies.token);
        console.log(res2.data.data.user.role);

        if (res2.data.data.user.role === "Admin") {
          setIsAdmin(true);
        }

        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setIsAdmin(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signin,
        logout,
        isAuthenticated,
        isAdmin,
        errors,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
