const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

const sampleProducts = [
  {
    id: 1,
    name: "Luxury Wedding Sherwani",
    description: "Gold-embroidered premium sherwani for weddings.",
    image: "http://localhost:4000/images/product_1.png",
    category: "men",
    new_price: 5000,
    old_price: 7500,
    pricePerDay: 800,
    available: true,
  },
  {
    id: 2,
    name: "Designer Bridal Lehenga",
    description: "Red silk lehenga with intricate zari work.",
    image: "http://localhost:4000/images/product_2.png",
    category: "women",
    new_price: 8000,
    old_price: 12000,
    pricePerDay: 1200,
    available: true,
  },
  {
    id: 3,
    name: "Classic Tuxedo",
    description: "Sleek black tuxedo for formal events.",
    image: "http://localhost:4000/images/product_3.png",
    category: "men",
    new_price: 3000,
    old_price: 4500,
    pricePerDay: 500,
    available: true,
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB...");

    // Clear existing products
    await Product.deleteMany({});
    console.log("Cleared existing products.");

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log("Database Seeded Successfully!");

    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
