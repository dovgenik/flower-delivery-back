import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error(err));

app.use(express.json());

// приклад ендпоінту
app.get("/", (req, res) => {
  res.send("Flower Delivery Backend is running!");
});

app.listen(port, () => {
  console.log(` Server started on port ${port}`);
});