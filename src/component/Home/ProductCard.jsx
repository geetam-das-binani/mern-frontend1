import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import "./Home.css";

export default function ProductCard({
  name,
  images,
  _id,
  price,
  ratings,
  numOfReviews,
}) {
  const options = {
    value: ratings,
    precision: 0.5,
    size: "small",
    readOnly: true,
  };

  return (
    <Link className="product__card" to={`/product/${_id}`}>
      <img src={images[0].url} alt={name} />
      <p>{name}</p>
      <div>
        <Rating {...options} />
        <span className="product__card__span"> {numOfReviews} Reviews </span>
      </div>
      <span>₹{price}</span>
    </Link>
  );
}
