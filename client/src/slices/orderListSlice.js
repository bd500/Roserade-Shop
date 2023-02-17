import axios from "axios";
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const getMyOrders = createAsyncThunk("getMyOrders,", async () => {
    const currentUser = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
        },
    };

    const {data} = await axios.get(`/api/orders/myorders`, config);
    return data;
});

const initialState = {
    orders: [],
    error: "",
    loading: false,
};

const orderListSlice = createSlice({
    name: "orderList",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMyOrders.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getMyOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        });
        builder.addCase(getMyOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
    },
});

const {reducer} = orderListSlice;
export default reducer;
export {getMyOrders};
