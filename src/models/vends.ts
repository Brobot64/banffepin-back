import mongoose, { Schema, Document } from 'mongoose';
import { dbConnect } from './dbConnection';

export interface IOrder extends Document {
  userId: string;
  cart: {
    denomination: number;
    quantity: number;
    telco: string;
  }[];
}

const orderSchema: Schema = new Schema({
  userId: { type: String, required: true },
  cart: [{
    denomination: { type: Number, required: true },
    quantity: { type: Number, required: true },
    telco: { type: String, required: true }
  }]
}, { timestamps: true });

const Order = dbConnect.model<IOrder>('order', orderSchema);

export default Order;
