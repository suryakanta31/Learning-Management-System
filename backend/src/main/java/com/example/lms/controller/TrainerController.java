package com.example.lms.controller;

import com.example.lms.entity.Admin;
import com.example.lms.entity.Trainer;
import com.example.lms.repository.AdminRepository;
import com.example.lms.repository.TrainerRepository;
import com.example.lms.service.TrainerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/trainers")
@CrossOrigin(origins = "http://localhost:5173")
public class TrainerController {

    @Autowired
    private TrainerService trainerService;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private TrainerRepository trainerRepository;

    // ✅ Admin adds a trainer
    @PostMapping("/add/{adminId}")
    public Trainer addTrainer(@PathVariable Long adminId, @RequestBody Trainer trainer) {
        Admin admin = adminRepository.findById(adminId).orElseThrow();
        return trainerService.addTrainer(trainer, admin);
    }

    // ✅ Trainer signup (optional, if trainers self-register)
    @PostMapping("/signup")
    public Trainer signup(@RequestBody Trainer trainer) {
        return trainerRepository.save(trainer);
    }

    // ✅ Trainer login
    @PostMapping("/login")
    public Trainer login(@RequestBody Trainer loginRequest) {
        Trainer trainer = trainerRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("Trainer not found"));
        if (!trainer.getPassword().equals(loginRequest.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        return trainer;
    }

    // ✅ Fetch all trainers
    @GetMapping("/")
    public List<Trainer> getAllTrainers() {
        return trainerService.getAllTrainers();
    }

    // ✅ Update trainer info
    @PutMapping("/update/{id}")
    public Trainer updateTrainer(@PathVariable Long id, @RequestBody Trainer trainer) {
        return trainerService.updateTrainer(id, trainer);
    }
}
