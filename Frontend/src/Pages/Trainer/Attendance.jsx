import React, { useState } from "react";
import "../../index.css"; // make sure path is correct

const Attendance = () => {
  const [students, setStudents] = useState([
    { id: 1, name: "Surya Kanta", course: "React Basics" },
    { id: 2, name: "Omm Prakash", course: "Java Spring" },
    { id: 3, name: "Rahul", course: "Python Data Science" },
  ]);

  const [attendance, setAttendance] = useState({});

  const handleChange = (id, value) =>
    setAttendance((prev) => ({ ...prev, [id]: value }));

  const handleSave = () => {
    console.log("Attendance data:", attendance);
    alert("Attendance saved successfully!");
  };

  return (
    <div className="attendance-container">
      <h2 className="attendance-title">Attendance</h2>

      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {students.length === 0 ? (
          <p className="text-center text-muted fs-5 mt-3">No students available</p>
        ) : (
          students.map((student) => (
            <div key={student.id} className="attendance-card">
              <div>
                <h5>{student.name}</h5>
                <small>{student.course}</small>
              </div>

              <select
                className="attendance-select"
                value={attendance[student.id] || ""}
                onChange={(e) => handleChange(student.id, e.target.value)}
              >
                <option value="">Select</option>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
              </select>
            </div>
          ))
        )}

        {students.length > 0 && (
          <div className="text-center mt-4">
            <button className="attendance-save-btn" onClick={handleSave}>
              Save Attendance
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Attendance;

