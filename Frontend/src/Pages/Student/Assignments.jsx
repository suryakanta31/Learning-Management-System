import React, { useState } from "react";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [newAssignment, setNewAssignment] = useState({
    name: "",
    status: "",
    submission: "",
    file: null,
  });
  const [editId, setEditId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setNewAssignment({ ...newAssignment, file: files[0] });
    } else {
      setNewAssignment({ ...newAssignment, [name]: value });
    }
  };

  const handleAddOrUpdate = () => {
    if (!newAssignment.name || !newAssignment.status || !newAssignment.submission) {
      return alert("Fill all fields");
    }

    if (editId) {
      setAssignments(assignments.map(a => (a.id === editId ? { ...newAssignment, id: editId } : a)));
      setEditId(null);
    } else {
      setAssignments([{ id: Date.now(), ...newAssignment }, ...assignments]);
    }

    setNewAssignment({ name: "", status: "", submission: "", file: null });
  };

  const handleEdit = (assignment) => {
    setNewAssignment(assignment);
    setEditId(assignment.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => setAssignments(assignments.filter(a => a.id !== id));

  return (
    <div className="child-page">
      <h2 className="page-title">Assignments</h2>
      <p className="page-subtitle">Manage all your assignments here</p>

      {/* Form */}
      <div className="form-inline">
        <input
          type="text"
          name="name"
          placeholder="Assignment Name *"
          value={newAssignment.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="status"
          placeholder="Status (Pending/Submitted) *"
          value={newAssignment.status}
          onChange={handleInputChange}
        />
        <input
          type="datetime-local"
          name="submission"
          value={newAssignment.submission}
          onChange={handleInputChange}
        />
        <input
          type="file"
          name="file"
          onChange={handleInputChange}
        />
        <button className="btn-primary" onClick={handleAddOrUpdate}>{editId ? "Update" : "Add"}</button>
        <button className="btn-secondary" onClick={() => { setNewAssignment({ name: "", status: "", submission: "", file: null }); setEditId(null); }}>Clear</button>
      </div>

      {/* Assignments List */}
      <div className="list-container">
        {assignments.length === 0 ? (
          <p className="text-muted">No assignments added yet</p>
        ) : (
          assignments.map(a => (
            <div key={a.id} className="list-item">
              <div className="item-info">
                <h5>{a.name}</h5>
                <small>Status: {a.status} | Submission: {new Date(a.submission).toLocaleString()}</small>
                {a.file && (
                  <small>
                    File: <a href={URL.createObjectURL(a.file)} target="_blank" rel="noreferrer">{a.file.name}</a>
                  </small>
                )}
              </div>
              <div className="item-actions">
                <button className="btn-warning" onClick={() => handleEdit(a)}>Edit</button>
                <button className="btn-danger" onClick={() => handleDelete(a.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Assignments;
