// Sessions.js
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

const Sessions = () => {
  const { incrementStat, decrementStat } = useOutletContext();
  const [sessions, setSessions] = useState([]);
  const [newSessionTitle, setNewSessionTitle] = useState("");
  const [newSessionDate, setNewSessionDate] = useState("");
  const [newSessionTime, setNewSessionTime] = useState("");

  const addSession = () => {
    if (!newSessionTitle.trim() || !newSessionDate || !newSessionTime) return;
    const newSession = {
      title: newSessionTitle,
      date: newSessionDate,
      time: newSessionTime,
    };
    setSessions((prev) => [...prev, newSession]);
    incrementStat("sessions");
    setNewSessionTitle("");
    setNewSessionDate("");
    setNewSessionTime("");
  };

  const removeSession = (index) => {
    setSessions((prev) => prev.filter((_, i) => i !== index));
    decrementStat("sessions");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <h4>🎯 Sessions</h4>

      {/* Add New Session */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Session Title"
          value={newSessionTitle}
          onChange={(e) => setNewSessionTitle(e.target.value)}
          style={{ flex: 2, padding: "8px", borderRadius: 8, border: "1px solid #ccc" }}
        />
        <input
          type="date"
          value={newSessionDate}
          onChange={(e) => setNewSessionDate(e.target.value)}
          style={{ flex: 1, padding: "8px", borderRadius: 8, border: "1px solid #ccc" }}
        />
        <input
          type="time"
          value={newSessionTime}
          onChange={(e) => setNewSessionTime(e.target.value)}
          style={{ flex: 1, padding: "8px", borderRadius: 8, border: "1px solid #ccc" }}
        />
        <button
          onClick={addSession}
          style={{
            padding: "8px 16px",
            backgroundColor: "#4f5bd5",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>

      {/* Sessions List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {sessions.length === 0 && (
          <div style={{ padding: 15, backgroundColor: "#f5f5f5", borderRadius: 10, textAlign: "center" }}>
            No sessions added yet.
          </div>
        )}
        {sessions.map((session, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 15,
              backgroundColor: "#e8f5e9",
              borderRadius: 10,
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <div>
              <strong>{session.title}</strong>
              <div style={{ fontSize: 12, color: "#555" }}>
                {session.date} – {session.time}
              </div>
            </div>
            <button
              onClick={() => removeSession(idx)}
              style={{
                backgroundColor: "#ff4b5c",
                color: "#fff",
                border: "none",
                padding: "6px 12px",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sessions;

