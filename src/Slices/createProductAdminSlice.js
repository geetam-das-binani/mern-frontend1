import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  error: null,
  product: {},
  success: false,
};
const newProductReducer = createSlice({
  name: "new Product",
  initialState: initialState,
  reducers: {
    newProductSuccess: (state, { payload }) => {
      state.product = payload.product;
      state.success = payload.success;
    },
    newProductFail: (state, { payload }) => {
      state.error = payload;
    },
    resetProductSuccess: (state) => {
      state.success = false;
    },
    clearNewProductError: (state) => {
      state.error = null;
    },
  },
});

export default newProductReducer.reducer;
export const {
  newProductFail,
  newProductSuccess,
  resetProductSuccess,
  clearNewProductError,
} = newProductReducer.actions;
