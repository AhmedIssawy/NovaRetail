import mongoose from 'mongoose';

const StoreShema = mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
},{timestamps: true});


const Store = mongoose.model("Store",StoreShema);

export default Store;