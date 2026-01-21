import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./pages/Header"
import Login from "./components/Login";
import Signup from "./components/Signup";
import Products from "./components/Product";
import Order from "./pages/Order";
import AdminOrders from "./components/AdminOrders";
import CreateProduct from "./components/CreateProduct";

export default function App() {

  return (

    <BrowserRouter>
      <div className="min-h-screen bg-linear-to-br from-indigo-600 via-purple-600 to-blue-600">
        <Header />

        <main className="mx-auto max-w-6xl px-6 py-12">
          <Routes>
            <Route path="/" element={<Products/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/products" element={<Products/>} />
            <Route path="/orders/my" element={<Order />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/create-product" element={<CreateProduct />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
