import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/productRoutes.js";
import {errorHandler, notFound} from "./middleware/errorMiddleware.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import path from "path";

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

dotenv.config();

connectDB();

app.use(cors());

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.get("/api/config/paypal", (req, res) =>
    res.send(process.env.PAYPAL_CLIENT_ID)
);

app.use("/api/products", router);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(
        `Server is running in ${process.env.NODE_ENV} on port ${PORT}.`
    );
});
