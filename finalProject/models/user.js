const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//define schema
const userSchema = new Schema({
    //no need for id since mongodb has an auto-generated one
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    }
}, { timestamps: true });

//create model based on the schema
//first param is singular of collection name in db 
module.exports = mongoose.model('User', userSchema);