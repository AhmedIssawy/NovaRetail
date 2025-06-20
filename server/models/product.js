const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const productSchmea = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: [{
      type:Schema.Types.ObjectId,
      ref: 'Category',
    }],
    store:[{
        type: Schema.Types.ObjectId,
        ref: 'Store',
    }],
    price: {
        type: Number,
        required: true,
    },
    lowStockThreshold: {
        type: Number,
        required: true,
    }
    ,img:{
        type: String,
        required: false,
    }
},{timestamps: true})


const Proudct = mongoose.model("Proudct", productSchmea);

module.exports = Proudct;