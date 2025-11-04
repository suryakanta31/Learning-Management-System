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

    // ✅ Add trainer under an admin
    public Trainer addTrainer(Trainer trainer, Admin admin) {
        trainer.setAdmin(admin); // assuming Trainer entity has Admin field
        return trainerRepository.save(trainer);
    }

    public List<Trainer> getAllTrainers() {
        return trainerRepository.findAll();
    }

    public Trainer updateTrainer(Long id, Trainer updatedTrainer) {
        Trainer existing = trainerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Trainer not found"));
        existing.setName(updatedTrainer.getName());
        existing.setEmail(updatedTrainer.getEmail());
        existing.setPassword(updatedTrainer.getPassword());
        return trainerRepository.save(existing);
    }

    public void deleteTrainer(Long id) {
        trainerRepository.deleteById(id);
    }
}
