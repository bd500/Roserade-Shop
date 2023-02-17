import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) res.json(product);
    else {
        res.status(404);
        throw new Error("Product not found");
    }
});

//Private Routes
//ACCESS: ADMIN

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.remove();
        res.json({message: "Product removed"});
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

const createProduct = asyncHandler(async (req, res) => {
    const {name, price, description, image, brand, category, countInStock} =
        req.body;

    const product = await Product.create({
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
        user: req.user._id,
    });

    if (product) {
        res.json(product);
    } else {
        res.status(401);
        throw new Error("Invalid product data");
    }
});

const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    const {name, price, description, image, brand, category, countInStock} =
        req.body;

    if (product) {
        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;
        product.image = image || product.image;
        product.brand = brand || product.brand;
        product.category = category || product.category;
        product.countInStock = countInStock || product.countInStock;

        const updatedProduct = await product.save();

        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

export {
    getProducts,
    getProductById,
    deleteProduct,
    updateProduct,
    createProduct,
};
