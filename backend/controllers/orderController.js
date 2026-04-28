const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

// POST /orders/placeorder
const placeOrder = async (req, res) => {
    try {
        console.log("Order placement attempt from user:", req.user.id);
        const { products, totalAmount } = req.body;
        
        // Enrich products with name and image for historical tracking
        const enrichedProducts = await Promise.all(products.map(async (item) => {
            const productInfo = await Product.findOne({ id: item.productId });
            return {
                ...item,
                name: productInfo ? productInfo.name : "Unknown Item",
                image: productInfo ? productInfo.image : "",
                pricePerDay: productInfo ? (productInfo.pricePerDay || productInfo.new_price) : 0
            };
        }));

        const order = new Order({
            userId: req.user.id,
            products: enrichedProducts,
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
        console.error("Place Order Error:", error);
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
        const oldOrder = await Order.findById(orderId);
        const oldStatus = oldOrder.orderStatus;

        await Order.findByIdAndUpdate(orderId, { orderStatus: status });

        // If transitioning TO Rented - Decrease Stock
        if (status === "Rented" && oldStatus !== "Rented") {
            for (let item of oldOrder.products) {
                await Product.findOneAndUpdate({ id: item.productId }, { $inc: { stock: -item.quantity } });
            }
        }

        // If transitioning FROM Rented to Returned/Cancelled - Increase Stock
        if (oldStatus === "Rented" && (status === "Returned" || status === "Cancelled")) {
            for (let item of oldOrder.products) {
                await Product.findOneAndUpdate({ id: item.productId }, { $inc: { stock: item.quantity } });
            }
        }

        res.json({ success: true, message: "Order status updated and inventory adjusted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error updating status" });
    }
};

module.exports = { placeOrder, myOrders, allOrders, updateOrderStatus };
