import mongoose from "mongoose";

const brandSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    url: {
        type: String,
        require: true,
    },
});

const Brand = mongoose.model("Brand", brandSchema);

export default Brand;
