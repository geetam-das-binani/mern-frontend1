import React, { Fragment, useState, useEffect } from "react";
import "./Updateprofile.css";
import { useNavigate } from "react-router-dom";
import FaceIcon from "@mui/icons-material/Face";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadUser, updateProfile } from "../../actions/userActions";
import {
  clearProfileError,
  updateProfileReset,
  setLoading,
} from "../../Slices/profileSlice";
import Metadata from "../layout/Metadata";
import Loader from "../layout/loader/Loader";
import ButtonLoader from "../layout/loader/ButtonLoader";

export default function UpdateProfile() {
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(false);

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const myform = new FormData();
    myform.set("name", name);
    myform.set("email", email);

    myform.set("avatar", avatar);
    setDisabled(true);
    updateProfile(dispatch, myform);
  };

  const updateProfileDateChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user?.avatar?.url);
    }

    if (error) {
      toast.error(error, { theme: "dark" });
      setDisabled(false);
      dispatch(clearProfileError());
    }
    if (isUpdated) {
      dispatch(setLoading(false));
      toast.success("Profile Updated Successfully", { theme: "dark" });
      loadUser(dispatch);
      navigate("/account");
      dispatch(updateProfileReset());
    }
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 500);
  }, [dispatch, error, isUpdated, navigate, user]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title="Update Profile" />
          <div className="update__profile__container">
            <div className="update__profile__box">
              <h2>Update Profile</h2>

              <form
                className="update__profile__form"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="update__profile__name">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={({ target }) => setName(target.value)}
                  />
                </div>
                <div className="update__profile__Email">
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

                <div id="update__profile__image">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDateChange}
                  />
                </div>

                <button
                 
                  type="submit"
                  disabled={disabled}
                  className="update__profile__btn"
                >
                  {disabled ? <ButtonLoader /> : "Update"}
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
