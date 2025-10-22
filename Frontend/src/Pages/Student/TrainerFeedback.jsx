import React, { useState } from "react";

const TrainerFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState({ trainer: "", message: "", rating: "" });
  const [editId, setEditId] = useState(null);

  const handleInputChange = (e) =>
    setNewFeedback({ ...newFeedback, [e.target.name]: e.target.value });

  const handleAddOrUpdate = () => {
    if (!newFeedback.trainer || !newFeedback.message || !newFeedback.rating)
      return alert("Fill all fields");

    if (editId) {
      setFeedbacks(feedbacks.map(f => (f.id === editId ? { ...f, ...newFeedback } : f)));
      setEditId(null);
    } else {
      setFeedbacks([{ id: Date.now(), ...newFeedback }, ...feedbacks]);
    }
    setNewFeedback({ trainer: "", message: "", rating: "" });
  };

  const handleEdit = (f) => { setNewFeedback(f); setEditId(f.id); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const handleDelete = (id) => setFeedbacks(feedbacks.filter(f => f.id !== id));

  return (
    <div style={{ minHeight: "100vh", padding: "40px 0", background: "#ebebeb" }}>
      <h2 className="fw-bold text-center mb-4" style={{ color: "#3730a3" }}>Trainer Feedback</h2>

      <div className="container-fluid d-flex flex-wrap justify-content-center gap-2 mb-4">
        <input type="text" name="trainer" placeholder="Trainer Name *" value={newFeedback.trainer} onChange={handleInputChange} className="form-control" style={{ flex: "1 1 150px", minWidth: 140, borderRadius: 8 }} />
        <input type="text" name="message" placeholder="Feedback Message *" value={newFeedback.message} onChange={handleInputChange} className="form-control" style={{ flex: "2 1 300px", minWidth: 200, borderRadius: 8 }} />
        <input type="text" name="rating" placeholder="Rating *" value={newFeedback.rating} onChange={handleInputChange} className="form-control" style={{ flex: "1 1 100px", minWidth: 100, borderRadius: 8 }} />
        <button className="btn text-white px-4 fw-semibold" style={{ backgroundColor: "#4f46e5", borderRadius: 8 }} onClick={handleAddOrUpdate}>{editId ? "Update" : "Add"}</button>
        <button className="btn btn-outline-secondary px-4 fw-semibold" style={{ borderRadius: 8 }} onClick={() => { setNewFeedback({ trainer: "", message: "", rating: "" }); setEditId(null); }}>Clear</button>
      </div>

      <div className="container-fluid" style={{ maxWidth: 900 }}>
        {feedbacks.length === 0 ? <p className="text-center text-muted fs-5">No feedbacks added yet</p> : feedbacks.map(f => (
          <div key={f.id} className="w-100 mb-3 p-3 shadow-sm" style={{ background: "#fff", borderLeft: "6px solid #4f46e5", borderRadius: 10 }}>
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <div>
                <h5 className="fw-bold text-primary mb-1">{f.trainer}</h5>
                <small className="text-muted">{f.message} | Rating: {f.rating}/5</small>
              </div>
              <div className="mt-2 mt-md-0">
                <button className="btn btn-sm btn-warning me-2 fw-semibold" onClick={() => handleEdit(f)}>Edit</button>
                <button className="btn btn-sm btn-danger fw-semibold" onClick={() => handleDelete(f.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainerFeedback;
