import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  order: {},

  error: null,
};
const orderDetailsReducer = createSlice({
  name: "orderDetails",

  initialState: initialState,
  reducers: {
    orderDetailsSuccess: (state, { payload }) => {
      state.order = payload;
    },
    orderDetailsFail: (state, { payload }) => {
      state.error = payload;
    },
    clearOrderDetailsError: (state) => {
      state.error = null;
    },
  },
});
export default orderDetailsReducer.reducer;
export const { orderDetailsFail, orderDetailsSuccess, clearOrderDetailsError } =
  orderDetailsReducer.actions;
