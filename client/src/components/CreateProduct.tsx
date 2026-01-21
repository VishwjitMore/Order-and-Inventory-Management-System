import { useState } from "react";
import api from "../services/Api";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price || !stock || !image) {
      alert("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("image", image);

    try {
      setLoading(true);

      await api.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product created successfully ✅");

      // reset form
      setName("");
      setPrice("");
      setStock("");
      setImage(null);
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-xl rounded-2xl bg-white p-8 shadow-xl">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        Create Product (Admin)
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border px-4 py-2"
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full rounded-lg border px-4 py-2"
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-full rounded-lg border px-4 py-2"
        />
        <div className="relative">
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-6 text-center hover:border-indigo-500 transition">
          {!image ? (
            <>
              <p className="text-sm text-gray-500">
                Click to upload product image
              </p>
              <p className="mt-1 text-xs text-gray-400">
                PNG, JPG up to 5MB
              </p>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImage(e.target.files ? e.target.files[0] : null)
                }
                className="absolute h-full w-full cursor-pointer opacity-0"
              />
            </>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="h-32 w-32 rounded-lg object-cover shadow"
              />
              <button
                type="button"
                onClick={() => setImage(null)}
                className="text-sm text-red-500 hover:underline"
              >
                Remove image
              </button>
            </div>
          )}
        </div>
        </div>


        <button
          disabled={loading}
          className="w-full rounded-lg bg-indigo-600 py-2.5 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
