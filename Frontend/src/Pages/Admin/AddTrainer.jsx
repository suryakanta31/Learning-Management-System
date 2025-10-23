import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import "../../index.css";
 // make sure this points to your main CSS

const AddTrainer = () => {
  const { incrementStat, decrementStat } = useOutletContext();
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTrainer({ ...newTrainer, [name]: value });
  };

  const handleAddOrUpdate = () => {
    if (!newTrainer.name || !newTrainer.email) {
      alert("Please fill in required fields (Name & Email)");
      return;
    }

    if (editId) {
      setTrainers(
        trainers.map((t) => (t.id === editId ? { ...t, ...newTrainer } : t))
      );
      setEditId(null);
    } else {
      const trainer = { id: Date.now(), ...newTrainer };
      setTrainers([trainer, ...trainers]);
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
  };

  const handleEdit = (trainer) => {
    setNewTrainer(trainer);
    setEditId(trainer.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    setTrainers(trainers.filter((t) => t.id !== id));
    decrementStat && decrementStat("trainers");
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
          onClick={() => {
            setNewTrainer({
              name: "",
              email: "",
              phone: "",
              skill: "",
              experience: "",
              qualification: "",
            });
            setEditId(null);
          }}
        >
          Clear
        </button>
      </div>

      {/* Trainer List */}
      <div className="trainer-list">
        {trainers.length === 0 ? (
          <p className="text-center text-muted fs-5 mt-3">
            No trainers added yet
          </p>
        ) : (
          trainers.map((trainer) => (
            <div key={trainer.id} className="trainer-card">
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
                    onClick={() => handleEdit(trainer)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
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
