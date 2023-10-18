import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    orders: [],
    error: null,
   
  };
  const adminAllOrdersReducer = createSlice({
    name: "getAllOrders",
    initialState: initialState,
    reducers: {
      adminAllOrdersSuccess: (state, { payload }) => {
        state.orders = payload;
        
      },
      adminAllOrdersFail: (state,{payload}) => {
        state.error = payload;
       
      },
      clearAllOrdersFail:(state) => {
          state.error = null
  
        },
    },
  });

  export default adminAllOrdersReducer.reducer
  export const {adminAllOrdersFail,adminAllOrdersSuccess,clearAllOrdersFail} =adminAllOrdersReducer.actions
