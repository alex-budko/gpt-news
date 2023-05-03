import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });
      const { token, user } = response.data;

      localStorage.setItem("auth-token", token);
      setToken(token);
      setCurrentUser(user);
    } catch (error) {
      throw error;
    }
  };

  const value = {
    currentUser,
    setCurrentUser,
    token,
    setToken,
    login, 
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
