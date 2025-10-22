import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

// StatCard Component
const StatCard = ({ title, count, color, bgColor }) => (
  <div style={{ flex: 1 }}>
    <div
      className="card border-0 shadow-sm p-3 text-center h-100"
      style={{
        borderRadius: "15px",
        background: bgColor,
        transition: "transform 0.3s, box-shadow 0.3s",
        cursor: "pointer",
        minHeight: 100,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
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

const StudentDashboard = () => {
  const navigate = useNavigate();
  const studentName = "Kapil Sharma";

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState({ total: 0, courses: 0, assignments: 0, sessions: 0 });

  const upcomingClasses = [
    { title: "JavaScript DOM Manipulation", date: "Oct 22, 2025", time: "9:00 AM" },
    { title: "Spring Boot Basics", date: "Oct 23, 2025", time: "11:30 AM" },
  ];

  const dashboardMessages = [
    "Keep learning — you’re 70% done with your React Course!",
    "New course ‘Advanced Java’ is now available for enrollment.",
  ];

  const incrementStat = (key) => {
    setStats((prev) => {
      const newVal = prev[key] + 1;
      const newTotal = key === "total" ? newVal : prev.total + 1;
      return { ...prev, [key]: newVal, total: newTotal };
    });
  };

  const decrementStat = (key) => {
    setStats((prev) => {
      const newVal = Math.max(prev[key] - 1, 0);
      const delta = prev[key] - newVal;
      return { ...prev, [key]: newVal, total: Math.max(prev.total - delta, 0) };
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("studentToken");
    navigate("/studentlogin");
  };

  const menuItems = [
    { label: "Dashboard", icon: "bi-speedometer2", path: "/student" },
    { label: "My Courses", icon: "bi-journal-text", path: "/student/smycourses" },
    { label: "Assignments / Tests", icon: "bi-pencil-square", path: "/student/assignments" },
    { label: "Certificates", icon: "bi-award", path: "/student/certificates" },
    { label: "Trainer Feedback", icon: "bi-chat-left-text", path: "/student/feedback" },
    { label: "Sessions", icon: "bi-clock", path: "/student/sessions" },
  ];

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        fontFamily: "Arial, sans-serif",
        overflow: "hidden",
      }}
    >
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
          overflow: "hidden",
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
              borderBottom: "1px solid rgba(255,255,255,0.2)",
              paddingBottom: 10,
            }}
          >
            <h4 style={{ color: "#fff", letterSpacing: 1 }}>Kapil IT LMS</h4>
          </div>
        )}

        <ul
          className="nav flex-column flex-grow-1 mt-2"
          style={{ overflowY: "auto" }}
        >
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
                <i className={`bi ${item.icon} me-2`} style={{ fontSize: 18 }}></i>
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
          padding: 20,
          backgroundColor: "#ffffff",
          transition: "margin-left 0.3s",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 15,
            backgroundColor: "#f5f5f5",
            borderRadius: 15,
            color: "#353333",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h3 className="m-0 fw-bold">Dashboard</h3>
          <span className="fw-bold">{studentName}</span>
        </div>

        {/* Stats Cards */}
        <div style={{ display: "flex", gap: "15px", marginTop: 10 }}>
          <StatCard
            title="🧮 Total"
            count={stats.total}
            color="text-primary"
            bgColor="linear-gradient(135deg, #e0f7fa, #b2ebf2)"
          />
          <StatCard
            title="📚 Courses"
            count={stats.courses}
            color="text-info"
            bgColor="linear-gradient(135deg, #e3f2fd, #bbdefb)"
          />
          <StatCard
            title="📝 Assignments"
            count={stats.assignments}
            color="text-warning"
            bgColor="linear-gradient(135deg, #fff8e1, #ffe082)"
          />
          <StatCard
            title="🎯 Sessions"
            count={stats.sessions}
            color="text-success"
            bgColor="linear-gradient(135deg, #e8f5e9, #c8e6c9)"
          />
        </div>

        {/* Upcoming Classes */}
        <div style={{ display: "flex", gap: 10, marginTop: 15 }}>
          {upcomingClasses.map((cls, idx) => (
            <div
              key={idx}
              style={{
                flex: 1,
                padding: 10,
                backgroundColor: "#f0f4ff",
                borderRadius: 10,
                textAlign: "center",
              }}
            >
              <strong>{cls.title}</strong>
              <div>{cls.date}</div>
              <div>{cls.time}</div>
            </div>
          ))}
        </div>

        {/* Dashboard Messages */}
        <div style={{ display: "flex", gap: 10, marginTop: 15 }}>
          {dashboardMessages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                flex: 1,
                padding: 10,
                backgroundColor: "#fff3e0",
                borderRadius: 10,
                textAlign: "center",
              }}
            >
              {msg}
            </div>
          ))}
        </div>

        {/* Child Routes */}
        <div style={{ flex: "1 1 auto", overflowY: "auto", marginTop: 10 }}>
          <Outlet context={{ incrementStat, decrementStat }} />
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;





