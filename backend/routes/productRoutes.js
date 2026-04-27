const express = require('express');
const router = express.Router();
const {
    addProduct,
    removeProduct,
    getAllProducts,
    newCollection,
    popularInWomen
} = require('../controllers/productController');

// API for adding product
router.post('/addproduct', addProduct);

// API for removing product
router.post('/removeproduct', removeProduct);

// API for getting all products
router.get('/allproducts', getAllProducts);

// API for new collection data
router.get('/newcollection', newCollection);

// API for popular in women section
router.get('/popularinwomen', popularInWomen);

module.exports = router;
