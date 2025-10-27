import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

// StatCard Component
const StatCard = ({ title, count, colorClass, bgClass }) => (
  <div className="stat-card-container">
    <div className={`stat-card ${bgClass} ${colorClass}`}>
      <h6>{title}</h6>
      <h3>{count}</h3>
    </div>
  </div>
);

const StudentDashboard = () => {
  const navigate = useNavigate();
  const studentName = "Kapil Sharma";

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState({ total: 0, courses: 0, assignments: 0, sessions: 0 });
  const [sessions, setSessions] = useState([]); // Dynamic sessions state

  const dashboardMessages = [
    "Keep learning — you’re 70% done with your React Course!",
    "New course ‘Advanced Java’ is now available for enrollment.",
  ];

  // Update stats dynamically
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
    { label: "Dashboard", icon: "🖥️", path: "/student" },
    { label: "My Courses", icon: "📚", path: "/student/smycourses" },
    { label: "Assignments / Tests", icon: "📝", path: "/student/assignments" },
    { label: "Certificates", icon: "🏆", path: "/student/certificates" },
    { label: "Trainer Feedback", icon: "💬", path: "/student/feedback" },
    { label: "Sessions", icon: "⏰", path: "/student/sessions" },
  ];

  return (
    <div className="dashboard-wrapper">

      <aside className={`sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
        <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? "◀" : "▶"}
        </button>

        {sidebarOpen && <div className="sidebar-header">Kapil IT LMS</div>}

        <ul className="sidebar-menu">
          {menuItems.map((item, idx) => (
            <li key={idx}>
              <Link to={item.path} className="sidebar-link">
                <span className="sidebar-icon">{item.icon}</span>
                {sidebarOpen && <span className="sidebar-label">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>

        <div className="sidebar-logout">
          <button onClick={handleLogout}>{sidebarOpen ? "Logout" : "⎋"}</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`main-content ${sidebarOpen ? "with-sidebar" : "collapsed-sidebar"}`}>
        <div className="dashboard-header">
          <h3>Dashboard</h3>
          <span>{studentName}</span>
        </div>

        {/* Stats */}
        <div className="dashboard-stats">
          <StatCard title="🧮 Total" count={stats.total} colorClass="text-primary" bgClass="bg-gradient1" />
          <StatCard title="📚 Courses" count={stats.courses} colorClass="text-info" bgClass="bg-gradient2" />
          <StatCard title="📝 Assignments" count={stats.assignments} colorClass="text-warning" bgClass="bg-gradient3" />
          <StatCard title="🎯 Sessions" count={stats.sessions} colorClass="text-success" bgClass="bg-gradient4" />
        </div>

        {/* Upcoming Sessions */}
        <div className="upcoming-classes">
          {sessions.length === 0 ? (
            <div className="empty-list">No upcoming sessions.</div>
          ) : (
            sessions.map((cls, idx) => (
              <div key={idx} className="class-card">
                <strong>{cls.title}</strong>
                <div>{cls.date}</div>
                <div>{cls.time}</div>
              </div>
            ))
          )}
        </div>

        {/* Dashboard Messages */}
        <div className="dashboard-messages">
          {dashboardMessages.map((msg, idx) => (
            <div key={idx} className="message-card">{msg}</div>
          ))}
        </div>

        {/* Child Routes */}
        <div className="dashboard-outlet">
          {/* Pass sessions state and setter to child routes */}
          <Outlet context={{ incrementStat, decrementStat, sessions, setSessions }} />
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;







