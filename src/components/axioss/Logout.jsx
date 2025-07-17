import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("✅ Credentials already cleared by handleLogout");

    // Optional: Add slight delay for UX before redirecting to login
    const timeout = setTimeout(() => {
      navigate("/");
    }, 1000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold">Logging out...</h1>
      <p className="text-gray-500">Please wait</p>
    </div>
  );
};

export default Logout;
