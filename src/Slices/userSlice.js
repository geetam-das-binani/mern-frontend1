import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: {},
  error: null,
  isAuthenticatedUser: false,
  authentication:true,
  logoutNotify: false,
  loginRegisterNotify: false,
  loading: true,
  showloginTab:null,
  showRegisterTab:null
};

const userReducer = createSlice({
  name: "user",
  initialState,

  reducers: {
    loginSuccess: (state, { payload }) => {
      state.user = payload;
        state.authentication=true
      state.isAuthenticatedUser = true;
      state.loginRegisterNotify = "Loged in";
     
    },
    loginFail: (state, { payload }) => {
      state.error = payload;
      state.isAuthenticatedUser = false;
      state.user = null;
      state.showloginTab=true
    },

    registerSuccess: (state, { payload }) => {
      state.user = payload;
      state.authentication=true
      state.isAuthenticatedUser = true;
      state.loginRegisterNotify = "registered";
    },
    registerFail: (state, { payload }) => {
      state.error = payload;
      state.isAuthenticatedUser = false;
      state.user = null;
      state.showRegisterTab=true
    },
    loadUserSuccess: (state, { payload }) => {
      state.user = payload;
        state.authentication=true
      state.isAuthenticatedUser = true;
    },
    loadUserFail: (state) => {
      state.error = null;
      state.isAuthenticatedUser = false;
      state.user = null;
    },
    logoutSuccess: (state) => {
      (state.isAuthenticatedUser = false), (state.user = null);
      state.logoutNotify = true;
      state.authentication=false
    },
    logoutFail: (state, { payload }) => {
      state.error = payload;
    },
    clearError: (state) => {
      state.error = null;
      state.logoutNotify = false;
      state.showloginTab=null
      state.showRegisterTab=null
    },
    clearNotifyMessage: (state) => {
      state.loginRegisterNotify = false;
    },

    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
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
  setLoading,
} = userReducer.actions;
