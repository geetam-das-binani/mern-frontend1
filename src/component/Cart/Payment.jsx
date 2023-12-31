import React, { Fragment, useEffect, useRef, useState } from "react";
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
import ButtonLoader from "../layout/loader/ButtonLoader";
import { clearOrderError } from "../../Slices/orderSlice";
import { createOrder } from "../../actions/orderActions";

export default function Payment({ apikey }) {
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const order = {
    shippingInfo,
    orderItems: cartItems,
    paymentInfo: "",
    itemsPrice: orderInfo?.subtotal,
    taxPrice: orderInfo?.tax,
    shippingPrice: orderInfo?.shippingCharges,
    totalPrice: orderInfo?.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    setDisabled(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${apikey}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const { data } = await axios.post(
        "https://becoomerce.onrender.com/api/v1/payment/process",
        paymentData,

        config
      );

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
        setDisabled(false);
        toast.error(result.error.message, { theme: "dark" });
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          await createOrder(dispatch, order);

          navigate("/success");
        } else {
          toast.error(`There's is some issue while processing payment`, {
            theme: "dark",
          });
          setDisabled(false);
        }
      }
    } catch (error) {
      setDisabled(false);
      toast.error(error.response.data.message, { theme: "dark" });
    }
  };
  useEffect(() => {
    if (error) {
      toast.error(error, { theme: "dark" });
      dispatch(clearOrderError());
    }
  }, [dispatch, error]);
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

          <button
            type="submit"
            disabled={disabled}
            className="payment__form__btn"
          >
            {disabled ? (
              <ButtonLoader />
            ) : (
              `Pay -  ₹${orderInfo && orderInfo.totalPrice}`
            )}
          </button>
        </form>
      </div>
      <ToastContainer />
    </Fragment>
  );
}
