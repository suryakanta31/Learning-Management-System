package com.example.lms.service;

import com.example.lms.entity.Trainer;
import com.example.lms.repository.TrainerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TrainerService {

    @Autowired
    private TrainerRepository trainerRepository;

    // Login
    public Optional<Trainer> login(String email, String password) {
        Optional<Trainer> trainer = trainerRepository.findByEmail(email);
        if (trainer.isPresent() && trainer.get().getPassword().equals(password)) {
            return trainer;
        }
        return Optional.empty();
    }

    // Create Trainer
    public Trainer createTrainer(Trainer trainer) {
        return trainerRepository.save(trainer);
    }

    // Get All Trainers
    public List<Trainer> getAllTrainers() {
        return trainerRepository.findAll();
    }

    // Get Trainer by ID
    public Optional<Trainer> getTrainerById(Long id) {
        return trainerRepository.findById(id);
    }

    // Update Trainer
    public Trainer updateTrainer(Trainer trainer) {
        return trainerRepository.save(trainer);
    }

    // Delete Trainer
    public void deleteTrainer(Long id) {
        trainerRepository.deleteById(id);
    }
}
