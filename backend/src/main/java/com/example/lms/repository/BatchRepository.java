package com.example.lms.repository;

import com.example.lms.entity.Batch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BatchRepository extends JpaRepository<Batch, Long> {

    // ✅ Find all batches for a specific course
    List<Batch> findByCourse_Id(Long courseId);

    // ✅ Optional: Find by batch name
    Batch findByBatchName(String batchName);
}
