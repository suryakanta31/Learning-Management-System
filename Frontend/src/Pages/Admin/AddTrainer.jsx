import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

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
      incrementStat("trainers");
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
    decrementStat("trainers");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #ebebebff)",
        padding: "40px 0",
      }}
    >
      {/* Heading */}
      <h2 className="fw-bold text-center mb-4" style={{ color: "#3730a3" }}>
        Trainer Management
      </h2>

      {/* Form */}
      <div
        className="container-fluid"
        style={{
          maxWidth: "95%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "25px",
        }}
      >
        <input
          type="text"
          name="name"
          value={newTrainer.name}
          onChange={handleInputChange}
          placeholder="Full Name *"
          className="form-control"
          style={{
            flex: "1 1 180px",
            minWidth: "150px",
            borderRadius: "8px",
          }}
        />
        <input
          type="email"
          name="email"
          value={newTrainer.email}
          onChange={handleInputChange}
          placeholder="Email *"
          className="form-control"
          style={{
            flex: "1 1 200px",
            minWidth: "160px",
            borderRadius: "8px",
          }}
        />
        <input
          type="text"
          name="phone"
          value={newTrainer.phone}
          onChange={handleInputChange}
          placeholder="Phone"
          className="form-control"
          style={{
            flex: "1 1 150px",
            minWidth: "140px",
            borderRadius: "8px",
          }}
        />
        <input
          type="text"
          name="skill"
          value={newTrainer.skill}
          onChange={handleInputChange}
          placeholder="Skill"
          className="form-control"
          style={{
            flex: "1 1 150px",
            minWidth: "140px",
            borderRadius: "8px",
          }}
        />
        <input
          type="number"
          name="experience"
          value={newTrainer.experience}
          onChange={handleInputChange}
          placeholder="Experience (yrs)"
          className="form-control"
          style={{
            flex: "1 1 130px",
            minWidth: "120px",
            borderRadius: "8px",
          }}
        />
        <input
          type="text"
          name="qualification"
          value={newTrainer.qualification}
          onChange={handleInputChange}
          placeholder="Qualification"
          className="form-control"
          style={{
            flex: "1 1 150px",
            minWidth: "130px",
            borderRadius: "8px",
          }}
        />

        <button
          className="btn text-white px-4 fw-semibold"
          style={{
            backgroundColor: "#4f46e5",
            borderRadius: "8px",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#6366f1")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#4f46e5")}
          onClick={handleAddOrUpdate}
        >
          {editId ? "Update" : "Add"}
        </button>

        <button
          className="btn btn-outline-secondary px-4 fw-semibold"
          style={{
            borderRadius: "8px",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#e5e7eb")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
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
      <div
        className="container-fluid"
        style={{
          maxWidth: "95%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {trainers.length === 0 ? (
          <p className="text-center text-muted fs-5 mt-3">
            No trainers added yet
          </p>
        ) : (
          trainers.map((trainer) => (
            <div
              key={trainer.id}
              className="w-100 mb-3 p-3 shadow-sm"
              style={{
                backgroundColor: "#fff",
                borderLeft: "6px solid #4f46e5",
                borderRadius: "10px",
                transition: "0.3s",
                maxWidth: "1000px",
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = "#eef2ff")}
              onMouseOut={(e) => (e.currentTarget.style.background = "#fff")}
            >
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div>
                  <h5 className="fw-bold text-primary mb-1">
                    {trainer.name}
                  </h5>
                  <small className="text-muted d-block">
                    {trainer.email} • {trainer.skill || "No skill"} •{" "}
                    {trainer.experience ? `${trainer.experience} yrs` : ""}
                  </small>
                  <small>
                    {trainer.phone && `📞 ${trainer.phone}`}{" "}
                    {trainer.qualification && `🎓 ${trainer.qualification}`}
                  </small>
                </div>
                <div className="mt-2 mt-md-0">
                  <button
                    className="btn btn-sm btn-warning me-2 fw-semibold"
                    style={{ borderRadius: "6px" }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#facc15")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "#ffc107")
                    }
                    onClick={() => handleEdit(trainer)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger fw-semibold"
                    style={{ borderRadius: "6px" }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#ef4444")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "#dc3545")
                    }
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
