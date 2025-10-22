// MyCourses.js
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
    <div
      style={{
        minHeight: "100%",
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        background: "#f5f5f5",
      }}
    >
      <div style={{ width: "100%", maxWidth: 900 }}>
        <h2
          className="fw-bold text-center mb-4"
          style={{ color: "#4f46e5" }}
        >
          📚 My Courses
        </h2>

        {/* Add Course */}
        <div
          className="d-flex flex-wrap justify-content-center gap-2 mb-4"
          style={{ marginBottom: 30 }}
        >
          <input
            type="text"
            placeholder="Course Name"
            value={newCourse}
            onChange={(e) => setNewCourse(e.target.value)}
            style={{
              flex: "1 1 200px",
              padding: 8,
              borderRadius: 8,
              border: "1px solid #ccc",
              maxWidth: 400,
            }}
          />
          <button
            onClick={handleAddCourse}
            style={{
              padding: "8px 16px",
              backgroundColor: "#4f46e5",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            Add Course
          </button>
        </div>

        {/* Courses List */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {courses.length === 0 ? (
            <p
              className="text-center text-muted fs-5"
              style={{ padding: 20, background: "#fff", borderRadius: 10 }}
            >
              Access all enrolled courses.
            </p>
          ) : (
            courses.map((course) => (
              <div
                key={course.id}
                style={{
                  background: "#fff",
                  padding: 15,
                  borderRadius: 10,
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ minWidth: 0, flex: 1, marginRight: 10 }}>
                  <h5
                    className="fw-bold text-primary mb-1"
                    style={{ fontSize: 16, wordBreak: "break-word" }}
                  >
                    {course.name}
                  </h5>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 14,
                      color: "#555",
                      wordBreak: "break-word",
                    }}
                  >
                    Access all enrolled courses.
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteCourse(course.id)}
                  style={{
                    backgroundColor: "#ff4b5c",
                    color: "#fff",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: 6,
                    cursor: "pointer",
                    flexShrink: 0,
                    marginTop: 5,
                  }}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
