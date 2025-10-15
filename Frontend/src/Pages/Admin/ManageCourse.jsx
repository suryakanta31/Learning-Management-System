import React, { useState } from "react";

const ManageCourse = () => {
  const [courses, setCourses] = useState([]);
  const [newCourseName, setNewCourseName] = useState("");
  const [newCourseContent, setNewCourseContent] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // Add or update course
  const handleAddOrUpdate = () => {
    if (!newCourseName.trim() || !newCourseContent.trim()) return;

    const courseData = {
      name: newCourseName,
      content: newCourseContent,
    };

    if (editIndex !== null) {
      const updatedCourses = [...courses];
      updatedCourses[editIndex] = courseData;
      setCourses(updatedCourses);
      setEditIndex(null);
    } else {
      setCourses([...courses, courseData]);
    }

    setNewCourseName("");
    setNewCourseContent("");
  };

  // Edit a course
  const handleEdit = (index) => {
    setNewCourseName(courses[index].name);
    setNewCourseContent(courses[index].content);
    setEditIndex(index);
  };

  // Delete a course
  const handleDelete = (index) => {
    setCourses(courses.filter((_, i) => i !== index));
    if (editIndex === index) {
      setNewCourseName("");
      setNewCourseContent("");
      setEditIndex(null);
    }
  };

  return (
    <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: "700px" }}>
      <h4 className="mb-4 text-center">Manage Courses</h4>

      <div className="mb-3">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Enter Course Name"
          value={newCourseName}
          onChange={(e) => setNewCourseName(e.target.value)}
        />
        <textarea
          className="form-control mb-2"
          placeholder="Enter Course Contents / Topics"
          value={newCourseContent}
          onChange={(e) => setNewCourseContent(e.target.value)}
        />
        <button
          className={`btn ${editIndex !== null ? "btn-success" : "btn-primary"} w-100`}
          onClick={handleAddOrUpdate}
        >
          {editIndex !== null ? "Update Course" : "Add Course"}
        </button>
      </div>

      {courses.length === 0 ? (
        <p className="text-center text-muted">No courses added yet.</p>
      ) : (
        <ul className="list-group">
          {courses.map((course, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{course.name}</div>
                <small className="text-muted">{course.content}</small>
              </div>
              <div>
                <button
                  className="btn btn-sm btn-outline-secondary me-2"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageCourse;




