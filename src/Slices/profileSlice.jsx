import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isUpdated: null,
  error: null,
  loading:true
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
    updatePasswordSuccess:(state,{payload})=>{
      state.isUpdated = payload;
    },
    updatePasswordFail:(state,{payload})=>{
      state.error = payload;
    },
    updatePasswordReset:(state)=>{
      state.isUpdated=null
    },
    setLoading:(state,{payload})=>{
      state.loading=payload
    }
  },
});

export default profileReducer.reducer;
export const {
  updateProfileFail,
  updateProfileSuccess,
  clearProfileError,
  updateProfileReset,
  updatePasswordFail,updatePasswordSuccess,updatePasswordReset,setLoading
} = profileReducer.actions;
