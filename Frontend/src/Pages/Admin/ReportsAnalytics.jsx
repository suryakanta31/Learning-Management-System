import React from "react";
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

const ReportsAnalytics = () => {
  const performanceData = [
    { name: "Course A", performance: 85 },
    { name: "Course B", performance: 75 },
    { name: "Course C", performance: 90 },
  ];

  const attendanceData = [
    { name: "Present", value: 80 },
    { name: "Absent", value: 20 },
  ];

  const COLORS = ["#82ca9d", "#ff7f7f"];

  return (
    <div>
      <h4 className="fw-bold mb-3">Reports & Analytics</h4>

      <div className="row">
        {/* Bar Chart */}
        <div className="col-md-6">
          <div className="card p-3 shadow-sm">
            <h6>Course Performance Overview</h6>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="performance" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="col-md-6">
          <div className="card p-3 shadow-sm">
            <h6>Attendance Summary</h6>
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
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;
