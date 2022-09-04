import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const POST_ENDPOINT = "http://localhost:4040/api/v1/product/";

export const fetchProductDetails = createAsyncThunk(
  "user/fetchProductDetails",
  async (id) => {
    const res = await axios.get(POST_ENDPOINT + id);
    return res.data;
  }
);

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: { isLoading: true, productDetails: {}, error: null },
  extraReducers: (builder) => {
    builder.addCase(fetchProductDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProductDetails.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.isLoading = false;
        state.productDetails = action.payload.product;
        state.error = null;
      }
    });
    builder.addCase(fetchProductDetails.rejected, (state, action) => {
      state.isLoading = false;
      state.productDetails = {};
      state.error = action.error.message;
    });
  },
});
export default productDetailsSlice.reducer;
