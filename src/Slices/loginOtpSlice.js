import { createSlice } from "@reduxjs/toolkit";
const initialState = {
 isSended:false,
  error: null,
  isVerified:false,
  verifyError:null
 
};

const otpReducer = createSlice({
  name: "otp",
  initialState: initialState,
  reducers: {
    otpSuccess: (state, { payload }) => {
      state.isSended = payload;
     
    },
    otpFail: (state, { payload }) => {
      state.error = payload;
     
    },
    clearOtpFail: (state) => {
      state.error = null;
    },
    resetOtpSuccess:(state)=>{
        state.isSended=false
    },
    otpVerifySuccess:(state,{payload})=>{
      state.isVerified=payload
    },
    otpVerifyFail:(state,{payload})=>{
      state.verifyError=payload
    },
    resetOtpVerifySuccess:(state)=>{
      state.isVerified=false

    },
    clearOtpVerifYError:(state)=>{
      state.verifyError=null
    }
  },
});
export default otpReducer.reducer;
export const { otpFail,otpSuccess,clearOtpFail,resetOtpSuccess,otpVerifyFail,otpVerifySuccess,clearOtpVerifYError,resetOtpVerifySuccess } =
otpReducer.actions;