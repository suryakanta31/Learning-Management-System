// src/pages/Trainer/TrainerBatches.jsx
import React, { useEffect, useState } from "react";
import "../../index.css";
import lmsService from "../../services/lmsService";

const MyBatches = () => {
  const trainerId = parseInt(localStorage.getItem("trainerId"), 10);
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    const loadBatches = async () => {
      try {
        const res = await lmsService.getBatchesForTrainer(trainerId);
        setBatches(res.data || []);
      } catch (err) {
        console.error("Error loading batches:", err);
        setBatches([]);
      }
    };
    if (trainerId) loadBatches();
  }, [trainerId]);

  return (
    <div className="batches-container">
      <h2 className="batches-title">👨‍🏫 My Batches</h2>
      <div className="batches-list">
        {batches.length === 0 ? (
          <p>No batches assigned yet.</p>
        ) : (
          <ul>
            {batches.map((b) => (
              <li key={b.id}>
                <strong>{b.name}</strong> — {b.course?.course_name || "N/A"}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyBatches;









