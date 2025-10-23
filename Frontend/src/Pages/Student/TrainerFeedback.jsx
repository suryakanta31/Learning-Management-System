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
    <div className="feedback-container">
      <h2 className="feedback-title">Trainer Feedback</h2>

      <div className="feedback-form">
        <input type="text" name="trainer" placeholder="Trainer Name *" value={newFeedback.trainer} onChange={handleInputChange} className="feedback-input" />
        <input type="text" name="message" placeholder="Feedback Message *" value={newFeedback.message} onChange={handleInputChange} className="feedback-input feedback-message" />
        <input type="text" name="rating" placeholder="Rating *" value={newFeedback.rating} onChange={handleInputChange} className="feedback-input feedback-rating" />
        <button className="feedback-btn add-btn" onClick={handleAddOrUpdate}>{editId ? "Update" : "Add"}</button>
        <button className="feedback-btn clear-btn" onClick={() => { setNewFeedback({ trainer: "", message: "", rating: "" }); setEditId(null); }}>Clear</button>
      </div>

      <div className="feedback-list">
        {feedbacks.length === 0 ? <p className="no-feedback">No feedbacks added yet</p> :
          feedbacks.map(f => (
            <div key={f.id} className="feedback-card">
              <div className="feedback-content">
                <div>
                  <h5 className="trainer-name">{f.trainer}</h5>
                  <small className="feedback-message-text">{f.message} | Rating: {f.rating}/5</small>
                </div>
                <div className="feedback-actions">
                  <button className="action-btn edit-btn" onClick={() => handleEdit(f)}>Edit</button>
                  <button className="action-btn delete-btn" onClick={() => handleDelete(f.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TrainerFeedback;

