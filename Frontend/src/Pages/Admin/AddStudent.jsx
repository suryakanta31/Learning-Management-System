import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

const AddStudent = () => {
  const { incrementStat, decrementStat } = useOutletContext(); // optional for dashboard stats
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    course: "",
    phone: "",
    batch: "",
  });
  const [editId, setEditId] = useState(null);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  // Add or Update Student
  const handleAddOrUpdate = () => {
    if (!newStudent.name || !newStudent.email || !newStudent.course) {
      alert("Please fill in required fields (Name, Email, Course)");
      return;
    }

    if (editId) {
      // Update student
      setStudents(
        students.map((s) => (s.id === editId ? { ...s, ...newStudent } : s))
      );
      setEditId(null);
    } else {
      // Add new student
      const student = { id: Date.now(), ...newStudent };
      setStudents([...students, student]);
      incrementStat && incrementStat("students");
    }

    // Reset form
    setNewStudent({ name: "", email: "", course: "", phone: "", batch: "" });
  };

  // Edit Student
  const handleEdit = (student) => {
    setNewStudent(student);
    setEditId(student.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete Student
  const handleDelete = (id) => {
    setStudents(students.filter((s) => s.id !== id));
    decrementStat && decrementStat("students");
  };

  return (
    <div className="container-fluid p-4" style={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>
      {/* Heading */}
      <div className="text-center mb-5">
        <h1 className="fw-bold text-primary">Student Management</h1>
      </div>

      {/* Add / Update Student Form */}
      <div className="card shadow-sm border-0 mb-5 mx-auto" style={{ maxWidth: "900px" }}>
        <div className="card-header bg-primary text-white fw-semibold">
          {editId ? "Update Student" : "Add Student"}
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Full Name *</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={newStudent.name}
                onChange={handleInputChange}
                placeholder="John Doe"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Email *</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={newStudent.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Course *</label>
              <input
                type="text"
                className="form-control"
                name="course"
                value={newStudent.course}
                onChange={handleInputChange}
                placeholder="React / Java / Python..."
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Phone</label>
              <input
                type="text"
                className="form-control"
                name="phone"
                value={newStudent.phone}
                onChange={handleInputChange}
                placeholder="+91 9876543210"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Batch</label>
              <input
                type="text"
                className="form-control"
                name="batch"
                value={newStudent.batch}
                onChange={handleInputChange}
                placeholder="Batch A / B / C"
              />
            </div>
          </div>

          <div className="mt-4 d-flex gap-2">
            <button className="btn btn-success" onClick={handleAddOrUpdate}>
              {editId ? "Update Student" : "Add Student"}
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setNewStudent({ name: "", email: "", course: "", phone: "", batch: "" });
                setEditId(null);
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Manage Students Table */}
      <div className="card shadow-sm border-0">
        <div className="card-header bg-secondary text-white fw-semibold">
          Students List
        </div>
        <div className="card-body table-responsive">
          {students.length === 0 ? (
            <p className="text-center text-muted">No students added yet</p>
          ) : (
            <table className="table table-bordered table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Course</th>
                  <th>Phone</th>
                  <th>Batch</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={student.id}>
                    <td>{index + 1}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.course}</td>
                    <td>{student.phone}</td>
                    <td>{student.batch}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(student)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(student.id)}
                      >
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
    </div>
  );
};

export default AddStudent;



