import React, { useState, useEffect } from "react";
import { Edit, Save, X, Plus, Trash } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import lmsService from "../../services/lmsService";
import "../../index.css";

const ManageBatches = () => {
  const { updateStat, fetchStats } = useOutletContext() ?? {};
  const [batches, setBatches] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [newBatch, setNewBatch] = useState({
    batchName: "",
    trainerId: "",
    subjectName: "",
    startDate: "",
    endDate: "",
  });

  const [editRowId, setEditRowId] = useState(null);
  const [editedBatch, setEditedBatch] = useState({});

  // Load batches & trainers
  useEffect(() => {
    (async () => {
      try {
        const [batchRes, trainerRes] = await Promise.all([
          lmsService.getAllBatches(),
          lmsService.getAllTrainers(),
        ]);
        setBatches(batchRes.data || []);
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

  // =========================
  // ADD NEW BATCH
  // =========================
  const handleAddBatch = async () => {
    if (!newBatch.batchName || !newBatch.trainerId || !newBatch.subjectName) {
      alert("Please fill Batch Name, Trainer, and Subject");
      return;
    }

    const payload = {
      batchName: newBatch.batchName,
      startDate: newBatch.startDate,
      endDate: newBatch.endDate,
      trainer: { id: parseInt(newBatch.trainerId) },
      subjectName: newBatch.subjectName,
    };

    try {
      const res = await lmsService.addBatch(payload);

      if (res?.data) {
        setBatches((prev) => [res.data, ...prev]);
        updateStat && updateStat("batches", "increment");
      }

      setNewBatch({
        batchName: "",
        trainerId: "",
        subjectName: "",
        startDate: "",
        endDate: "",
      });
      setShowForm(false);
    } catch (err) {
      console.error("Error saving batch:", err);
    }
  };

  // =========================
  // EDITING FUNCTIONS
  // =========================
  const handleEditRow = (batch) => {
    setEditRowId(batch.id);
    setEditedBatch({
      ...batch,
      trainerId: batch.trainer?.id || "",
      subjectName: batch.subjectName || "",
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedBatch({ ...editedBatch, [name]: value });
  };

  const handleSaveRow = async () => {
    if (!editedBatch.trainerId || !editedBatch.subjectName || !editedBatch.batchName) return;

    const payload = {
      batchName: editedBatch.batchName,
      startDate: editedBatch.startDate,
      endDate: editedBatch.endDate,
      trainer: { id: parseInt(editedBatch.trainerId) },
      subjectName: editedBatch.subjectName,
    };

    try {
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
          <input
            type="text"
            name="batchName"
            value={newBatch.batchName}
            onChange={handleChange}
            placeholder="Batch Name *"
          />

          <select name="trainerId" value={newBatch.trainerId} onChange={handleChange}>
            <option value="">Select Trainer *</option>
            {trainers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.email}
              </option>
            ))}
          </select>

          <select
            name="subjectName"
            value={newBatch.subjectName}
            onChange={handleChange}
            disabled={!newBatch.trainerId}
          >
            <option value="">Select Subject *</option>
            {newBatch.trainerId &&
              trainers
                .filter((t) => t.id === parseInt(newBatch.trainerId))
                .map((t) => (
                  <option key={t.id} value={t.subject}>
                    {t.subject}
                  </option>
                ))}
          </select>

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
            <th>Trainer</th>
            <th>Subject</th>
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
                  <input
                    name="batchName"
                    value={editedBatch.batchName || ""}
                    onChange={handleEditChange}
                  />
                </td>
                <td>
                  <select
                    name="trainerId"
                    value={editedBatch.trainerId || ""}
                    onChange={handleEditChange}
                  >
                    <option value="">Select Trainer</option>
                    {trainers.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.email}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    name="subjectName"
                    value={editedBatch.subjectName || ""}
                    onChange={handleEditChange}
                    disabled={!editedBatch.trainerId}
                  >
                    <option value="">Select Subject</option>
                    {editedBatch.trainerId &&
                      trainers
                        .filter((t) => t.id === parseInt(editedBatch.trainerId))
                        .map((t) => (
                          <option key={t.id} value={t.subject}>
                            {t.subject}
                          </option>
                        ))}
                  </select>
                </td>
                <td>
                  <input
                    type="date"
                    name="startDate"
                    value={editedBatch.startDate || ""}
                    onChange={handleEditChange}
                  />
                </td>
                <td>
                  <input
                    type="date"
                    name="endDate"
                    value={editedBatch.endDate || ""}
                    onChange={handleEditChange}
                  />
                </td>
                <td>
                  <button className="btn btn-success" onClick={handleSaveRow}>
                    <Save size={14} /> Save
                  </button>
                  <button className="btn btn-secondary" onClick={handleCancelEdit}>
                    <X size={14} /> Cancel
                  </button>

                  {/* DELETE BUTTON ADDED IN EDIT MODE */}
                  <button className="btn btn-danger" disabled>
                    <Trash size={14} /> Delete
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={b.id}>
                <td>{idx + 1}</td>
                <td>{b.batchName}</td>
                <td>{b.trainer?.email || "N/A"}</td>
                <td>{b.subjectName || "N/A"}</td>
                <td>{b.startDate || "-"}</td>
                <td>{b.endDate || "-"}</td>
                <td>
                  <button className="btn btn-warning" onClick={() => handleEditRow(b)}>
                    <Edit size={14} /> Edit
                  </button>

                  {/* DELETE BUTTON ADDED IN VIEW MODE */}
                  <button className="btn btn-danger" disabled>
                    <Trash size={14} /> Delete
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


