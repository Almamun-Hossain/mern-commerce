import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "../../../../utils/axiosErrorHandler";

const ADDRESS_ENDPOINT = "http://localhost:4040/api/v1/address/";

//fetch user all address
export const fetchUserAddress = createAsyncThunk(
  "user/fetchAddress",
  async () => {
    try {
      let { data } = await axios.get(ADDRESS_ENDPOINT, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return axiosErrorHandler(error);
    }
  }
);

/**
 * Add user new business address
 * this function should pass a address object
 */
export const addNewAddress = createAsyncThunk(
  "user/addAddress",
  async (formData) => {
    try {
      let { data } = await axios.post(ADDRESS_ENDPOINT, formData, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return axiosErrorHandler(error);
    }
  }
);

/**
 * Creating address slice as it will perform like reducer
 * Responsible to add new address, upadte address, delete address, load address
 * for authenticate user.
 */
const addressSlice = createSlice({
  name: "address",
  initialState: { isLoading: false, addresses: [], error: null, message: null },
  extraReducers: (builder) => {
    /**
     * Builder for fetch user address data
     * and then store the data on redux store
     */
    builder.addCase(fetchUserAddress.pending, (state, action) => {
      state = { ...state, isLoading: true, message: null, error: null };
    });
    builder.addCase(fetchUserAddress.fulfilled, (state, action) => {
      state.isLoading = false;
      state.addresses = action.payload.addresses;
      state.message = "Address Loaded Successfully";
    });
    builder.addCase(fetchUserAddress.rejected, (state, action) => {
      state.isLoading = false;
      state.message = null;
      state.error = "Operatin failed with unknown error";
    });

    /**
     * Builder for add new address
     * and then update store data
     */
    builder.addCase(addNewAddress.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
      state.message = null;
    });
    builder.addCase(addNewAddress.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.success) {
        let newdata = action.payload.address;
        state.addresses = [...state.addresses, { ...newdata }];
        state.message = "New address added successfully";
      } else {
        state.error = "Something wrong to add new address";
      }
    });
    builder.addCase(addNewAddress.rejected, (state, action) => {
      state.isLoading = false;
      state.message = null;
      state.error = "Operatin failed with unknown error";
    });
  },
});

export const addressState = (state) => state.addresses;
export default addressSlice.reducer;
