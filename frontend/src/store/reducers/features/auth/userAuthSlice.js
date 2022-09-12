import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
const LOGOUT_ENDPOINT = "http://localhost:4040/api/v1/user/logout";
const REGISTER_ENDPOINT = "http://localhost:4040/api/v1/user/register";
const LOGIN_ENDPOINT = "http://localhost:4040/api/v1/user/login";
const ME_ENDPOINT = "http://localhost:4040/api/v1/user/me";

//user registration
export const userRegister = createAsyncThunk("user/register", async (user) => {
  try {
    let { data } = await axios.post(REGISTER_ENDPOINT, user);
    return data;
  } catch (error) {
    return error.response.data;
  }
});

//user login
export const userLogin = createAsyncThunk("user/login", async (credential) => {
  try {
    let options = {
      Headers: {
        "Content-Type": "application/json",
      },
    };
    let { data } = await axios.post(LOGIN_ENDPOINT, credential, options);
    return data;
  } catch (error) {
    return error.response.data;
  }
});

export const loadUser = createAsyncThunk("user/load", async () => {
  try {
    let { data } = await axios.get(ME_ENDPOINT, { withCredentials: true });
    return data;
  } catch (error) {
    return error.response.data;
  }
});

//user logout
export const userLogout = createAsyncThunk("user/logout", async () => {
  try {
    let { data } = await axios.get(LOGOUT_ENDPOINT, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    return error.response.data;
  }
});

//user auth slice
const userAuthSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    isAuthenticated: false,
    user: {},
    token: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(userRegister.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userRegister.fulfilled, (state, action) => {
      if (action.payload.success) {
        Cookies.set("token", action.payload.token, {
          expires: 7,
          sameSite: "none",
          secure: true,
        });

        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = null;
        state.token = action.payload.token;
      } else {
        state.isLoading = false;
        state.error = action.payload.message;
      }
    });

    builder.addCase(userRegister.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    });

    //user login
    builder.addCase(userLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      if (action.payload.success) {
        Cookies.set("token", action.payload.token, {
          expires: 7,
          sameSite: "none",
          secure: true,
        });
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = null;
        state.token = action.payload.token;
      } else {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = {};
        state.error = action.payload.message;
        state.token = null;
      }
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.user = {};
      state.error = action.payload.message;
    });

    //Load user
    builder.addCase(loadUser.pending, (state) => {
      console.log("load user requested");
      state.isLoading = true;
    });
    builder.addCase(loadUser.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = null;
        state.token = action.payload.token;
      } else {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = {};
        state.error = action.payload.message;
        state.token = null;
      }
    });
    builder.addCase(loadUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    });

    //user log out
    builder.addCase(userLogout.pending, (state) => {
      console.log("logout user requested");
      state.isLoading = true;
    });
    builder.addCase(userLogout.fulfilled, (state, action) => {
      console.log("logout user success");

      if (action.payload.success) {
        console.log("logout user success true");
        Cookies.remove("token");
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = {};
        state.error = null;
        state.token = null;
      } else {
        console.log("else condition");
        state.isLoading = false;
        state.error = action.payload.message;
      }
    });
    builder.addCase(userLogout.rejected, (state, action) => {
      console.log("logout user failed");
      state.isLoading = false;
      state.error = action.payload.message;
    });
  },
});

export default userAuthSlice.reducer;
