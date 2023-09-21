import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";

export default function CartItemCard({ product, price, name,images }) {
  return (
    <div className="cart__item__card">
      <img src={images[0]} alt="product_image" />
      <div>
        <Link to={`/product/${product}`}>{name}</Link>
        <span>
          {
            `Price ₹${price}`
          }
        </span>
        <p>Remove</p>
      </div>
    </div>
  );
}
