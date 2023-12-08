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
import {
  forgotPasswordSuccess,
  forgotPasswordFail,
  resetPasswordFail,
  resetPasswordSuccess,
} from "../Slices/forgotPasswordSlice";

import {
  adminAllUsersSuccess,
  adminAllUsersFail,
} from "../Slices/adminAllUsersSlice";
import {
  adminUserDetailsFail,
  adminUserDetailsSuccess,
} from "../Slices/adminUserDetailsSlice";
import {
  adminDeleteUserFail,
  adminUpdateUserFail,
  adminDeleteUserSuccess,
  adminUpdateUserSuccess,
} from "../Slices/deleteUpdateUserAdminSlice";

import { otpSuccess, otpFail } from "../Slices/loginOtpSlice";
import { otpVerifySuccess, otpVerifyFail } from "../Slices/loginOtpSlice";

const url = "http://localhost:8000/api/v1";

// login user

export const login = async (dispatch, email, password) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${url}/login`,
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
      `${url}/register`,

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
    const { data } = await axios.get(`${url}/me`, {
      withCredentials: true,
    });

    dispatch(loadUserSuccess(data.user));
  } catch (error) {
    dispatch(loadUserFail());
  }
};

// logout user

export const logout = async (dispatch) => {
  try {
    await axios.get(`${url}/logout`, {
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

// otp login
export const loginOtp = async (dispatch, phoneNumber) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  try {
    const { data } = await axios.post(
      `${url}/sendotp`,
      { phoneNumber },
      config
    );
    dispatch(otpSuccess(data.success));
  } catch (error) {
    if (error.message === "Network Error") {
      return dispatch(otpFail(error.message));
    }

    dispatch(otpFail(error.response.data.errorMessage));
  }
};

// otp verify
export const verifyOtp = async (dispatch, otp) => {
  try {
    const { data } = await axios.post(
      `${url}/verifyOtp`,
      { otp },
      { withCredentials: true }
    );

    dispatch(otpVerifySuccess(data.success));
  } catch (error) {
    if (error.message === "Network Error") {
      return dispatch(otpVerifyFail(error.message));
    }

    dispatch(otpVerifyFail(error.response.data.errorMessage));
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
      `${url}/me/update`,

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
export const updatePassword = async (dispatch, passwords) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${url}/password/update`,

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
export const forgotPassword = async (dispatch, email) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${url}/password/forgot`,

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

// reset password
export const resetPassword = async (dispatch, passwords, token) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${url}/password/reset/${token}`,

      passwords,
      config
    );
    dispatch(resetPasswordSuccess(data.success));
  } catch (error) {
    if (error.message === "Network Error") {
      return dispatch(resetPasswordFail(error.message));
    }

    dispatch(resetPasswordFail(error.response.data.errorMessage));
  }
};

// get all users admin
export const getAllUsersAdmin = async (dispatch) => {
  try {
    const { data } = await axios.get(`${url}/admin/users`, {
      withCredentials: true,
    });
    dispatch(adminAllUsersSuccess(data.users));
  } catch (error) {
    if (error.message === "Network Error") {
      return dispatch(adminAllUsersFail(error.message));
    }

    dispatch(adminAllUsersFail(error.response.data.errorMessage));
  }
};

// get user details ( admin )
export const getUserDetailsAdmin = async (dispatch, id) => {
  try {
    const { data } = await axios.get(`${url}/admin/user/${id}`, {
      withCredentials: true,
    });
    dispatch(adminUserDetailsSuccess(data.user));
  } catch (error) {
    if (error.message === "Network Error") {
      return dispatch(adminUserDetailsFail(error.message));
    }
    dispatch(adminUserDetailsFail(error.response.data.errorMessage));
  }
};

// update user  admin
export const updateUser = async (dispatch, id, userData) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${url}/admin/user/${id}`,

      userData,

      config
    );
    dispatch(adminUpdateUserSuccess(data.success));
  } catch (error) {
    if (error.message === "Network Error") {
      return dispatch(adminUpdateUserFail(error.message));
    }

    dispatch(adminUpdateUserFail(error.response.data.errorMessage));
  }
};

// delete user admin

export const deleteUser = async (dispatch, id) => {
  try {
    const config = {
      withCredentials: true,
    };
    const { data } = await axios.delete(`${url}/admin/user/${id}`, config);
    dispatch(adminDeleteUserSuccess(data));
  } catch (error) {
    if (error.message === "Network Error") {
      return dispatch(adminDeleteUserFail(error.message));
    }

    dispatch(adminDeleteUserFail(error.response.data.errorMessage));
  }
};
