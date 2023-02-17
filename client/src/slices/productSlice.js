import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const currentUser = JSON.parse(localStorage.getItem("userInfo"));

const fetchProducts = createAsyncThunk(
    "products/fetchAllProducts",
    async () => {
        const {data} = await axios
            .get(`/api/products`)
            .catch((err) => console.log(err.message));
        return data;
    }
);

const fetchProductById = createAsyncThunk(
    "products/getProductById",
    async (id) => {
        const {data} = await axios.get(`/api/products/${id}`);
        return data;
    }
);

const deleteProduct = createAsyncThunk("product/deleteProduct", async (id) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
        },
    };

    const {data} = await axios.delete(`/api/products/${id}`, config);
    return data;
});

const createProduct = createAsyncThunk(
    "product/createProduct",
    async ({
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
    }) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${currentUser.token}`,
            },
        };

        const {data} = await axios.post(
            `/api/products`,
            {
                name,
                price,
                description,
                image,
                brand,
                category,
                countInStock,
            },
            config
        );
        return data;
    }
);

const updateProduct = createAsyncThunk(
    "product/updateProduct",
    async ({
        id,
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
    }) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${currentUser.token}`,
            },
        };

        const {data} = await axios.put(
            `/api/products/${id}`,
            {
                name,
                price,
                description,
                image,
                brand,
                category,
                countInStock,
            },
            config
        );
        return data;
    }
);

const initialState = {
    loading: false,
    products: [],
    error: "",
    deleted: false,
    updated: false,
    product: {},
};

const productSlice = createSlice({
    name: "products",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        //PUBLIC
        //get all products
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true;
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
        //get product by id
        builder.addCase(fetchProductById.pending, (state) => {
            state.loading = true;
            console.log(state);
        });
        builder.addCase(fetchProductById.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload;
            state.error = "";
        });
        builder.addCase(fetchProductById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        //For Admin
        //delete product
        builder.addCase(deleteProduct.pending, (state) => {
            state.loading = true;
            console.log(state);
        });
        builder.addCase(deleteProduct.fulfilled, (state) => {
            state.loading = false;
            state.deleted = true;
        });
        builder.addCase(deleteProduct.rejected, (state, action) => {
            state.loading = false;
            state.deleted = false;
            state.error = action.error.message;
        });
        //create product
        builder.addCase(createProduct.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createProduct.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(createProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        //update product
        builder.addCase(updateProduct.pending, (state) => {
            state.loading = true;
            state.updated = false;
        });
        builder.addCase(updateProduct.fulfilled, (state) => {
            state.loading = false;
            state.updated = true;
        });
        builder.addCase(updateProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

const {reducer, action} = productSlice;
export default reducer;
export {
    fetchProducts,
    deleteProduct,
    createProduct,
    fetchProductById,
    updateProduct,
};
