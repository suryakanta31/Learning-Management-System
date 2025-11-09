import React, { useEffect, useState } from "react";
import "../../index.css";
import lmsService from "../../services/lmsService";

const Attendance = () => {
  const trainerId = localStorage.getItem("trainerId");
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    if (!trainerId) return;
    TrainerService.getStudentsForTrainer(trainerId)
      .then((res) => setStudents(res || []))
      .catch(() => setStudents([]));
  }, [trainerId]);

  const handleChange = (id, value) =>
    setAttendance((prev) => ({ ...prev, [id]: value }));

  const handleSave = async () => {
    if (!trainerId) return alert("Trainer ID missing!");

    try {
      const payloads = Object.entries(attendance).map(([studentId, status]) => ({
        student: { id: parseInt(studentId, 10) },
        date: new Date().toISOString().slice(0, 10),
        present: status === "Present",
      }));

      await Promise.all(
        payloads.map((p) => TrainerService.markAttendance(trainerId, p))
      );

      alert("✅ Attendance saved successfully!");
    } catch (err) {
      console.error("Save attendance error:", err);
      alert("❌ Could not save attendance.");
    }
  };

  return (
    <div className="attendance-container">
      <h2 className="attendance-title">Mark Attendance</h2>

      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {students.length === 0 ? (
          <p className="text-center text-muted fs-5 mt-3">
            No students assigned yet.
          </p>
        ) : (
          students.map((student) => (
            <div key={student.id} className="attendance-card">
              <div>
                <h5>{student.name}</h5>
                <small>{student.email}</small>
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






