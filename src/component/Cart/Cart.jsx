import React, { Fragment, useEffect, useState } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart } from "../../actions/cartActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { removeCartItems } from "../../actions/cartActions";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Loader from "../layout/loader/Loader";
import {useNavigate} from 'react-router-dom'
import Metadata from "../layout/Metadata";

export default function Cart() {
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate()
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const increaseQuantity = (id, quantity, stock) => {
    if (quantity < stock) {
      const newQty = quantity + 1;
      addItemsToCart(dispatch, id, newQty);
    } else {
      toast.warning("Not enough stock", { theme: "dark", autoClose: 1500 });
    }
  };
  const decreaseQunatity = (id, quantity) => {
    if (quantity <= 1) return;

    const newQty = quantity - 1;
    addItemsToCart(dispatch, id, newQty);
  };

  const deleteCartItems = (productId) => {
    removeCartItems(dispatch, productId);
    toast.success("Removed Successfully", { theme: "dark", autoClose: 1500 });
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  },[]);

  const grosstotal = () => {
    return cartItems?.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };
  const checkoutHandler=()=>{
     navigate('/login?redirect=shipping')
  }
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {cartItems.length === 0 ? (
            <>
            <Metadata title='Your Cart'/>
               <div className="empty__card">
              <RemoveShoppingCartIcon />
              <Typography>No Products in your cart</Typography>
              <Link to="/products">View Products</Link>
            </div>
            </>
         
          ) : (
            <Fragment>
              <Metadata title='Your Cart'/>
              <div className="cart__page">
                <div className="cart__header">
                  <p>Product</p>
                  <p>Quantity</p>
                  <p>SubTotal</p>
                </div>

                {cartItems &&
                  cartItems.map((item) => {
                    return (
                      <div key={item.product} className="cart__container">
                        <CartItemCard
                          {...item}
                          deleteCartItems={deleteCartItems}
                        />
                        <div className="cart__input">
                          <button
                            onClick={() =>
                              decreaseQunatity(item.product, item.quantity)
                            }
                          >
                            -
                          </button>
                          <input type="number" readOnly value={item.quantity} />
                          <button
                            onClick={() =>
                              increaseQuantity(
                                item.product,
                                item.quantity,
                                item.stock
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                        <p className="cart__subtotal">{`₹${
                          item.price * item.quantity
                        }`}</p>
                      </div>
                    );
                  })}

                <div className="cart__gross__total">
                  <div></div>
                  <div className="cart__gross__profit__box">
                    <p>Gross Total</p>
                    <p>{`₹${grosstotal()}`}</p>
                  </div>
                  <div></div>
                  <div className="checkout__btn">
                    <button onClick={checkoutHandler}>Check out</button>
                  </div>
                </div>
              </div>
              <ToastContainer />
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}
