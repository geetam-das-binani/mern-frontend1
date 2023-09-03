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

export default function App() {
  const { isAuthenticatedUser, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto Mono", "monospace"],
      },
    });

    loadUser(dispatch);
  }, []);

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
    </BrowserRouter>
  );
}
