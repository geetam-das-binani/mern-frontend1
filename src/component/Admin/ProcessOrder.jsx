import React, { Fragment, useEffect, useState } from "react";
import Sidebar from "../Admin/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import Metadata from "../layout/Metadata";
import { Typography } from "@mui/material";
import { useNavigate, Link, useParams } from "react-router-dom";
import { getOrderDetails, updateOrderAdmin } from "../../actions/orderActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../layout/loader/Loader";
import { clearOrderDetailsError } from "../../Slices/orderDetailsSlice";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ButtonLoader from "../layout/loader/ButtonLoader";
import Button from "@mui/material/Button";
import {
  clearUpdateOrderFail,
  resetAdminUpdateOrderSuccess,
} from "../../Slices/deleteUpdateOrderAdminSlice";
export default function ConfirmOrder() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [disabled, setDisabled] = useState(false);
  const { order, error, loading } = useSelector(
    (state) => state.myOrderDetails
  );
  const { error: updateError, isUpdated } = useSelector(
    (state) => state.deleteUpdateOrderAdmin
  );

  const updateOrderSubmitHandler = () => {
    e.preventDefault();
    const myform = new FormData();
    myform.set("status", status);

    setDisabled(true);
    updateOrderAdmin(dispatch, myform, id);
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { theme: "dark" });
      dispatch(clearOrderDetailsError());
    }
    if (updateError) {
      toast.error(updateError, { theme: "dark" });
      dispatch(clearUpdateOrderFail());
    }
    if (isUpdated) {
      toast.success(" Order Status Updated Successfully", { theme: "dark" });
      dispatch(resetAdminUpdateOrderSuccess());
    }

    getOrderDetails(dispatch, id);
  }, [id, error, navigate,updateError,isUpdated, dispatch]);

  return (
    <Fragment>
      <Metadata title="Process Order" />
      <div className="dashboard">
        <Sidebar />
        <div className="new__product__container">
          {loading ? (
            <Loader />
          ) : (
            <div className="confirm__order__page">
              <div className="confirm__shipping__area">
                <Typography>Shipping Info </Typography>
                <div className="order__details__container__box">
                  <div>
                    <p>Name:</p>
                    <span>{order.user && order.user.name}</span>
                  </div>
                  <div>
                    <p>Phone:</p>
                    <span>
                      {order.shippingInfo && order.shippingInfo.phoneNo}
                    </span>
                  </div>
                  <div>
                    <p>Address:</p>
                    <span>
                      {order.shippingInfo &&
                        `${order.shippingInfo.address} ,${order.shippingInfo.city},${order.shippingInfo.state} ,${order.shippingInfo.country},${order.shippingInfo.pincode}`}
                    </span>
                  </div>
                </div>
                <Typography>Payment</Typography>
                <div className="order__details__container__box">
                  <div>
                    <p
                      className={
                        order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "green_Color"
                          : "red_Color"
                      }
                    >
                      {order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "PAID"
                        : "NOT PAID"}
                    </p>
                  </div>
                  <div>
                    <p>Amount</p>
                    <span>
                      {order.paymentInfo && order.paymentInfo.totalPrice}
                    </span>
                  </div>
                </div>
                <Typography>Order Status</Typography>
                <div className="order__details__container__box">
                  <div>
                    <p
                      className={
                        order.paymentInfo &&
                        order.paymentInfo.orderStatus === "Delievered"
                          ? "green_Color"
                          : "red_Color"
                      }
                    >
                      {order.paymentInfo && order.paymentInfo.orderStatus}
                    </p>
                  </div>
                </div>

                <div className="confirm__cart__items">
                  <Typography>Order Items:</Typography>
                  <div className="confirm__cart__items__container">
                    {order.orderItems &&
                      order.orderItems.map(
                        ({ image, name, price, product, quantity }) => (
                          <div key={product}>
                            <img src={image} alt="productImage" />
                            <Link to={`/product/${product}`}>{name}</Link>
                            <span>
                              {price} X {quantity}= <b>{price * quantity}</b>
                            </span>
                          </div>
                        )
                      )}
                  </div>
                </div>
              </div>
              <div style={{borderLeft:'1px solid rgba(0, 0, 0, 0.11)'}}>
              <form
                className="create__product__form"
                encType="multipart/form-data"
                onSubmit={updateOrderSubmitHandler}
              >
                <h1> Process Order</h1>

                <div>
                  <AccountTreeIcon />
                  <select onChange={({ target }) => setStatus(target.value)}>
                    <option value="">Status</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>

                <Button
                  id="create__product__btn"
                  type="submit"
                  disabled={disabled || status === "" ? true : false}
                >
                  {disabled ? <ButtonLoader /> : "Update Status"}
                </Button>
              </form>
              </div>
              
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </Fragment>
  );
}
