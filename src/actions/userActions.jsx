import axios from "axios";
import {
  loginFail,
  loginSuccess,
  registerSuccess,
  registerFail,
  loadUserFail,
  loadUserSuccess,
  logoutSuccess,
  logoutFail,
} from "../Slices/userSlice";
import {
  updatePasswordFail,
  updatePasswordSuccess,
  updateProfileFail,
  updateProfileSuccess,
} from "../Slices/profileSlice";
import { forgotPasswordSuccess,forgotPasswordFail } from "../Slices/forgotPasswordSlice";

// login user

export const login = async (dispatch, email, password) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `http://localhost:8000/login`,
      {
        email,
        password,
      },
      config
    );

    dispatch(loginSuccess(data.user));
  } catch (error) {
    if (error.message === "Network Error") {
      return dispatch(loginFail(error.message));
    }

    dispatch(loginFail(error.response.data.errorMessage));
  }
};

// Register user
export const register = async (dispatch, userData) => {
  try {
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `http://localhost:8000/register`,

      userData,

      config
    );
    dispatch(registerSuccess(data.user));
  } catch (error) {
    if (error.message === "Network Error") {
      return dispatch(registerFail(error.message));
    }

    dispatch(registerFail(error.response.data.errorMessage));
  }
};

//Load user

export const loadUser = async (dispatch) => {
  try {
    const { data } = await axios.get(`http://localhost:8000/me`, {
      withCredentials: true,
    });
    dispatch(loadUserSuccess(data.user));
  } catch (error) {
    if (error.message === "Network Error") {
      return dispatch(loadUserFail(error.message));
    }

    dispatch(loadUserFail());
  }
};

// logout user

export const logout = async (dispatch) => {
  try {
    await axios.get(`http://localhost:8000/logout`, {
      withCredentials: true,
    });
    dispatch(logoutSuccess());
  } catch (error) {
    if (error.message === "Network Error") {
      return dispatch(logoutFail(error.message));
    }

    dispatch(logoutFail(error.response.data.errorMessage));
  }
};

// update user profile

export const updateProfile = async (dispatch, userData) => {
  
  try {
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `http://localhost:8000/me/update`,

      userData,

      config
    );
    dispatch(updateProfileSuccess(data.success));
  } catch (error) {
    if (error.message === "Network Error") {
      return dispatch(updateProfileFail(error.message));
    }

    dispatch(updateProfileFail(error.response.data.errorMessage));
  }
};


//  change password 
export const  updatePassword= async (dispatch, passwords) => {
  
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `http://localhost:8000/password/update`,

      passwords,

      config
    );
    dispatch(updatePasswordSuccess(data.success));
  } catch (error) {
    if (error.message === "Network Error") {
      return dispatch(updateProfileFail(error.message));
    }

    dispatch(updatePasswordFail(error.response.data.errorMessage));
  }
};

// forgot password
export const  forgotPassword= async (dispatch, email) => {
  
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `http://localhost:8000/password/forgot`,

      email,

      config
    );
    dispatch(forgotPasswordSuccess(data.message));
  } catch (error) {
    if (error.message === "Network Error") {
      return dispatch(forgotPasswordFail(error.message));
    }

    dispatch(forgotPasswordFail(error.response.data.errorMessage));
  }
};