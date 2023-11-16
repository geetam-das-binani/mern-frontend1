import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDeleted: false,
  error: null,
};
const userDeleteReviewReducer = createSlice({
  name: "reviews",
  initialState: initialState,
  reducers: {
    deleteUserReviewSuccess: (state, { payload }) => {
      state.isDeleted = payload;
    },
    deleteUserReviewFail: (state, { payload }) => {
      state.error = payload;
    },
    clearUserReviewsError: (state) => {
      state.error = null;
    },
    resetDeleteUserReviewSuccess: (state) => {
      state.isDeleted = false;
    },
  },
});

export default userDeleteReviewReducer.reducer;
export const {
  deleteUserReviewFail,
  clearUserReviewsError,
  resetDeleteUserReviewSuccess,
  deleteUserReviewSuccess,
} = userDeleteReviewReducer.actions;
