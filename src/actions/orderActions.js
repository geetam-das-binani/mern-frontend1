import axios from "axios";
import { createOrderFail, createOrderSuccess } from "../Slices/orderSlice";
import { myOrderFail, myOrderSuccess } from "../Slices/myOrdersSlice";
import {
  
  orderDetailsFail,
  orderDetailsSuccess,
} from "../Slices/orderDetailsSlice";
// create order request
export const createOrder = async (dispatch, order) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  try {
    const { data } = await axios.post(
      "http://localhost:8000/order/new",
      order,
      config
    );
    dispatch(createOrderSuccess(data));
    return data;
  } catch (error) {
    if (error.message === "Network Error") {
      return dispatch(createOrderFail(error.message));
    }
    dispatch(createOrderFail(error.response.data.errorMessage));
  }
};

// my orders request
export const myOrders = async (dispatch) => {
  const config = {
    withCredentials: true,
  };
  try {
    const { data } = await axios.get(
      "http://localhost:8000/orders/me",

      config
    );
    dispatch(myOrderSuccess(data.orders));
  } catch (error) {
    if (error.message === "Network Error") {
      return dispatch(myOrderFail(error.message));
    }
    dispatch(myOrderFail(error.response.data.errorMessage));
  }
};

// get my order details request
export const getOrderDetails = async (dispatch, id) => {
  const config = {
    withCredentials: true,
  };
  try {
    const { data } = await axios.get(
      `http://localhost:8000/order/${id}`,

      config
    );
    dispatch(orderDetailsSuccess(data.order));
  } catch (error) {
    if (error.message === "Network Error") {
      return dispatch(orderDetailsFail(error.message));
    }
    dispatch(orderDetailsFail(error.response.data.errorMessage));
  }
};
