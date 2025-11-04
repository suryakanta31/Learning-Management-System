import React, { useEffect, useState } from "react";
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
  const [adminName, setAdminName] = useState(""); // ✅ dynamic admin name
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [stats, setStats] = useState({
    trainers: 0,
    courses: 0,
    batches: 0,
  });

  // ✅ Load admin name from localStorage
  useEffect(() => {
    const storedAdmin = localStorage.getItem("adminName");
    if (storedAdmin) {
      setAdminName(storedAdmin);
    } else {
      setAdminName("Admin");
    }
  }, []);

  // ✅ Fetch counts
  const fetchStats = async () => {
    try {
      const [trainersRes, coursesRes, batchesRes] = await Promise.all([
        axios.get("http://localhost:8080/api/trainers/"),
        axios.get("http://localhost:8080/api/course/"),
        axios.get("http://localhost:8080/api/batches/"),
      ]);

      setStats({
        trainers: trainersRes.data.length,
        courses: coursesRes.data.length,
        batches: batchesRes.data.length,
      });
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const incrementStat = (type) => {
    setStats((prev) => ({ ...prev, [type]: prev[type] + 1 }));
  };

  // ✅ Logout clears all admin data
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

      {/* Main Content */}
      <main className={`main ${sidebarOpen ? "ml-open" : "ml-closed"}`}>
        <div className="header">
          <h3>Dashboard</h3>
          <span>{adminName}</span>
        </div>

        <div className="stats-chart">
          <div className="stats-cards">
            <StatCard title="Total Trainers" count={stats.trainers} color="primary" bgColor="#e0f7fa" />
            <StatCard title="Active Courses" count={stats.courses} color="success" bgColor="#e8f5e9" />
            <StatCard title="Total Batches" count={stats.batches} color="danger" bgColor="#fff3e0" />
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="child-outlet">
          <Outlet context={{ incrementStat, fetchStats }} />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;


