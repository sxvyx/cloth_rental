const Payment = require('../models/Payment');
const Order = require('../models/Order');
const crypto = require('crypto');
const Razorpay = require('razorpay');

// Initialize Razorpay instance once (module-level singleton)
let razorpayInstance = null;
try {
    if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
        razorpayInstance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
    }
} catch (error) {
    console.error("Error initializing Razorpay:", error);
}

// Helper: Generate a unique transaction ID
const generateTransactionId = () => {
    return 'TXN_' + Date.now() + '_' + crypto.randomBytes(4).toString('hex').toUpperCase();
};

// POST /payments/createpayment
const createPayment = async (req, res) => {
    try {
        const { orderId, amount, method } = req.body;

        // Check if order exists and belongs to this user
        const order = await Order.findOne({ _id: orderId, userId: req.user.id });
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        // Check if payment already exists for this order
        const existingPayment = await Payment.findOne({ orderId: orderId });
        if (existingPayment) {
            return res.status(400).json({ success: false, message: "Payment already exists for this order" });
        }

        const transactionId = generateTransactionId();

        const payment = new Payment({
            transactionId: transactionId,
            orderId: orderId,
            userId: req.user.id,
            amount: amount,
            method: method,
            status: "Completed",  // Mock payment - auto complete
        });

        await payment.save();

        // Update order payment status to Paid
        await Order.findByIdAndUpdate(orderId, { paymentStatus: "Paid" });

        res.json({
            success: true,
            message: "Payment successful",
            transactionId: transactionId,
            paymentId: payment._id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Payment processing error" });
    }
};

// POST /payments/create-order  (Razorpay)
const createRazorpayOrder = async (req, res) => {
    try {
        if (!razorpayInstance) {
            return res.status(500).json({ success: false, message: "Razorpay not configured" });
        }

        const { amount, currency, receipt } = req.body;

        // Validate amount >= 100 paise
        if (!amount || amount < 100) {
            return res.status(400).json({ success: false, message: "Invalid amount. Must be >= 100 paise." });
        }

        const options = {
            amount: amount,
            currency: currency || "INR",
            receipt: receipt || "receipt_" + Date.now()
        };

        const order = await razorpayInstance.orders.create(options);
        res.json({ success: true, order_id: order.id, amount: order.amount, currency: order.currency });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error creating Razorpay order" });
    }
};

// POST /payments/verify-payment  (Razorpay signature verification)
const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ success: false, message: "Missing required fields for verification" });
        }

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
                                        .update(body.toString())
                                        .digest('hex');

        if (expectedSignature === razorpay_signature) {
            // Signatures match — mark the order as paid
            if (orderId) {
                await Order.findByIdAndUpdate(orderId, { paymentStatus: "Paid" });

                // Create payment record if it doesn't exist
                const existingPayment = await Payment.findOne({ orderId: orderId });
                if (!existingPayment) {
                    const payment = new Payment({
                        transactionId: razorpay_payment_id,
                        orderId: orderId,
                        userId: req.user.id,
                        amount: 0,
                        method: "Razorpay",
                        status: "Completed",
                    });
                    await payment.save();
                }
            }

            res.json({ success: true, message: "Payment verified successfully" });
        } else {
            res.status(400).json({ success: false, message: "Invalid signature" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error verifying payment signature" });
    }
};

// GET /payments/orderpayment/:orderId
const getOrderPayment = async (req, res) => {
    try {
        const payment = await Payment.findOne({ orderId: req.params.orderId });
        if (!payment) {
            return res.status(404).json({ success: false, message: "No payment found for this order" });
        }
        res.json({ success: true, payment });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching payment" });
    }
};

// GET /payments/mypayments
const myPayments = async (req, res) => {
    try {
        const payments = await Payment.find({ userId: req.user.id })
            .populate('orderId')
            .sort({ date: -1 });
        res.json({ success: true, payments });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching payments" });
    }
};

// GET /payments/allpayments  (Admin)
const allPayments = async (req, res) => {
    try {
        const payments = await Payment.find({})
            .populate('orderId')
            .populate('userId', 'name email')
            .sort({ date: -1 });
        res.json({ success: true, payments });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching all payments" });
    }
};

module.exports = {
    createPayment,
    createRazorpayOrder,
    verifyPayment,
    getOrderPayment,
    myPayments,
    allPayments
};
