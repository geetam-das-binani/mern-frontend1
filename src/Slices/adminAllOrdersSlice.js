import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    orders: [],
    error: null,
    loading:true
   
  };
  const adminAllOrdersReducer = createSlice({
    name: "getAllOrders",
    initialState: initialState,
    reducers: {
      adminAllOrdersSuccess: (state, { payload }) => {
        state.orders = payload;
        state.loading=false
        
      },
      adminAllOrdersFail: (state,{payload}) => {
        state.error = payload;
        state.loading=false
       
      },
      clearAllOrdersFail:(state) => {
          state.error = null
  
        },
    },
  });

  export default adminAllOrdersReducer.reducer
  export const {adminAllOrdersFail,adminAllOrdersSuccess,clearAllOrdersFail} =adminAllOrdersReducer.actions
