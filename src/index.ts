import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Order from "./models/Order";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

// підключення MongoDB
const mongoUri = process.env.MONGO_URI;
if (mongoUri) {
  mongoose
    .connect(mongoUri)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));
} else {
  console.log("⚠️ No MONGO_URI provided, skipping DB connection");
}

// тестовий роут
app.get("/", (req, res) => {
  res.send("🌸 Flower Delivery Backend is running!");
});

//  створення замовлення
app.post("/order", async (req, res) => {
  try {
    const { email, phone, address, products } = req.body;

    if (!email || !phone || !address || !products || products.length === 0) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // підрахунок загальної суми
    const total = products.reduce(
      (acc: number, item: { price: number; quantity: number }) =>
        acc + item.price * item.quantity,
      0
    );

    const newOrder = new Order({
      email,
      phone,
      address,
      products,
      total
    });

    await newOrder.save();

    res.status(201).json({
      message: "✅ Order created successfully",
      orderId: newOrder._id,
      total: newOrder.total
    });
  } catch (err) {
    console.error("❌ Error creating order:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 📋 отримати всі замовлення (для перевірки)
app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server started on port ${port}`);
});
