import React, { useState, useEffect } from "react";
import lmsService from "../../services/lmsService";
import "../../index.css";

const ManageBatches = () => {
  const [batches, setBatches] = useState([]);
  const [newBatch, setNewBatch] = useState({
    batchName: "",
    course: "",
    trainer: "",
    startDate: "",
    endDate: "",
  });
  const [editId, setEditId] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await lmsService.getAllBatches();
        setBatches(res.data || []);
      } catch (err) {
        console.error("Failed to load batches:", err);
      }
    })();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBatch({ ...newBatch, [name]: value });
  };

  const handleAddOrUpdate = async () => {
    if (!newBatch.batchName || !newBatch.course) {
      alert("Please fill Batch Name & Course");
      return;
    }

    try {
      if (editId) {
        await lmsService.updateBatch(editId, newBatch);
        setBatches((prev) =>
          prev.map((b, i) => (i === editIndex ? { ...b, ...newBatch } : b))
        );
        setEditId(null);
        setEditIndex(null);
      } else {
        const res = await lmsService.addBatch(newBatch);
        if (res?.data) setBatches((prev) => [res.data, ...prev]);
      }

      setNewBatch({
        batchName: "",
        course: "",
        trainer: "",
        startDate: "",
        endDate: "",
      });
    } catch (err) {
      console.error("Error saving batch:", err);
      alert("Failed to save batch — check console.");
    }
  };

  const handleEdit = (batch, index) => {
    setNewBatch(batch);
    setEditId(batch.id ?? null);
    setEditIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="batch-container">
      <h2 className="batch-title">Manage Batches</h2>

      <div className="batch-form">
        <input
          type="text"
          name="batchName"
          value={newBatch.batchName}
          onChange={handleChange}
          placeholder="Batch Name *"
        />
        <input
          type="text"
          name="course"
          value={newBatch.course}
          onChange={handleChange}
          placeholder="Course Name *"
        />
        <input
          type="text"
          name="trainer"
          value={newBatch.trainer}
          onChange={handleChange}
          placeholder="Trainer Name"
        />
        <input
          type="date"
          name="startDate"
          value={newBatch.startDate}
          onChange={handleChange}
        />
        <input
          type="date"
          name="endDate"
          value={newBatch.endDate}
          onChange={handleChange}
        />

        <button className="add-btn" onClick={handleAddOrUpdate}>
          {editId ? "Update" : "Add"}
        </button>
        <button
          className="clear-btn"
          onClick={() =>
            setNewBatch({
              batchName: "",
              course: "",
              trainer: "",
              startDate: "",
              endDate: "",
            })
          }
        >
          Clear
        </button>
      </div>

      <div className="batch-list">
        {batches.length === 0 ? (
          <p className="text-center text-muted">No batches added yet</p>
        ) : (
          <table className="table table-bordered text-center">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Batch Name</th>
                <th>Course</th>
                <th>Trainer</th>
                <th>Start</th>
                <th>End</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {batches.map((b, idx) => (
                <tr key={b.id ?? idx}>
                  <td>{idx + 1}</td>
                  <td>{b.batchName}</td>
                  <td>{b.course}</td>
                  <td>{b.trainer || "TBD"}</td>
                  <td>{b.startDate}</td>
                  <td>{b.endDate}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(b, idx)}
                    >
                      Edit
                    </button>
                    <button className="btn btn-sm btn-danger" disabled>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageBatches;


