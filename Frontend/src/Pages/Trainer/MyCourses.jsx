import React, { useState } from "react";
import "../../index.css"; // Make sure CSS file path is correct

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ title: "", description: "" });
  const [editId, setEditId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  const handleAddOrUpdate = () => {
    if (!newCourse.title.trim()) return alert("Course title required");

    if (editId) {
      setCourses(courses.map(c => (c.id === editId ? { ...c, ...newCourse } : c)));
      setEditId(null);
    } else {
      setCourses([{ id: Date.now(), ...newCourse }, ...courses]);
    }
    setNewCourse({ title: "", description: "" });
  };

  const handleEdit = (course) => {
    setNewCourse(course);
    setEditId(course.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => setCourses(courses.filter(c => c.id !== id));

  return (
    <div className="courses-container">
      <h2 className="courses-title">My Courses</h2>

      {/* Inline Form */}
      <div className="courses-form">
        <input
          type="text"
          name="title"
          placeholder="Course Title *"
          value={newCourse.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newCourse.description}
          onChange={handleInputChange}
        />
        <button className="add-btn" onClick={handleAddOrUpdate}>
          {editId ? "Update" : "Add"}
        </button>
        <button className="clear-btn" onClick={() => { setNewCourse({ title: "", description: "" }); setEditId(null); }}>
          Clear
        </button>
      </div>

      {/* Courses List */}
      <div className="courses-list">
        {courses.length === 0 ? (
          <p className="text-center text-muted fs-5">No courses added yet</p>
        ) : (
          courses.map(course => (
            <div key={course.id} className="course-card">
              <div>
                <h5>{course.title}</h5>
                <small>{course.description}</small>
              </div>
              <div className="course-actions mt-2 mt-md-0">
                <button className="btn-warning me-2" onClick={() => handleEdit(course)}>Edit</button>
                <button className="btn-danger" onClick={() => handleDelete(course.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyCourses;

