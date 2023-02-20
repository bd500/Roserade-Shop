import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 20;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
        ? {
              name: {
                  $regex: req.query.keyword,
                  $options: "i",
              },
          }
        : {};

    const count = await Product.countDocuments({...keyword});
    const products = await Product.find({...keyword})
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    res.json({products, page, pages: Math.ceil(count / pageSize)});
});

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) res.json(product);
    else {
        res.status(404);
        throw new Error("Product not found");
    }
});

const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({rating: -1}).limit(4);

    res.json(products);
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

/*********** */
/***********Review */
const createReview = asyncHandler(async (req, res) => {
    const {rating, comment} = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        const alreadyReviewd = product.reviews.find(
            (r) => r.user.toString() === req.user._id
        );
        if (alreadyReviewd) {
            res.status(404);
            throw new Error("You already reviewd this product.");
        } else {
            const review = {
                name: req.user.name,
                comment,
                rating: Number(rating),
                user: req.user._id,
            };

            product.reviews.push(review);
            product.numReviews = product.reviews.length;
            product.rating =
                product.reviews.reduce((acc, r) => acc + r.rating, 0) /
                product.numReviews;

            await product.save();

            res.json({message: "Review created"});
        }
    } else {
        res.status(401);
        throw new Error("Product not found.");
    }
});

export {
    getProducts,
    getProductById,
    getTopProducts,
    deleteProduct,
    updateProduct,
    createProduct,
    createReview,
};
