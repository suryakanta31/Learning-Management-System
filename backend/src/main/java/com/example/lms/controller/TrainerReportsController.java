package com.example.lms.controller;

import com.example.lms.entity.TrainerReport;
import com.example.lms.service.TrainerReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trainer-reports")
@CrossOrigin(origins = "*")
public class TrainerReportsController {

    @Autowired
    private TrainerReportService reportService;

    // POST: Add report
    @PostMapping("/{trainerId}/reports")
    public TrainerReport addReport(
            @PathVariable Long trainerId,
            @RequestBody TrainerReport payload) {

        return reportService.addReport(trainerId, payload);
    }

    // GET: Fetch all reports
    @GetMapping("/{trainerId}/reports")
    public List<TrainerReport> getReports(@PathVariable Long trainerId) {
        return reportService.getReports(trainerId);
    }
}
