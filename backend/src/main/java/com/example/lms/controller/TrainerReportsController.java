package com.example.lms.controller;

import com.example.lms.entity.Batch;
import com.example.lms.entity.Trainer;
import com.example.lms.repository.BatchRepository;
import com.example.lms.repository.TrainerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/trainer-reports")  // ✅ Unique base path
@CrossOrigin(origins = "http://localhost:5173")
public class TrainerReportsController {

    @Autowired
    private TrainerRepository trainerRepository;

    @Autowired
    private BatchRepository batchRepository;

    /** ✅ GET - Fetch Trainer Reports */
    @GetMapping("/{trainerId}/reports")
    public List<Map<String, Object>> getTrainerReports(@PathVariable Long trainerId) {
        List<Map<String, Object>> reports = new ArrayList<>();

        Optional<Trainer> trainerOpt = trainerRepository.findById(trainerId);
        if (trainerOpt.isEmpty()) {
            throw new RuntimeException("Trainer not found with ID: " + trainerId);
        }

        List<Batch> batches = batchRepository.findByTrainer_Id(trainerId);

        if (batches.isEmpty()) {
            Map<String, Object> mock = new HashMap<>();
            mock.put("batchName", "No batches assigned");
            mock.put("courseName", "N/A");
            reports.add(mock);
            return reports;
        }

        for (Batch batch : batches) {
            Map<String, Object> report = new HashMap<>();
            report.put("batchName", batch.getBatchName());
            report.put("courseName", 
                batch.getCourse() != null ? batch.getCourse().getCourseName() : "N/A");
            reports.add(report);
        }

        return reports;
    }

    /** ✅ POST - Mock Add Trainer Report */
    @PostMapping("/{trainerId}/reports")
    public Map<String, Object> addTrainerReport(
            @PathVariable Long trainerId,
            @RequestBody Map<String, Object> reportData) {

        Optional<Trainer> trainerOpt = trainerRepository.findById(trainerId);
        if (trainerOpt.isEmpty()) {
            throw new RuntimeException("Trainer not found with ID: " + trainerId);
        }

        System.out.println("✅ Received new report from Trainer " + trainerId + ": " + reportData);

        Map<String, Object> savedReport = new HashMap<>();
        savedReport.put("batchName", reportData.get("batchName"));
        savedReport.put("courseName", reportData.get("courseName"));
        savedReport.put("status", "Report saved successfully (mock)");

        return savedReport;
    }
}
