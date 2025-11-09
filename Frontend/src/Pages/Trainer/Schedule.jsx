import React, { useEffect, useState } from "react";
import "../../index.css";
import lmsService from "../../services/lmsService";

const Schedule = () => {
  const trainerId = parseInt(localStorage.getItem("trainerId"), 10);
  const [batches, setBatches] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [newSession, setNewSession] = useState({ topic: "" });
  const [loading, setLoading] = useState(false);

  // ✅ Load batches and sessions for trainer
  useEffect(() => {
    if (!trainerId) {
      alert("Trainer not logged in!");
      return;
    }

    const loadTrainerData = async () => {
      try {
        const [batchesData, sessionsData] = await Promise.all([
          TrainerService.getBatchesForTrainer(trainerId),
          TrainerService.getSessionsByTrainer(trainerId),
        ]);
        setBatches(batchesData || []);
        setSessions(sessionsData || []);
      } catch (err) {
        console.error("Error loading data:", err);
        alert("Failed to load trainer data.");
      }
    };

    loadTrainerData();
  }, [trainerId]);

  // ✅ Add session
  const handleAddSession = async () => {
    if (!selectedBatch) return alert("Please select a batch!");
    if (!newSession.topic.trim()) return alert("Enter session topic!");

    const sessionData = {
      topic: newSession.topic.trim(),
      scheduledAt: new Date().toISOString(),
      batch: { id: Number(selectedBatch) },
      trainer: { id: trainerId },
    };

    console.log("📦 Session Payload:", sessionData);

    try {
      setLoading(true);
      const added = await TrainerService.addSession(sessionData);
      alert("✅ Session added successfully!");
      setNewSession({ topic: "" });
      setSessions([...sessions, added]);
    } catch (err) {
      console.error("❌ Error adding session:", err);
      alert("Failed to add session. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="schedule-container">
      <h2 className="schedule-title">Manage Schedule</h2>

      <div className="schedule-form">
        <select
          value={selectedBatch}
          onChange={(e) => setSelectedBatch(e.target.value)}
          className="course-select"
        >
          <option value="">Select Batch</option>
          {batches.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name} — {b.course?.title}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="topic"
          value={newSession.topic}
          onChange={(e) => setNewSession({ topic: e.target.value })}
          placeholder="Session Topic"
          className="schedule-input"
        />

        <button
          onClick={handleAddSession}
          className="schedule-add-btn"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Session"}
        </button>
      </div>

      <div className="schedule-list">
        {sessions.length === 0 ? (
          <p className="text-muted">No sessions yet.</p>
        ) : (
          <ul>
            {sessions.map((s) => (
              <li key={s.id}>
                {s.topic} —{" "}
                {s.scheduledAt
                  ? new Date(s.scheduledAt).toLocaleString()
                  : "No date"}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Schedule;





