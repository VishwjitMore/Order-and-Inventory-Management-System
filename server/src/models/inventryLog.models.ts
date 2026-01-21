import mongoose, { Schema } from "mongoose";

export interface InventoryLogDocument {
  productId: mongoose.Types.ObjectId | string ;
  quantityChange: number;
  reason: string;
  orderId?: mongoose.Types.ObjectId | string;
}
const inventoryLogSchema = new Schema<InventoryLogDocument>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantityChange: {
      type: Number,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  },
  {
    timestamps: true,
  }
);

export const InventoryLog = mongoose.model<InventoryLogDocument>(
  "InventoryLog",
  inventoryLogSchema
);
