import React, { Fragment, useEffect, useState, memo } from "react";
import './Dashboard.css'
import './newProduct.css'
import { getUserDetailsAdmin, updateUser } from "../../actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Metadata from "../layout/Metadata";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Sidebar from "../Admin/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ButtonLoader from "../layout/loader/ButtonLoader";
import "react-toastify/dist/ReactToastify.css";
import {
  resetAdminUpdateUserSuccess,
  clearAdminUpdateUserFail,
} from "../../Slices/deleteUpdateUserAdminSlice";
import Loader from "../layout/loader/Loader";

function UpdateUser() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const { user, error, loading } = useSelector(
    (state) => state.adminUserDetail
  );

  const { isUpdated, error: updateError } = useSelector(
    (state) => state.deleteUpdateUserAdmin
  );

  useEffect(() => {
    if (user && user._id !== id) {
      getUserDetailsAdmin(dispatch, id);
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    if (updateError) {
      toast.error(error, { theme: "dark" });
     dispatch(clearAdminUpdateUserFail());
      setDisabled(false);
    }
    if (isUpdated) {
      toast.success("User Updated Successfully", { theme: "dark" });
      dispatch(resetAdminUpdateUserSuccess());
      navigate("/admin/users");
    }
  }, [dispatch, error, isUpdated, navigate, updateError, user, id]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();
    const myform = new FormData();
    myform.set("name", name);
    myform.set("email", email);
    myform.set("role", role);
    setDisabled(true);
    updateUser(dispatch, id, myform);
  };

  return (
    <Fragment>
      <Metadata title="Update User" />
      <div className="dashboard">
        <Sidebar />
        {loading ? (
          <Loader />
        ) : (
          <div className="new__product__container">
            <form
              className="create__product__form"
              encType="multipart/form-data"
              onSubmit={updateUserSubmitHandler}
            >
              <h1>Update User</h1>
              <div>
                <PersonIcon />
                <input
                  type="text"
                  placeholder="User Name"
                  required
                  value={name}
                  onChange={({ target }) => setName(target.value)}
                />
              </div>
              <div>
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="User Email"
                  required
                  value={email}
                  onChange={({ target }) => setEmail(target.value)}
                />
              </div>
              <div>
                <VerifiedUserIcon />
                <select
                  value={role}
                  onChange={({ target }) => setRole(target.value)}
                >
                  <option value="">Choose Role</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <Button
                id="create__product__btn"
                type="submit"
                disabled={disabled || role === "" ? true : false}
              >
                {disabled ? <ButtonLoader /> : "Update User"}
              </Button>
            </form>
          </div>
        )}
      </div>
      <ToastContainer />
    </Fragment>
  );
}

export default memo(UpdateUser);
