import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

const MyCourses = () => {
  const { incrementStat, decrementStat } = useOutletContext();
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState("");

  const handleAddCourse = () => {
    if (!newCourse.trim()) return alert("Enter course name");
    setCourses([{ id: Date.now(), name: newCourse }, ...courses]);
    incrementStat("courses");
    setNewCourse("");
  };

  const handleDeleteCourse = (id) => {
    setCourses(courses.filter((c) => c.id !== id));
    decrementStat("courses");
  };

  return (
    <div className="child-page">
      <h2 className="page-title">📚 My Courses</h2>
      <p className="page-subtitle">Access all enrolled courses.</p>

      {/* Add Course Form */}
      <div className="form-inline">
        <input
          type="text"
          placeholder="Course Name"
          value={newCourse}
          onChange={(e) => setNewCourse(e.target.value)}
        />
        <button className="btn-primary" onClick={handleAddCourse}>
          Add Course
        </button>
      </div>

      {/* Courses List */}
      <div className="list-container">
        {courses.length === 0 ? (
          <div className="empty-list">No courses added yet.</div>
        ) : (
          courses.map((course) => (
            <div key={course.id} className="list-item">
              <div className="item-info">
                <strong>{course.name}</strong>
                <small>Access all enrolled courses.</small>
              </div>
              <div className="item-actions">
                <button className="btn-danger" onClick={() => handleDeleteCourse(course.id)}>Remove</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyCourses;

