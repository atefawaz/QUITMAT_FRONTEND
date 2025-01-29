import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation
import { loginUser } from "../services/api";
import "../styles/auth.css"; // Ensure your styles are linked

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form Data Sent to API:", {
        email: formData.email, // Map "email" to "username"
        password: formData.password,
      });

      const response = await loginUser({
        email: formData.email, // Ensure you're sending "username" and not "email"
        password: formData.password,
      });
      localStorage.setItem("access_token", response.data.access_token);
      setMessage("Login successful!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      console.error("Error Response:", error.response?.data);
      const errorMsg = error.response?.data?.detail || "Invalid credentials.";
      setMessage(
        typeof errorMsg === "string" ? errorMsg : JSON.stringify(errorMsg)
      );
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="bg-gray-900 p-6 rounded-lg max-w-md w-full">
        <h2 className="text-2xl text-white text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full"
          />
          <button type="submit" className="w-full bg-red-500 hover:bg-red-600">
            Login
          </button>
        </form>
        {message && <p className="text-red-400 mt-4">{message}</p>}

        {/* Link for users who don’t have an account */}
        <p className="text-center text-gray-400 mt-4">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-red-400 hover:text-red-500 transition-colors duration-300"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
