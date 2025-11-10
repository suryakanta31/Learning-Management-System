package com.example.lms.controller;

import com.example.lms.entity.*;
import com.example.lms.repository.*;
import com.example.lms.service.TrainerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/trainers")
@CrossOrigin(origins = "http://localhost:5173")
public class TrainerController {

    @Autowired private TrainerService trainerService;
    @Autowired private AdminRepository adminRepository;
    @Autowired private CourseRepository courseRepository;
    @Autowired private BatchRepository batchRepository;
    @Autowired private SessionRepository sessionRepository;
    @Autowired private TrainerRepository trainerRepository;

    // ✅ Admin adds trainer
    @PostMapping("/add/{adminId}")
    public ResponseEntity<?> addTrainer(@PathVariable Long adminId, @RequestBody Trainer trainer) {
        try {
            Admin admin = adminRepository.findById(adminId)
                    .orElseThrow(() -> new RuntimeException("Admin not found with ID: " + adminId));

            Trainer savedTrainer = trainerService.addTrainer(trainer, admin);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedTrainer);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("❌ Failed to add trainer: " + e.getMessage());
        }
    }

    // ✅ Trainer signup
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Trainer trainer) {
        try {
            Trainer saved = trainerService.saveTrainer(trainer);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("❌ Signup failed: " + e.getMessage());
        }
    }

    // ✅ Trainer login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Trainer loginRequest) {
        try {
            Trainer trainer = trainerService.login(loginRequest.getEmail(), loginRequest.getPassword());
            return ResponseEntity.ok(trainer);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("❌ Invalid email or password. Please try again.");
        }
    }

    // ✅ Get all trainers
    @GetMapping
    public ResponseEntity<List<Trainer>> getAllTrainers() {
        return ResponseEntity.ok(trainerService.getAllTrainers());
    }

    // ✅ Update trainer
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateTrainer(@PathVariable Long id, @RequestBody Trainer trainer) {
        try {
            Trainer updated = trainerService.updateTrainer(id, trainer);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("❌ Trainer not found: " + e.getMessage());
        }
    }

    // ✅ Delete trainer
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTrainer(@PathVariable Long id) {
        try {
            trainerService.deleteTrainer(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("❌ Trainer not found: " + e.getMessage());
        }
    }

    // ✅ Trainer courses
    @GetMapping("/{trainerId}/courses")
    public ResponseEntity<?> getCoursesByTrainer(@PathVariable Long trainerId) {
        List<Course> courses = courseRepository.findByTrainerId(trainerId);
        if (courses.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("⚠️ No courses found for trainer ID: " + trainerId);
        }
        return ResponseEntity.ok(courses);
    }

    // ✅ Trainer batches
    @GetMapping("/{trainerId}/batches")
    public ResponseEntity<?> getBatchesByTrainer(@PathVariable Long trainerId) {
        List<Batch> batches = batchRepository.findByTrainerId(trainerId);
        if (batches.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("⚠️ No batches found for trainer ID: " + trainerId);
        }
        return ResponseEntity.ok(batches);
    }

    // ✅ Trainer sessions
    @GetMapping("/{trainerId}/sessions")
    public ResponseEntity<?> getSessionsByTrainer(@PathVariable Long trainerId) {
        Trainer trainer = trainerRepository.findById(trainerId)
                .orElseThrow(() -> new RuntimeException("Trainer not found with ID: " + trainerId));

        List<Session> sessions = sessionRepository.findByTrainer(trainer);
        if (sessions.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("⚠️ No sessions found for trainer ID: " + trainerId);
        }
        return ResponseEntity.ok(sessions);
    }
}
