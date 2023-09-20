import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: {},
  error: null,
  isAuthenticatedUser: false,
  logoutNotify:false,
  loginRegisterNotify:false,
  loading:true
};

const userReducer = createSlice({
  name: "user",
  initialState,

  reducers: {
    loginSuccess: (state, { payload }) => {
      state.user = payload;

      state.isAuthenticatedUser = true;
      state.loginRegisterNotify='Loged in'
    },
    loginFail: (state, { payload }) => {
      state.error = payload;
      state.isAuthenticatedUser = false;
      state.user = null;
    },
   
    registerSuccess: (state, { payload }) => {
      state.user = payload;

      state.isAuthenticatedUser = true;
      state.loginRegisterNotify='registered'
    },
    registerFail: (state, { payload }) => {
      state.error = payload;
      state.isAuthenticatedUser = false;
      state.user = null;
    },
    loadUserSuccess: (state, { payload }) => {
      state.user = payload;

      state.isAuthenticatedUser = true;
    },
    loadUserFail: (state) => {
      state.error = null;
      state.isAuthenticatedUser = false;
      state.user = null;
    },
    logoutSuccess:(state)=>{
      state.isAuthenticatedUser=false,
      state.user=null
      state.logoutNotify=true
    },
    logoutFail:(state,{payload})=>{
     state.error=payload
    },
    clearError: (state) => {
      state.error = null;
      state.logoutNotify=false
    },
    clearNotifyMessage:(state)=>{
      state.loginRegisterNotify=false
    },
    
    setLoading:(state,{payload})=>{
      state.loading=payload
    }

  },
});

export default userReducer.reducer;

export const {
  loginSuccess,
  loginFail,
  clearError,
  registerFail,
  registerSuccess,
  loadUserFail,
  loadUserSuccess,
  logoutFail,
  logoutSuccess,
  clearNotifyMessage,
  setLoading
} = userReducer.actions;
