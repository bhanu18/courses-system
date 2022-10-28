import mongoose from "mongoose";

const categoriesSchema = mongoose.Schema({
    Category_name: {
        type:String
    }
});

const Categories = mongoose.model('Categories', categoriesSchema);

export default Categories;