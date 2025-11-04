import React, { useEffect, useState, useCallback } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import "../../index.css";

const StatCard = ({ title, count, color, bgColor }) => (
  <div className="stat-card" style={{ background: bgColor }}>
    <h6 className="stat-title">{title}</h6>
    <h3 className={`stat-count ${color}`}>{count}</h3>
  </div>
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("Admin");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [stats, setStats] = useState({ trainers: 0, courses: 0, batches: 0 });

  // ✅ Load admin name
  useEffect(() => {
    const storedAdmin = localStorage.getItem("adminName");
    if (storedAdmin) setAdminName(storedAdmin);
  }, []);

  // ✅ Fetch latest counts from backend
  const fetchStats = useCallback(async () => {
    try {
      const [trainersRes, coursesRes, batchesRes] = await Promise.all([
  axios.get("http://localhost:8080/api/trainers"),
  axios.get("http://localhost:8080/api/courses"),
  axios.get("http://localhost:8080/api/batches"),
]);


      setStats({
        trainers: trainersRes.data?.length || 0,
        courses: coursesRes.data?.length || 0,
        batches: batchesRes.data?.length || 0,
      });
    } catch (err) {
      console.error("Error fetching stats:", err);
      setStats({ trainers: 0, courses: 0, batches: 0 }); // fallback to 0
    }
  }, []);

  // ✅ Fetch initial stats on mount
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // ✅ Increment / Decrement with backend sync
  const updateStat = (type, action = "increment") => {
    setStats((prev) => {
      const newValue =
        action === "increment"
          ? prev[type] + 1
          : Math.max(prev[type] - 1, 0);
      return { ...prev, [type]: newValue };
    });

    // Fetch updated real-time data again (after local update)
    setTimeout(fetchStats, 500); // small delay for backend sync
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminName");
    navigate("/adminlogin");
  };

  const toggleDropdown = (key) => {
    setDropdownOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const menuItems = [
    { label: "Dashboard", icon: "📊", path: "/admin" },
    {
      label: "Trainers",
      icon: "🧑‍🏫",
      key: "trainers",
      dropdown: [{ label: "Add & Manage Trainers", path: "/admin/addtrainer" }],
    },
    {
      label: "Courses",
      icon: "📚",
      key: "courses",
      dropdown: [{ label: "Add & Manage Courses", path: "/admin/managecourse" }],
    },
    {
      label: "Batches",
      icon: "🗓️",
      key: "batches",
      dropdown: [{ label: "Add & Manage Batches", path: "/admin/managebatches" }],
    },
    {
      label: "Reports",
      icon: "📈",
      key: "reports",
      dropdown: [{ label: "View Reports", path: "/admin/reportsanalytics" }],
    },
  ];

  const chartData = [
    { name: "Trainers", total: stats.trainers },
    { name: "Courses", total: stats.courses },
    { name: "Batches", total: stats.batches },
  ];

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? "◀" : "▶"}
        </button>

        {sidebarOpen && <div className="sidebar-logo">KIT Admin</div>}

        <ul className="menu">
          {menuItems.map((item, idx) => (
            <li key={idx}>
              {item.dropdown ? (
                <>
                  <div className="menu-item" onClick={() => toggleDropdown(item.key)}>
                    <span className="icon">{item.icon}</span>
                    {sidebarOpen && <span>{item.label}</span>}
                    {sidebarOpen && (
                      <span className="caret">
                        {dropdownOpen[item.key] ? "▲" : "▼"}
                      </span>
                    )}
                  </div>
                  {dropdownOpen[item.key] && sidebarOpen && (
                    <ul className="submenu">
                      {item.dropdown.map((sub, subIdx) => (
                        <li key={subIdx}>
                          <Link to={sub.path} className="submenu-item">
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link to={item.path} className="menu-item">
                  <span className="icon">{item.icon}</span>
                  {sidebarOpen && <span>{item.label}</span>}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <button className="logout-btn" onClick={handleLogout}>
          {sidebarOpen ? "Logout" : "⎋"}
        </button>
      </aside>

      {/* Main */}
      <main className={`main ${sidebarOpen ? "ml-open" : "ml-closed"}`}>
        <div className="header">
          <h3>Dashboard</h3>
          <span>{adminName}</span>
        </div>

        <div className="stats-chart">
          <div className="stats-cards">
            <StatCard title="Total Trainers" count={stats.trainers} color="primary" bgColor="#E8F8F5" />
            <StatCard title="Active Courses" count={stats.courses} color="success" bgColor="#EAF3FC" />
            <StatCard title="Total Batches" count={stats.batches} color="warning" bgColor="#FFF7E6" />
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#2EBFAF" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ✅ Outlet with sync functions */}
        <div className="child-outlet">
          <Outlet context={{ fetchStats, updateStat }} />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;




