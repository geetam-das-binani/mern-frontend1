import axios from "axios";
import { allProductsFail, allProductsSuccess } from "../Slices/productsSlice";
import { productFail, productSuccess } from "../Slices/productSlice";
import { newReviewFail, newReviewSuccess } from "../Slices/newReviewSlice";
import { admniProductsSuccess } from "../Slices/productsSlice";
import {
  newProductSuccess,
  newProductFail,
} from "../Slices/createProductAdminSlice";
import {
  deleteProductFail,
  deleteProductSuccess,
  updateProductSuccess,
  updateProductFail,
} from "../Slices/deleteUpdateProductAdminSlice";

import {
  deleteReviewFail,
  deleteReviewSuccess,
} from "../Slices/adminDeleteReviewSlice";
import {
  allReviewsSuccess,
  allReviewsFail,
} from "../Slices/adminGetAllReviewsSlice";

import {
  deleteUserReviewFail,
  deleteUserReviewSuccess,
} from "../Slices/userDeleteReviewSlice";

const url = "http://localhost:8000/api/v1";

// get all products
export const getAllProducts = async (
  dispatch,
  keyword = "",
  currentPage = 1,
  price = [0, 100000],
  category,
  ratings = 0,
  brand = "",
  checked
) => {
  try {
    let link = `${url}/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&checked=${checked}`;
    if (category) {
      link = `${url}/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}&checked=${checked}`;
    }

    if (brand) {
      link = `${url}/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&brand=${brand}&checked=${checked}`;
    }
    if (category && brand) {
      link = `${url}/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&brand=${brand}&category=${category}&checked=${checked}`;
    }
    const { data } = await axios.get(link);

    dispatch(allProductsSuccess(data));
    return data;
  } catch (error) {
    if (error.message === "Network Error") {
      return dispatch(allProductsFail(error.message));
    }

    dispatch(allProductsFail(error.response.data.errorMessage));
  }
};

// get single product details
export const getProductDetails = async (dispatch, id) => {
  try {
    const { data } = await axios.get(`${url}/product/${id}`);
    dispatch(productSuccess(data.product));
    return data.product;
  } catch (error) {
    if (error.message === "Network Error") {
      return dispatch(productFail(error.message));
    }

    dispatch(productFail(error.response.data.errorMessage));
  }
};

// submit  new review
export const newReview = async (dispatch, reviewData) => {
  const config = {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  };
  try {
    const { data } = await axios.post(`${url}/review`, reviewData, config);
    dispatch(newReviewSuccess(data.success));
  } catch (error) {
    if (error.message === "Network Error") {
      return dispatch(newReviewFail(error.message));
    }

    dispatch(newReviewFail(error.response.data.errorMessage));
  }
};

// get all admin products
export const getAdminProducts = async (dispatch) => {
  const config = {
    withCredentials: true,
  };
  try {
    const { data } = await axios.get(
      `${url}/admin/products`,
      config
    );
    dispatch(admniProductsSuccess(data.products));
  } catch (error) {
    if (error.message === "Network Error") {
      return dispatch(allProductsFail(error.message));
    }

    dispatch(allProductsFail(error.response.data.errorMessage));
  }
};

// create new product admin

export const createProduct = async (dispatch, productData) => {
  const config = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };
  try {
    const { data } = await axios.post(
      `${url}/admin/product/new`,
      productData,
      config
    );
    dispatch(newProductSuccess(data));
  } catch (error) {
    if (error.message === "Network Error") {
      return dispatch(newProductFail(error.message));
    }

    dispatch(newProductFail(error.response.data.errorMessage));
  }
};

// update  product admin

export const updateProduct = async (dispatch, productData, id) => {
  const config = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };
  try {
    const { data } = await axios.post(
      `${url}/admin/product/update/${id}`,
      productData,
      config
    );
    dispatch(updateProductSuccess(data.success));
  } catch (error) {
    if (error.message === "Network Error") {
      return dispatch(updateProductFail(error.message));
    }

    dispatch(updateProductFail(error.response.data.errorMessage));
  }
};

// delete product admin

export const deleteProduct = async (dispatch, id) => {
  try {
    const { data } = await axios.delete(
      `${url}/admin/product/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(deleteProductSuccess(data.success));
  } catch (error) {
    if (error.message === "Network Error") {
      return dispatch(deleteProductFail(error.message));
    }

    dispatch(deleteProductFail(error.response.data.errorMessage));
  }
};

// get all reviews of a product (admin )

export const getAllReviews = async (dispatch, id) => {
  const config = {
    withCredentials: true,
  };
  try {
    const { data } = await axios.get(
      `${url}/reviews?id=${id}`,

      config
    );
    dispatch(allReviewsSuccess(data.reviews));
  } catch (error) {
    if (error.message === "Network Error") {
      return dispatch(allReviewsFail(error.message));
    }

    dispatch(allReviewsFail(error.response.data.errorMessage));
  }
};

// admin delete reviews
export const deleteReviews = async (dispatch, reviewId, productId) => {
  const config = {
    withCredentials: true,
  };
  try {
    const { data } = await axios.delete(
      `${url}/reviews?Id=${reviewId}&productId=${productId}`,

      config
    );
    dispatch(deleteReviewSuccess(data.success));
  } catch (error) {
    if (error.message === "Network Error") {
      return dispatch(deleteReviewFail(error.message));
    }

    dispatch(deleteReviewFail(error.response.data.errorMessage));
  }
};

// user delete review
export const deleteUserReview = async (dispatch, productId) => {
  const config = {
    withCredentials: true,
  };
  try {
    const { data } = await axios.delete(
      `${url}/review/delete?productId=${productId}`,

      config
    );
    dispatch(deleteUserReviewSuccess(data.success));
  } catch (error) {
    if (error.message === "Network Error") {
      return dispatch(deleteUserReviewFail(error.message));
    }

    dispatch(deleteUserReviewFail(error.response.data.errorMessage));
  }
};
