import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/productRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();

dotenv.config();

connectDB();

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use("/api/products/", router);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}.`);
});
