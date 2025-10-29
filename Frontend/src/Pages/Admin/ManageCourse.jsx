// src/Pages/Admin/ManageCourse.jsx
import React, { useState, useEffect } from "react";
import api from "../../Services/api"; // use your api wrapper
import "../../index.css"; // keep your styling

const ManageCourse = () => {
  const [courses, setCourses] = useState([]);
  const [newCourseName, setNewCourseName] = useState("");
  const [newCourseContent, setNewCourseContent] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editId, setEditId] = useState(null); // map list index -> DB id

  // load from backend
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

  const handleAddOrUpdate = async () => {
    if (!newCourseName.trim() || !newCourseContent.trim()) return;

    const courseData = { name: newCourseName, content: newCourseContent };

    try {
      if (editIndex !== null && editId) {
        // update existing (PUT /api/course/update/{id})
        await api.put(`/course/update/${editId}`, courseData);
        // update local copy preserving array order
        setCourses(prev => prev.map((c, i) => (i === editIndex ? { ...c, ...courseData } : c)));
        setEditIndex(null);
        setEditId(null);
      } else {
        // add new (POST /api/course/add)
        const res = await api.post("/course/add", courseData);
        // if backend returned saved entity use it, else reload list
        if (res?.data && (res.data.id || res.data.name)) {
          setCourses(prev => [res.data, ...prev]);
        } else {
          // fallback: reload list
          const r2 = await api.get("/course/");
          setCourses(r2.data || []);
        }
      }
      setNewCourseName("");
      setNewCourseContent("");
    } catch (err) {
      console.error("Save course failed:", err);
      alert("Failed to save course — check console.");
    }
  };

  const handleEdit = (index) => {
    const c = courses[index];
    setNewCourseName(c.name || "");
    setNewCourseContent(c.content || "");
    setEditIndex(index);
    setEditId(c.id ?? null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete stays local-disabled (visible but disabled) per your requirement
  const handleDelete = (index) => {
    // This button will be disabled in the UI. If you ever enable it, call backend delete endpoint:
    // await api.delete(`/course/delete/${courses[index].id}`)
    alert("Delete is disabled here. Manage deletion from the database.");
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
                  <h5 className="course-name">{course.name}</h5>
                  <small className="course-info">{course.content}</small>
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


