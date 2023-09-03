import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  product: {},
  loading: true,

  error: null,
};
const productReducer = createSlice({
  name: "product",
  initialState,

  reducers: {
    productSuccess: (state, { payload }) => {
      state.product = payload;
      state.loading = false;
    },
    productFail: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    clearProductError: (state, action) => {
      state.error = null;
    },
  },
});

export default productReducer.reducer;

export const { productFail,productSuccess,clearProductError} =
  productReducer.actions;
