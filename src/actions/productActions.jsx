import axios from "axios";
import { allProductsFail, allProductsSuccess, clearErrors } from "../Slices/productsSlice";
import { productFail, productSuccess } from "../Slices/productSlice";

export const getAllProducts = async (
  dispatch,
  keyword = "",
  currentPage = 1,
  price = [0, 25000],
  category,
  ratings=0,
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

// export const removeError=(dispatch)=>{
//          dispatch(clearErrors())
// }
