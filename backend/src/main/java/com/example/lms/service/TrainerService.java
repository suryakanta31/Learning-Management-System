package com.example.lms.service;

import com.example.lms.entity.Admin;
import com.example.lms.entity.Trainer;
import com.example.lms.repository.TrainerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TrainerService {

    @Autowired
    private TrainerRepository trainerRepository;

    // ✅ Admin adds a trainer (linked to Admin)
    public Trainer addTrainer(Trainer trainer, Admin admin) {
        if (trainerRepository.existsByEmail(trainer.getEmail())) {
            throw new RuntimeException("Email already exists: " + trainer.getEmail());
        }
        trainer.setAdmin(admin); // link trainer to admin
        return trainerRepository.save(trainer);
    }

    // ✅ Trainer self-signup (independent registration)
    public Trainer saveTrainer(Trainer trainer) {
        if (trainerRepository.existsByEmail(trainer.getEmail())) {
            throw new RuntimeException("Email already registered: " + trainer.getEmail());
        }

        // Basic validation
        if (trainer.getPassword() == null || trainer.getPassword().trim().isEmpty()) {
            throw new RuntimeException("Password cannot be empty");
        }

        if (trainer.getName() == null || trainer.getName().trim().isEmpty()) {
            throw new RuntimeException("Trainer name is required");
        }

        return trainerRepository.save(trainer);
    }

    // ✅ Trainer login validation
    public Trainer login(String email, String password) {
        Trainer trainer = trainerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Trainer not found with email: " + email));

        if (!trainer.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }

        return trainer;
    }

    // ✅ Fetch all trainers
    public List<Trainer> getAllTrainers() {
        return trainerRepository.findAll();
    }

    // ✅ Update trainer details
    public Trainer updateTrainer(Long id, Trainer updatedTrainer) {
        Trainer existing = trainerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Trainer not found with ID: " + id));

        // Update only fields that are provided
        if (updatedTrainer.getName() != null) existing.setName(updatedTrainer.getName());
        if (updatedTrainer.getEmail() != null) existing.setEmail(updatedTrainer.getEmail());
        if (updatedTrainer.getPassword() != null) existing.setPassword(updatedTrainer.getPassword());
        if (updatedTrainer.getPhone() != null) existing.setPhone(updatedTrainer.getPhone());
        if (updatedTrainer.getSkill() != null) existing.setSkill(updatedTrainer.getSkill());
        if (updatedTrainer.getExperience() != null) existing.setExperience(updatedTrainer.getExperience());
        if (updatedTrainer.getQualification() != null) existing.setQualification(updatedTrainer.getQualification());

        return trainerRepository.save(existing);
    }

    // ✅ Delete trainer by ID
    public void deleteTrainer(Long id) {
        if (!trainerRepository.existsById(id)) {
            throw new RuntimeException("Trainer not found with ID: " + id);
        }
        trainerRepository.deleteById(id);
    }
}
