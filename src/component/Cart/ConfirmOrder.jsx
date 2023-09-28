import React, { Fragment } from "react";
import "./ConfirmOrder.css";
import {  useSelector } from "react-redux";
import Metadata from "../layout/Metadata";
import { Typography } from "@mui/material";
import CheckoutSteps from "./CheckoutSteps";
import { useNavigate, Link } from "react-router-dom";

export default function ConfirmOrder() {
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const tax = subtotal * 0.18;
  const totalPrice = subtotal + shippingCharges + tax;
  const address = `${shippingInfo.address} ,${shippingInfo.city},${shippingInfo.state} ,${shippingInfo.country},${shippingInfo.pincode}`;
  const proceedToPayment = () => {
    const data = {
      subtotal,
      tax,
      shippingCharges,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };

  return (
    <Fragment>
      <Metadata title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirm__order__page">
        <div className="confirm__shipping__area">
          <Typography>Shipping Info </Typography>
          <div className="confirm__shipping__area__box">
            <div>
              <p>Name:</p>
              <span>{user.name}</span>
            </div>
            <div>
              <p>Phone:</p>
              <span>{shippingInfo.phoneNo}</span>
            </div>
            <div>
              <p>Address:</p>
              <span>{address}</span>
            </div>
          </div>
          <div className="confirm__cart__items">
            <Typography>Your Cart Items:</Typography>
            <div className="confirm__cart__items__container">
              {cartItems &&
                cartItems.map(
                  ({ image: { url }, name, price, product, quantity }) => (
                    <div key={product}>
                      <img src={url} alt="productImage" />
                      <Link to={`/product/${product}`}>{name}</Link>
                      <span>
                        {price} X {quantity}= <b>{price * quantity}</b>
                      </span>
                    </div>
                  )
                )}
            </div>
          </div>
        </div>
        <div className="order__summary">
          <Typography>Order Summary:</Typography>
          <div>
            <div>
              <p>Subtotal:</p>
              <span> ₹ {subtotal}</span>
            </div>

            <div>
              <p>Shipping Charges:</p>
              <span> ₹{shippingCharges}</span>
            </div>
            <div>
              <p>GST:18%</p>
              <span> ₹{tax}</span>
            </div>
          </div>
          <div className="order__summary__total">
            <p>
              <b>Total:</b>
            </p>
            <span>₹ {totalPrice}</span>
          </div>
          <button onClick={proceedToPayment}>Proceed To Payment</button>
        </div>
      </div>
    </Fragment>
  );
}
