import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const fetchSingleProduct = createAsyncThunk(
    "products/fetchProductById",
    async (id) => {
        console.log(id);
        const {data} = await axios.get(`/api/products/${id}`);
        return data;
    }
);

const initialState = {
    loading: false,
    product: {},
    error: "",
};

const productDetailsSlice = createSlice({
    name: "productDetails",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSingleProduct.pending, (state) => {
            state.loading = true;
            console.log(state);
        });
        builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload;
            state.error = "";
        });
        builder.addCase(fetchSingleProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

const {reducer, action} = productDetailsSlice;
export default reducer;
export {fetchSingleProduct};
