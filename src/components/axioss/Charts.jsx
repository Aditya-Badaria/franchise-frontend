import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Calendar, TrendingUp, Users, DollarSign, Filter } from 'lucide-react';

const Dashboard = () => {
  const [analyticsData, setAnalyticsData] = useState({ chartData: [], summary: {} });
  const [monthlyData, setMonthlyData] = useState({ chartData: [] });
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('30');
  const [viewType, setViewType] = useState('daily'); // daily or monthly
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });

  // Fetch analytics data
  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };

      let url = `http://localhost:2004/api/dailysales/analytics?period=${period}`;
      
      if (dateRange.startDate && dateRange.endDate) {
        url += `&startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`;
      }

      const response = await fetch(url, config);
      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);
      
      if (response.ok) {
        setAnalyticsData(data);
      } else {
        console.error('Error fetching analytics:', data);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch monthly analytics
  const fetchMonthlyAnalytics = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };

      const response = await fetch(`http://localhost:2004/api/dailysales/monthly-analytics?year=${new Date().getFullYear()}`, config);
      const data = await response.json();
      
      if (response.ok) {
        setMonthlyData(data);
      } else {
        console.error('Error fetching monthly analytics:', data);
      }
    } catch (error) {
      console.error('Error fetching monthly analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (viewType === 'daily') {
      fetchAnalytics();
    } else {
      fetchMonthlyAnalytics();
    }
  }, [period, viewType, dateRange]);

  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);
    setDateRange({ startDate: '', endDate: '' }); // Clear custom date range
  };

  const handleDateRangeChange = (field, value) => {
    setDateRange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const currentData = viewType === 'daily' ? analyticsData : monthlyData;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  // In Charts.jsx, before the return statement:
  if (!loading && currentData.chartData && currentData.chartData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sales Analytics Dashboard</h1>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <p className="text-lg text-gray-600">No data available for the selected period</p>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sales Analytics Dashboard</h1>
          <p className="text-gray-600">Track your daily sales performance and customer metrics</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            {/* View Type Toggle */}
            <div className="flex rounded-lg border border-gray-200 overflow-hidden">
              <button
                onClick={() => setViewType('daily')}
                className={`px-4 py-2 text-sm font-medium ${
                  viewType === 'daily' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Daily View
              </button>
              <button
                onClick={() => setViewType('monthly')}
                className={`px-4 py-2 text-sm font-medium ${
                  viewType === 'monthly' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Monthly View
              </button>
            </div>

            {/* Period Selection (only for daily view) */}
            {viewType === 'daily' && (
              <div className="flex gap-2">
                {['7', '30', '90'].map((p) => (
                  <button
                    key={p}
                    onClick={() => handlePeriodChange(p)}
                    className={`px-3 py-2 text-sm rounded-md ${
                      period === p 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {p} days
                  </button>
                ))}
              </div>
            )}

            {/* Custom Date Range (only for daily view) */}
            {viewType === 'daily' && (
              <div className="flex gap-2 items-center">
                <input
                  type="date"
                  value={dateRange.startDate}
                  onChange={(e) => handleDateRangeChange('startDate', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  placeholder="Start Date"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="date"
                  value={dateRange.endDate}
                  onChange={(e) => handleDateRangeChange('endDate', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  placeholder="End Date"
                />
              </div>
            )}
          </div>
        </div>

        {/* Summary Cards (only for daily view) */}
        {viewType === 'daily' && analyticsData.summary && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Total Sales</h3>
                  <p className="text-2xl font-bold text-green-600">₹{analyticsData.summary.totalSales}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Total Customers</h3>
                  <p className="text-2xl font-bold text-blue-600">{analyticsData.summary.totalCustomers}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Avg Daily Sales</h3>
                  <p className="text-2xl font-bold text-purple-600">₹{analyticsData.summary.avgDailySales}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Calendar className="h-8 w-8 text-orange-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Avg per Customer</h3>
                  <p className="text-2xl font-bold text-orange-600">₹{analyticsData.summary.avgSalesPerCustomer}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Volume Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Volume</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={currentData.chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey={viewType === 'daily' ? 'date' : 'month'} 
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis fontSize={12} />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'sales' ? `₹${value}` : value,
                    name === 'sales' ? 'Sales' : 'Customers'
                  ]}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ fill: '#10b981', strokeWidth: 2 }}
                  name="Sales (₹)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Customer Volume Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Volume</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={currentData.chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey={viewType === 'daily' ? 'date' : 'month'} 
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis fontSize={12} />
                <Tooltip 
                  formatter={(value, name) => [
                    value,
                    name === 'customers' ? 'Customers' : 'Sales'
                  ]}
                />
                <Legend />
                <Bar 
                  dataKey="customers" 
                  fill="#3b82f6" 
                  name="Customers"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Combined Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales & Customer Trends</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={currentData.chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey={viewType === 'daily' ? 'date' : 'month'} 
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis yAxisId="left" orientation="left" fontSize={12} />
              <YAxis yAxisId="right" orientation="right" fontSize={12} />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'sales' ? `₹${value}` : value,
                  name === 'sales' ? 'Sales' : 'Customers'
                ]}
              />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="sales" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ fill: '#10b981', strokeWidth: 2 }}
                name="Sales (₹)"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="customers" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', strokeWidth: 2 }}
                name="Customers"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;