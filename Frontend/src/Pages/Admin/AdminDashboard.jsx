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

// StatCard Component
const StatCard = ({ title, count, color, bgColor }) => (
  <div className="col-md-4 p-2">
    <div
      className="card border-0 shadow-sm p-4 text-center h-100"
      style={{
        borderRadius: "15px",
        background: bgColor,
        transition: "transform 0.3s, box-shadow 0.3s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
      }}
    >
      <h6 className="text-secondary">{title}</h6>
      <h3 className={`fw-bold ${color}`}>{count}</h3>
    </div>
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
  { label: "Dashboard", icon: "bi-speedometer2", path: "/admin" },
  {
    label: "Students",
    icon: "bi-person",
    key: "students",
    dropdown: [{ label: "Add & Manage Students", path: "/admin/addstudent" }],
  },
  {
    label: "Trainers",
    icon: "bi-person-badge",
    key: "trainers",
    dropdown: [{ label: "Add & Manage Trainers", path: "/admin/addtrainer" }],
  },
  {
    label: "Courses",
    icon: "bi-journal-text",
    key: "courses",
    dropdown: [{ label: "Add & Manage Course", path: "/admin/managecourse" }],
  },
  {
    label: "Reports & Analytics",
    icon: "bi-bar-chart-line",
    key: "reports",
    dropdown: [
      { label: "View Reports & Analytics", path: "/admin/reportsanalytics" },
    ],
  },
];

  // Chart data based on totals
  const chartData = [
    { name: "Students", total: stats.students },
    { name: "Trainers", total: stats.trainers },
    { name: "Courses", total: stats.courses },
  ];

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw", fontFamily: "Arial, sans-serif" }}>
      {/* Sidebar */}
      <aside
        style={{
          background: "linear-gradient(180deg, #4f5bd5, #6c7bff)",
          width: sidebarOpen ? 250 : 70,
          transition: "width 0.3s",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          display: "flex",
          flexDirection: "column",
          borderRight: "2px solid rgba(255,255,255,0.2)",
        }}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: "1rem",
            margin: "10px",
            cursor: "pointer",
            alignSelf: sidebarOpen ? "flex-end" : "center",
          }}
        >
          {sidebarOpen ? "◀" : "▶"}
        </button>

        {/* Logo / Title */}
        {sidebarOpen && (
          <div style={{ textAlign: "center", marginBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.2)", paddingBottom: 10 }}>
            <h4 style={{ color: "#fff", letterSpacing: 1 }}>KIT Admin</h4>
          </div>
        )}

        {/* Menu */}
        <ul className="nav flex-column flex-grow-1 mt-2">
          {menuItems.map((item, idx) => (
            <li key={idx} className="nav-item">
              {item.dropdown ? (
                <>
                  <div
                    className="nav-link d-flex align-items-center"
                    style={{
                      color: "#fff",
                      padding: "10px 20px",
                      borderRadius: 10,
                      margin: "4px 10px",
                      fontWeight: 500,
                      cursor: "pointer",
                      transition: "all 0.3s",
                    }}
                    onClick={() => toggleDropdown(item.key)}
                  >
                    <i className={`bi ${item.icon} me-2`} style={{ fontSize: 18 }}></i>
                    {sidebarOpen && item.label}
                    {sidebarOpen && <i className={`bi ms-auto ${dropdownOpen[item.key] ? "bi-caret-up-fill" : "bi-caret-down-fill"}`}></i>}
                  </div>
                  {dropdownOpen[item.key] && sidebarOpen && (
                    <ul className="nav flex-column ms-4">
                      {item.dropdown.map((sub, subIdx) => (
                        <li key={subIdx} className="nav-item">
                          <Link
                            to={sub.path}
                            className="nav-link"
                            style={{
                              color: "#fff",
                              padding: "6px 16px",
                              borderRadius: 8,
                              margin: "2px 10px",
                              fontWeight: 400,
                            }}
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  to={item.path}
                  className="nav-link d-flex align-items-center"
                  style={{
                    color: "#fff",
                    padding: "10px 20px",
                    borderRadius: 10,
                    margin: "4px 10px",
                    fontWeight: 500,
                  }}
                >
                  <i className={`bi ${item.icon} me-2`} style={{ fontSize: 18 }}></i>
                  {sidebarOpen && item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Logout */}
        <div style={{ margin: 20, display: "flex", justifyContent: sidebarOpen ? "flex-start" : "center" }}>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#ff4b5c",
              border: "none",
              color: "#fff",
              padding: "8px 16px",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: 500,
              width: sidebarOpen ? "100%" : 40,
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#ff6378")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#ff4b5c")}
          >
            {sidebarOpen ? "Logout" : "⎋"}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flexGrow: 1, marginLeft: sidebarOpen ? 250 : 70, height: "100vh", overflowY: "auto", padding: 20, backgroundColor: "#ffffff", transition: "margin-left 0.3s" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, padding: 15, backgroundColor: "#f5f5f5", borderRadius: 15, color: "#353333", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
          <h3 className="m-0 fw-bold">Dashboard</h3>
          <span className="fw-bold">{adminName}</span>
        </div>

        {/* Stats Cards + Chart in one row */}
        <div style={{ display: "flex", gap: "20px", alignItems: "center", marginBottom: 30 }}>
          {/* Stats Cards */}
          <div style={{ display: "flex", flex: 1 }}>
            <StatCard title="Total Students" count={stats.students} color="text-primary" bgColor="linear-gradient(135deg, #e0f7fa, #b2ebf2)" />
            <StatCard title="Total Trainers" count={stats.trainers} color="text-success" bgColor="linear-gradient(135deg, #e8f5e9, #c8e6c9)" />
            <StatCard title="Active Courses" count={stats.courses} color="text-danger" bgColor="linear-gradient(135deg, #fff3e0, #ffe0b2)" />
          </div>

          {/* Chart */}
          <div style={{ flex: 1, height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Child routes */}
        <div className="m-0 p-3">
          <Outlet context={{ incrementStat, decrementStat }} />
        </div>

        <style>{`
          .nav-link:hover {
            background-color: rgba(255,255,255,0.25);
            transform: translateX(5px);
            border-left: 4px solid #9a9696ff;
            color: #fff !important;
          }
          .nav-link.active {
            background-color: rgba(255,255,255,0.3);
            border-left: 4px solid #5a5555ff;
            font-weight: bold;
          }
        `}</style>
      </main>
    </div>
  );
};

export default AdminDashboard;
