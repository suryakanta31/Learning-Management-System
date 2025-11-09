// src/pages/Trainer/MyCourses.jsx
import React, { useEffect, useState } from "react";
import "../../index.css";
import lmsService from "../../services/lmsService";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ course_name: "", description: "" });
  const [editId, setEditId] = useState(null);

  // ✅ Fetch all courses for trainer
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await lmsService.getAllCourses();
        setCourses(res.data || []);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setCourses([]);
      }
    };
    fetchCourses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  const handleAddOrUpdate = async () => {
    if (!newCourse.course_name.trim()) return alert("Course title required");

    try {
      if (editId) {
        await lmsService.updateCourse(editId, newCourse);
        setCourses(courses.map((c) => (c.id === editId ? { ...c, ...newCourse } : c)));
        setEditId(null);
      } else {
        const saved = await lmsService.addCourse(newCourse);
        setCourses([saved.data, ...courses]);
      }
      setNewCourse({ course_name: "", description: "" });
    } catch (err) {
      console.error("Error saving course:", err);
      alert("Could not save course.");
    }
  };

  const handleEdit = (course) => {
    setNewCourse({ course_name: course.course_name, description: course.description });
    setEditId(course.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    try {
      await lmsService.deleteCourse(id);
      setCourses(courses.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Error deleting course:", err);
      alert("Could not delete course.");
    }
  };

  return (
    <div className="courses-container">
      <h2 className="courses-title">My Courses</h2>

      {/* Form */}
      <div className="courses-form">
        <input
          type="text"
          name="course_name"
          placeholder="Course Name *"
          value={newCourse.course_name}
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
        <button
          className="clear-btn"
          onClick={() => {
            setNewCourse({ course_name: "", description: "" });
            setEditId(null);
          }}
        >
          Clear
        </button>
      </div>

      {/* Course List */}
      <div className="courses-list">
        {courses.length === 0 ? (
          <p className="text-center text-muted fs-5">No courses added yet</p>
        ) : (
          courses.map((course) => (
            <div key={course.id} className="course-card">
              <div>
                <h5>{course.course_name}</h5>
                <small>{course.description}</small>
              </div>
              <div className="course-actions mt-2 mt-md-0">
                <button className="btn-warning me-2" onClick={() => handleEdit(course)}>
                  Edit
                </button>
                <button className="btn-danger" onClick={() => handleDelete(course.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyCourses;

