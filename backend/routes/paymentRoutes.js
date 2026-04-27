const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/auth');
const {
    createPayment,
    createRazorpayOrder,
    verifyPayment,
    getOrderPayment,
    myPayments,
    allPayments
} = require('../controllers/paymentController');

// Create a payment for an order (mock)
router.post('/createpayment', fetchUser, createPayment);

// Razorpay: Create Order
router.post('/create-order', fetchUser, createRazorpayOrder);

// Razorpay: Verify Signature
router.post('/verify-payment', fetchUser, verifyPayment);

// Get payment details for an order
router.get('/orderpayment/:orderId', fetchUser, getOrderPayment);

// Get all payments for current user
router.get('/mypayments', fetchUser, myPayments);

// Admin: Get all payments
router.get('/allpayments', allPayments);

module.exports = router;
