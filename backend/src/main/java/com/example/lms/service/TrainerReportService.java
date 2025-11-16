package com.example.lms.service;

import com.example.lms.entity.Batch;
import com.example.lms.entity.TrainerReport;
import com.example.lms.repository.BatchRepository;
import com.example.lms.repository.TrainerReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TrainerReportService {

    @Autowired
    private TrainerReportRepository reportRepo;

    @Autowired
    private BatchRepository batchRepo;

    // ADD REPORT
    public TrainerReport addReport(Long trainerId, TrainerReport payload) {

        Batch batch = batchRepo.findById(payload.getBatchId())
                .orElseThrow(() -> new RuntimeException("Batch not found"));

        TrainerReport report = new TrainerReport();

        report.setTrainerId(trainerId);
        report.setBatchId(batch.getId());

        report.setBatchName(batch.getBatchName());
        report.setSubjectName(payload.getSubjectName());

        report.setStartDate(batch.getStartDate());
        report.setEndDate(batch.getEndDate());

        report.setReportDateTime(LocalDateTime.now()); // ADD date + time

        return reportRepo.save(report);
    }

    public List<TrainerReport> getReports(Long trainerId) {
        return reportRepo.findByTrainerId(trainerId);
    }
}
