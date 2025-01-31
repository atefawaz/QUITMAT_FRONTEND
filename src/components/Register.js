import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/api";
import "../styles/auth.css"; // Ensure your styles are linked

function Register() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    date_of_birth: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("📢 Registering user:", formData);
  
      const response = await registerUser(formData);
      console.log("✅ Registration Successful:", response.data);
  
      // ✅ Extract `id` and store it as `user_id`
      const { access_token, id } = response.data; 
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("user_id", id); // ✅ Store as user_id
  
      setMessage("Registration successful! Redirecting to questionnaire...");
      setTimeout(() => {
        navigate("/questionnaire");
      }, 1000);
    } catch (error) {
      console.error("❌ Registration Failed:", error.response?.data);
      const errorMsg = error.response?.data?.detail || "Something went wrong.";
      setMessage(typeof errorMsg === "string" ? errorMsg : JSON.stringify(errorMsg));
    }
  };
  

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="bg-gray-900 p-6 rounded-lg max-w-md w-full">
        <h2 className="text-2xl text-white text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="firstname"
            placeholder="First Name"
            value={formData.firstname}
            onChange={handleChange}
            required
            className="w-full"
          />
          <input
            name="lastname"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={handleChange}
            required
            className="w-full"
          />
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            required
            className="w-full"
          />
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
          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
            value={formData.confirm_password}
            onChange={handleChange}
            required
            className="w-full"
          />
          <button type="submit" className="w-full bg-red-500 hover:bg-red-600">
            Register
          </button>
        </form>
        {message && <p className="text-red-400 mt-4">{message}</p>}

        {/* Link for users who already have an account */}
        <p className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-red-400 hover:text-red-500 transition-colors duration-300"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
