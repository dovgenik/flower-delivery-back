import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  email: string;
  phone: string;
  address: string;
  products: { name: string; price: number; quantity: number }[];
  total: number;
  createdAt: Date;
}

const OrderSchema: Schema = new Schema({
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  products: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true }
    }
  ],
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IOrder>("Order", OrderSchema);
