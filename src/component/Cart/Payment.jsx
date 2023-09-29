import React, { Fragment, useRef } from "react";
import "./Payment.css";
import { useSelector, useDispatch } from "react-redux";
import Metadata from "../layout/Metadata";
import { Typography } from "@mui/material";
import CheckoutSteps from "./CheckoutSteps";
import { useNavigate } from "react-router-dom";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import EventIcon from "@mui/icons-material/Event";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Payment() {
  const navigate = useNavigate();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const payBtn = useRef(null);
  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      };

      const { data } = await axios.post(
        "http://localhost:8000/payment/process",
        paymentData,

        config
      );
      console.log(data);
      const client_secret = data.client_secret;
      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pincode,
              country: shippingInfo.country,
              line1: shippingInfo.address,
            },
          },
        },
      });
      if (result.error) {
        payBtn.current.disabled = false;
        toast.error(result.error.message, { theme: "dark" });
      } else {
        if (result.paymentIntent.status === "succeeded") {
          navigate("/success");
        } else {
          toast.error(`There's is some issue while processing payment`, {
            theme: "dark",
          });
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      toast.error(error.response.data.message, { theme: "dark" });
    }
  };
  return (
    <Fragment>
      <Metadata title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="payment__container">
        <form className="payment__form" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />

            <CardNumberElement className="payment__input" />
          </div>
          <div>
            <EventIcon />

            <CardExpiryElement className="payment__input" />
          </div>
          <div>
            <VpnKeyIcon />

            <CardCvcElement className="payment__input" />
          </div>
          <input
            type="submit"
            value={`Pay -  ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="payment__form__btn"
          />
        </form>
      </div>
      <ToastContainer />
    </Fragment>
  );
}
