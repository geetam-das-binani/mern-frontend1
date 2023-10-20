import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: {},
  error: null,
  loading: true,
};
const adminUserDetailsReducer = createSlice({
  name: "getAllOrders",
  initialState: initialState,
  reducers: {
    adminUserDetailsSuccess: (state, { payload }) => {
      state.user = payload;
      state.loading = false;
    },
    adminUserDetailsFail: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    clearAdmniUserDetailsFail: (state) => {
      state.error = null;
    },
  },
});

export default adminUserDetailsReducer.reducer;
export const {
  adminUserDetailsFail,
  adminUserDetailsSuccess,
  clearAdmniUserDetailsFail,
} = adminUserDetailsReducer.actions;
