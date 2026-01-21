import { Product } from "../models/product.models";
import { InventoryLog } from "../models/inventryLog.models";

  export const updateProductStock = async (
  productId: string,
  quantityChange: number,
  reason: string,
  orderId?: string
) => {
  let updatedProduct;

  if (quantityChange < 0) {
    updatedProduct = await Product.findOneAndUpdate(
      {
        _id: productId,
        stock: { $gte: Math.abs(quantityChange) },
      },
      {
        $inc: { stock: quantityChange },
      },
      { new: true }
    );

    if (!updatedProduct) {
      throw new Error("Insufficient stock");
    }
  }

  else {
    updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        $inc: { stock: quantityChange },
      },
      { new: true }
    );

    if (!updatedProduct) {
      throw new Error("Product not found");
    }
  }

  try {
    await InventoryLog.create({
      productId,
      quantityChange,
      reason,
      ...(orderId && { orderId }),
    });
  } catch (err) {
    console.error("Inventory log failed", err);
  }

  return updatedProduct;
};

