import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signupUser } from "../services/Auth";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await signupUser({ name, email, password });
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <h2 className="mb-2 text-2xl font-bold text-gray-800">
          Create your account 🚀
        </h2>

        {error && (
          <p className="mb-4 text-sm text-red-600">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border px-4 py-2"
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border px-4 py-2"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border px-4 py-2"
          />

          <button className="w-full rounded-xl bg-indigo-600 py-2.5 text-white">
            Sign Up
          </button>
          
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
