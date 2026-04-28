const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/auth');
const {
    signup,
    login,
    addToCart,
    removeFromCart,
    getCart,
    getAllUsers
} = require('../controllers/userController');

// Endpoint for registering the user
router.post('/signup', signup);

// Endpoint for user login
router.post('/login', login);

// Endpoint for adding products in cart data
router.post('/addtocart', fetchUser, addToCart);

// Endpoint to remove product from cart data
router.post('/removefromcart', fetchUser, removeFromCart);

// Endpoint to get cart data
router.post('/getcart', fetchUser, getCart);

// Endpoint to get all users (Admin only)
router.get('/allusers', getAllUsers);

module.exports = router;
