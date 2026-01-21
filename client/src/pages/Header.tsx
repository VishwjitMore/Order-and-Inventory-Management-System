import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAuthUser, logout } from "../utils/Auth";

const Header = () => {
  const [user, setUser] = useState(getAuthUser());

  useEffect(() => {
    const handleAuthChange = () => {
      setUser(getAuthUser());
    };

    window.addEventListener("auth-change", handleAuthChange);
    return () => window.removeEventListener("auth-change", handleAuthChange);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-linear-to-r from-indigo-600 to-purple-600 px-6 py-4 shadow-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide text-red-500"
        >
          URKART
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium text-white">
          {/* Common */}
          <Link to="/products" className="hover:underline">
            Products
          </Link>

          {/* USER */}
          {user?.role === "USER" && (
            <Link to="/orders/my" className="hover:underline">
              My Orders
            </Link>
          )}

          {/* ADMIN */}
          {user?.role === "ADMIN" && (
            <>
              <Link to="/admin/create-product" className="hover:underline">
                Create Product
              </Link>
              <Link to="/admin/orders" className="hover:underline">
                Admin Orders
              </Link>
            </>
          )}

          {/* AUTH */}
          {!user ? (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/signup" className="hover:underline">
                Signup
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs">
                {user.role}
              </span>
              <button
                onClick={logout}
                className="rounded-lg bg-red-500 px-3 py-1 text-xs hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
