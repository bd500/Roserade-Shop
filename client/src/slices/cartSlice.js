import {createSlice} from "@reduxjs/toolkit";

const currentCart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

const shippingAdd = localStorage.getItem("shipping")
    ? JSON.parse(localStorage.getItem("shipping"))
    : null;

const paymentMethod = localStorage.getItem("payment")
    ? JSON.parse(localStorage.getItem("payment"))
    : null;

const initialState = {
    cartItem: currentCart,
    shipping: shippingAdd,
    payment: paymentMethod,
};

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addItemToCart: (state, action) => {
            state.cartItem.push(action.payload);
            console.log(action.payload);
            localStorage.setItem("cart", JSON.stringify(state.cartItem));
        },
        removeItem: (state, action) => {
            state.cartItem = state.cartItem.filter(
                (item) => item.product._id !== action.payload
            );
            localStorage.setItem("cart", JSON.stringify(state.cartItem));
        },
        saveShippingAddress: (state, action) => {
            state.shipping = action.payload;
            localStorage.setItem("shipping", JSON.stringify(action.payload));
        },
        savePaymentMethod: (state, action) => {
            state.payment = action.payload;
            localStorage.setItem("payment", JSON.stringify(action.payload));
        },
    },
});

const {reducer, actions} = cartSlice;
export default reducer;
export const {
    addItemToCart,
    removeItem,
    saveShippingAddress,
    savePaymentMethod,
} = actions;
