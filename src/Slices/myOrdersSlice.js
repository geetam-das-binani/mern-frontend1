import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  orders: [],
  error: null,
 
};
const myOrdersReducer = createSlice({
  name: "myOrder",
  initialState: initialState,
  reducers: {
    myOrderSuccess: (state, { payload }) => {
      state.orders = payload;
      
    },
    myOrderFail: (state,{payload}) => {
      state.error = payload;
     
    },
    clearMyOrderFail:(state) => {
        state.error = null

      },
  },
});

export default myOrdersReducer.reducer;
export const { myOrderFail, myOrderSuccess,clearMyOrderFail } = myOrdersReducer.actions;
