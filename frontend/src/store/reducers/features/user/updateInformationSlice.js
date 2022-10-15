import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "../../../../utils/axiosErrorHandler";
const USERINFO_UPDATE_ENDPOINT =
  "http://localhost:4040/api/v1/user/info/update";

//function to update the user information
const udpateUserInformation = createAsyncThunk(
  "user/update",
  async (updateData) => {
    try {
      let { data } = await axios.put(USERINFO_UPDATE_ENDPOINT, updateData, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      // handle error if api request failed.
      return axiosErrorHandler(error);
    }
  }
);

const updateInformationSlice = createSlice({
  name: "updateslice",
  initailState: { isLoading: true, message: null, error: null },
  extraReducers: (builder) => {
    builder.addCase(udpateUserInformation.pending, (state) => {
      state.isLoading = true;
      state.message = null;
      state.error = null;
    });
    builder.addCase(udpateUserInformation.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.success) {
        state.message = action.payload.message;
      } else {
        state.error = action.payload.message;
      }
    });
    builder.addCase(udpateUserInformation.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    });
  },
});

export const udpateState = (state) => state.updateslice;
export default updateInformationSlice;
