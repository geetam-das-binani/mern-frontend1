import "./App.css";
import React, { useEffect } from "react";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import webFont from "webfontloader";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import Profile from "./component/User/Profile.jsx";
import LoginSignup from "./component/User/LoginSignup";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./actions/userActions";
import UserOptions from "./component/layout/Header/UserOptions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearError } from "./Slices/userSlice";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from './component/User/UpdateProfile'
import UpdatePassword from './component/User/UpdatePassword'
import ForgotPassword from './component/User/ForgotPassword'
import ResetPassword from './component/User/ResetPassword.jsx'
import Cart from './component/Cart/Cart'


export default function App() {
  const { isAuthenticatedUser, user, logoutNotify } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  useEffect(() => {
  
    if (logoutNotify) {
      toast.success("Logout Succcessfull", { theme: "dark", autoClose: 2500 });
      setTimeout(() => {
        dispatch(clearError());
      }, 3000);
    }

    loadUser(dispatch);
  }, [logoutNotify]);
  return (
    <BrowserRouter>
      <Header />
      {isAuthenticatedUser && <UserOptions {...user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />

        <Route
          path="/account"
          element={<ProtectedRoute Component={Profile} />}
        />
        <Route
          path="/me/update"
          element={<ProtectedRoute Component={UpdateProfile} />}
        />
           <Route
          path="/password/update"
          element={<ProtectedRoute Component={UpdatePassword} />}
        />
           <Route
          path="/password/forget"
          element={<ForgotPassword />}
        />
        <Route path="/api/v1/password/reset/:token" element={< ResetPassword/>} />
        <Route path="/login" element={<LoginSignup />} />
        <Route  path="/cart" element={<Cart/>}/>
      
      </Routes>

      <Footer />
      <ToastContainer />
    </BrowserRouter>
  );
}


