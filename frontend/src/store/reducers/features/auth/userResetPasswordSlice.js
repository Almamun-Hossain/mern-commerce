import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "../../../../utils/axiosErrorHandler";
const FORGOT_PASSWORD_ENDPOINT =
  "http://localhost:4040/api/v1/user/password/forgot";

const RESET_PASSWORD_ENDPOINT =
  "http://localhost:4040/api/v1/user/password/reset/";

const UPDATE_PASSWORD_ENDPOINT =
  "http://localhost:4040/api/v1//user/password/update";

//send token to reset passowrd
export const sendResetToken = createAsyncThunk(
  "user/send-token",
  async (email) => {
    try {
      let { data } = await axios.post(FORGOT_PASSWORD_ENDPOINT, { email });
      return data;
    } catch (error) {
      return axiosErrorHandler(error);
    }
  }
);

//change forgot password
export const resetPassword = createAsyncThunk(
  "user/reset-paassword",
  async (credential, token) => {
    try {
      let { data } = await axios.put(
        RESET_PASSWORD_ENDPOINT + token,
        credential
      );
      console.log(data);
      return data;
    } catch (error) {
      return axiosErrorHandler(error);
    }
  }
);

//update loged in user password
export const updatePassword = createAsyncThunk(
  "user/update-password",
  async (credential) => {
    try {
      let { data } = await axios.put(UPDATE_PASSWORD_ENDPOINT, credential, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return axiosErrorHandler(error);
    }
  }
);

const userResetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState: {
    isLoading: false,
    error: null,
    message: null,
  },
  extraReducers: (builder) => {
    //send reset password token
    builder.addCase(sendResetToken.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.message = null;
    });
    builder.addCase(sendResetToken.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.isLoading = false;
        state.message = action.payload.message;
      } else {
        state.isLoading = false;
        state.error = action.payload.message;
      }
    });
    builder.addCase(sendResetToken.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    });

    //reset password
    builder.addCase(resetPassword.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.message = null;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.isLoading = false;
        state.message = "Password Updated Successfully!!";
      } else {
        state.isLoading = false;
        state.error = action.payload.message;
      }
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    });

    //update password
    builder.addCase(updatePassword.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.message = null;
    });
    builder.addCase(updatePassword.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.isLoading = false;
        state.message = action.payload.message;
      } else {
        state.isLoading = false;
        state.error = action.payload.message;
      }
    });
    builder.addCase(updatePassword.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    });
  },
});

export const passwordResetState = (state) => state.resetPassword;

export default userResetPasswordSlice.reducer;
