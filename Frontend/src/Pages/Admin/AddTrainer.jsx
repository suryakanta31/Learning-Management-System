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
      setTrainers([...trainers, trainer]);
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
      className="container-fluid p-4"
      style={{ minHeight: "100vh", backgroundColor: "#ffffff" }}
    >
      {/* Heading */}
      <div className="text-center mb-5">
        <h1 className="fw-bold text-primary">Trainer Management</h1>
      </div>

      {/* Trainer Form */}
      <div
        className="card shadow-sm border-0 mb-5 mx-auto"
        style={{ maxWidth: "900px", borderRadius: "15px" }}
      >
        <div
          className="card-header fw-semibold text-white"
          style={{ backgroundColor: "#4f5bd5", borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }}
        >
          {editId ? "Update Trainer" : "Add Trainer"}
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Full Name *</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={newTrainer.name}
                onChange={handleInputChange}
                placeholder="Suryakanta"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Email *</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={newTrainer.email}
                onChange={handleInputChange}
                placeholder="Surya@example.com"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Phone Number</label>
              <input
                type="text"
                className="form-control"
                name="phone"
                value={newTrainer.phone}
                onChange={handleInputChange}
                placeholder="+91 ____________"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Skill / Domain</label>
              <input
                type="text"
                className="form-control"
                name="skill"
                value={newTrainer.skill}
                onChange={handleInputChange}
                placeholder="React, Java, Python..."
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Experience (years)</label>
              <input
                type="number"
                className="form-control"
                name="experience"
                value={newTrainer.experience}
                onChange={handleInputChange}
                placeholder="3"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Qualification</label>
              <input
                type="text"
                className="form-control"
                name="qualification"
                value={newTrainer.qualification}
                onChange={handleInputChange}
                placeholder="B.Tech / M.Sc / MCA"
              />
            </div>
          </div>

          <div className="mt-4 d-flex gap-2">
            <button
              className="btn text-white"
              style={{ backgroundColor: "#4f5bd5" }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#6c7bff")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#4f5bd5")}
              onClick={handleAddOrUpdate}
            >
              {editId ? "Update Trainer" : "Add Trainer"}
            </button>
            <button
              className="btn btn-outline-secondary"
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
        </div>
      </div>

      {/* Trainers Table */}
      <div className="card shadow-sm border-0" style={{ borderRadius: "15px" }}>
        <div
          className="card-header fw-semibold text-white"
          style={{ backgroundColor: "#4f5bd5", borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }}
        >
          Trainers List
        </div>
        <div className="card-body table-responsive">
          {trainers.length === 0 ? (
            <p className="text-center text-muted">No trainers added yet</p>
          ) : (
            <table className="table table-bordered table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Skill</th>
                  <th>Experience</th>
                  <th>Qualification</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {trainers.map((trainer, index) => (
                  <tr key={trainer.id}>
                    <td>{index + 1}</td>
                    <td>{trainer.name}</td>
                    <td>{trainer.email}</td>
                    <td>{trainer.phone}</td>
                    <td>{trainer.skill}</td>
                    <td>{trainer.experience ? `${trainer.experience} yrs` : ""}</td>
                    <td>{trainer.qualification}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(trainer)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(trainer.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddTrainer;
