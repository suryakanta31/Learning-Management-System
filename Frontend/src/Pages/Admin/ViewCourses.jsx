// src/Pages/Admin/ViewCourses.jsx
import React, { useEffect, useState } from "react";
import lmsService from "../../services/lmsService";
import "../../index.css";

const ViewCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const res = await lmsService.getAllCourses();
        setCourses(res.data || []);
      } catch (err) {
        console.error("Failed to load courses:", err);
      }
    };
    loadCourses();
  }, []);

  return (
    <div className="child-outlet">
      <h2>All Courses</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Course Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {courses.length === 0 ? (
            <tr>
              <td colSpan={3} style={{ textAlign: "center" }}>
                No courses found
              </td>
            </tr>
          ) : (
            courses.map((c, idx) => (
              <tr key={c.id}>
                <td>{idx + 1}</td>
                <td>{c.courseName}</td>
                <td>{c.description}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewCourses;
