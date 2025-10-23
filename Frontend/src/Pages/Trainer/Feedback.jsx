import React, { useState } from "react";
import "../../index.css"; // Ensure correct path

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState({ student: "", comment: "", rating: "" });

  const handleInputChange = (e) =>
    setNewFeedback({ ...newFeedback, [e.target.name]: e.target.value });

  const handleAddFeedback = () => {
    if (!newFeedback.student || !newFeedback.comment || !newFeedback.rating) {
      return alert("Fill all fields");
    }
    setFeedbacks([{ id: Date.now(), ...newFeedback }, ...feedbacks]);
    setNewFeedback({ student: "", comment: "", rating: "" });
  };

  const handleDelete = (id) => setFeedbacks(feedbacks.filter((f) => f.id !== id));

  return (
    <div className="feedback-container">
      <h2 className="feedback-title">Feedback</h2>

      {/* Form */}
      <div className="feedback-form">
        <input
          type="text"
          name="student"
          value={newFeedback.student}
          onChange={handleInputChange}
          placeholder="Student Name *"
        />
        <input
          type="text"
          name="comment"
          value={newFeedback.comment}
          onChange={handleInputChange}
          placeholder="Comment *"
        />
        <input
          type="number"
          name="rating"
          value={newFeedback.rating}
          onChange={handleInputChange}
          placeholder="Rating (1-5) *"
        />
        <button className="add-btn" onClick={handleAddFeedback}>
          Add
        </button>
        <button className="clear-btn" onClick={() => setNewFeedback({ student: "", comment: "", rating: "" })}>
          Clear
        </button>
      </div>

      {/* Feedback List */}
      <div className="feedback-list">
        {feedbacks.length === 0 ? (
          <p className="text-center text-muted fs-5">No feedback added yet</p>
        ) : (
          feedbacks.map((fb) => (
            <div key={fb.id} className="feedback-card">
              <div>
                <h5>{fb.student}</h5>
                <small>{fb.comment}</small>
                <div>Rating: {fb.rating} ⭐</div>
              </div>
              <div>
                <button className="btn-danger" onClick={() => handleDelete(fb.id)}>
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

export default Feedback;
