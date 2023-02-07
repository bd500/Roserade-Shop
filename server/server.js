import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/productRoutes.js";
import {errorHandler, notFound} from "./middleware/errorMiddleware.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

dotenv.config();

connectDB();

app.use(cors());

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use("/api/products", router);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(
        `Server is running in ${process.env.NODE_ENV} on port ${PORT}.`
    );
});
