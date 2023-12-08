import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import Profile from "./component/User/Profile";
import LoginSignup from "./component/User/LoginSignup";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./actions/userActions";
import UserOptions from "./component/layout/Header/UserOptions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearError } from "./Slices/userSlice";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import OtpLogin from "./component/User/OtpLogin";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Payment from "./component/Cart/Payment";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import DashBoard from "./component/Admin/DashBoard";
import ProductList from "./component/Admin/ProductList";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
import Contact from "./component/layout/Contact/Contact";
import About from "./component/layout/About/About";
import NotFound from "./component/layout/NotFound/NotFound";

export default function App() {
  const { isAuthenticatedUser, user, logoutNotify } = useSelector(
    (state) => state.user
  );

  const [stripeApikey, setStripeApikey] = useState("");
  const getStripeApiKey = async () => {
    const { data } = await axios.get(
      "http://localhost:8000/api/v1/stripeApiKey",
      {
        withCredentials: true,
      }
    );

    setStripeApikey(data.stripeApikey);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (logoutNotify) {
      toast.success("Logout Succcessfully", { theme: "dark", autoClose: 2500 });
      setTimeout(() => {
        dispatch(clearError());
      }, 3000);
    }

    loadUser(dispatch);
    getStripeApiKey();
  }, [logoutNotify, dispatch]);

  return (
    <BrowserRouter>
      <Header />
      {isAuthenticatedUser && <UserOptions {...user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:Id" element={<ProductDetails />} />
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
        <Route path="/password/forget" element={<ForgotPassword />} />
        <Route path="/otp/login" element={<OtpLogin />} />
        <Route
          path="/api/v1/password/reset/:token"
          element={<ResetPassword />}
        />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/cart" element={<Cart />} />

        <Route
          path="/shipping"
          element={<ProtectedRoute Component={Shipping} />}
        />

        {stripeApikey && (
          <Route
            path="/process/payment"
            element={
              <Elements stripe={loadStripe(stripeApikey)}>
                <ProtectedRoute Component={Payment} apikey={stripeApikey} />
              </Elements>
            }
          />
        )}
        <Route
          path="/success"
          element={<ProtectedRoute Component={OrderSuccess} />}
        />
        <Route
          path="/orders"
          element={<ProtectedRoute Component={MyOrders} />}
        />

        <Route
          path="/order/:id"
          element={<ProtectedRoute Component={OrderDetails} />}
        />
        <Route
          path="/order/confirm"
          element={<ProtectedRoute Component={ConfirmOrder} />}
        />

        <Route
          path="/admin/dashboard"
          element={<ProtectedRoute isAdmin={true} Component={DashBoard} />}
        />
        <Route
          path="/admin/products"
          element={<ProtectedRoute isAdmin={true} Component={ProductList} />}
        />
        <Route
          path="/admin/product"
          element={<ProtectedRoute isAdmin={true} Component={NewProduct} />}
        />
        <Route
          path="/admin/product/:id"
          element={<ProtectedRoute isAdmin={true} Component={UpdateProduct} />}
        />
        <Route
          path="/admin/orders"
          element={<ProtectedRoute isAdmin={true} Component={OrderList} />}
        />
        <Route
          path="/admin/order/:id"
          element={<ProtectedRoute isAdmin={true} Component={ProcessOrder} />}
        />
        <Route
          path="/admin/users"
          element={<ProtectedRoute isAdmin={true} Component={UsersList} />}
        />
        <Route
          path="/admin/user/:id"
          element={<ProtectedRoute isAdmin={true} Component={UpdateUser} />}
        />
        <Route
          path="/admin/reviews/:productId?"
          element={<ProtectedRoute isAdmin={true} Component={ProductReviews} />}
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
      <ToastContainer />
    </BrowserRouter>
  );
}
