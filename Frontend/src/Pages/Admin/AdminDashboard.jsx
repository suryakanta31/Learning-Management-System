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
import { BarChart3, Users, BookOpen, Layers, FileText, LogOut, ChevronDown, ChevronUp, LayoutDashboard } from "lucide-react";
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

  useEffect(() => {
    const storedAdmin = localStorage.getItem("adminName");
    if (storedAdmin) setAdminName(storedAdmin);
  }, []);

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
      setStats({ trainers: 0, courses: 0, batches: 0 });
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const updateStat = (type, action = "increment") => {
    setStats((prev) => {
      const newValue =
        action === "increment"
          ? prev[type] + 1
          : Math.max(prev[type] - 1, 0);
      return { ...prev, [type]: newValue };
    });
    setTimeout(fetchStats, 500);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminName");
    navigate("/adminlogin");
  };

  const toggleDropdown = (key) => {
    setDropdownOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const menuItems = [
    { label: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/admin" },
    {
      label: "Trainers",
      icon: <Users size={18} />,
      key: "trainers",
      dropdown: [{ label: "Manage Trainers", path: "/admin/addtrainer" }],
    },
    {
      label: "Courses",
      icon: <BookOpen size={18} />,
      key: "courses",
      dropdown: [{ label: "Manage Courses", path: "/admin/managecourse" }],
    },
    {
      label: "Batches",
      icon: <Layers size={18} />,
      key: "batches",
      dropdown: [{ label: "Manage Batches", path: "/admin/managebatches" }],
    },
    {
      label: "Reports",
      icon: <FileText size={18} />,
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

        {sidebarOpen && (
          <div className="sidebar-logo">
            <BarChart3 size={32} color="#2f3b52" />
            <span>KIT Admin</span>
          </div>
        )}

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
                        {dropdownOpen[item.key] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
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
          <LogOut size={16} style={{ marginRight: sidebarOpen ? 6 : 0 }} />
          {sidebarOpen && "Logout"}
        </button>
      </aside>

      {/* Main Section */}
      <main className={`main ${sidebarOpen ? "ml-open" : "ml-closed"}`}>
        <div className="header">
          <div className="header-left">
            <BarChart3 size={24} color="#2f3b52" />
            <h3>Dashboard</h3>
          </div>
          <div className="header-right">
            <div className="admin-logo">
              {adminName.charAt(0).toUpperCase()}
            </div>
            <span>{adminName}</span>
          </div>
        </div>

        <div className="stats-chart">
          <div className="stats-cards">
            <StatCard title="Total Trainers" count={stats.trainers} color="primary" bgColor="#E8F8F5" />
            <StatCard title="Active Courses" count={stats.courses} color="success" bgColor="#EAF3FC" />
            <StatCard title="Total Batches" count={stats.batches} color="warning" bgColor="#FFF7E6" />
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#2EBFAF" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="child-outlet">
          <Outlet context={{ fetchStats, updateStat }} />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;



