import React, { useState } from "react";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState({ student: "", comment: "", rating: "" });

  const handleInputChange = (e) => setNewFeedback({ ...newFeedback, [e.target.name]: e.target.value });

  const handleAddFeedback = () => {
    if (!newFeedback.student || !newFeedback.comment || !newFeedback.rating) return alert("Fill all fields");
    setFeedbacks([{ id: Date.now(), ...newFeedback }, ...feedbacks]);
    setNewFeedback({ student: "", comment: "", rating: "" });
  };

  const handleDelete = (id) => setFeedbacks(feedbacks.filter(f => f.id !== id));

  return (
    <div style={{ minHeight: "100vh", padding: "40px 0", background: "#ebebeb" }}>
      <h2 className="fw-bold text-center mb-4" style={{ color: "#3730a3" }}>Feedback</h2>

      {/* Inline Form */}
      <div className="container-fluid d-flex flex-wrap justify-content-center gap-2 mb-4">
        <input type="text" name="student" value={newFeedback.student} onChange={handleInputChange} placeholder="Student Name *" className="form-control" style={{ flex: "1 1 150px", minWidth: 140, borderRadius: 8 }} />
        <input type="text" name="comment" value={newFeedback.comment} onChange={handleInputChange} placeholder="Comment *" className="form-control" style={{ flex: "2 1 250px", minWidth: 180, borderRadius: 8 }} />
        <input type="number" name="rating" value={newFeedback.rating} onChange={handleInputChange} placeholder="Rating (1-5) *" className="form-control" style={{ flex: "1 1 120px", minWidth: 100, borderRadius: 8 }} />
        <button className="btn text-white px-4 fw-semibold" style={{ backgroundColor: "#4f46e5", borderRadius: 8 }} onClick={handleAddFeedback}>Add</button>
        <button className="btn btn-outline-secondary px-4 fw-semibold" style={{ borderRadius: 8 }} onClick={() => setNewFeedback({ student: "", comment: "", rating: "" })}>Clear</button>
      </div>

      {/* Feedback List */}
      <div className="container-fluid" style={{ maxWidth: 900 }}>
        {feedbacks.length === 0 ? <p className="text-center text-muted fs-5">No feedback added yet</p> :
          feedbacks.map(fb => (
            <div key={fb.id} className="w-100 mb-3 p-3 shadow-sm" style={{ background: "#fff", borderLeft: "6px solid #4f46e5", borderRadius: 10 }}>
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div>
                  <h5 className="fw-bold text-primary mb-1">{fb.student}</h5>
                  <small className="text-muted">{fb.comment}</small>
                  <div>Rating: {fb.rating} ⭐</div>
                </div>
                <div className="mt-2 mt-md-0">
                  <button className="btn btn-sm btn-danger fw-semibold" onClick={() => handleDelete(fb.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Feedback;
