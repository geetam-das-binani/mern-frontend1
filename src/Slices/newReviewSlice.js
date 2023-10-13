import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  success: false,

  error: null,
};
const newReviewReducer = createSlice({
  name: "product",
  initialState,

  reducers: {
    newReviewSuccess: (state, { payload }) => {
      state.success = payload;
    },
    newReviewFail: (state, { payload }) => {
      state.error = payload;
    },
    reviewReset: (state) => {
      state.success = false;
    },
    clearNewReviewError: (state, action) => {
      state.error = null;
    },
  },
});

export default newReviewReducer.reducer;

export const { newReviewSuccess, newReviewFail,reviewReset, clearNewReviewError } =
  newReviewReducer.actions;
