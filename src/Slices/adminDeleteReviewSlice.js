import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDeleted:false,
  error: null,
  
};

const  deleteReviewReducer= createSlice({
  name: "allReviews",
  initialState: initialState,
  reducers: {
    deleteReviewSuccess: (state, { payload }) => {
     (state.isDeleted = payload);
    },
    deleteReviewFail: (state, { payload }) => {
       (state.error = payload);
    },
    clearReviewsError: (state) => {
      state.error = null;
    },
    resetDeleteReviewSuccess:(state)=>{
        state.isDeleted=false
    }
  },
});
export default deleteReviewReducer.reducer;
export const { deleteReviewFail,deleteReviewSuccess,resetDeleteReviewSuccess,clearReviewsError } =
deleteReviewReducer.actions;