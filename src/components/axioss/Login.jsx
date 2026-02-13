import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react"; // install via `npm install lucide-react`
import logo from "/logo/LOGO.png"; // Update path according to your project

const Login = ({ setUser }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, password }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Invalid JSON response from server");
      }

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user.userId);
        localStorage.setItem("userRole", data.user.role);
        localStorage.setItem("userName", data.user.name || userId);
        localStorage.setItem("franchiseeId", data.user._id); // store MongoDB ObjectId

        setUser({
          id: data.user._id,
          userId: data.user.userId,
          role: data.user.role,
          name: data.user.name || userId,
        });

        if (data.user.role === "admin") {
          navigate("/applications");
        } else {
          navigate("/dashboard");
        }
      } else {
        alert(data.msg);
      }
    } catch (err) {
      console.error("Login failed", err);
      alert("Login failed. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <>
      <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-[#0A2463] to-[#1446A0] px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md"
        >
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Franchise Axis Logo" className="h-16 w-auto" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-bold text-center mb-2 text-[#E9522C]">
            Login to Franchise Axis
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Welcome back! Please enter your credentials.
          </p>

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col space-y-4">
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              placeholder="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
              className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#E9522C]"
            />

            {/* Password Input with Visibility Toggle */}
            <div className="relative">
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#E9522C] w-full"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              type="submit"
              className="bg-[#E9522C] text-white font-semibold py-3 rounded hover:bg-[#d34320] transition"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? "Logging in..." : "Login"}
            </motion.button>
          </form>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A2463] text-gray-200 text-sm text-center py-4">
        © 2025 Franchise Axis. All rights reserved.
      </footer>
    </>
  );
};

export default Login;
