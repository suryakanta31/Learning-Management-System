package com.example.lms.service;

import com.example.lms.entity.Trainer;
import com.example.lms.entity.Batch;
import com.example.lms.entity.Attendance;
import com.example.lms.repository.TrainerRepository;
import com.example.lms.repository.BatchRepository;
import com.example.lms.repository.AttendanceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrainerService {

    private final TrainerRepository trainerRepo;
    private final BatchRepository batchRepo;
    private final AttendanceRepository attendanceRepo;

    public TrainerService(TrainerRepository trainerRepo, BatchRepository batchRepo, AttendanceRepository attendanceRepo) {
        this.trainerRepo = trainerRepo;
        this.batchRepo = batchRepo;
        this.attendanceRepo = attendanceRepo;
    }

    // ✅ Add trainer
    public Trainer saveTrainer(Trainer trainer) {
        return trainerRepo.save(trainer);
    }

    // ✅ Get all trainers
    public List<Trainer> getAllTrainers() {
        return trainerRepo.findAll();
    }

    // ✅ Update trainer
    public Trainer updateTrainer(Long id, Trainer updatedTrainer) {
        return trainerRepo.findById(id)
                .map(existing -> {
                    existing.setName(updatedTrainer.getName());
                    existing.setEmail(updatedTrainer.getEmail());
                    existing.setExpertise(updatedTrainer.getExpertise());
                    return trainerRepo.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Trainer not found with id " + id));
    }

    // ✅ Delete trainer
    public void deleteTrainer(Long id) {
        if (!trainerRepo.existsById(id)) {
            throw new RuntimeException("Trainer not found with id " + id);
        }
        trainerRepo.deleteById(id);
    }

    // ✅ Trainer-specific functions
    public List<Batch> getBatchesForTrainer(Long trainerId) {
        return batchRepo.findByTrainerId(trainerId);
    }

    public Attendance markAttendance(Attendance attendance) {
        return attendanceRepo.save(attendance);
    }
}

