import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const POST_ENDPOINT = "http://localhost:4040/api/v1/products";

export const fetchAllProducts = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const res = await axios.get(POST_ENDPOINT);
    return res.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: { isLoading: true, products: [], error: null },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.isLoading = false;
        state.products = action.payload.products;
        state.error = null;
      }
    });
    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.products = [];
      state.error = action.error.message;
    });
  },
});
export default productSlice.reducer;
