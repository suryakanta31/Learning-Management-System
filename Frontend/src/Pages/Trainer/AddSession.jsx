// src/pages/Trainer/AddSession.jsx
import React, { useEffect, useState } from "react";
import "../../index.css";
import lmsService from "../../services/lmsService";

const AddSession = () => {
  const trainerId = parseInt(localStorage.getItem("trainerId"), 10);
  const [batches, setBatches] = useState([]);
  const [newSession, setNewSession] = useState({ topic: "", batchId: "" });
  const [loading, setLoading] = useState(false);

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

  const handleAddSession = async () => {
    if (!newSession.topic.trim() || !newSession.batchId)
      return alert("Please enter topic and select batch!");

    const payload = {
      topic: newSession.topic.trim(),
      scheduledAt: new Date().toISOString(),
      batchId: parseInt(newSession.batchId, 10),
      trainerId,
    };

    try {
      setLoading(true);
      await lmsService.addSession(payload);
      alert("✅ Session added successfully!");
      setNewSession({ topic: "", batchId: "" });
    } catch (err) {
      console.error("Error adding session:", err);
      alert("Failed to add session.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-session-container">
      <h2 className="schedule-title">➕ Add New Session</h2>

      <div className="schedule-form">
        <select
          value={newSession.batchId}
          onChange={(e) => setNewSession({ ...newSession, batchId: e.target.value })}
        >
          <option value="">Select Batch</option>
          {batches.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name} — {b.course?.course_name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Enter Session Topic"
          value={newSession.topic}
          onChange={(e) => setNewSession({ ...newSession, topic: e.target.value })}
        />

        <button
          onClick={handleAddSession}
          disabled={loading}
          className="schedule-add-btn"
        >
          {loading ? "Saving..." : "Add Session"}
        </button>
      </div>
    </div>
  );
};

export default AddSession;
