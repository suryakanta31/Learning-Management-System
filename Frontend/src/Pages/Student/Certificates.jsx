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
    <div style={{ minHeight: "100vh", padding: "40px 0", background: "#ebebeb" }}>
      <h2 className="fw-bold text-center mb-4" style={{ color: "#3730a3" }}>Certificates</h2>

      <div className="container-fluid d-flex flex-wrap justify-content-center gap-2 mb-4">
        <input type="text" name="course" placeholder="Course Name *" value={newCert.course} onChange={handleInputChange} className="form-control" style={{ flex: "1 1 150px", minWidth: 140, borderRadius: 8 }} />
        <input type="text" name="date" placeholder="Issued Date *" value={newCert.date} onChange={handleInputChange} className="form-control" style={{ flex: "1 1 150px", minWidth: 140, borderRadius: 8 }} />
        <input type="text" name="download" placeholder="Download Link *" value={newCert.download} onChange={handleInputChange} className="form-control" style={{ flex: "1 1 150px", minWidth: 140, borderRadius: 8 }} />
        <button className="btn text-white px-4 fw-semibold" style={{ backgroundColor: "#4f46e5", borderRadius: 8 }} onClick={handleAddOrUpdate}>{editId ? "Update" : "Add"}</button>
        <button className="btn btn-outline-secondary px-4 fw-semibold" style={{ borderRadius: 8 }} onClick={() => { setNewCert({ course: "", date: "", download: "" }); setEditId(null); }}>Clear</button>
      </div>

      <div className="container-fluid" style={{ maxWidth: 900 }}>
        {certs.length === 0 ? <p className="text-center text-muted fs-5">No certificates added yet</p> : certs.map(c => (
          <div key={c.id} className="w-100 mb-3 p-3 shadow-sm" style={{ background: "#fff", borderLeft: "6px solid #4f46e5", borderRadius: 10 }}>
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <div>
                <h5 className="fw-bold text-primary mb-1">{c.course}</h5>
                <small className="text-muted">Issued: {c.date} | <a href={c.download} target="_blank" rel="noreferrer">Download</a></small>
              </div>
              <div className="mt-2 mt-md-0">
                <button className="btn btn-sm btn-warning me-2 fw-semibold" onClick={() => handleEdit(c)}>Edit</button>
                <button className="btn btn-sm btn-danger fw-semibold" onClick={() => handleDelete(c.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certificates;
