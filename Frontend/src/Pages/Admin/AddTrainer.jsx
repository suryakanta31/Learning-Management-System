import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import lmsService from "../../services/lmsService";
import "../../index.css";

const AddTrainer = () => {
  const { updateStat, fetchStats } = useOutletContext() ?? {};
  const [trainers, setTrainers] = useState([]);
  const [newTrainer, setNewTrainer] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    skill: "",
    experience: "",
    qualification: "",
  });
  const [editRowId, setEditRowId] = useState(null);
  const [editedTrainer, setEditedTrainer] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const res = await lmsService.getAllTrainers();
        setTrainers(res.data || []);
      } catch (err) {
        console.error("Error loading trainers:", err);
      }
    })();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTrainer({ ...newTrainer, [name]: value });
  };

  const handleAddTrainer = async () => {
    if (!newTrainer.name || !newTrainer.email || !newTrainer.password) {
      alert("Please fill required fields (Name, Email, Password)");
      return;
    }

    try {
      const adminId = localStorage.getItem("adminId");
      const res = await lmsService.addTrainer(adminId, newTrainer);
      if (res?.data) {
        setTrainers((prev) => [res.data, ...prev]);
        updateStat && updateStat("trainers", "increment");
      }

      setNewTrainer({
        name: "",
        email: "",
        password: "",
        phone: "",
        skill: "",
        experience: "",
        qualification: "",
      });
    } catch (err) {
      console.error("Error adding trainer:", err);
      alert("Failed to add trainer");
    }
  };

  const handleEditRow = (trainer) => {
    setEditRowId(trainer.id);
    setEditedTrainer({ ...trainer });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedTrainer({ ...editedTrainer, [name]: value });
  };

  const handleSaveRow = async () => {
    try {
      await lmsService.updateTrainer(editRowId, editedTrainer);
      setTrainers((prev) =>
        prev.map((t) => (t.id === editRowId ? editedTrainer : t))
      );
      setEditRowId(null);
      setEditedTrainer({});
      fetchStats && fetchStats();
    } catch (err) {
      console.error("Error updating trainer:", err);
    }
  };

  const handleCancelEdit = () => {
    setEditRowId(null);
    setEditedTrainer({});
  };

  return (
    <div className="trainer-container">
      <h2 className="trainer-title">Trainer Management</h2>

      {/* Add Form */}
      <div className="trainer-form">
        <input type="text" name="name" value={newTrainer.name} onChange={handleInputChange} placeholder="Full Name *" />
        <input type="email" name="email" value={newTrainer.email} onChange={handleInputChange} placeholder="Email *" />
        <input type="password" name="password" value={newTrainer.password} onChange={handleInputChange} placeholder="Password *" />
        <input type="text" name="phone" value={newTrainer.phone} onChange={handleInputChange} placeholder="Phone" />
        <input type="text" name="skill" value={newTrainer.skill} onChange={handleInputChange} placeholder="Skill" />
        <input type="number" name="experience" value={newTrainer.experience} onChange={handleInputChange} placeholder="Experience (yrs)" />
        <input type="text" name="qualification" value={newTrainer.qualification} onChange={handleInputChange} placeholder="Qualification" />

        <button className="add-btn" onClick={handleAddTrainer}>Add</button>
      </div>

      {/* Trainer Table */}
      <div className="trainer-table mt-4">
        {trainers.length === 0 ? (
          <p className="text-center text-muted fs-5">No trainers added yet</p>
        ) : (
          <table className="styled-table">
            <thead>
              <tr>
                <th>S.No</th><th>Name</th><th>Email</th><th>Password</th>
                <th>Phone</th><th>Skill</th><th>Experience</th>
                <th>Qualification</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {trainers.map((trainer, idx) =>
                editRowId === trainer.id ? (
                  <tr key={trainer.id}>
                    <td>{idx + 1}</td>
                    {["name", "email", "password", "phone", "skill", "experience", "qualification"].map((field) => (
                      <td key={field}>
                        <input
                          type={field === "password" ? "password" : "text"}
                          name={field}
                          value={editedTrainer[field] || ""}
                          onChange={handleEditChange}
                        />
                      </td>
                    ))}
                    <td>
                      <button className="btn btn-sm btn-success me-2" onClick={handleSaveRow}>Save</button>
                      <button className="btn btn-sm btn-secondary" onClick={handleCancelEdit}>Cancel</button>
                    </td>
                  </tr>
                ) : (
                  <tr key={trainer.id}>
                    <td>{idx + 1}</td>
                    <td>{trainer.name}</td>
                    <td>{trainer.email}</td>
                    <td>{trainer.password ? "••••••" : "-"}</td>
                    <td>{trainer.phone || "-"}</td>
                    <td>{trainer.skill || "-"}</td>
                    <td>{trainer.experience || "-"}</td>
                    <td>{trainer.qualification || "-"}</td>
                    <td>
                      <button className="btn btn-sm btn-warning me-2" onClick={() => handleEditRow(trainer)}>Edit</button>
                      <button className="btn btn-sm btn-danger" disabled>Delete</button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AddTrainer;








