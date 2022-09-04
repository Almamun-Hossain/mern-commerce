import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const REGISTER_ENDPOINT = "http://localhost:4040/api/v1/user/register";

export const userRegister = createAsyncThunk("user/register", async (user) => {
  await axios.post(REGISTER_ENDPOINT, user).then((res) => {
    return { payload: res.data };
  });
});

const userRegisterSlice = createSlice({
  name: "register",
  initialState: { isLoading: false, uesr: {}, token: null, error: null },
  extraReducers: (builder) => {
    builder.addCase(userRegister.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userRegister.fulfilled, (state, action) => {
      //console.log(action);

      console.log("here is success");
      console.log(action);
      // if (action.payload.success) {
      //   state.isLoading = false;
      //   state.user = action.payload.user;
      //   state.error = null;
      // }
    });
    builder.addCase(userRegister.rejected, (state, action) => {
      console.log("here is error");
      console.log(action);
      console.log(state);
      // state.isLoading = false;
      // state.user = {};
      // state.error = action.payload.message;
    });
  },
});

export default userRegisterSlice.reducer;
