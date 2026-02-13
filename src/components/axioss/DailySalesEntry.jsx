import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DailySalesEntry = () => {
  const [date, setDate] = useState("");
  const [totalSales, setTotalSales] = useState("");
  const [totalCustomers, setTotalCustomers] = useState("");
  const [loading, setLoading] = useState(false);

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!date || !totalSales || !totalCustomers) {
      toast.error("Please fill in all fields");
      return;
    }

    const data = {
      date,
      totalSales: parseFloat(totalSales),
      totalCustomers: parseInt(totalCustomers),
    };

    try {
      setLoading(true);

      // Replace with your actual API endpoint and auth token logic
      const token = localStorage.getItem("token"); // adjust based on your auth flow

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.post("${import.meta.env.VITE_API_URL}/api/dailysales/add", data, config);
      console.log("Submitted data:", res.data);

      toast.success("Sales entry submitted successfully");

      // Clear form
      setDate("");
      setTotalSales("");
      setTotalCustomers("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit sales entry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-center min-h-screen bg-gray-100 px-4"
    >
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden max-w-sm lg:max-w-4xl w-full">
        {/* Left side image (hidden on mobile) */}
        <div
          className="hidden md:block lg:w-1/2 bg-cover bg-blue-700"
          style={{
            backgroundImage: `url(https://www.tailwindtap.com//assets/components/form/userlogin/login_tailwindtap.jpg)`,
          }}
        ></div>

        {/* Right side form */}
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
            Daily Sales Entry
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Date */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-700"
                required
              />
            </div>

            {/* Total Sales */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Total Sales (₹)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={totalSales}
                onChange={(e) => setTotalSales(e.target.value)}
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-700"
                required
              />
            </div>

            {/* Total Customers */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Total Customers Visited
              </label>
              <input
                type="number"
                min="0"
                value={totalCustomers}
                onChange={(e) => setTotalCustomers(e.target.value)}
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-700"
                required
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-600"
              } text-white font-bold py-2 px-4 w-full rounded transition`}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default DailySalesEntry;
