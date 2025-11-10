// src/pages/Trainer/TrainerSessions.jsx
import React, { useEffect, useState } from "react";
import "../../index.css";
import lmsService from "../../services/lmsService";

const TrainerSessions = () => {
  const trainerId = parseInt(localStorage.getItem("trainerId"), 10);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const loadSessions = async () => {
      try {
        const res = await lmsService.getSessionsByTrainer(trainerId);
        setSessions(res.data || []);
      } catch (err) {
        console.error("Error loading sessions:", err);
        setSessions([]);
      }
    };
    if (trainerId) loadSessions();
  }, [trainerId]);

  return (
    <div className="schedule-container">
      <h2 className="schedule-title">🗓 My Sessions</h2>

      <div className="schedule-list">
        {sessions.length === 0 ? (
          <p>No sessions yet.</p>
        ) : (
          <ul>
            {sessions.map((s) => (
              <li key={s.id}>
                <strong>{s.topic}</strong> —{" "}
                {s.scheduledAt
                  ? new Date(s.scheduledAt).toLocaleString()
                  : "No Date"}{" "}
                ({s.batch?.name || "N/A"})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TrainerSessions;






