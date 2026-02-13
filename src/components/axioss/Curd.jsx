import React, { useState, useEffect } from "react";
import axios from 'axios';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
function Crud() {
  const [formData, setFormData] = useState({
    yourname: "",
    yourphone: "",
    youremail: "",
    youradd: "",
    busadd: "",
    siteadd: "",
    area: "",
    floor: "",
    city: "",
    state: "",
    pin: "",
    doingSince: "",
    ownershipStatus: ""
  });

  const [darkMode, setDarkMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    // Check user's preferred color scheme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const url = "${import.meta.env.VITE_API_URL}/user/doSubmit";
      const response = await axios.post(url, formData, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.data.status) {
        setSubmitSuccess(true);
        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            yourname: "",
            yourphone: "",
            youremail: "",
            youradd: "",
            busadd: "",
            siteadd: "",
            area: "",
            floor: "",
            city: "",
            state: "",
            pin: "",
            doingSince: "",
            ownershipStatus: ""
          });
          setSubmitSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-4 py-8 transition-colors duration-300 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-end w-full max-w-4xl mb-4"
      >
        <div className="flex items-center">
          <span className={`mr-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            {darkMode ? "Dark" : "Light"} Mode
          </span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${darkMode ? "bg-indigo-600" : "bg-gray-400"}`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${darkMode ? "translate-x-6" : "translate-x-1"}`}
            />
          </button>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"}`}
      >
        <div className="p-6 sm:p-8 md:p-10">
          <motion.h1 
            variants={itemVariants}
            className={`text-2xl sm:text-3xl font-bold mb-2 text-center ${darkMode ? "text-white" : "text-gray-800"}`}
          >
            Franchise Application
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className={`text-center mb-8 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            Fill out the form below to apply for a franchise opportunity
          </motion.p>

          {submitSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-lg bg-green-100 text-green-800"
            >
              Application submitted successfully!
            </motion.div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Personal Information Section */}
              <motion.div variants={itemVariants}>
                <h2 className={`text-lg font-semibold mb-4 pb-2 border-b ${darkMode ? "border-gray-700 text-indigo-400" : "border-gray-200 text-indigo-600"}`}>
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="yourname"
                      value={formData.yourname}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${darkMode ? "bg-gray-700 border-gray-600 focus:ring-indigo-500 focus:border-indigo-500" : "bg-gray-50 border-gray-300 focus:ring-indigo-400 focus:border-indigo-400"}`}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="yourphone"
                      value={formData.yourphone}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${darkMode ? "bg-gray-700 border-gray-600 focus:ring-indigo-500 focus:border-indigo-500" : "bg-gray-50 border-gray-300 focus:ring-indigo-400 focus:border-indigo-400"}`}
                      placeholder="+1 (123) 456-7890"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="youremail"
                    value={formData.youremail}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${darkMode ? "bg-gray-700 border-gray-600 focus:ring-indigo-500 focus:border-indigo-500" : "bg-gray-50 border-gray-300 focus:ring-indigo-400 focus:border-indigo-400"}`}
                    placeholder="john@example.com"
                  />
                </div>

                <div className="mt-4">
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Residential Address
                  </label>
                  <input
                    type="text"
                    name="youradd"
                    value={formData.youradd}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${darkMode ? "bg-gray-700 border-gray-600 focus:ring-indigo-500 focus:border-indigo-500" : "bg-gray-50 border-gray-300 focus:ring-indigo-400 focus:border-indigo-400"}`}
                    placeholder="123 Main St, Apt 4B"
                  />
                </div>
              </motion.div>

              {/* Business Information Section */}
              <motion.div variants={itemVariants}>
                <h2 className={`text-lg font-semibold mb-4 pb-2 border-b ${darkMode ? "border-gray-700 text-indigo-400" : "border-gray-200 text-indigo-600"}`}>
                  Business Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Existing Business (if any)
                    </label>
                    <input
                      type="text"
                      name="busadd"
                      value={formData.busadd}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${darkMode ? "bg-gray-700 border-gray-600 focus:ring-indigo-500 focus:border-indigo-500" : "bg-gray-50 border-gray-300 focus:ring-indigo-400 focus:border-indigo-400"}`}
                      placeholder="Business name"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Doing Business Since
                    </label>
                    <select
                      name="doingSince"
                      value={formData.doingSince}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${darkMode ? "bg-gray-700 border-gray-600 focus:ring-indigo-500 focus:border-indigo-500" : "bg-gray-50 border-gray-300 focus:ring-indigo-400 focus:border-indigo-400"}`}
                    >
                      <option value="">Select year</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                      <option value="2021">2021</option>
                      <option value="2020">2020</option>
                      <option value="2015">Before 2020</option>
                    </select>
                  </div>
                </div>
              </motion.div>

              {/* Site Information Section */}
              <motion.div variants={itemVariants}>
                <h2 className={`text-lg font-semibold mb-4 pb-2 border-b ${darkMode ? "border-gray-700 text-indigo-400" : "border-gray-200 text-indigo-600"}`}>
                  Site Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Site Address
                    </label>
                    <input
                      type="text"
                      name="siteadd"
                      value={formData.siteadd}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${darkMode ? "bg-gray-700 border-gray-600 focus:ring-indigo-500 focus:border-indigo-500" : "bg-gray-50 border-gray-300 focus:ring-indigo-400 focus:border-indigo-400"}`}
                      placeholder="456 Business Ave"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Area (sq ft)
                      </label>
                      <input
                        type="text"
                        name="area"
                        value={formData.area}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${darkMode ? "bg-gray-700 border-gray-600 focus:ring-indigo-500 focus:border-indigo-500" : "bg-gray-50 border-gray-300 focus:ring-indigo-400 focus:border-indigo-400"}`}
                        placeholder="1500"
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Floor
                      </label>
                      <input
                        type="text"
                        name="floor"
                        value={formData.floor}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${darkMode ? "bg-gray-700 border-gray-600 focus:ring-indigo-500 focus:border-indigo-500" : "bg-gray-50 border-gray-300 focus:ring-indigo-400 focus:border-indigo-400"}`}
                        placeholder="Ground floor"
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Ownership Status
                      </label>
                      <div className="flex space-x-4 mt-2">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="ownershipStatus"
                            value="Owned"
                            checked={formData.ownershipStatus === "Owned"}
                            onChange={handleInputChange}
                            className={`h-4 w-4 ${darkMode ? "text-indigo-500" : "text-indigo-600"} focus:ring-indigo-500 border-gray-300`}
                          />
                          <span className={`ml-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Owned</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="ownershipStatus"
                            value="Rented"
                            checked={formData.ownershipStatus === "Rented"}
                            onChange={handleInputChange}
                            className={`h-4 w-4 ${darkMode ? "text-indigo-500" : "text-indigo-600"} focus:ring-indigo-500 border-gray-300`}
                          />
                          <span className={`ml-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Rented</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Location Information Section */}
              <motion.div variants={itemVariants}>
                <h2 className={`text-lg font-semibold mb-4 pb-2 border-b ${darkMode ? "border-gray-700 text-indigo-400" : "border-gray-200 text-indigo-600"}`}>
                  Location Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${darkMode ? "bg-gray-700 border-gray-600 focus:ring-indigo-500 focus:border-indigo-500" : "bg-gray-50 border-gray-300 focus:ring-indigo-400 focus:border-indigo-400"}`}
                      placeholder="New York"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${darkMode ? "bg-gray-700 border-gray-600 focus:ring-indigo-500 focus:border-indigo-500" : "bg-gray-50 border-gray-300 focus:ring-indigo-400 focus:border-indigo-400"}`}
                      placeholder="NY"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      ZIP/Pincode
                    </label>
                    <input
                      type="text"
                      name="pin"
                      value={formData.pin}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${darkMode ? "bg-gray-700 border-gray-600 focus:ring-indigo-500 focus:border-indigo-500" : "bg-gray-50 border-gray-300 focus:ring-indigo-400 focus:border-indigo-400"}`}
                      placeholder="10001"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div 
                variants={itemVariants}
                className="pt-4"
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${darkMode ? "focus:ring-offset-gray-800" : "focus:ring-offset-white"} ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </motion.div>
            </div>
          </form>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className={`mt-6 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
      >
        Already have an account?{' '}
        <Link to="/Login" className="font-medium text-indigo-600 hover:text-indigo-500">
          Sign in
        </Link>
      </motion.div>
    </div>
  );
}

export default Crud;