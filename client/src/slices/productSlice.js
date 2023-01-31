import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const fetchProducts = createAsyncThunk(
    "products/fetchAllProducts",
    async () => {
        const {data} = await axios.get(`/api/products`);
        return data;
    }
);

const initialState = {
    loading: false,
    products: [],
    error: "",
};

const productSlice = createSlice({
    name: "products",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true;
            console.log(state);
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
            state.error = "";
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

const {reducer, action} = productSlice;
export default reducer;
export {fetchProducts};
