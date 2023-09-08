import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isUpdated: null,
  error: null,
};

const profileReducer = createSlice({
  name: "profile",

  initialState: initialState,
  reducers: {
    updateProfileSuccess: (state, { payload }) => {
      state.isUpdated = payload;
    },
    updateProfileFail: (state, { payload }) => {
      state.error = payload;
    },
    updateProfileReset: (state) => {
      state.isUpdated = null;
    },
    clearProfileError: (state) => {
      state.error = null;
    },
  },
});

export default profileReducer.reducer;
export const {
  updateProfileFail,
  updateProfileSuccess,
  clearProfileError,
  updateProfileReset,
} = profileReducer.actions;
