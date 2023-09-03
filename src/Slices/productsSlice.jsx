import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  loading: true,
  productsCount: 0,
  error: null,
  resultsPerPage:''

};

const productsReducer = createSlice({
  name: "products",
  initialState,

  reducers: {
    allProductsSuccess: (state, { payload }) => {
      state.products = payload.products;
      state.loading = false;
      state.productsCount = payload.productCounts;
      state.resultsPerPage=payload.resultsPerPage
      state.filteredProductsCount=payload.filteredProductsCount

    },
    allProductsFail: (state, { payload }) => {
      state.loading = false;
      state.error = payload;

    },
    clearErrors: (state, action) => {
      state.error = null;
    },
  
 
}
});

export default productsReducer.reducer;

export const { allProductsFail, allProductsSuccess, clearErrors} =
  productsReducer.actions;
