import React, { useEffect, useState } from "react";
import lmsService from "../../services/lmsService";
import "../../index.css";

const ViewTrainers = () => {
  const [trainers, setTrainers] = useState([]);

  // === FETCH TRAINERS ===
  useEffect(() => {
    const loadTrainers = async () => {
      try {
        const res = await lmsService.getAllTrainers();
        setTrainers(res.data || []);
      } catch (err) {
        console.error("❌ Failed to load trainers:", err);
      }
    };
    loadTrainers();
  }, []);

  return (
    <div className="child-outlet">
      <h2>All Trainers</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Trainer Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Subject</th>
            <th>Experience</th>
            <th>Qualification</th>
          </tr>
        </thead>
        <tbody>
          {trainers.length === 0 ? (
            <tr>
              <td colSpan={7} style={{ textAlign: "center" }}>
                No trainers found
              </td>
            </tr>
          ) : (
            trainers.map((t, idx) => (
              <tr key={t.id}>
                <td>{idx + 1}</td>
                <td>{t.name}</td>
                <td>{t.email}</td>
                <td>{t.phone || "-"}</td>
                <td>{t.subject || "-"}</td>
                <td>{t.experience || "-"}</td>
                <td>{t.qualification || "-"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewTrainers;
