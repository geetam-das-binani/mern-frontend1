import React, { Fragment } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import {useDispatch,useSelector} from 'react-redux'
export default function Cart() {
  const {cartItems}=useSelector((state)=>state.cart)
  console.log(cartItems);
  const items = {
    product: "product_id",
    price: 100,
    name: "sample product",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHLSTwc_fgS2GQ_k_2qHSSO3e6atKwFKabDg&usqp=CAU",
    ],
    quantity: 2,
  };
  return (
    <Fragment>
      <div className="cart__page">
        <div className="cart__header">
          <p>Product</p>
          <p>Quantity</p>
          <p>SubTotal</p>
        </div>

        <div className="cart__container">
          <CartItemCard {...items} />
          <div className="cart__input">
            <button>-</button>
            <input type="number" readOnly value={items.quantity} />
            <button>+</button>
          </div>
          <p className="cart__subtotal">{`₹${items.price * items.quantity}`}</p>
        </div>
        
     
      
        <div className="cart__gross__total">
          <div></div>
          <div className="cart__gross__profit__box">
            <p>Gross Total</p>
            <p>{`₹${600}`}</p>
          </div>
          <div></div>
          <div className="checkout__btn">
            <button>Check out</button>
          </div>

        </div>
      </div>

     
    </Fragment>
  );
}
