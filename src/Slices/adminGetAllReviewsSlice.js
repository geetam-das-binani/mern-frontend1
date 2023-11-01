import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviews: [],
  error: null,
  loading: true,
};

const productReviewsReducer = createSlice({
  name: "allReviews",
  initialState: initialState,
  reducers: {
    allReviewsSuccess: (state, { payload }) => {
      (state.loading = false), (state.reviews = payload);
    },
    allReviewsFail: (state, { payload }) => {
      (state.loading = false), (state.error = payload);
    },
    clearReviewsError: (state) => {
      state.error = null;
    },
  },
});
export default productReviewsReducer.reducer;
export const { allReviewsFail, allReviewsSuccess, clearReviewsError } =
  productReviewsReducer.actions;
