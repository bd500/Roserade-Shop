import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const loginUser = createAsyncThunk("loginUser", async ({email, password}) => {
    const config = {
        headers: {
            "Content-Types": "application/json",
        },
    };
    const {data} = await axios.post(`/api/auth`, {email, password}, config);
    return data;
});

const currentUser = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const initialState = {
    loading: false,
    userInfo: currentUser,
    error: "",
};

const loginSlice = createSlice({
    name: "login",
    initialState: initialState,
    reducers: {
        logout: (state) => {
            state.userInfo = null;
            localStorage.clear();
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.userInfo = action.payload;
            state.error = "";
            localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.userInfo = null;
            state.error = action.error.message;
        });
    },
});

const {reducer, actions} = loginSlice;
export default reducer;
export {loginUser};
export const {logout} = actions;
