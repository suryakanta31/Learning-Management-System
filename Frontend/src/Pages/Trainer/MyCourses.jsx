import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

const MyCourses = () => {
  const { incrementStat, decrementStat } = useOutletContext();
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ title: "", description: "" });
  const [editId, setEditId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  const handleAddOrUpdate = () => {
    if (!newCourse.title) return alert("Course title required");

    if (editId) {
      setCourses(courses.map(c => (c.id === editId ? { ...c, ...newCourse } : c)));
      setEditId(null);
    } else {
      setCourses([{ id: Date.now(), ...newCourse }, ...courses]);
      incrementStat && incrementStat("courses");
    }
    setNewCourse({ title: "", description: "" });
  };

  const handleEdit = (course) => {
    setNewCourse(course);
    setEditId(course.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    setCourses(courses.filter(c => c.id !== id));
    decrementStat && decrementStat("courses");
  };

  return (
    <div style={{ minHeight: "100vh", padding: "40px 0", background: "#ebebeb" }}>
      <h2 className="fw-bold text-center mb-4" style={{ color: "#3730a3" }}>My Courses</h2>

      {/* Inline Form */}
      <div className="container-fluid d-flex flex-wrap justify-content-center gap-2 mb-4">
        <input
          type="text"
          name="title"
          value={newCourse.title}
          onChange={handleInputChange}
          placeholder="Course Title *"
          className="form-control"
          style={{ flex: "1 1 200px", minWidth: 150, borderRadius: 8 }}
        />
        <input
          type="text"
          name="description"
          value={newCourse.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="form-control"
          style={{ flex: "2 1 250px", minWidth: 180, borderRadius: 8 }}
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
          onClick={() => { setNewCourse({ title: "", description: "" }); setEditId(null); }}
        >
          Clear
        </button>
      </div>

      {/* Courses List */}
      <div className="container-fluid" style={{ maxWidth: 900 }}>
        {courses.length === 0 ? (
          <p className="text-center text-muted fs-5">No courses added yet</p>
        ) : (
          courses.map(course => (
            <div key={course.id} className="w-100 mb-3 p-3 shadow-sm" style={{ background: "#fff", borderLeft: "6px solid #4f46e5", borderRadius: 10 }}>
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div>
                  <h5 className="fw-bold text-primary mb-1">{course.title}</h5>
                  <small className="text-muted">{course.description}</small>
                </div>
                <div className="mt-2 mt-md-0">
                  <button className="btn btn-sm btn-warning me-2 fw-semibold" onClick={() => handleEdit(course)}>Edit</button>
                  <button className="btn btn-sm btn-danger fw-semibold" onClick={() => handleDelete(course.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyCourses;
