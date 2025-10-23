import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import "../../index.css";
 // make sure this points to your main CSS

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
          }}
        >
          Clear
        </button>
      </div>

      {/* Student List */}
      <div className="student-list">
        {students.length === 0 ? (
          <p className="text-center text-muted fs-5 mt-3">
            No students added yet
          </p>
        ) : (
          students.map((student) => (
            <div key={student.id} className="student-card">
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div className="student-info">
                  <h5 className="student-name">{student.name}</h5>
                  <small>
                    {student.email} • {student.course}
                  </small>
                  <small>
                    {student.phone && `📞 ${student.phone}`}{" "}
                    {student.batch && `🎓 ${student.batch}`}
                  </small>
                </div>
                <div className="student-actions mt-2 mt-md-0">
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(student)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
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

