// src/Pages/Admin/AddTrainer.jsx
import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import api from "../../Services/api";
import "../../index.css";

const AddTrainer = () => {
  const { incrementStat } = useOutletContext?.() ?? {};
  const [trainers, setTrainers] = useState([]);
  const [newTrainer, setNewTrainer] = useState({
    name: "",
    email: "",
    phone: "",
    skill: "",
    experience: "",
    qualification: "",
  });
  const [editId, setEditId] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  // load trainers
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/trainer/"); // GET /api/trainer/
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

  const handleAddOrUpdate = async () => {
    if (!newTrainer.name || !newTrainer.email) {
      alert("Please fill in required fields (Name & Email)");
      return;
    }

    try {
      if (editId) {
        // update PUT /api/trainer/update/{id}
        await api.put(`/trainer/update/${editId}`, newTrainer);
        setTrainers(prev => prev.map((t, i) => (i === editIndex ? { ...t, ...newTrainer } : t)));
        setEditId(null);
        setEditIndex(null);
      } else {
        // add POST /api/trainer/add
        const res = await api.post("/trainer/add", newTrainer);
        if (res?.data) {
          setTrainers(prev => [res.data, ...prev]);
        } else {
          const r2 = await api.get("/trainer/");
          setTrainers(r2.data || []);
        }
        incrementStat && incrementStat("trainers");
      }

      setNewTrainer({
        name: "",
        email: "",
        phone: "",
        skill: "",
        experience: "",
        qualification: "",
      });
    } catch (err) {
      console.error("Error saving trainer:", err);
      alert("Failed to save trainer — check console.");
    }
  };

  const handleEdit = (trainer, index) => {
    setNewTrainer(trainer);
    setEditId(trainer.id ?? null);
    setEditIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    // Delete is intentionally disabled in the UI. Manage removal from DB only.
    alert("Delete disabled. Remove trainers directly from the database if needed.");
  };

  return (
    <div className="trainer-container">
      <h2 className="trainer-title">Trainer Management</h2>

      {/* Form */}
      <div className="trainer-form">
        <input
          type="text"
          name="name"
          value={newTrainer.name}
          onChange={handleInputChange}
          placeholder="Full Name *"
        />
        <input
          type="email"
          name="email"
          value={newTrainer.email}
          onChange={handleInputChange}
          placeholder="Email *"
        />
        <input
          type="text"
          name="phone"
          value={newTrainer.phone}
          onChange={handleInputChange}
          placeholder="Phone"
        />
        <input
          type="text"
          name="skill"
          value={newTrainer.skill}
          onChange={handleInputChange}
          placeholder="Skill"
        />
        <input
          type="number"
          name="experience"
          value={newTrainer.experience}
          onChange={handleInputChange}
          placeholder="Experience (yrs)"
        />
        <input
          type="text"
          name="qualification"
          value={newTrainer.qualification}
          onChange={handleInputChange}
          placeholder="Qualification"
        />

        <button className="add-btn" onClick={handleAddOrUpdate}>
          {editId ? "Update" : "Add"}
        </button>
        <button
          className="clear-btn"
          onClick={() =>
            setNewTrainer({
              name: "",
              email: "",
              phone: "",
              skill: "",
              experience: "",
              qualification: "",
            })
          }
        >
          Clear
        </button>
      </div>

      {/* Trainer List */}
      <div className="trainer-list">
        {trainers.length === 0 ? (
          <p className="text-center text-muted fs-5 mt-3">No trainers added yet</p>
        ) : (
          trainers.map((trainer, idx) => (
            <div key={trainer.id ?? idx} className="trainer-card">
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div className="trainer-info">
                  <h5 className="trainer-name">{trainer.name}</h5>
                  <small>
                    {trainer.email} • {trainer.skill || "No skill"} •{" "}
                    {trainer.experience ? `${trainer.experience} yrs` : ""}
                  </small>
                  <small>
                    {trainer.phone && `📞 ${trainer.phone}`}{" "}
                    {trainer.qualification && `🎓 ${trainer.qualification}`}
                  </small>
                </div>
                <div className="trainer-actions mt-2 mt-md-0">
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(trainer, idx)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    disabled
                    onClick={() => handleDelete(trainer.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AddTrainer;

