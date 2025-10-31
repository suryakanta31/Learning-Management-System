package com.example.lms.controller;

import com.example.lms.entity.Trainer;
import com.example.lms.entity.Attendance;
import com.example.lms.service.TrainerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/trainer")
@CrossOrigin(origins = "http://localhost:5173")
public class TrainerController {

    private final TrainerService trainerService;

    public TrainerController(TrainerService trainerService) {
        this.trainerService = trainerService;
    }

    // ✅ Add new trainer
    @PostMapping("/add")
    public ResponseEntity<Trainer> addTrainer(@RequestBody Trainer trainer) {
        Trainer saved = trainerService.saveTrainer(trainer);
        return ResponseEntity.ok(saved);
    }

    // ✅ Get all trainers
    @GetMapping("/")
    public ResponseEntity<List<Trainer>> getAllTrainers() {
        return ResponseEntity.ok(trainerService.getAllTrainers());
    }

    // ✅ Mark attendance (existing)
    @PostMapping("/{trainerId}/attendance")
    public ResponseEntity<?> markAttendance(@PathVariable Long trainerId, @RequestBody Attendance attendance) {
        Attendance saved = trainerService.markAttendance(attendance);
        return ResponseEntity.ok(saved);
    }

    // ✅ Update trainer
    @PutMapping("/update/{id}")
    public ResponseEntity<Trainer> updateTrainer(@PathVariable Long id, @RequestBody Trainer trainer) {
        Trainer updated = trainerService.updateTrainer(id, trainer);
        return ResponseEntity.ok(updated);
    }

    // ✅ Delete trainer
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteTrainer(@PathVariable Long id) {
        trainerService.deleteTrainer(id);
        return ResponseEntity.ok("Deleted successfully");
    }
}
