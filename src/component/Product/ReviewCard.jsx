import React from "react";
import profilePng from '../../images/Profile.png'
import { Rating } from "@mui/material";
export default function ReviewCard({ name, rating, comment}) {
  const options = {
    
    value: rating,
    readOnly: true,
    size: "small",
    precision:.5
  };
  return (
    <div className="review__card">
      <img src={profilePng} alt="User" />
      <p>{name}</p>
      <Rating {...options} />
      <span className="review__card__comment">{comment}</span>
    </div>
  );
}
