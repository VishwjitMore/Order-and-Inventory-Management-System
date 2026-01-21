import { Order, OrderStatus } from "../models/order.models";
import { updateProductStock } from "./inventry.services";

export const placeOrderService = async (
    userId: string,
    productId: string,
    quantity: number
) => {

    if (quantity <= 0) {
        throw new Error("Quantity must be greater than 0");
    }
    const order = await Order.create({
        userId,
        productId,
        quantity,
        status: "PLACED",
    });

    try {
        await updateProductStock(
            productId,
            -quantity,
            "ORDER_PLACED",
            order._id.toString()
        );
    } catch (err) {
        await Order.findByIdAndDelete(order._id);
        throw err;
    }

    return order;
};


const allowedTransitions: Record<OrderStatus, OrderStatus[]> = {
    PLACED: ["CONFIRMED", "CANCELLED"],
    CONFIRMED: ["SHIPPED", "CANCELLED"],
    SHIPPED: ["DELIVERED"],
    DELIVERED: [],
    CANCELLED: [],
};

const validStatuses: OrderStatus[] = [
    "PLACED",
    "CONFIRMED",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
];


export const updateOrderStatusService = async (
    orderId: string,
    newStatus: OrderStatus,
    actor: { userId: string; role: "USER" | "ADMIN" }
) => {
    const order = await Order.findById(orderId);

    if (!order) {
        throw new Error("Order not found");
    }

    if (!validStatuses.includes(newStatus)) {
        throw new Error("Invalid order status");
    }

    const currentStatus = order.status;

    if (order.status === newStatus) {
        return order;
    }


    if (!allowedTransitions[currentStatus].includes(newStatus)) {
        throw new Error(
            `Invalid transition from ${currentStatus} to ${newStatus}`
        );
    }

    if (
        newStatus === "CANCELLED" &&
        order.userId.toString() !== actor.userId
    ) {
        throw new Error("You can only cancel your own order");
    }


    if (newStatus === "CANCELLED") {
        await updateProductStock(
            order.productId.toString(),
            order.quantity,
            "ORDER_CANCELLED",
            order._id.toString()
        );
    }

    order.status = newStatus;
    await order.save();
    return order;
}