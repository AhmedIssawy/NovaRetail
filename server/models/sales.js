const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const sale_Schema =  new mongoose.Schema({

    total_amount: {
        type: Number,
        required: true,
    },
    status:{
        type: String,
        enum: ['Placed', 'refunded'],
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    store:{
        type: [Schema.Types.ObjectId],
        ref: 'Store',
    },
    products:[{
      type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    }],
    edited_at:{
        type: Date,
        default: Date.now,
    }

},{timestamps: true})
const Sale = mongoose.model("Sale",sale_Schema)
module.exports = Sale;