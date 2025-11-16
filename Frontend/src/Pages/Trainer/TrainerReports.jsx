import React, { useEffect, useState } from "react";
import lmsService from "../../services/lmsService";
import "../../index.css";

const TrainerReports = () => {
    const trainerId = parseInt(localStorage.getItem("trainerId"), 10);

    const [reportData, setReportData] = useState([]);
    const [batches, setBatches] = useState([]);

    const [newReport, setNewReport] = useState({
        batchId: "",
        subjectName: "",
    });

    useEffect(() => {
        fetchReports();
        fetchBatches();
    }, []);

    // ==============================
    // FETCH REPORTS
    // ==============================
    const fetchReports = async () => {
        try {
            const res = await lmsService.getTrainerReports(trainerId);
            setReportData(res.data);
        } catch (err) {
            console.error("Error fetching reports:", err);
            setReportData([]);
        }
    };

    // ==============================
    // FETCH TRAINER BATCHES
    // ==============================
    const fetchBatches = async () => {
        try {
            const res = await lmsService.getTrainerBatches(trainerId);
            setBatches(res.data);
        } catch (err) {
            console.error("Error fetching batches:", err);
            setBatches([]);
        }
    };

    // ==============================
    // ADD REPORT
    // ==============================
    const handleSubmit = async () => {
        if (!newReport.batchId || !newReport.subjectName) {
            alert("Please fill all fields");
            return;
        }

        try {
            await lmsService.addTrainerReport(trainerId, newReport);
            setNewReport({ batchId: "", subjectName: "" });
            fetchReports();
        } catch (err) {
            console.error("Error adding report:", err);
        }
    };

    return (
        <div className="reports-container">
            <h2 className="reports-title">Trainer Reports</h2>

            {/* Add Report Form */}
            <div className="add-report-form">
                <h3>Add New Report</h3>

                <select
                    value={newReport.batchId}
                    onChange={(e) =>
                        setNewReport({ ...newReport, batchId: e.target.value })
                    }
                >
                    <option value="">Select Batch</option>
                    {Array.isArray(batches) &&
                        batches.map((b) => (
                            <option key={b.id} value={b.id}>
                                {b.batchName}
                            </option>
                        ))}
                </select>

                <input
                    type="text"
                    placeholder="Subject Name"
                    value={newReport.subjectName}
                    onChange={(e) =>
                        setNewReport({
                            ...newReport,
                            subjectName: e.target.value,
                        })
                    }
                />

                <button onClick={handleSubmit}>Add Report</button>
            </div>

            {/* Report Table */}
            <table className="report-table">
                <thead>
                    <tr>
                        <th>Batch</th>
                        <th>Subject</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Date & Time</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(reportData) &&
                        reportData.map((r) => (
                            <tr key={r.id}>
                                <td>{r.batchName}</td>
                                <td>{r.subjectName}</td>
                                <td>{r.startDate}</td>
                                <td>{r.endDate}</td>
                                <td>{r.reportDateTime}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default TrainerReports;
