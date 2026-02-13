import React, { useEffect, useState } from "react";

const History = () => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalesHistory = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch("${import.meta.env.VITE_API_URL}/api/dailysales/history", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setHistoryData(data); // assuming your API returns an array of sales entries
        } else {
          console.error("Failed to fetch history:", data.message);
        }
      } catch (err) {
        console.error("Error fetching sales history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesHistory();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Sales History</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Total Sales (₹)</th>
                <th className="py-2 px-4 text-left">Total Customers</th>
              </tr>
            </thead>
            <tbody>
              {historyData.map((entry) => (
                <tr key={entry._id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{entry.date}</td>
                  <td className="py-2 px-4">₹{entry.totalSales}</td>
                  <td className="py-2 px-4">{entry.totalCustomers}</td>
                </tr>
              ))}
              {historyData.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center py-4">
                    No sales history available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default History;
