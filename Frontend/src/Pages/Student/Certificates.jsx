import React, { useState } from "react";

const Certificates = () => {
  const [certs, setCerts] = useState([]);
  const [newCert, setNewCert] = useState({ course: "", date: "", download: "" });
  const [editId, setEditId] = useState(null);

  const handleInputChange = (e) =>
    setNewCert({ ...newCert, [e.target.name]: e.target.value });

  const handleAddOrUpdate = () => {
    if (!newCert.course || !newCert.date || !newCert.download) return alert("Fill all fields");
    if (editId) {
      setCerts(certs.map(c => (c.id === editId ? { ...c, ...newCert } : c)));
      setEditId(null);
    } else setCerts([{ id: Date.now(), ...newCert }, ...certs]);
    setNewCert({ course: "", date: "", download: "" });
  };

  const handleEdit = (cert) => { setNewCert(cert); setEditId(cert.id); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const handleDelete = (id) => setCerts(certs.filter(c => c.id !== id));

  return (
    <div className="child-page">
      <h2 className="page-title">Certificates</h2>
      <p className="page-subtitle">Add or manage issued certificates</p>

      {/* Form */}
      <div className="form-inline">
        <input type="text" name="course" placeholder="Course Name *" value={newCert.course} onChange={handleInputChange} />
        <input type="text" name="date" placeholder="Issued Date *" value={newCert.date} onChange={handleInputChange} />
        <input type="text" name="download" placeholder="Download Link *" value={newCert.download} onChange={handleInputChange} />
        <button className="btn-primary" onClick={handleAddOrUpdate}>{editId ? "Update" : "Add"}</button>
        <button className="btn-secondary" onClick={() => { setNewCert({ course: "", date: "", download: "" }); setEditId(null); }}>Clear</button>
      </div>

      {/* Certificates List */}
      <div className="list-container">
        {certs.length === 0 ? (
          <p className="text-muted">No certificates added yet</p>
        ) : (
          certs.map(c => (
            <div key={c.id} className="list-item">
              <div className="item-info">
                <h5>{c.course}</h5>
                <small>Issued: {c.date} | <a href={c.download} target="_blank" rel="noreferrer">Download</a></small>
              </div>
              <div className="item-actions">
                <button className="btn-warning" onClick={() => handleEdit(c)}>Edit</button>
                <button className="btn-danger" onClick={() => handleDelete(c.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Certificates;

