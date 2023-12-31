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



// const url = "http://localhost:8000/api/v1";
const url="https://becoomerce.onrender.com/api/v1"
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
      `${url}/order/new`,
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
      `${url}/orders/me`,

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

// get order details request user or  admin
export const getOrderDetails = async (dispatch, id) => {
  const config = {
    withCredentials: true,
  };
  try {
    const { data } = await axios.get(
      `${url}/order/${id}`,

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
      `${url}/admin/orders`,

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
 
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  try {
    const { data } = await axios.post(
      `${url}/admin/order/${id}`,
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
      `${url}/admin/order/${id}`,
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