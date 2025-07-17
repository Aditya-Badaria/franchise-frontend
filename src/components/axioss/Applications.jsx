    import React, { useState, useEffect } from 'react';
    import { jwtDecode } from "jwt-decode";
    import { useNavigate } from 'react-router-dom';

    // const decoded = jwtDecode(token);
    import Logout from "./Logout";



    import { 
    Users, 
    UserCheck, 
    UserX, 
    Crown, 
    Search, 
    Filter, 
    Download,
    Bell,
    Settings,
    LogOut,
    ChevronDown,
    Eye,
    Trash2,
    CheckCircle,
    XCircle,
    Clock,
    BarChart3
    } from 'lucide-react';
    import logo from '/logo/LOGO_A.png'; // Import your logo
    
    const ApplicationsTable = () => {
        const navigate = useNavigate();
        const [user, setUser] = useState(null); // ✅ Manage user state
        const [sidebarOpen, setSidebarOpen] = useState(false);
        const [applications, setApplications] = useState([]);
        const [activeTab, setActiveTab] = useState('Pending');
        const [searchTerm, setSearchTerm] = useState('');
        const [loading, setLoading] = useState(true);
        const [showUserMenu, setShowUserMenu] = useState(false);
        const [selectedApplication, setSelectedApplication] = useState(null);
        const [adminId, setAdminId] = useState(localStorage.getItem('userId') || "Admin");


        const [notifications, setNotifications] = useState([
        { id: 1, message: "New application received from Delhi", read: false },
        { id: 2, message: "Franchisee status updated", read: false },
        ]);
        const [showNotifications, setShowNotifications] = useState(false);


        // Get admin info from localStorage
        // Get admin info from localStorage
        const adminName = localStorage.getItem('userName') || adminId;
        const adminRole = localStorage.getItem('userRole');
        
        // Add this to your header section
        useEffect(() => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                const decoded = jwt_decode(token);
                if (decoded && decoded.uid) {
                    setAdminId(decoded.uid.charAt(0).toUpperCase() + decoded.uid.slice(1));
                } else {
                    console.warn("Token decoded but uid missing:", decoded);
                    setAdminId("Admin");
                }
                } catch (err) {
                console.error("Invalid token:", err);
                setAdminId("Admin");
                }
            } else {
                setAdminId("Admin");
            }
            const fetchApplications = async () => {
                try {
                    const response = await fetch('http://localhost:2004/applications');
                    const data = await response.json();
                    setApplications(data);
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching applications:", error);
                    setLoading(false);
                }
            };
            fetchApplications();
        }, []);

        const handleAction = async (id, action) => {
            let status;
            switch (action) {
                case 'accept':
                    status = 1;
                    break;
                case 'reject':
                    status = -1;
                    break;
                case 'franchise':
                    status = 2;
                    break;
                default:
                    return;
            }

            try {
                const response = await fetch('http://localhost:2004/user/updateStatus', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id,
                        status,
                        email: 'authorized@example.com',
                        phone: '1234567890'
                    })
                });

                const data = await response.json();

                if (data.status) {
                    alert(data.msg);
                    setApplications(prev => prev.map(app => app._id === id ? { ...app, status } : app));
                } else {
                    alert(data.msg);
                }
            } catch (error) {
                console.error("Error updating status:", error);
                alert("Failed to update status");
            }
        };

        const handleDelete = async (id) => {
            if (!window.confirm("Are you sure you want to delete this application?")) {
                return;
            }
        
            try {
                const response = await axios.delete(`http://localhost:2004/applications/${id}`);
        
                if (response.data.status) {
                    alert("Application deleted successfully!");
                    setApplications(prev => prev.filter(app => app._id !== id));
                } else {
                    alert(response.data.msg);
                }
            } catch (error) {
                console.error("Error deleting application:", error);
                alert("Failed to delete application");
            }
        };

        const filteredApplications = applications.filter(app => {
            const matchesTab = () => {
                if (activeTab === 'Pending') return app.status === 0;
                if (activeTab === 'Accepted') return app.status === 1;
                if (activeTab === 'Rejected') return app.status === -1;
                return false;
            };
            
            const matchesSearch = searchTerm === '' || 
                app.youremail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.yourphone?.includes(searchTerm) ||
                app.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.state?.toLowerCase().includes(searchTerm.toLowerCase());
                
            return matchesTab() && matchesSearch;
        });

        const getStatusCount = (status) => {
            return applications.filter(app => app.status === status).length;
        };

        const getStatusIcon = (status) => {
            switch (status) {
                case 'Pending': return <Clock className="w-5 h-5" />;
                case 'Accepted': return <CheckCircle className="w-5 h-5" />;
                case 'Rejected': return <XCircle className="w-5 h-5" />;
                default: return <Users className="w-5 h-5" />;
            }
        };

        const getStatusColor = (status) => {
            switch (status) {
                case 'Pending': return 'bg-gradient-to-r from-yellow-400 to-orange-500';
                case 'Accepted': return 'bg-gradient-to-r from-green-400 to-emerald-500';
                case 'Rejected': return 'bg-gradient-to-r from-red-400 to-rose-500';
                default: return 'bg-gradient-to-r from-blue-400 to-indigo-500';
            }
        };

        const handleLogout = () => {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('userRole');
            localStorage.removeItem('userName'); // ✅ remove this too
            navigate('/logout'); // smoother redirect without full reload
        };

        if (loading) {
            return (
                <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-400 border-t-transparent mx-auto mb-4"></div>
                        <p className="text-white text-lg">Loading dashboard...</p>
                    </div>
                </div>
            );
        }

        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
                {/* Header */}
                <header className="bg-black/20 backdrop-blur-lg border-b border-white/10">
                    <div className="px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                                <img src={logo} alt="Franchise Axis Logo" className="h-8 w-auto" />
                            </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-white">Franchise Axis</h1>
                                    <p className="text-blue-300 text-sm">Admin Dashboard</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                                <button 
                                onClick={() => setShowNotifications(!showNotifications)}
                                className="relative p-2 text-gray-300 hover:text-white transition-colors"
                                >
                                <Bell className="w-5 h-5" />
                                {notifications.some(n => !n.read) && (
                                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                                )}
                                </button>

                                    {showNotifications && (
                                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50">
                                        {notifications.map(note => (
                                        <div 
                                            key={note.id}
                                            className={`px-4 py-2 text-sm border-b ${note.read ? "text-gray-500" : "text-black font-medium"}`}
                                            onClick={() => {
                                            setNotifications(prev => prev.map(n => n.id === note.id ? { ...n, read: true } : n));
                                            setShowNotifications(false);
                                            }}
                                        >
                                            {note.message}
                                        </div>
                                        ))}
                                        {notifications.length === 0 && (
                                        <div className="px-4 py-2 text-sm text-gray-500">No notifications</div>
                                        )}
                                    </div>
                                    )}

                                
                                <div className="relative">
                                    <button 
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/10 transition-colors"
                                    >
                                        {/* <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                            <span className="text-white font-semibold text-sm">
                                                {adminName.charAt(0)}
                                            </span>
                                        </div> */}
                                        <img
  src={`https://api.dicebear.com/7.x/micah/svg?seed=${encodeURIComponent(adminName)}`}
  alt="Profile"
  className="rounded-full w-16 h-16 mb-2"
/>
                                        <div className="text-left">
                                            <p className="text-white text-sm font-medium">{adminName}</p>
                                            <p className="text-gray-300 text-xs">{adminId} ({adminRole})</p>
                                        </div>
                                        <ChevronDown className="w-4 h-4 text-gray-300" />
                                    </button>
                                    
                                    {showUserMenu && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50">
                                            <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2">
                                                <Settings className="w-4 h-4" />
                                                <span>Settings</span>
                                            </button>
                                            <button 
                                                onClick={handleLogout}
                                                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2 text-red-600"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                <span>Logout</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Welcome Section */}
                <div className="px-6 py-8">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-white mb-2">
                            Welcome back, {adminName}! 👋
                        </h2>
                        <p className="text-blue-300">
                            Here's what's happening with your franchise applications today.
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {['Pending', 'Accepted', 'Rejected'].map((status) => (
                            <div key={status} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className={`w-12 h-12 rounded-xl ${getStatusColor(status)} flex items-center justify-center mb-4`}>
                                            {getStatusIcon(status)}
                                        </div>
                                        <h3 className="text-white font-semibold text-lg">{status}</h3>
                                        <p className="text-3xl font-bold text-white mt-2">
                                            {getStatusCount(status === 'Pending' ? 0 : status === 'Accepted' ? 1 : -1)}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <BarChart3 className="w-8 h-8 text-white/30" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Controls */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-6">
                        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                            <div className="flex gap-2">
                                {['Pending', 'Accepted', 'Rejected'].map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-6 py-3 rounded-xl font-medium transition-all ${
                                            activeTab === tab 
                                                ? 'bg-white text-slate-900 shadow-lg' 
                                                : 'bg-white/10 text-white hover:bg-white/20'
                                        }`}
                                    >
                                        {tab} ({getStatusCount(tab === 'Pending' ? 0 : tab === 'Accepted' ? 1 : -1)})
                                    </button>
                                ))}
                            </div>
                            
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <Search className="w-5 h-5 text-gray-300 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                    <input
                                        type="text"
                                        placeholder="Search applications..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                                    <Filter className="w-5 h-5 text-white" />
                                </button>
                                <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                                    <Download className="w-5 h-5 text-white" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Applications Table */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="bg-white/5">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-white font-semibold">Sr. No.</th>
                                        <th className="px-6 py-4 text-left text-white font-semibold">Contact</th>
                                        <th className="px-6 py-4 text-left text-white font-semibold">Location</th>
                                        <th className="px-6 py-4 text-left text-white font-semibold">Site Details</th>
                                        <th className="px-6 py-4 text-left text-white font-semibold">Ownership</th>
                                        <th className="px-6 py-4 text-left text-white font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                
                                <tbody className="divide-y divide-white/10">
                                    {filteredApplications.map((app, index) => (
                                        <tr key={app._id} className="hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4 text-white">{index + 1}</td>
                                            <td className="px-6 py-4">
                                                <div className="text-white">
                                                    <div className="font-medium">{app.youremail}</div>
                                                    <div className="text-gray-300 text-sm">{app.yourphone}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-white">
                                                    <div className="font-medium">{app.city}</div>
                                                    <div className="text-gray-300 text-sm">{app.state}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-white">
                                                    <div className="text-sm">{app.siteadd}</div>
                                                    <div className="text-gray-300 text-xs">{app.area}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                                                    {app.ownershipStatus}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => setSelectedApplication(app)}
                                                        className="p-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    
                                                    {activeTab === 'Pending' && (
                                                        <>
                                                            <button
                                                                onClick={() => handleAction(app._id, 'accept')}
                                                                className="p-2 bg-green-500/20 text-green-300 rounded-lg hover:bg-green-500/30 transition-colors"
                                                            >
                                                                <UserCheck className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleAction(app._id, 'reject')}
                                                                className="p-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
                                                            >
                                                                <UserX className="w-4 h-4" />
                                                            </button>
                                                        </>
                                                    )}
                                                    
                                                    {activeTab === 'Accepted' && (
                                                        <button
                                                            onClick={() => handleAction(app._id, 'franchise')}
                                                            className="p-2 bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-colors"
                                                        >
                                                            <Crown className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                    
                                                    {activeTab === 'Rejected' && (
                                                        <button
                                                            onClick={() => handleDelete(app._id)}
                                                            className="p-2 bg-gray-500/20 text-gray-300 rounded-lg hover:bg-gray-500/30 transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            
                            {filteredApplications.length === 0 && (
                                <div className="text-center py-12">
                                    <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-300 text-lg">No applications found</p>
                                    <p className="text-gray-400 text-sm">Try adjusting your search or filter criteria</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Application Detail Modal */}
                {selectedApplication && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold text-gray-900">Application Details</h3>
                                    <button
                                        onClick={() => setSelectedApplication(null)}
                                        className="p-2 hover:bg-gray-100 rounded-lg"
                                    >
                                        <XCircle className="w-5 h-5" />
                                    </button>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                            <p className="text-gray-900">{selectedApplication.youremail}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                            <p className="text-gray-900">{selectedApplication.yourphone}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                            <p className="text-gray-900">{selectedApplication.city}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                            <p className="text-gray-900">{selectedApplication.state}</p>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Your Address</label>
                                        <p className="text-gray-900">{selectedApplication.youradd}</p>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Site Address</label>
                                        <p className="text-gray-900">{selectedApplication.siteadd}</p>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
                                            <p className="text-gray-900">{selectedApplication.area}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Ownership Status</label>
                                            <p className="text-gray-900">{selectedApplication.ownershipStatus}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    export default ApplicationsTable;