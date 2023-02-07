import {createSlice} from "@reduxjs/toolkit";

const currentCart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : null;

const initialState = {
    cartItem: currentCart,
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
    },
});

const {reducer, actions} = cartSlice;
export default reducer;
export const {addItemToCart, removeItem} = actions;
