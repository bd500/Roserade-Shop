import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    url: {
        type: String,
        require: true,
    },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
