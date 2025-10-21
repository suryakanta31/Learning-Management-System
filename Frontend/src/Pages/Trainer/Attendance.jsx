import React, { useState } from "react";

const Attendance = () => {
  // Sample students — ideally this comes from a central state or API
  const [students, setStudents] = useState([
    { id: 1, name: "John Doe", course: "React Basics" },
    { id: 2, name: "Jane Smith", course: "Java Spring" },
    { id: 3, name: "Mark Taylor", course: "Python Data Science" },
  ]);

  const [attendance, setAttendance] = useState({}); // { studentId: "Present" | "Absent" }

  const handleChange = (id, value) =>
    setAttendance((prev) => ({ ...prev, [id]: value }));

  const handleSave = () => {
    console.log("Attendance data:", attendance);
    alert("Attendance saved successfully!");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px 0",
        background: "linear-gradient(to bottom right, #ebebebff)",
      }}
    >
      <h2 className="fw-bold text-center mb-4" style={{ color: "#3730a3" }}>
        Attendance
      </h2>

      <div className="container-fluid" style={{ maxWidth: 900 }}>
        {students.length === 0 ? (
          <p className="text-center text-muted fs-5 mt-3">No students available</p>
        ) : (
          students.map((student) => (
            <div
              key={student.id}
              className="w-100 mb-3 p-3 shadow-sm d-flex justify-content-between align-items-center flex-wrap"
              style={{
                background: "#fff",
                borderLeft: "6px solid #4f46e5",
                borderRadius: 10,
                transition: "0.3s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = "#eef2ff")}
              onMouseOut={(e) => (e.currentTarget.style.background = "#fff")}
            >
              <div>
                <h5 className="fw-bold text-primary mb-1">{student.name}</h5>
                <small className="text-muted d-block">{student.course}</small>
              </div>
              <select
                value={attendance[student.id] || ""}
                onChange={(e) => handleChange(student.id, e.target.value)}
                className="form-select"
                style={{ maxWidth: 150 }}
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
            <button
              className="btn text-white px-4 fw-semibold"
              style={{
                backgroundColor: "#4f46e5",
                borderRadius: "8px",
                transition: "0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#6366f1")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#4f46e5")}
              onClick={handleSave}
            >
              Save Attendance
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Attendance;
