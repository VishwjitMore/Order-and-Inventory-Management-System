import { useState } from "react";

interface Props {
  productId: string;
  productName: string;
  maxStock: number;
  onClose: () => void;
  onSubmit: (quantity: number) => void;
}

export default function OrderModal({
  productName,
  maxStock,
  onClose,
  onSubmit,
}: Props) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
        <h3 className="text-xl font-semibold text-gray-800">
          Order {productName}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Available stock: {maxStock}
        </p>

        <input
          type="number"
          min={1}
          max={maxStock}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="mt-4 w-full rounded-lg border px-4 py-2"
        />

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={() => onSubmit(quantity)}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
