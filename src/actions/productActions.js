import axios from "axios";
import { allProductsFail, allProductsSuccess } from "../Slices/productsSlice";
import { productFail, productSuccess } from "../Slices/productSlice";
import { newReviewFail, newReviewSuccess } from "../Slices/newReviewReducer";

// get all products
export const getAllProducts = async (
  dispatch,
  keyword = "",
  currentPage = 1,
  price = [0, 25000],
  category,
  ratings = 0
) => {
  try {
    let link = `http://localhost:8000/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
    if (category) {
      link = `http://localhost:8000/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
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
    const { data } = await axios.get(`http://localhost:8000/product/${id}`);
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
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  try {
    const { data } = await axios.post(
      `http://localhost:8000/review`,
      config,
      reviewData
    );
    dispatch(newReviewSuccess(data.success));
    return data.product;
  } catch (error) {
    if (error.message === "Network Error") {
      return dispatch(newReviewFail(error.message));
    }

    dispatch(newReviewFail(error.response.data.errorMessage));
  }
};
