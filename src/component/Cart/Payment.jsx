import React, { Fragment } from "react";
import "./Payment.css";
import { useSelector, useDispatch } from "react-redux";
import Metadata from "../layout/Metadata";
import { Typography } from "@mui/material";
import CheckoutSteps from "./CheckoutSteps";
import { useNavigate, Link } from "react-router-dom";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import EventIcon from "@mui/icons-material/Event";

export default function Payment() {
  return (
    <Fragment>
      <Metadata title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="payment__container">
        <form
          className="payment__form"
          onSubmit={(e) => submitHandler(e)}
        ></form>
      </div>
    </Fragment>
  );
}
