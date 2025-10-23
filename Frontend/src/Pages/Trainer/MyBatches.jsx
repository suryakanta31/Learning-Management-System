import React, { useState } from "react";
import "../../index.css"; // Ensure path is correct

const MyBatches = () => {
  const [batches, setBatches] = useState([]);
  const [newBatch, setNewBatch] = useState({ name: "", course: "" });
  const [editId, setEditId] = useState(null);

  const handleInputChange = (e) => setNewBatch({ ...newBatch, [e.target.name]: e.target.value });

  const handleAddOrUpdate = () => {
    if (!newBatch.name || !newBatch.course) return alert("Fill all fields");
    if (editId) {
      setBatches(batches.map(b => (b.id === editId ? { ...b, ...newBatch } : b)));
      setEditId(null);
    } else {
      setBatches([{ id: Date.now(), ...newBatch }, ...batches]);
    }
    setNewBatch({ name: "", course: "" });
  };

  const handleEdit = (batch) => {
    setNewBatch(batch);
    setEditId(batch.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => setBatches(batches.filter(b => b.id !== id));

  return (
    <div className="batches-container">
      <h2 className="batches-title">My Batches</h2>

      <div className="batches-form">
        <input
          type="text"
          name="name"
          placeholder="Batch Name *"
          value={newBatch.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="course"
          placeholder="Course *"
          value={newBatch.course}
          onChange={handleInputChange}
        />
        <button className="add-btn" onClick={handleAddOrUpdate}>
          {editId ? "Update" : "Add"}
        </button>
        <button className="clear-btn" onClick={() => { setNewBatch({ name: "", course: "" }); setEditId(null); }}>
          Clear
        </button>
      </div>

      <div className="batches-list">
        {batches.length === 0 ? (
          <p className="text-center text-muted fs-5">No batches added yet</p>
        ) : (
          batches.map(batch => (
            <div key={batch.id} className="batch-card">
              <div>
                <h5>{batch.name}</h5>
                <small>{batch.course}</small>
              </div>
              <div className="batch-actions mt-2 mt-md-0">
                <button className="btn-warning me-2" onClick={() => handleEdit(batch)}>Edit</button>
                <button className="btn-danger" onClick={() => handleDelete(batch.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyBatches;

