import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import "../../index.css";

const StatCard = ({ title, count, color, bgColor }) => (
  <div className="stat-card" style={{ background: bgColor }}>
    <h6 className="stat-title">{title}</h6>
    <h3 className={`stat-count ${color}`}>{count}</h3>
  </div>
);

const TrainerDashboard = () => {
  const navigate = useNavigate();
  const trainerName = "Trainer User";

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState({ courses: 0, students: 0, sessions: 0 });

  const incrementStat = (type) =>
    setStats((prev) => ({ ...prev, [type]: prev[type] + 1 }));
  const decrementStat = (type) =>
    setStats((prev) => ({ ...prev, [type]: Math.max(prev[type] - 1, 0) }));

  const handleLogout = () => {
    localStorage.removeItem("trainerToken");
    navigate("/trainerlogin");
  };

  const menuItems = [
    { label: "Dashboard", icon: "📊", path: "/trainer" },
    { label: "My Courses", icon: "📚", path: "/trainer/mycourses" },
    { label: "My Batches", icon: "👥", path: "/trainer/mybatches" },
    { label: "Attendance", icon: "✅", path: "/trainer/attendance" },
    { label: "Feedback", icon: "💬", path: "/trainer/feedback" },
    { label: "Schedule", icon: "📅", path: "/trainer/schedule" },
  ];

  const chartData = [
    { name: "Courses", total: stats.courses },
    { name: "Students", total: stats.students },
    { name: "Sessions", total: stats.sessions },
  ];

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? "◀" : "▶"}
        </button>

        {sidebarOpen && <div className="sidebar-logo">KIT Trainer</div>}

        <ul className="menu">
          {menuItems.map((item, idx) => (
            <li key={idx}>
              <Link to={item.path} className="menu-item">
                <span className="icon">{item.icon}</span>
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>

        <button className="logout-btn" onClick={handleLogout}>
          {sidebarOpen ? "Logout" : "⎋"}
        </button>
      </aside>

      {/* Main Dashboard Content */}
      <main className={`main ${sidebarOpen ? "ml-open" : "ml-closed"}`}>
        <div className="header">
          <h3>Dashboard</h3>
          <span>{trainerName}</span>
        </div>

        <div className="stats-chart">
          <div className="stats-cards">
            <StatCard title="Courses Assigned" count={stats.courses} color="text-primary" bgColor="#e0f7fa" />
            <StatCard title="Students Enrolled" count={stats.students} color="text-success" bgColor="#e8f5e9" />
            <StatCard title="Upcoming Sessions" count={stats.sessions} color="text-danger" bgColor="#fff3e0" />
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
          <Outlet context={{ incrementStat, decrementStat, stats }} />
        </div>
      </main>
    </div>
  );
};

export default TrainerDashboard;




