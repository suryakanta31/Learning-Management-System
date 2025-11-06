import React, { useState, useEffect } from "react";
import { Edit, Trash2, Save, X, Plus } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import lmsService from "../../services/lmsService";
import "../../index.css";

const ManageCourse = () => {
  const { updateStat, fetchStats } = useOutletContext() ?? {};
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState({ courseName: "", description: "" });
  const [editRowId, setEditRowId] = useState(null);
  const [editedCourse, setEditedCourse] = useState({});
  const [showForm, setShowForm] = useState(false);

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

  const handleAddCourse = async () => {
    if (!course.courseName.trim() || !course.description.trim()) {
      alert("Please fill all fields");
      return;
    }
    try {
      const res = await lmsService.addCourse(course);
      if (res?.data) {
        setCourses((prev) => [res.data, ...prev]);
        updateStat && updateStat("courses", "increment");
      }
      setCourse({ courseName: "", description: "" });
      setShowForm(false);
    } catch (err) {
      console.error("Error saving course:", err);
    }
  };

  const handleEditRow = (c) => {
    setEditRowId(c.id);
    setEditedCourse({ ...c });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedCourse({ ...editedCourse, [name]: value });
  };

  const handleSaveRow = async () => {
    try {
      await lmsService.updateCourse(editRowId, editedCourse);
      setCourses((prev) =>
        prev.map((c) => (c.id === editRowId ? editedCourse : c))
      );
      setEditRowId(null);
      setEditedCourse({});
      fetchStats && fetchStats();
    } catch (err) {
      console.error("Error updating course:", err);
    }
  };

  const handleCancelEdit = () => {
    setEditRowId(null);
    setEditedCourse({});
  };

  return (
    <div className="child-outlet">
      <div className="form-header" style={{ justifyContent: "space-between" }}>
        <h2>Manage Courses</h2>
        <button
          className="toggle-form-btn"
          style={{ backgroundColor: "#f97316" }}
          onClick={() => setShowForm(!showForm)}
        >
          <Plus size={18} /> {showForm ? "Hide Form" : "Add Course"}
        </button>
      </div>

      {showForm && (
        <form className="add-form">
          <input
            type="text"
            name="courseName"
            value={course.courseName}
            onChange={handleChange}
            placeholder="Course Name *"
          />
          <input
            type="text"
            name="description"
            value={course.description}
            onChange={handleChange}
            placeholder="Course Description *"
          />
          <button type="button" className="btn btn-primary" onClick={handleAddCourse}>
            <Save size={16} /> Save
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
            <X size={16} /> Cancel
          </button>
        </form>
      )}

      <table className="data-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Course Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c, idx) =>
            editRowId === c.id ? (
              <tr key={c.id}>
                <td>{idx + 1}</td>
                <td>
                  <input type="text" name="courseName" value={editedCourse.courseName || ""} onChange={handleEditChange} />
                </td>
                <td>
                  <input type="text" name="description" value={editedCourse.description || ""} onChange={handleEditChange} />
                </td>
                <td>
                  <button className="btn btn-success" onClick={handleSaveRow}>
                    <Save size={14} /> Save
                  </button>
                  <button className="btn btn-secondary" onClick={handleCancelEdit}>
                    <X size={14} /> Cancel
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={c.id}>
                <td>{idx + 1}</td>
                <td>{c.courseName}</td>
                <td>{c.description}</td>
                <td>
                  <button className="btn btn-warning" onClick={() => handleEditRow(c)}>
                    <Edit size={14} /> Edit
                  </button>
                  <button className="btn btn-danger" disabled>
                    <Trash2 size={14} /> Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCourse;


