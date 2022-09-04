import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const POST_ENDPOINT = "http://localhost:4040/api/v1/user/login";

export const userLogin = createAsyncThunk("user/login", async () => {
  const res = await axios.post(POST_ENDPOINT);
  return res.data;
});

const userAuthSlice = createSlice({
  name: "auth",
  initialState: { isLoading: true, user: {}, error: null },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.isLoading = false;
        state.user = action.payload.user;
        state.error = null;
      }
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.user = {};
      state.error = action.error.message;
    });
  },
});

export default userAuthSlice.reducer;
