import React from 'react'
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export const PublicRoute = ({ children }) => {
   const isAuthenticated = Cookies.get("isAuthenticated");

    return isAuthenticated
        ? <Navigate to="/forms" replace />
        : children
}
