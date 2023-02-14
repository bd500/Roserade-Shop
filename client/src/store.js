import {configureStore} from "@reduxjs/toolkit";
import productDetailsReducer from "./slices/productDetailsSlice";
import reducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import loginReducer from "./slices/loginSlice";
import signupSlice from "./slices/signupSlice";
import userDetailsReducer from "./slices/userDetailsSlice";
import orderReducer from "./slices/orderSlice";

const rootReducer = {
    productsList: reducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    login: loginReducer,
    signup: signupSlice,
    userDetails: userDetailsReducer,
    order: orderReducer,
};

const store = configureStore({reducer: rootReducer});

export default store;
