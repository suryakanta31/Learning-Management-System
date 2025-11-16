// src/Pages/Admin/ViewBatches.jsx
import React, { useEffect, useState } from "react";
import lmsService from "../../services/lmsService";
import "../../index.css";

const ViewBatches = () => {
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    const loadBatches = async () => {
      try {
        const res = await lmsService.getAllBatches();
        setBatches(res.data || []);
      } catch (err) {
        console.error("Failed to load batches:", err);
      }
    };
    loadBatches();
  }, []);

  return (
    <div className="child-outlet">
      <h2>All Batches</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Batch Name</th>
            <th>Subject</th>
            <th>Trainer</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {batches.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ textAlign: "center" }}>
                No batches found
              </td>
            </tr>
          ) : (
            batches.map((b, idx) => (
              <tr key={b.id}>
                <td>{idx + 1}</td>
                <td>{b.batchName}</td>
                <td>{b.subjectName || "-"}</td>
                <td>{b.trainer?.name || "-"}</td>
                <td>{b.startDate || "-"}</td>
                <td>{b.endDate || "-"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewBatches;
