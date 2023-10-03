import axios from "axios";
import { createOrderFail, createOrderSuccess } from "../Slices/orderSlice";
import { myOrderFail, myOrderSuccess } from "../Slices/myOrdersSlice";

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
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  try {
    const { data } = await axios.get(
      "http://localhost:8000/orders/me",

      config
    );
    dispatch(myOrderSuccess(data));
  } catch (error) {
    if (error.message === "Network Error") {
      return dispatch(myOrderFail(error.message));
    }
    dispatch(myOrderFail(error.response.data.errorMessage));
  }
};
