import React, { useEffect, useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer
} from "recharts";
import { RefreshCw } from "lucide-react";
import lmsService from "../../services/lmsService";
import "../../index.css";

const ReportsAnalytics = () => {
  const [trainerWorkload, setTrainerWorkload] = useState([]);
  const [batchSummary, setBatchSummary] = useState([]);
  const [loading, setLoading] = useState(false);

  const COLORS = ["#4f46e5", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6"];

  const fetchReports = async () => {
    try {
      setLoading(true);
      const [workloadRes, batchRes] = await Promise.all([
        lmsService.getTrainerWorkload(),
        lmsService.getBatchSummary(),
      ]);

      // Transform workload to include subject in label for Pie chart
      const workloadData = workloadRes.data.map(tr => ({
        ...tr,
        label: `${tr.trainerName} (${tr.trainerSubject})`
      }));

      setTrainerWorkload(workloadData);
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
      <div className="page-header">
        <h2 className="page-title">📊 Reports & Analytics</h2>
        <button
          onClick={fetchReports}
          className="toggle-form-btn"
          style={{ backgroundColor: "#3b82f6" }}
        >
          <RefreshCw size={18} />
          {loading ? "Refreshing..." : "Refresh Data"}
        </button>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>🧑‍🏫 Trainer Workload (with subjects)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={trainerWorkload}
                dataKey="batchesHandled"
                nameKey="label"
                outerRadius={100}
                label
              >
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

      <div className="table-wrapper">
        <h3 className="table-title">📅 Batch Summary</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Batch</th>
              <th>Trainer</th>
              <th>Subject</th>
              <th>Start</th>
              <th>End</th>
            </tr>
          </thead>
          <tbody>
            {batchSummary.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>No data available</td>
              </tr>
            ) : (
              batchSummary.map((b, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{b.batchName}</td>
                  <td>{b.trainerName}</td>
                  <td>{b.trainerSubject}</td>
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
