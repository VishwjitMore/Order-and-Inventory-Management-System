import { useEffect, useState } from "react";
import api from "../services/Api";

type Status =
  | "PLACED"
  | "CONFIRMED"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

interface AdminOrder {
  _id: string;
  quantity: number;
  status: Status;
  product: {
    name: string;
    price: number;
    imageUrl: string;
  };
  user: {
    name: string;
    email: string;
  };
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders");
        setOrders(res.data.orders);
      } catch {
        alert("Failed to load admin orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateStatus = async (orderId: string, status: Status) => {
    try {
      await api.patch(`/orders/${orderId}/status`, { status });

      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, status } : o
        )
      );
    } catch {
      alert("Status update failed");
    }
  };

  if (loading) {
    return <p className="text-white">Loading orders...</p>;
  }

  return (
    <div>
      <h2 className="mb-8 text-3xl font-bold text-white">
        Admin Orders
      </h2>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="flex gap-6 rounded-2xl bg-white p-6 shadow-xl"
          >
            <img
              src={order.product.imageUrl}
              className="h-24 w-24 rounded-xl object-cover"
            />

            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">
                {order.product.name}
              </h3>

              <p className="text-sm text-gray-600">
                Ordered by: {order.user.name} ({order.user.email})
              </p>

              <p className="text-sm text-gray-600">
                Qty: {order.quantity} | Total ₹
                {order.quantity * order.product.price}
              </p>

              <span className="mt-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-xs font-medium">
                {order.status}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {order.status === "PLACED" && (
                <button
                  onClick={() =>
                    updateStatus(order._id, "CONFIRMED")
                  }
                  className="rounded-lg bg-blue-500 px-4 py-2 text-sm text-white"
                >
                  Confirm
                </button>
              )}

              {order.status === "CONFIRMED" && (
                <button
                  onClick={() =>
                    updateStatus(order._id, "SHIPPED")
                  }
                  className="rounded-lg bg-purple-500 px-4 py-2 text-sm text-white"
                >
                  Ship
                </button>
              )}

              {order.status === "SHIPPED" && (
                <button
                  onClick={() =>
                    updateStatus(order._id, "DELIVERED")
                  }
                  className="rounded-lg bg-green-500 px-4 py-2 text-sm text-white"
                >
                  Deliver
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
