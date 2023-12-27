import "./App.css";
import axios from "axios";
import React, { Suspense, useEffect, useState, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
const Home = lazy(() => import("./component/Home/Home"));
const ProductDetails = lazy(() => import("./component/Product/ProductDetails"));
const Products = lazy(() => import("./component/Product/Products"));
const Search = lazy(() => import("./component/Product/Search"));
const Profile = lazy(() => import("./component/User/Profile"));
const LoginSignup = lazy(() => import("./component/User/LoginSignup"));
import { loadUser } from "./actions/userActions";
import UserOptions from "./component/layout/Header/UserOptions";
import { clearError } from "./Slices/userSlice";
import ProtectedRoute from "./component/Route/ProtectedRoute";
const UpdateProfile = lazy(() => import("./component/User/UpdateProfile"));
const UpdatePassword = lazy(() => import("./component/User/UpdatePassword"));
const ForgotPassword = lazy(() => import("./component/User/ForgotPassword"));
const OtpLogin = lazy(() => import("./component/User/OtpLogin"));
const ResetPassword = lazy(() => import("./component/User/ResetPassword"));
const Cart = lazy(() => import("./component/Cart/Cart"));
const Shipping = lazy(() => import("./component/Cart/Shipping"));
const ConfirmOrder = lazy(() => import("./component/Cart/ConfirmOrder"));
const Payment = lazy(() => import("./component/Cart/Payment"));
const OrderSuccess = lazy(() => import("./component/Cart/OrderSuccess"));
const MyOrders = lazy(() => import("./component/Order/MyOrders"));
const OrderDetails = lazy(() => import("./component/Order/OrderDetails"));
const DashBoard = lazy(() => import("./component/Admin/DashBoard"));
const ProductList = lazy(() => import("./component/Admin/ProductList"));
const NewProduct = lazy(() => import("./component/Admin/NewProduct"));
const UpdateProduct = lazy(() => import("./component/Admin/UpdateProduct"));
const OrderList = lazy(() => import("./component/Admin/OrderList"));
const ProcessOrder = lazy(() => import("./component/Admin/ProcessOrder"));
const UsersList = lazy(() => import("./component/Admin/UsersList"));
const UpdateUser = lazy(() => import("./component/Admin/UpdateUser"));
const ProductReviews = lazy(() => import("./component/Admin/ProductReviews"));

const Contact = lazy(() => import("./component/layout/Contact/Contact"));
const About = lazy(() => import("./component/layout/About/About"));
const NotFound = lazy(() => import("./component/layout/NotFound/NotFound"));

export default function App() {
  const { isAuthenticatedUser, user, logoutNotify } = useSelector(
    (state) => state.user
  );

  const [stripeApikey, setStripeApikey] = useState("");
  const getStripeApiKey = async () => {
    const { data } = await axios.get(
      "https://becoomerce.onrender.com/api/v1/stripeApiKey",
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
      <Suspense fallback={<div style={{ fontSize: "1rem" }}>Loading...</div>}>
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
            element={
              <ProtectedRoute isAdmin={true} Component={UpdateProduct} />
            }
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
            element={
              <ProtectedRoute isAdmin={true} Component={ProductReviews} />
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
      <ToastContainer />
    </BrowserRouter>
  );
}
