import React, { useState } from "react";
import "../../index.css"; // ensure path is correct

const ManageCourse = () => {
  const [courses, setCourses] = useState([]);
  const [newCourseName, setNewCourseName] = useState("");
  const [newCourseContent, setNewCourseContent] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleAddOrUpdate = () => {
    if (!newCourseName.trim() || !newCourseContent.trim()) return;

    const courseData = { name: newCourseName, content: newCourseContent };

    if (editIndex !== null) {
      const updatedCourses = [...courses];
      updatedCourses[editIndex] = courseData;
      setCourses(updatedCourses);
      setEditIndex(null);
    } else {
      setCourses([courseData, ...courses]);
    }

    setNewCourseName("");
    setNewCourseContent("");
  };

  const handleEdit = (index) => {
    setNewCourseName(courses[index].name);
    setNewCourseContent(courses[index].content);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setCourses(courses.filter((_, i) => i !== index));
    if (editIndex === index) {
      setNewCourseName("");
      setNewCourseContent("");
      setEditIndex(null);
    }
  };

  return (
    <div className="course-container">
      <h2 className="course-title">Manage Courses</h2>

      <div className="course-form">
        <input
          type="text"
          value={newCourseName}
          onChange={(e) => setNewCourseName(e.target.value)}
          placeholder="Course Name *"
        />
        <input
          type="text"
          value={newCourseContent}
          onChange={(e) => setNewCourseContent(e.target.value)}
          placeholder="Course Contents / Topics *"
        />

        <button
          className={`add-btn ${editIndex !== null ? "update-btn" : ""}`}
          onClick={handleAddOrUpdate}
        >
          {editIndex !== null ? "Update" : "Add"}
        </button>

        <button
          className="clear-btn"
          onClick={() => {
            setNewCourseName("");
            setNewCourseContent("");
            setEditIndex(null);
          }}
        >
          Clear
        </button>
      </div>

      <div className="course-list">
        {courses.length === 0 ? (
          <p className="text-center text-muted">No courses added yet</p>
        ) : (
          courses.map((course, index) => (
            <div key={index} className="course-card">
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div>
                  <h5 className="course-name">{course.name}</h5>
                  <small className="course-info">{course.content}</small>
                </div>
                <div className="course-actions">
                  <button className="btn-warning" onClick={() => handleEdit(index)}>
                    Edit
                  </button>
                  <button className="btn-danger" onClick={() => handleDelete(index)}>
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

export default ManageCourse;

