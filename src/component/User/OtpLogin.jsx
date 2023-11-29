import React, { Fragment, useState, useEffect } from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Metadata from "../layout/Metadata";
import {
  clearOtpFail,
  resetOtpSuccess,
  resetOtpVerifySuccess,
  clearOtpVerifYError,
} from "../../Slices/loginOtpSlice";
import { loadUser, loginOtp, verifyOtp } from "../../actions/userActions";
import DialpadIcon from "@mui/icons-material/Dialpad";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ButtonLoader from "../layout/loader/ButtonLoader";
export default function otpLogin() {
  const navigate = useNavigate();
  const { error, isSended, isVerified, verifyError } = useSelector(
    (state) => state.otp
  );
  const { isAuthenticatedUser } = useSelector((state) => state.user);
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [switchView, setSwitchView] = useState(false);
  const handleSend = (e) => {
    e.preventDefault();

    loginOtp(dispatch, phoneNumber);
    setDisabled(true);
  };
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    verifyOtp(dispatch, otp);
    setDisabled(true);
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { theme: "dark" });
      dispatch(clearOtpFail());
      setDisabled(false);
    }
    if (isSended) {
      toast.success("Otp Send Successfully", { theme: "dark" });
      dispatch(resetOtpSuccess());
      setSwitchView(true);
      setDisabled(false);
    }
    if (isVerified) {
      dispatch(resetOtpVerifySuccess());
      loadUser(dispatch);
      setDisabled(false);
    }
    if (verifyError) {
      toast.error(verifyError, { theme: "dark" });
      dispatch(clearOtpVerifYError());
      setSwitchView(true);
      setDisabled(false);
    }
    if (isAuthenticatedUser) {
      toast.success("Login Successfully", { theme: "dark" });
      navigate("/account");
    }
  }, [dispatch, isSended, error, isVerified, verifyError, isAuthenticatedUser]);

  return (
    <Fragment>
      {!switchView ? (
        <Fragment>
          <Metadata title="Send Otp" />
          <div className="forgot__password__container">
            <div className="forgot__password__box">
              <h2>Send Otp</h2>

              <form className="forgot__password__form" onSubmit={handleSend}>
                <div className="forgot__password__Email">
                  <PhoneIcon />
                  <input
                    type="number"
                    placeholder="Enter Your Number"
                    required
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={({ target }) => setPhoneNumber(target.value)}
                  />
                </div>

                <Button
                  id="create__product__btn"
                  type="submit"
                  disabled={disabled}
                >
                  {disabled ? <ButtonLoader /> : "Send"}
                </Button>
              </form>
              <Link to="/login"> go back </Link>
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <Metadata title="Enter otp" />
          <div className="forgot__password__container">
            <div className="forgot__password__box">
              <h2>Enter otp</h2>

              <form
                className="forgot__password__form"
                onSubmit={handleVerifyOtp}
              >
                <div className="forgot__password__Email">
                  <DialpadIcon />
                  <input
                    type="number"
                    placeholder="Enter Your Otp"
                    required
                    name="otp"
                    value={otp}
                    onChange={({ target }) => setOtp(target.value)}
                  />
                </div>

                <Button
                  id="create__product__btn"
                  type="submit"
                  disabled={disabled}
                >
                  {disabled ? <ButtonLoader /> : "Send"}
                </Button>
              </form>
            </div>
          </div>
        </Fragment>
      )}

      <ToastContainer />
    </Fragment>
  );
}
