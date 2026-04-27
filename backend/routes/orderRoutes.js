const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/auth');
const {
    placeOrder,
    myOrders,
    allOrders,
    updateOrderStatus
} = require('../controllers/orderController');

// API for creating an order (Booking)
router.post('/placeorder', fetchUser, placeOrder);

// API for getting user orders
router.get('/myorders', fetchUser, myOrders);

// API for admin to get all orders
router.get('/allorders', allOrders);

// API for admin to update order status
router.post('/updateorderstatus', updateOrderStatus);

module.exports = router;
