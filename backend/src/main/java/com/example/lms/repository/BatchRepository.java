package com.example.lms.repository;

import com.example.lms.entity.Batch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BatchRepository extends JpaRepository<Batch, Long> {
    // ✅ Find all batches linked to a particular course
    List<Batch> findByCourse_Id(Long courseId);

    // ✅ Find all batches linked to a particular trainer
    List<Batch> findByTrainer_Id(Long trainerId);
}
