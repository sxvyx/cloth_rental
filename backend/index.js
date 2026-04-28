const port = process.env.PORT || 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require('dotenv').config();

app.use(express.json());
app.use(cors());

// Database Connection with MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err.message));


// API Creation
app.get("/", (req, res) => {
    res.send("Express App is running")
});

// Image storage endpoint
app.use('/images', express.static('upload/images'));

// Import Routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// Use Routes - POST REQ
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use('/payments', paymentRoutes);

// Cloudinary Configuration
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Image Upload Endpoint
const multer = require("multer");
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'cloth-rental',
        allowed_formats: ['jpg', 'png', 'jpeg'],
    },
});
const upload = multer({ storage: storage });

app.post("/upload", upload.single('product'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: 0, error: "No file uploaded" });
    }
    res.json({
        success: 1,
        image_url: req.file.path,
    });
});

app.listen(port, (error) => {





    
    if (!error) {
        console.log("Server running on port " + port)
    } else {
        console.log("Error: " + error)
    }
});
