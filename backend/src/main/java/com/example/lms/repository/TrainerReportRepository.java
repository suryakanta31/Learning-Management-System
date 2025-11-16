package com.example.lms.repository;

import com.example.lms.entity.TrainerReport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TrainerReportRepository extends JpaRepository<TrainerReport, Long> {

    List<TrainerReport> findByTrainerId(Long trainerId);
}
