import mongoose, { Schema } from "mongoose";

export type OrderStatus =
  | "PLACED"
  | "CONFIRMED"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export interface OrderDocument {
  userId: mongoose.Types.ObjectId ;
  productId: mongoose.Types.ObjectId;
  quantity: number;
  status: OrderStatus;
}

const orderSchema = new Schema<OrderDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref:"User",
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    status: {
      type: String,
      enum: ["PLACED", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model<OrderDocument>("Order", orderSchema);
