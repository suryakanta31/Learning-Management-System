package com.example.lms.service;

import com.example.lms.entity.Admin;
import com.example.lms.entity.Trainer;
import com.example.lms.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrainerService {

    @Autowired private TrainerRepository trainerRepository;
    @Autowired private CourseRepository courseRepository;
    @Autowired private BatchRepository batchRepository;
    @Autowired private SessionRepository sessionRepository;

    // ✅ Add trainer (linked with admin)
    public Trainer addTrainer(Trainer trainer, Admin admin) {
        if (trainerRepository.existsByEmail(trainer.getEmail())) {
            throw new RuntimeException("Email already exists: " + trainer.getEmail());
        }

        if (trainer.getName() == null || trainer.getName().trim().isEmpty())
            throw new RuntimeException("Trainer name is required");

        if (trainer.getPassword() == null || trainer.getPassword().trim().isEmpty())
            throw new RuntimeException("Password cannot be empty");

        if (trainer.getSubject() == null || trainer.getSubject().trim().isEmpty())
            throw new RuntimeException("Subject is mandatory");

        trainer.setAdmin(admin);
        return trainerRepository.save(trainer);
    }

    // ✅ Trainer signup (independent)
    public Trainer saveTrainer(Trainer trainer) {
        if (trainerRepository.existsByEmail(trainer.getEmail())) {
            throw new RuntimeException("Email already registered: " + trainer.getEmail());
        }

        if (trainer.getName() == null || trainer.getName().trim().isEmpty())
            throw new RuntimeException("Trainer name is required");

        if (trainer.getPassword() == null || trainer.getPassword().trim().isEmpty())
            throw new RuntimeException("Password cannot be empty");

        if (trainer.getSubject() == null || trainer.getSubject().trim().isEmpty())
            throw new RuntimeException("Subject is mandatory");

        return trainerRepository.save(trainer);
    }

    // ✅ Login
    public Trainer login(String email, String password) {
        Trainer trainer = trainerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Trainer not found with email: " + email));

        if (!trainer.getPassword().equals(password))
            throw new RuntimeException("Invalid password");

        return trainer;
    }

    // ✅ Update trainer
    public Trainer updateTrainer(Long id, Trainer updatedTrainer) {
        Trainer existing = trainerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Trainer not found with ID: " + id));

        if (updatedTrainer.getName() != null) existing.setName(updatedTrainer.getName());
        if (updatedTrainer.getEmail() != null) existing.setEmail(updatedTrainer.getEmail());
        if (updatedTrainer.getPassword() != null) existing.setPassword(updatedTrainer.getPassword());
        if (updatedTrainer.getPhone() != null) existing.setPhone(updatedTrainer.getPhone());
        if (updatedTrainer.getSubject() != null) existing.setSubject(updatedTrainer.getSubject());
        if (updatedTrainer.getExperience() != null) existing.setExperience(updatedTrainer.getExperience());
        if (updatedTrainer.getQualification() != null) existing.setQualification(updatedTrainer.getQualification());

        return trainerRepository.save(existing);
    }

    // ✅ Delete trainer
    public void deleteTrainer(Long id) {
        if (!trainerRepository.existsById(id))
            throw new RuntimeException("Trainer not found with ID: " + id);
        trainerRepository.deleteById(id);
    }

    // ✅ Get all trainers
    public List<Trainer> getAllTrainers() {
        return trainerRepository.findAll();
    }

    // ✅ Trainer courses
    public List<?> getTrainerCourses(Long trainerId) {
        return courseRepository.findCoursesByTrainerId(trainerId);
    }

    // ✅ Trainer batches
    public List<?> getTrainerBatches(Long trainerId) {
        return batchRepository.findBatchesByTrainerId(trainerId);
    }

    // ✅ Trainer sessions
    public List<?> getTrainerSessions(Long trainerId) {
        return sessionRepository.findSessionsByTrainerId(trainerId);
    }
    public Trainer getTrainerById(Long id) {
    return trainerRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Trainer not found"));
}

}
