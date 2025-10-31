// src/Pages/Admin/ManageCourse.jsx
import React, { useState, useEffect } from "react";
import api from "../../Services/api";
import "../../index.css";

const ManageCourse = () => {
  const [courses, setCourses] = useState([]);
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newCourseDescription, setNewCourseDescription] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editId, setEditId] = useState(null);

  // ✅ Load all courses on mount
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/course/"); // GET /api/course/
        setCourses(res.data || []);
      } catch (err) {
        console.error("Failed to load courses:", err);
      }
    })();
  }, []);

  // ✅ Add or Update course
  const handleAddOrUpdate = async () => {
    if (!newCourseTitle.trim() || !newCourseDescription.trim()) return;

    const courseData = {
      title: newCourseTitle,
      description: newCourseDescription,
    };

    try {
      if (editIndex !== null && editId) {
        // Update course
        await api.put(`/course/update/${editId}`, courseData);
        setCourses((prev) =>
          prev.map((c, i) => (i === editIndex ? { ...c, ...courseData } : c))
        );
        setEditIndex(null);
        setEditId(null);
      } else {
        // Add new course
        const res = await api.post("/course/add", courseData);
        if (res?.data && res.data.id) {
          setCourses((prev) => [res.data, ...prev]);
        } else {
          const r2 = await api.get("/course/");
          setCourses(r2.data || []);
        }
      }

      // clear form
      setNewCourseTitle("");
      setNewCourseDescription("");
    } catch (err) {
      console.error("Save course failed:", err);
      alert("Failed to save course — check console.");
    }
  };

  const handleEdit = (index) => {
    const c = courses[index];
    setNewCourseTitle(c.title || "");
    setNewCourseDescription(c.description || "");
    setEditIndex(index);
    setEditId(c.id ?? null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = () => {
    alert("Delete is disabled — manage deletion in the database.");
  };

  return (
    <div className="course-container">
      <h2 className="course-title">Manage Courses</h2>

      <div className="course-form">
        <input
          type="text"
          value={newCourseTitle}
          onChange={(e) => setNewCourseTitle(e.target.value)}
          placeholder="Course Title *"
        />
        <input
          type="text"
          value={newCourseDescription}
          onChange={(e) => setNewCourseDescription(e.target.value)}
          placeholder="Course Description *"
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
            setNewCourseTitle("");
            setNewCourseDescription("");
            setEditIndex(null);
            setEditId(null);
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
            <div key={course.id ?? index} className="course-card">
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div>
                  <h5 className="course-name">{course.title}</h5>
                  <small className="course-info">{course.description}</small>
                </div>
                <div className="course-actions">
                  <button className="btn-warning" onClick={() => handleEdit(index)}>
                    Edit
                  </button>
                  <button className="btn-danger" disabled onClick={() => handleDelete(index)}>
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



