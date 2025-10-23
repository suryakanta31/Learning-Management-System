import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

const Sessions = () => {
  const { incrementStat, decrementStat, sessions, setSessions } = useOutletContext();
  const [newSession, setNewSession] = useState({ title: "", date: "", time: "" });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => setNewSession({ ...newSession, [e.target.name]: e.target.value });

  const handleAddOrUpdate = () => {
    if (!newSession.title || !newSession.date || !newSession.time) return alert("Fill all fields");

    if (editId) {
      setSessions(sessions.map((s) => (s.id === editId ? { ...s, ...newSession } : s)));
      setEditId(null);
    } else {
      const newS = { id: Date.now(), ...newSession };
      setSessions([newS, ...sessions]);
      incrementStat("sessions");
    }

    setNewSession({ title: "", date: "", time: "" });
  };

  const handleEdit = (session) => {
    setNewSession(session);
    setEditId(session.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    setSessions(sessions.filter((s) => s.id !== id));
    decrementStat("sessions");
  };

  return (
    <div className="child-page">
      <h2 className="page-title">Sessions</h2>
      <p className="page-subtitle">Add or manage your sessions</p>

      {/* Form */}
      <div className="form-inline">
        <input type="text" name="title" placeholder="Session Title *" value={newSession.title} onChange={handleChange} />
        <input type="date" name="date" value={newSession.date} onChange={handleChange} />
        <input type="time" name="time" value={newSession.time} onChange={handleChange} />
        <button className="btn-primary" onClick={handleAddOrUpdate}>{editId ? "Update" : "Add"}</button>
        <button className="btn-secondary" onClick={() => { setNewSession({ title: "", date: "", time: "" }); setEditId(null); }}>Clear</button>
      </div>

      {/* Sessions List */}
      <div className="list-container">
        {sessions.length === 0 ? (
          <div className="empty-list">No sessions added yet.</div>
        ) : (
          sessions.map((s) => (
            <div key={s.id} className="list-item">
              <div className="item-info">
                <strong>{s.title}</strong>
                <small>{s.date} – {s.time}</small>
              </div>
              <div className="item-actions">
                <button className="btn-warning" onClick={() => handleEdit(s)}>Edit</button>
                <button className="btn-danger" onClick={() => handleDelete(s.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Sessions;




