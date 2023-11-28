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
  setLoading,
} from "../../Slices/forgotPasswordSlice";
import ButtonLoader from "../layout/loader/ButtonLoader";
export default function ForgotPassword() {
  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(false);

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    const myform = new FormData();

    myform.set("email", email);
    setDisabled(true);
    forgotPassword(dispatch, myform);
  };

  useEffect(() => {
    if (error) {
      setDisabled(false);
      toast.error(error, { theme: "dark" });

      dispatch(clearForgotPasswordError());
    }
    if (message) {
      setDisabled(false);
      toast.success(message, { theme: "dark" });

      dispatch(forgotPasswordResetMessage());
    }
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 500);
  }, [dispatch, error, message]);
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
                <button
                  type="submit"
                  disabled={disabled}
                  className="forgot__password__btn"
                >
                  {disabled ? <ButtonLoader /> : "Send"}
                </button>
              </form>
            </div>
          </div>
          <ToastContainer />
        </Fragment>
      )}
    </Fragment>
  );
}
