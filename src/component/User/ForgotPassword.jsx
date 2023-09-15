import React, { Fragment, useState, useEffect } from "react";
import "./ForgotPassword.css";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { forgotPassword } from "../../actions/userActions";
import Metadata from "../layout/Metadata";
import Loader from "../layout/loader/Loader";
import {
  clearForgotPasswordError,
  forgotPasswordResetMessage,
} from "../../Slices/forgotPasswordSlice";

export default function ForgotPassword() {
  const { error, message } = useSelector((state) => state.forgotPassword);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    const myform = new FormData();

    myform.set("email", email);
    setLoading(true);
    forgotPassword(dispatch, myform);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);

    if (error) {
      setLoading(false);
      toast.error(error, { theme: "dark" });

      dispatch(clearForgotPasswordError());
    }
    if (message) {
      setLoading(false);
      toast.success(message, { theme: "dark" });

      dispatch(forgotPasswordResetMessage());
    }
  }, [dispatch, error, message, loading]);
  console.log(error);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title="Forgot Password" />
          <div className="forgot__password__container">
            <div className="forgot__password__box">
              <h2>Forgot Password</h2>

              <form
                className="forgot__password__form"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgot__password__Email">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Send"
                  className="forgot__password__btn"
                />
              </form>
            </div>
          </div>
          <ToastContainer />
        </Fragment>
      )}
    </Fragment>
  );
}
