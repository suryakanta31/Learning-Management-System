import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, ResponsiveContainer, Legend
} from "recharts";
import { RefreshCw } from "lucide-react";
import lmsService from "../../services/lmsService";
import "../../index.css";

const ReportsAnalytics = () => {
  const [coursePerformance, setCoursePerformance] = useState([]);
  const [trainerWorkload, setTrainerWorkload] = useState([]);
  const [batchSummary, setBatchSummary] = useState([]);
  const [loading, setLoading] = useState(false);

  const COLORS = ["#4f46e5", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6"];

  const fetchReports = async () => {
    try {
      setLoading(true);
      const [courseRes, trainerRes, batchRes] = await Promise.all([
        lmsService.getCoursePerformance(),
        lmsService.getTrainerWorkload(),
        lmsService.getBatchSummary(),
      ]);
      setCoursePerformance(courseRes.data);
      setTrainerWorkload(trainerRes.data);
      setBatchSummary(batchRes.data);
    } catch (err) {
      console.error("Error loading reports:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="page-container report-page">
      {/* ===== Header ===== */}
      <div className="page-header">
        <h2 className="page-title">📊 Reports & Analytics</h2>
        <button onClick={fetchReports} className="toggle-form-btn" style={{ backgroundColor: "#3b82f6" }}>
          <RefreshCw size={18} />
          {loading ? "Refreshing..." : "Refresh Data"}
        </button>
      </div>

      {/* ===== Charts ===== */}
      <div className="charts-grid">
        <div className="chart-card">
          <h3>🎓 Course Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={coursePerformance} margin={{ top: 20, right: 20, left: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="courseName" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="performance" fill="#4f46e5" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>🧑‍🏫 Trainer Workload</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={trainerWorkload} dataKey="batchesHandled" nameKey="trainerName" outerRadius={100} label>
                {trainerWorkload.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ===== Table ===== */}
      <div className="table-wrapper">
        <h3 className="table-title">📅 Batch Summary</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Batch</th>
              <th>Course</th>
              <th>Trainer</th>
              <th>Start</th>
              <th>End</th>
            </tr>
          </thead>
          <tbody>
            {batchSummary.length === 0 ? (
              <tr><td colSpan="6" style={{ textAlign: "center" }}>No data available</td></tr>
            ) : (
              batchSummary.map((b, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{b.batchName}</td>
                  <td>{b.courseName}</td>
                  <td>{b.trainerName}</td>
                  <td>{b.startDate}</td>
                  <td>{b.endDate}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsAnalytics;

