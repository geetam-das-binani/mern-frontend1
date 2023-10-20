import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isUpdated: false,
  isDeleted: false,
  error: true,
};

const deleteUpdateUserReducer = createSlice({
  name: "updateDeleteUser",
  initialState: initialState,
  reducers: {
    adminUpdateUserSuccess: (state, { payload }) => {
      state.isUpdated = payload;
    },
    adminUpdateUserFail: (state, { payload }) => {
      state.error = payload;
    },
    resetAdminUpdateUserSuccess: (state) => {
      state.isUpdated = false;
    },
    clearAdminUpdateUserFail: (state) => {
      state.error = false;
    },
    adminDeleteUserSuccess: (state, { payload }) => {
      state.isDeleted = payload;
    },
    adminDeleteUserFail: (state, { payload }) => {
      state.error = payload;
    },
    resetAdminDeleteUserSuccess: (state) => {
      state.isDeleted = false;
    },
    clearAdminDeleteUserFail: (state) => {
      state.error = false;
    },
  },
});
export default deleteUpdateUserReducer.reducer;
export const {
  adminDeleteUserFail,
  adminDeleteUserSuccess,
  resetAdminDeleteUserSuccess,
  clearAdminDeleteUserFail,
  adminUpdateUserFail,
  adminUpdateUserSuccess,
  resetAdminUpdateUserSuccess,
  clearAdminUpdateUserFail,
} = deleteUpdateUserReducer.actions;
