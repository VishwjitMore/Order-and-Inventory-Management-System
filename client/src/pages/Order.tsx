import { useEffect, useState } from "react";
import api from "../services/Api";

interface Order {
  _id: string;
  quantity: number;
  status: "PLACED" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  product: {
    name: string;
    price: number;
    imageUrl: string;
  };
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders/my");
        setOrders(res.data.orders ?? res.data);
      } catch (err) {
        console.error("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const cancelOrder = async (orderId: string) => {
    try {
      await api.patch(`/orders/${orderId}/cancel`, {
        status: "CANCELLED",
      });

      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, status: "CANCELLED" } : o
        )
      );
    } catch (err: any) {
      alert(err.response?.data?.message || "Cancel failed");
    }
  };

  if (loading) {
    return <p className="text-white">Loading orders...</p>;
  }

  return (
    <div>
      <h2 className="mb-8 text-3xl font-bold text-white">
        My Orders
      </h2>

      {orders.length === 0 && (
        <p className="text-white/80">No orders yet.</p>
      )}

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="flex gap-6 rounded-2xl bg-white p-6 shadow-xl"
          >
            <img
              src={order.product.imageUrl}
              alt={order.product.name}
              className="h-24 w-24 rounded-xl object-cover"
            />

            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">
                {order.product.name}
              </h3>

              <p className="text-sm text-gray-600">
                Quantity: {order.quantity}
              </p>

              <p className="text-sm text-gray-600">
                Total: ₹ {order.quantity * order.product.price}
              </p>

              <span
                className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium ${order.status === "PLACED"
                    ? "bg-yellow-100 text-yellow-700"
                    : order.status === "CONFIRMED"
                      ? "bg-blue-100 text-blue-700"
                      : order.status === "SHIPPED"
                        ? "bg-purple-100 text-purple-700"
                        : order.status === "DELIVERED"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                  }`}
              >
                {order.status}
              </span>
            </div>

            {(order.status === "PLACED" || order.status === "CONFIRMED") ? (
              <button
                onClick={() => cancelOrder(order._id)}
                className="h-fit rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
              >
                Cancel
              </button>
            ) : (
              <p className="mt-2 text-xs text-gray-400">
                Order cannot be cancelled after shipping
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
