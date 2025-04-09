import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const token = Cookies.get("verification_token");
    if (token) {
      const role = Cookies.get("user_role");
      if (role === "admin") {
        navigate("/aDashboard", { replace: true });
      } else {
        navigate("/studentDashboard", { replace: true });
      }
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // ✅ Get Firebase token
      const token = await user.getIdToken();

      // ✅ Set token and role in cookies
      Cookies.set("verification_token", token, { expires: 7 });

      // Example logic: if admin email, mark as admin
      const role = formData.email === "admin@gmail.com" ? "admin" : "student";
      Cookies.set("user_role", role, { expires: 7 });

      toast.success("Logged in successfully!", { position: "top-right" });

      // ✅ Navigate based on role
      if (role === "admin") {
        navigate("/aDashboard", { replace: true });
      } else {
        navigate("/studentDashboard", { replace: true });
      }
    } catch (error) {
      console.error(error);
      setError("Invalid Login Credentials");
      toast.error("Invalid login credentials. Please try again.", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-[91vh] bg-gradient-to-r from-blue-500 via-red-500 to-pink-500">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            required
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
          <div className="mt-2 text-sm text-blue-600 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide Password" : "Show Password"}
          </div>
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
