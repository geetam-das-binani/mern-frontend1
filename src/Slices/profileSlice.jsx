import { createSlice } from "@reduxjs/toolkit";
const initialState = {
 
  isUpdated: null,
  loading: true,
  error: null,
};

const profileReducer = createSlice({
  name: "profile",

  initialState: initialState,
  reducers: {
    updateProfileSuccess: (state, { payload }) => {
      (state.loading = false), (state.isUpdated = payload);
    },
    updateProfileFail: (state, { payload }) => {
      (state.loading = false), (state.error = payload);
    },
    updateProfileReset:(state)=>{state.isUpdated=false},
    clearProfileError: (state) => {
      state.error = null;
    },
  },
});

export default profileReducer.reducer;
export const { updateProfileFail, updateProfileSuccess, clearProfileError,updateProfileReset } =
  profileReducer.actions;
