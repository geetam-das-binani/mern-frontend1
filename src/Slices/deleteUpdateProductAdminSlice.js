import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  error: null,
  isDeleted: false,
  isUpdated: false,
};
const deleteUpdateProductReducer = createSlice({
  name: "updateDeleteProduct",
  initialState: initialState,
  reducers: {
    deleteProductSuccess: (state, { payload }) => {
      state.isDeleted = payload;
    },
    deleteProductFail: (state, { payload }) => {
      state.error = payload;
    },
    resetDeleteProductSuccess: (state) => {
      state.isDeleted = false;
    },
    clearDeleteProductError: (state) => {
      state.error = null;
    },
    updateProductSuccess: (state, { payload }) => {
      state.isUpdated = payload;
    },
    updateProductFail: (state, { payload }) => {
      state.error = payload;
    },
    resetUpdateProductSuccecss: (state) => {
      state.isUpdated = false;
    },
    clearUpdateProductError: (state) => {
      state.error = null;
    },
  },
});

export default deleteUpdateProductReducer.reducer;
export const {
  deleteProductFail,
  deleteProductSuccess,
  clearDeleteProductError,
  resetDeleteProductSuccess,
  updateProductFail,
  updateProductSuccess,
  resetUpdateProductSuccecss,
  clearUpdateProductError,
} = deleteUpdateProductReducer.actions;
