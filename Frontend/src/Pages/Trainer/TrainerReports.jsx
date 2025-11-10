import React, { useEffect, useState } from "react";
import lmsService from "../../services/lmsService";
import { useOutletContext } from "react-router-dom";
import "../../index.css";

const TrainerReports = () => {
  const trainerId = parseInt(localStorage.getItem("trainerId"), 10);
  const [reportData, setReportData] = useState([]);
  const [newReport, setNewReport] = useState({
    batchName: "",
    courseName: "",
    totalStudents: 0,
    totalSessions: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { fetchReports } = useOutletContext() || {};

  // ✅ Load reports from backend
  const loadReports = async () => {
    if (!trainerId) return;
    setLoading(true);
    setError("");
    try {
      const res = await lmsService.getTrainerReports(trainerId);
      setReportData(res.data || []);
    } catch (err) {
      console.error("Error loading reports:", err);
      setError("Failed to load reports. Please try again later.");
      setReportData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, [trainerId]);

  // ✅ Add a new report
  const handleAddReport = async (e) => {
    e.preventDefault();
    if (!newReport.batchName || !newReport.courseName) return;

    try {
      const res = await lmsService.addTrainerReport(trainerId, newReport);
      setReportData((prev) => [...prev, res.data]);
      setNewReport({ batchName: "", courseName: "", totalStudents: 0, totalSessions: 0 });
      if (fetchReports) fetchReports();
    } catch (err) {
      console.error("Error adding report:", err);
      alert("Failed to add report. Please try again.");
    }
  };

  // ✅ Update inline fields locally
  const handleUpdateReport = (index, field, value) => {
    setReportData((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  return (
    <div className="reports-container">
      <h2 className="reports-title">📊 Trainer Reports</h2>

      {loading ? (
        <p>Loading reports...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : reportData.length === 0 ? (
        <p>No reports available yet.</p>
      ) : (
        <table className="report-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Batch</th>
              <th>Course</th>
              <th>Students</th>
              <th>Sessions</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((r, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  <input
                    type="text"
                    value={r.batchName}
                    onChange={(e) => handleUpdateReport(i, "batchName", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={r.courseName}
                    onChange={(e) => handleUpdateReport(i, "courseName", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={r.totalStudents}
                    onChange={(e) =>
                      handleUpdateReport(i, "totalStudents", parseInt(e.target.value, 10))
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={r.totalSessions}
                    onChange={(e) =>
                      handleUpdateReport(i, "totalSessions", parseInt(e.target.value, 10))
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ✅ Add Report Form */}
      <form className="add-report-form" onSubmit={handleAddReport}>
        <h3>Add New Report</h3>
        <input
          type="text"
          placeholder="Batch Name"
          value={newReport.batchName}
          onChange={(e) => setNewReport({ ...newReport, batchName: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Course Name"
          value={newReport.courseName}
          onChange={(e) => setNewReport({ ...newReport, courseName: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Total Students"
          value={newReport.totalStudents}
          onChange={(e) =>
            setNewReport({ ...newReport, totalStudents: parseInt(e.target.value, 10) })
          }
          required
        />
        <input
          type="number"
          placeholder="Total Sessions"
          value={newReport.totalSessions}
          onChange={(e) =>
            setNewReport({ ...newReport, totalSessions: parseInt(e.target.value, 10) })
          }
          required
        />
        <button type="submit">Add Report</button>
      </form>
    </div>
  );
};

export default TrainerReports;


