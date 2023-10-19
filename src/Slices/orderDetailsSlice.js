import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  order: {},
loading:true,
  error: null,
};
const orderDetailsReducer = createSlice({
  name: "orderDetails",

  initialState: initialState,
  reducers: {
    orderDetailsSuccess: (state, { payload }) => {
      state.order = payload;
      state.loading=false
    },
    orderDetailsFail: (state, { payload }) => {
      state.error = payload;
      state.loading=false
    },
    clearOrderDetailsError: (state) => {
      state.error = null;
    },
  },
});
export default orderDetailsReducer.reducer;
export const { orderDetailsFail, orderDetailsSuccess, clearOrderDetailsError } =
  orderDetailsReducer.actions;
