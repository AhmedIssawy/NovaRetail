import mongoose from 'mongoose';

const category_Schema = mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
},{
    timestamps: true,
})


const Category = mongoose.model("Category", category_Schema);


export default Category;