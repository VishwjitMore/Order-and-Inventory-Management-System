import { Request, Response } from "express";
import { OrderStatus } from "../models/order.models";
import { assertString } from "../utils/errors";
import { placeOrderService } from "../services/order.services";
import { updateOrderStatusService } from "../services/order.services";
import mongoose from "mongoose";
import { Order } from "../models/order.models";
import { updateProductStock } from "../services/inventry.services";

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find()
      .populate("productId", "name price imageUrl")
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    const formattedOrders = orders.map((order) => ({
      _id: order._id,
      quantity: order.quantity,
      status: order.status,
      product: {
        name: (order.productId as any).name,
        price: (order.productId as any).price,
        imageUrl: (order.productId as any).imageUrl,
      },
      user: {
        name: (order.userId as any).name,
        email: (order.userId as any).email,
      },
    }));

    res.json({ orders: formattedOrders });
  } catch {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};


export const cancelMyOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.userId.toString() !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    if (order.status === "SHIPPED" || order.status === "DELIVERED") {
  return res
    .status(400)
    .json({ message: "Order cannot be cancelled after shipping" });
}

    order.status = "CANCELLED";
    await order.save();

    await updateProductStock(
      order.productId.toString(),
      order.quantity,
      "ORDER_CANCELLED",
      order._id.toString()
    );

    res.json({ message: "Order cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to cancel order" });
  }
};

export const getMyOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;

    const orders = await Order.find({ userId })
      .populate("productId", "name price imageUrl")
      .sort({ createdAt: -1 });

    const formattedOrders = orders.map((order) => ({
      _id: order._id,
      quantity: order.quantity,
      status: order.status,
      product: order.productId
        ? {
            name: (order.productId as any).name,
            price: (order.productId as any).price,
            imageUrl: (order.productId as any).imageUrl,
          }
        : null,
    }));

    res.status(200).json({ orders: formattedOrders });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

export const placeOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { productId, quantity } = req.body;

    if (!userId || !productId || !quantity) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const order = await placeOrderService(
      userId,
      productId,
      quantity
    );

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message || "Failed to place order",
    });
  }
};

export const updateOrderStatus = async (
  req: Request,
  res: Response
) => {
  try {

    const id = assertString(req.params.id, "Order id is required");

    const { status } = req.body as { status: OrderStatus };

    if (!status) {
      return res.status(400).json({
        message: "Status is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid order id",
      });
    }

    const order = await updateOrderStatusService(id, status, {
      userId: req.user!.userId,
      role: req.user!.role,
    });

    res.status(200).json({
      message: "Order status updated",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update order status",
    });
  }
};