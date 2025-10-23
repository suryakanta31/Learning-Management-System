import React, { useState } from "react";
import "../../index.css"; // Make sure CSS path is correct

const Schedule = () => {
  const [sessions, setSessions] = useState([]);
  const [newSession, setNewSession] = useState({ title: "", date: "", time: "" });

  const handleInputChange = (e) =>
    setNewSession({ ...newSession, [e.target.name]: e.target.value });

  const handleAddSession = () => {
    if (!newSession.title || !newSession.date || !newSession.time)
      return alert("Fill all fields");
    setSessions([{ id: Date.now(), ...newSession }, ...sessions]);
    setNewSession({ title: "", date: "", time: "" });
  };

  const handleDelete = (id) =>
    setSessions(sessions.filter((s) => s.id !== id));

  return (
    <div className="schedule-container">
      <h2 className="schedule-title">Schedule</h2>

      {/* Inline Form */}
      <div className="schedule-form">
        <input
          type="text"
          name="title"
          placeholder="Session Title *"
          value={newSession.title}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="date"
          value={newSession.date}
          onChange={handleInputChange}
        />
        <input
          type="time"
          name="time"
          value={newSession.time}
          onChange={handleInputChange}
        />
        <button className="add-btn" onClick={handleAddSession}>
          Add
        </button>
        <button
          className="clear-btn"
          onClick={() => setNewSession({ title: "", date: "", time: "" })}
        >
          Clear
        </button>
      </div>

      {/* Sessions List */}
      <div className="schedule-list">
        {sessions.length === 0 ? (
          <p className="text-center text-muted fs-5">
            No sessions scheduled yet
          </p>
        ) : (
          sessions.map((sess) => (
            <div key={sess.id} className="schedule-card">
              <div>
                <h5>{sess.title}</h5>
                <small>
                  {sess.date} at {sess.time}
                </small>
              </div>
              <div className="schedule-actions">
                <button className="btn-danger" onClick={() => handleDelete(sess.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Schedule;

