const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    sizes: {
        type: [String],
        default: ["S", "M", "L", "XL", "XXL"],
    },
    new_price: {
        type: Number,
    },
    old_price: {
        type: Number,
    },
    pricePerDay: {
        type: Number,
        default: 0,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
    stock: {
        type: Number,
        default: 1,
    },
});

module.exports = mongoose.model("Product", ProductSchema);
