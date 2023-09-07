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
import LoginSignup from "./component/User/LoginSignup";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./actions/userActions";
import UserOptions from "./component/layout/Header/UserOptions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearError } from "./Slices/userSlice";
export default function App() {
  const { isAuthenticatedUser, user, notifyMessage } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto Mono", "monospace"],
      },
    });
    if (notifyMessage) {
      toast.success("Logout Succcessfully", { theme: "dark", autoClose: 2000 });
      setTimeout(() => {
        dispatch(clearError());
      }, 2500);
    }

    loadUser(dispatch);
  }, [notifyMessage]);

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
        <Route path="/login" element={<LoginSignup />} />
      </Routes>

      <Footer />
      <ToastContainer />
    </BrowserRouter>
  );
}
