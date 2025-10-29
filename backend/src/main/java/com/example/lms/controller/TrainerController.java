package com.example.lms.controller;

import com.example.lms.entity.Attendance;
import com.example.lms.service.TrainerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/trainer")
public class TrainerController {

    private final TrainerService trainerService;
    public TrainerController(TrainerService trainerService) { this.trainerService = trainerService; }

    @PostMapping("/{trainerId}/attendance")
    public ResponseEntity<?> markAttendance(@PathVariable Long trainerId, @RequestBody Attendance attendance) {
        // assume attendance.student and date are set by frontend
        Attendance saved = trainerService.markAttendance(attendance);
        return ResponseEntity.ok(saved);
    }

    // add other trainer endpoints (batches, feedback) similarly
}
