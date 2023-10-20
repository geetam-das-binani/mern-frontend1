import axios from "axios";
import { createOrderFail, createOrderSuccess } from "../Slices/orderSlice";
import { myOrderFail, myOrderSuccess } from "../Slices/myOrdersSlice";
import {
  
  orderDetailsFail,
  orderDetailsSuccess,
} from "../Slices/orderDetailsSlice";
import {
  adminDeleteOrderFail,
  adminDeleteOrderSuccess,
  adminUpdateOrderSuccess,
  adminUpdateOrderFail,
} from "../Slices/deleteUpdateOrderAdminSlice";
import {
  adminAllOrdersFail,
  adminAllOrdersSuccess,
} from "../Slices/adminAllOrdersSlice";

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

// my orders request --user
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

// get my order details request user admin
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

// get all orders (admin )
export const getAllOrdersAdmin = async (dispatch) => {
  const config = {
    withCredentials: true,
  };
  try {
    const { data } = await axios.get(
      "http://localhost:8000/admin/orders",

      config
    );
    dispatch(adminAllOrdersSuccess(data.orders));
  } catch (error) {
    if (error.message === "Network Error") {
      return dispatch(adminAllOrdersFail(error.message));
    }
    dispatch(adminAllOrdersFail(error.response.data.errorMessage));
  }
};


// update order -( admin )
export const updateOrderAdmin = async (dispatch, order,id) => {
  console.log(id);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  try {
    const { data } = await axios.post(
      `http://localhost:8000/admin/order/${id}`,
      order,
      config
    );
    dispatch(adminUpdateOrderSuccess(data.success));
    
  } catch (error) {
    if (error.message === "Network Error") {
      return dispatch(adminUpdateOrderFail(error.message));
    }
    dispatch(adminUpdateOrderFail(error.response.data.errorMessage));
  }
};


// delete order -( admin )
export const deleteOrderAdmin = async (dispatch,id) => {
  const config = {
   
    withCredentials: true,
  };
  try {
    const { data } = await axios.delete(
      `http://localhost:8000/admin/order/${id}`,
     config
    );
    dispatch(adminDeleteOrderSuccess(data.success));
    return data;
  } catch (error) {
    if (error.message === "Network Error") {
      return dispatch(adminDeleteOrderFail(error.message));
    }
    dispatch(adminDeleteOrderFail(error.response.data.errorMessage));
  }
};