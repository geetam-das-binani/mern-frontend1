import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isUpdated: null,
  error: null
};

const  forgotPasswordReducer= createSlice({
    name: "forgot password",
  
    initialState: initialState,
   reducers:{
    

   }
  });
  
  export default forgotPasswordReducer.reducer
  export const {
  
  } = forgotPasswordReducer.actions;