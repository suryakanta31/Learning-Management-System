import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import lmsService from "../../services/lmsService";
import "../../index.css";

const ReportsAnalytics = () => {
  const [performanceData, setPerformanceData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const COLORS = ["#4f46e5", "#82ca9d", "#ff7f7f", "#facc15", "#38bdf8"];

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        setError(null);

        // 👇 Fetch data dynamically from backend API (customize as per your endpoints)
        const [coursesRes, attendanceRes] = await Promise.all([
          lmsService.getCoursePerformance(), // e.g. /api/reports/course-performance
          lmsService.getAttendanceSummary(), // e.g. /api/reports/attendance
        ]);

        // Set chart data
        setPerformanceData(coursesRes.data || []);
        setAttendanceData(attendanceRes.data || []);
      } catch (err) {
        console.error("Error loading reports:", err);
        setError("Failed to load analytics data.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="reports-container">
      <h2 className="reports-title">Reports & Analytics</h2>

      {loading ? (
        <p className="text-center">Loading reports...</p>
      ) : error ? (
        <p className="text-center text-danger">{error}</p>
      ) : (
        <div className="reports-row">
          {/* ====== BAR CHART: Course Performance ====== */}
          <div className="reports-col">
            <div className="report-card">
              <h6>Course Performance Overview</h6>
              {performanceData.length === 0 ? (
                <p className="text-center text-muted">No performance data available</p>
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="courseName" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="performance" fill="#4f46e5" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* ====== PIE CHART: Attendance Summary ====== */}
          <div className="reports-col">
            <div className="report-card">
              <h6>Attendance Summary</h6>
              {attendanceData.length === 0 ? (
                <p className="text-center text-muted">No attendance data available</p>
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={attendanceData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {attendanceData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsAnalytics;

