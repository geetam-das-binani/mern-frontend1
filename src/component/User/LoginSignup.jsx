import React, { Fragment, useState, useRef, useEffect } from "react";
import "./LoginSignup.css";
import { useNavigate } from "react-router-dom";
import Loader from "../layout/loader/Loader";
import LockIcon from "@mui/icons-material/Lock";
import FaceIcon from "@mui/icons-material/Face";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, register } from "../../actions/userActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  clearError,
  clearNotifyMessage,
  setLoading,
} from "../../Slices/userSlice";
import ButtonLoader from "../layout/loader/ButtonLoader";

export default function LoginSignup() {
  const {
    error,
    isAuthenticatedUser,
    loginRegisterNotify,
    loading,
    showloginTab,
    showRegisterTab
  } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginPassword, setLoginPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [disabled, setDisabled] = useState(false);

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const loginSubmit = (e) => {
    e.preventDefault();
    setDisabled(true);
    login(dispatch, loginEmail, loginPassword);
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const myform = new FormData();
    myform.set("name", user.name);
    myform.set("email", user.email);
    myform.set("password", user.password);
    myform.set("avatar", avatar);
    myform.set("phoneNumber", user.phoneNumber);
    setDisabled(true);
    register(dispatch, myform);
  };

  const registerDateChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    }
  };

  const redirect = location.search ? location.search.split("=")[1] : "account";


  useEffect(() => {
    if (error && showloginTab) {
      toast.error(error, { theme: "dark" });
      dispatch(clearError());
      setDisabled(false);
      switcherTab.current.classList.add("shift__to__neutral");
      switcherTab.current.classList.remove("shift__to__right");
      registerTab.current.classList.remove("shift__to__neutral__form");
      loginTab.current.classList.remove("shift__to__left");
    } 
    
    else if(error &&  showRegisterTab) {
      toast.error(error, { theme: "dark" });
      dispatch(clearError());
      setDisabled(false);
      switcherTab.current.classList.add("shift__to__right");
      switcherTab.current.classList.remove("shift__to__neutral");
      registerTab.current.classList.add("shift__to__neutral__form");
      loginTab.current.classList.add("shift__to__left");
    }

    if (isAuthenticatedUser) {
      if (loginRegisterNotify === "Loged in") {
        toast.success("Log in Successfull", { theme: "dark" });
        dispatch(clearNotifyMessage());
      } else if (loginRegisterNotify === "registered") {
        toast.success("Registered Successfully", { theme: "dark" });
        dispatch(clearNotifyMessage());
      }

      navigate(`/${redirect}`);
    }

    setTimeout(() => {
      dispatch(setLoading(false));
    }, 500);
  }, [dispatch, error, isAuthenticatedUser, navigate]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shift__to__neutral");
      switcherTab.current.classList.remove("shift__to__right");
      registerTab.current.classList.remove("shift__to__neutral__form");
      loginTab.current.classList.remove("shift__to__left");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shift__to__right");
      switcherTab.current.classList.remove("shift__to__neutral");
      registerTab.current.classList.add("shift__to__neutral__form");
      loginTab.current.classList.add("shift__to__left");
    }
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="login__signUp__container">
            <div className="login__signUp__box">
              <div>
                <div className="login__signUp__toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form
                ref={loginTab}
                className="login__form"
                onSubmit={loginSubmit}
              >
                <div className="login__email">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="email"
                    required
                    value={loginEmail}
                    onChange={({ target }) => setLoginEmail(target.value)}
                  />
                </div>

                <div className="login__password">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="password"
                    required
                    value={loginPassword}
                    onChange={({ target }) => setLoginPassword(target.value)}
                  />
                </div>
                <div className="login__actions">
                  <Link to="/password/forget">Forgot Password ?</Link>
                  <Link to="/otp/login"> Login Using Otp ?</Link>
                </div>

                <button
                  disabled={disabled}
                  type="submit"
                  className="login__btn"
                >
                  {disabled ? <ButtonLoader /> : "Login"}
                </button>
              
              </form>
              <form
                className="signUp__form"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUp__name">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={user.name}
                    onChange={registerDateChange}
                  />
                </div>
                <div className="signUp__Email">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={user.email}
                    onChange={registerDateChange}
                  />
                </div>
                <div className="login__password">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={user.password}
                    onChange={registerDateChange}
                  />
                </div>

                <div>
                  <PhoneIcon />
                  <input
                    type="number"
                    placeholder="Number"
                    required
                    name="phoneNumber"
                    value={user.phoneNumber}
                    onChange={registerDateChange}
                  />
                </div>
                <div id="register__image">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    required
                    onChange={registerDateChange}
                  />
                </div>
                <button
                  disabled={disabled}
                  type="submit"
                  className="signUp__btn"
                >
                  {disabled ? <ButtonLoader /> : "Register"}
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
