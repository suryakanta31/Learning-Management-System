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
  const [editId, setEditId] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

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

  const handleAddOrUpdate = async () => {
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
      if (editId) {
        await lmsService.updateBatch(editId, payload);
        setBatches((prev) =>
          prev.map((b, i) => (i === editIndex ? { ...b, ...payload } : b))
        );
        fetchStats && fetchStats();
      } else {
        const res = await lmsService.addBatch(payload);
        if (res?.data) {
          setBatches((prev) => [res.data, ...prev]);
          updateStat && updateStat("batches", "increment");
        }
      }

      setNewBatch({
        batchName: "",
        course: "",
        trainer: "",
        startDate: "",
        endDate: "",
      });
      setEditId(null);
      setEditIndex(null);
    } catch (err) {
      console.error("Error saving batch:", err);
    }
  };

  const handleEdit = (batch, index) => {
    setNewBatch({
      batchName: batch.batchName,
      course: batch.course?.id || "",
      trainer: batch.trainer || "",
      startDate: batch.startDate || "",
      endDate: batch.endDate || "",
    });
    setEditId(batch.id ?? null);
    setEditIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="batch-container">
      <h2 className="batch-title">Manage Batches</h2>

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
                  <td>{b.course?.courseName || "N/A"}</td>
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

