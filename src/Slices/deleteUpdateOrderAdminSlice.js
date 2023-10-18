import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  error: null,
  isUpdated: false,
  isDeleted:false
};
const deleteUpdateOrderReducer = createSlice({
  name: "updateOrder",
  initialState: initialState,
  reducers: {
    adminUpdateOrderSuccess: (state, { payload }) => {
      state.isUpdated = payload;
    },
    adminUpdateOrderFail: (state, { payload }) => {
      state.error = payload;
    },
    clearUpdateOrderFail: (state) => {
      state.error = null;
    },
    resetAdminUpdateOrderSuccess: (state) => {
      state.isUpdated = false;
    },
    adminDeleteOrderSuccess: (state, { payload }) => {
      state.isDeleted = payload;
    },
    adminDeleteOrderFail: (state, { payload }) => {
      state.error = payload;
    },
    resetAdminDeleteOrderSuccess: (state) => {
      state.isDeleted = false;
    },
    clearDeleteOrderFail: (state) => {
      state.error = null;
    },
  },
});

export default deleteUpdateOrderReducer.reducer;
export const {
  adminUpdateOrderFail,
  adminUpdateOrderSuccess,
  clearUpdateOrderFail,
  resetAdminUpdateOrderSuccess,
  adminDeleteOrderFail,
  adminDeleteOrderSuccess,
  resetAdminDeleteOrderSuccess,
  clearDeleteOrderFail,
} = deleteUpdateOrderReducer.actions;
