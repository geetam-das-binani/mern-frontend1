import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function ProtectedRoute({ Component, apikey }) {
  
  const { isAuthenticatedUser } = useSelector((state) => state.user);
  return isAuthenticatedUser ? (
    <Component apikey={apikey ?? ""} />
  ) : (
    <Navigate to="/login" />
  );
}
