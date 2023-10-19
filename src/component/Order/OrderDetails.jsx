import React, { Fragment, useEffect, useState } from "react";
import "./OrderDetails.css";
import Metadata from "../layout/Metadata";
import { Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getOrderDetails } from "../../actions/orderActions";
import { clearOrderDetailsError } from "../../Slices/orderDetailsSlice";
import { useParams, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../layout/loader/Loader";
export default function OrderDetails() {
 
  const dispatch = useDispatch();
  const { order, error ,loading} = useSelector((state) => state.myOrderDetails);
  const { id } = useParams();

  useEffect(() => {
    if (error) {
      toast.error(error, { theme: "dark" });
      dispatch(clearOrderDetailsError());
    }
  
    getOrderDetails(dispatch, id);
  }, [dispatch, id, error]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title="Order Details" />
          <div className="order__details__page">
            <div className="order__details__container">
              <Typography component="h1">
                Order #{order && order._id}
              </Typography>
              <Typography>Shipping Info</Typography>
              <div className="order__details__container__box">
                <div>
                  <p>Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address} ,${order.shippingInfo.city},${order.shippingInfo.state} ,${order.shippingInfo.country},${order.shippingInfo.pincode}`}
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="order__details__container__box">
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "green_Color"
                        : "red_Color"
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>
                <div>
                  <p>Amount</p>
                  <span>
                    {order.paymentInfo && order.paymentInfo.totalPrice}
                  </span>
                </div>
                </div>
                <Typography>Order Status</Typography>
                <div className="order__details__container__box">
                  <div>
                    <p
                      className={
                        order.paymentInfo &&
                        order.paymentInfo.orderStatus === "Delivered"
                          ? "green_Color"
                          : "red_Color"
                      }
                    >
                      {order.paymentInfo && order.paymentInfo.orderStatus}
                    </p>
                  </div>
                </div>  
                </div>

            <div className="order__details__cart__items">
                <Typography>Order Items:</Typography>
                <div className="order__details__cart__items__container">
                    {
                 order.orderItems && 
                 order.orderItems.map(({image, name, price, product, quantity})=>(
                  <div key={product}>
                      <img src={image} alt="productImage" />
                      <Link to={`/product/${product}`}>{name}</Link>
                      <span>
                        {price} X {quantity}= <b>{price * quantity}</b>
                      </span>
                    </div>
                 ))
                    }
                </div>
            </div>

          </div>
        </Fragment>
      )}
      <ToastContainer />
    </Fragment>
  );
}
