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

// Stat Card Component
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

const TrainerDashboard = () => {
  const navigate = useNavigate();
  const trainerName = "Trainer User";

  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Initialize all stats with 0
  const [stats, setStats] = useState({
    courses: 0,
    students: 0,
    sessions: 0,
    feedback: 0, // optional read-only
  });

  // Increment / Decrement functions
  const incrementStat = (key) => {
    setStats((prev) => ({ ...prev, [key]: prev[key] + 1 }));
  };

  const decrementStat = (key) => {
    setStats((prev) => ({
      ...prev,
      [key]: prev[key] > 0 ? prev[key] - 1 : 0, // prevent negative
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("trainerToken");
    navigate("/trainerlogin");
  };

  const menuItems = [
    { label: "Dashboard", icon: "bi-speedometer2", path: "/trainer" },
    { label: "My Courses", icon: "bi-journal-text", path: "/trainer/mycourses" },
    { label: "My Batches", icon: "bi-people", path: "/trainer/mybatches" },
    { label: "Attendance", icon: "bi-check2-square", path: "/trainer/attendance" },
    { label: "Feedback", icon: "bi-chat-left-text", path: "/trainer/feedback" },
    { label: "Schedule", icon: "bi-calendar-event", path: "/trainer/schedule" },
  ];

  const chartData = [
    { name: "Courses", total: stats.courses },
    { name: "Students", total: stats.students },
    { name: "Sessions", total: stats.sessions },
  ];

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          background: "linear-gradient(180deg, #43cea2, #185a9d)",
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

        {sidebarOpen && (
          <div
            style={{
              textAlign: "center",
              marginBottom: 20,
              borderBottom: "1px solid rgba(255,255,255,0.2)",
              paddingBottom: 10,
            }}
          >
            <h4 style={{ color: "#fff", letterSpacing: 1 }}>KIT Trainer</h4>
          </div>
        )}

        <ul className="nav flex-column flex-grow-1 mt-2">
          {menuItems.map((item, idx) => (
            <li key={idx} className="nav-item">
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
                <i
                  className={`bi ${item.icon} me-2`}
                  style={{ fontSize: 18 }}
                ></i>
                {sidebarOpen && item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div
          style={{
            margin: 20,
            display: "flex",
            justifyContent: sidebarOpen ? "flex-start" : "center",
          }}
        >
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
      <main
        style={{
          flexGrow: 1,
          marginLeft: sidebarOpen ? 250 : 70,
          height: "100vh",
          overflowY: "auto",
          padding: 20,
          backgroundColor: "#ffffff",
          transition: "margin-left 0.3s",
        }}
      >
        {/* Dashboard Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 30,
            padding: 20,
            backgroundColor: "#f5f5f5",
            borderRadius: 15,
            color: "#353333",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h3 className="m-0 fw-bold">Dashboard</h3>
          <span className="fw-bold">{trainerName}</span>
        </div>

        {/* Stats Cards + Chart */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
            marginBottom: 30,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", flex: 1, flexWrap: "wrap" }}>
            <StatCard
              title="Courses Assigned"
              count={stats.courses}
              color="text-primary"
              bgColor="linear-gradient(135deg, #e3f2fd, #bbdefb)"
            />
            <StatCard
              title="Students Enrolled"
              count={stats.students}
              color="text-success"
              bgColor="linear-gradient(135deg, #e8f5e9, #c8e6c9)"
            />
            <StatCard
              title="Upcoming Sessions"
              count={stats.sessions}
              color="text-danger"
              bgColor="linear-gradient(135deg, #fff3e0, #ffe0b2)"
            />
          </div>

          <div style={{ flex: 1, minWidth: 250, height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#43cea2" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Child Routes */}
        <div className="m-0 p-3">
          <Outlet context={{ incrementStat, decrementStat, stats }} />
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

export default TrainerDashboard;

