import React, { useState } from "react";
import { Routes, Route, Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaBars, FaChartBar, FaClock, FaCog, FaDoorOpen, FaShoppingCart, FaUser, FaTimes, FaHome, FaInfoCircle, FaPhone, FaEnvelope } from "react-icons/fa";
import DailySalesEntry from "./DailySalesEntry";
import History from "./History";
import Charts from "./Charts";
import Settings from "./Settings";
import Logout from "./Logout";

const LoginDash = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) return <Navigate to="/" replace />;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    navigate('/logout');
  };

  const navItems = [
    { path: "today", icon: <FaShoppingCart />, label: "Today's Sales" },
    { path: "history", icon: <FaClock />, label: "Sales History" },
    { path: "charts", icon: <FaChartBar />, label: "Analytics" },
    { path: "settings", icon: <FaCog />, label: "Settings" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
      
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="md:hidden mr-4"
          >
            <FaBars size={20} className="text-gray-600" />
          </button>
          <div className="flex items-center">
            <img 
              src="/logo/LOGO.png" 
              alt="FranchiseAxis Logo" 
              className="h-8 mr-3"
            />
            <h1 className="text-xl font-bold text-blue-600 hidden sm:block">
              FranchiseAxis Dashboard
            </h1>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600 hidden md:block">
            Welcome, <strong>{user.name}</strong>
          </span>
          <button 
            onClick={handleLogout}
            className="flex items-center text-sm text-red-600 hover:text-red-800"
          >
            <FaDoorOpen className="mr-1" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar for large screens */}
        <motion.aside
          initial={{ x: -250 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="hidden md:block w-64 bg-white shadow-lg p-6"
        >
          <SidebarContent user={user} navItems={navItems} location={location} />
        </motion.aside>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <motion.div
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -250 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40"
          >
            <div 
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setSidebarOpen(false)}
            ></div>
            <motion.div 
              className="absolute left-0 top-0 w-64 bg-white h-full shadow-xl p-6 z-50"
            >
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center">
                  <img 
                    src="/logo/LOGO.png" 
                    alt="FranchiseAxis Logo" 
                    className="h-6 mr-2"
                  />
                  <h1 className="text-lg font-bold text-blue-600">Menu</h1>
                </div>
                <button 
                  onClick={() => setSidebarOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes size={20} />
                </button>
              </div>
              <SidebarContent user={user} navItems={navItems} location={location} />
            </motion.div>
          </motion.div>
        )}

        {/* Main Content */}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-1 p-6"
        >
          <Routes>
            <Route path="today" element={<DailySalesEntry />} />
            <Route path="history" element={<History />} />
            <Route path="charts" element={<Charts />} />
            <Route path="settings" element={<Settings />} />
            <Route path="logout" element={<Logout />} />
            <Route path="/" element={<DailySalesEntry />} />
          </Routes>
        </motion.main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <img 
                src="/logo/LOGO.png" 
                alt="FranchiseAxis Logo" 
                className="h-8 mb-4"
              />
              <p className="text-gray-300 text-sm">
                Empowering franchise businesses with powerful analytics tools.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/dashboard" className="text-gray-300 hover:text-white flex items-center">
                    <FaHome className="mr-2" /> Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/charts" className="text-gray-300 hover:text-white flex items-center">
                    <FaChartBar className="mr-2" /> Analytics
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/settings" className="text-gray-300 hover:text-white flex items-center">
                    <FaCog className="mr-2" /> Settings
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white flex items-center">
                    <FaInfoCircle className="mr-2" /> Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white flex items-center">
                    <FaInfoCircle className="mr-2" /> Support Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white flex items-center">
                    <FaInfoCircle className="mr-2" /> API Reference
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-300">
                  <FaPhone className="mr-2" /> +1 (555) 123-4567
                </li>
                <li className="flex items-center text-gray-300">
                  <FaEnvelope className="mr-2" /> support@franchiseaxis.com
                </li>
              </ul>
              <div className="mt-4 flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-6 text-sm text-gray-400 text-center">
            <p>© {new Date().getFullYear()} FranchiseAxis. All rights reserved.</p>
            <div className="mt-2 flex justify-center space-x-6">
              <a href="#" className="hover:text-gray-300">Privacy Policy</a>
              <a href="#" className="hover:text-gray-300">Terms of Service</a>
              <a href="#" className="hover:text-gray-300">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const SidebarContent = ({ user, navItems, location }) => (
  <>
    <div className="flex flex-col items-start mb-6 px-4">
  {/* <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-blue-600 text-lg font-bold mb-2">
    {user.name.charAt(0).toUpperCase()}
  </div> */}
  <img
  src={`https://api.dicebear.com/7.x/micah/svg?seed=${encodeURIComponent(user.name)}`}
  alt="Profile"
  className="rounded-full w-16 h-16 mb-2"
/>


  <p className="text-sm text-gray-800 break-words">
    <strong>{user.name}</strong>
    <span className="block text-gray-500 text-xs">user</span>
  </p>
</div>


    <nav>
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
        Navigation
      </h3>
      <ul className="space-y-1">
        {navItems.map(item => (
          <li key={item.path}>
            <Link
              to={`/dashboard/${item.path}`}
              className={`flex items-center gap-3 p-3 rounded-lg transition ${
                location.pathname.includes(item.path)
                  ? "bg-blue-600 text-white shadow-md"
                  : "hover:bg-blue-50 text-gray-700"
              }`}
            >
              <span className={
                location.pathname.includes(item.path) 
                  ? "text-white" 
                  : "text-blue-500"
              }>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  </>
);

export default LoginDash;