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
    if (!newAssignment.name || !newAssignment.status || !newAssignment.submission)
      return alert("Fill all fields");

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
    <div style={{ minHeight: "100vh", padding: "40px 0", background: "#ebebeb" }}>
      <h2 className="fw-bold text-center mb-2" style={{ color: "#3730a3" }}>
       
      </h2>
      <p className="text-center text-muted mb-4">
       
      </p>

      {/* Form */}
      <div className="container-fluid d-flex flex-wrap justify-content-center gap-2 mb-4">
        <input
          type="text"
          name="name"
          placeholder="Assignment Name *"
          value={newAssignment.name}
          onChange={handleInputChange}
          className="form-control"
          style={{ flex: "1 1 150px", minWidth: 140, borderRadius: 8 }}
        />
        <input
          type="text"
          name="status"
          placeholder="Status (Pending/Submitted) *"
          value={newAssignment.status}
          onChange={handleInputChange}
          className="form-control"
          style={{ flex: "1 1 120px", minWidth: 120, borderRadius: 8 }}
        />
        <input
          type="datetime-local"
          name="submission"
          value={newAssignment.submission}
          onChange={handleInputChange}
          className="form-control"
          style={{ flex: "1 1 180px", minWidth: 180, borderRadius: 8 }}
        />
        <input
          type="file"
          name="file"
          onChange={handleInputChange}
          className="form-control"
          style={{ flex: "1 1 200px", minWidth: 200, borderRadius: 8 }}
        />
        <button
          className="btn text-white px-4 fw-semibold"
          style={{ backgroundColor: "#4f46e5", borderRadius: 8 }}
          onClick={handleAddOrUpdate}
        >
          {editId ? "Update" : "Add"}
        </button>
        <button
          className="btn btn-outline-secondary px-4 fw-semibold"
          style={{ borderRadius: 8 }}
          onClick={() => setNewAssignment({ name: "", status: "", submission: "", file: null }) && setEditId(null)}
        >
          Clear
        </button>
      </div>

      {/* Assignments List */}
      <div className="container-fluid" style={{ maxWidth: 900 }}>
        {assignments.length === 0 ? (
          <p className="text-center text-muted fs-5">No assignments added yet</p>
        ) : (
          assignments.map(a => (
            <div
              key={a.id}
              className="w-100 mb-3 p-3 shadow-sm"
              style={{ background: "#fff", borderLeft: "6px solid #4f46e5", borderRadius: 10 }}
            >
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div>
                  <h5 className="fw-bold text-primary mb-1">{a.name}</h5>
                  <small className="text-muted d-block mb-1">
                    Status: {a.status} | Submission: {new Date(a.submission).toLocaleString()}
                  </small>
                  {a.file && (
                    <small className="d-block">
                      File: <a href={URL.createObjectURL(a.file)} target="_blank" rel="noreferrer">{a.file.name}</a>
                    </small>
                  )}
                </div>
                <div className="mt-2 mt-md-0">
                  <button className="btn btn-sm btn-warning me-2 fw-semibold" onClick={() => handleEdit(a)}>Edit</button>
                  <button className="btn btn-sm btn-danger fw-semibold" onClick={() => handleDelete(a.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Assignments;
