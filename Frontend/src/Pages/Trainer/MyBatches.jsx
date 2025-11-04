import React, { useEffect, useState } from "react";
import "../../index.css";
import TrainerService from "../../services/trainerService";

const Batches = () => {
  const trainerId = parseInt(localStorage.getItem("trainerId"), 10);
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [newBatch, setNewBatch] = useState("");

  useEffect(() => {
    TrainerService.getCourses()
      .then((res) => setCourses(res || []))
      .catch(() => setCourses([]));

    if (trainerId) loadBatches();
  }, [trainerId]);

  const loadBatches = async () => {
    try {
      const res = await TrainerService.getBatchesForTrainer(trainerId);
      setBatches(res || []);
    } catch {
      setBatches([]);
    }
  };

  const handleAddBatch = async () => {
  try {
    if (!selectedCourse || !newBatch.trim()) {
      alert("Please select a course and enter batch name");
      return;
    }

    const payload = {
      name: newBatch,
      courseId: parseInt(selectedCourse, 10),
      trainerId: trainerId,
    };

    console.log("📦 Sending Batch Payload:", payload);

    await TrainerService.addBatch(payload);

    alert("✅ Batch added successfully!");
    setNewBatch("");
    loadBatches();
  } catch (err) {
    console.error("❌ Error adding batch:", err);
    alert("Failed to add batch. Check console for details.");
  }
};




  return (
    <div className="batches-container">
      <h2 className="batches-title">Manage Batches</h2>

      <div className="batches-form">
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="course-select"
        >
          <option value="">Select Course</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={newBatch}
          onChange={(e) => setNewBatch(e.target.value)}
          placeholder="Enter Batch Name"
          className="batch-input"
        />

        <button onClick={handleAddBatch} className="batch-add-btn">
          Add Batch
        </button>
      </div>

      <div className="batches-list">
        {batches.length === 0 ? (
          <p>No batches yet.</p>
        ) : (
          <ul>
            {batches.map((b) => (
              <li key={b.id}>
                {b.name} — <strong>{b.course?.title}</strong>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Batches;








