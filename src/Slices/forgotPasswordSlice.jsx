import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  message: null,
  error: null,
  success:false,
  loading:true
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
    },
    resetPasswordSuccess:(state,{payload})=>{
      state.success= payload;

    },
    resetPasswordFail:(state,{payload})=>{
      state.error=payload
    },
    resetPasswordSuccessMessage:(state)=>{
      state.success=false
    },
    setLoading:(state,{payload})=>{
      state.loading=payload
    }
  },
});

export default forgotPasswordReducer.reducer;
export const {forgotPasswordSuccess,resetPasswordSuccessMessage,forgotPasswordResetMessage,forgotPasswordFail,clearForgotPasswordError,resetPasswordFail,resetPasswordSuccess,setLoading} = forgotPasswordReducer.actions;
