import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import './Home.css'
export default function ProductCard({ name, images, _id, price ,ratings,numOfReviews}) {
  const options = {
    edit: false,
    color: "rgba(20,20,20,.1)",
    activeColor: "tomato",
    value: ratings,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };

  return (
    <Link className="product__card" to={`/product/${_id}`}>
      <img src={images[0].url} alt={name} />
      <p>{name}</p>
      <div>
        <ReactStars {...options} /> <span> {numOfReviews} Reviews </span>
      </div>
      <span>₹{price}</span>
    </Link>
  );
  
}
