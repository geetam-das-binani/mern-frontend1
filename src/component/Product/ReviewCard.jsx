import React from "react";
import ReactStars from "react-rating-stars-component";
import profilePng from '../../images/Profile.png'
export default function ReviewCard({ name, rating, comment, user }) {
  const options = {
    edit: false,
    color: "rgba(20,20,20,.1)",
    activeColor: "tomato",
    value: rating,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };
  return (
    <div className="review__card">
      <img src={profilePng} alt="User" />
      <p>{name}</p>
      <ReactStars {...options} />
      <span>{comment}</span>
    </div>
  );
}
