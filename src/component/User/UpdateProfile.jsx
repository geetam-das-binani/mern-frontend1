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
} from "../../Slices/profileSlice";
import Metadata from "../layout/Metadata";
import Loader from "../layout/loader/Loader";
export default function UpdateProfile() {
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const myform = new FormData();
    myform.set("name", name);
    myform.set("email", email);

    myform.set("avatar", avatar);

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
      setAvatarPreview(user.avatar.url);
      setAvatar(user.avatar.url);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
    if (error) {
      toast.error(error, { theme: "dark" });
     
      dispatch(clearProfileError());
    }
    if (isUpdated) {
      toast.success("Profile Updated Successfully", { theme: "dark" });
      loadUser(dispatch)
      navigate("/account");
      dispatch(updateProfileReset());
    }
  }, [dispatch, error, isUpdated, navigate, user, loading]);

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
                className="update_profile__form"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="update_profile__name">
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
                <div className="update_profile__Email">
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
                <input
                  type="submit"
                  value="updateProfile"
                  className="update_profile__btn"
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
