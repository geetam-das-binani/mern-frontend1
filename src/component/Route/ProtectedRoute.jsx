import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function ProtectedRoute({ Component, apikey }) {
  const { isAuthenticatedUser ,authentication} = useSelector((state) => state.user);
  
  if (isAuthenticatedUser === false && !authentication) {
    return <Navigate to="/login" />;
  }
  return <Component apikey={apikey ?? ""} />;
}
