import React, { useEffect, useState } from "react";
import "../../index.css";
import TrainerService from "../../services/trainerService";

const Feedback = () => {
  const trainerId = parseInt(localStorage.getItem("trainerId"), 10);
  const studentId = parseInt(localStorage.getItem("studentId"), 10);
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState({ message: "" });

  useEffect(() => {
    if (!trainerId) return;
    TrainerService.getFeedbackForTrainer(trainerId)
      .then((data) => setFeedbacks(data || []))
      .catch(() => setFeedbacks([]));
  }, [trainerId]);

  const handleAddFeedback = async () => {
    if (!newFeedback.message.trim()) return alert("Enter feedback message.");
    

    const payload = {
  message: newFeedback.message,
  rating: 5,
  studentName: "Anonymous",
  trainer: { id: trainerId },
};
if (!trainerId) {
  alert("Trainer not logged in!");
  return;
}
console.log("Feedback Payload:", payload);
try {
      const saved = await TrainerService.addFeedback(payload);
      setFeedbacks([saved, ...feedbacks]);
      setNewFeedback({ message: "" });
      alert("✅ Feedback added successfully!");
    } catch (err) {
      console.error("Add feedback error:", err);
      alert("❌ Failed to add feedback.");
    }
  };

  return (
    <div className="feedback-container">
      <h2 className="feedback-title">Trainer Feedback</h2>

      <div className="feedback-form">
        <input
          type="text"
          name="message"
          value={newFeedback.message}
          onChange={(e) =>
            setNewFeedback({ ...newFeedback, message: e.target.value })
          }
          placeholder="Enter feedback message *"
        />
        <button className="add-btn" onClick={handleAddFeedback}>
          Add
        </button>
      </div>

      <div className="feedback-list">
        {feedbacks.length === 0 ? (
          <p>No feedback yet.</p>
        ) : (
          feedbacks.map((fb) => (
            <div key={fb.id} className="feedback-card">
              <p>{fb.comments}</p>
              <small>
                {fb.submittedAt
                  ? new Date(fb.submittedAt).toLocaleString()
                  : "No timestamp"}
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Feedback;






