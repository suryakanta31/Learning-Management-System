import React, { useState } from "react";

const Schedule = () => {
  const [sessions, setSessions] = useState([]);
  const [newSession, setNewSession] = useState({ title: "", date: "", time: "" });

  const handleInputChange = (e) => setNewSession({ ...newSession, [e.target.name]: e.target.value });

  const handleAddSession = () => {
    if (!newSession.title || !newSession.date || !newSession.time) return alert("Fill all fields");
    setSessions([{ id: Date.now(), ...newSession }, ...sessions]);
    setNewSession({ title: "", date: "", time: "" });
  };

  const handleDelete = (id) => setSessions(sessions.filter(s => s.id !== id));

  return (
    <div style={{ minHeight: "100vh", padding: "40px 0", background: "#ebebeb" }}>
      <h2 className="fw-bold text-center mb-4" style={{ color: "#3730a3" }}>Schedule</h2>

      {/* Inline Form */}
      <div className="container-fluid d-flex flex-wrap justify-content-center gap-2 mb-4">
        <input type="text" name="title" value={newSession.title} onChange={handleInputChange} placeholder="Session Title *" className="form-control" style={{ flex: "1 1 150px", minWidth: 140, borderRadius: 8 }} />
        <input type="date" name="date" value={newSession.date} onChange={handleInputChange} className="form-control" style={{ flex: "1 1 150px", minWidth: 140, borderRadius: 8 }} />
        <input type="time" name="time" value={newSession.time} onChange={handleInputChange} className="form-control" style={{ flex: "1 1 120px", minWidth: 120, borderRadius: 8 }} />
        <button className="btn text-white px-4 fw-semibold" style={{ backgroundColor: "#4f46e5", borderRadius: 8 }} onClick={handleAddSession}>Add</button>
        <button className="btn btn-outline-secondary px-4 fw-semibold" style={{ borderRadius: 8 }} onClick={() => setNewSession({ title: "", date: "", time: "" })}>Clear</button>
      </div>

      {/* Sessions List */}
      <div className="container-fluid" style={{ maxWidth: 900 }}>
        {sessions.length === 0 ? <p className="text-center text-muted fs-5">No sessions scheduled yet</p> :
          sessions.map(sess => (
            <div key={sess.id} className="w-100 mb-3 p-3 shadow-sm" style={{ background: "#fff", borderLeft: "6px solid #4f46e5", borderRadius: 10 }}>
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div>
                  <h5 className="fw-bold text-primary mb-1">{sess.title}</h5>
                  <small className="text-muted">{sess.date} at {sess.time}</small>
                </div>
                <div className="mt-2 mt-md-0">
                  <button className="btn btn-sm btn-danger fw-semibold" onClick={() => handleDelete(sess.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Schedule;
