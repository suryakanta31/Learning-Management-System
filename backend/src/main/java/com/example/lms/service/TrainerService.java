package com.example.lms.service;

import com.example.lms.entity.Batch;
import com.example.lms.entity.Attendance;
import com.example.lms.repository.BatchRepository;
import com.example.lms.repository.AttendanceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrainerService {
    private final BatchRepository batchRepo;
    private final AttendanceRepository attendanceRepo;

    public TrainerService(BatchRepository batchRepo, AttendanceRepository attendanceRepo) {
        this.batchRepo = batchRepo;
        this.attendanceRepo = attendanceRepo;
    }

    public List<Batch> getBatchesForTrainer(Long trainerId) {
        return batchRepo.findByTrainerId(trainerId);
    }

    public Attendance markAttendance(Attendance attendance) {
        return attendanceRepo.save(attendance);
    }
}
