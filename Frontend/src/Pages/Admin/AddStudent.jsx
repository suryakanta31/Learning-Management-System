import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

const AddStudent = () => {
  const { incrementStat, decrementStat } = useOutletContext();
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    course: "",
    phone: "",
    batch: "",
  });
  const [editId, setEditId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleAddOrUpdate = () => {
    if (!newStudent.name || !newStudent.email || !newStudent.course) {
      alert("Please fill in required fields (Name, Email, Course)");
      return;
    }

    if (editId) {
      setStudents(
        students.map((s) => (s.id === editId ? { ...s, ...newStudent } : s))
      );
      setEditId(null);
    } else {
      const student = { id: Date.now(), ...newStudent };
      setStudents([student, ...students]);
      incrementStat && incrementStat("students");
    }

    setNewStudent({ name: "", email: "", course: "", phone: "", batch: "" });
  };

  const handleEdit = (student) => {
    setNewStudent(student);
    setEditId(student.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    setStudents(students.filter((s) => s.id !== id));
    decrementStat && decrementStat("students");
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(to bottom right, #ebebebff)", padding: "40px 0" }}>
      <h2 className="fw-bold text-center mb-4" style={{ color: "#3730a3" }}>
        Student Management
      </h2>

      {/* Inline Form */}
      <div
        className="container-fluid"
        style={{
          maxWidth: "95%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "25px",
        }}
      >
        <input
          type="text"
          name="name"
          value={newStudent.name}
          onChange={handleInputChange}
          placeholder="Full Name *"
          className="form-control"
          style={{ flex: "1 1 180px", minWidth: "150px", borderRadius: "8px" }}
        />
        <input
          type="email"
          name="email"
          value={newStudent.email}
          onChange={handleInputChange}
          placeholder="Email *"
          className="form-control"
          style={{ flex: "1 1 200px", minWidth: "160px", borderRadius: "8px" }}
        />
        <input
          type="text"
          name="course"
          value={newStudent.course}
          onChange={handleInputChange}
          placeholder="Course *"
          className="form-control"
          style={{ flex: "1 1 150px", minWidth: "140px", borderRadius: "8px" }}
        />
        <input
          type="text"
          name="phone"
          value={newStudent.phone}
          onChange={handleInputChange}
          placeholder="Phone"
          className="form-control"
          style={{ flex: "1 1 150px", minWidth: "140px", borderRadius: "8px" }}
        />
        <input
          type="text"
          name="batch"
          value={newStudent.batch}
          onChange={handleInputChange}
          placeholder="Batch"
          className="form-control"
          style={{ flex: "1 1 150px", minWidth: "130px", borderRadius: "8px" }}
        />

        <button
          className="btn text-white px-4 fw-semibold"
          style={{ backgroundColor: "#4f46e5", borderRadius: "8px", transition: "0.3s" }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#6366f1")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#4f46e5")}
          onClick={handleAddOrUpdate}
        >
          {editId ? "Update" : "Add"}
        </button>

        <button
          className="btn btn-outline-secondary px-4 fw-semibold"
          style={{ borderRadius: "8px", transition: "0.3s" }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#e5e7eb")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
          onClick={() => {
            setNewStudent({ name: "", email: "", course: "", phone: "", batch: "" });
            setEditId(null);
          }}
        >
          Clear
        </button>
      </div>

      {/* Student List */}
      <div className="container-fluid d-flex flex-column align-items-center" style={{ maxWidth: "1000px" }}>
        {students.length === 0 ? (
          <p className="text-center text-muted fs-5 mt-3">No students added yet</p>
        ) : (
          students.map((student) => (
            <div
              key={student.id}
              className="w-100 mb-3 p-3 shadow-sm"
              style={{ backgroundColor: "#fff", borderLeft: "6px solid #4f46e5", borderRadius: "10px", transition: "0.3s" }}
              onMouseOver={(e) => (e.currentTarget.style.background = "#eef2ff")}
              onMouseOut={(e) => (e.currentTarget.style.background = "#fff")}
            >
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div>
                  <h5 className="fw-bold text-primary mb-1">{student.name}</h5>
                  <small className="text-muted d-block">
                    {student.email} • {student.course}
                  </small>
                  <small>
                    {student.phone && `📞 ${student.phone}`} {student.batch && `🎓 ${student.batch}`}
                  </small>
                </div>
                <div className="mt-2 mt-md-0">
                  <button
                    className="btn btn-sm btn-warning me-2 fw-semibold"
                    style={{ borderRadius: "6px" }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#facc15")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#ffc107")}
                    onClick={() => handleEdit(student)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger fw-semibold"
                    style={{ borderRadius: "6px" }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#ef4444")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#dc3545")}
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AddStudent;
