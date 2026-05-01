const Product = require('../models/Product');

// POST /products/addproduct
const addProduct = async (req, res) => {
    try {
        let products = await Product.find({});
        let id;
        if (products.length > 0) {
            let last_product_array = products.slice(-1);
            let last_product = last_product_array[0];
            id = last_product.id + 1;
        } else {
            id = 1;
        }
        const product = new Product({
            id: id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
            pricePerDay: req.body.pricePerDay || 0,
            stock: req.body.stock || 1,
            description: req.body.description || "",
        });
        console.log(product);
        await product.save();
        console.log("Saved");
        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ success: false, message: "Error adding product", error: error.message });
    }
};

// POST /products/removeproduct
const removeProduct = async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name
    });
};

// GET /products/allproducts
const getAllProducts = async (req, res) => {
    let products = await Product.find({});
    console.log("All products fetched");
    res.send(products);
};

// GET /products/newcollection
const newCollection = async (req, res) => {
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("New Collection Fetched");
    res.send(newcollection);
};

// GET /products/popularinwomen
const popularInWomen = async (req, res) => {
    let products = await Product.find({ category: 'women' });
    let popularinwomen = products.slice(0, 4);
    console.log('Popular in women fetched');
    res.send(popularinwomen);
};

// POST /products/updateproduct
const updateProduct = async (req, res) => {
    try {
        const { id, name, category, new_price, old_price, stock, description, available } = req.body;
        await Product.findOneAndUpdate({ id: id }, {
            name,
            category,
            new_price,
            old_price,
            stock,
            description,
            available
        });
        res.json({ success: true, message: "Product updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating product" });
    }
};

module.exports = { addProduct, removeProduct, getAllProducts, newCollection, popularInWomen, updateProduct };
