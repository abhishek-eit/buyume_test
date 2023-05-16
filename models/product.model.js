const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: String,
    quantity: Number
})

module.exports = mongoose.model("Products", productSchema);