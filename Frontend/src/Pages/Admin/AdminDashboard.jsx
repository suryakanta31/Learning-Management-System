import React, { useState } from "react";
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
import "../../index.css";
// custom styles

// StatCard Component
const StatCard = ({ title, count, color, bgColor }) => (
  <div className="stat-card" style={{ background: bgColor }}>
    <h6 className="stat-title">{title}</h6>
    <h3 className={`stat-count ${color}`}>{count}</h3>
  </div>
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const adminName = "Admin User";

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [stats, setStats] = useState({ students: 0, trainers: 0, courses: 0 });

  const incrementStat = (type) =>
    setStats((prev) => ({ ...prev, [type]: prev[type] + 1 }));
  const decrementStat = (type) =>
    setStats((prev) => ({ ...prev, [type]: Math.max(prev[type] - 1, 0) }));

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/adminlogin");
  };

  const toggleDropdown = (key) => {
    setDropdownOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const menuItems = [
    { label: "Dashboard", icon: "📊", path: "/admin" },
    {
      label: "Students",
      icon: "👤",
      key: "students",
      dropdown: [{ label: "Add & Manage Students", path: "/admin/addstudent" }],
    },
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
      dropdown: [{ label: "Add & Manage Course", path: "/admin/managecourse" }],
    },
    {
      label: "Reports",
      icon: "📈",
      key: "reports",
      dropdown: [{ label: "View Reports", path: "/admin/reportsanalytics" }],
    },
  ];

  const chartData = [
    { name: "Students", total: stats.students },
    { name: "Trainers", total: stats.trainers },
    { name: "Courses", total: stats.courses },
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
                  <div
                    className="menu-item"
                    onClick={() => toggleDropdown(item.key)}
                  >
                    <span className="icon">{item.icon}</span>
                    {sidebarOpen && <span>{item.label}</span>}
                    {sidebarOpen && <span className="caret">{dropdownOpen[item.key] ? "▲" : "▼"}</span>}
                  </div>
                  {dropdownOpen[item.key] && sidebarOpen && (
                    <ul className="submenu">
                      {item.dropdown.map((sub, subIdx) => (
                        <li key={subIdx}>
                          <Link to={sub.path} className="submenu-item">{sub.label}</Link>
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

        {/* Stats & Chart */}
        <div className="stats-chart">
          <div className="stats-cards">
            <StatCard title="Total Students" count={stats.students} color="primary" bgColor="#e0f7fa" />
            <StatCard title="Total Trainers" count={stats.trainers} color="success" bgColor="#e8f5e9" />
            <StatCard title="Active Courses" count={stats.courses} color="danger" bgColor="#fff3e0" />
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
          <Outlet context={{ incrementStat, decrementStat }} />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

