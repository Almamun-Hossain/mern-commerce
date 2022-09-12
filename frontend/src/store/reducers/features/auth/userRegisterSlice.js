import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const REGISTER_ENDPOINT = "http://localhost:4040/api/v1/user/register";

export const userRegister = createAsyncThunk("user/register", async (user) => {
  let { data } = await axios.post(REGISTER_ENDPOINT, user);
  console.log("user token is", data);
  return data;
});

export const userLogin = createAsyncThunk(
  "user/login",
  async (email, password) => {
    let { data } = await axios.post(REGISTER_ENDPOINT, { email, password });
    console.log("user token is", data);
    return data;
  }
);

const userRegisterSlice = createSlice({
  name: "register",
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
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = null;
        state.token = action.payload.token;
      } else {
        state.isLoading = false;
        state.user = {};
        state.error = action.payload.message;
        state.token = null;
      }
    });

    builder.addCase(userRegister.rejected, (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.user = {};
      //state.error = action.payload.message;
    });

    builder.addCase(userLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = null;
        state.token = action.payload.token;
      } else {
        state.isLoading = false;
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
  },
});

export default userRegisterSlice.reducer;
