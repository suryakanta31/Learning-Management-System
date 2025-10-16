import React, { useState } from "react";

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
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #ebebebff)",
        padding: "40px 0",
      }}
    >
      <h2 className="fw-bold text-center mb-4" style={{ color: "#3730a3" }}>
        Manage Courses
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
          value={newCourseName}
          onChange={(e) => setNewCourseName(e.target.value)}
          placeholder="Course Name *"
          className="form-control"
          style={{ flex: "1 1 200px", minWidth: "180px", borderRadius: "8px" }}
        />
        <input
          type="text"
          value={newCourseContent}
          onChange={(e) => setNewCourseContent(e.target.value)}
          placeholder="Course Contents / Topics *"
          className="form-control"
          style={{ flex: "2 1 400px", minWidth: "250px", borderRadius: "8px" }}
        />

        <button
          className="btn text-white px-3"
          style={{
            backgroundColor: editIndex !== null ? "#28a745" : "#4f46e5",
            borderRadius: "8px",
            whiteSpace: "nowrap",
            transition: "0.3s",
          }}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor = editIndex !== null ? "#218838" : "#6366f1")
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = editIndex !== null ? "#28a745" : "#4f46e5")
          }
          onClick={handleAddOrUpdate}
        >
          {editIndex !== null ? "Update" : "Add"}
        </button>

        <button
          className="btn btn-outline-secondary px-3"
          style={{ borderRadius: "8px", whiteSpace: "nowrap" }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#e5e7eb")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
          onClick={() => {
            setNewCourseName("");
            setNewCourseContent("");
            setEditIndex(null);
          }}
        >
          Clear
        </button>
      </div>

      {/* Courses List */}
      <div
        className="container-fluid d-flex flex-column align-items-center"
        style={{ maxWidth: "900px" }}
      >
        {courses.length === 0 ? (
          <p className="text-center text-muted fs-5 mt-3">
           No courses added yet
          </p>
        ) : (
          courses.map((course, index) => (
            <div
              key={index}
              className="w-100 mb-3 p-3 shadow-sm"
              style={{
                backgroundColor: "#fff",
                borderLeft: "6px solid #4f46e5",
                borderRadius: "10px",
                transition: "0.3s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = "#eef2ff")}
              onMouseOut={(e) => (e.currentTarget.style.background = "#fff")}
            >
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div>
                  <h5 className="fw-bold text-primary mb-1">{course.name}</h5>
                  <small className="text-muted d-block">{course.content}</small>
                </div>
                <div className="mt-2 mt-md-0">
                  <button
                    className="btn btn-sm btn-warning me-2 fw-semibold"
                    style={{ borderRadius: "6px" }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#facc15")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#ffc107")}
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger fw-semibold"
                    style={{ borderRadius: "6px" }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#ef4444")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#dc3545")}
                    onClick={() => handleDelete(index)}
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

export default ManageCourse;

