import { useEffect, useState } from "react";
import OrderModal from "./Order";
import api from "../services/Api";

interface Product {
    _id: string;
    name: string;
    price: number;
    stock: number;
    imageUrl: string;
}

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get("/products");
                console.log("Api responce:", res.data);
                setProducts(res.data);
            } catch (err) {
                console.error("Failed to fetch products");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);
    const handleOrder = async (productId: string, quantity: number) => {
        try {
            await api.post("/orders", {
                productId,
                quantity,
            });

            alert("Order placed successfully 🎉");
            setSelectedProduct(null);

            const res = await api.get("/products");
            setProducts(res.data.products ?? res.data);
        } catch (err: any) {
            alert(err.response?.data?.message || "Order failed");
        }
    };

    if (loading) {
        return (
            <p className="text-center text-white text-lg">
                Loading products...
            </p>
        );
    }

    return (
        <div>
            <h2 className="mb-8 text-3xl font-bold text-white">
                SHOP HERE
            </h2>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="rounded-2xl bg-white p-5 shadow-2xl"
                    >
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="mb-4 h-48 w-full rounded-xl object-cover"
                        />

                        <h3 className="text-lg font-semibold text-gray-800">
                            {product.name}
                        </h3>

                        <p className="mt-1 text-sm text-gray-600">
                            ₹ {product.price}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                            Stock: {product.stock}
                        </p>

                        <button
                            disabled={product.stock === 0}
                            onClick={() => setSelectedProduct(product)}
                            className="mt-4 w-full rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:bg-gray-300"
                        >
                            Order Now
                        </button>
                        {selectedProduct && (
                            <OrderModal
                                productId={selectedProduct._id}
                                productName={selectedProduct.name}
                                maxStock={selectedProduct.stock}
                                onClose={() => setSelectedProduct(null)}
                                onSubmit={(quantity) => handleOrder(selectedProduct._id, quantity)}
                            />
                        )}

                    </div>
                ))}
            </div>
        </div>
    );
}
