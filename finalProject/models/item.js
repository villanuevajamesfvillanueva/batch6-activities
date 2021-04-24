const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//define schema
const itemSchema = new Schema({
    //no need for id since mongodb has an auto-generated one
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    src: {
        type: String,
        required: true
    },
    carousel_src: {
        type: Array,
        required: false
    },
    desc: {
        type: String,
        required: true
    },
    route: {
        type: String,
        required: true
    }
}, { timestamps: true });

//create model based on the schema
//first param is singular of collection name in db
module.exports = mongoose.model('shop_item', itemSchema);