import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  message: null,
  error: null,
};

const forgotPasswordReducer = createSlice({
  name: "forgot password",

  initialState: initialState,
  reducers: {
    forgotPasswordSuccess: (state, { payload }) => {
      state.message = payload;
    },
    forgotPasswordFail: (state, { payload }) => {
      state.error = payload;
    },
    clearForgotPasswordError:(state)=>{
      state.error=null
    },
    forgotPasswordResetMessage:(state)=>{
      state.message=null
    }
  },
});

export default forgotPasswordReducer.reducer;
export const {forgotPasswordSuccess,forgotPasswordResetMessage,forgotPasswordFail,clearForgotPasswordError} = forgotPasswordReducer.actions;
