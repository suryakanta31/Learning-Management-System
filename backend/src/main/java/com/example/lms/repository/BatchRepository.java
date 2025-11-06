package com.example.lms.repository;

import com.example.lms.entity.Batch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BatchRepository extends JpaRepository<Batch, Long> {

    // Correct method for course
    List<Batch> findByCourse_Id(Long courseId);

    // Add method for trainer
    List<Batch> findByTrainer_Id(Long trainerId);

    // Optional: Find by batch name
    Batch findByBatchName(String batchName);
}
