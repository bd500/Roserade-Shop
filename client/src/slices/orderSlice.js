import axios from "axios";
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const createOrder = createAsyncThunk(
    "createNewOrder",
    async ({
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
    }) => {
        const currentUser = JSON.parse(localStorage.getItem("userInfo"));

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${currentUser.token}`,
            },
        };
        const {data} = await axios
            .post(
                `/api/orders`,
                {
                    orderItems,
                    shippingAddress,
                    paymentMethod,
                    itemsPrice,
                    taxPrice,
                    shippingPrice,
                    totalPrice,
                },
                config
            )
            .catch((err) => console.log(err));
        return data;
    }
);

const getOrderById = createAsyncThunk("getOrderById", async (id) => {
    const currentUser = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
        },
    };

    const {data} = await axios
        .get(`/api/orders/${id}`, config)
        .catch((err) => console.log(err));
    return data;
});

const initialState = {
    success: false,
    order: {},
    error: "",
    loading: false,
};

const orderSlice = createSlice({
    name: "order",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createOrder.pending, (state) => {
            state.success = false;
        });
        builder.addCase(createOrder.fulfilled, (state, action) => {
            state.success = true;
            state.order = action.payload;
            state.error = "";
        });
        builder.addCase(createOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        builder.addCase(getOrderById.pending, (state) => {
            state.loading = true;
            state.order = {};
            state.error = "";
        });
        builder.addCase(getOrderById.fulfilled, (state, action) => {
            state.loading = false;
            state.order = action.payload;
            state.error = "";
        });
        builder.addCase(getOrderById.rejected, (state, action) => {
            state.loading = false;
            state.order = {};
            state.error = action.error;
        });
    },
});

const {reducer, action} = orderSlice;
export default reducer;
export {createOrder, getOrderById};
