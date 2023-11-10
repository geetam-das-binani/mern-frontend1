import React from "react";
import ErrorIcon from '@mui/icons-material/Error';
import "./notfound.css";
import { Typography } from "@mui/material";

import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="Page__not__found">
      <ErrorIcon />

      <Typography>Page Not Found </Typography>
      <Link to="/">Home</Link>
    </div>
  );
};

export default NotFound;

