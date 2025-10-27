package com.example.lms.controller;

import com.example.lms.entity.Trainer;
import com.example.lms.repository.TrainerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/trainer")
@CrossOrigin(origins = "http://localhost:5173")
public class TrainerController {

    @Autowired
    private TrainerRepository trainerRepository;

    // ----------------- Trainer Login -----------------
    @PostMapping("/login")
    public Trainer login(@RequestBody Trainer trainer) {
        Optional<Trainer> existing = trainerRepository.findByEmail(trainer.getEmail());
        if(existing.isPresent() && existing.get().getPassword().equals(trainer.getPassword())) {
            return existing.get();
        }
        return null;
    }

    // ----------------- Get all trainers -----------------
    @GetMapping("/")
    public List<Trainer> getAllTrainers() {
        return trainerRepository.findAll();
    }

    // ----------------- Add new trainer -----------------
    @PostMapping("/add")
    public Trainer addTrainer(@RequestBody Trainer trainer) {
        return trainerRepository.save(trainer);
    }

    // ----------------- Update trainer -----------------
    @PutMapping("/update/{id}")
    public Trainer updateTrainer(@PathVariable Long id, @RequestBody Trainer trainer) {
        Trainer existing = trainerRepository.findById(id).orElseThrow();
        existing.setName(trainer.getName());
        existing.setEmail(trainer.getEmail());
        existing.setPassword(trainer.getPassword());
        existing.setBatch(trainer.getBatch());
        return trainerRepository.save(existing);
    }

    // ----------------- Delete trainer -----------------
    @DeleteMapping("/delete/{id}")
    public String deleteTrainer(@PathVariable Long id) {
        trainerRepository.deleteById(id);
        return "Trainer deleted successfully";
    }
}
