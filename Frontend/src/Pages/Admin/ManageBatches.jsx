import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import lmsService from "../../services/lmsService";
import "../../index.css";

const ManageBatches = () => {
  const { updateStat, fetchStats } = useOutletContext() ?? {};
  const [batches, setBatches] = useState([]);
  const [courses, setCourses] = useState([]);
  const [newBatch, setNewBatch] = useState({
    batchName: "",
    course: "",
    trainer: "",
    startDate: "",
    endDate: "",
  });
  const [editRowId, setEditRowId] = useState(null);
  const [editedBatch, setEditedBatch] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const [batchRes, courseRes] = await Promise.all([
          lmsService.getAllBatches(),
          lmsService.getAllCourses(),
        ]);
        setBatches(batchRes.data || []);
        setCourses(courseRes.data || []);
      } catch (err) {
        console.error("Failed to load data:", err);
      }
    })();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBatch({ ...newBatch, [name]: value });
  };

  const handleAddBatch = async () => {
    if (!newBatch.batchName || !newBatch.course) {
      alert("Please fill Batch Name & Course");
      return;
    }

    const payload = {
      batchName: newBatch.batchName,
      startDate: newBatch.startDate,
      endDate: newBatch.endDate,
      trainer: newBatch.trainer,
      course: { id: newBatch.course },
    };

    try {
      const res = await lmsService.addBatch(payload);
      if (res?.data) {
        setBatches((prev) => [res.data, ...prev]);
        updateStat && updateStat("batches", "increment");
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
    }
  };

  const handleEditRow = (batch) => {
    setEditRowId(batch.id);
    setEditedBatch({
      ...batch,
      course: batch.course?.id || "",
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedBatch({ ...editedBatch, [name]: value });
  };

  const handleSaveRow = async () => {
    try {
      const payload = {
        batchName: editedBatch.batchName,
        trainer: editedBatch.trainer,
        startDate: editedBatch.startDate,
        endDate: editedBatch.endDate,
        course: { id: editedBatch.course },
      };

      await lmsService.updateBatch(editRowId, payload);
      setBatches((prev) =>
        prev.map((b) => (b.id === editRowId ? { ...b, ...payload } : b))
      );
      setEditRowId(null);
      setEditedBatch({});
      fetchStats && fetchStats();
    } catch (err) {
      console.error("Error updating batch:", err);
    }
  };

  const handleCancelEdit = () => {
    setEditRowId(null);
    setEditedBatch({});
  };

  return (
    <div className="batch-container">
      <h2 className="batch-title">Manage Batches</h2>

      {/* Add Form */}
      <div className="batch-form">
        <input type="text" name="batchName" value={newBatch.batchName} onChange={handleChange} placeholder="Batch Name *" />
        <select name="course" value={newBatch.course} onChange={handleChange}>
          <option value="">Select Course *</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>{c.courseName}</option>
          ))}
        </select>
        <input type="text" name="trainer" value={newBatch.trainer} onChange={handleChange} placeholder="Trainer Name" />
        <input type="date" name="startDate" value={newBatch.startDate} onChange={handleChange} />
        <input type="date" name="endDate" value={newBatch.endDate} onChange={handleChange} />

        <button className="add-btn" onClick={handleAddBatch}>Add</button>
        <button className="clear-btn" onClick={() => setNewBatch({
          batchName: "", course: "", trainer: "", startDate: "", endDate: "",
        })}>Clear</button>
      </div>

      {/* Table */}
      <div className="batch-list">
        {batches.length === 0 ? (
          <p className="text-center text-muted">No batches added yet</p>
        ) : (
          <table className="table table-bordered text-center">
            <thead>
              <tr>
                <th>S.No</th><th>Batch Name</th><th>Course</th>
                <th>Trainer</th><th>Start</th><th>End</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {batches.map((b, idx) =>
                editRowId === b.id ? (
                  <tr key={b.id}>
                    <td>{idx + 1}</td>
                    <td><input type="text" name="batchName" value={editedBatch.batchName || ""} onChange={handleEditChange} /></td>
                    <td>
                      <select name="course" value={editedBatch.course || ""} onChange={handleEditChange}>
                        <option value="">Select Course</option>
                        {courses.map((c) => (
                          <option key={c.id} value={c.id}>{c.courseName}</option>
                        ))}
                      </select>
                    </td>
                    <td><input type="text" name="trainer" value={editedBatch.trainer || ""} onChange={handleEditChange} /></td>
                    <td><input type="date" name="startDate" value={editedBatch.startDate || ""} onChange={handleEditChange} /></td>
                    <td><input type="date" name="endDate" value={editedBatch.endDate || ""} onChange={handleEditChange} /></td>
                    <td>
                      <button className="btn btn-sm btn-success me-2" onClick={handleSaveRow}>Save</button>
                      <button className="btn btn-sm btn-secondary" onClick={handleCancelEdit}>Cancel</button>
                    </td>
                  </tr>
                ) : (
                  <tr key={b.id}>
                    <td>{idx + 1}</td>
                    <td>{b.batchName}</td>
                    <td>{b.course?.courseName || "N/A"}</td>
                    <td>{b.trainer || "TBD"}</td>
                    <td>{b.startDate}</td>
                    <td>{b.endDate}</td>
                    <td>
                      <button className="btn btn-sm btn-warning me-2" onClick={() => handleEditRow(b)}>Edit</button>
                      <button className="btn btn-sm btn-danger" disabled>Delete</button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageBatches;
