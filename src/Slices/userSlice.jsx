import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: {},
  error: null,
  isAuthenticatedUser: false,
  notifyMessage:false
};

const userReducer = createSlice({
  name: "user",
  initialState,

  reducers: {
    loginSuccess: (state, { payload }) => {
      state.user = payload;

      state.isAuthenticatedUser = true;
    },
    loginFail: (state, { payload }) => {
      state.error = payload;
      state.isAuthenticatedUser = false;
      state.user = null;
    },
    clearError: (state, action) => {
      state.error = null;
      state.notifyMessage=false
    },
    registerSuccess: (state, { payload }) => {
      state.user = payload;

      state.isAuthenticatedUser = true;
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
      state.notifyMessage=true
    },
    logoutFail:(state,{payload})=>{
     state.error=payload
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
  logoutSuccess
} = userReducer.actions;
