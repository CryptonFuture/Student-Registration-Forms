import React from 'react'
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export const ProtectedRoute = ({ children }) => {
     const isAuthenticated = Cookies.get("isAuthenticated");

    return isAuthenticated
        ? children
        : <Navigate to="/" replace />;
  
}
