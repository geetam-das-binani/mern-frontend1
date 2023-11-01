import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function ProtectedRoute({ Component, apikey, isAdmin }) {
  const { isAuthenticatedUser, user, authentication } = useSelector(
    (state) => state.user
  );

  if (isAuthenticatedUser === false && !authentication) {
    return <Navigate to="/login" />;
  }


  if (isAdmin === true && user.role !== "admin" && isAuthenticatedUser) {
    return <Navigate to="/login" />;
  }


  return <Component apikey={apikey ?? ""} />;
}
