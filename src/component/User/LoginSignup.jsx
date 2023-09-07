import React, { Fragment, useState, useRef, useEffect } from "react";
import "./LoginSignup.css";
import { useNavigate } from "react-router-dom";
import Loader from "../layout/loader/Loader";
import LockIcon from "@mui/icons-material/Lock";
import FaceIcon from "@mui/icons-material/Face";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, register } from "../../actions/userActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearError, clearNotifyMessage } from "../../Slices/userSlice";
export default function LoginSignup() {
  const { error, isAuthenticatedUser,loginRegisterNotify } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginPassword, setLoginPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const loginSubmit =async (e) => {
    e.preventDefault();
      setLoading(true)
  await login(dispatch, loginEmail, loginPassword);
 

  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const myform = new FormData();
    myform.set("name", user.name);
    myform.set("email", user.email);
    myform.set("password", user.password);
    myform.set("avatar", avatar);
    setLoading(true);
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
  useEffect(() => {
    if (error) {
      setLoading(false)
      toast.error(error, { theme: "dark" });
      dispatch(clearError());
    }
    if (isAuthenticatedUser) {
      if(loginRegisterNotify==='Loged in'){
        toast.success('Log in Successfull',{theme:'dark'})
          dispatch(clearNotifyMessage())
      }
      else if(loginRegisterNotify ==='registered'){
        toast.success('Registered Successfully',{theme:'dark'})
        dispatch(clearNotifyMessage())
      }
     
      navigate("/account");
    }
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }, [dispatch, error, isAuthenticatedUser,navigate,loading]);

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
                <Link to="/password/forget">Forgot Password ?</Link>
                <input type="submit" value="login" className="login__btn" />
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
                <div id="register__image">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDateChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Register"
                  className="signUp__btn"
                  onChange={registerDateChange}
                  // disabled={loading ? true :false}
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
