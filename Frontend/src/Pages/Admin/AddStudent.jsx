// src/Pages/Admin/AddStudents.jsx  (or AddStudent.jsx if that's your filename)
import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import api from "../../Services/api";
import "../../index.css";

const AddStudent = () => {
  const { incrementStat, decrementStat } = useOutletContext?.() ?? {};
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    course: "",
    phone: "",
    batch: "",
  });
  const [editId, setEditId] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  // load students
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/student/"); // GET /api/student/
        setStudents(res.data || []);
      } catch (err) {
        console.error("Failed to load students:", err);
      }
    })();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleAddOrUpdate = async () => {
    if (!newStudent.name || !newStudent.email || !newStudent.course) {
      alert("Please fill in required fields (Name, Email, Course)");
      return;
    }

    try {
      if (editId) {
        // update existing: PUT /api/student/update/{id}
        await api.put(`/student/update/${editId}`, newStudent);
        setStudents(prev => prev.map((s, i) => (i === editIndex ? { ...s, ...newStudent } : s)));
        setEditId(null);
        setEditIndex(null);
      } else {
        // add new: POST /api/student/add
        const res = await api.post("/student/add", newStudent);
        if (res?.data) setStudents(prev => [res.data, ...prev]);
        else {
          const r = await api.get("/student/");
          setStudents(r.data || []);
        }
        incrementStat && incrementStat("students");
      }

      setNewStudent({ name: "", email: "", course: "", phone: "", batch: "" });
    } catch (err) {
      console.error("Add/Update student failed:", err);
      alert("Failed to save student — check console.");
    }
  };

  const handleEdit = (student, index) => {
    setNewStudent(student);
    setEditId(student.id ?? null);
    setEditIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    // visible but disabled in UI; keep this message if someone tries
    alert("Delete disabled here. Manage deletion from the database.");
  };

  return (
    <div className="add-student-container">
      <h2 className="add-student-title">Student Management</h2>

      {/* Inline Form */}
      <div className="add-student-form">
        <input
          type="text"
          name="name"
          value={newStudent.name}
          onChange={handleInputChange}
          placeholder="Full Name *"
        />
        <input
          type="email"
          name="email"
          value={newStudent.email}
          onChange={handleInputChange}
          placeholder="Email *"
        />
        <input
          type="text"
          name="course"
          value={newStudent.course}
          onChange={handleInputChange}
          placeholder="Course *"
        />
        <input
          type="text"
          name="phone"
          value={newStudent.phone}
          onChange={handleInputChange}
          placeholder="Phone"
        />
        <input
          type="text"
          name="batch"
          value={newStudent.batch}
          onChange={handleInputChange}
          placeholder="Batch"
        />

        <button className="add-btn" onClick={handleAddOrUpdate}>
          {editId ? "Update" : "Add"}
        </button>

        <button
          className="clear-btn"
          onClick={() => {
            setNewStudent({ name: "", email: "", course: "", phone: "", batch: "" });
            setEditId(null);
            setEditIndex(null);
          }}
        >
          Clear
        </button>
      </div>

      {/* Student List */}
      <div className="student-list">
        {students.length === 0 ? (
          <p className="text-center text-muted fs-5 mt-3">No students added yet</p>
        ) : (
          students.map((student, idx) => (
            <div key={student.id ?? idx} className="student-card">
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div className="student-info">
                  <h5 className="student-name">{student.name}</h5>
                  <small>{student.email} • {student.course}</small>
                  <small>{student.phone && `📞 ${student.phone}`} {student.batch && `🎓 ${student.batch}`}</small>
                </div>
                <div className="student-actions mt-2 mt-md-0">
                  <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(student, idx)}>Edit</button>
                  <button className="btn btn-sm btn-danger" disabled onClick={() => handleDelete(student.id)}>Delete</button>
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


