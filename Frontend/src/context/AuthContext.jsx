// context/AuthContext.js
import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext();


export const AuthContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [currentUser, setCurrentUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("token");
    return storedToken && storedToken !== "undefined" && storedToken !== "false"
      ? storedToken
      : null;
  });

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const checkAuthStatus = async () => {
      if (token) {
        try {
         
          const response = await fetch(`${backendUrl}/api/user/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          

          if (response.ok) {
            const userData = await response.json();
            setCurrentUser(userData);
            setUserId(userData.id);
          }

        } catch (error) {
          console.error("Auth check failed:", error);
          localStorage.removeItem("token");
          setToken(null);
        }
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, [token, backendUrl]);



  const login = async (email, password) => {
    try {
      const response = await fetch(`${backendUrl}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        setCurrentUser(data.user);
        setUserId(data.user.id);
        localStorage.setItem("token", data.token);
        return { success: true, user: data.user };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: "Network error occurred" };
    }
  };

  

  const register = async (name, email, password) => {
    try {
      const response = await fetch(`${backendUrl}/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setToken(data.token);
        setCurrentUser(data.user);
        setUserId(data.user.id);
        localStorage.setItem("token", data.token);
        return { success: true, user: data.user };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: "Network error occurred" };
    }
  };

  // Logout function
  const logout = () => {
    setToken(null);
    setCurrentUser(null);
    setUserId(null);
    localStorage.removeItem("token");
  };

  const value = {
    currentUser,
    token,
    backendUrl,
    userId,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


