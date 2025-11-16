import React, { useEffect, useState, useCallback } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { FileText, LogOut, ChevronDown, ChevronUp, BookOpen } from "lucide-react";
import lmsService from "../../services/lmsService";
import "../../index.css";

// ✅ Stat Card
const StatCard = ({ title, count, bgColor }) => (
  <div style={{ background: bgColor, padding: "20px", borderRadius: "10px", textAlign: "center", flex: 1, boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
    <h6 style={{ fontSize: "14px", marginBottom: "8px" }}>{title}</h6>
    <h3 style={{ fontSize: "24px", fontWeight: "bold", color: "#2f3b52" }}>{count}</h3>
  </div>
);

const TrainerDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [trainerId, setTrainerId] = useState(null);
  const [trainerName, setTrainerName] = useState("Trainer");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [stats, setStats] = useState({ reports: 0 });

  useEffect(() => {
    const storedId = localStorage.getItem("trainerId");
    const storedName = localStorage.getItem("trainerName");
    if (!storedId) {
      localStorage.clear();
      navigate("/trainerlogin");
      return;
    }
    setTrainerId(parseInt(storedId));
    setTrainerName(storedName || "Trainer");
  }, [navigate]);

  const fetchReports = useCallback(async () => {
    if (!trainerId) return;
    try {
      const res = await lmsService.getTrainerReports(trainerId);
      setStats({ reports: res.data?.length || 0 });
    } catch {
      setStats({ reports: 0 });
    }
  }, [trainerId]);

  useEffect(() => { fetchReports(); }, [fetchReports]);

  const handleLogout = () => { localStorage.clear(); navigate("/trainerlogin"); };
  const toggleDropdown = (key) => setDropdownOpen(prev => ({ ...prev, [key]: !prev[key] }));
  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { label: "Reports", icon: <FileText size={18} />, key: "reports", dropdown: [{ label: "My Reports", path: "/trainer/reports" }] }
  ];

  const chartData = [{ name: "Reports", total: stats.reports }];

  return (
    <div className="dashboard" style={{ display: "flex", height: "100vh" }}>
      <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>{sidebarOpen ? "◀" : "▶"}</button>
        {sidebarOpen && <div className="sidebar-logo"><BookOpen size={32} color="#2f3b52" /><span>LMS Trainer</span></div>}
        <ul className="menu">
          {menuItems.map((item, idx) => (
            <li key={idx}>
              {item.dropdown ? <>
                <div className={`menu-item ${item.dropdown.some(sub => isActive(sub.path)) ? "active" : ""}`} onClick={() => toggleDropdown(item.key)}>
                  <span className="icon">{item.icon}</span>
                  {sidebarOpen && <span>{item.label}</span>}
                  {sidebarOpen && <span className="caret">{dropdownOpen[item.key] ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}</span>}
                </div>
                {dropdownOpen[item.key] && sidebarOpen && <ul className="submenu">
                  {item.dropdown.map((sub, subIdx) => (
                    <li key={subIdx}>
                      <Link to={sub.path} className={`submenu-item ${isActive(sub.path) ? "active" : ""}`}>{sub.label}</Link>
                    </li>
                  ))}
                </ul>}
              </> : null}
            </li>
          ))}
        </ul>
        <button className="logout-btn" onClick={handleLogout}><LogOut size={16} style={{ marginRight: sidebarOpen ? 6 : 0 }}/>{sidebarOpen && "Logout"}</button>
      </aside>

      <main className={`main ${sidebarOpen ? "ml-open" : "ml-closed"}`}>
        <div className="header">
          <div className="header-left"><FileText size={24} color="#2f3b52"/><h3>Trainer Dashboard</h3></div>
          <div className="header-right"><div className="trainer-logo">{trainerName.charAt(0).toUpperCase()}</div><span>{trainerName}</span></div>
        </div>

        <div className="stats-chart">
          <div className="stats-cards" style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <StatCard title="My Reports" count={stats.reports} bgColor="#E8F8F5"/>
          </div>

          <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Bar dataKey="total" fill="#2EBFAF" radius={[5,5,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="child-outlet" style={{ marginTop: "20px" }}>
          <Outlet context={{ fetchReports }}/>
        </div>
      </main>
    </div>
  );
};

export default TrainerDashboard;


