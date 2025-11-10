// src/pages/Trainer/TrainerCourses.jsx
import React, { useEffect, useState } from "react";
import "../../index.css";
import lmsService from "../../services/lmsService";

const MyCourses = () => {
  const trainerId = parseInt(localStorage.getItem("trainerId"), 10);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const res = await lmsService.getCoursesByTrainer(trainerId);
        setCourses(res.data || []);
      } catch (err) {
        console.error("Error loading trainer courses:", err);
        setCourses([]);
      }
    };
    if (trainerId) loadCourses();
  }, [trainerId]);

  return (
    <div className="courses-container">
      <h2 className="courses-title">📚 My Courses</h2>
      <div className="courses-list">
        {courses.length === 0 ? (
          <p>No courses assigned yet.</p>
        ) : (
          courses.map((c) => (
            <div key={c.id} className="course-card">
              <h5>{c.course_name}</h5>
              <p>{c.description || "No description"}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyCourses;


