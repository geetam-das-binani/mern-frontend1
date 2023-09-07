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
 const {data}=   await axios.get(`http://localhost:8000/logout`, {
      withCredentials: true,
    });
    dispatch(logoutSuccess());
   return data.message
   
  } catch (error) {
    if (error.message === "Network Error") {
      return dispatch(logoutFail(error.message));
    }

    dispatch(logoutFail(error.response.data.errorMessage));
  }
};
