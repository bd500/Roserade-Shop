import {configureStore} from "@reduxjs/toolkit";
import productDetailsReducer from "./slices/productDetailsSlice";
import reducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";

const rootReducer = {
    productsList: reducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
};

const store = configureStore({reducer: rootReducer});

export default store;
