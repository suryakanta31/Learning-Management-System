import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import lmsService from "../../services/lmsService";
import "../../index.css";

const ManageCourse = () => {
  const { updateStat, fetchStats } = useOutletContext() ?? {};
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState({ courseName: "", description: "" });
  const [editId, setEditId] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await lmsService.getAllCourses();
        setCourses(res.data || []);
      } catch (err) {
        console.error("Failed to load courses:", err);
      }
    })();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleAddOrUpdate = async () => {
    if (!course.courseName.trim() || !course.description.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editId) {
        await lmsService.updateCourse(editId, course);
        setCourses((prev) =>
          prev.map((c, i) => (i === editIndex ? { ...c, ...course } : c))
        );
        fetchStats && fetchStats();
      } else {
        const res = await lmsService.addCourse(course);
        if (res?.data) {
          setCourses((prev) => [res.data, ...prev]);
          updateStat && updateStat("courses", "increment");
        }
      }

      setCourse({ courseName: "", description: "" });
      setEditId(null);
      setEditIndex(null);
    } catch (err) {
      console.error("Error saving course:", err);
    }
  };

  const handleEdit = (c, idx) => {
    setCourse(c);
    setEditId(c.id ?? null);
    setEditIndex(idx);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="course-container">
      <h2 className="course-title">Manage Courses</h2>

      <div className="course-form">
        <input
          type="text"
          name="courseName"
          value={course.courseName}
          onChange={handleChange}
          placeholder="Course Title *"
        />
        <input
          type="text"
          name="description"
          value={course.description}
          onChange={handleChange}
          placeholder="Course Description *"
        />

        <button className="add-btn" onClick={handleAddOrUpdate}>
          {editId ? "Update" : "Add"}
        </button>
        <button
          className="clear-btn"
          onClick={() => {
            setCourse({ courseName: "", description: "" });
            setEditId(null);
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
          <table className="table table-bordered text-center">
            <thead>
              <tr>
                <th>S.No</th><th>Course Name</th><th>Description</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c, idx) => (
                <tr key={c.id ?? idx}>
                  <td>{idx + 1}</td>
                  <td>{c.courseName}</td>
                  <td>{c.description}</td>
                  <td>
                    <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(c, idx)}>Edit</button>
                    <button className="btn btn-sm btn-danger" disabled>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageCourse;
