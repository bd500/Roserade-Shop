import {configureStore} from "@reduxjs/toolkit";
import productDetailsReducer from "./slices/productDetailsSlice";
import reducer from "./slices/productSlice";

const rootReducer = {
    productsList: reducer,
    productDetails: productDetailsReducer,
};

const store = configureStore({reducer: rootReducer});

export default store;
