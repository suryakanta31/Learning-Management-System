import React, { useState, useEffect } from "react";
import { Edit, Trash2, Save, X, Plus } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import lmsService from "../../services/lmsService";
import "../../index.css";

const ManageBatches = () => {
  const { updateStat, fetchStats } = useOutletContext() ?? {};
  const [batches, setBatches] = useState([]);
  const [courses, setCourses] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [showForm, setShowForm] = useState(false);
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
        const [batchRes, courseRes, trainerRes] = await Promise.all([
          lmsService.getAllBatches(),
          lmsService.getAllCourses(),
          lmsService.getAllTrainers(),
        ]);
        setBatches(batchRes.data || []);
        setCourses(courseRes.data || []);
        setTrainers(trainerRes.data || []);
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
    if (!newBatch.batchName || !newBatch.course || !newBatch.trainer) {
      alert("Please fill Batch Name, Course, and Trainer");
      return;
    }

    const payload = {
      batchName: newBatch.batchName,
      startDate: newBatch.startDate,
      endDate: newBatch.endDate,
      course: { id: newBatch.course },
      trainer: { id: newBatch.trainer },
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
      setShowForm(false);
    } catch (err) {
      console.error("Error saving batch:", err);
    }
  };

  const handleEditRow = (batch) => {
    setEditRowId(batch.id);
    setEditedBatch({
      ...batch,
      course: batch.course?.id || "",
      trainer: batch.trainer?.id || "",
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
        startDate: editedBatch.startDate,
        endDate: editedBatch.endDate,
        course: { id: editedBatch.course },
        trainer: { id: editedBatch.trainer },
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
    <div className="child-outlet">
      <div className="form-header" style={{ justifyContent: "space-between" }}>
        <h2>Manage Batches</h2>
        <button
          className="toggle-form-btn"
          style={{ backgroundColor: "#16a34a" }}
          onClick={() => setShowForm(!showForm)}
        >
          <Plus size={18} /> {showForm ? "Hide Form" : "Add Batch"}
        </button>
      </div>

      {showForm && (
        <form className="add-form">
          <input type="text" name="batchName" value={newBatch.batchName} onChange={handleChange} placeholder="Batch Name *" />
          <select name="course" value={newBatch.course} onChange={handleChange}>
            <option value="">Select Course *</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.courseName}
              </option>
            ))}
          </select>
          <select name="trainer" value={newBatch.trainer} onChange={handleChange}>
            <option value="">Select Trainer *</option>
            {trainers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
          <input type="date" name="startDate" value={newBatch.startDate} onChange={handleChange} />
          <input type="date" name="endDate" value={newBatch.endDate} onChange={handleChange} />

          <button type="button" className="btn btn-success" onClick={handleAddBatch}>
            <Save size={16} /> Save
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
            <X size={16} /> Cancel
          </button>
        </form>
      )}

      <table className="data-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Batch Name</th>
            <th>Course</th>
            <th>Trainer</th>
            <th>Start</th>
            <th>End</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {batches.map((b, idx) =>
            editRowId === b.id ? (
              <tr key={b.id}>
                <td>{idx + 1}</td>
                <td>
                  <input name="batchName" value={editedBatch.batchName || ""} onChange={handleEditChange} />
                </td>
                <td>
                  <select name="course" value={editedBatch.course || ""} onChange={handleEditChange}>
                    <option value="">Select Course</option>
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.courseName}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select name="trainer" value={editedBatch.trainer || ""} onChange={handleEditChange}>
                    <option value="">Select Trainer</option>
                    {trainers.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input type="date" name="startDate" value={editedBatch.startDate || ""} onChange={handleEditChange} />
                </td>
                <td>
                  <input type="date" name="endDate" value={editedBatch.endDate || ""} onChange={handleEditChange} />
                </td>
                <td>
                  <button className="btn btn-success" onClick={handleSaveRow}>
                    <Save size={14} /> Save
                  </button>
                  <button className="btn btn-secondary" onClick={handleCancelEdit}>
                    <X size={14} /> Cancel
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={b.id}>
                <td>{idx + 1}</td>
                <td>{b.batchName}</td>
                <td>{b.course?.courseName || "N/A"}</td>
                <td>{b.trainer?.name || "N/A"}</td>
                <td>{b.startDate}</td>
                <td>{b.endDate}</td>
                <td>
                  <button className="btn btn-warning" onClick={() => handleEditRow(b)}>
                    <Edit size={14} /> Edit
                  </button>
                  <button className="btn btn-danger" disabled>
                    <Trash2 size={14} /> Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBatches;





