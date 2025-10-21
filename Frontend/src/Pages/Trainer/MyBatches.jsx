import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

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
    } else setBatches([{ id: Date.now(), ...newBatch }, ...batches]);
    setNewBatch({ name: "", course: "" });
  };

  const handleEdit = (batch) => { setNewBatch(batch); setEditId(batch.id); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const handleDelete = (id) => setBatches(batches.filter(b => b.id !== id));

  return (
    <div style={{ minHeight: "100vh", padding: "40px 0", background: "#ebebeb" }}>
      <h2 className="fw-bold text-center mb-4" style={{ color: "#3730a3" }}>My Batches</h2>

      <div className="container-fluid d-flex flex-wrap justify-content-center gap-2 mb-4">
        <input type="text" name="name" placeholder="Batch Name *" value={newBatch.name} onChange={handleInputChange} className="form-control" style={{ flex: "1 1 150px", minWidth: 140, borderRadius: 8 }} />
        <input type="text" name="course" placeholder="Course *" value={newBatch.course} onChange={handleInputChange} className="form-control" style={{ flex: "1 1 150px", minWidth: 140, borderRadius: 8 }} />
        <button className="btn text-white px-4 fw-semibold" style={{ backgroundColor: "#4f46e5", borderRadius: 8 }} onClick={handleAddOrUpdate}>{editId ? "Update" : "Add"}</button>
        <button className="btn btn-outline-secondary px-4 fw-semibold" style={{ borderRadius: 8 }} onClick={() => { setNewBatch({ name: "", course: "" }); setEditId(null); }}>Clear</button>
      </div>

      <div className="container-fluid" style={{ maxWidth: 900 }}>
        {batches.length === 0 ? <p className="text-center text-muted fs-5">No batches added yet</p> : batches.map(batch => (
          <div key={batch.id} className="w-100 mb-3 p-3 shadow-sm" style={{ background: "#fff", borderLeft: "6px solid #4f46e5", borderRadius: 10 }}>
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <div>
                <h5 className="fw-bold text-primary mb-1">{batch.name}</h5>
                <small className="text-muted">{batch.course}</small>
              </div>
              <div className="mt-2 mt-md-0">
                <button className="btn btn-sm btn-warning me-2 fw-semibold" onClick={() => handleEdit(batch)}>Edit</button>
                <button className="btn btn-sm btn-danger fw-semibold" onClick={() => handleDelete(batch.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBatches;
