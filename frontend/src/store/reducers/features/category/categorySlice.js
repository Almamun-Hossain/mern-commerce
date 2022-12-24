import axios from "axios";
import { axiosErrorHandler } from "../../../../utils/axiosErrorHandler";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const CATEGORY_API_ENDPOINT = "http://localhost:4040/api/v1/category/";

//fetch all category

export const fetchAllCategory = createAsyncThunk('category/fetchAllCategory', async () => {
    try {
        let { data } = await axios.get(CATEGORY_API_ENDPOINT);
        console.log(data);
        return data;
    } catch (error) {
        return axiosErrorHandler(error)
    }
})

const categorySlice = createSlice({
    name: "category",
    initialState: {
        isLoading: false,
        categories: [],
        error: null,
        message: null,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllCategory.pending, (state) => {
            state.isLoading = true;
            state.error = null;
            state.message = null;
        });
        builder.addCase(fetchAllCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            if (action.payload.success) {
                state.categories = action.payload.categories
                state.message = null;
            } else {

                state.error = null;
            }

        });
        builder.addCase(fetchAllCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.categories = [];
            state.error = action.error.message;
        });
    }
})


export default categorySlice.reducer;