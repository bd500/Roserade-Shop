import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    cartItem: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addItemToCart: (state, action) => {
            state.cartItem.push(action.payload);
            console.log(action.payload);
        },
        removeItem: (state, action) => {
            state.cartItem = state.cartItem.filter(
                (item) => item.product._id !== action.payload
            );
        },
    },
});

const {reducer, actions} = cartSlice;
export default reducer;
export const {addItemToCart, removeItem} = actions;
