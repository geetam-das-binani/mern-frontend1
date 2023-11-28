import React, { Fragment, useState, useEffect } from "react";
import "./Resetpassword.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetPassword } from "../../actions/userActions";
import {
  resetPasswordSuccessMessage,
  clearForgotPasswordError,
  setLoading,
} from "../../Slices/forgotPasswordSlice";
import Metadata from "../layout/Metadata";
import Loader from "../layout/loader/Loader";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import ButtonLoader from "../layout/loader/ButtonLoader";
export default function ResetPassword() {
  const { token } = useParams();
  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [password, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const resetPasswordUpdate = (e) => {
    e.preventDefault();

    const myform = new FormData();
    myform.set("password", password);

    myform.set("confirmPassword", confirmPassword);
    setDisabled(true);
    resetPassword(dispatch, myform, token);
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { theme: "dark" });
      setDisabled(false);
      dispatch(clearForgotPasswordError());
    }
    if (success) {
      dispatch(setLoading(false));
      toast.success("Password Updated Successfully", { theme: "dark" });

      navigate("/login");
      dispatch(resetPasswordSuccessMessage());
    }
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 500);
  }, [dispatch, error, navigate, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title="Reset Password" />
          <div className="reset__password__container">
            <div className="reset__password__box">
              <h2>Update Password</h2>

              <form
                className="reset__password__form"
                onSubmit={resetPasswordUpdate}
              >
                <div>
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder=" New Password"
                    required
                    name="password"
                    value={password}
                    onChange={({ target }) => setNewPassword(target.value)}
                  />
                </div>
                <div>
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    name="password"
                    value={confirmPassword}
                    onChange={({ target }) => setConfirmPassword(target.value)}
                  />
                </div>
                <button
                  type="submit"
                  disabled={disabled}
                  className="reset__password__btn"
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
