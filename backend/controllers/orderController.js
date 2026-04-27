const Order = require('../models/Order');
const User = require('../models/User');

// POST /orders/placeorder
const placeOrder = async (req, res) => {
    try {
        console.log("Order placement attempt from user:", req.user.id);
        const { products, totalAmount } = req.body;
        console.log("Products in order:", JSON.stringify(products, null, 2));

        const order = new Order({
            userId: req.user.id,
            products: products,
            totalAmount: totalAmount,
            paymentStatus: "Pending",
            orderStatus: "Booked"
        });

        await order.save();

        // Clear user cart after placing order
        await User.findByIdAndUpdate(req.user.id, { cartData: [] });

        res.json({
            success: true,
            message: "Order placed successfully",
            orderId: order._id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error placing order" });
    }
};

// GET /orders/myorders
const myOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id }).sort({ date: -1 });
        res.json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching orders" });
    }
};

// GET /orders/allorders  (Admin)
const allOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('userId', 'name email').sort({ date: -1 });
        res.json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching all orders" });
    }
};

// POST /orders/updateorderstatus  (Admin)
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await Order.findByIdAndUpdate(orderId, { orderStatus: status });
        res.json({ success: true, message: "Order status updated" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating status" });
    }
};

module.exports = { placeOrder, myOrders, allOrders, updateOrderStatus };
