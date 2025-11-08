// components/Common/PrivateRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import { useAuth } from "../context/AuthContext";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
