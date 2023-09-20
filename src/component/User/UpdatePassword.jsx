import React, { Fragment, useState, useEffect } from "react";
import "./Updatepassword.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updatePassword } from "../../actions/userActions";
import {
  clearProfileError,
  updatePasswordReset,
  setLoading
} from "../../Slices/profileSlice";
import Metadata from "../layout/Metadata";
import Loader from "../layout/loader/Loader";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

export default function UpdatePassword() {
  const { error, isUpdated,loading } = useSelector((state) => state.profile);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const passwordUpdate = (e) => {
    e.preventDefault();

    const myform = new FormData();
    myform.set("oldPassword", oldPassword);
    myform.set("newPassword", newPassword);

    myform.set("confirmPassword", confirmPassword);
      dispatch(setLoading(true))
    updatePassword(dispatch,myform);
  };

  useEffect(() => {
   

    if (error) {
      toast.error(error, { theme: "dark" });

      dispatch(clearProfileError());
    }
    if (isUpdated) {
      dispatch(setLoading(false));
      toast.success("Password Updated Successfully", { theme: "dark" });

      navigate("/account");
      dispatch(updatePasswordReset());
    }
    setTimeout(() => {
     dispatch(setLoading(false));
    }, 300);
  }, [dispatch, error, isUpdated, navigate]);



    return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title="Change Password" />
          <div className="update__password__container">
            <div className="update__password__box">
              <h2>Update Password</h2>

              <form
                className="update__password__form"
                onSubmit={passwordUpdate}
              >
                <div className="login__password">
                  <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    name="password"
                    value={oldPassword}
                    onChange={({ target }) => setOldPassword(target.value)}
                  />
                </div>
                <div className="login__password">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder=" New Password"
                    required
                    name="password"
                    value={newPassword}
                    onChange={({ target }) => setNewPassword(target.value)}
                  />
                </div>
                <div className="login__password">
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

                <input
                  type="submit"
                  value="Change"
                  className="update__password__btn"
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
