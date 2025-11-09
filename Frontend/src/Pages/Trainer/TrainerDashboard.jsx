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
import {
  BookOpen,
  Layers,
  FileText,
  LogOut,
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
  Calendar,
} from "lucide-react";
import axios from "axios";
import "../../index.css";

// ✅ Reusable Stat Card
const StatCard = ({ title, count, color, bgColor }) => (
  <div className="stat-card" style={{ background: bgColor }}>
    <h6 className="stat-title">{title}</h6>
    <h3 className={`stat-count ${color}`}>{count}</h3>
  </div>
);

const TrainerDashboard = () => {
  const navigate = useNavigate();
  const [trainerName, setTrainerName] = useState("Trainer");
  const [trainerId, setTrainerId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [stats, setStats] = useState({ courses: 0, batches: 0, sessions: 0 });

  // ✅ Load trainer info from localStorage
  useEffect(() => {
    const storedId = localStorage.getItem("trainerId");
    const storedName = localStorage.getItem("trainerName");

    if (!storedId || isNaN(parseInt(storedId))) {
      localStorage.clear();
      navigate("/trainerlogin");
      return;
    }

    setTrainerId(parseInt(storedId));
    setTrainerName(storedName || "Trainer");
  }, [navigate]);

  // ✅ Fetch courses, batches, sessions stats
  const fetchStats = useCallback(async () => {
    if (!trainerId) return;

    try {
      const [coursesRes, batchesRes, sessionsRes] = await Promise.all([
        axios.get(`http://localhost:8080/api/trainers/${trainerId}/courses`),
        axios.get(`http://localhost:8080/api/trainers/${trainerId}/batches`),
        axios.get(`http://localhost:8080/api/trainers/${trainerId}/sessions`),
      ]);

      setStats({
        courses: coursesRes.data?.length || 0,
        batches: batchesRes.data?.length || 0,
        sessions: sessionsRes.data?.length || 0,
      });
    } catch (err) {
      console.error("Error fetching trainer stats:", err);
      setStats({ courses: 0, batches: 0, sessions: 0 });
    }
  }, [trainerId]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/trainerlogin");
  };

  // Toggle dropdown menus
  const toggleDropdown = (key) =>
    setDropdownOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  // Sidebar menu
  const menuItems = [
    { label: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/trainer" },
    {
      label: "My Courses",
      icon: <BookOpen size={18} />,
      key: "courses",
      dropdown: [{ label: "View Courses", path: "/trainer/courses" }],
    },
    {
      label: "My Batches",
      icon: <Layers size={18} />,
      key: "batches",
      dropdown: [{ label: "View Batches", path: "/trainer/batches" }],
    },
    {
      label: "Sessions / Schedule",
      icon: <Calendar size={18} />,
      key: "sessions",
      dropdown: [
        { label: "View Sessions", path: "/trainer/sessions" },
        { label: "Add Session", path: "/trainer/sessions/add" },
      ],
    },
    {
      label: "Reports",
      icon: <FileText size={18} />,
      key: "reports",
      dropdown: [{ label: "My Reports", path: "/trainer/reports" }],
    },
  ];

  // Chart data
  const chartData = [
    { name: "Courses", total: stats.courses },
    { name: "Batches", total: stats.batches },
    { name: "Sessions", total: stats.sessions },
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
            <BookOpen size={32} color="#2f3b52" />
            <span>LMS Trainer</span>
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

      {/* Main Content */}
      <main className={`main ${sidebarOpen ? "ml-open" : "ml-closed"}`}>
        {/* Header */}
        <div className="header">
          <div className="header-left">
            <BookOpen size={24} color="#2f3b52" />
            <h3>Dashboard</h3>
          </div>
          <div className="header-right">
            <div className="trainer-logo">{trainerName.charAt(0).toUpperCase()}</div>
            <span>{trainerName}</span>
          </div>
        </div>

        {/* Stats Cards + Chart */}
        <div className="stats-chart">
          <div className="stats-cards">
            <StatCard title="My Courses" count={stats.courses} color="primary" bgColor="#E8F8F5" />
            <StatCard title="My Batches" count={stats.batches} color="success" bgColor="#EAF3FC" />
            <StatCard title="My Sessions" count={stats.sessions} color="warning" bgColor="#FFF7E6" />
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

        {/* Nested Pages */}
        <div className="child-outlet">
          <Outlet context={{ fetchStats }} />
        </div>
      </main>
    </div>
  );
};

export default TrainerDashboard;
