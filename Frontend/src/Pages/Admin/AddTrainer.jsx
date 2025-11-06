import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Plus, Edit, Trash2, Save, X } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import lmsService from "../../services/lmsService";
import "../../index.css";

const AddTrainer = () => {
  const { updateStat, fetchStats } = useOutletContext() ?? {};
  const [trainers, setTrainers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [editRowId, setEditRowId] = useState(null);
  const [showEditPassword, setShowEditPassword] = useState(false);
  const [newTrainer, setNewTrainer] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    skill: "",
    experience: "",
    qualification: "",
  });
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

  // === HANDLERS ===
  const handleInput = (e) => {
    const { name, value } = e.target;
    setNewTrainer({ ...newTrainer, [name]: value });
  };

  const handleAddTrainer = async () => {
    if (!newTrainer.name || !newTrainer.email || !newTrainer.password) {
      alert("Please fill Name, Email & Password");
      return;
    }
    try {
      const adminId = localStorage.getItem("adminId");
      const res = await lmsService.addTrainer(adminId, newTrainer);
      setTrainers((prev) => [res.data, ...prev]);
      updateStat && updateStat("trainers", "increment");

      setNewTrainer({
        name: "",
        email: "",
        password: "",
        phone: "",
        skill: "",
        experience: "",
        qualification: "",
      });
      setShowForm(false);
    } catch (err) {
      console.error("Error adding trainer:", err);
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

  // === UI ===
  return (
    <div className="page-container trainer-page">
      {/* ===== Header Section ===== */}
      <div className="page-header">
        <h2 className="page-title">Trainer Management</h2>
        <div className="add-toggle">
          <button
            onClick={() => setShowForm(!showForm)}
            className="toggle-form-btn"
          >
            <Plus size={18} />
            {showForm ? "Hide Form" : "Add Trainer"}
          </button>
        </div>
      </div>

      {/* ===== Add Form ===== */}
      {showForm && (
        <div className="add-form">
          <input
            name="name"
            placeholder="Full Name *"
            value={newTrainer.name}
            onChange={handleInput}
          />
          <input
            name="email"
            placeholder="Email *"
            value={newTrainer.email}
            onChange={handleInput}
          />

          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password *"
              value={newTrainer.password}
              onChange={handleInput}
              style={{ paddingRight: "30px" }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "8px",
                top: "8px",
                cursor: "pointer",
              }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          <input
            name="phone"
            placeholder="Phone"
            value={newTrainer.phone}
            onChange={handleInput}
          />
          <input
            name="skill"
            placeholder="Skill"
            value={newTrainer.skill}
            onChange={handleInput}
          />
          <input
            name="experience"
            placeholder="Experience (yrs)"
            value={newTrainer.experience}
            onChange={handleInput}
          />
          <input
            name="qualification"
            placeholder="Qualification"
            value={newTrainer.qualification}
            onChange={handleInput}
          />

          <button className="btn btn-primary" onClick={handleAddTrainer}>
            <Save size={16} /> Add
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setShowForm(false)}
          >
            <X size={16} /> Cancel
          </button>
        </div>
      )}

      {/* ===== Trainer Table ===== */}
      <div className="table-wrapper">
        {trainers.length === 0 ? (
          <p className="empty-msg">No trainers added yet</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Phone</th>
                <th>Skill</th>
                <th>Experience</th>
                <th>Qualification</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {trainers.map((t, idx) =>
                editRowId === t.id ? (
                  <tr key={t.id}>
                    <td>{idx + 1}</td>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={editedTrainer.name || ""}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="email"
                        name="email"
                        value={editedTrainer.email || ""}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <div style={{ position: "relative" }}>
                        <input
                          type={showEditPassword ? "text" : "password"}
                          name="password"
                          value={editedTrainer.password || ""}
                          onChange={handleEditChange}
                          style={{ paddingRight: "30px" }}
                        />
                        <span
                          onClick={() =>
                            setShowEditPassword(!showEditPassword)
                          }
                          style={{
                            position: "absolute",
                            right: "8px",
                            top: "8px",
                            cursor: "pointer",
                          }}
                        >
                          {showEditPassword ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </span>
                      </div>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="phone"
                        value={editedTrainer.phone || ""}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="skill"
                        value={editedTrainer.skill || ""}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="experience"
                        value={editedTrainer.experience || ""}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="qualification"
                        value={editedTrainer.qualification || ""}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <button className="btn btn-success" onClick={handleSaveRow}>
                        <Save size={14} /> Save
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={handleCancelEdit}
                      >
                        <X size={14} /> Cancel
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr key={t.id}>
                    <td>{idx + 1}</td>
                    <td>{t.name}</td>
                    <td>{t.email}</td>
                    <td>••••••</td>
                    <td>{t.phone || "-"}</td>
                    <td>{t.skill || "-"}</td>
                    <td>{t.experience || "-"}</td>
                    <td>{t.qualification || "-"}</td>
                    <td>
                      <button
                        className="btn btn-warning"
                        onClick={() => handleEditRow(t)}
                      >
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
        )}
      </div>
    </div>
  );
};

export default AddTrainer;











