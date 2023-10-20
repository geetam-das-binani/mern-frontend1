import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  users: [],
  error: null,
  loading: true,
};

const adminAllUsersReducer = createSlice({
  name: "allUsers",
  initialState: initialState,
  reducers: {
    adminAllUsersSuccess: (state, { payload }) => {
      state.users = payload;
      state.loading = false;
    },
    adminAllUsersFail: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    clearAllUsersFail: (state) => {
      state.error = null;
    },
  },
});
export default adminAllUsersReducer.reducer;
export const { adminAllUsersFail, adminAllUsersSuccess, clearAllUsersFail } =
  adminAllUsersReducer.actions;
