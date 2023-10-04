import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";


export default function CartItemCard({ product, price, name, image,deleteCartItems }) {

  return (
    <div className="cart__item__card">
      <img src={image} alt="product_image" />
      <div>
        <Link to={`/product/${product}`}>{name}</Link>
        <span>{`Price ₹${price}`}</span>
        <p onClick={() => deleteCartItems(product)}>Remove</p>
      </div>
     
    </div>
  );
}
