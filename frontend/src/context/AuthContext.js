import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("auth-token") || null);

  const login = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        username,
        password,
      });
      const { token, user } = response.data;
      console.log("user", user)
      localStorage.setItem("auth-token", token);
      localStorage.setItem("user", user);
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
