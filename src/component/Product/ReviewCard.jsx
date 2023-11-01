import React from "react";
import profilePng from "../../images/Profile.png";
import { Rating } from "@mui/material";
import { useSelector } from "react-redux";
export default function ReviewCard({ name, rating, comment, user: userId }) {
  const { user } = useSelector((state) => state.user);
  const options = {
    value: rating,
    readOnly: true,
    size: "small",
    precision: 0.5,
  };
  return (
    <div className="review__card">
      {user?._id === userId ? (
        <img src={user?.avatar?.url || profilePng} alt="User" />
      ) : (
        <img src={profilePng} alt="User" />
      )}

      <p>{name}</p>
      <Rating {...options} />
      <span className="review__card__comment">{comment}</span>
    </div>
  );
}
